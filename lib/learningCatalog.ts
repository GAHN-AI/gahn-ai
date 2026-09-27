export type LearningOption = {
  title: string;
  description: string;
  skills?: string[];
  tools?: string[];
  modules?: string[];
};

export type LearningSection = {
  slug: string;
  title: string;
  description: string;
  options: LearningOption[];
};

function option(
  title: string,
  description: string,
  skills: string[] = [],
  tools: string[] = [],
  modules: string[] = []
): LearningOption {
  return { title, description, skills, tools, modules };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const schoolLevels = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "College",
];

function schoolSubject(
  title: string,
  description: string,
  skills: string[]
): LearningSection {
  return {
    slug: slugify(title),
    title,
    description,
    options: schoolLevels.map((level) =>
      option(
        level,
        `Learn ${title} at the ${level} level with clear explanations, guided practice, review, and mastery checks.`,
        skills
      )
    ),
  };
}

function singleSection(
  title: string,
  description: string,
  skills: string[] = []
): LearningSection {
  return {
    slug: slugify(title),
    title,
    description,
    options: [option(title, description, skills)],
  };
}

export const learningSectionsByWorld: Record<string, LearningSection[]> = {
  "school-help": [
    schoolSubject(
      "Math",
      "Build math understanding through clear explanations, worked examples, guided practice, and problem solving.",
      ["Math Reasoning", "Problem Solving", "Practice", "Mastery"]
    ),
    schoolSubject(
      "Science",
      "Learn scientific concepts, evidence, models, experiments, and problem solving at your grade level.",
      ["Scientific Reasoning", "Evidence", "Concepts", "Practice"]
    ),
    schoolSubject(
      "English & Writing",
      "Improve grammar, writing, essays, argument, vocabulary, and clear written communication.",
      ["Writing", "Grammar", "Evidence", "Revision"]
    ),
    schoolSubject(
      "Reading & Study Skills",
      "Strengthen reading comprehension, note-taking, active recall, study planning, and test preparation.",
      ["Reading", "Active Recall", "Note Taking", "Study Planning"]
    ),
  ],

  "brain-development": [
    singleSection(
      "Memory",
      "Improve how you encode, retain, retrieve, and review information.",
      ["Memory", "Recall", "Retention", "Review"]
    ),
    singleSection(
      "Focus",
      "Build concentration, attention control, distraction management, and deeper work habits.",
      ["Focus", "Attention", "Distraction Control", "Mental Endurance"]
    ),
    singleSection(
      "Discipline",
      "Build consistency, self-control, routines, and follow-through on important goals.",
      ["Discipline", "Consistency", "Habits", "Self-Control"]
    ),
    singleSection(
      "Critical Thinking",
      "Evaluate evidence, question assumptions, analyze claims, and form stronger conclusions.",
      ["Reasoning", "Evidence", "Analysis", "Judgment"]
    ),
    singleSection(
      "Problem Solving",
      "Break difficult problems into parts, compare options, test solutions, and learn from mistakes.",
      ["Problem Framing", "Reasoning", "Decision Making", "Iteration"]
    ),
    singleSection(
      "Study Habits",
      "Build effective study routines using active learning, review, practice, and reflection.",
      ["Study Strategy", "Active Recall", "Review", "Consistency"]
    ),
    singleSection(
      "Time Management",
      "Plan priorities, manage deadlines, structure work sessions, and use time intentionally.",
      ["Planning", "Prioritization", "Scheduling", "Execution"]
    ),
    singleSection(
      "Learning Strategies",
      "Learn how to understand, practice, remember, and apply new information more effectively.",
      ["Learning Science", "Practice", "Recall", "Application"]
    ),
  ],

  "general-knowledge": [
    singleSection(
      "History",
      "Learn major historical events, civilizations, people, causes, consequences, and change over time.",
      ["History", "Chronology", "Cause & Effect", "Source Analysis"]
    ),
    singleSection(
      "Technology",
      "Understand computers, software, AI, the internet, digital systems, and major technology concepts.",
      ["Technology", "Digital Literacy", "Systems", "AI"]
    ),
    singleSection(
      "Science",
      "Explore major ideas across biology, chemistry, physics, Earth science, and scientific reasoning.",
      ["Science", "Evidence", "Models", "Reasoning"]
    ),
    singleSection(
      "Economics",
      "Understand markets, incentives, trade, inflation, growth, money, and economic decision making.",
      ["Economics", "Markets", "Incentives", "Tradeoffs"]
    ),
    singleSection(
      "Geography",
      "Learn places, regions, physical geography, human geography, maps, and global connections.",
      ["Geography", "Maps", "Regions", "Global Systems"]
    ),
    singleSection(
      "Culture",
      "Explore cultures, traditions, ideas, communication, social patterns, and human differences.",
      ["Culture", "Communication", "Context", "Global Awareness"]
    ),
    singleSection(
      "Communication",
      "Learn clearer speaking, listening, writing, conversation, and everyday communication.",
      ["Speaking", "Listening", "Writing", "Conversation"]
    ),
    singleSection(
      "Life Skills",
      "Build practical knowledge for decisions, organization, relationships, responsibilities, and everyday life.",
      ["Decision Making", "Organization", "Practical Thinking", "Responsibility"]
    ),
  ],

  "book-intelligence": [
    singleSection(
      "Book Summaries",
      "Turn a book into a clear summary of its main ideas, events, arguments, and takeaways.",
      ["Summarization", "Main Ideas", "Recall", "Comprehension"]
    ),
    singleSection(
      "Key Lessons",
      "Identify the most useful lessons, principles, themes, and ideas from a book.",
      ["Key Ideas", "Analysis", "Application", "Recall"]
    ),
    singleSection(
      "Chapter Breakdown",
      "Break chapters into important ideas, events, arguments, examples, and connections.",
      ["Chapter Analysis", "Comprehension", "Organization", "Recall"]
    ),
    singleSection(
      "Vocabulary",
      "Learn important words from a book using definitions, context, examples, and recall practice.",
      ["Vocabulary", "Context", "Definitions", "Recall"]
    ),
    singleSection(
      "Study Notes",
      "Create organized notes that capture the ideas worth remembering and reviewing.",
      ["Note Taking", "Organization", "Summarization", "Review"]
    ),
    singleSection(
      "Book Quizzes",
      "Test understanding and memory with questions that cover important ideas and details.",
      ["Recall", "Comprehension", "Testing", "Review"]
    ),
    singleSection(
      "Critical Analysis",
      "Analyze themes, arguments, evidence, assumptions, characters, context, and author choices.",
      ["Critical Thinking", "Analysis", "Evidence", "Interpretation"]
    ),
    singleSection(
      "Personalized Reading Path",
      "Build a reading path around your goals, interests, level, and the knowledge you want to develop.",
      ["Reading Planning", "Goal Setting", "Progression", "Reflection"]
    ),
  ],
};

export function getLearningSections(world: string) {
  return learningSectionsByWorld[world] ?? [];
}

export function getLearningSection(world: string, sectionSlug: string) {
  return getLearningSections(world).find((section) => section.slug === sectionSlug);
}

export function slugifyLearningTitle(value: string) {
  return slugify(value);
}

export function getLearningOption(
  world: string,
  sectionSlug: string,
  topicSlug: string
) {
  const section = getLearningSection(world, sectionSlug);
  if (!section) return null;

  const option = section.options.find(
    (item) => slugifyLearningTitle(item.title) === topicSlug
  );

  return option ? { section, option } : null;
}
