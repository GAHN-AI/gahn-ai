export type CareerLesson = {
  title: string;
  description: string;
};

export type CareerSection = {
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  level: string;
  pathLabel: string;
  skills: string[];
  lessons: CareerLesson[];
};

function career(args: Omit<CareerSection, "lessons">): CareerSection {
  return {
    ...args,
    lessons: [
      {
        title: args.title,
        description: args.description,
      },
    ],
  };
}

export const careerSections: CareerSection[] = [
  career({
    slug: "software-development",
    title: "Software Development",
    category: "Technology",
    description:
      "Learn how software is planned, coded, tested, shipped, and improved while building the foundations used by real developers.",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career foundation",
    skills: ["Programming", "Git & GitHub", "Web apps", "APIs"],
  }),
  career({
    slug: "nursing-healthcare",
    title: "Nursing & Healthcare",
    category: "Healthcare",
    description:
      "Explore patient care, healthcare teamwork, medical communication, safety, terminology, and the skills used across clinical careers.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career exploration",
    skills: ["Patient care", "Terminology", "Safety", "Communication"],
  }),
  career({
    slug: "teaching-education",
    title: "Teaching & Education",
    category: "Education",
    description:
      "Learn how teachers plan instruction, explain difficult ideas, support learners, assess understanding, and manage learning environments.",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career exploration",
    skills: ["Instruction", "Lesson planning", "Assessment", "Communication"],
  }),
  career({
    slug: "engineering",
    title: "Engineering",
    category: "Engineering",
    description:
      "Understand how engineers solve real problems using math, science, design, testing, tradeoffs, and disciplined project thinking.",
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career foundation",
    skills: ["Problem solving", "Design", "Systems", "Testing"],
  }),
  career({
    slug: "skilled-trades",
    title: "Skilled Trades",
    category: "Trades",
    description:
      "Explore hands-on careers such as electrical, HVAC, plumbing, welding, and automotive work while learning safety and technical fundamentals.",
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career exploration",
    skills: ["Safety", "Tools", "Diagnostics", "Technical systems"],
  }),
  career({
    slug: "business-entrepreneurship",
    title: "Business & Entrepreneurship",
    category: "Business",
    description:
      "Learn customers, business models, pricing, operations, leadership, and how ideas become products and organizations.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career foundation",
    skills: ["Customers", "Business models", "Leadership", "Operations"],
  }),
  career({
    slug: "finance-accounting",
    title: "Finance & Accounting",
    category: "Finance",
    description:
      "Build foundations in money, financial statements, budgeting, analysis, investing concepts, and responsible financial decision-making.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career foundation",
    skills: ["Financial statements", "Budgeting", "Analysis", "Investing"],
  }),
  career({
    slug: "marketing-sales",
    title: "Marketing & Sales",
    category: "Growth",
    description:
      "Learn customer research, positioning, communication, campaigns, selling, negotiation, and how organizations create demand.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career foundation",
    skills: ["Research", "Positioning", "Sales", "Negotiation"],
  }),
  career({
    slug: "law-legal-services",
    title: "Law & Legal Services",
    category: "Law",
    description:
      "Explore legal reasoning, research, professional writing, advocacy, ethics, and the different roles found in legal careers.",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career exploration",
    skills: ["Reasoning", "Research", "Writing", "Advocacy"],
  }),
  career({
    slug: "creative-design-media",
    title: "Creative Design & Media",
    category: "Creative",
    description:
      "Explore design, digital media, storytelling, visual communication, creative tools, and how creative work becomes a profession.",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner friendly",
    pathLabel: "Career exploration",
    skills: ["Design", "Storytelling", "Visual systems", "Creative tools"],
  }),
];

export function getCareerSection(slug: string) {
  return careerSections.find((section) => section.slug === slug);
}
