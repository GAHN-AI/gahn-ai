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
  imageUrl: string;
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
  skills: string[],
  imageUrl: string
): LearningSection {
  return {
    slug: slugify(title),
    title,
    description,
    imageUrl,
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
  skills: string[] = [],
  imageUrl: string
): LearningSection {
  return {
    slug: slugify(title),
    title,
    description,
    imageUrl,
    options: [option(title, description, skills)],
  };
}

export const learningSectionsByWorld: Record<string, LearningSection[]> = {
  "school-help": [
    schoolSubject(
      "Math",
      "Build math understanding through clear explanations, worked examples, guided practice, and problem solving.",
      ["Math Reasoning", "Problem Solving", "Practice", "Mastery"],
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80"
    ),
    schoolSubject(
      "Science",
      "Learn scientific concepts, evidence, models, experiments, and problem solving at your grade level.",
      ["Scientific Reasoning", "Evidence", "Concepts", "Practice"],
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80"
    ),
    schoolSubject(
      "English & Writing",
      "Improve grammar, writing, essays, argument, vocabulary, and clear written communication.",
      ["Writing", "Grammar", "Evidence", "Revision"],
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
    ),
    schoolSubject(
      "Reading & Study Skills",
      "Strengthen reading comprehension, note-taking, active recall, study planning, and test preparation.",
      ["Reading", "Active Recall", "Note Taking", "Study Planning"],
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
    ),
  ],

  "brain-development": [
    singleSection(
      "Memory",
      "Improve how you encode, retain, retrieve, and review information.",
      ["Memory", "Recall", "Retention", "Review"],
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Focus",
      "Build concentration, attention control, distraction management, and deeper work habits.",
      ["Focus", "Attention", "Distraction Control", "Mental Endurance"],
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Discipline",
      "Build consistency, self-control, routines, and follow-through on important goals.",
      ["Discipline", "Consistency", "Habits", "Self-Control"],
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Critical Thinking",
      "Evaluate evidence, question assumptions, analyze claims, and form stronger conclusions.",
      ["Reasoning", "Evidence", "Analysis", "Judgment"],
      "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Problem Solving",
      "Break difficult problems into parts, compare options, test solutions, and learn from mistakes.",
      ["Problem Framing", "Reasoning", "Decision Making", "Iteration"],
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Study Habits",
      "Build effective study routines using active learning, review, practice, and reflection.",
      ["Study Strategy", "Active Recall", "Review", "Consistency"],
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Time Management",
      "Plan priorities, manage deadlines, structure work sessions, and use time intentionally.",
      ["Planning", "Prioritization", "Scheduling", "Execution"],
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Learning Strategies",
      "Learn how to understand, practice, remember, and apply new information more effectively.",
      ["Learning Science", "Practice", "Recall", "Application"],
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    ),
  ],

  "general-knowledge": [
    singleSection(
      "History",
      "Learn major historical events, civilizations, people, causes, consequences, and change over time.",
      ["History", "Chronology", "Cause & Effect", "Source Analysis"],
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Technology",
      "Understand computers, software, AI, the internet, digital systems, and major technology concepts.",
      ["Technology", "Digital Literacy", "Systems", "AI"],
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Science",
      "Explore major ideas across biology, chemistry, physics, Earth science, and scientific reasoning.",
      ["Science", "Evidence", "Models", "Reasoning"],
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Economics",
      "Understand markets, incentives, trade, inflation, growth, money, and economic decision making.",
      ["Economics", "Markets", "Incentives", "Tradeoffs"],
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Geography",
      "Learn places, regions, physical geography, human geography, maps, and global connections.",
      ["Geography", "Maps", "Regions", "Global Systems"],
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Culture",
      "Explore cultures, traditions, ideas, communication, social patterns, and human differences.",
      ["Culture", "Communication", "Context", "Global Awareness"],
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Communication",
      "Learn clearer speaking, listening, writing, conversation, and everyday communication.",
      ["Speaking", "Listening", "Writing", "Conversation"],
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Life Skills",
      "Build practical knowledge for decisions, organization, relationships, responsibilities, and everyday life.",
      ["Decision Making", "Organization", "Practical Thinking", "Responsibility"],
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
    ),
  ],

  "book-intelligence": [
    singleSection(
      "Book Summaries",
      "Turn a book into a clear summary of its main ideas, events, arguments, and takeaways.",
      ["Summarization", "Main Ideas", "Recall", "Comprehension"],
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Key Lessons",
      "Identify the most useful lessons, principles, themes, and ideas from a book.",
      ["Key Ideas", "Analysis", "Application", "Recall"],
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Chapter Breakdown",
      "Break chapters into important ideas, events, arguments, examples, and connections.",
      ["Chapter Analysis", "Comprehension", "Organization", "Recall"],
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Vocabulary",
      "Learn important words from a book using definitions, context, examples, and recall practice.",
      ["Vocabulary", "Context", "Definitions", "Recall"],
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Study Notes",
      "Create organized notes that capture the ideas worth remembering and reviewing.",
      ["Note Taking", "Organization", "Summarization", "Review"],
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Book Quizzes",
      "Test understanding and memory with questions that cover important ideas and details.",
      ["Recall", "Comprehension", "Testing", "Review"],
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Critical Analysis",
      "Analyze themes, arguments, evidence, assumptions, characters, context, and author choices.",
      ["Critical Thinking", "Analysis", "Evidence", "Interpretation"],
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80"
    ),
    singleSection(
      "Personalized Reading Path",
      "Build a reading path around your goals, interests, level, and the knowledge you want to develop.",
      ["Reading Planning", "Goal Setting", "Progression", "Reflection"],
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80"
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
