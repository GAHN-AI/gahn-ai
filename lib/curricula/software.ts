import type { CareerCourseDraft } from "./types";

export const softwareCourses: Record<string, CareerCourseDraft> = {
  "software-developer-engineer": {
    entry:
      "A broad technical pathway from first programs to a small, tested web application.",
    requirements: [
      "Start with basic computer and file-management skills; no programming experience is assumed.",
      "Professional roles commonly require a strong portfolio, technical interviews, and sometimes a degree or equivalent experience.",
    ],
    modules: [
      [
        "How software solves a problem",
        [
          "Turn a user request into acceptance criteria",
          "Trace a browser request through a server and database",
          "Separate functional requirements from reliability constraints",
        ],
        "Write a one-page brief for a shared task-list application.",
        "Describe the users, data, constraints, and acceptance criteria for a small application.",
      ],
      [
        "Set up a development workspace",
        [
          "Organize files and use a code editor",
          "Navigate directories and run commands in a terminal",
          "Install a runtime and keep secrets out of version control",
        ],
        "Create a local project with a README and an environment-variable example.",
        "Set up a reproducible project without committing credentials.",
      ],
      [
        "Build accessible web pages",
        [
          "Structure a page with semantic HTML",
          "Use CSS layout, spacing, and responsive breakpoints",
          "Label forms and test keyboard navigation",
        ],
        "Build a responsive task-entry page with useful form labels.",
        "Create a responsive page that works with a keyboard and readable form errors.",
      ],
      [
        "Write JavaScript programs",
        [
          "Choose variables, types, and conditional branches",
          "Transform arrays and objects with functions",
          "Handle invalid input and debug a failing function",
        ],
        "Write and test functions that validate, filter, and sort tasks.",
        "Write JavaScript functions that validate inputs and handle edge cases.",
      ],
      [
        "Use Git with a team",
        [
          "Create focused commits and inspect a diff",
          "Work on a branch and resolve a merge conflict",
          "Write a pull-request description and review a change",
        ],
        "Review a deliberately faulty change and propose a focused correction.",
        "Explain a code change clearly and resolve a small version-control conflict.",
      ],
      [
        "Build a React interface",
        [
          "Break a screen into reusable components",
          "Manage form state and render list updates",
          "Load remote data with loading, empty, and error states",
        ],
        "Connect the task interface to a sample API and handle a failed request.",
        "Build an interactive interface that handles successful and failed data requests.",
      ],
      [
        "Design an API",
        [
          "Choose HTTP methods and response status codes",
          "Validate request bodies on the server",
          "Separate route handlers from business rules",
        ],
        "Specify and implement create, read, update, and delete task endpoints.",
        "Design and validate an API with predictable responses and useful errors.",
      ],
      [
        "Store application data",
        [
          "Model users, tasks, and relationships",
          "Write parameterized SQL queries",
          "Apply a schema change and test constraints",
        ],
        "Create a relational task schema and queries for overdue work.",
        "Model relational data and query it without unsafe string interpolation.",
      ],
      [
        "Protect accounts and records",
        [
          "Distinguish authentication from authorization",
          "Enforce record ownership on the server",
          "Handle sessions, secrets, and common web threats",
        ],
        "Test whether one sample user can read or modify another user's task.",
        "Apply ownership checks and explain why a hidden button is not access control.",
      ],
      [
        "Test and deploy",
        [
          "Choose unit, integration, and browser checks",
          "Test invalid inputs and unavailable dependencies",
          "Deploy a preview and inspect logs before release",
        ],
        "Run a release checklist against a staging copy with seeded test records.",
        "Test important user flows and diagnose a failed deployment using evidence.",
      ],
      [
        "Maintain software professionally",
        [
          "Reproduce a bug from a support report",
          "Review accessibility and performance regressions",
          "Write a technical handoff and rollback plan",
        ],
        "Triage three bug reports and explain the order in which you would fix them.",
        "Prioritize a reproducible defect and document a safe fix for a teammate.",
      ],
      [
        "Capstone: a shared task application",
        [
          "Build the application against the original brief",
          "Demonstrate account isolation and error recovery",
          "Present the code, tests, and remaining limitations",
        ],
        "Deliver a working local or staging task app, setup instructions, test evidence, and a recorded or written walkthrough.",
        "Present a small full-stack application with tested behavior and an honest account of its limitations.",
      ],
    ],
  },
  "front-end-developer": {
    entry:
      "Build browser interfaces, from semantic HTML to a tested React application.",
    requirements: [
      "Basic computer skills and access to a browser and code editor.",
      "Expect portfolio reviews and technical assessments; job requirements vary by employer.",
    ],
    modules: [
      [
        "Read a design brief",
        [
          "Identify users and page requirements",
          "Translate a wireframe into a component plan",
          "List mobile, keyboard, and error states",
        ],
        "Annotate a product-page wireframe with required interface states.",
        "Turn a design into a clear list of components and user interactions.",
      ],
      [
        "Semantic HTML and accessible forms",
        [
          "Use landmarks, headings, links, and buttons correctly",
          "Connect form inputs to labels and instructions",
          "Test reading order and keyboard focus",
        ],
        "Build a registration form with helpful validation messages.",
        "Build a form with meaningful labels, keyboard access, and understandable errors.",
      ],
      [
        "CSS layout and visual systems",
        [
          "Use the box model and a spacing scale",
          "Build layouts with Flexbox and Grid",
          "Apply typography, color contrast, and responsive rules",
        ],
        "Recreate a two-column dashboard that becomes a readable mobile layout.",
        "Create responsive layouts with consistent spacing and readable contrast.",
      ],
      [
        "JavaScript in the browser",
        [
          "Handle events and update the DOM",
          "Validate inputs with functions and conditions",
          "Use arrays and objects to render interactive lists",
        ],
        "Create a filterable product list with a useful no-results state.",
        "Write browser interactions that correctly update page content from user input.",
      ],
      [
        "React components and state",
        [
          "Pass data through props",
          "Manage controlled inputs and shared state",
          "Use effects for external synchronization",
        ],
        "Build a reusable search, filter, and results interface.",
        "Manage interface state without duplicating or losing user input.",
      ],
      [
        "API integration and reliability",
        [
          "Request JSON and handle non-success responses",
          "Design loading, empty, and retry states",
          "Prevent stale responses from replacing newer results",
        ],
        "Connect search to a test API and simulate a slow and failed response.",
        "Handle asynchronous data with clear loading and recovery states.",
      ],
      [
        "Frontend quality checks",
        [
          "Test components and user flows",
          "Inspect images, bundle size, and rendering performance",
          "Review keyboard, screen-reader, and reduced-motion behavior",
        ],
        "Audit the interface and document three reproducible accessibility or performance fixes.",
        "Use browser evidence to improve accessibility and page performance.",
      ],
      [
        "Capstone: a responsive service directory",
        [
          "Implement the complete interface from a brief",
          "Review the diff with a teammate",
          "Deploy a preview and document known issues",
        ],
        "Deliver a directory with search, detail pages, forms, responsive states, and a test report.",
        "Present a tested frontend project with clear setup and review instructions.",
      ],
    ],
  },
  "python-developer": {
    entry:
      "Use Python for reliable scripts, data processing, and a small backend service.",
    requirements: [
      "Basic file and folder skills; the pathway introduces programming from the beginning.",
      "Professional backend roles may require broader software, database, and deployment experience.",
    ],
    modules: [
      [
        "Python workspace and first programs",
        [
          "Create an isolated environment and run a script",
          "Read tracebacks and use a debugger",
          "Organize modules and dependencies",
        ],
        "Create a reproducible command-line project with a setup guide.",
        "Run and debug a Python project in an isolated environment.",
      ],
      [
        "Types, control flow, and functions",
        [
          "Choose strings, numbers, lists, and dictionaries",
          "Use conditions and loops",
          "Write small functions with explicit inputs and outputs",
        ],
        "Build a command-line expense calculator with input validation.",
        "Write Python functions that transform structured input and handle invalid values.",
      ],
      [
        "Files and data formats",
        [
          "Read and write CSV and JSON",
          "Validate missing and malformed records",
          "Use context managers and safe file paths",
        ],
        "Clean a sample transaction file and produce an exception report.",
        "Process files while preserving source data and reporting rejected records.",
      ],
      [
        "Testing and code quality",
        [
          "Write unit tests for ordinary and edge cases",
          "Use exceptions and useful logging",
          "Refactor repeated logic without changing behavior",
        ],
        "Add tests for empty files, duplicate records, and invalid amounts.",
        "Demonstrate that a script handles expected failures with meaningful tests.",
      ],
      [
        "HTTP and external services",
        [
          "Read API documentation and request JSON",
          "Handle pagination, timeouts, and retry limits",
          "Keep credentials in environment variables",
        ],
        "Use a local mock service to collect paginated records without paid API calls.",
        "Build an API client with bounded retries and protected credentials.",
      ],
      [
        "Databases and a web API",
        [
          "Model data in relational tables",
          "Write parameterized queries and transactions",
          "Expose validated routes with a Python web framework",
        ],
        "Build a small inventory API using SQLite and test its validation.",
        "Create a Python API that validates requests and stores data safely.",
      ],
      [
        "Team development and delivery",
        [
          "Use Git branches and review a diff",
          "Write a README and operational checklist",
          "Explain a bug and propose a measured fix",
        ],
        "Review a teammate's failing import job and submit a documented fix.",
        "Communicate Python changes with reproducible setup and debugging evidence.",
      ],
      [
        "Capstone: an inventory import service",
        [
          "Validate and import a sample supplier file",
          "Expose item and import-status endpoints",
          "Demonstrate tests, logs, and recovery",
        ],
        "Deliver a service with an import report, API examples, tests, and a restart procedure.",
        "Present a maintainable Python service with a reliable data-import workflow.",
      ],
    ],
  },
  "cyber-security-analyst": {
    entry:
      "Practice defensive analysis in synthetic logs and explicitly authorized lab environments.",
    requirements: [
      "Comfort with operating systems, networks, and basic command-line work; introductory IT knowledge is useful.",
      "Security jobs may require experience, certifications, background checks, and on-call duties. Exercises never authorize testing real targets.",
    ],
    modules: [
      [
        "Security scope and ethics",
        [
          "Identify assets, owners, and authorization boundaries",
          "Distinguish a vulnerability, threat, and incident",
          "Record evidence without exposing personal data",
        ],
        "Write a scope and data-handling agreement for a fictional defensive lab.",
        "Define the authorized scope of a security task and protect its evidence.",
      ],
      [
        "Networks and operating systems",
        [
          "Trace DNS, HTTP, and TLS at a high level",
          "Read process, authentication, and network logs",
          "Explain permissions and least-privilege access",
        ],
        "Map a sample business network and identify its trust boundaries.",
        "Explain which systems and access boundaries are relevant to an alert.",
      ],
      [
        "Identity and access monitoring",
        [
          "Recognize unusual sign-in patterns",
          "Review MFA and access-policy events",
          "Separate suspicious activity from expected behavior",
        ],
        "Investigate a synthetic sequence of failed logins and a successful remote sign-in.",
        "Correlate identity events before deciding whether an alert needs escalation.",
      ],
      [
        "SIEM investigation",
        [
          "Filter and correlate timestamped events",
          "Create a clear investigation timeline",
          "Document uncertainty and missing telemetry",
        ],
        "Build a timeline from a supplied endpoint and identity log bundle.",
        "Support an incident hypothesis with traceable log evidence.",
      ],
      [
        "Vulnerability triage",
        [
          "Interpret a sample scan report",
          "Weigh severity, exposure, and business impact",
          "Recommend remediation and verification steps",
        ],
        "Prioritize ten fictional findings and explain the first three actions.",
        "Prioritize vulnerabilities using context instead of severity scores alone.",
      ],
      [
        "Incident response",
        [
          "Separate detection, containment, and recovery",
          "Write an escalation note with evidence",
          "Preserve a record of decisions and approvals",
        ],
        "Respond to a tabletop account-compromise scenario without accessing a real account.",
        "Prepare an actionable incident handoff with proportionate containment proposals.",
      ],
      [
        "Detection tuning and communication",
        [
          "Review false positives and coverage gaps",
          "Propose a detection-rule adjustment",
          "Translate technical risk for a nontechnical manager",
        ],
        "Revise a noisy mock alert and write a short management briefing.",
        "Explain a detection trade-off and its remaining blind spots.",
      ],
      [
        "Capstone: defensive incident casebook",
        [
          "Investigate a synthetic alert bundle",
          "Produce an evidence timeline and risk register",
          "Present recovery checks and lessons learned",
        ],
        "Deliver a casebook with source references, escalation decisions, and verification steps.",
        "Present a defensible incident analysis within a clearly authorized lab scope.",
      ],
    ],
  },
  "devops-engineer": {
    entry:
      "Connect application development, automated delivery, and reliable service operations.",
    requirements: [
      "Basic programming, Git, Linux, and networking knowledge; this is not a first-computer-skills course.",
      "DevOps roles often require production experience. Use local containers and simulated infrastructure before any approved cloud spending.",
    ],
    modules: [
      [
        "Service architecture and Linux",
        [
          "Trace application dependencies and ports",
          "Inspect processes, files, and permissions",
          "Write a safe operational runbook",
        ],
        "Map a local application's dependencies and failure points.",
        "Explain how an application depends on its operating system and network.",
      ],
      [
        "Version control and build artifacts",
        [
          "Review a branch and release tag",
          "Create reproducible dependency installs",
          "Separate source code, build output, and configuration",
        ],
        "Build the same sample app from a clean checkout and record the steps.",
        "Produce a reproducible build artifact from version-controlled source.",
      ],
      [
        "Container fundamentals",
        [
          "Write a minimal container build",
          "Configure networks, volumes, and health checks",
          "Keep secrets out of images",
        ],
        "Run an app and database locally with persistent test data.",
        "Containerize a service with explicit configuration and health checks.",
      ],
      [
        "Continuous integration",
        [
          "Run lint, unit, and integration checks",
          "Limit workflow permissions and secrets",
          "Block a failing change before release",
        ],
        "Build a local or repository CI pipeline for a deliberately broken change.",
        "Design a CI pipeline that fails clearly and limits credential exposure.",
      ],
      [
        "Infrastructure as code",
        [
          "Describe resources and dependencies declaratively",
          "Inspect a proposed plan before applying it",
          "Separate environments and handle configuration drift",
        ],
        "Review a sample infrastructure plan without provisioning paid resources.",
        "Review infrastructure changes for unintended access, deletion, and spending.",
      ],
      [
        "Deployment strategies",
        [
          "Distinguish rolling, blue-green, and canary releases",
          "Plan backward-compatible schema changes",
          "Define rollback conditions and approval gates",
        ],
        "Write a staged release and rollback plan for the sample service.",
        "Plan a release that can be checked and reversed if a key signal fails.",
      ],
      [
        "Observability and incidents",
        [
          "Use metrics, logs, and traces together",
          "Define useful service-level indicators",
          "Triage an outage and write a blameless review",
        ],
        "Investigate a simulated latency incident using supplied telemetry.",
        "Diagnose service degradation and document a useful operational response.",
      ],
      [
        "Security and cost controls",
        [
          "Apply least privilege to service identities",
          "Rotate credentials and review dependencies",
          "Estimate usage and set resource limits",
        ],
        "Review a mock deployment for overprivileged credentials and unbounded resource use.",
        "Identify delivery risks involving permissions, supply chains, and resource costs.",
      ],
      [
        "Capstone: a release pipeline",
        [
          "Build and test a containerized service",
          "Demonstrate a failed release and rollback",
          "Hand over monitoring and recovery instructions",
        ],
        "Deliver a local deployment pipeline, test evidence, a release checklist, and an incident runbook.",
        "Demonstrate an observable delivery workflow with a tested recovery procedure.",
      ],
    ],
  },
  "cloud-architect": {
    entry:
      "Design secure, resilient infrastructure and justify architectural trade-offs.",
    requirements: [
      "Prior networking, systems, application, and database knowledge is expected.",
      "Cloud architect is commonly an experienced role, not an entry-level job. Provider certifications or substantial operational experience may be expected.",
    ],
    modules: [
      [
        "Requirements and constraints",
        [
          "Identify workload, users, and data sensitivity",
          "Define availability and recovery targets",
          "Document budget and operational constraints",
        ],
        "Interview a fictional stakeholder and produce a requirements brief.",
        "Translate business needs into measurable infrastructure requirements.",
      ],
      [
        "Regions, networks, and connectivity",
        [
          "Compare regions and failure domains",
          "Design subnets, routing, and service boundaries",
          "Choose private connectivity and controlled ingress",
        ],
        "Draw a network diagram with trust boundaries and failure domains.",
        "Design a network that separates public entry points from private data services.",
      ],
      [
        "Identity and governance",
        [
          "Separate human and workload identities",
          "Design least-privilege roles",
          "Plan audit logging and credential rotation",
        ],
        "Review a fictional access matrix for excessive permissions.",
        "Explain how identities, permissions, and audit trails protect a cloud workload.",
      ],
      [
        "Compute choices",
        [
          "Compare virtual machines, containers, and managed functions",
          "Estimate scaling needs and limits",
          "Match deployment models to workload behavior",
        ],
        "Choose compute options for a web app and background import job.",
        "Justify compute choices using workload, reliability, and operational constraints.",
      ],
      [
        "Data and storage design",
        [
          "Compare relational, object, and key-value storage",
          "Plan backup, retention, and restore",
          "Identify consistency and data-residency requirements",
        ],
        "Design a data lifecycle and recovery plan for sample customer records.",
        "Choose storage and recovery controls that fit the data's requirements.",
      ],
      [
        "Resilience and performance",
        [
          "Identify single points of failure",
          "Use queues, caching, and load balancing appropriately",
          "Model capacity and failure behavior",
        ],
        "Review how the design handles a region outage and a traffic spike.",
        "Explain the costs and limits of a proposed resilience strategy.",
      ],
      [
        "Security review",
        [
          "Model threats and data flows",
          "Review encryption and secrets handling",
          "Document control ownership and remaining risks",
        ],
        "Complete a lightweight threat model for the proposed architecture.",
        "Identify security risks and assign concrete mitigations and owners.",
      ],
      [
        "Cost modeling",
        [
          "Estimate compute, storage, and transfer use",
          "Compare managed-service and self-managed costs",
          "Set budget alerts and capacity assumptions",
        ],
        "Create a spreadsheet estimate with low, expected, and high usage scenarios.",
        "Present an infrastructure estimate with explicit usage assumptions and uncertainty.",
      ],
      [
        "Migration and operations",
        [
          "Plan a phased migration and cutover",
          "Define monitoring and on-call responsibilities",
          "Test a recovery procedure on paper",
        ],
        "Write a migration runbook with rollback and validation gates.",
        "Plan a migration that preserves service continuity and operational ownership.",
      ],
      [
        "Capstone: an architecture review",
        [
          "Produce diagrams and decision records",
          "Defend cost, resilience, and security choices",
          "Respond to a stakeholder change request",
        ],
        "Deliver an architecture pack, cost model, threat review, migration plan, and decision log.",
        "Defend an architecture proposal with documented trade-offs and unresolved assumptions.",
      ],
    ],
  },
  "technical-support-engineer-analyst": {
    entry:
      "Investigate user problems, document evidence, and escalate technical issues clearly.",
    requirements: [
      "Basic computer skills and clear written communication; introductory operating-system and network knowledge helps.",
      "Employers may require product-specific training, shift availability, or technical qualifications.",
    ],
    modules: [
      [
        "A structured support conversation",
        [
          "Clarify symptoms, impact, and urgency",
          "Ask for useful reproduction steps",
          "Protect passwords and personal information",
        ],
        "Rewrite an unclear support message into a useful ticket.",
        "Collect enough evidence to investigate an issue without requesting secrets.",
      ],
      [
        "Operating systems and browsers",
        [
          "Check settings, updates, and permissions",
          "Isolate browser and device differences",
          "Record changes and avoid destructive troubleshooting",
        ],
        "Troubleshoot a simulated browser permission problem using a decision tree.",
        "Isolate a user issue with reversible, documented checks.",
      ],
      [
        "Network and account basics",
        [
          "Distinguish connectivity, DNS, and service problems",
          "Recognize authentication and authorization errors",
          "Use safe account-recovery procedures",
        ],
        "Classify sample login and connectivity failures and choose escalation paths.",
        "Explain the difference between a network failure and an account-access failure.",
      ],
      [
        "Logs and troubleshooting",
        [
          "Read a timestamped error log",
          "Compare expected and actual behavior",
          "Test one hypothesis at a time",
        ],
        "Reproduce a sample app error and attach a minimal evidence bundle.",
        "Use logs and controlled checks to support a troubleshooting conclusion.",
      ],
      [
        "Tickets and knowledge articles",
        [
          "Prioritize a queue against service expectations",
          "Write a concise escalation",
          "Turn a resolved case into a reusable help article",
        ],
        "Create a ticket update, an engineering handoff, and a user-facing article.",
        "Document a resolution clearly for both users and technical teammates.",
      ],
      [
        "Capstone: a support queue",
        [
          "Triage five simulated support cases",
          "Resolve, escalate, or request missing evidence",
          "Review communication and repeat-contact risks",
        ],
        "Deliver a ticket casebook with timelines, tested steps, and escalation reasons.",
        "Manage a small support queue with accurate records and appropriate escalation.",
      ],
    ],
  },
  "qa-automation-engineer": {
    entry:
      "Turn product requirements into useful manual and automated quality checks.",
    requirements: [
      "Basic programming, browser, and Git familiarity; introductory testing knowledge helps.",
      "Automation roles may require coding assessments and experience with production delivery pipelines.",
    ],
    modules: [
      [
        "Test requirements and risk",
        [
          "Turn acceptance criteria into checks",
          "Choose boundary values and negative cases",
          "Prioritize flows by user and business risk",
        ],
        "Write a risk-based test plan for a registration flow.",
        "Choose tests that protect important behavior rather than mirror implementation details.",
      ],
      [
        "Report reproducible defects",
        [
          "Record expected and actual behavior",
          "Capture environment and reproduction steps",
          "Distinguish severity from priority",
        ],
        "Report a deliberately seeded form defect with a minimal reproduction.",
        "Write a defect report another engineer can reproduce and assess.",
      ],
      [
        "Programming for tests",
        [
          "Write reusable assertions and fixtures",
          "Keep test data isolated",
          "Handle asynchronous behavior without arbitrary sleeps",
        ],
        "Test validation functions with ordinary, boundary, and malformed input.",
        "Write deterministic tests with clear setup and meaningful assertions.",
      ],
      [
        "Browser automation",
        [
          "Use semantic selectors and realistic user actions",
          "Test keyboard navigation and form errors",
          "Capture failure evidence without leaking credentials",
        ],
        "Automate a sample sign-in and settings workflow in a local test app.",
        "Automate a user flow using resilient selectors and useful failure evidence.",
      ],
      [
        "API and integration checks",
        [
          "Validate status codes and response schemas",
          "Test authentication and record ownership",
          "Simulate dependency errors and retries",
        ],
        "Build a small API test suite using isolated sample records.",
        "Verify API behavior across success, validation, and access-control boundaries.",
      ],
      [
        "CI and test reliability",
        [
          "Run a focused suite in continuous integration",
          "Investigate flaky tests",
          "Separate product defects from test-environment failures",
        ],
        "Diagnose a flaky test from logs and replace its timing assumption.",
        "Maintain a test suite that fails for understandable, actionable reasons.",
      ],
      [
        "Release and exploratory testing",
        [
          "Design a short exploratory testing charter",
          "Review accessibility and cross-device behavior",
          "Present residual risk to a release owner",
        ],
        "Run an exploratory session and write a release-risk summary.",
        "Explain what a release was tested against and which risks remain.",
      ],
      [
        "Capstone: a product quality pack",
        [
          "Combine browser, API, and unit checks",
          "Demonstrate a meaningful failing test",
          "Present defect reports and release evidence",
        ],
        "Deliver a risk matrix, automated suite, reproducible defects, and a concise release recommendation.",
        "Present a quality assessment supported by useful tests and honest coverage limits.",
      ],
    ],
  },
};
