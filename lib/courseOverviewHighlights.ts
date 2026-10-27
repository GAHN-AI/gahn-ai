import type { Course } from "@/lib/course-content/schema";
import { careerSections } from "@/lib/careerCatalog";

/**
 * Short public topic highlights. Full lesson objectives and projects remain in
 * the private-session curriculum, not on the overview page.
 */
const specificCareerHighlights: Record<string, string[]> = {
  "software-developer-engineer": [
    "Build websites with HTML and CSS",
    "Add interactivity with JavaScript and React",
    "Use Git, GitHub, and TypeScript",
    "Create APIs with Node.js",
    "Work with SQL databases and authentication",
    "Test and deploy full-stack applications",
  ],
  "cyber-security-analyst": [
    "Understand networks and common security threats",
    "Investigate security alerts and system logs",
    "Apply access controls and defensive measures",
    "Assess risks and recommend safeguards",
    "Document incidents and response steps",
    "Practice security investigations safely",
  ],
};

/**
 * Readable six-item overview based on each path's authored subject matter.
 * Avoid displaying long generated descriptions or technical course outlines.
 */
export function courseOverviewHighlights(course: Course): string[] {
  if (course.world === "career-skills") {
    const dedicated = specificCareerHighlights[course.slug];
    if (dedicated) return dedicated;

    // Career Skills already has a manually curated, pathway-specific skill list.
    const career = careerSections.find((item) => item.slug === course.slug);
    if (career?.skills.length) return career.skills.slice(0, 6);
  }

  // Other worlds use their authored section names instead of fabricated claims.
  // Spread the selection across the course without displaying capstone labels.
  const sections = course.sections.filter(
    (section) => !/^(capstone|final project|planned final project)\b/i.test(section.title),
  );
  if (!sections.length) return [];
  const count = Math.min(6, sections.length);
  return Array.from({ length: count }, (_, index) => {
    const sample = Math.floor(((index + 0.5) * sections.length) / count);
    return sections[Math.min(sample, sections.length - 1)].title;
  });
}
