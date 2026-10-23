/** GAHN Career Skills: digital-practice-first paths; not certificates or employment offers. */
export type CareerIndustry = "Software & IT" | "Data & AI" | "Digital Design & Content" | "Marketing & Online Sales" | "Finance & Digital Analysis" | "Remote Operations & Support" | "Healthcare & Legal Administration";
export type CareerPayCategory = "Moderate earning potential" | "Moderate to higher potential" | "Higher earning potential";
export type CareerSection = {
  slug: string;
  title: string;
  category: CareerIndustry;
  description: string;
  imageUrl: string;
  level: string;
  pathLabel: string;
  skills: string[];
  payCategory: CareerPayCategory;
  onlineScope: string;
};
export type CareerIndustryInfo = {
  slug: string;
  title: CareerIndustry;
  displayTitle: string;
  description: string;
  imageUrl: string;
  skills: string[];
};
export const careerIndustries: CareerIndustryInfo[] = [
  {
    "slug": "tech-skills",
    "title": "Software & IT",
    "displayTitle": "Software & IT",
    "description": "Build apps, protect digital systems, automate testing, support users, and operate modern cloud infrastructure.",
    "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    "skills": [
      "Web applications",
      "Programming",
      "Software testing",
      "IT support",
      "Cloud services",
      "Security",
      "APIs",
      "Version control"
    ]
  },
  {
    "slug": "data-ai",
    "title": "Data & AI",
    "displayTitle": "Data & AI",
    "description": "Analyze datasets, build dashboards, automate digital workflows, and develop machine-learning solutions.",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    "skills": [
      "SQL",
      "Python",
      "Reporting",
      "Visualization",
      "Model evaluation",
      "AI workflow design",
      "Business data"
    ]
  },
  {
    "slug": "design-content",
    "title": "Digital Design & Content",
    "displayTitle": "Digital Design & Content",
    "description": "Design interfaces, create graphics, edit video, and write clear technical and digital content.",
    "imageUrl": "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80",
    "skills": [
      "Figma",
      "Prototyping",
      "Layout",
      "Video editing",
      "Writing",
      "Accessibility",
      "Review cycles"
    ]
  },
  {
    "slug": "digital-marketing-sales",
    "title": "Marketing & Online Sales",
    "displayTitle": "Marketing & Online Sales",
    "description": "Run digital campaigns, grow audiences, improve search visibility, write email campaigns, and sell through online conversations.",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    "skills": [
      "SEO",
      "Content strategy",
      "Marketing analytics",
      "Email campaigns",
      "CRM",
      "Remote sales",
      "Conversion tracking"
    ]
  },
  {
    "slug": "finance-insurance",
    "title": "Finance & Digital Analysis",
    "displayTitle": "Finance & Digital Analysis",
    "description": "Maintain digital accounts, build models, assess financial risks, and prepare professional reports.",
    "imageUrl": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    "skills": [
      "Bookkeeping",
      "Spreadsheets",
      "Forecasting",
      "Financial statements",
      "Credit review",
      "Risk analysis"
    ]
  },
  {
    "slug": "business-operations",
    "title": "Remote Operations & Support",
    "displayTitle": "Remote Operations & Support",
    "description": "Serve customers online, organize digital projects, support teams, coordinate operations, and manage client relationships.",
    "imageUrl": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
    "skills": [
      "Customer service",
      "Project coordination",
      "CRM",
      "Remote collaboration",
      "Scheduling",
      "Client communication",
      "Recruiting"
    ]
  },
  {
    "slug": "digital-health-legal",
    "title": "Healthcare & Legal Administration",
    "displayTitle": "Healthcare & Legal Administration",
    "description": "Explore nonclinical digital records, coding, patient scheduling, contracts, and legal or compliance operations—without presenting online study as clinical or legal certification.",
    "imageUrl": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    "skills": [
      "Medical records",
      "Billing codes",
      "Scheduling",
      "Privacy",
      "Document review",
      "Contracts",
      "Compliance records"
    ]
  }
];
export const careerSections: CareerSection[] = [
  {
    "slug": "software-developer-engineer",
    "title": "Software Developer / Engineer",
    "category": "Software & IT",
    "description": "Build and maintain web applications and software services, from requirements to production.",
    "imageUrl": "/illustrations/careers/software-developer-engineer.svg",
    "level": "Foundations to advanced",
    "pathLabel": "Digital career path",
    "skills": [
      "TypeScript",
      "Backend APIs",
      "Databases",
      "Testing",
      "Deployment",
      "Code review"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "front-end-developer",
    "title": "Front End Developer",
    "category": "Software & IT",
    "description": "Create responsive, accessible web interfaces and connect them to application data.",
    "imageUrl": "/illustrations/careers/front-end-developer.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Accessibility",
      "Responsive design",
      "UI testing"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "python-developer",
    "title": "Python Developer",
    "category": "Software & IT",
    "description": "Write Python applications, automation scripts, data utilities, and backend services.",
    "imageUrl": "/illustrations/careers/python-developer.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Python",
      "Automation",
      "Flask or Django",
      "SQL",
      "Git",
      "Testing"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "cyber-security-analyst",
    "title": "Cybersecurity Analyst",
    "category": "Software & IT",
    "description": "Monitor authorized systems, investigate alerts, document risks and recommend defensive controls.",
    "imageUrl": "/illustrations/careers/cyber-security-analyst.svg",
    "level": "Intermediate to advanced",
    "pathLabel": "Digital career path",
    "skills": [
      "Security alerts",
      "Risk registers",
      "Defensive analysis",
      "Network fundamentals",
      "Incident reports",
      "Access controls"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "devops-engineer",
    "title": "DevOps Engineer",
    "category": "Software & IT",
    "description": "Automate software builds and deployments, improve reliability, and monitor services.",
    "imageUrl": "/illustrations/careers/devops-engineer.svg",
    "level": "Intermediate to advanced",
    "pathLabel": "Digital career path",
    "skills": [
      "CI/CD",
      "Containers",
      "Infrastructure",
      "Linux",
      "Monitoring",
      "Incident runbooks"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "cloud-architect",
    "title": "Cloud Architect",
    "category": "Software & IT",
    "description": "Design secure, scalable cloud infrastructure and evaluate reliability and cost trade-offs.",
    "imageUrl": "/illustrations/careers/cloud-architect.svg",
    "level": "Advanced career",
    "pathLabel": "Digital career path",
    "skills": [
      "Cloud design",
      "Identity access",
      "Network design",
      "Cost modeling",
      "Backups",
      "Reliability"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "technical-support-engineer-analyst",
    "title": "Remote IT Support Specialist",
    "category": "Software & IT",
    "description": "Diagnose account, software, device and connectivity issues through remote support channels.",
    "imageUrl": "/illustrations/careers/technical-support-engineer-analyst.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Remote troubleshooting",
      "Operating systems",
      "Networking basics",
      "Ticket writing",
      "Account support",
      "Customer communication"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "qa-automation-engineer",
    "title": "QA Automation Engineer",
    "category": "Software & IT",
    "description": "Design software test plans and automate repeatable browser and API checks.",
    "imageUrl": "/illustrations/careers/qa-automation-engineer.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Test cases",
      "Browser automation",
      "API checks",
      "Bug reports",
      "CI",
      "Accessibility checks"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "data-analyst",
    "title": "Data Analyst",
    "category": "Data & AI",
    "description": "Clean data, write SQL queries, build reports and help teams make evidence-based decisions.",
    "imageUrl": "/illustrations/careers/data-analyst.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "SQL",
      "Spreadsheets",
      "Data cleaning",
      "Dashboards",
      "Basic statistics",
      "Stakeholder reporting"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "data-scientist",
    "title": "Data Scientist",
    "category": "Data & AI",
    "description": "Use statistics, programming and model evaluation to answer complex data questions.",
    "imageUrl": "/illustrations/careers/data-scientist.svg",
    "level": "Intermediate to advanced",
    "pathLabel": "Digital career path",
    "skills": [
      "Python",
      "Statistics",
      "Experiment design",
      "Model baselines",
      "Data validation",
      "Visualization"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "machine-learning-engineer",
    "title": "Machine Learning Engineer",
    "category": "Data & AI",
    "description": "Build, evaluate and deploy machine-learning pipelines with monitoring and reproducible results.",
    "imageUrl": "/illustrations/careers/machine-learning-engineer.svg",
    "level": "Advanced career",
    "pathLabel": "Digital career path",
    "skills": [
      "Machine learning",
      "Python",
      "Training data",
      "Model evaluation",
      "Inference APIs",
      "Monitoring"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "business-intelligence-analyst",
    "title": "Business Intelligence Analyst",
    "category": "Data & AI",
    "description": "Build KPI definitions, dashboards and recurring reports for business teams.",
    "imageUrl": "/illustrations/careers/business-intelligence-analyst.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "SQL",
      "Power BI or similar",
      "Data models",
      "Metrics",
      "Dashboards",
      "Decision reports"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "ai-automation-specialist",
    "title": "AI Workflow Automation Specialist",
    "category": "Data & AI",
    "description": "Automate repeatable office processes with APIs, workflow tools and carefully tested AI features.",
    "imageUrl": "/illustrations/careers/ai-automation-specialist.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Workflow mapping",
      "APIs",
      "No-code tools",
      "LLM evaluation",
      "Human approval",
      "Error handling"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "user-interface-user-experience-ui-ux-designer",
    "title": "UI / UX Designer",
    "category": "Digital Design & Content",
    "description": "Research user needs, test prototypes and design accessible digital product experiences.",
    "imageUrl": "/illustrations/careers/user-interface-user-experience-ui-ux-designer.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "User research",
      "Figma",
      "Prototypes",
      "Design systems",
      "Accessibility",
      "Usability tests"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "graphic-designer",
    "title": "Digital Graphic Designer",
    "category": "Digital Design & Content",
    "description": "Produce digital campaign graphics, brand assets and clear visual communication for online products.",
    "imageUrl": "/illustrations/careers/graphic-designer.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Layout",
      "Typography",
      "Visual hierarchy",
      "Brand systems",
      "Image editing",
      "Design critique"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "video-editor",
    "title": "Video Editor",
    "category": "Digital Design & Content",
    "description": "Edit footage into polished short- and long-form online videos with accurate captions and sound.",
    "imageUrl": "/illustrations/careers/video-editor.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Editing timeline",
      "Audio balance",
      "Captions",
      "Color correction",
      "Story pacing",
      "Client revisions"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "technical-writer",
    "title": "Technical Writer",
    "category": "Digital Design & Content",
    "description": "Explain complex products through accurate documentation, instructions and searchable help content.",
    "imageUrl": "/illustrations/careers/technical-writer.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Product research",
      "API documentation",
      "Procedures",
      "Editing",
      "Diagrams",
      "Usability validation"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "content-writer-editor",
    "title": "Content Writer / Editor",
    "category": "Digital Design & Content",
    "description": "Research, draft, fact-check and revise clear website, educational or business content.",
    "imageUrl": "/illustrations/careers/content-writer-editor.svg",
    "level": "Beginner-friendly",
    "pathLabel": "Digital career path",
    "skills": [
      "Research",
      "Outlining",
      "Clear writing",
      "Editing",
      "Citations",
      "Editorial briefs"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "digital-marketing-specialist",
    "title": "Digital Marketing Specialist",
    "category": "Marketing & Online Sales",
    "description": "Plan online campaigns, measure conversions and report channel performance.",
    "imageUrl": "/illustrations/careers/digital-marketing-specialist.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Campaign planning",
      "Analytics",
      "Audience research",
      "Landing pages",
      "Paid ads",
      "Reporting"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "seo-specialist",
    "title": "SEO Specialist",
    "category": "Marketing & Online Sales",
    "description": "Improve website discoverability through search research, content structure and technical checks.",
    "imageUrl": "/illustrations/careers/seo-specialist.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Keyword intent",
      "On-page SEO",
      "Search Console",
      "Technical audits",
      "Content briefs",
      "Performance checks"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "social-media-manager",
    "title": "Social Media Manager",
    "category": "Marketing & Online Sales",
    "description": "Plan and manage social content, community responses and performance reports.",
    "imageUrl": "/illustrations/careers/social-media-manager.svg",
    "level": "Beginner-friendly",
    "pathLabel": "Digital career path",
    "skills": [
      "Content calendar",
      "Video scripts",
      "Community moderation",
      "Brand voice",
      "Analytics",
      "Reporting"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "email-marketing-specialist",
    "title": "Email Marketing Specialist",
    "category": "Marketing & Online Sales",
    "description": "Create permission-based email campaigns, segment audiences and measure results.",
    "imageUrl": "/illustrations/careers/email-marketing-specialist.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Email segmentation",
      "Copywriting",
      "Deliverability",
      "Consent",
      "Campaign testing",
      "Analytics"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "sales-representative",
    "title": "Remote Sales Representative",
    "category": "Marketing & Online Sales",
    "description": "Research customers, run video or phone discovery calls, manage a CRM and follow up ethically.",
    "imageUrl": "/illustrations/careers/sales-representative.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Lead qualification",
      "Discovery calls",
      "CRM",
      "Objections",
      "Negotiation",
      "Follow-up"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "bookkeeper",
    "title": "Bookkeeper",
    "category": "Finance & Digital Analysis",
    "description": "Record transactions, reconcile accounts, organize receipts and prepare routine digital reports.",
    "imageUrl": "/illustrations/careers/bookkeeper.svg",
    "level": "Beginner-friendly",
    "pathLabel": "Digital career path",
    "skills": [
      "Double-entry basics",
      "Invoicing",
      "Bank reconciliation",
      "Spreadsheets",
      "Expense categories",
      "Reports"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "accountant",
    "title": "Accountant",
    "category": "Finance & Digital Analysis",
    "description": "Prepare and explain financial statements, reconciliations, budgets and internal reports.",
    "imageUrl": "/illustrations/careers/accountant.svg",
    "level": "Intermediate; degree often expected",
    "pathLabel": "Digital career path",
    "skills": [
      "Journal entries",
      "Accrual accounting",
      "Reconciliation",
      "Financial statements",
      "Budgeting",
      "Internal controls"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "financial-analyst",
    "title": "Financial Analyst",
    "category": "Finance & Digital Analysis",
    "description": "Build business forecasts, compare scenarios and explain results to decision-makers.",
    "imageUrl": "/illustrations/careers/financial-analyst.svg",
    "level": "Intermediate to advanced",
    "pathLabel": "Digital career path",
    "skills": [
      "Financial modeling",
      "Forecasting",
      "Excel",
      "Statements",
      "Variance analysis",
      "Presentations"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "investment-analyst",
    "title": "Investment Research Analyst",
    "category": "Finance & Digital Analysis",
    "description": "Research companies, compare valuation scenarios and write sourced investment analysis.",
    "imageUrl": "/illustrations/careers/investment-analyst.svg",
    "level": "Intermediate to advanced",
    "pathLabel": "Digital career path",
    "skills": [
      "Financial filings",
      "Risk analysis",
      "Valuation",
      "Research notes",
      "Market data",
      "Investment memos"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "credit-analyst",
    "title": "Credit Analyst",
    "category": "Finance & Digital Analysis",
    "description": "Analyze borrower data, cash flow, credit risk and written lending recommendations.",
    "imageUrl": "/illustrations/careers/credit-analyst.svg",
    "level": "Intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Credit risk",
      "Cash flow",
      "Ratios",
      "Borrower review",
      "Covenants",
      "Credit memos"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "insurance-underwriter",
    "title": "Insurance Underwriting Analyst",
    "category": "Finance & Digital Analysis",
    "description": "Review insurance applications and risk data to support documented coverage decisions.",
    "imageUrl": "/illustrations/careers/insurance-underwriter.svg",
    "level": "Intermediate; employer training typical",
    "pathLabel": "Digital career path",
    "skills": [
      "Risk classification",
      "Policy terms",
      "Applicant review",
      "Coverage limits",
      "Documentation",
      "Referral"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "customer-service-representative",
    "title": "Remote Customer Support Representative",
    "category": "Remote Operations & Support",
    "description": "Resolve customer questions through email, chat, tickets and online calls.",
    "imageUrl": "/illustrations/careers/customer-service-representative.svg",
    "level": "Beginner-friendly",
    "pathLabel": "Digital career path",
    "skills": [
      "Active listening",
      "Ticketing",
      "Clear email",
      "Escalations",
      "Troubleshooting",
      "Customer care"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "project-manager",
    "title": "Digital Project Manager",
    "category": "Remote Operations & Support",
    "description": "Plan and coordinate software or digital-service projects using remote team tools.",
    "imageUrl": "/illustrations/careers/project-manager.svg",
    "level": "Intermediate to advanced",
    "pathLabel": "Digital career path",
    "skills": [
      "Scope",
      "Scheduling",
      "Task boards",
      "Budgets",
      "Risk logs",
      "Stakeholder updates"
    ],
    "payCategory": "Higher earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "virtual-assistant",
    "title": "Virtual Assistant / Administrative Specialist",
    "category": "Remote Operations & Support",
    "description": "Manage email, calendars, scheduling, research and digital documents for individuals or teams.",
    "imageUrl": "/illustrations/careers/virtual-assistant.svg",
    "level": "Beginner-friendly",
    "pathLabel": "Digital career path",
    "skills": [
      "Calendar management",
      "Email",
      "Documents",
      "Research",
      "Client requests",
      "Privacy"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "customer-success-specialist",
    "title": "Customer Success Specialist",
    "category": "Remote Operations & Support",
    "description": "Onboard software customers, document outcomes and coordinate account support and retention.",
    "imageUrl": "/illustrations/careers/customer-success-specialist.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Onboarding",
      "Product demos",
      "CRM",
      "Customer health",
      "Renewal discussions",
      "Escalation"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "operations-coordinator",
    "title": "Remote Operations Coordinator",
    "category": "Remote Operations & Support",
    "description": "Track recurring processes, manage project records, report exceptions and coordinate distributed teams.",
    "imageUrl": "/illustrations/careers/operations-coordinator.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "SOPs",
      "Work trackers",
      "Schedules",
      "Reports",
      "Team coordination",
      "Quality checks"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "recruiter-talent-sourcer",
    "title": "Digital Recruiter / Talent Sourcer",
    "category": "Remote Operations & Support",
    "description": "Research candidates, organize outreach, screen skills and coordinate digital interviews.",
    "imageUrl": "/illustrations/careers/recruiter-talent-sourcer.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Candidate sourcing",
      "Outreach",
      "Interview notes",
      "ATS",
      "Scheduling",
      "Fair hiring"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "medical-billing-coding-specialist",
    "title": "Medical Billing & Coding Specialist",
    "category": "Healthcare & Legal Administration",
    "description": "Learn to classify documented healthcare services and process claims in nonclinical administrative workflows.",
    "imageUrl": "/illustrations/careers/medical-billing-coding-specialist.svg",
    "level": "Certification or employer training may be required",
    "pathLabel": "Digital career path",
    "skills": [
      "Medical terminology",
      "Coding systems",
      "Claims workflow",
      "Documentation",
      "Privacy",
      "Error review"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "health-information-specialist",
    "title": "Health Information / Medical Records Specialist",
    "category": "Healthcare & Legal Administration",
    "description": "Organize healthcare records, check documentation quality and apply privacy procedures digitally.",
    "imageUrl": "/illustrations/careers/health-information-specialist.svg",
    "level": "Training or credentials may be preferred",
    "pathLabel": "Digital career path",
    "skills": [
      "Electronic records",
      "Data accuracy",
      "Privacy",
      "Record indexing",
      "Quality checks",
      "Audit trails"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "patient-scheduling-coordinator",
    "title": "Remote Patient Scheduling Coordinator",
    "category": "Healthcare & Legal Administration",
    "description": "Schedule visits, communicate administrative requirements and maintain accurate appointment records.",
    "imageUrl": "/illustrations/careers/patient-scheduling-coordinator.svg",
    "level": "Beginner; employer onboarding typical",
    "pathLabel": "Digital career path",
    "skills": [
      "Scheduling",
      "Phone etiquette",
      "Patient privacy",
      "Eligibility basics",
      "CRM/EHR basics",
      "Handoffs"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "contract-administrator",
    "title": "Contract Administrator",
    "category": "Healthcare & Legal Administration",
    "description": "Organize commercial contracts, monitor deadlines and document approved changes for business teams.",
    "imageUrl": "/illustrations/careers/contract-administrator.svg",
    "level": "Intermediate; legal review required for advice",
    "pathLabel": "Digital career path",
    "skills": [
      "Contract tracking",
      "Version control",
      "Key terms",
      "Renewals",
      "Approvals",
      "Recordkeeping"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "legal-operations-coordinator",
    "title": "Legal Operations Coordinator",
    "category": "Healthcare & Legal Administration",
    "description": "Coordinate legal-team documents, intake, calendars, vendors and reporting without giving legal advice.",
    "imageUrl": "/illustrations/careers/legal-operations-coordinator.svg",
    "level": "Beginner to intermediate",
    "pathLabel": "Digital career path",
    "skills": [
      "Matter intake",
      "Document control",
      "Deadlines",
      "Vendor coordination",
      "Confidentiality",
      "Reporting"
    ],
    "payCategory": "Moderate earning potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  },
  {
    "slug": "compliance-specialist",
    "title": "Compliance Analyst",
    "category": "Healthcare & Legal Administration",
    "description": "Track documented control checks, research policies and organize evidence for internal reviews.",
    "imageUrl": "/illustrations/careers/compliance-specialist.svg",
    "level": "Intermediate; industry training often needed",
    "pathLabel": "Digital career path",
    "skills": [
      "Policy review",
      "Control testing",
      "Risk logs",
      "Audits",
      "Documentation",
      "Stakeholder reports"
    ],
    "payCategory": "Moderate to higher potential",
    "onlineScope": "The core skills and portfolio exercises can be learned and practiced digitally. Employers may still require qualifications, interviews, identity checks, supervised work or onsite onboarding."
  }
];

export function getCareerSection(slug: string) {
  return careerSections.find((section) => section.slug === slug);
}
export function getCareersByIndustry(industry: CareerIndustry) {
  return careerSections.filter((section) => section.category === industry);
}
export function getCareerIndustry(slug: string) {
  return careerIndustries.find((industry) => industry.slug === slug);
}
