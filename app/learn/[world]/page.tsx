"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Globe2,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";

type LearningCategory = {
  title: string;
  description: string;
  topics: string[];
};

type LearningWorld = {
  title: string;
  description: string;
  placeholder: string;
  Icon: LucideIcon;
  categories: LearningCategory[];
};

const learningWorlds: Record<string, LearningWorld> = {
  "career-skills": {
    title: "Career Skills",
    description:
      "Learn almost any career, professional skill, business skill, or job-related ability with your AI instructor.",
    placeholder:
      "What career or skill do you want to learn? Example: entrepreneurship, coding, marketing...",
    Icon: Briefcase,
    categories: [
      {
        title: "Business & Entrepreneurship",
        description:
          "Learn how businesses are created, operated, financed, marketed, and grown.",
        topics: [
          "Entrepreneurship",
          "Business Strategy",
          "Marketing",
          "Sales",
          "Business Finance",
          "Leadership",
          "Management",
          "Startups",
        ],
      },
      {
        title: "Technology Careers",
        description:
          "Build technical knowledge and practical skills for modern technology careers.",
        topics: [
          "Software Development",
          "Web Development",
          "Artificial Intelligence",
          "Cybersecurity",
          "Data Science",
          "Cloud Computing",
          "IT Support",
          "UX Design",
        ],
      },
      {
        title: "Professional Skills",
        description:
          "Develop skills useful across jobs, companies, and industries.",
        topics: [
          "Communication",
          "Public Speaking",
          "Negotiation",
          "Project Management",
          "Time Management",
          "Problem Solving",
          "Teamwork",
          "Professional Writing",
        ],
      },
      {
        title: "Career Exploration",
        description:
          "Explore careers and learn what the work, skills, and path actually look like.",
        topics: [
          "Explore a Career",
          "Career Requirements",
          "Career Skills",
          "Job Interviewing",
          "Resume Skills",
          "Workplace Skills",
          "Career Planning",
          "Real-World Career Tasks",
        ],
      },
    ],
  },

  "school-help": {
    title: "School Help",
    description:
      "Bring your homework, test topic, difficult question, or school subject and learn it step-by-step with an AI instructor.",
    placeholder:
      "What do you need help with? Paste a homework problem or type a school topic...",
    Icon: GraduationCap,
    categories: [
      {
        title: "Homework Help",
        description:
          "Bring a homework question and learn how to solve it instead of only receiving the answer.",
        topics: [
          "Help With My Homework",
          "Explain a Homework Problem",
          "Check My Work",
          "Teach Me This Problem",
          "Practice a Similar Problem",
        ],
      },
      {
        title: "Math",
        description:
          "Get step-by-step instruction across major school mathematics subjects.",
        topics: [
          "Arithmetic",
          "Pre-Algebra",
          "Algebra",
          "Geometry",
          "Trigonometry",
          "Statistics",
          "Pre-Calculus",
          "Calculus",
        ],
      },
      {
        title: "Science",
        description:
          "Learn scientific concepts, solve problems, and prepare for tests.",
        topics: [
          "Biology",
          "Chemistry",
          "Physics",
          "Earth Science",
          "Environmental Science",
          "Anatomy",
          "Astronomy",
        ],
      },
      {
        title: "English & Writing",
        description:
          "Improve writing, reading comprehension, grammar, vocabulary, and analysis.",
        topics: [
          "Essay Writing",
          "Grammar",
          "Reading Comprehension",
          "Vocabulary",
          "Literature",
          "Research Writing",
          "Thesis Statements",
        ],
      },
      {
        title: "History & Social Studies",
        description:
          "Learn historical events, government, economics, geography, and society.",
        topics: [
          "U.S. History",
          "World History",
          "Government",
          "Economics",
          "Geography",
          "Civics",
          "Social Studies",
        ],
      },
      {
        title: "Test & Quiz Prep",
        description:
          "Turn an upcoming assessment into a personalized review and practice session.",
        topics: [
          "Prepare for a Test",
          "Prepare for a Quiz",
          "Practice Questions",
          "Review My Weak Areas",
          "Explain My Mistakes",
          "Create a Study Session",
        ],
      },
    ],
  },

  "brain-development": {
    title: "Brain Development",
    description:
      "Train focus, memory, reasoning, comprehension, study ability, and other learning skills.",
    placeholder:
      "What do you want to improve? Example: focus, memory, reading comprehension...",
    Icon: Brain,
    categories: [
      {
        title: "Focus & Attention",
        description:
          "Train your ability to concentrate, resist distractions, and work deeply.",
        topics: [
          "Focus Training",
          "Attention Control",
          "Distraction Control",
          "Deep Work",
          "Concentration",
          "Focus Routines",
        ],
      },
      {
        title: "Memory",
        description:
          "Learn methods for remembering information more effectively.",
        topics: [
          "Active Recall",
          "Spaced Repetition",
          "Long-Term Memory",
          "Memorization",
          "Memory Techniques",
          "Remember What I Study",
        ],
      },
      {
        title: "Reading Ability",
        description:
          "Strengthen comprehension, vocabulary, retention, and reading efficiency.",
        topics: [
          "Reading Comprehension",
          "Reading Speed",
          "Vocabulary",
          "Reading Retention",
          "Understanding Difficult Text",
        ],
      },
      {
        title: "Thinking Skills",
        description:
          "Practice reasoning, analysis, problem solving, and better decision-making.",
        topics: [
          "Critical Thinking",
          "Logical Reasoning",
          "Problem Solving",
          "Decision Making",
          "Analytical Thinking",
          "Creative Thinking",
        ],
      },
      {
        title: "Learning Skills",
        description:
          "Learn how to learn more effectively instead of relying on passive studying.",
        topics: [
          "How to Study",
          "How to Take Notes",
          "How to Practice",
          "How to Learn Faster",
          "Study Planning",
          "Learning Strategies",
        ],
      },
    ],
  },

  "general-knowledge": {
    title: "General Knowledge",
    description:
      "Learn about almost any academic, practical, historical, scientific, technological, or societal topic.",
    placeholder:
      "What do you want to understand? Example: space, economics, history, technology...",
    Icon: Globe2,
    categories: [
      {
        title: "History",
        description:
          "Understand civilizations, major events, people, movements, and historical change.",
        topics: [
          "World History",
          "U.S. History",
          "Ancient Civilizations",
          "European History",
          "Military History",
          "Modern History",
        ],
      },
      {
        title: "Science",
        description:
          "Explore the natural world and important scientific ideas.",
        topics: [
          "Biology",
          "Physics",
          "Chemistry",
          "Space",
          "Earth Science",
          "Environment",
          "Human Body",
        ],
      },
      {
        title: "Technology",
        description:
          "Understand computers, software, AI, the internet, and emerging technologies.",
        topics: [
          "Computers",
          "Internet",
          "Artificial Intelligence",
          "Cybersecurity",
          "Software",
          "Robotics",
          "Emerging Technology",
        ],
      },
      {
        title: "Society & The World",
        description:
          "Learn how governments, economies, cultures, and societies operate.",
        topics: [
          "Government",
          "Economics",
          "Geography",
          "Culture",
          "Politics",
          "Global Affairs",
          "Society",
        ],
      },
      {
        title: "Practical Life Knowledge",
        description:
          "Learn useful knowledge that can help with everyday adult life.",
        topics: [
          "Personal Finance",
          "Communication",
          "Budgeting",
          "Taxes",
          "Credit",
          "Time Management",
          "Everyday Problem Solving",
        ],
      },
    ],
  },

  "book-intelligence": {
    title: "Book Intelligence",
    description:
      "Use books as learning systems: understand their ideas, remember them, question them, and apply them.",
    placeholder:
      "What book or idea do you want to learn? Type a book title, author, or concept...",
    Icon: BookOpen,
    categories: [
      {
        title: "Learn a Book",
        description:
          "Turn a book into a guided learning experience with your AI instructor.",
        topics: [
          "Teach Me a Book",
          "Explain the Main Ideas",
          "Learn Chapter by Chapter",
          "Important Lessons",
          "Key Concepts",
        ],
      },
      {
        title: "Deep Understanding",
        description:
          "Go beyond summaries and understand what difficult passages and arguments mean.",
        topics: [
          "Explain a Passage",
          "Themes",
          "Arguments",
          "Author's Ideas",
          "Difficult Concepts",
          "Analyze a Chapter",
        ],
      },
      {
        title: "Remember What You Read",
        description:
          "Use active learning instead of reading something once and forgetting it.",
        topics: [
          "Book Recall",
          "Practice Questions",
          "Flashcards",
          "Memory Review",
          "Chapter Review",
          "Test My Understanding",
        ],
      },
      {
        title: "Apply What You Learn",
        description:
          "Turn knowledge from books into decisions, projects, skills, and actions.",
        topics: [
          "Apply This Book",
          "Real-World Examples",
          "Exercises",
          "Projects",
          "Personal Application",
          "Action Plan",
        ],
      },
      {
        title: "Compare Ideas",
        description:
          "Connect knowledge between authors, books, theories, and subjects.",
        topics: [
          "Compare Two Books",
          "Compare Authors",
          "Connect Ideas",
          "Compare Arguments",
          "Different Perspectives",
        ],
      },
    ],
  },
};

export default function LearningWorldPage() {
  const params = useParams<{ world: string }>();
  const router = useRouter();

  const world = params.world;
  const learningWorld = learningWorlds[world];

  const [learningRequest, setLearningRequest] = useState("");

  if (!learningWorld) {
    return (
      <main className="min-h-screen bg-white px-6 py-12 text-[#111827]">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#16a34a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mt-12 rounded-2xl border border-[#dbe3ee] bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-extrabold">
              Learning world not found
            </h1>

            <p className="mt-3 text-[#4b5563]">
              This learning world does not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { title, description, placeholder, Icon, categories } = learningWorld;

  function startLearning(topic: string) {
    const cleanTopic = topic.trim();

    if (!cleanTopic) return;

    router.push(
      `/lesson/custom?world=${encodeURIComponent(
        world
      )}&topic=${encodeURIComponent(cleanTopic)}`
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startLearning(learningRequest);
  }

  return (
    <main className="min-h-screen bg-white px-5 py-8 text-[#111827] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#16a34a] transition hover:text-[#15803d]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <section className="mt-8 rounded-2xl border border-[#dbe3ee] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#dcfce7] text-[#16a34a]">
              <Icon className="h-7 w-7" strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#22c55e]">
                Learning World
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4b5563] sm:text-base">
                {description}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#16a34a]">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>

            <div>
              <h2 className="text-xl font-extrabold">
                What do you want to learn?
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#4b5563]">
                You are not limited to the categories below. Ask about almost
                any topic that belongs in {title}.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]"
                strokeWidth={1.75}
              />

              <input
                value={learningRequest}
                onChange={(event) => setLearningRequest(event.target.value)}
                placeholder={placeholder}
                className="h-14 w-full rounded-xl border border-[#dbe3ee] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/15"
              />
            </div>

            <button
              type="submit"
              disabled={!learningRequest.trim()}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#22c55e] px-6 text-sm font-bold text-white transition hover:bg-[#16a34a] disabled:cursor-not-allowed disabled:bg-[#d1d5db]"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-[-0.02em]">
            Explore {title}
          </h2>

          <p className="mt-2 text-sm text-[#4b5563]">
            Choose a category or start with a specific topic.
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-[#dbe3ee] bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#4b5563]">
                  {category.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {category.topics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => startLearning(topic)}
                      className="rounded-full border border-[#dbe3ee] bg-white px-4 py-2 text-sm font-semibold text-[#374151] transition hover:border-[#22c55e] hover:bg-[#f0fdf4] hover:text-[#15803d]"
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => startLearning(category.title)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#16a34a] transition hover:text-[#15803d]"
                >
                  Learn about {category.title}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#dbe3ee] bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold">
            Can't find what you're looking for?
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#4b5563]">
            Use the search box above. GAHN AI is designed to build a learning
            path around what you actually want or need to learn.
          </p>
        </section>
      </div>
    </main>
  );
}