// Cross-file acceptance checks: authored coverage, stable IDs, prerequisites, photos and launch gates.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    filename,
  );
const root = fileURLToPath(new URL("..", import.meta.url));
const { careerSections, careerIndustries } = load("../lib/careerCatalog.ts");
const {
  allCourses,
  careerCourses,
  getCourse,
  courseWorkspaceHref,
  courseOverviewHref,
} = load("../lib/courses.ts");
const { learningSectionsByWorld, slugifyLearningTitle } = load(
  "../lib/learningCatalog.ts",
);
const { INTERACTIVE_LESSONS_AVAILABLE } = load("../lib/lessonLaunch.ts");
const { SUBSCRIPTION_ENTITLEMENTS } = load(
  "../lib/subscriptionEntitlements.ts",
);
assert.equal(careerSections.length, 41);
assert.equal(allCourses.length, 97);
assert.deepEqual(
  Object.keys(careerCourses).sort(),
  careerSections.map((c) => c.slug).sort(),
);
assert.equal(
  new Set(careerSections.map((c) => c.imageUrl.split("?")[0])).size,
  41,
  "Use distinct career photographs",
);
for (const career of careerSections) {
  assert(
    career.imageUrl.startsWith("https://images.unsplash.com/photo-"),
    "Career illustration was not replaced",
  );
  assert(careerIndustries.some((i) => i.title === career.category));
}
const counts = {};
for (const course of allCourses) {
  assert.equal(course.version, 2);
  assert(course.sections.length >= 6, `Incomplete sequence: ${course.id}`);
  assert(course.lessonCount >= 45);
  assert(course.requirements.length >= 2);
  assert.equal(
    new Set(course.sections.map((s) => s.id)).size,
    course.sections.length,
    "Duplicate section",
  );
  const lessons = course.sections.flatMap((s) => s.lessons);
  assert.equal(
    new Set(lessons.map((l) => l.id)).size,
    lessons.length,
    "Duplicate lesson",
  );
  assert.equal(course.lessonCount, lessons.length);
  for (const section of course.sections) {
    assert(section.lessons.length >= 5);
    assert(section.practice.length > 25);
    assert.equal(section.lessons.at(-1).kind, "checkpoint");
    assert.equal(section.lessons.at(-2).kind, "practice");
    for (const lesson of section.lessons) {
      assert(lesson.title.length > 4);
      assert(!/^(Introduction|Basics|Advanced concepts)$/i.test(lesson.title));
      assert(lesson.objective.length > 4);
    }
  }
  if (course.world === "career-skills")
    assert(course.sections.at(-1).title.startsWith("Capstone:"));
  const url = new URL(courseWorkspaceHref(course), "https://www.gahnai.com");
  assert.equal(
    getCourse(
      url.searchParams.get("world"),
      url.searchParams.get("section"),
      url.searchParams.get("topicSlug"),
    )?.id,
    course.id,
  );
  counts[course.world] ??= { courses: 0, sections: 0, entries: 0 };
  counts[course.world].courses++;
  counts[course.world].sections += course.sections.length;
  counts[course.world].entries += course.lessonCount;
}
for (const [world, sections] of Object.entries(learningSectionsByWorld))
  for (const section of sections)
    if (section.slug !== "homework-upload")
      for (const option of section.options)
        assert(
          getCourse(world, section.slug, slugifyLearningTitle(option.title)),
          `Missing ${world}/${section.slug}/${option.title}`,
        );
function ordered(slug, keys) {
  const ids = careerCourses[slug].sections.map((s) => s.id);
  for (let i = 1; i < keys.length; i++)
    assert(
      ids.indexOf(keys[i - 1]) >= 0 &&
        ids.indexOf(keys[i]) > ids.indexOf(keys[i - 1]),
      `Prerequisite sequence: ${slug} ${keys[i]}`,
    );
}
ordered("software-developer-engineer", [
  "computer",
  "html-text",
  "html-forms",
  "css-basics",
  "css-advanced",
  "js-values",
  "js-async",
  "react-basics",
  "react-app",
  "node",
  "auth",
  "deploy",
]);
ordered("front-end-developer", [
  "computer",
  "html-text",
  "css-basics",
  "js-values",
  "react-basics",
  "browser-testing",
]);
ordered("machine-learning-engineer", [
  "python-start",
  "python-functions",
  "ml-basics",
  "ml-models",
  "ml-deploy",
]);
assert.equal(INTERACTIVE_LESSONS_AVAILABLE, false);
for (const [id, plan] of Object.entries(SUBSCRIPTION_ENTITLEMENTS)) {
  assert.equal(plan.textLessons, false);
  assert.equal(plan.liveInstructor, false);
  if (id !== "explore") assert.equal(plan.purchaseEnabled, false);
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
  );
}
console.log(
  JSON.stringify(
    { worlds: counts, careerPhotographs: 41, launchSafeguards: "paused" },
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
  for (const course of allCourses) {
    routes.push(
      courseOverviewHref(course),
      courseWorkspaceHref(course),
      courseWorkspaceHref(course, course.sections.at(-1).lessons.at(-1).id),
    );
  }
  for (const [world, sections] of Object.entries(learningSectionsByWorld))
    for (const section of sections)
      routes.push(`/learn/${world}/${section.slug}`);
  fs.writeFileSync(
    "/tmp/gahn-route-manifest.json",
    JSON.stringify([...new Set(routes)]),
  );
}
