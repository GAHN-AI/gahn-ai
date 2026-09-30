export type CareerIndustry =
  | "Technology Industry"
  | "Healthcare & Medicine"
  | "Legal & Public Service"
  | "Finance & Insurance"
  | "Business & Operations"
  | "Skilled Trades & Services";

export type CareerSection = {
  slug: string;
  title: string;
  category: CareerIndustry;
  description: string;
  imageUrl: string;
  level: string;
  pathLabel: string;
  skills: string[];
};

export type CareerIndustryInfo = {
  title: CareerIndustry;
  description: string;
  imageUrl: string;
};

export const careerIndustries: CareerIndustryInfo[] = [
  {
    title: "Technology Industry",
    description:
      "Software, cybersecurity, cloud, data, artificial intelligence, design, and technical support careers.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Healthcare & Medicine",
    description:
      "Patient care, clinical support, nursing, medicine, and healthcare careers with different training levels.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Legal & Public Service",
    description:
      "Legal research, client support, law, compliance, and public service career paths.",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Finance & Insurance",
    description:
      "Accounting, insurance, financial analysis, risk, and money focused careers.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Business & Operations",
    description:
      "Customer service, sales, project management, operations, and everyday business careers.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Skilled Trades & Services",
    description:
      "Hands on careers in electrical work, plumbing, heating and cooling, repair, and field services.",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
  },
];

function careerRole(
  category: CareerIndustry,
  args: Omit<CareerSection, "category">
): CareerSection {
  return {
    ...args,
    category,
  };
}

const technology = (
  args: Omit<CareerSection, "category">
): CareerSection => careerRole("Technology Industry", args);

const healthcare = (
  args: Omit<CareerSection, "category">
): CareerSection => careerRole("Healthcare & Medicine", args);

const legal = (
  args: Omit<CareerSection, "category">
): CareerSection => careerRole("Legal & Public Service", args);

const finance = (
  args: Omit<CareerSection, "category">
): CareerSection => careerRole("Finance & Insurance", args);

const business = (
  args: Omit<CareerSection, "category">
): CareerSection => careerRole("Business & Operations", args);

const trades = (
  args: Omit<CareerSection, "category">
): CareerSection => careerRole("Skilled Trades & Services", args);

export const careerSections: CareerSection[] = [
  technology({
    slug: "software-developer-engineer",
    title: "Software Developer / Engineer",
    description:
      "Design, build, test, and maintain software systems across websites, applications, and services.",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Full Stack Web Development",
      "Computer Science",
      "Problem Solving",
      "Agile Methodology",
      "DevOps",
      "CI/CD",
      "Java",
      "Python Programming",
    ],
  }),
  technology({
    slug: "front-end-developer",
    title: "Front End Developer",
    description:
      "Build the visual and interactive parts of websites and applications with modern web tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Javascript",
      "Front End Web Development",
      "Cascading Style Sheets (CSS)",
      "Hypertext Markup Language (HTML)",
      "React.js",
      "User Interface (UI)",
      "Agile Methodology",
      "Responsive Web Design",
    ],
  }),
  technology({
    slug: "python-developer",
    title: "Python Developer",
    description:
      "Use Python to build software, web applications, automation, and services powered by data.",
    imageUrl:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Python Programming",
      "Software Engineering",
      "Django (Web Framework)",
      "Flask (Web Framework)",
      "SQL",
      "Git (Version Control System)",
      "Agile Methodology",
      "CI/CD",
    ],
  }),
  technology({
    slug: "cyber-security-analyst",
    title: "Cyber Security Analyst",
    description:
      "Protect systems and data by finding vulnerabilities, monitoring threats, and responding to security incidents.",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Cybersecurity",
      "Information Systems Security",
      "Vulnerability Management",
      "Risk Management",
      "Network Security",
      "Security Information and Event Management (SIEM)",
      "Incident Management",
      "Penetration Testing",
    ],
  }),
  technology({
    slug: "devops-engineer",
    title: "DevOps Engineer",
    description:
      "Automate software delivery, improve reliability, and connect development work with production infrastructure.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    level: "Intermediate path",
    pathLabel: "Technology career",
    skills: [
      "DevOps",
      "Automation",
      "CI/CD",
      "Kubernetes",
      "Docker (Software)",
      "Terraform",
      "Git (Version Control System)",
      "Linux",
    ],
  }),
  technology({
    slug: "cloud-architect",
    title: "Cloud Architect",
    description:
      "Design secure and scalable cloud systems and infrastructure for modern applications and organizations.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    level: "Intermediate path",
    pathLabel: "Technology career",
    skills: [
      "Cloud Computing",
      "Cloud Solutions",
      "Amazon Web Services",
      "Microsoft Azure",
      "Google Cloud Platform",
      "Infrastructure as Code (IaC)",
      "DevOps",
      "Cloud Security",
    ],
  }),
  technology({
    slug: "data-analyst",
    title: "Data Analyst",
    description:
      "Collect, clean, analyze, and visualize data so organizations can make better decisions.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Data Analysis",
      "SQL",
      "Python Programming",
      "Data Visualization",
      "Microsoft Excel",
      "Statistics",
      "Problem Solving",
      "Data Quality",
    ],
  }),
  technology({
    slug: "data-scientist",
    title: "Data Scientist",
    description:
      "Use statistics, programming, machine learning, and data visualization to solve complex data problems.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner to advanced",
    pathLabel: "Technology career",
    skills: [
      "Data Science",
      "Machine Learning",
      "Python Programming",
      "SQL",
      "Data Analysis",
      "Statistics",
      "Algorithms",
      "Data Visualization",
    ],
  }),
  technology({
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    description:
      "Build, train, evaluate, and improve machine learning systems that learn from data.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    level: "Intermediate path",
    pathLabel: "Technology career",
    skills: [
      "Machine Learning",
      "Python Programming",
      "Artificial Intelligence",
      "Algorithms",
      "Tensorflow",
      "PyTorch (Machine Learning Library)",
      "Communication",
      "Research",
    ],
  }),
  technology({
    slug: "user-interface-user-experience-ui-ux-designer",
    title: "User Interface / User Experience (UI / UX) Designer",
    description:
      "Research users and design clear and usable digital products through interfaces, prototypes, and testing.",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "User Experience Design",
      "User Research",
      "Prototyping",
      "Interaction Design",
      "Usability Testing",
      "Figma (Design Software)",
      "Wireframing",
      "User Interface (UI) Design",
    ],
  }),
  technology({
    slug: "technical-support-engineer-analyst",
    title: "Technical Support Engineer / Analyst",
    description:
      "Troubleshoot hardware and software problems, support users, and keep technical systems working reliably.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Technical Support",
      "Problem Solving",
      "Customer Service",
      "Operating Systems",
      "Help Desk Support",
      "Networking Hardware",
      "Communication",
      "Detail Oriented",
    ],
  }),

  healthcare({
    slug: "medical-assistant",
    title: "Medical Assistant",
    description:
      "Support patients and clinical teams with basic care, records, scheduling, measurements, and medical office tasks.",
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Healthcare career",
    skills: [
      "Patient Communication",
      "Medical Terminology",
      "Vital Signs",
      "Clinical Procedures",
      "Medical Records",
      "Scheduling",
      "Infection Control",
      "Detail Oriented",
    ],
  }),
  healthcare({
    slug: "registered-nurse",
    title: "Registered Nurse",
    description:
      "Care for patients, monitor health, communicate with care teams, and apply clinical knowledge in healthcare settings.",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    level: "Professional path",
    pathLabel: "Healthcare career",
    skills: [
      "Patient Care",
      "Clinical Assessment",
      "Medical Terminology",
      "Medication Concepts",
      "Care Planning",
      "Communication",
      "Documentation",
      "Patient Safety",
    ],
  }),
  healthcare({
    slug: "physician",
    title: "Physician",
    description:
      "Study how doctors evaluate symptoms, reason through medical information, communicate with patients, and plan care.",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
    level: "Advanced professional path",
    pathLabel: "Healthcare career",
    skills: [
      "Human Biology",
      "Clinical Reasoning",
      "Patient Interviewing",
      "Medical Terminology",
      "Diagnosis Concepts",
      "Treatment Planning Concepts",
      "Communication",
      "Research",
    ],
  }),

  legal({
    slug: "paralegal",
    title: "Paralegal",
    description:
      "Support legal work through research, document preparation, case organization, client communication, and legal procedures.",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Legal career",
    skills: [
      "Legal Research",
      "Legal Writing",
      "Case Organization",
      "Document Preparation",
      "Client Communication",
      "Court Procedures",
      "Attention to Detail",
      "Professional Communication",
    ],
  }),
  legal({
    slug: "lawyer",
    title: "Lawyer",
    description:
      "Learn how legal professionals research law, analyze facts, build arguments, advise clients, and communicate cases.",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    level: "Advanced professional path",
    pathLabel: "Legal career",
    skills: [
      "Legal Research",
      "Legal Analysis",
      "Legal Writing",
      "Argument Building",
      "Client Communication",
      "Negotiation",
      "Case Strategy",
      "Public Speaking",
    ],
  }),
  legal({
    slug: "compliance-specialist",
    title: "Compliance Specialist",
    description:
      "Help organizations follow laws, policies, industry rules, and internal standards while reducing risk.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner to intermediate",
    pathLabel: "Legal and business career",
    skills: [
      "Policy Review",
      "Risk Assessment",
      "Regulatory Research",
      "Documentation",
      "Auditing Concepts",
      "Communication",
      "Problem Solving",
      "Attention to Detail",
    ],
  }),

  finance({
    slug: "accountant",
    title: "Accountant",
    description:
      "Record financial activity, prepare reports, understand business accounts, and help organizations track money accurately.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Finance career",
    skills: [
      "Accounting",
      "Financial Statements",
      "Bookkeeping",
      "Microsoft Excel",
      "Budgeting",
      "Tax Concepts",
      "Data Accuracy",
      "Business Finance",
    ],
  }),
  finance({
    slug: "insurance-underwriter",
    title: "Insurance Underwriter",
    description:
      "Review applications, analyze risk, interpret information, and help decide insurance coverage and pricing.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner to intermediate",
    pathLabel: "Insurance career",
    skills: [
      "Risk Analysis",
      "Insurance Concepts",
      "Financial Analysis",
      "Decision Making",
      "Data Review",
      "Policy Review",
      "Communication",
      "Attention to Detail",
    ],
  }),
  finance({
    slug: "financial-analyst",
    title: "Financial Analyst",
    description:
      "Study business and market data, build financial models, compare performance, and support financial decisions.",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    level: "Intermediate path",
    pathLabel: "Finance career",
    skills: [
      "Financial Analysis",
      "Financial Modeling",
      "Microsoft Excel",
      "Accounting",
      "Investments",
      "Business Valuation",
      "Data Analysis",
      "Presentation",
    ],
  }),

  business({
    slug: "customer-service-representative",
    title: "Customer Service Representative",
    description:
      "Help customers solve problems, understand products, handle requests, and communicate clearly across support channels.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Business career",
    skills: [
      "Customer Service",
      "Communication",
      "Problem Solving",
      "Product Knowledge",
      "Conflict Resolution",
      "Time Management",
      "Documentation",
      "Professional Writing",
    ],
  }),
  business({
    slug: "sales-representative",
    title: "Sales Representative",
    description:
      "Find customer needs, explain value, handle objections, follow up, and move opportunities toward a purchase.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Business career",
    skills: [
      "Sales",
      "Customer Discovery",
      "Communication",
      "Negotiation",
      "Lead Qualification",
      "Presentations",
      "Follow Up",
      "CRM Basics",
    ],
  }),
  business({
    slug: "project-manager",
    title: "Project Manager",
    description:
      "Plan projects, organize work, manage timelines, communicate with teams, track risks, and deliver results.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner to intermediate",
    pathLabel: "Business career",
    skills: [
      "Project Planning",
      "Scheduling",
      "Risk Management",
      "Team Communication",
      "Agile Methodology",
      "Budget Concepts",
      "Stakeholder Management",
      "Problem Solving",
    ],
  }),

  trades({
    slug: "electrician",
    title: "Electrician",
    description:
      "Learn electrical theory, circuits, tools, safety concepts, diagrams, troubleshooting, and how the trade is organized.",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
    level: "Trade preparation path",
    pathLabel: "Skilled trade",
    skills: [
      "Electrical Theory",
      "Circuit Concepts",
      "Electrical Safety",
      "Tools",
      "Wiring Diagrams",
      "Troubleshooting",
      "Code Concepts",
      "Measurement",
    ],
  }),
  trades({
    slug: "plumber",
    title: "Plumber",
    description:
      "Learn plumbing systems, tools, piping, water flow, safety, troubleshooting, and trade planning concepts.",
    imageUrl:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    level: "Trade preparation path",
    pathLabel: "Skilled trade",
    skills: [
      "Plumbing Systems",
      "Piping",
      "Tools",
      "Water Flow",
      "Safety",
      "Blueprint Concepts",
      "Troubleshooting",
      "Code Concepts",
    ],
  }),
  trades({
    slug: "hvac-technician",
    title: "HVAC Technician",
    description:
      "Learn heating and cooling systems, refrigeration concepts, electrical basics, safety, maintenance, and diagnostics.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    level: "Trade preparation path",
    pathLabel: "Skilled trade",
    skills: [
      "HVAC Systems",
      "Refrigeration Concepts",
      "Electrical Basics",
      "Safety",
      "Maintenance",
      "Diagnostics",
      "Tools",
      "Customer Communication",
    ],
  }),
];

export function getCareerSection(slug: string) {
  return careerSections.find((section) => section.slug === slug);
}

export function getCareersByIndustry(industry: CareerIndustry) {
  return careerSections.filter((section) => section.category === industry);
}
