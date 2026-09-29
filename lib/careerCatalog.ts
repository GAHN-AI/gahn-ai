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

function techRole(args: Omit<CareerSection, "category" | "lessons">): CareerSection {
  return {
    ...args,
    category: "Technology",
    lessons: [
      {
        title: args.title,
        description: args.description,
      },
    ],
  };
}

/**
 * Phase 1 Career Skills is intentionally narrowed to one Technology section.
 * The skill lists below mirror the "Skills you'll need" lists published on
 * Coursera Career Academy role pages as checked on 2026-09-29.
 */
export const careerSections: CareerSection[] = [
  techRole({
    slug: "software-developer-engineer",
    title: "Software Developer / Engineer",
    description:
      "Design, build, test, and maintain software systems across web, applications, and services.",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Full-Stack Web Development",
      "Computer Science",
      "Problem Solving",
      "Agile Methodology",
      "DevOps",
      "CI/CD",
      "Java",
      "Python Programming",
    ],
  }),
  techRole({
    slug: "front-end-developer",
    title: "Front End Developer",
    description:
      "Build the visual and interactive parts of websites and applications with modern front-end tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner path",
    pathLabel: "Technology career",
    skills: [
      "Javascript",
      "Front-End Web Development",
      "Cascading Style Sheets (CSS)",
      "Hypertext Markup Language (HTML)",
      "React.js",
      "User Interface (UI)",
      "Agile Methodology",
      "Responsive Web Design",
    ],
  }),
  techRole({
    slug: "python-developer",
    title: "Python Developer",
    description:
      "Use Python to build software, web applications, automation, and data-backed services.",
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
  techRole({
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
  techRole({
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
  techRole({
    slug: "cloud-architect",
    title: "Cloud Architect",
    description:
      "Design secure, scalable cloud systems and infrastructure for modern applications and organizations.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    level: "Intermediate path",
    pathLabel: "Technology career",
    skills: [
      "Google Cloud Platform",
      "Infrastructure as Code (IaC)",
      "DevOps",
      "Cloud Security",
      "Cloud Services",
      "Automation",
      "Kubernetes",
      "Terraform",
    ],
  }),
  techRole({
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
  techRole({
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
  techRole({
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
  techRole({
    slug: "ui-ux-designer",
    title: "UI / UX Designer",
    description:
      "Research users and design clear, usable digital products through interfaces, prototypes, and testing.",
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
  techRole({
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
];

export function getCareerSection(slug: string) {
  return careerSections.find((section) => section.slug === slug);
}
