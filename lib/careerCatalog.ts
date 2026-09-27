export type CareerLesson = {
  title: string;
  description: string;
};

export type CareerSection = {
  slug: string;
  title: string;
  description: string;
  lessons: CareerLesson[];
};

function career(
  slug: string,
  title: string,
  description: string
): CareerSection {
  return {
    slug,
    title,
    description,
    lessons: [{ title, description }],
  };
}

export const careerSections: CareerSection[] = [
  career(
    "entrepreneurship",
    "Entrepreneurship",
    "Learn how to validate ideas, build an MVP, understand customers, create a business model, and grow a startup."
  ),
  career(
    "leadership",
    "Leadership",
    "Build leadership skills for setting direction, making decisions, communicating clearly, and guiding teams."
  ),
  career(
    "communication",
    "Communication",
    "Improve speaking, listening, writing, presentations, professional communication, and clear thinking."
  ),
  career(
    "sales",
    "Sales",
    "Learn prospecting, discovery, value propositions, objections, negotiation, closing, and customer relationships."
  ),
  career(
    "marketing",
    "Marketing",
    "Learn positioning, customer research, branding, content, digital marketing, campaigns, and measurement."
  ),
  career(
    "personal-finance",
    "Personal Finance",
    "Learn budgeting, saving, banking, credit, debt, taxes, insurance, and responsible financial planning."
  ),
  career(
    "investing-basics",
    "Investing Basics",
    "Learn risk, return, stocks, bonds, funds, diversification, valuation basics, and long-term investing principles."
  ),
  career(
    "resume-and-interview-skills",
    "Resume & Interview Skills",
    "Build stronger resumes, prepare interview answers, communicate achievements, and practice professional interviewing."
  ),
  career(
    "project-management",
    "Project Management",
    "Learn scope, planning, schedules, priorities, risk, teamwork, communication, and project delivery."
  ),
  career(
    "career-planning",
    "Career Planning",
    "Identify career paths, strengths, skills to build, education options, goals, and practical next steps."
  ),
];

export function getCareerSection(slug: string) {
  return careerSections.find((section) => section.slug === slug);
}
