"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import LanguageSelector from "@/components/LanguageSelector";
import { careerSections } from "@/lib/careerCatalog";

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
      "Explore real career fields first, then choose a specific career or professional skill and learn it step-by-step with your AI instructor.",
    placeholder:
      "What career or skill do you want to learn? Example: nurse, electrician, software engineer...",
    Icon: Briefcase,
    categories: [],
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
  const searchParams = useSearchParams();
  const world = params.world;
  const learningWorld = learningWorlds[world];
  const [learningRequest, setLearningRequest] = useState("");
  const [language, setLanguage] = useState(
    searchParams.get("language") || "English"
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("gahn-language");
    if (!searchParams.get("language") && stored) setLanguage(stored);
  }, [searchParams]);

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("gahn-language", nextLanguage);
  }

  if (!learningWorld) {
    return (
      <main className="min-h-screen bg-[#F8FBFF] px-6 py-12 text-[#0B1739]">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1677FF] hover:text-[#0F65E8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="mt-12 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-10 text-center shadow-[0_18px_55px_rgba(11,23,57,0.08)]">
            <h1 className="text-3xl font-extrabold">Learning world not found</h1>
            <p className="mt-3 text-[#53657D]">This learning world does not exist.</p>
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
      `/lesson/custom?world=${encodeURIComponent(world)}&topic=${encodeURIComponent(
        cleanTopic
      )}&language=${encodeURIComponent(language)}`
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startLearning(learningRequest);
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="hidden text-sm font-extrabold sm:block">GAHN AI</span>
            </Link>
          </div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_18px_55px_rgba(11,23,57,0.07)] sm:p-8 lg:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#EAF3FF]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-[35%] h-44 w-96 rotate-[-8deg] rounded-[999px] bg-[#F5F8FC]" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
              <Icon className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">Learning World</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#53657D] sm:text-base">{description}</p>
              <p className="mt-3 text-sm font-semibold text-[#1677FF]">Teaching language: {language}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_58%,#EAF3FF_100%)] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#1677FF] shadow-sm">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">Start with anything</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.02em]">What do you want to learn?</h2>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                Search directly, or use the structured sections below. Your AI instructor can teach in {language}.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8AA0]" strokeWidth={1.75} />
              <input
                value={learningRequest}
                onChange={(event) => setLearningRequest(event.target.value)}
                placeholder={placeholder}
                className="h-14 w-full rounded-xl border border-[#D7E3F2] bg-white pl-12 pr-4 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />
            </div>
            <button
              type="submit"
              disabled={!learningRequest.trim()}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-6 text-sm font-bold text-white hover:bg-[#0F65E8] disabled:cursor-not-allowed disabled:bg-[#B8C7DA]"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>

        <section className="mt-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              {world === "career-skills" ? "Career Library" : "Explore Topics"}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">
              {world === "career-skills" ? "Choose a Career Section" : `Explore ${title}`}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#53657D]">
              {world === "career-skills"
                ? "Start with a broad field. The next page shows the careers and skills inside that field, then you choose what you want Alex to teach."
                : "Choose a category or start with a specific topic."}
            </p>
          </div>

          {world === "career-skills" ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {careerSections.map((section) => (
                <Link
                  key={section.slug}
                  href={`/learn/career-skills/${section.slug}?language=${encodeURIComponent(language)}`}
                  className="group rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.05)] hover:border-[#1677FF]/45 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                      <Briefcase className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="rounded-full bg-[#F1F7FF] px-3 py-1 text-xs font-bold text-[#1677FF]">
                      {section.lessons.length} paths
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#0B1739]">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#53657D]">{section.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1677FF]">
                    Explore section
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {categories.map((category) => (
                <div key={category.title} className="rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.05)]">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#53657D]">{category.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => startLearning(topic)}
                        className="rounded-full border border-[#D7E3F2] bg-white px-4 py-2 text-sm font-semibold text-[#53657D] hover:border-[#1677FF]/45 hover:bg-[#F1F7FF] hover:text-[#1677FF]"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => startLearning(category.title)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1677FF] hover:text-[#0F65E8]"
                  >
                    Learn about {category.title}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 text-center shadow-[0_12px_35px_rgba(11,23,57,0.05)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">Custom Learning</p>
          <h2 className="mt-2 text-xl font-extrabold">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#53657D]">
            Use the search box above. GAHN AI can build a private learning path around what you actually want or need to learn.
          </p>
        </section>
      </div>
    </main>
  );
}
