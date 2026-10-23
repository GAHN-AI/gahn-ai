// Cross-file acceptance checks for curriculum coverage, routes, assets, and launch gates.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const load = createRequire(import.meta.url);

load.extensions[".ts"] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  });
  module._compile(result.outputText, filename);
};

const root = fileURLToPath(new URL("..", import.meta.url));
const { careerSections, careerIndustries } = load("../lib/careerCatalog.ts");
const { careerCurricula, careerWorkspaceHref, getCareerLesson } = load(
  "../lib/careerCurricula.ts",
);
const { careerSkillSteps } = load("../lib/careerSkillSteps.ts");
const { learningSectionsByWorld, slugifyLearningTitle } = load(
  "../lib/learningCatalog.ts",
);
const { getTopicStudyPlan } = load("../lib/topicStudyPlans.ts");
const { INTERACTIVE_LESSONS_AVAILABLE } = load("../lib/lessonLaunch.ts");
const { SUBSCRIPTION_ENTITLEMENTS } = load(
  "../lib/subscriptionEntitlements.ts",
);

assert.equal(careerSections.length, 41);
assert.deepEqual(
  Object.keys(careerCurricula).sort(),
  careerSections.map((c) => c.slug).sort(),
);
assert.equal(
  new Set(careerSections.map((c) => c.imageUrl)).size,
  41,
  "Career artwork must be unique",
);
const hashes = new Set();
let sectionCount = 0,
  lessonCount = 0,
  topicCount = 0;
for (const career of careerSections) {
  const course = careerCurricula[career.slug];
  assert(
    careerSkillSteps[career.slug]?.length === 4,
    `Missing career roadmap: ${career.slug}`,
  );
  assert(
    careerIndustries.some((i) => i.title === career.category),
    `Unlinked industry: ${career.slug}`,
  );
  assert(
    course.sections.length >= 6 && course.sections.length <= 12,
    `Review course depth: ${career.slug}`,
  );
  assert(course.requirements.length >= 2);
  assert(course.sections.at(-1).title.startsWith("Capstone:"));
  const ids = new Set();
  for (const section of course.sections) {
    assert(section.practice.length > 35 && section.outcome.length > 35);
    assert(section.lessons.length >= 2);
    for (const lesson of section.lessons) {
      assert(
        !ids.has(lesson.id),
        `Duplicate lesson ID: ${career.slug}/${lesson.id}`,
      );
      ids.add(lesson.id);
      assert(
        lesson.title.length > 18 &&
          !/^(Introduction|Basics|Advanced concepts)$/i.test(lesson.title),
      );
      const url = new URL(
        careerWorkspaceHref(career.slug, lesson.id),
        "https://www.gahnai.com",
      );
      assert.equal(url.pathname, "/lesson/custom");
      assert.equal(url.searchParams.get("section"), career.slug);
      assert.equal(url.searchParams.get("lesson"), lesson.id);
      assert.equal(
        getCareerLesson(career.slug, url.searchParams.get("lesson")).lesson
          .title,
        lesson.title,
      );
    }
  }
  const artwork = fs.readFileSync(
    path.join(root, "public", career.imageUrl),
    "utf8",
  );
  assert(artwork.includes("<svg") && artwork.includes('viewBox="0 0 960 600"'));
  assert(
    !/<script|https?:\/\/(?!www.w3.org)/.test(artwork),
    "Artwork must be self-contained",
  );
  hashes.add(crypto.createHash("sha256").update(artwork).digest("hex"));
  sectionCount += course.sections.length;
  lessonCount += course.lessonCount;
}
assert.equal(hashes.size, 41);
assert(
  careerCurricula["machine-learning-engineer"].lessonCount >
    careerCurricula["virtual-assistant"].lessonCount,
);
assert(
  careerCurricula["software-developer-engineer"].sections.length >
    careerCurricula["customer-service-representative"].sections.length,
);
for (const [world, sections] of Object.entries(learningSectionsByWorld)) {
  for (const section of sections) {
    if (section.slug === "homework-upload") continue;
    for (const option of section.options) {
      const plan = getTopicStudyPlan(
        world,
        section.slug,
        slugifyLearningTitle(option.title),
      );
      assert(
        plan && plan.sections.length === 3,
        `Missing study plan: ${world}/${section.slug}/${option.title}`,
      );
      assert(plan.sections.every((s) => s.lessons.length === 2));
      topicCount++;
    }
  }
}
assert.equal(INTERACTIVE_LESSONS_AVAILABLE, false);
for (const [planId, plan] of Object.entries(SUBSCRIPTION_ENTITLEMENTS)) {
  assert.equal(
    plan.textLessons,
    false,
    `Text lessons must remain paused: ${planId}`,
  );
  assert.equal(
    plan.liveInstructor,
    false,
    `Video must remain paused: ${planId}`,
  );
  if (planId !== "explore")
    assert.equal(
      plan.purchaseEnabled,
      false,
      `Paid purchase must remain paused: ${planId}`,
    );
}
for (const filename of [
  "app/api/instructor/route.ts",
  "app/api/homework/analyze/route.ts",
  "app/api/liveavatar/session/route.ts",
]) {
  const source = fs.readFileSync(path.join(root, filename), "utf8");
  assert(
    source.includes("!INTERACTIVE_LESSONS_AVAILABLE") &&
      source.includes('"LESSONS_NOT_LAUNCHED"'),
    `Missing launch gate: ${filename}`,
  );
}
console.log(
  JSON.stringify(
    {
      careers: 41,
      sections: sectionCount,
      plannedLessons: lessonCount,
      originalIllustrations: hashes.size,
      otherTopicPlans: topicCount,
      launchSafeguards: "paused",
    },
    null,
    2,
  ),
);

if (process.argv.includes("--manifest")) {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/pricing",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
    "/update-password",
  ];
  for (const world of [
    "career-skills",
    ...Object.keys(learningSectionsByWorld),
  ])
    routes.push(`/learn/${world}`);
  for (const industry of careerIndustries)
    routes.push(`/learn/career-skills/industry/${industry.slug}`);
  for (const career of careerSections) {
    routes.push(`/learn/career-skills/${career.slug}`);
    const sections = careerCurricula[career.slug].sections;
    routes.push(careerWorkspaceHref(career.slug, sections[0].lessons[0].id));
    routes.push(
      careerWorkspaceHref(career.slug, sections.at(-1).lessons.at(-1).id),
    );
    routes.push(career.imageUrl);
  }
  for (const [world, sections] of Object.entries(learningSectionsByWorld))
    for (const section of sections) {
      routes.push(`/learn/${world}/${section.slug}`);
      if (section.slug !== "homework-upload")
        for (const option of section.options)
          routes.push(
            `/learn/${world}/${section.slug}/${slugifyLearningTitle(option.title)}`,
          );
    }
  fs.writeFileSync(
    "/tmp/gahn-route-manifest.json",
    JSON.stringify([...new Set(routes)]),
  );
}
