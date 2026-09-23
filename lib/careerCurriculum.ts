export type CareerCurriculumModule = {
  title: string;
  description: string;
};

export type CareerCurriculum = {
  whatYouLearn: string[];
  skills: string[];
  tools: string[];
  modules: CareerCurriculumModule[];
  requirementNote?: string;
};

const explicitCareerCurricula: Record<string, CareerCurriculum> = {
  "Software Engineer": {
    "whatYouLearn": [
      "Write production-quality programs and understand how software moves from requirements to design, implementation, testing, deployment, and maintenance.",
      "Learn core computer-science foundations: data structures, algorithms, complexity, operating-system concepts, networking basics, and software architecture.",
      "Become productive in JavaScript/TypeScript and Python, then learn how strongly typed backend languages such as Java or C# are used in larger systems.",
      "Use SQL and relational databases, design schemas, write queries, understand transactions, and connect applications to persistent data.",
      "Build and consume APIs, work with HTTP, authentication, authorization, JSON, and service-to-service communication.",
      "Use Git and GitHub, automated tests, code review, debugging tools, CI/CD, containers, and cloud deployment workflows.",
      "Learn security, reliability, performance, observability, scalability, and maintainability as engineering requirements—not afterthoughts.",
      "Build multiple projects and a capstone that demonstrate real software-engineering decisions."
    ],
    "skills": [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java or C#",
      "SQL",
      "Data Structures",
      "Algorithms",
      "Object-Oriented Programming",
      "Functional Programming Basics",
      "APIs & HTTP",
      "Databases",
      "Testing",
      "Debugging",
      "Software Architecture",
      "Git & GitHub",
      "Security Basics",
      "Cloud Deployment"
    ],
    "tools": [
      "VS Code",
      "Git",
      "GitHub",
      "Node.js",
      "Python",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "Testing Frameworks",
      "CI/CD",
      "Cloud Platform"
    ],
    "modules": [
      {
        "title": "Programming Foundations",
        "description": "Variables, data types, control flow, functions, modules, errors, files, and problem decomposition."
      },
      {
        "title": "JavaScript & TypeScript",
        "description": "Modern JavaScript, types, modules, async programming, npm, and building reliable TypeScript applications."
      },
      {
        "title": "Python",
        "description": "Python syntax, data structures, object-oriented programming, packages, scripting, and backend use."
      },
      {
        "title": "Java or C# Foundations",
        "description": "Static typing, classes, interfaces, collections, exceptions, testing, and enterprise-style application structure."
      },
      {
        "title": "Data Structures & Algorithms",
        "description": "Arrays, lists, stacks, queues, hash maps, trees, graphs, searching, sorting, recursion, and complexity."
      },
      {
        "title": "Databases & SQL",
        "description": "Relational modeling, SQL, joins, indexes, transactions, normalization, and application database access."
      },
      {
        "title": "APIs, Networking & Authentication",
        "description": "HTTP, REST, JSON, APIs, cookies/tokens, authentication, authorization, and network fundamentals."
      },
      {
        "title": "Testing, Debugging & Git",
        "description": "Unit/integration testing, debugging, logging, Git branches, pull requests, and code review."
      },
      {
        "title": "Architecture, Security & Reliability",
        "description": "Design patterns, modularity, security basics, performance, observability, scaling, and failure handling."
      },
      {
        "title": "Deployment & Capstone",
        "description": "Containers, CI/CD, cloud deployment, monitoring, documentation, and a complete software project."
      }
    ],
    "requirementNote": "There is no single required programming language for software engineering. Employers use different stacks. The curriculum should teach transferable engineering fundamentals plus several widely used languages, then let learners specialize."
  },
  "Full-Stack Web Developer": {
    "whatYouLearn": [
      "Build complete web applications from browser interface to backend API and database.",
      "Master semantic HTML, modern CSS, responsive design, accessibility, browser fundamentals, and web standards.",
      "Use JavaScript deeply and TypeScript for safer application development.",
      "Build component-based frontends with React and a production framework such as Next.js.",
      "Build backend services with Node.js, route requests, validate data, handle errors, and design REST APIs.",
      "Design relational databases with SQL and PostgreSQL, model data, write joins, use indexes, and manage migrations.",
      "Implement authentication, authorization, sessions/tokens, secure forms, input validation, and common web-security protections.",
      "Test frontend and backend behavior, debug with browser/server tools, use Git/GitHub, and deploy with modern cloud workflows.",
      "Learn performance, caching, accessibility, SEO basics, API integration, file uploads, payments, and real-world production concerns."
    ],
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "Authentication",
      "Authorization",
      "Responsive Design",
      "Accessibility",
      "Git",
      "GitHub",
      "Testing",
      "Web Security",
      "Performance",
      "Deployment"
    ],
    "tools": [
      "VS Code",
      "Browser DevTools",
      "Git",
      "GitHub",
      "Node.js",
      "npm",
      "React",
      "Next.js",
      "PostgreSQL",
      "REST/JSON",
      "Postman or API Client",
      "Testing Tools",
      "Docker Basics",
      "Vercel or Cloud Hosting"
    ],
    "modules": [
      {
        "title": "Web & Developer Environment",
        "description": "How the web works, files, terminals, editors, browsers, HTTP, domains, hosting, and developer workflow."
      },
      {
        "title": "Semantic HTML",
        "description": "Document structure, links, media, forms, tables, semantic elements, metadata, and accessible markup."
      },
      {
        "title": "Modern CSS",
        "description": "Cascade, box model, typography, Flexbox, Grid, responsive layouts, variables, animations, and design systems basics."
      },
      {
        "title": "JavaScript",
        "description": "Types, variables, functions, arrays, objects, DOM, events, modules, asynchronous code, fetch, and error handling."
      },
      {
        "title": "TypeScript",
        "description": "Types, interfaces, unions, generics, narrowing, typed APIs, and safer application architecture."
      },
      {
        "title": "React",
        "description": "Components, props, state, hooks, forms, effects, data flow, reusable UI, and application structure."
      },
      {
        "title": "Next.js & Full-Stack React",
        "description": "Routing, server/client components, data fetching, forms, API/server routes, rendering, and deployment."
      },
      {
        "title": "Backend with Node.js",
        "description": "Servers, routing, validation, middleware, errors, services, REST API design, and backend architecture."
      },
      {
        "title": "SQL & PostgreSQL",
        "description": "Tables, relationships, CRUD, joins, indexes, constraints, transactions, migrations, and database design."
      },
      {
        "title": "Auth, Security & Real Product Features",
        "description": "Authentication, authorization, secure sessions, file uploads, email, payments, rate limits, and OWASP-style protections."
      },
      {
        "title": "Testing, Performance & Accessibility",
        "description": "Unit/integration/E2E testing, debugging, Lighthouse-style checks, performance, accessibility, and resilient UX."
      },
      {
        "title": "Git, Docker, Deployment & Capstone",
        "description": "Git/GitHub workflow, environment variables, containers, CI/CD basics, production deployment, monitoring, and a complete full-stack project."
      }
    ],
    "requirementNote": "A full-stack developer does not need every framework on the market. The curriculum should teach the web platform deeply, one modern frontend stack, one backend runtime, SQL/database design, security, testing, and deployment so skills transfer to other stacks."
  },
  "Frontend Developer": {
    "whatYouLearn": [
      "Build accessible, responsive user interfaces with semantic HTML, modern CSS, JavaScript, and TypeScript.",
      "Use React and a framework such as Next.js to build component-based applications.",
      "Work with APIs, forms, authentication flows, client-side state, routing, performance, and error states.",
      "Translate designs into precise interfaces while preserving accessibility and responsive behavior.",
      "Test, debug, optimize, version, and deploy frontend applications."
    ],
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Accessibility",
      "Responsive Design",
      "Web APIs",
      "Testing",
      "Performance",
      "Git"
    ],
    "tools": [
      "VS Code",
      "Browser DevTools",
      "Git",
      "GitHub",
      "npm",
      "React",
      "Next.js",
      "Figma",
      "Testing Tools"
    ],
    "modules": [
      {
        "title": "HTML & Web Standards",
        "description": "Semantic structure, forms, media, browser behavior, metadata, and accessibility."
      },
      {
        "title": "CSS & Responsive UI",
        "description": "Layout, Flexbox, Grid, responsive design, typography, component styling, and design systems."
      },
      {
        "title": "JavaScript",
        "description": "Core language, DOM, events, modules, async code, APIs, and errors."
      },
      {
        "title": "TypeScript",
        "description": "Typed components, data models, props, APIs, generics, and safer refactoring."
      },
      {
        "title": "React",
        "description": "Components, hooks, state, forms, effects, data flow, reusable UI, and testing."
      },
      {
        "title": "Next.js & App Architecture",
        "description": "Routing, rendering, data loading, server/client boundaries, and deployment."
      },
      {
        "title": "Accessibility, Testing & Performance",
        "description": "Keyboard support, screen-reader semantics, automated/manual tests, performance, and debugging."
      },
      {
        "title": "Portfolio Project",
        "description": "Build and deploy a polished production-style frontend from design through testing."
      }
    ]
  },
  "Backend Developer": {
    "whatYouLearn": [
      "Design and build reliable server-side applications and APIs.",
      "Use a backend language such as TypeScript/Node.js, Python, Java, C#, or Go and understand how the same concepts transfer across languages.",
      "Model relational data, write SQL, use transactions, indexes, and migrations.",
      "Implement authentication, authorization, validation, background jobs, caching, logging, and error handling.",
      "Test, secure, containerize, deploy, and monitor backend services."
    ],
    "skills": [
      "TypeScript/Node.js",
      "Python or Java/C#/Go",
      "SQL",
      "PostgreSQL",
      "REST APIs",
      "Authentication",
      "Caching",
      "Testing",
      "Security",
      "Docker",
      "Cloud"
    ],
    "tools": [
      "VS Code",
      "Git",
      "GitHub",
      "Node.js",
      "Python",
      "PostgreSQL",
      "API Client",
      "Docker",
      "Cloud Platform"
    ],
    "modules": [
      {
        "title": "Backend Programming",
        "description": "Server-side language fundamentals, modules, errors, concurrency/asynchrony, and application structure."
      },
      {
        "title": "HTTP & API Design",
        "description": "Requests, responses, REST, validation, status codes, pagination, versioning, and API documentation."
      },
      {
        "title": "SQL & Data Modeling",
        "description": "Relational design, queries, joins, constraints, indexes, transactions, and migrations."
      },
      {
        "title": "Authentication & Authorization",
        "description": "Passwords, sessions, tokens, roles, permissions, account security, and secure storage."
      },
      {
        "title": "Reliability & Performance",
        "description": "Caching, queues, background jobs, rate limits, logging, metrics, and failure handling."
      },
      {
        "title": "Testing & Security",
        "description": "Unit/integration tests, input validation, dependency risk, secrets, and common web vulnerabilities."
      },
      {
        "title": "Containers & Deployment",
        "description": "Docker, environment configuration, CI/CD, cloud deployment, monitoring, and rollback."
      },
      {
        "title": "Backend Capstone",
        "description": "Build a production-style API and database service with authentication, tests, and deployment."
      }
    ]
  },
  "Mobile App Developer": {
    "whatYouLearn": [
      "Build mobile applications for iOS and Android using a modern cross-platform or native stack.",
      "Learn TypeScript/JavaScript with React Native or Dart with Flutter, plus the basics of native Swift/Kotlin concepts.",
      "Work with navigation, state, device APIs, networking, offline data, authentication, notifications, and app storage.",
      "Test on simulators and physical devices, handle performance, accessibility, privacy, and platform guidelines.",
      "Package, sign, and prepare applications for app-store distribution."
    ],
    "skills": [
      "TypeScript/JavaScript or Dart",
      "React Native or Flutter",
      "Mobile UI",
      "REST APIs",
      "Local Storage",
      "Authentication",
      "Push Notifications",
      "Testing",
      "App Distribution"
    ],
    "tools": [
      "VS Code",
      "Android Studio",
      "Xcode Basics",
      "React Native or Flutter",
      "Git",
      "GitHub",
      "API Client"
    ],
    "modules": [
      {
        "title": "Mobile Development Foundations",
        "description": "Platforms, app lifecycle, project setup, simulators, devices, and mobile UX."
      },
      {
        "title": "Language & Framework",
        "description": "Build UI and application logic with React Native/TypeScript or Flutter/Dart."
      },
      {
        "title": "Navigation & State",
        "description": "Screens, routing, forms, reusable components, local and shared state."
      },
      {
        "title": "Networking & Data",
        "description": "REST APIs, JSON, authentication, local persistence, offline behavior, and sync."
      },
      {
        "title": "Device Capabilities",
        "description": "Camera, location, notifications, permissions, secure storage, and platform APIs."
      },
      {
        "title": "Quality & Performance",
        "description": "Testing, debugging, accessibility, privacy, crash handling, and optimization."
      },
      {
        "title": "Release & Capstone",
        "description": "Build a complete app and prepare a release for mobile distribution."
      }
    ]
  },
  "AI Engineer": {
    "whatYouLearn": [
      "Build AI-powered products using Python, model APIs, embeddings, retrieval, structured outputs, tools, and agent workflows.",
      "Understand machine-learning and deep-learning foundations well enough to choose appropriate approaches.",
      "Work with data using Python, SQL, NumPy, and Pandas.",
      "Use PyTorch or TensorFlow concepts for model work and understand transformer/LLM fundamentals.",
      "Build RAG systems, vector search, evaluation pipelines, guardrails, and reliable tool calling.",
      "Deploy AI services, monitor quality/cost/latency, protect data, and manage model or prompt changes."
    ],
    "skills": [
      "Python",
      "SQL",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "PyTorch or TensorFlow",
      "LLM APIs",
      "Embeddings",
      "RAG",
      "Vector Databases",
      "Evaluation",
      "Prompt Design",
      "MLOps",
      "AI Safety"
    ],
    "tools": [
      "Python",
      "Jupyter",
      "Git/GitHub",
      "PyTorch",
      "LLM API",
      "Vector Database",
      "PostgreSQL",
      "Docker",
      "Cloud Platform",
      "Evaluation Framework"
    ],
    "modules": [
      {
        "title": "Python, Data & SQL",
        "description": "Python programming, arrays/dataframes, data cleaning, SQL, and reproducible workflows."
      },
      {
        "title": "Machine Learning Foundations",
        "description": "Supervised/unsupervised learning, features, metrics, validation, bias/variance, and model selection."
      },
      {
        "title": "Deep Learning & Transformers",
        "description": "Neural networks, embeddings, attention, transformer concepts, and model inference."
      },
      {
        "title": "LLM Application Engineering",
        "description": "Model APIs, prompt design, structured outputs, function/tool calling, and conversation state."
      },
      {
        "title": "RAG & Knowledge Systems",
        "description": "Chunking, embeddings, vector search, retrieval quality, citations, and document pipelines."
      },
      {
        "title": "Agents & Tool Use",
        "description": "Planning, tool routing, browser/data tools, permissions, retries, and safe action boundaries."
      },
      {
        "title": "Evaluation, Guardrails & Safety",
        "description": "Test sets, hallucination checks, quality metrics, moderation, privacy, and failure analysis."
      },
      {
        "title": "Deployment & AI Operations",
        "description": "Serving, caching, latency, cost controls, monitoring, versioning, Docker, and cloud deployment."
      }
    ]
  },
  "Machine Learning Engineer": {
    "whatYouLearn": [
      "Use Python and SQL to prepare data and build reproducible machine-learning pipelines.",
      "Apply statistics, linear algebra, probability, feature engineering, model selection, and evaluation.",
      "Train models with scikit-learn and deep-learning frameworks such as PyTorch or TensorFlow.",
      "Track experiments, version data/models, package inference services, and deploy models.",
      "Monitor drift, performance, latency, and reliability in production."
    ],
    "skills": [
      "Python",
      "SQL",
      "NumPy",
      "Pandas",
      "Statistics",
      "Linear Algebra",
      "scikit-learn",
      "PyTorch or TensorFlow",
      "Feature Engineering",
      "Model Evaluation",
      "MLOps",
      "Docker",
      "Cloud"
    ],
    "tools": [
      "Python",
      "Jupyter",
      "Git",
      "scikit-learn",
      "PyTorch/TensorFlow",
      "Experiment Tracking",
      "Docker",
      "Cloud ML Platform"
    ],
    "modules": [
      {
        "title": "Math, Python & Data",
        "description": "Python, SQL, probability, statistics, linear algebra, data cleaning, and exploratory analysis."
      },
      {
        "title": "Classical Machine Learning",
        "description": "Regression, classification, trees, ensembles, clustering, preprocessing, and evaluation."
      },
      {
        "title": "Feature Engineering & Validation",
        "description": "Data leakage, cross-validation, metrics, imbalance, feature selection, and pipelines."
      },
      {
        "title": "Deep Learning",
        "description": "Neural networks, optimization, embeddings, sequence/image foundations, and framework use."
      },
      {
        "title": "Data & Training Pipelines",
        "description": "Reusable training code, dataset versioning, orchestration concepts, and reproducibility."
      },
      {
        "title": "Serving Models",
        "description": "APIs, batch/online inference, containers, performance, and deployment patterns."
      },
      {
        "title": "MLOps & Monitoring",
        "description": "Experiment tracking, model registry concepts, drift, observability, retraining, and governance."
      }
    ]
  },
  "Cybersecurity Analyst": {
    "whatYouLearn": [
      "Understand operating systems, networking, TCP/IP, DNS, HTTP, identity, and security architecture.",
      "Use Linux, Windows, Bash/PowerShell, and basic Python to investigate and automate security work.",
      "Analyze logs and alerts with SIEM concepts, inspect network traffic, and perform vulnerability assessment.",
      "Recognize phishing, malware, web vulnerabilities, endpoint threats, misconfiguration, and cloud risks.",
      "Respond to incidents, preserve evidence, document findings, and recommend remediation.",
      "Apply least privilege, IAM, patching, segmentation, encryption, backups, and secure configuration."
    ],
    "skills": [
      "Networking",
      "Linux",
      "Windows",
      "Python Basics",
      "Bash/PowerShell",
      "SIEM",
      "Wireshark",
      "Vulnerability Management",
      "Incident Response",
      "IAM",
      "OWASP",
      "Cloud Security"
    ],
    "tools": [
      "Linux",
      "PowerShell",
      "Python",
      "Wireshark",
      "Nmap",
      "SIEM Platform",
      "Vulnerability Scanner",
      "Git",
      "Cloud Console"
    ],
    "modules": [
      {
        "title": "Security & Networking Foundations",
        "description": "CIA triad, threats, TCP/IP, ports, DNS, HTTP, firewalls, VPNs, and segmentation."
      },
      {
        "title": "Linux, Windows & Scripting",
        "description": "System administration basics, logs, permissions, command line, PowerShell/Bash, and Python automation."
      },
      {
        "title": "Identity & Access Security",
        "description": "Authentication, MFA, permissions, directory services, least privilege, and account attacks."
      },
      {
        "title": "Network & Endpoint Analysis",
        "description": "Packet analysis, endpoint telemetry, malware indicators, logs, and suspicious activity."
      },
      {
        "title": "Vulnerability & Web Security",
        "description": "Scanning, CVEs, patching, configuration, OWASP concepts, and remediation prioritization."
      },
      {
        "title": "SIEM & Detection",
        "description": "Centralized logs, queries, alerts, detection logic, triage, and investigation workflows."
      },
      {
        "title": "Incident Response",
        "description": "Preparation, identification, containment, eradication, recovery, evidence, and reporting."
      },
      {
        "title": "Cloud & Security Operations",
        "description": "Cloud IAM, logging, network controls, secrets, secure configuration, and continuous monitoring."
      }
    ]
  },
  "Data Scientist": {
    "whatYouLearn": [
      "Use Python and SQL to clean, join, explore, and model real datasets.",
      "Apply probability, statistics, experimentation, hypothesis testing, and uncertainty correctly.",
      "Build visualizations and communicate findings to technical and nontechnical audiences.",
      "Train and evaluate predictive models with scikit-learn and understand when machine learning is appropriate.",
      "Design reproducible analyses, avoid leakage and misleading conclusions, and deploy or hand off models responsibly."
    ],
    "skills": [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Statistics",
      "Probability",
      "Data Visualization",
      "Experimentation",
      "scikit-learn",
      "Machine Learning",
      "Communication"
    ],
    "tools": [
      "Python",
      "Jupyter",
      "SQL Database",
      "Pandas",
      "scikit-learn",
      "Visualization Library",
      "Git",
      "BI Tool"
    ],
    "modules": [
      {
        "title": "Python & SQL for Data",
        "description": "Python, dataframes, querying, joins, cleaning, reshaping, and reproducible notebooks."
      },
      {
        "title": "Statistics & Probability",
        "description": "Distributions, sampling, confidence intervals, hypothesis tests, regression, and uncertainty."
      },
      {
        "title": "Exploratory Data Analysis",
        "description": "Data quality, descriptive statistics, visualization, patterns, anomalies, and questions."
      },
      {
        "title": "Experimentation",
        "description": "A/B tests, causal thinking basics, metrics, sample size concepts, and interpretation."
      },
      {
        "title": "Machine Learning",
        "description": "Supervised/unsupervised models, preprocessing, validation, feature engineering, and metrics."
      },
      {
        "title": "Communication & Storytelling",
        "description": "Charts, narratives, caveats, stakeholder questions, and decision-focused recommendations."
      },
      {
        "title": "Applied Data Science Project",
        "description": "Take a messy dataset from question definition through analysis, model, and presentation."
      }
    ]
  },
  "Data Analyst": {
    "whatYouLearn": [
      "Clean, organize, and analyze business data using spreadsheets, SQL, and BI tools.",
      "Write SQL queries with joins, aggregations, filters, subqueries, and window functions.",
      "Use statistics appropriately for summaries, trends, comparisons, and simple experiments.",
      "Build dashboards and communicate insights without misleading charts or unsupported conclusions.",
      "Use Python for analysis when spreadsheet or BI workflows are no longer enough."
    ],
    "skills": [
      "Excel/Spreadsheets",
      "SQL",
      "Data Cleaning",
      "Statistics",
      "Dashboards",
      "Data Visualization",
      "Business Metrics",
      "Python Basics",
      "Communication"
    ],
    "tools": [
      "Excel or Google Sheets",
      "SQL",
      "PostgreSQL",
      "Power BI or Tableau",
      "Python/Pandas",
      "Git Basics"
    ],
    "modules": [
      {
        "title": "Spreadsheet Analysis",
        "description": "Formulas, lookups, pivot tables, cleaning, validation, charts, and reusable analysis."
      },
      {
        "title": "SQL",
        "description": "SELECT, filtering, joins, grouping, subqueries, CTEs, window functions, and data-quality checks."
      },
      {
        "title": "Statistics for Analysts",
        "description": "Descriptive statistics, distributions, sampling, correlation, uncertainty, and basic testing."
      },
      {
        "title": "Dashboarding & BI",
        "description": "Metrics, data models, filters, charts, dashboard UX, and stakeholder reporting."
      },
      {
        "title": "Python for Analysis",
        "description": "Pandas, cleaning, automation, visualization, and repeatable data workflows."
      },
      {
        "title": "Business Analysis Project",
        "description": "Answer a business question from raw data through dashboard and recommendation."
      }
    ]
  },
  "Cloud Engineer": {
    "whatYouLearn": [
      "Understand networking, Linux, DNS, HTTP, storage, compute, identity, and cloud architecture.",
      "Use AWS, Azure, or GCP services for compute, networking, storage, databases, IAM, and monitoring.",
      "Automate infrastructure with Terraform-style infrastructure as code and scripting.",
      "Use containers, Kubernetes fundamentals, CI/CD, secrets, logging, backups, and disaster recovery.",
      "Design for security, availability, performance, scalability, and cost."
    ],
    "skills": [
      "Linux",
      "Networking",
      "AWS/Azure/GCP",
      "IAM",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Bash/Python",
      "CI/CD",
      "Observability",
      "Cloud Security"
    ],
    "tools": [
      "Linux",
      "Cloud CLI",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub Actions or CI",
      "Monitoring Platform"
    ],
    "modules": [
      {
        "title": "Linux & Networking",
        "description": "Processes, permissions, filesystems, TCP/IP, DNS, HTTP, subnets, routing, and firewalls."
      },
      {
        "title": "Core Cloud Services",
        "description": "Compute, storage, networking, databases, regions, availability zones, and managed services."
      },
      {
        "title": "Identity & Security",
        "description": "IAM, roles, policies, secrets, encryption, logging, and least privilege."
      },
      {
        "title": "Infrastructure as Code",
        "description": "Terraform concepts, modules, state, reusable environments, and change review."
      },
      {
        "title": "Containers & Kubernetes",
        "description": "Images, containers, registries, orchestration basics, deployments, services, and configuration."
      },
      {
        "title": "CI/CD & Automation",
        "description": "Build/deploy pipelines, scripting, environment management, and automated releases."
      },
      {
        "title": "Reliability & Cost",
        "description": "Monitoring, alerts, backups, recovery, autoscaling, architecture tradeoffs, and cost controls."
      }
    ]
  },
  "DevOps Engineer": {
    "whatYouLearn": [
      "Operate Linux systems and understand networking, processes, permissions, logs, and services.",
      "Automate work with Bash and Python and manage source with Git.",
      "Build CI/CD pipelines that test, package, and deploy software safely.",
      "Use Docker, Kubernetes, Terraform, and cloud platforms to run applications reproducibly.",
      "Implement monitoring, logging, alerting, incident response, reliability, and secure secrets/configuration."
    ],
    "skills": [
      "Linux",
      "Bash",
      "Python",
      "Git",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Cloud",
      "Observability",
      "SRE Basics",
      "Security"
    ],
    "tools": [
      "Linux",
      "Git/GitHub",
      "CI Platform",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Cloud Platform",
      "Monitoring/Logging Stack"
    ],
    "modules": [
      {
        "title": "Linux, Networking & Automation",
        "description": "Shell, processes, services, permissions, networking, Bash, and Python scripting."
      },
      {
        "title": "Git & Delivery Workflow",
        "description": "Branches, pull requests, releases, artifacts, versioning, and deployment strategies."
      },
      {
        "title": "CI/CD",
        "description": "Automated tests, builds, pipelines, environments, approvals, and rollback."
      },
      {
        "title": "Containers",
        "description": "Dockerfiles, images, registries, networking, volumes, security, and production patterns."
      },
      {
        "title": "Kubernetes",
        "description": "Pods, deployments, services, configuration, scaling, health checks, and troubleshooting."
      },
      {
        "title": "Infrastructure as Code",
        "description": "Terraform, state, modules, cloud resources, review, and environment consistency."
      },
      {
        "title": "Observability & Reliability",
        "description": "Metrics, logs, traces, alerts, SLO concepts, incidents, capacity, and postmortems."
      }
    ]
  },
  "UX / Product Designer": {
    "whatYouLearn": [
      "Research users, define problems, map journeys, and turn evidence into product decisions.",
      "Create information architecture, wireframes, interaction flows, and prototypes.",
      "Use Figma-style tools and design systems to build consistent interfaces.",
      "Test usability, accessibility, content clarity, and interaction quality.",
      "Collaborate with product managers and engineers and document design decisions."
    ],
    "skills": [
      "User Research",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Interaction Design",
      "Visual Design",
      "Accessibility",
      "Usability Testing",
      "Design Systems"
    ],
    "tools": [
      "Figma",
      "FigJam or Whiteboard",
      "Prototype Tools",
      "Accessibility Checkers",
      "Analytics/Research Tools"
    ],
    "modules": [
      {
        "title": "UX Foundations",
        "description": "Human-centered design, product thinking, accessibility, ethics, and design process."
      },
      {
        "title": "Research",
        "description": "Interviews, surveys, observation, competitive research, synthesis, and problem definition."
      },
      {
        "title": "Information Architecture",
        "description": "Flows, navigation, content hierarchy, mental models, and task design."
      },
      {
        "title": "Wireframes & Prototypes",
        "description": "Low/high-fidelity design, interaction patterns, responsive behavior, and prototyping."
      },
      {
        "title": "Visual Design & Systems",
        "description": "Typography, spacing, color, components, states, tokens, and design-system consistency."
      },
      {
        "title": "Usability & Accessibility Testing",
        "description": "Test plans, task observation, accessibility, findings, prioritization, and iteration."
      },
      {
        "title": "Portfolio Case Study",
        "description": "Document a complete product-design process with evidence, decisions, iterations, and outcomes."
      }
    ]
  },
  "IT Support Specialist": {
    "whatYouLearn": [
      "Troubleshoot Windows, macOS, hardware, applications, printers, accounts, and common user problems.",
      "Understand networking basics including IP addressing, DNS, DHCP, Wi-Fi, VPNs, and connectivity testing.",
      "Manage users, permissions, endpoints, software, backups, and basic directory/identity systems.",
      "Use ticketing, documentation, remote-support, command-line, and PowerShell tools.",
      "Apply security basics: MFA, phishing awareness, patching, endpoint protection, least privilege, and safe escalation."
    ],
    "skills": [
      "Windows",
      "macOS",
      "Hardware",
      "Networking",
      "Active Directory/Entra Basics",
      "PowerShell",
      "Ticketing",
      "Troubleshooting",
      "Security",
      "Customer Support"
    ],
    "tools": [
      "Windows",
      "macOS",
      "PowerShell",
      "Remote Support Tool",
      "Ticketing System",
      "Directory/IAM Console",
      "Network Utilities"
    ],
    "modules": [
      {
        "title": "Computer Hardware & Operating Systems",
        "description": "Components, storage, peripherals, Windows/macOS, installation, updates, and recovery."
      },
      {
        "title": "Networking",
        "description": "IP, DNS, DHCP, Wi-Fi, VPNs, routers, troubleshooting commands, and connectivity diagnosis."
      },
      {
        "title": "Accounts & Identity",
        "description": "Users, groups, permissions, MFA, password resets, directory services, and access troubleshooting."
      },
      {
        "title": "Applications & Endpoints",
        "description": "Software installation, configuration, updates, device management concepts, and endpoint security."
      },
      {
        "title": "PowerShell & Command Line",
        "description": "Useful commands, scripts, logs, system information, and repetitive-task automation."
      },
      {
        "title": "Ticketing & User Support",
        "description": "Triage, questions, reproduction, documentation, escalation, communication, and service quality."
      },
      {
        "title": "Security & Capstone",
        "description": "Phishing, patching, malware response basics, backups, least privilege, and end-to-end troubleshooting scenarios."
      }
    ]
  },
  "Solutions Architect": {
    "whatYouLearn": [
      "Translate business and technical requirements into complete system designs.",
      "Design application, API, networking, data, integration, identity, security, and cloud architectures.",
      "Compare tradeoffs in reliability, performance, scalability, cost, compliance, and operational complexity.",
      "Create diagrams, technical proposals, migration plans, proof-of-concepts, and architecture decisions.",
      "Communicate effectively with engineers, product leaders, security teams, and customers."
    ],
    "skills": [
      "System Design",
      "Cloud Architecture",
      "Networking",
      "APIs",
      "Databases",
      "Integration",
      "IAM",
      "Security",
      "Scalability",
      "Reliability",
      "Cost Design",
      "Technical Communication"
    ],
    "tools": [
      "Architecture Diagramming",
      "Cloud Platform",
      "Terraform Basics",
      "API Tools",
      "SQL Database",
      "Monitoring Tools",
      "Documentation"
    ],
    "modules": [
      {
        "title": "Architecture Foundations",
        "description": "Requirements, quality attributes, constraints, tradeoffs, and architecture documentation."
      },
      {
        "title": "Applications, APIs & Integration",
        "description": "Service boundaries, REST/events, synchronous/asynchronous communication, and integration patterns."
      },
      {
        "title": "Data Architecture",
        "description": "Relational/NoSQL tradeoffs, caching, consistency, storage, analytics, and data movement."
      },
      {
        "title": "Cloud & Networking",
        "description": "Regions, networks, load balancing, compute, managed services, connectivity, and hybrid patterns."
      },
      {
        "title": "Security & Identity",
        "description": "IAM, secrets, encryption, trust boundaries, least privilege, and compliance considerations."
      },
      {
        "title": "Scalability & Reliability",
        "description": "Availability, failure modes, queues, retries, observability, disaster recovery, and capacity."
      },
      {
        "title": "Cost, Migration & Communication",
        "description": "Cost modeling, migration strategy, diagrams, decision records, proposals, and stakeholder review."
      }
    ]
  },
  "Physician / Doctor": {
    "whatYouLearn": [
      "Build the scientific foundation used in medical education: anatomy, physiology, biochemistry, genetics, microbiology, immunology, pathology, and pharmacology.",
      "Understand how clinicians take histories, perform structured examinations, create differential diagnoses, and use evidence to reason about patient problems.",
      "Learn the purpose and interpretation principles of common laboratory tests, imaging, vital signs, and diagnostic workflows.",
      "Study disease mechanisms and management concepts across major organ systems without treating GAHN as a substitute for supervised medical training.",
      "Learn patient communication, ethics, informed consent, documentation, teamwork, safety, and evidence-based medicine.",
      "Understand the U.S. training path from premedical coursework through medical school, residency, licensure, and optional fellowship."
    ],
    "skills": [
      "Anatomy",
      "Physiology",
      "Biochemistry",
      "Microbiology",
      "Immunology",
      "Pathology",
      "Pharmacology",
      "Clinical Reasoning",
      "History Taking",
      "Diagnostic Reasoning",
      "Evidence-Based Medicine",
      "Medical Ethics",
      "Documentation"
    ],
    "tools": [
      "Anatomy Resources",
      "Clinical Case Simulations",
      "Drug References",
      "Evidence Databases",
      "EHR Concepts",
      "Diagnostic Reference Material"
    ],
    "modules": [
      {
        "title": "Preclinical Science Foundations",
        "description": "Anatomy, physiology, biochemistry, genetics, cell biology, microbiology, and immunology."
      },
      {
        "title": "Pathology & Pharmacology",
        "description": "Mechanisms of disease, inflammation, neoplasia, drug classes, pharmacokinetics, pharmacodynamics, and medication safety."
      },
      {
        "title": "Clinical Skills & Communication",
        "description": "History structure, examination principles, patient communication, documentation, ethics, and teamwork."
      },
      {
        "title": "Clinical Reasoning",
        "description": "Problem representation, differential diagnosis, test selection, probabilities, and evidence-based decisions."
      },
      {
        "title": "Organ-System Medicine",
        "description": "Cardiovascular, respiratory, renal, gastrointestinal, endocrine, neurologic, musculoskeletal, infectious, and reproductive systems."
      },
      {
        "title": "Diagnostics & Evidence",
        "description": "Laboratory interpretation principles, imaging concepts, diagnostic accuracy, guidelines, and medical literature."
      },
      {
        "title": "Safety, Ethics & Health Systems",
        "description": "Patient safety, quality, informed consent, privacy, public health, healthcare systems, and interprofessional care."
      },
      {
        "title": "Training & Specialty Exploration",
        "description": "Medical school, licensing exams, residency, specialties, fellowship, continuing education, and professional development."
      }
    ],
    "requirementNote": "In the U.S., physicians typically need a bachelor’s degree, an M.D. or D.O. degree, and 3–9 years of internship/residency depending on specialty; licensure is required. GAHN can teach academic foundations and simulated reasoning but cannot replace accredited medical education or supervised clinical training."
  },
  "Registered Nurse": {
    "whatYouLearn": [
      "Learn anatomy, physiology, microbiology, pathophysiology, pharmacology, dosage concepts, and health assessment.",
      "Understand nursing fundamentals: vital signs, infection prevention, safety, mobility, hygiene, nutrition, documentation, and patient-centered care.",
      "Study medical-surgical, pediatric, maternal/newborn, mental-health, and community-health nursing concepts.",
      "Practice clinical judgment: recognize changes, prioritize care, communicate findings, plan interventions, and evaluate outcomes.",
      "Learn medication safety, adverse-reaction monitoring, care planning, handoffs, EHR documentation, and teamwork.",
      "Understand RN education routes, supervised clinical education, NCLEX-style preparation, and licensure."
    ],
    "skills": [
      "Anatomy & Physiology",
      "Pathophysiology",
      "Pharmacology",
      "Health Assessment",
      "Medication Safety",
      "Clinical Judgment",
      "Care Planning",
      "Infection Control",
      "Patient Education",
      "Documentation",
      "Dosage Calculations",
      "Communication"
    ],
    "tools": [
      "EHR/EMR Concepts",
      "Drug Guide",
      "Vital-Sign Equipment Concepts",
      "Care Plans",
      "Clinical Case Simulations",
      "NCLEX-style Practice"
    ],
    "modules": [
      {
        "title": "Nursing Science Foundations",
        "description": "Anatomy, physiology, microbiology, pathophysiology, nutrition, and basic pharmacology."
      },
      {
        "title": "Fundamentals & Safety",
        "description": "Vital signs, hygiene, mobility, infection prevention, patient identification, safety, and basic care."
      },
      {
        "title": "Health Assessment",
        "description": "History, head-to-toe assessment principles, recognizing abnormal findings, and documentation."
      },
      {
        "title": "Pharmacology & Medication Safety",
        "description": "Drug classes, calculations, administration principles, interactions, adverse effects, and monitoring."
      },
      {
        "title": "Medical-Surgical Nursing",
        "description": "Common adult conditions, priorities, interventions, monitoring, and patient education."
      },
      {
        "title": "Maternal, Pediatric & Mental Health Nursing",
        "description": "Core concepts for pregnancy/newborn care, children, behavioral health, and therapeutic communication."
      },
      {
        "title": "Clinical Judgment & Documentation",
        "description": "Prioritization, care plans, handoffs, EHR documentation, escalation, and interdisciplinary communication."
      },
      {
        "title": "Licensure Preparation",
        "description": "NCLEX-style reasoning, safety/priority questions, weak-area review, and transition-to-practice concepts."
      }
    ],
    "requirementNote": "Registered nurses complete an approved nursing education program and must be licensed. Programs include supervised clinical experience. GAHN can support study and simulation but cannot replace accredited nursing education or clinical hours."
  },
  "Pharmacist": {
    "whatYouLearn": [
      "Build foundations in chemistry, biology, anatomy/physiology, biochemistry, microbiology, and statistics.",
      "Learn pharmacology, medicinal chemistry, pharmaceutics, pharmacokinetics, pharmacodynamics, and therapeutics.",
      "Understand dosage calculations, formulations, drug interactions, contraindications, medication reconciliation, and medication safety.",
      "Study pharmacy law, ethics, patient counseling, public health, immunization concepts, and evidence evaluation.",
      "Learn pharmacy informatics, prescription workflows, drug information, and interprofessional care.",
      "Understand Pharm.D. education, experiential training, examinations, and licensure."
    ],
    "skills": [
      "Pharmacology",
      "Medicinal Chemistry",
      "Pharmaceutics",
      "Pharmacokinetics",
      "Therapeutics",
      "Drug Interactions",
      "Dosage Calculations",
      "Medication Safety",
      "Patient Counseling",
      "Pharmacy Law",
      "Evidence Evaluation"
    ],
    "tools": [
      "Drug Information Databases",
      "Prescription Processing Concepts",
      "EHR Concepts",
      "Clinical Calculators",
      "Evidence Databases"
    ],
    "modules": [
      {
        "title": "Biomedical & Chemical Foundations",
        "description": "Chemistry, biology, anatomy/physiology, biochemistry, microbiology, and statistics."
      },
      {
        "title": "Pharmacology & Medicinal Chemistry",
        "description": "Drug targets, mechanisms, classes, structure-activity concepts, adverse effects, and interactions."
      },
      {
        "title": "Pharmaceutics & Calculations",
        "description": "Dosage forms, compounding concepts, concentrations, dosing calculations, and formulation principles."
      },
      {
        "title": "Pharmacokinetics & Pharmacodynamics",
        "description": "Absorption, distribution, metabolism, elimination, dosing, concentration, and response."
      },
      {
        "title": "Therapeutics",
        "description": "Evidence-based medication selection and monitoring across common disease states."
      },
      {
        "title": "Medication Safety & Patient Care",
        "description": "Reconciliation, interaction checks, counseling, adherence, error prevention, and communication."
      },
      {
        "title": "Law, Ethics & Informatics",
        "description": "Pharmacy law concepts, controlled substances, privacy, documentation, systems, and informatics."
      }
    ],
    "requirementNote": "In the U.S., pharmacists typically need an accredited Pharm.D. degree and state licensure. GAHN can support academic preparation and medication-science learning but does not authorize clinical practice."
  },
  "Dentist": {
    "whatYouLearn": [
      "Learn foundational biomedical sciences plus head-and-neck anatomy, oral biology, dental materials, microbiology, and pathology.",
      "Understand oral diagnosis, prevention, treatment-planning concepts, radiology principles, and patient communication.",
      "Study restorative dentistry, periodontics, endodontics, prosthodontics, pediatric dentistry, orthodontic concepts, and oral-surgery concepts.",
      "Learn infection prevention, local-anesthesia concepts, medical emergencies, ethics, recordkeeping, and practice management.",
      "Understand DDS/DMD education, supervised clinical training, examinations, and licensure."
    ],
    "skills": [
      "Head & Neck Anatomy",
      "Oral Biology",
      "Dental Materials",
      "Oral Pathology",
      "Radiology Principles",
      "Treatment Planning",
      "Preventive Dentistry",
      "Restorative Concepts",
      "Periodontics",
      "Endodontics",
      "Infection Control",
      "Patient Communication"
    ],
    "tools": [
      "Dental Imaging Concepts",
      "Dental Charting/EHR Concepts",
      "Clinical Case Simulations",
      "Dental Materials References",
      "Evidence Resources"
    ],
    "modules": [
      {
        "title": "Biomedical & Oral Science",
        "description": "Anatomy, physiology, microbiology, pathology, oral biology, and head-and-neck anatomy."
      },
      {
        "title": "Diagnostics & Prevention",
        "description": "History, examination concepts, caries/periodontal risk, imaging principles, prevention, and treatment planning."
      },
      {
        "title": "Restorative Dentistry & Materials",
        "description": "Tooth structure, restorative principles, dental materials, occlusion, and rehabilitation concepts."
      },
      {
        "title": "Periodontics, Endodontics & Prosthodontics",
        "description": "Gum disease, pulp disease, root-canal concepts, crowns/bridges, dentures, and implant principles."
      },
      {
        "title": "Pediatric, Orthodontic & Surgical Concepts",
        "description": "Development, behavior, alignment, extraction/surgery concepts, and specialty awareness."
      },
      {
        "title": "Safety, Ethics & Practice",
        "description": "Infection control, emergency response concepts, documentation, ethics, communication, and practice management."
      }
    ],
    "requirementNote": "Dentists in the U.S. generally need an accredited DDS or DMD degree and state licensure; specialty practice may require postdoctoral training. GAHN cannot replace dental school or supervised clinical training."
  },
  "Physical Therapist": {
    "whatYouLearn": [
      "Learn anatomy, kinesiology, biomechanics, neuroscience, exercise physiology, pathology, and movement science.",
      "Understand examination principles: history, observation, range of motion, strength, balance, gait, functional testing, and outcome measures.",
      "Study therapeutic exercise, mobility training, manual-therapy concepts, pain science, and patient education.",
      "Learn musculoskeletal, neurologic, cardiopulmonary, pediatric, geriatric, and rehabilitation concepts.",
      "Practice care-plan reasoning, progress measurement, documentation, safety, and evidence-based practice."
    ],
    "skills": [
      "Anatomy",
      "Kinesiology",
      "Biomechanics",
      "Neuroscience",
      "Exercise Physiology",
      "Movement Assessment",
      "Therapeutic Exercise",
      "Pain Science",
      "Rehabilitation Planning",
      "Documentation",
      "Evidence-Based Practice"
    ],
    "tools": [
      "Movement-Analysis Concepts",
      "Outcome Measures",
      "Exercise Programming",
      "Clinical Case Simulations",
      "Evidence Databases"
    ],
    "modules": [
      {
        "title": "Movement Science Foundations",
        "description": "Anatomy, kinesiology, biomechanics, neuroscience, and exercise physiology."
      },
      {
        "title": "Examination & Measurement",
        "description": "History, movement observation, range, strength, gait, balance, function, and outcome measures."
      },
      {
        "title": "Therapeutic Exercise & Mobility",
        "description": "Exercise selection, progression, mobility, conditioning, and patient education."
      },
      {
        "title": "Musculoskeletal Rehabilitation",
        "description": "Orthopedic conditions, tissue healing, pain, movement impairments, and recovery planning."
      },
      {
        "title": "Neurologic & Cardiopulmonary Rehabilitation",
        "description": "Neurologic movement, balance, endurance, cardiopulmonary limitations, and functional recovery."
      },
      {
        "title": "Clinical Reasoning & Evidence",
        "description": "Goals, care-plan reasoning, progress, documentation, evidence appraisal, ethics, and safety."
      }
    ],
    "requirementNote": "Physical therapists entering practice in the U.S. need a Doctor of Physical Therapy (DPT) degree and state licensure. GAHN supports academic learning and simulated cases, not unsupervised clinical practice."
  },
  "Occupational Therapist": {
    "whatYouLearn": [
      "Learn anatomy, neuroscience, psychology, human development, activity analysis, and occupational science.",
      "Understand how illness, injury, disability, environment, and life roles affect daily activities.",
      "Study ADLs/IADLs, upper-extremity function, cognition, sensory processing, mental health, pediatrics, neurorehabilitation, and aging.",
      "Learn assistive technology, environmental modification, ergonomics, goal setting, documentation, and evidence-based intervention planning."
    ],
    "skills": [
      "Activity Analysis",
      "ADLs/IADLs",
      "Anatomy",
      "Neuroscience",
      "Cognition",
      "Pediatrics",
      "Mental Health",
      "Assistive Technology",
      "Ergonomics",
      "Rehabilitation Planning",
      "Documentation"
    ],
    "tools": [
      "Activity-Analysis Frameworks",
      "Assistive-Technology Concepts",
      "Adaptive Equipment Concepts",
      "Clinical Case Simulations",
      "Outcome Measures"
    ],
    "modules": [
      {
        "title": "Occupational Science Foundations",
        "description": "Human occupation, anatomy, neuroscience, psychology, development, and environmental context."
      },
      {
        "title": "Evaluation & Activity Analysis",
        "description": "Roles, routines, ADLs/IADLs, motor/cognitive factors, environment, and goal setting."
      },
      {
        "title": "Physical & Neurologic Rehabilitation",
        "description": "Upper extremity, movement, cognition, neurologic conditions, adaptation, and recovery concepts."
      },
      {
        "title": "Pediatrics & Sensory Development",
        "description": "Development, school participation, sensory concepts, play, and family-centered care."
      },
      {
        "title": "Mental Health & Community Practice",
        "description": "Psychosocial function, routines, group/community concepts, and participation."
      },
      {
        "title": "Assistive Technology, Ergonomics & Documentation",
        "description": "Adaptive equipment, environmental modification, workplace ergonomics, outcomes, and records."
      }
    ],
    "requirementNote": "Occupational-therapy practice requires accredited professional education and applicable licensure/certification. GAHN supports learning and simulation, not clinical qualification."
  },
  "Radiologic Technologist": {
    "whatYouLearn": [
      "Learn anatomy, medical terminology, patient care, positioning, radiation physics, and image-production principles.",
      "Understand radiation protection, exposure factors, quality assurance, image evaluation, and safe workflow.",
      "Study common radiographic examinations and the purpose of CT, MRI, fluoroscopy, and other imaging modalities.",
      "Learn infection control, contrast/media concepts, communication, documentation, and professional ethics."
    ],
    "skills": [
      "Anatomy",
      "Patient Positioning",
      "Radiation Physics",
      "Radiation Safety",
      "Image Production",
      "Image Evaluation",
      "Patient Care",
      "Quality Assurance",
      "Medical Terminology"
    ],
    "tools": [
      "Radiography Equipment Concepts",
      "PACS/RIS Concepts",
      "Radiation-Safety Tools",
      "Positioning References",
      "Clinical Simulations"
    ],
    "modules": [
      {
        "title": "Anatomy & Patient Care",
        "description": "Anatomy, terminology, communication, vital-sign concepts, mobility, infection control, and safety."
      },
      {
        "title": "Radiation Physics",
        "description": "X-ray production, interactions, exposure, image formation, and equipment principles."
      },
      {
        "title": "Positioning & Procedures",
        "description": "Positioning principles, projections, anatomy visualization, and examination workflow."
      },
      {
        "title": "Radiation Protection",
        "description": "ALARA, shielding concepts, exposure monitoring, patient/staff safety, and regulation awareness."
      },
      {
        "title": "Image Quality & Digital Systems",
        "description": "Image evaluation, artifacts, digital imaging, PACS/RIS concepts, and quality control."
      },
      {
        "title": "Advanced Modalities & Professional Practice",
        "description": "CT/MRI/fluoroscopy overview, contrast concepts, ethics, documentation, and teamwork."
      }
    ],
    "requirementNote": "Education, certification, and licensure requirements vary by jurisdiction and employer. GAHN should teach theory and simulated workflows, not replace supervised clinical training."
  },
  "Medical Laboratory Scientist": {
    "whatYouLearn": [
      "Learn specimen collection/handling concepts, laboratory safety, quality systems, and analytical measurement.",
      "Study clinical chemistry, hematology, microbiology, immunology/serology, blood banking/transfusion science, urinalysis, and molecular diagnostics.",
      "Understand instrumentation, calibration, controls, reference ranges, interference, result validation, and error investigation.",
      "Learn laboratory information systems, documentation, regulation concepts, and communication of critical results."
    ],
    "skills": [
      "Clinical Chemistry",
      "Hematology",
      "Microbiology",
      "Immunology",
      "Blood Bank",
      "Urinalysis",
      "Molecular Diagnostics",
      "Quality Control",
      "Laboratory Safety",
      "Result Interpretation"
    ],
    "tools": [
      "Laboratory Information System Concepts",
      "Microscopy Concepts",
      "Analyzers",
      "Quality-Control Materials",
      "Molecular Diagnostics Concepts"
    ],
    "modules": [
      {
        "title": "Laboratory Foundations",
        "description": "Specimens, measurement, safety, quality systems, documentation, and pre-analytic error."
      },
      {
        "title": "Hematology & Coagulation",
        "description": "Blood cells, morphology, hematologic disorders, coagulation concepts, and testing."
      },
      {
        "title": "Clinical Chemistry",
        "description": "Chemistry panels, enzymes, electrolytes, hormones, toxicology concepts, and analytical methods."
      },
      {
        "title": "Microbiology & Immunology",
        "description": "Bacteria, viruses, fungi, parasites, culture concepts, serology, and immune testing."
      },
      {
        "title": "Transfusion & Molecular Diagnostics",
        "description": "Blood groups, compatibility, transfusion safety, nucleic-acid testing, and molecular methods."
      },
      {
        "title": "Quality, Informatics & Validation",
        "description": "Controls, calibration, verification, LIS concepts, critical values, troubleshooting, and regulation."
      }
    ],
    "requirementNote": "Clinical-laboratory education, certification, and licensure requirements vary. GAHN should support academic preparation and simulated interpretation, not independent patient testing."
  },
  "Emergency Medical Technician": {
    "whatYouLearn": [
      "Learn EMS systems, anatomy/physiology foundations, patient assessment, scene safety, communication, and documentation.",
      "Study airway/breathing support, CPR/AED concepts, shock, trauma assessment, bleeding control, and common medical emergencies.",
      "Understand pediatric, obstetric, behavioral, environmental, and special-population emergencies.",
      "Learn ambulance operations, lifting/movement safety, triage concepts, teamwork, and handoff communication."
    ],
    "skills": [
      "Patient Assessment",
      "Airway & Breathing",
      "CPR/AED",
      "Trauma Assessment",
      "Medical Emergencies",
      "Shock",
      "EMS Operations",
      "Communication",
      "Documentation",
      "Safety"
    ],
    "tools": [
      "EMS Assessment Frameworks",
      "CPR/AED Training Concepts",
      "Trauma Simulations",
      "Documentation Practice",
      "Scenario-Based Training"
    ],
    "modules": [
      {
        "title": "EMS Foundations & Safety",
        "description": "EMS roles, scene size-up, safety, consent, communication, anatomy, and terminology."
      },
      {
        "title": "Patient Assessment",
        "description": "Primary assessment, history, vital signs, secondary assessment, reassessment, and handoff."
      },
      {
        "title": "Airway, Breathing & Resuscitation",
        "description": "Airway concepts, ventilation, oxygen concepts, CPR/AED, and respiratory emergencies."
      },
      {
        "title": "Medical Emergencies",
        "description": "Cardiac, neurologic, diabetic, allergic, toxicologic, behavioral, and other common emergencies."
      },
      {
        "title": "Trauma",
        "description": "Bleeding, shock, head/spine, chest, abdominal, musculoskeletal, burns, and trauma prioritization."
      },
      {
        "title": "Special Populations & Operations",
        "description": "Pediatrics, obstetrics, environmental emergencies, lifting, ambulance operations, triage, and documentation."
      }
    ],
    "requirementNote": "EMT certification/licensure and required practical training vary by jurisdiction. GAHN can support classroom study and scenarios but cannot replace approved hands-on EMS training."
  },
  "Mental Health Counselor": {
    "whatYouLearn": [
      "Learn major counseling theories, lifespan development, psychopathology, assessment concepts, treatment planning, and helping skills.",
      "Practice active listening, interviewing, therapeutic communication, goal setting, documentation, and professional boundaries.",
      "Study ethics, confidentiality, multicultural counseling, trauma-informed concepts, group counseling, career counseling, and crisis response.",
      "Learn research/evidence evaluation and understand supervised training, credentialing, and scope-of-practice requirements."
    ],
    "skills": [
      "Counseling Theories",
      "Active Listening",
      "Assessment Concepts",
      "Treatment Planning",
      "Ethics",
      "Multicultural Counseling",
      "Group Counseling",
      "Crisis Response",
      "Documentation",
      "Research Literacy"
    ],
    "tools": [
      "Case Conceptualization",
      "Screening-Tool Concepts",
      "Treatment-Plan Templates",
      "Documentation Practice",
      "Evidence Resources"
    ],
    "modules": [
      {
        "title": "Counseling Foundations",
        "description": "Helping relationship, ethics, boundaries, professional identity, and counseling process."
      },
      {
        "title": "Theories & Human Development",
        "description": "Major counseling theories, lifespan development, personality, and behavior."
      },
      {
        "title": "Assessment & Psychopathology",
        "description": "Symptoms, diagnostic-system concepts, screening, risk assessment concepts, and case formulation."
      },
      {
        "title": "Counseling Skills",
        "description": "Listening, questions, reflection, goals, motivational techniques, and therapeutic communication."
      },
      {
        "title": "Multicultural, Group & Career Counseling",
        "description": "Culture, identity, group processes, career development, and contextual factors."
      },
      {
        "title": "Crisis, Trauma, Ethics & Documentation",
        "description": "Crisis-response concepts, trauma-informed care, confidentiality, records, referrals, and supervision."
      }
    ],
    "requirementNote": "Professional counseling licensure generally requires graduate education, supervised clinical experience, examinations, and jurisdiction-specific requirements. GAHN cannot replace clinical supervision or licensure."
  },
  "Healthcare Administrator": {
    "whatYouLearn": [
      "Understand healthcare delivery systems, hospitals/clinics, insurance, reimbursement, revenue cycle, and health policy.",
      "Learn healthcare finance, budgeting, operations, staffing, scheduling, quality improvement, patient safety, and project management.",
      "Use data, dashboards, EHR/informatics concepts, compliance, privacy, and performance metrics.",
      "Study leadership, organizational behavior, HR, supply chain, strategy, accreditation, and change management."
    ],
    "skills": [
      "Healthcare Operations",
      "Finance",
      "Revenue Cycle",
      "Quality Improvement",
      "Healthcare Data",
      "Compliance",
      "Health Policy",
      "Human Resources",
      "Project Management",
      "Leadership"
    ],
    "tools": [
      "Excel",
      "BI Dashboards",
      "EHR/Health-Information Concepts",
      "Project Management Tools",
      "Budget Models",
      "Quality Metrics"
    ],
    "modules": [
      {
        "title": "Healthcare Systems & Policy",
        "description": "Providers, payers, care settings, regulation, public/private systems, and health policy."
      },
      {
        "title": "Finance & Reimbursement",
        "description": "Budgets, costs, reimbursement, revenue cycle, financial statements, and capital decisions."
      },
      {
        "title": "Operations & Patient Flow",
        "description": "Capacity, scheduling, staffing, supply chain, throughput, process improvement, and service quality."
      },
      {
        "title": "Quality, Safety & Compliance",
        "description": "Quality measures, patient safety, privacy, accreditation concepts, compliance, and risk."
      },
      {
        "title": "Healthcare Data & Informatics",
        "description": "EHR concepts, reporting, dashboards, analytics, data governance, and decision support."
      },
      {
        "title": "Leadership & Strategy",
        "description": "Teams, HR, communication, change management, strategy, projects, and organizational performance."
      }
    ]
  },
  "Medical Assistant": {
    "whatYouLearn": [
      "Learn medical terminology, anatomy/physiology, infection control, patient communication, and clinical-office workflow.",
      "Understand vital-sign measurement concepts, room preparation, specimen-handling concepts, phlebotomy concepts, medication documentation, and basic assisting responsibilities.",
      "Learn scheduling, EHR documentation, billing/coding basics, insurance workflows, privacy, and records management.",
      "Practice professional communication, safety, escalation, and coordination between front-office and clinical tasks."
    ],
    "skills": [
      "Medical Terminology",
      "Anatomy & Physiology",
      "Vital Signs",
      "Infection Control",
      "EHR Documentation",
      "Scheduling",
      "Billing/Coding Basics",
      "Patient Communication",
      "Clinical Workflow",
      "Safety"
    ],
    "tools": [
      "EHR Concepts",
      "Scheduling Systems",
      "Clinical Documentation",
      "Billing/Coding References",
      "Office Software"
    ],
    "modules": [
      {
        "title": "Medical Foundations",
        "description": "Terminology, anatomy/physiology, common conditions, privacy, professionalism, and healthcare roles."
      },
      {
        "title": "Clinical Support",
        "description": "Vital-sign concepts, exam-room workflow, infection control, specimen/phlebotomy concepts, and patient preparation."
      },
      {
        "title": "Administrative Workflow",
        "description": "Scheduling, phone communication, referrals, records, forms, and office organization."
      },
      {
        "title": "EHR, Billing & Coding Basics",
        "description": "Documentation, electronic records, insurance concepts, claims workflow, coding awareness, and accuracy."
      },
      {
        "title": "Safety & Patient Communication",
        "description": "Identification, escalation, communication, cultural awareness, boundaries, and safe workflow."
      },
      {
        "title": "Integrated Practice Scenarios",
        "description": "Move through realistic front-office and clinical-support scenarios while choosing appropriate next steps."
      }
    ],
    "requirementNote": "Employer, certification, and state requirements differ. GAHN can teach academic and workflow concepts but cannot replace required supervised hands-on training."
  }
};

type SectionBlueprint = {
  commonSkills: string[];
  tools: string[];
  roleTopics: Record<string, string[]>;
};

const sectionBlueprints: Record<string, SectionBlueprint> = {
  "engineering-architecture": {
    "commonSkills": [
      "Calculus",
      "Physics",
      "Engineering Analysis",
      "Technical Drawing",
      "Data Analysis",
      "Safety & Standards",
      "Design Verification"
    ],
    "tools": [
      "CAD Software",
      "Spreadsheets",
      "Technical Standards",
      "MATLAB or Python Concepts",
      "Simulation/Analysis Tools"
    ],
    "roleTopics": {
      "Mechanical Engineer": [
        "Statics & Dynamics",
        "Thermodynamics",
        "Fluid Mechanics",
        "Heat Transfer",
        "Materials",
        "Machine Design",
        "Manufacturing",
        "CAD/FEA"
      ],
      "Civil Engineer": [
        "Statics",
        "Structural Analysis",
        "Geotechnical Engineering",
        "Hydraulics",
        "Transportation",
        "Construction Materials",
        "Surveying",
        "Codes"
      ],
      "Electrical Engineer": [
        "Circuit Analysis",
        "Electronics",
        "Signals & Systems",
        "Digital Logic",
        "Electromagnetics",
        "Power Systems",
        "Control Systems",
        "Embedded Systems"
      ],
      "Aerospace Engineer": [
        "Aerodynamics",
        "Flight Mechanics",
        "Propulsion",
        "Structures",
        "Orbital Mechanics",
        "Controls",
        "Aircraft/Spacecraft Design",
        "Systems Engineering"
      ],
      "Chemical Engineer": [
        "Material & Energy Balances",
        "Thermodynamics",
        "Transport Phenomena",
        "Reaction Engineering",
        "Process Control",
        "Separations",
        "Process Safety",
        "Plant Design"
      ],
      "Biomedical Engineer": [
        "Biology & Physiology",
        "Biomechanics",
        "Biomaterials",
        "Medical Devices",
        "Signals",
        "Imaging Concepts",
        "Regulatory Design",
        "Human Factors"
      ],
      "Industrial Engineer": [
        "Operations Research",
        "Statistics",
        "Quality Engineering",
        "Process Improvement",
        "Supply Chain",
        "Ergonomics",
        "Simulation",
        "Optimization"
      ],
      "Environmental Engineer": [
        "Water Chemistry",
        "Hydrology",
        "Water/Wastewater Treatment",
        "Air Pollution",
        "Waste Management",
        "Environmental Regulation",
        "Risk Assessment",
        "Remediation"
      ],
      "Architect": [
        "Architectural Design",
        "Building Systems",
        "Structures",
        "Materials",
        "Codes",
        "Sustainability",
        "Construction Documents",
        "BIM"
      ],
      "Urban Planner": [
        "Land Use",
        "Transportation Planning",
        "GIS",
        "Zoning",
        "Housing",
        "Environmental Planning",
        "Community Engagement",
        "Planning Law"
      ],
      "CAD Designer": [
        "Technical Drawing",
        "2D Drafting",
        "3D Modeling",
        "GD&T Basics",
        "Assemblies",
        "Drawing Standards",
        "Revision Control",
        "Manufacturing Drawings"
      ],
      "Construction Engineer": [
        "Construction Methods",
        "Scheduling",
        "Estimating",
        "Contracts",
        "Safety",
        "Quality",
        "Site Logistics",
        "Project Controls"
      ]
    }
  },
  "finance-accounting-economics": {
    "commonSkills": [
      "Excel",
      "Financial Statements",
      "Quantitative Analysis",
      "Business Communication",
      "Ethics & Regulation"
    ],
    "tools": [
      "Excel/Spreadsheets",
      "Financial Calculator",
      "SQL/BI Concepts",
      "Financial Data Sources",
      "Presentation Tools"
    ],
    "roleTopics": {
      "Accountant": [
        "Financial Accounting",
        "Managerial Accounting",
        "Bookkeeping",
        "GAAP Concepts",
        "Internal Controls",
        "Tax Basics",
        "Audit Basics",
        "Closing & Reporting"
      ],
      "Financial Analyst": [
        "Financial Statements",
        "Forecasting",
        "Budgeting",
        "Financial Modeling",
        "Ratio Analysis",
        "Valuation Basics",
        "Scenario Analysis",
        "Presentation"
      ],
      "Investment Analyst": [
        "Accounting",
        "Corporate Finance",
        "Valuation",
        "Equity Research",
        "Fixed Income",
        "Portfolio Theory",
        "Risk",
        "Industry Analysis"
      ],
      "Investment Banker": [
        "Accounting",
        "DCF Valuation",
        "Comparable Companies",
        "M&A",
        "Capital Markets",
        "Financial Modeling",
        "Pitchbooks",
        "Deal Process"
      ],
      "Financial Planner": [
        "Cash Flow",
        "Retirement",
        "Investments",
        "Insurance",
        "Taxes",
        "Estate Planning Concepts",
        "Risk Tolerance",
        "Client Planning"
      ],
      "Economist": [
        "Microeconomics",
        "Macroeconomics",
        "Econometrics",
        "Statistics",
        "Game Theory",
        "Policy Analysis",
        "Data Analysis",
        "Research Methods"
      ],
      "Actuary": [
        "Probability",
        "Statistics",
        "Financial Mathematics",
        "Risk Models",
        "Insurance Mathematics",
        "Survival Models",
        "Predictive Modeling",
        "Regulation"
      ],
      "Commercial Banker": [
        "Credit Analysis",
        "Financial Statements",
        "Loan Structuring",
        "Collateral",
        "Cash Flow",
        "Risk Rating",
        "Bank Products",
        "Client Management"
      ],
      "Auditor": [
        "Audit Planning",
        "Internal Controls",
        "Evidence",
        "Sampling",
        "Financial Reporting",
        "Risk Assessment",
        "Compliance",
        "Audit Documentation"
      ],
      "Tax Specialist": [
        "Tax Law Concepts",
        "Individual Tax",
        "Business Tax",
        "Deductions/Credits",
        "Tax Research",
        "Compliance",
        "Tax Planning",
        "Documentation"
      ],
      "Risk Analyst": [
        "Market Risk",
        "Credit Risk",
        "Operational Risk",
        "Statistics",
        "Scenario Analysis",
        "Stress Testing",
        "Controls",
        "Risk Reporting"
      ],
      "Treasury Analyst": [
        "Cash Management",
        "Liquidity",
        "Banking",
        "Forecasting",
        "Debt",
        "Foreign Exchange",
        "Working Capital",
        "Treasury Controls"
      ]
    }
  },
  "business-entrepreneurship": {
    "commonSkills": [
      "Business Models",
      "Finance",
      "Operations",
      "Customer Understanding",
      "Communication",
      "Decision Making"
    ],
    "tools": [
      "Spreadsheets",
      "Presentation Tools",
      "Project Management Tools",
      "Analytics Dashboards",
      "CRM Concepts"
    ],
    "roleTopics": {
      "Startup Founder": [
        "Customer Discovery",
        "Problem Validation",
        "MVP Design",
        "Business Model",
        "Pricing",
        "Go-to-Market",
        "Fundraising",
        "Hiring",
        "Metrics",
        "Cash Runway"
      ],
      "Small Business Owner": [
        "Business Setup",
        "Pricing",
        "Sales",
        "Bookkeeping",
        "Cash Flow",
        "Operations",
        "Hiring",
        "Customer Service",
        "Taxes/Compliance Basics"
      ],
      "Product Manager": [
        "User Research",
        "Product Strategy",
        "Requirements",
        "Roadmaps",
        "Prioritization",
        "Analytics",
        "Experiments",
        "Cross-Functional Leadership"
      ],
      "Operations Manager": [
        "Process Design",
        "Capacity",
        "Staffing",
        "Quality",
        "Inventory",
        "KPIs",
        "Continuous Improvement",
        "Cost Control"
      ],
      "Project Manager": [
        "Scope",
        "Schedules",
        "Budgets",
        "Risk",
        "Stakeholders",
        "Agile/Waterfall",
        "Status Reporting",
        "Change Control"
      ],
      "Management Consultant": [
        "Problem Structuring",
        "Research",
        "Data Analysis",
        "Financial Analysis",
        "Market Analysis",
        "Slide Writing",
        "Interviews",
        "Recommendations"
      ],
      "Human Resources Manager": [
        "Recruiting",
        "Compensation",
        "Performance",
        "Employee Relations",
        "Labor/Employment Law Concepts",
        "Training",
        "HR Analytics",
        "Culture"
      ],
      "Supply Chain Manager": [
        "Demand Planning",
        "Sourcing",
        "Inventory",
        "Logistics",
        "Supplier Management",
        "S&OP",
        "Risk",
        "Procurement"
      ],
      "Business Analyst": [
        "Requirements",
        "Process Mapping",
        "Data Analysis",
        "Stakeholder Interviews",
        "User Stories",
        "SQL Basics",
        "Testing/UAT",
        "Documentation"
      ],
      "Chief Executive Officer": [
        "Strategy",
        "Finance",
        "Capital Allocation",
        "Leadership",
        "Hiring Executives",
        "Governance",
        "Risk",
        "Market Positioning",
        "Operating Metrics"
      ]
    }
  },
  "law-government-public-safety": {
    "commonSkills": [
      "Research",
      "Writing",
      "Evidence",
      "Ethics",
      "Communication",
      "Procedure",
      "Documentation"
    ],
    "tools": [
      "Legal/Policy Research Databases",
      "Case Management Concepts",
      "Records Systems",
      "Document Tools",
      "GIS/Incident Systems Where Relevant"
    ],
    "roleTopics": {
      "Lawyer / Attorney": [
        "Legal Research",
        "Civil Procedure",
        "Contracts",
        "Torts",
        "Criminal Law",
        "Constitutional Law",
        "Evidence",
        "Legal Writing",
        "Advocacy",
        "Professional Responsibility"
      ],
      "Paralegal": [
        "Legal Research",
        "Case Files",
        "Discovery",
        "Citations",
        "Drafting",
        "Court Filings",
        "Client Intake",
        "Calendaring"
      ],
      "Police Officer": [
        "Criminal Law Basics",
        "Constitutional Policing",
        "De-escalation",
        "Report Writing",
        "Evidence",
        "Traffic Law",
        "Emergency Response",
        "Community Policing"
      ],
      "Firefighter": [
        "Fire Behavior",
        "Building Construction",
        "PPE/SCBA Concepts",
        "Hose/Water Supply Concepts",
        "Rescue",
        "Hazardous Materials Awareness",
        "EMS Basics",
        "Incident Command"
      ],
      "Emergency Manager": [
        "Hazard Analysis",
        "Preparedness",
        "Incident Command",
        "Emergency Operations Plans",
        "Public Warning",
        "Logistics",
        "Recovery",
        "Continuity"
      ],
      "Policy Analyst": [
        "Policy Research",
        "Economics",
        "Statistics",
        "Program Evaluation",
        "Stakeholder Analysis",
        "Cost-Benefit",
        "Writing",
        "Implementation"
      ],
      "City / Public Administrator": [
        "Public Budgeting",
        "Procurement",
        "Policy",
        "HR",
        "Public Meetings",
        "Service Delivery",
        "Ethics",
        "Performance Management"
      ],
      "Probation Officer": [
        "Case Management",
        "Risk Assessment Concepts",
        "Court Orders",
        "Documentation",
        "Rehabilitation Resources",
        "Interviewing",
        "Safety",
        "Ethics"
      ],
      "Court Reporter": [
        "Stenography Theory",
        "Legal Terminology",
        "Transcript Production",
        "Accuracy",
        "Court Procedure",
        "Realtime Reporting",
        "Editing",
        "Ethics"
      ],
      "Criminal Investigator": [
        "Interviewing",
        "Evidence",
        "Case Theory",
        "Report Writing",
        "Search/Seizure Concepts",
        "Digital Evidence Basics",
        "Surveillance Law Concepts",
        "Court Testimony"
      ]
    }
  },
  "education-human-services": {
    "commonSkills": [
      "Communication",
      "Ethics",
      "Assessment",
      "Documentation",
      "Human Development",
      "Inclusive Practice"
    ],
    "tools": [
      "Learning/Case Management Systems",
      "Office Tools",
      "Assessment Tools",
      "Documentation Systems",
      "Presentation Tools"
    ],
    "roleTopics": {
      "Teacher": [
        "Learning Science",
        "Lesson Planning",
        "Curriculum",
        "Classroom Management",
        "Assessment",
        "Differentiation",
        "Special Education Basics",
        "Family Communication"
      ],
      "Professor": [
        "Subject Expertise",
        "Course Design",
        "Lecturing/Facilitation",
        "Assessment",
        "Research",
        "Academic Writing",
        "Mentoring",
        "Academic Integrity"
      ],
      "School Counselor": [
        "Student Development",
        "Academic Planning",
        "Counseling Skills",
        "Career Guidance",
        "Crisis Response Concepts",
        "Ethics",
        "Family/School Collaboration",
        "Documentation"
      ],
      "Social Worker": [
        "Human Behavior",
        "Case Management",
        "Assessment",
        "Community Resources",
        "Advocacy",
        "Policy",
        "Ethics",
        "Documentation"
      ],
      "Psychologist": [
        "Research Methods",
        "Statistics",
        "Cognition",
        "Behavior",
        "Development",
        "Assessment Concepts",
        "Ethics",
        "Specialty Pathways"
      ],
      "Childcare / Early Childhood Educator": [
        "Child Development",
        "Play-Based Learning",
        "Early Literacy/Numeracy",
        "Safety",
        "Observation",
        "Behavior Guidance",
        "Family Communication",
        "Inclusive Practice"
      ],
      "Corporate Trainer": [
        "Adult Learning",
        "Needs Analysis",
        "Facilitation",
        "Training Design",
        "Assessment",
        "Presentation",
        "Learning Technology",
        "Evaluation"
      ],
      "Instructional Designer": [
        "Learning Objectives",
        "Learning Science",
        "Storyboarding",
        "Assessment Design",
        "eLearning",
        "Accessibility",
        "LMS",
        "Evaluation Models"
      ],
      "Academic Advisor": [
        "Degree Planning",
        "Policies",
        "Student Development",
        "Goal Setting",
        "Case Notes",
        "Referral Resources",
        "Communication",
        "Retention"
      ],
      "Community Services Manager": [
        "Program Design",
        "Needs Assessment",
        "Budgeting",
        "Grant Concepts",
        "Staffing",
        "Outreach",
        "Program Evaluation",
        "Partnerships"
      ]
    }
  },
  "science-research": {
    "commonSkills": [
      "Scientific Method",
      "Statistics",
      "Data Analysis",
      "Experimental Design",
      "Research Ethics",
      "Scientific Writing"
    ],
    "tools": [
      "Lab/Field Instruments",
      "Spreadsheets",
      "Python/R Concepts",
      "Reference Databases",
      "Visualization Tools"
    ],
    "roleTopics": {
      "Biologist": [
        "Cell Biology",
        "Genetics",
        "Evolution",
        "Ecology",
        "Molecular Biology",
        "Lab/Field Methods",
        "Statistics",
        "Scientific Writing"
      ],
      "Chemist": [
        "General Chemistry",
        "Organic Chemistry",
        "Analytical Chemistry",
        "Physical Chemistry",
        "Instrumentation",
        "Lab Safety",
        "Spectroscopy Concepts",
        "Data Analysis"
      ],
      "Physicist": [
        "Classical Mechanics",
        "Electromagnetism",
        "Thermodynamics",
        "Quantum Mechanics",
        "Relativity Basics",
        "Mathematical Methods",
        "Computation",
        "Experiments"
      ],
      "Astronomer": [
        "Classical Physics",
        "Electromagnetism",
        "Astrophysics",
        "Stellar/Planetary Science",
        "Cosmology",
        "Observation",
        "Data Analysis",
        "Scientific Computing"
      ],
      "Environmental Scientist": [
        "Ecology",
        "Chemistry",
        "Hydrology",
        "Sampling",
        "GIS",
        "Environmental Regulation",
        "Risk Assessment",
        "Data Analysis"
      ],
      "Geologist": [
        "Mineralogy",
        "Petrology",
        "Sedimentology",
        "Structural Geology",
        "Geomorphology",
        "Field Mapping",
        "Geophysics Basics",
        "GIS"
      ],
      "Microbiologist": [
        "Microbial Physiology",
        "Genetics",
        "Immunology",
        "Culture Methods",
        "Molecular Biology",
        "Microscopy",
        "Biosafety",
        "Data Analysis"
      ],
      "Forensic Scientist": [
        "Evidence Handling",
        "Analytical Chemistry",
        "Biology/DNA Concepts",
        "Toxicology Concepts",
        "Microscopy",
        "Quality Assurance",
        "Documentation",
        "Court Testimony"
      ],
      "Research Scientist": [
        "Literature Review",
        "Hypothesis Design",
        "Experimental Design",
        "Statistics",
        "Data Management",
        "Reproducibility",
        "Scientific Writing",
        "Peer Review"
      ],
      "Laboratory Technician": [
        "Lab Safety",
        "Sample Preparation",
        "Pipetting/Measurement Concepts",
        "Instrumentation",
        "Quality Control",
        "Documentation",
        "Inventory",
        "Troubleshooting"
      ]
    }
  },
  "creative-media-design": {
    "commonSkills": [
      "Visual Communication",
      "Creative Development",
      "Production Workflow",
      "Portfolio Building",
      "Client/Team Communication"
    ],
    "tools": [
      "Creative Software",
      "Asset Management",
      "Collaboration Tools",
      "Portfolio Platform"
    ],
    "roleTopics": {
      "Graphic Designer": [
        "Typography",
        "Color",
        "Layout",
        "Branding",
        "Illustration Basics",
        "Adobe/Figma Tools",
        "Print/Digital Production",
        "Portfolio"
      ],
      "Animator": [
        "Drawing/Design Basics",
        "Timing",
        "Motion Principles",
        "Storyboarding",
        "2D/3D Animation",
        "Rigging Concepts",
        "Compositing",
        "Demo Reel"
      ],
      "Video Editor": [
        "Editing Theory",
        "Story/Pacing",
        "Audio",
        "Color",
        "Motion Graphics",
        "Media Management",
        "Delivery Formats",
        "Editing Software"
      ],
      "Filmmaker / Director": [
        "Story Development",
        "Screen Language",
        "Directing Actors",
        "Cinematography",
        "Production Planning",
        "Sound",
        "Editing",
        "Crew Leadership"
      ],
      "Photographer": [
        "Exposure",
        "Composition",
        "Lighting",
        "Lenses",
        "Color",
        "Editing",
        "Workflow",
        "Client/Portfolio"
      ],
      "Content Creator": [
        "Audience Strategy",
        "Writing",
        "Video",
        "Editing",
        "Platforms",
        "Analytics",
        "Brand/Monetization",
        "Publishing Workflow"
      ],
      "Copywriter": [
        "Audience Research",
        "Headlines",
        "Offers",
        "Brand Voice",
        "Web Copy",
        "Email",
        "Ads",
        "Editing"
      ],
      "Journalist": [
        "Reporting",
        "Interviewing",
        "Verification",
        "News Writing",
        "Source Ethics",
        "Data/Records",
        "Editing",
        "Media Law Concepts"
      ],
      "Fashion Designer": [
        "Drawing",
        "Textiles",
        "Garment Construction",
        "Pattern Concepts",
        "Collection Development",
        "CAD",
        "Trend Research",
        "Production"
      ],
      "Music Producer": [
        "Music Theory Basics",
        "DAW",
        "Recording",
        "MIDI",
        "Arrangement",
        "Sound Design",
        "Mixing",
        "Mastering Concepts"
      ],
      "Interior Designer": [
        "Space Planning",
        "Color/Materials",
        "Lighting",
        "Furniture",
        "Codes/Accessibility Concepts",
        "CAD/3D",
        "Client Presentation",
        "Specifications"
      ],
      "Game Designer": [
        "Game Mechanics",
        "Systems Design",
        "Level Design",
        "Narrative",
        "Prototyping",
        "Balancing",
        "Player Psychology",
        "Engine Concepts"
      ]
    }
  },
  "skilled-trades-construction": {
    "commonSkills": [
      "Safety",
      "Measurement",
      "Blueprint/Diagram Reading",
      "Tools & Equipment",
      "Codes/Standards",
      "Troubleshooting"
    ],
    "tools": [
      "Trade-Specific Hand/Power Tools",
      "Measurement Tools",
      "Safety Equipment",
      "Blueprints/Diagrams",
      "Code References"
    ],
    "roleTopics": {
      "Electrician": [
        "Electrical Theory",
        "AC/DC",
        "Wiring",
        "Panels",
        "Motors Basics",
        "Blueprints",
        "NEC Concepts",
        "Testing",
        "Troubleshooting"
      ],
      "Plumber": [
        "Water Supply",
        "Drain/Waste/Vent",
        "Piping Materials",
        "Fixtures",
        "Blueprints",
        "Codes",
        "Testing",
        "Troubleshooting"
      ],
      "HVAC Technician": [
        "Refrigeration Cycle",
        "Electrical Controls",
        "Airflow",
        "Heating",
        "Cooling",
        "Refrigerants",
        "Diagnostics",
        "Codes/Safety"
      ],
      "Carpenter": [
        "Measurement/Layout",
        "Framing",
        "Joinery",
        "Finish Carpentry",
        "Materials",
        "Blueprints",
        "Tools",
        "Building Codes"
      ],
      "Welder": [
        "Welding Processes",
        "Metallurgy Basics",
        "Joint Design",
        "Blueprints/Symbols",
        "Cutting",
        "Inspection",
        "Safety",
        "Fabrication"
      ],
      "Construction Manager": [
        "Estimating",
        "Scheduling",
        "Contracts",
        "Safety",
        "Quality",
        "Procurement",
        "Subcontractors",
        "Project Controls"
      ],
      "Heavy Equipment Operator": [
        "Equipment Systems",
        "Pre-Use Inspection",
        "Earthmoving",
        "Grades/Plans",
        "Site Safety",
        "Signals",
        "Maintenance",
        "Productivity"
      ],
      "Automotive Technician": [
        "Engine Systems",
        "Electrical/Electronics",
        "Brakes",
        "Steering/Suspension",
        "HVAC",
        "Diagnostics",
        "Scan Tools",
        "Maintenance"
      ],
      "Diesel Mechanic": [
        "Diesel Engines",
        "Fuel Systems",
        "Electrical",
        "Drivetrain",
        "Brakes",
        "Hydraulics Basics",
        "Diagnostics",
        "Preventive Maintenance"
      ],
      "Solar Installer": [
        "Solar Electricity",
        "PV Components",
        "Roof/Layout",
        "Electrical Basics",
        "Mounting",
        "Inverters",
        "Codes",
        "Safety"
      ],
      "Building Inspector": [
        "Building Codes",
        "Plans",
        "Structural Basics",
        "Electrical/Plumbing/HVAC Awareness",
        "Fire/Life Safety",
        "Accessibility",
        "Inspection",
        "Reports"
      ],
      "Machinist": [
        "Blueprint Reading",
        "Metrology",
        "Machining",
        "Feeds/Speeds",
        "Materials",
        "CNC",
        "G-code Basics",
        "Quality"
      ]
    }
  },
  "hospitality-travel-culinary": {
    "commonSkills": [
      "Customer Service",
      "Safety",
      "Operations",
      "Cost Control",
      "Communication",
      "Scheduling"
    ],
    "tools": [
      "POS/Reservation Systems",
      "Spreadsheets",
      "Scheduling Tools",
      "Industry-Specific Equipment"
    ],
    "roleTopics": {
      "Chef": [
        "Knife Skills",
        "Cooking Methods",
        "Food Safety",
        "Mise en Place",
        "Stocks/Sauces",
        "Menu Development",
        "Costing",
        "Kitchen Leadership"
      ],
      "Baker / Pastry Chef": [
        "Baking Science",
        "Bread",
        "Pastry",
        "Chocolate/Sugar Basics",
        "Decoration",
        "Food Safety",
        "Production Planning",
        "Costing"
      ],
      "Restaurant Manager": [
        "Service Operations",
        "Staffing",
        "Food Safety",
        "Inventory",
        "Cost Control",
        "Scheduling",
        "Guest Recovery",
        "P&L Basics"
      ],
      "Hotel Manager": [
        "Front Office",
        "Housekeeping",
        "Revenue Management Basics",
        "Guest Service",
        "Staffing",
        "Facilities",
        "Sales",
        "Hotel Finance"
      ],
      "Event Planner": [
        "Event Design",
        "Budgets",
        "Venues",
        "Vendors",
        "Timelines",
        "Contracts",
        "Risk/Safety",
        "Guest Experience"
      ],
      "Travel Advisor": [
        "Destination Research",
        "Itinerary Design",
        "Booking Systems",
        "Fares/Rules Concepts",
        "Travel Documentation",
        "Client Discovery",
        "Insurance Concepts",
        "Service Recovery"
      ],
      "Tourism Manager": [
        "Destination Management",
        "Visitor Experience",
        "Marketing",
        "Events",
        "Sustainability",
        "Partnerships",
        "Research",
        "Operations"
      ],
      "Flight Attendant": [
        "Cabin Safety",
        "Emergency Procedures",
        "Service",
        "Security",
        "Crew Resource Management",
        "Passenger Communication",
        "Aircraft Familiarization",
        "Regulation Concepts"
      ],
      "Catering Manager": [
        "Menu Planning",
        "Food Safety",
        "Staffing",
        "Logistics",
        "Costing",
        "Service",
        "Events",
        "Inventory"
      ],
      "Guest Experience Specialist": [
        "Service Standards",
        "Communication",
        "Complaint Resolution",
        "CRM Concepts",
        "Hospitality Operations",
        "Accessibility",
        "Upselling Ethics",
        "Feedback"
      ]
    }
  },
  "transportation-aviation-logistics": {
    "commonSkills": [
      "Safety",
      "Regulation Awareness",
      "Operations",
      "Scheduling",
      "Documentation",
      "Communication"
    ],
    "tools": [
      "Operations Software",
      "Tracking/Dispatch Systems",
      "Spreadsheets",
      "Navigation/Planning Tools"
    ],
    "roleTopics": {
      "Airline Pilot": [
        "Aerodynamics",
        "Aircraft Systems",
        "Weather",
        "Navigation",
        "Regulations",
        "Flight Planning",
        "Crew Resource Management",
        "Emergency Procedures"
      ],
      "Aircraft Mechanic": [
        "Airframe",
        "Powerplant",
        "Electrical",
        "Hydraulics",
        "Avionics Basics",
        "Inspection",
        "Maintenance Records",
        "FAA Regulation Concepts"
      ],
      "Air Traffic Controller": [
        "Airspace",
        "Separation",
        "Phraseology",
        "Radar Concepts",
        "Weather",
        "Traffic Sequencing",
        "Emergency Procedures",
        "Human Factors"
      ],
      "Logistics Coordinator": [
        "Freight Modes",
        "Routing",
        "Carriers",
        "Documentation",
        "Tracking",
        "Incoterms Concepts",
        "Inventory",
        "Exception Management"
      ],
      "Supply Chain Analyst": [
        "Forecasting",
        "Inventory",
        "Procurement Data",
        "Logistics",
        "Excel/SQL",
        "KPIs",
        "Optimization",
        "Risk"
      ],
      "Truck Driver": [
        "Vehicle Inspection",
        "Hours/Regulation Concepts",
        "Route Planning",
        "Cargo Securement",
        "Defensive Driving",
        "Logbooks",
        "Safety",
        "Basic Maintenance"
      ],
      "Marine / Ship Officer": [
        "Navigation",
        "COLREGs Concepts",
        "Cargo",
        "Stability",
        "Weather",
        "Safety",
        "Bridge Resource Management",
        "Maritime Regulation"
      ],
      "Railroad Operations": [
        "Rail Safety",
        "Signals",
        "Dispatch",
        "Train Handling Concepts",
        "Yard Operations",
        "Rules",
        "Maintenance Awareness",
        "Emergency Response"
      ],
      "Warehouse Manager": [
        "Inventory",
        "Receiving/Shipping",
        "Layout",
        "Labor",
        "WMS",
        "Safety",
        "KPIs",
        "Continuous Improvement"
      ],
      "Fleet Manager": [
        "Vehicle Lifecycle",
        "Maintenance",
        "Fuel",
        "Routing",
        "Drivers",
        "Telematics",
        "Compliance",
        "Cost Analysis"
      ]
    }
  },
  "sales-marketing-customer-experience": {
    "commonSkills": [
      "Customer Research",
      "Communication",
      "Analytics",
      "CRM",
      "Measurement",
      "Ethics"
    ],
    "tools": [
      "CRM Platform",
      "Analytics Tools",
      "Spreadsheets",
      "Presentation Tools",
      "Marketing/Sales Platforms"
    ],
    "roleTopics": {
      "Sales Representative": [
        "Prospecting",
        "Discovery",
        "Qualification",
        "Value Proposition",
        "Objections",
        "Demos",
        "Closing",
        "CRM"
      ],
      "Account Executive": [
        "Pipeline",
        "Discovery",
        "Demos",
        "Business Cases",
        "Negotiation",
        "Forecasting",
        "Closing",
        "Account Handoff"
      ],
      "Marketing Manager": [
        "Segmentation",
        "Positioning",
        "Campaigns",
        "Channels",
        "Budgeting",
        "Analytics",
        "Research",
        "Brand"
      ],
      "Digital Marketing Specialist": [
        "SEO",
        "Paid Search",
        "Paid Social",
        "Email",
        "Content",
        "Analytics",
        "Conversion",
        "Attribution Basics"
      ],
      "Brand Manager": [
        "Positioning",
        "Audience",
        "Brand Architecture",
        "Creative Strategy",
        "Campaigns",
        "Research",
        "Pricing/Portfolio Concepts",
        "Measurement"
      ],
      "Market Research Analyst": [
        "Research Design",
        "Surveys",
        "Interviews",
        "Statistics",
        "Segmentation",
        "Competitive Research",
        "Data Analysis",
        "Reporting"
      ],
      "Customer Success Manager": [
        "Onboarding",
        "Adoption",
        "Health Scores",
        "Business Reviews",
        "Retention",
        "Expansion",
        "Escalation",
        "CRM"
      ],
      "Public Relations Specialist": [
        "Media Relations",
        "Press Materials",
        "Messaging",
        "Reputation",
        "Crisis Communication",
        "Events",
        "Monitoring",
        "Ethics"
      ],
      "Social Media Manager": [
        "Content Strategy",
        "Platform Mechanics",
        "Community",
        "Creative Production",
        "Scheduling",
        "Analytics",
        "Paid Social Basics",
        "Brand Voice"
      ],
      "E-Commerce Specialist": [
        "Store Operations",
        "Merchandising",
        "Product Pages",
        "Conversion",
        "Email",
        "Paid Media Basics",
        "Analytics",
        "Fulfillment"
      ]
    }
  },
  "environment-agriculture-animal-care": {
    "commonSkills": [
      "Biology/Ecology",
      "Safety",
      "Field Observation",
      "Data Recording",
      "Regulation Awareness",
      "Ethics"
    ],
    "tools": [
      "Field/Lab Tools",
      "GIS/Mapping Concepts",
      "Spreadsheets",
      "Record Systems",
      "Industry-Specific Equipment"
    ],
    "roleTopics": {
      "Veterinarian": [
        "Anatomy/Physiology",
        "Pathology",
        "Pharmacology",
        "Diagnostics",
        "Surgery Concepts",
        "Preventive Medicine",
        "Animal Behavior",
        "Client Communication"
      ],
      "Veterinary Technician": [
        "Animal Nursing",
        "Anatomy",
        "Pharmacology Basics",
        "Laboratory Procedures",
        "Imaging Concepts",
        "Anesthesia Monitoring Concepts",
        "Restraint/Safety",
        "Records"
      ],
      "Agricultural Scientist": [
        "Soil Science",
        "Crop Science",
        "Plant Biology",
        "Genetics",
        "Pest Management",
        "Experimental Design",
        "Data",
        "Sustainable Agriculture"
      ],
      "Farm Manager": [
        "Crop/Livestock Operations",
        "Equipment",
        "Inputs",
        "Labor",
        "Budgeting",
        "Markets",
        "Safety",
        "Regulation"
      ],
      "Conservation Scientist": [
        "Ecology",
        "Land Management",
        "Soils",
        "GIS",
        "Restoration",
        "Policy",
        "Field Sampling",
        "Stakeholder Management"
      ],
      "Wildlife Biologist": [
        "Ecology",
        "Population Biology",
        "Wildlife Management",
        "Field Methods",
        "Statistics",
        "GIS",
        "Conservation",
        "Scientific Writing"
      ],
      "Forester": [
        "Forest Ecology",
        "Silviculture",
        "Mensuration",
        "Fire",
        "Timber",
        "GIS",
        "Conservation",
        "Land Management"
      ],
      "Environmental Technician": [
        "Sampling",
        "Water/Soil/Air Testing Concepts",
        "Field Instruments",
        "QA/QC",
        "Safety",
        "Documentation",
        "Compliance",
        "Data"
      ],
      "Landscape Designer": [
        "Plant Knowledge",
        "Site Analysis",
        "Design",
        "Irrigation Concepts",
        "Materials",
        "CAD",
        "Sustainability",
        "Client Presentation"
      ],
      "Animal Trainer": [
        "Learning Theory",
        "Behavior",
        "Reinforcement",
        "Safety",
        "Observation",
        "Training Plans",
        "Animal Welfare",
        "Client/Handler Communication"
      ]
    }
  },
  "sports-fitness-wellness": {
    "commonSkills": [
      "Anatomy",
      "Safety",
      "Communication",
      "Program Planning",
      "Measurement",
      "Ethics"
    ],
    "tools": [
      "Assessment Tools",
      "Programming Templates",
      "Tracking Software",
      "Video/Analysis Tools Where Relevant"
    ],
    "roleTopics": {
      "Personal Trainer": [
        "Anatomy",
        "Exercise Physiology",
        "Movement",
        "Program Design",
        "Strength",
        "Cardio",
        "Behavior Change",
        "Client Screening"
      ],
      "Strength & Conditioning Coach": [
        "Exercise Physiology",
        "Biomechanics",
        "Strength",
        "Power",
        "Speed",
        "Periodization",
        "Testing",
        "Recovery"
      ],
      "Athletic Trainer": [
        "Anatomy",
        "Injury Prevention",
        "Evaluation Concepts",
        "Emergency Care",
        "Rehabilitation",
        "Therapeutic Modalities Concepts",
        "Documentation",
        "Return-to-Play Concepts"
      ],
      "Sports Coach": [
        "Skill Instruction",
        "Practice Design",
        "Tactics",
        "Communication",
        "Motivation",
        "Athlete Development",
        "Safety",
        "Game Analysis"
      ],
      "Sports Manager": [
        "Sports Business",
        "Operations",
        "Finance",
        "Events",
        "Sponsorship",
        "Marketing",
        "Contracts Concepts",
        "Leadership"
      ],
      "Sports Analyst": [
        "Statistics",
        "Video Analysis",
        "Performance Metrics",
        "Data Cleaning",
        "Visualization",
        "Tactics",
        "Modeling Basics",
        "Communication"
      ],
      "Nutrition Coach": [
        "Nutrition Science Basics",
        "Energy Balance",
        "Macronutrients",
        "Micronutrients",
        "Behavior Change",
        "Meal Planning Concepts",
        "Scope of Practice",
        "Client Communication"
      ],
      "Recreation Director": [
        "Programming",
        "Facilities",
        "Staffing",
        "Budgets",
        "Safety",
        "Community Needs",
        "Events",
        "Evaluation"
      ],
      "Fitness Instructor": [
        "Exercise Technique",
        "Class Design",
        "Cueing",
        "Music/Timing",
        "Modifications",
        "Safety",
        "Motivation",
        "Emergency Readiness"
      ],
      "Sports Marketing Specialist": [
        "Fan Research",
        "Branding",
        "Sponsorship",
        "Digital Campaigns",
        "Events",
        "Partnerships",
        "Analytics",
        "Content"
      ]
    }
  },
  "professional-workplace-skills": {
    "commonSkills": [
      "Practice",
      "Feedback",
      "Communication",
      "Self-Management",
      "Professional Judgment"
    ],
    "tools": [
      "Practice Scenarios",
      "Templates",
      "Checklists",
      "Reflection Tools"
    ],
    "roleTopics": {
      "Communication": [
        "Active Listening",
        "Clarity",
        "Questions",
        "Nonverbal Communication",
        "Difficult Conversations",
        "Written Communication"
      ],
      "Public Speaking": [
        "Audience Analysis",
        "Structure",
        "Storytelling",
        "Delivery",
        "Slides",
        "Q&A",
        "Nerves"
      ],
      "Professional Writing": [
        "Email",
        "Reports",
        "Memos",
        "Proposals",
        "Clarity",
        "Editing",
        "Tone"
      ],
      "Leadership": [
        "Direction",
        "Delegation",
        "Feedback",
        "Coaching",
        "Decision Making",
        "Conflict",
        "Trust"
      ],
      "Negotiation": [
        "Preparation",
        "Interests",
        "BATNA Concepts",
        "Anchoring",
        "Concessions",
        "Communication",
        "Closing"
      ],
      "Project Management": [
        "Scope",
        "Schedule",
        "Risk",
        "Budget",
        "Stakeholders",
        "Agile/Waterfall",
        "Reporting"
      ],
      "Time Management": [
        "Priorities",
        "Planning",
        "Calendar",
        "Focus",
        "Task Systems",
        "Review"
      ],
      "Problem Solving": [
        "Problem Framing",
        "Root Cause",
        "Options",
        "Evidence",
        "Tradeoffs",
        "Implementation"
      ],
      "Job Interviewing": [
        "Research",
        "STAR Stories",
        "Behavioral Questions",
        "Technical/Case Prep",
        "Questions",
        "Follow-Up"
      ],
      "Resume & LinkedIn": [
        "Positioning",
        "Achievements",
        "Keywords",
        "Formatting",
        "Portfolio",
        "Profile Optimization"
      ],
      "Networking": [
        "Introductions",
        "Relationship Building",
        "Outreach",
        "Events",
        "Follow-Up",
        "Giving Value"
      ],
      "Workplace Etiquette": [
        "Reliability",
        "Communication",
        "Meetings",
        "Boundaries",
        "Teamwork",
        "Professionalism"
      ]
    }
  }
};

const roleToolOverrides: Record<string, string[]> = {
  "Mechanical Engineer": [
    "SolidWorks/Creo/Inventor Concepts",
    "CAD",
    "FEA Concepts",
    "MATLAB/Python",
    "Spreadsheets"
  ],
  "Civil Engineer": [
    "AutoCAD/Civil 3D Concepts",
    "Structural Analysis Tools",
    "GIS",
    "Spreadsheets",
    "Codes/Standards"
  ],
  "Electrical Engineer": [
    "Circuit Simulation",
    "MATLAB/Python",
    "Oscilloscope Concepts",
    "PCB CAD Concepts",
    "Embedded Toolchains"
  ],
  "Architect": [
    "Revit/BIM Concepts",
    "AutoCAD",
    "3D Modeling",
    "Rendering Tools",
    "Building Codes"
  ],
  "Accountant": [
    "Excel",
    "Accounting Software",
    "ERP Concepts",
    "Tax/Reporting Software",
    "Document Management"
  ],
  "Financial Analyst": [
    "Excel",
    "PowerPoint",
    "Financial Data Platforms",
    "SQL/BI Concepts",
    "Model Templates"
  ],
  "Investment Banker": [
    "Excel",
    "PowerPoint",
    "Financial Data Platforms",
    "Deal Databases",
    "Virtual Data Room Concepts"
  ],
  "Teacher": [
    "LMS",
    "Presentation Tools",
    "Assessment Platforms",
    "Gradebook",
    "Classroom Collaboration Tools"
  ],
  "Graphic Designer": [
    "Adobe Illustrator",
    "Photoshop",
    "Figma",
    "InDesign",
    "Portfolio Platform"
  ],
  "Video Editor": [
    "Premiere Pro or DaVinci Resolve",
    "After Effects Concepts",
    "Audio Tools",
    "Media Storage",
    "Review Platform"
  ],
  "Electrician": [
    "Multimeter",
    "Voltage Tester",
    "Hand/Power Tools",
    "Electrical Drawings",
    "NEC Reference"
  ],
  "Automotive Technician": [
    "OBD-II Scan Tool",
    "Multimeter",
    "Service Information",
    "Diagnostic Equipment",
    "Hand/Power Tools"
  ],
  "Airline Pilot": [
    "Flight Planning Tools",
    "Charts",
    "Weather Products",
    "Flight Simulator Concepts",
    "Aircraft Manuals"
  ],
  "Supply Chain Analyst": [
    "Excel",
    "SQL",
    "BI Tool",
    "ERP Concepts",
    "Forecasting Models"
  ],
  "Digital Marketing Specialist": [
    "Google Analytics",
    "Search Console",
    "Ad Platforms",
    "Email Platform",
    "SEO Tools"
  ],
  "Veterinarian": [
    "Veterinary EHR/Practice Systems",
    "Diagnostic Imaging Concepts",
    "Lab References",
    "Drug References",
    "Clinical Case Simulations"
  ],
  "Veterinary Technician": [
    "Veterinary EHR",
    "Laboratory Equipment Concepts",
    "Imaging Concepts",
    "Monitoring Equipment Concepts",
    "Clinical Records"
  ],
  "Sports Analyst": [
    "Python/R Concepts",
    "SQL",
    "Spreadsheets",
    "BI/Visualization",
    "Video Analysis Software"
  ]
};

const credentialNotes: Record<string, string> = {
  "Veterinarian": "Veterinary practice requires accredited veterinary education and licensure. GAHN can support academic preparation and simulated cases, not independent animal diagnosis or treatment.",
  "Veterinary Technician": "Credentialing requirements vary by jurisdiction. GAHN can support academic preparation but cannot replace accredited veterinary-technology training or supervised clinical experience.",
  "Psychologist": "Independent clinical psychology practice generally requires advanced graduate education, supervised experience, and licensure. GAHN should distinguish academic psychology from licensed clinical practice.",
  "Teacher": "Teacher certification/licensure requirements vary by jurisdiction and school setting. GAHN can teach pedagogy and subject skills but does not grant credentials.",
  "Lawyer / Attorney": "Legal practice requires jurisdiction-specific education, bar admission, and professional requirements. GAHN can teach legal concepts and reasoning but does not authorize legal practice.",
  "Airline Pilot": "Professional pilot certification requires regulator-approved flight training, logged flight experience, medical qualification, written/practical examinations, and aircraft-specific requirements.",
  "Aircraft Mechanic": "Aircraft maintenance certification and authorization requirements vary by jurisdiction. GAHN can support theory and exam study but not replace approved hands-on maintenance training.",
  "Electrician": "Electrical licensing and apprenticeship requirements vary by jurisdiction. GAHN should teach theory, code concepts, and safe simulated reasoning, not authorize unsupervised electrical work.",
  "Plumber": "Plumbing licensing and apprenticeship requirements vary by jurisdiction. GAHN can teach theory, code concepts, and planning but not replace supervised trade training.",
  "HVAC Technician": "HVAC certification/licensing requirements vary by location and refrigerant work may require specific credentials. GAHN should teach theory and diagnostics without representing learners as licensed technicians."
};

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function buildModules(title: string, topics: string[], tools: string[]): CareerCurriculumModule[] {
  const chunks: string[][] = [];
  const chunkSize = Math.max(2, Math.ceil(topics.length / 4));

  for (let index = 0; index < topics.length; index += chunkSize) {
    chunks.push(topics.slice(index, index + chunkSize));
  }

  const modules = chunks.map((chunk, index) => ({
    title:
      index === 0
        ? "Foundations"
        : index === 1
          ? "Core Professional Knowledge"
          : index === 2
            ? "Applied Skills"
            : "Advanced Practice",
    description: `Learn and practice ${chunk.join(", ")} for real ${title.toLowerCase()} work.`,
  }));

  modules.push({
    title: "Tools, Standards & Workflow",
    description: `Use ${tools.slice(0, 5).join(", ")} while learning documentation, safety, quality, and professional workflow.`,
  });

  modules.push({
    title: "Real-World Project & Mastery",
    description: `Complete realistic ${title.toLowerCase()} scenarios or projects, explain your decisions, correct mistakes, and demonstrate independent understanding.`,
  });

  return modules;
}

export function getCareerCurriculum(sectionSlug: string, title: string): CareerCurriculum {
  const explicit = explicitCareerCurricula[title];
  if (explicit) return explicit;

  const section = sectionBlueprints[sectionSlug];
  const roleTopics = section?.roleTopics?.[title] ?? [];

  const commonSkills = section?.commonSkills ?? [
    "Foundational Knowledge",
    "Communication",
    "Professional Ethics",
    "Applied Practice",
  ];

  const tools = unique([
    ...(roleToolOverrides[title] ?? []),
    ...(section?.tools ?? ["Industry References", "Practice Scenarios", "Documentation Tools"]),
  ]);

  const skills = unique([...roleTopics, ...commonSkills]).slice(0, 18);

  const whatYouLearn = [
    `Build the academic and practical foundation used in ${title} work.`,
    roleTopics.length
      ? `Learn the role-specific subjects: ${roleTopics.slice(0, 6).join(", ")}.`
      : `Learn the core concepts, terminology, and responsibilities associated with ${title}.`,
    `Use the tools, references, standards, and documentation methods common to this career area.`,
    `Practice realistic ${title.toLowerCase()} decisions, tasks, communication, and quality checks instead of only memorizing definitions.`,
    "Learn safety, ethics, legal/regulatory boundaries, and when work must be supervised or performed by a licensed professional.",
    "Finish with projects or scenarios that combine the major skills and reveal remaining gaps before advanced study or formal training.",
  ];

  return {
    whatYouLearn,
    skills,
    tools,
    modules: buildModules(title, roleTopics.length ? roleTopics : commonSkills, tools),
    requirementNote:
      credentialNotes[title] ??
      "This is a core learning map, not a claim that completing GAHN alone qualifies someone for the occupation. Degrees, licenses, certifications, apprenticeships, supervised hours, and employer requirements vary by career and jurisdiction.",
  };
}
