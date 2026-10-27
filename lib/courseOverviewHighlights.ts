import type { Course } from "@/lib/course-content/schema";

/**
 * Short, pathway-specific public learning outcomes. Detailed gated lessons
 * stay exclusively in the private-session workspace.
 */
const softwareDeveloperOutcomes = [
  "Set up a professional coding workspace in VS Code, organize project files, use the terminal, and track changes with Git and GitHub.",
  "Create accessible web pages with semantic HTML, links, media, forms, and browser validation; structure content that works with assistive technology.",
  "Build responsive layouts with modern CSS, the box model, typography, Flexbox, Grid, and mobile-first design, then refine a real website.",
  "Write JavaScript to manage data, functions, events, and asynchronous requests; build interactive interfaces using TypeScript and React components.",
  "Create backend services with Node.js, design HTTP APIs, work with SQL databases, and apply authentication, authorization, and input-validation practices.",
  "Test and debug applications, improve accessibility and reliability, deploy a working full-stack project, and document the decisions behind it.",
];

/** Six readable outcomes derived from a course's actual authored units. */
export function courseOverviewHighlights(course: Course): string[] {
  if (course.world === "career-skills" && course.slug === "software-developer-engineer")
    return softwareDeveloperOutcomes;

  const sections = course.sections;
  if (!sections.length) return [];
  return Array.from({ length: Math.min(6, sections.length) }, (_, index) => {
    const count = Math.min(6, sections.length);
    const start = Math.floor((index * sections.length) / count);
    const end = Math.floor(((index + 1) * sections.length) / count);
    const group = sections.slice(start, Math.max(start + 1, end));
    const first = group[0];
    const last = group.at(-1)!;
    const lessonSkills = [first, last]
      .flatMap((section) => section.lessons.filter((lesson) => lesson.kind === "lesson").slice(0, 2))
      .map((lesson) => lesson.title);
    const uniqueSkills = [...new Set(lessonSkills)].slice(0, 3);
    const focus = first === last
      ? first.title.toLowerCase()
      : `${first.title.toLowerCase()} through ${last.title.toLowerCase()}`;
    const practice = last.practice.replace(/[.\s]+$/, "");
    return `Develop practical skills in ${focus}, including ${uniqueSkills.join(", ")}. Apply them by completing this task: ${practice}.`;
  });
}
