"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";

type Plan = {
  id:
    | "explore"
    | "learner_plus"
    | "mastery"
    | "career_pro"
    | "classroom_ai"
    | "school_os"
    | "district_government";

  name: string;
  price: string;
  period: string;
  audience: string;
  description: string;
  buttonLabel: string;
  available: boolean;
  featured?: boolean;
  badge?: string;
  features: string[];
};

const individualPlans: Plan[] = [
  {
    id: "explore",
    name: "Explore",
    price: "$0",
    period: "/ month",
    audience: "Try GAHN before paying",
    description:
      "Explore the learning system, browse every learning world, and experience the foundations of GAHN AI.",
    buttonLabel: "Start free",
    available: true,
    features: [
      "Browse all 5 learning worlds",
      "Explore structured career, school, brain, knowledge, and book libraries",
      "Limited AI-guided learning access during MVP",
      "Basic explanations and guided practice",
      "Basic notes and lesson history",
      "Preview career curricula and learning paths",
      "Access new free MVP features as they become available",
    ],
  },

  {
    id: "learner_plus",
    name: "Learner Plus",
    price: "$29",
    period: "/ month",
    audience: "For students, self-learners, and everyday learning",
    description:
      "A complete personal AI learning experience with live tutoring, adaptive support, homework tools, memory, and interactive lessons.",
    buttonLabel: "Coming soon",
    available: false,
    featured: true,
    badge: "Best value",
    features: [
      "Everything in Explore",
      "30 monthly live AI instructor minutes",
      "Real-time voice conversations with AI instructors",
      "GAHN interactive Learning Canvas",
      "Visual explanations, examples, quizzes, and guided practice",
      "Adaptive reteaching when you make mistakes",
      "Homework photo, screenshot, PDF, and document support",
      "Saved learner memory for strengths, weaknesses, and preferences",
      "Personalized lesson difficulty and pacing",
      "Detailed lesson summaries",
      "Searchable personal notes",
      "Generated study guides and review questions",
      "Multilingual instruction across supported languages",
      "Basic mastery checks",
      "Learning history and progress tracking",
    ],
  },

  {
    id: "mastery",
    name: "Mastery",
    price: "$79",
    period: "/ month",
    audience: "For learners who want deeper mastery",
    description:
      "Advanced tutoring, longer AI instruction, stronger adaptive learning, assessments, files, browser tools, and deeper learner memory.",
    buttonLabel: "Coming soon",
    available: false,
    badge: "Advanced learning",
    features: [
      "Everything in Learner Plus",
      "90 monthly live AI instructor minutes",
      "Longer private tutoring sessions",
      "Advanced adaptive teaching",
      "Deeper long-term learner memory",
      "Advanced mastery assessments",
      "Skill-gap detection",
      "Automatic review of weak concepts",
      "More advanced Learning Canvas activities",
      "Advanced homework and file analysis",
      "Document and image understanding",
      "Interactive diagrams and visual explanations",
      "Browser-guided learning on approved websites",
      "Coding lessons with interactive code practice",
      "Advanced quizzes and practice generation",
      "Personalized review schedules",
      "More detailed learning analytics",
      "Mastery-based lesson progression",
    ],
  },

  {
    id: "career_pro",
    name: "Career Pro",
    price: "$149",
    period: "/ month",
    audience: "For serious career and professional skill development",
    description:
      "GAHN's most advanced individual plan for complete career programs, real projects, professional tools, simulations, and career preparation.",
    buttonLabel: "Coming soon",
    available: false,
    badge: "Most advanced",
    features: [
      "Everything in Mastery",
      "180 monthly live AI instructor minutes",
      "Complete career-specific learning programs",
      "Role-specific languages, frameworks, software, and tools",
      "Advanced coding workspace",
      "Code execution, testing, debugging, and project guidance",
      "Professional browser-guided learning",
      "Real-world projects and capstones",
      "Career simulations and case studies",
      "Advanced professional document analysis",
      "Portfolio-building guidance",
      "Career mastery assessments",
      "Detailed professional skill-gap reports",
      "Resume coaching",
      "LinkedIn profile coaching",
      "Interview simulations",
      "Presentation and communication coaching",
      "Professional software and workflow training",
      "Deeper career progress analytics",
      "Priority access to new Career Skills tools",
      "Certificates and portfolio evidence when verification launches",
    ],
  },
];

const schoolPlans: Plan[] = [
  {
    id: "classroom_ai",
    name: "Classroom AI",
    price: "$499",
    period: "/ month",
    audience: "For teachers, homeschool programs, and individual classrooms",
    description:
      "Bring GAHN AI into the classroom while keeping the teacher in control of instruction, assignments, students, and learning goals.",
    buttonLabel: "Coming soon",
    available: false,
    badge: "For classrooms",
    features: [
      "Teacher classroom dashboard",
      "Teacher-controlled AI instructor",
      "Classroom AI teaching sessions",
      "Connect classroom instruction to a display or television",
      "Create AI-guided class lessons",
      "Assign lessons to students",
      "Student classroom accounts",
      "Homework and assignment tools",
      "Quiz and assessment creation",
      "Teacher lesson controls",
      "Curriculum and topic selection",
      "Student learning progress",
      "Classroom-level analytics",
      "Shared learning resources",
      "Teacher notes and lesson planning",
      "AI-generated practice material",
      "Multilingual classroom learning",
      "Teacher-controlled student AI access",
    ],
  },

  {
    id: "school_os",
    name: "School OS",
    price: "$2,000",
    period: "/ month",
    audience: "For schools and larger education programs",
    description:
      "A school-wide AI learning system for students, teachers, administrators, classrooms, curriculum, assignments, and analytics.",
    buttonLabel: "Coming soon",
    available: false,
    featured: true,
    badge: "School platform",
    features: [
      "Everything in Classroom AI",
      "Multiple teachers and classrooms",
      "School administrator dashboard",
      "Student roster management",
      "Teacher account management",
      "School-wide learning analytics",
      "Curriculum management",
      "School lesson libraries",
      "School-wide assignments and assessments",
      "Classroom AI instructor management",
      "Teacher-controlled AI instruction",
      "Student progress reporting",
      "School performance dashboards",
      "Learning intervention insights",
      "Permission and role controls",
      "Expanded AI instructor usage",
      "School-wide multilingual learning",
      "Centralized student learning history",
      "Administrative reporting",
      "Future LMS and school-system integrations",
    ],
  },

  {
    id: "district_government",
    name: "District / Government",
    price: "Custom",
    period: "",
    audience: "For districts, governments, and large institutions",
    description:
      "Custom deployment, AI capacity, integrations, security, support, administration, and learning infrastructure for large organizations.",
    buttonLabel: "Contact sales later",
    available: false,
    badge: "Enterprise",
    features: [
      "Everything in School OS",
      "Custom student and educator capacity",
      "Custom AI instructor usage",
      "District-wide administration",
      "Multiple schools and organizations",
      "Centralized district analytics",
      "Custom reporting",
      "Custom curriculum deployment",
      "Organization-wide permissions",
      "Single sign-on integrations",
      "LMS and SIS integrations",
      "Custom security requirements",
      "Custom data controls",
      "Dedicated implementation support",
      "Custom onboarding and training",
      "Priority support",
      "Custom invoicing and contracts",
      "Custom API and integration options",
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`gahn-card-hover relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border bg-white shadow-[0_14px_40px_rgba(11,23,57,0.055)] ${
        plan.featured
          ? "border-[#0B356F] shadow-[0_20px_55px_rgba(11,53,111,0.11)]"
          : "border-[#D7E3F2]"
      }`}
    >
      {plan.featured && (
        <div className="bg-[#0B356F] px-6 py-2.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white">
          {plan.badge}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          {!plan.featured && plan.badge && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
              {plan.badge}
            </p>
          )}

          <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#0B1739]">
            {plan.name}
          </h3>

          <p className="mt-2 min-h-[40px] text-sm font-semibold leading-5 text-[#53657D]">
            {plan.audience}
          </p>
        </div>

        <div className="mt-7 flex items-end gap-1.5">
          <span
            className={`font-bold tracking-[-0.045em] text-[#0B1739] ${
              plan.price === "Custom"
                ? "text-4xl"
                : "text-4xl sm:text-5xl"
            }`}
          >
            {plan.price}
          </span>

          {plan.period && (
            <span className="pb-1.5 text-sm font-medium text-[#53657D]">
              {plan.period}
            </span>
          )}
        </div>

        <p className="mt-5 min-h-[100px] text-[15px] leading-7 text-[#53657D]">
          {plan.description}
        </p>

        {plan.available ? (
          <Link
            href="/signup"
            className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#1267D6] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0B56BA]"
          >
            {plan.buttonLabel}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-lg border border-[#C9D4E2] bg-[#F7F9FB] px-5 py-3.5 text-sm font-bold text-[#68798E]"
          >
            {plan.buttonLabel}
          </button>
        )}

        <div className="my-7 h-px bg-[#E1E7EF]" />

        <p className="text-sm font-bold text-[#0B1739]">
          Key features:
        </p>

        <ul className="mt-5 space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                className="mt-0.5 h-[18px] w-[18px] flex-none text-[#1267D6]"
                strokeWidth={2.2}
              />

              <span className="text-sm leading-6 text-[#24364D]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {!plan.available && (
          <p className="mt-auto pt-8 text-xs leading-5 text-[#7A8AA0]">
            This subscription is not available for purchase yet. Checkout will
            remain disabled until its features, usage limits, and account
            entitlements are connected and tested.
          </p>
        )}
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8FBFF] font-sans text-[#0B1739]">
      <header className="sticky top-0 z-50 border-b border-[#D7E3F2] bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 flex-none rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-xl font-extrabold tracking-[-0.025em]">
                GAHN AI
              </p>

              <p className="hidden text-[8px] font-bold uppercase tracking-[0.17em] text-[#53657D] sm:block">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#53657D] lg:flex">
            <Link href="/" className="hover:text-[#1677FF]">
              Home
            </Link>

            <Link href="/#programs" className="hover:text-[#1677FF]">
              Programs
            </Link>

            <Link href="/#platform" className="hover:text-[#1677FF]">
              Platform
            </Link>

            <Link href="/#instructors" className="hover:text-[#1677FF]">
              Instructors
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-[#D7E3F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40 hover:bg-[#F8FBFF] sm:px-5"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F65E8] sm:px-5"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-[#D7E3F2] bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_46%,#F5F8FC_46%,#F5F8FC_72%,#EAF3FF_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[680px] w-[680px] rounded-full bg-[#EAF3FF]/85"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-[30%] h-64 w-[620px] rotate-[-8deg] rounded-[999px] bg-white/90"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#CFE0F5] bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1677FF] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            MVP Early Access
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0B1739] sm:text-6xl lg:text-7xl">
            One learning platform.
            <span className="block text-[#1677FF]">
              Plans for individuals to entire schools.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#53657D] sm:text-lg">
            Start free during MVP testing. Paid subscriptions are displayed so
            you can see what GAHN AI is building toward, but checkout remains
            unavailable until every promised feature is connected and tested.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              "Free plan requires no payment",
              "5 paid plans connected to Stripe",
              "Paid checkout remains disabled",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-[#53657D]"
              >
                <CheckCircle2
                  className="h-4 w-4 text-[#1677FF]"
                  strokeWidth={1.8}
                />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* INDIVIDUAL PLANS */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              Individual Learning
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              For students, professors, self-learners, and professionals
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#53657D]">
              Start free, then move into deeper AI tutoring, mastery tools, or
              professional career learning when paid plans launch.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch xl:gap-6">
            {individualPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* SCHOOL PLANS */}
      <section className="border-y border-[#D7E3F2] bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#CFE0F5] bg-[#F1F7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1677FF]">
              <GraduationCap className="h-4 w-4" />
              Schools & Organizations
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              AI learning infrastructure for classrooms and schools
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#53657D]">
              Give teachers control over AI instruction while providing
              students with personalized learning, assignments, analytics, and
              classroom tools.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch xl:gap-6">
            {schoolPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* PLAN GROUP EXPLANATION */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-[1.4rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.04)]">
            <Users
              className="h-6 w-6 text-[#1677FF]"
              strokeWidth={1.8}
            />

            <h3 className="mt-4 text-xl font-bold">
              Individual learning
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#53657D]">
              Explore, Learner Plus, Mastery, and Career Pro are designed for
              individual learners who want increasingly advanced AI learning
              tools.
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.04)]">
            <GraduationCap
              className="h-6 w-6 text-[#1677FF]"
              strokeWidth={1.8}
            />

            <h3 className="mt-4 text-xl font-bold">
              Classroom learning
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#53657D]">
              Classroom AI is built around teachers directing AI instruction,
              assigning work, and understanding student progress.
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.04)]">
            <Building2
              className="h-6 w-6 text-[#1677FF]"
              strokeWidth={1.8}
            />

            <h3 className="mt-4 text-xl font-bold">
              Institution infrastructure
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#53657D]">
              School OS and future district deployments expand GAHN into
              centralized administration, analytics, curriculum, teachers, and
              multiple classrooms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_58%,#EAF3FF_100%)] px-6 py-9 text-center shadow-[0_18px_50px_rgba(11,23,57,0.06)] sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
            Start Today
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
            Start with Explore while we build the full GAHN experience.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#53657D]">
            Paid subscriptions remain unavailable until their AI instructor
            usage, tools, account entitlements, and Stripe delivery systems have
            been tested.
          </p>

          <Link
            href="/signup"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(22,119,255,0.22)] hover:bg-[#0F65E8]"
          >
            Create Free Account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}