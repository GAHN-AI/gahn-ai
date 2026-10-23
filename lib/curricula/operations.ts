import type { CareerCourseDraft } from "./types";

export const operationsCourses: Record<string, CareerCourseDraft> = {
  "customer-service-representative": {
    entry:
      "Handle customer questions with clear communication, accurate records, and sensible escalation.",
    requirements: [
      "Basic computer skills, reading comprehension, and clear communication.",
      "Employers may require product training, language skills, shift work, identity checks, or onsite onboarding.",
    ],
    modules: [
      [
        "Understand the customer and service policy",
        [
          "Identify the customer's actual request",
          "Find the relevant approved policy",
          "Separate empathy from unauthorized promises",
        ],
        "Match five fictional customer requests to the appropriate policy or escalation.",
        "Identify a customer's need and apply the correct service-policy boundaries.",
      ],
      [
        "Email and chat communication",
        [
          "Write a clear opening and useful questions",
          "Explain next steps in plain language",
          "Adapt tone without copying robotic templates",
        ],
        "Rewrite three confusing support replies into concise, accurate messages.",
        "Write customer messages that explain a resolution and its next step clearly.",
      ],
      [
        "Troubleshooting and resolution",
        [
          "Gather details without requesting secrets",
          "Use a documented troubleshooting flow",
          "Recognize when a case needs specialist help",
        ],
        "Work through a fictional order-access problem and document each check.",
        "Use safe troubleshooting steps and escalate when evidence or authority is missing.",
      ],
      [
        "Difficult conversations",
        [
          "Acknowledge concerns without admitting unverified facts",
          "Explain limits on refunds and exceptions",
          "Handle abusive or sensitive situations appropriately",
        ],
        "Role-play a disputed refund and write an escalation summary.",
        "Handle disagreement calmly while staying within documented policy.",
      ],
      [
        "Tickets and service quality",
        [
          "Record issue, action, owner, and status",
          "Prioritize urgency and follow-up",
          "Review quality beyond response speed",
        ],
        "Organize a sample queue and identify repeat-contact risks.",
        "Maintain complete service records and choose sensible follow-up priorities.",
      ],
      [
        "Capstone: a customer support shift",
        [
          "Triage a varied synthetic queue",
          "Draft resolutions and escalations",
          "Review accuracy, tone, and ownership",
        ],
        "Deliver a completed ticket set, draft replies, and a quality-review checklist.",
        "Handle a simulated service queue with accurate communication and appropriate escalation.",
      ],
    ],
  },
  "project-manager": {
    entry:
      "Plan, coordinate, and report a small project with clear scope, owners, and delivery checks.",
    requirements: [
      "Basic spreadsheet, writing, and organizational skills.",
      "Professional project-management roles may require sector experience or credentials; a course plan does not establish readiness for high-stakes delivery.",
    ],
    modules: [
      [
        "Project scope and outcomes",
        [
          "Clarify objectives and constraints",
          "Define deliverables and acceptance criteria",
          "Identify stakeholders and approval roles",
        ],
        "Write a charter for a fictional website improvement project.",
        "Define a project's scope, success criteria, and decision owners.",
      ],
      [
        "Work breakdown and estimates",
        [
          "Split deliverables into manageable tasks",
          "Identify dependencies and resource constraints",
          "Record estimates and uncertainty",
        ],
        "Build a work breakdown and dependency map for the project.",
        "Create a project plan with explicit dependencies and realistic estimation assumptions.",
      ],
      [
        "Scheduling and delivery methods",
        [
          "Compare milestone and iterative planning",
          "Maintain a task board and delivery calendar",
          "Plan buffers and review points",
        ],
        "Create a schedule and explain how one delayed dependency changes it.",
        "Coordinate a delivery schedule and explain the effects of changed dependencies.",
      ],
      [
        "Budget, risks, and change",
        [
          "Track planned and actual costs",
          "Maintain a risk and issue register",
          "Assess a scope-change request",
        ],
        "Evaluate a fictional change request against time, cost, and quality.",
        "Explain project trade-offs and route material scope changes for approval.",
      ],
      [
        "Meetings and stakeholder communication",
        [
          "Run a focused meeting with decisions",
          "Write a useful status update",
          "Escalate blockers early and neutrally",
        ],
        "Prepare a weekly report and a decision-focused meeting agenda.",
        "Communicate delivery status using evidence, owners, and clear next actions.",
      ],
      [
        "Quality and handover",
        [
          "Check deliverables against acceptance criteria",
          "Track unresolved issues and ownership",
          "Run a retrospective and handover",
        ],
        "Review a fictional delivery and prepare a sign-off recommendation.",
        "Assess whether a deliverable meets its agreed criteria and is ready for handover.",
      ],
      [
        "Capstone: a project delivery pack",
        [
          "Integrate charter, schedule, budget, and risks",
          "Respond to a simulated mid-project change",
          "Present final acceptance and lessons learned",
        ],
        "Deliver a charter, plan, risk register, status report, change log, and closeout memo.",
        "Present a manageable project with transparent decisions and delivery evidence.",
      ],
    ],
  },
  "virtual-assistant": {
    entry:
      "Organize calendars, documents, and recurring administrative tasks with careful access boundaries.",
    requirements: [
      "Basic email, calendar, document, and spreadsheet skills.",
      "Clients may require confidentiality agreements, secure account access, reliable availability, and product-specific training.",
    ],
    modules: [
      [
        "Agree on scope and access",
        [
          "Clarify responsibilities and working hours",
          "Separate routine work from approval-required actions",
          "Use delegated access instead of shared passwords",
        ],
        "Write a fictional client onboarding checklist and task-permission map.",
        "Set clear administrative responsibilities and safe account-access boundaries.",
      ],
      [
        "Inbox and written communication",
        [
          "Classify requests and flag urgent items",
          "Draft concise replies for review",
          "Track follow-ups without losing context",
        ],
        "Organize a synthetic inbox and prepare five unsent draft replies.",
        "Triage an inbox and draft accurate replies with clear approval requirements.",
      ],
      [
        "Calendar and meeting coordination",
        [
          "Compare time zones and availability",
          "Prepare agendas and meeting materials",
          "Record decisions and action owners",
        ],
        "Plan a fictional three-person meeting and produce an agenda and action log.",
        "Coordinate a meeting with correct time zones, preparation, and follow-up.",
      ],
      [
        "Documents and spreadsheet records",
        [
          "Use naming, folders, and version rules",
          "Maintain a clean contact or task tracker",
          "Check data entry and protect sensitive fields",
        ],
        "Build an organized project folder and validate a sample contact sheet.",
        "Maintain administrative records that are accurate, findable, and appropriately protected.",
      ],
      [
        "Recurring workflows and service quality",
        [
          "Write a repeatable checklist",
          "Estimate workload and flag conflicting deadlines",
          "Report completed work and exceptions",
        ],
        "Create a weekly administrative checklist and client update.",
        "Run recurring work with clear priorities and visible exceptions.",
      ],
      [
        "Capstone: a weekly client operations pack",
        [
          "Complete a simulated inbox and calendar cycle",
          "Prepare records and meeting follow-up",
          "Hand over a concise weekly report",
        ],
        "Deliver an inbox plan, calendar, draft replies, tracker, checklist, and client update.",
        "Present a coordinated administrative workflow without exceeding the client's permissions.",
      ],
    ],
  },
  "customer-success-specialist": {
    entry:
      "Help customers adopt a product, review progress, and resolve account risks with the right teams.",
    requirements: [
      "Clear communication, spreadsheet skills, and comfort learning a software product.",
      "Professional roles may require product or industry knowledge, CRM experience, and account-management skills.",
    ],
    modules: [
      [
        "Customer outcomes and account context",
        [
          "Clarify the customer's goals and constraints",
          "Distinguish success work from support and sales",
          "Record stakeholders and agreed outcomes",
        ],
        "Create a success-plan brief for a fictional business customer.",
        "Define customer success around agreed outcomes instead of vague satisfaction claims.",
      ],
      [
        "Onboarding and adoption",
        [
          "Plan setup milestones and training needs",
          "Identify product-adoption blockers",
          "Prepare a useful onboarding session",
        ],
        "Create an onboarding plan with owners and observable milestones.",
        "Plan onboarding with clear ownership and evidence of useful product adoption.",
      ],
      [
        "Account signals and risk",
        [
          "Interpret usage without assuming intent",
          "Combine qualitative feedback and account data",
          "Prioritize risks and escalation needs",
        ],
        "Review a synthetic account-health table and justify follow-up priorities.",
        "Assess account risk using multiple signals and explicit uncertainty.",
      ],
      [
        "Customer conversations",
        [
          "Run a progress review",
          "Handle dissatisfaction and product limitations",
          "Coordinate support and engineering follow-up",
        ],
        "Role-play a renewal-risk conversation and write an internal handoff.",
        "Discuss account concerns accurately and coordinate specific follow-up actions.",
      ],
      [
        "Renewal and feedback coordination",
        [
          "Track renewal dates and approved commercial responsibilities",
          "Route feature feedback with context",
          "Maintain commitments and action logs",
        ],
        "Prepare a fictional account-review pack without offering unapproved terms.",
        "Coordinate renewal and product feedback while preserving clear decision boundaries.",
      ],
      [
        "Capstone: an account success plan",
        [
          "Present onboarding and adoption evidence",
          "Explain risks and customer communications",
          "Recommend the next review actions",
        ],
        "Deliver a success plan, account-health assessment, review agenda, and cross-team action log.",
        "Present an account plan based on real customer outcomes and inspectable follow-up.",
      ],
    ],
  },
  "operations-coordinator": {
    entry:
      "Keep routine work moving through clear procedures, reliable records, and visible exceptions.",
    requirements: [
      "Basic spreadsheet, calendar, and written communication skills.",
      "Requirements vary by industry; operational authority and access should be assigned by an employer.",
    ],
    modules: [
      [
        "Map an operational process",
        [
          "Identify inputs, outputs, and handoffs",
          "Assign task and decision owners",
          "Document service expectations and constraints",
        ],
        "Map a fictional order-to-delivery process and its handoffs.",
        "Describe a repeatable process with clear ownership and expected outputs.",
      ],
      [
        "Track work and maintain records",
        [
          "Build a structured task or request tracker",
          "Use consistent statuses and validation rules",
          "Reconcile missing, duplicate, or overdue items",
        ],
        "Clean a synthetic operations sheet and build an exception view.",
        "Maintain an accurate work tracker with useful status and exception information.",
      ],
      [
        "Coordinate schedules and vendors",
        [
          "Confirm availability and dependencies",
          "Write clear requests and confirmations",
          "Track agreed terms and escalate changes",
        ],
        "Coordinate a fictional supplier delivery and document a missed deadline.",
        "Coordinate external and internal commitments with traceable confirmations.",
      ],
      [
        "Write procedures and controls",
        [
          "Create a usable standard operating procedure",
          "Add approval and quality checkpoints",
          "Protect records and account access",
        ],
        "Write an SOP that a new teammate can follow using sample records.",
        "Document a process with clear steps, controls, and escalation points.",
      ],
      [
        "Improve and report",
        [
          "Measure cycle time and error rates",
          "Distinguish symptoms from bottlenecks",
          "Propose a small process test",
        ],
        "Analyze a sample backlog and propose a measurable improvement.",
        "Use operational evidence to recommend a focused process improvement.",
      ],
      [
        "Capstone: an operations control pack",
        [
          "Run a simulated request cycle",
          "Maintain records and exception handling",
          "Present an SOP and weekly review",
        ],
        "Deliver a process map, tracker, SOP, exception log, and improvement proposal.",
        "Present a reliable operating workflow with clear owners and measurable checks.",
      ],
    ],
  },
  "recruiter-talent-sourcer": {
    entry:
      "Practice structured sourcing, screening coordination, and respectful candidate communication.",
    requirements: [
      "Clear writing, spreadsheet or applicant-tracking familiarity, and good organizational skills.",
      "Recruiting requires employer-approved criteria and review of applicable hiring, privacy, and nondiscrimination obligations.",
    ],
    modules: [
      [
        "Role intake and selection criteria",
        [
          "Clarify essential duties and actual requirements",
          "Separate necessary skills from preferences",
          "Define a consistent screening rubric",
        ],
        "Rewrite a fictional job brief into observable, job-related criteria.",
        "Define consistent screening criteria tied to a role's actual work.",
      ],
      [
        "Sourcing and research",
        [
          "Build role-specific search terms",
          "Use permitted sources and document provenance",
          "Avoid collecting unnecessary personal data",
        ],
        "Create a sourcing plan using synthetic profiles and approved public examples.",
        "Build a documented sourcing process that respects access and privacy boundaries.",
      ],
      [
        "Outreach and candidate experience",
        [
          "Write specific, accurate outreach drafts",
          "Explain role context and next steps",
          "Track preferences and avoid repeated unwanted contact",
        ],
        "Draft three unsent outreach messages for distinct fictional candidates.",
        "Communicate with candidates accurately and respectfully without spam.",
      ],
      [
        "Screening and coordination",
        [
          "Ask consistent role-related questions",
          "Record evidence separately from opinion",
          "Coordinate interview availability and accommodations",
        ],
        "Score synthetic screening notes against a shared rubric.",
        "Document screening evidence consistently and coordinate a fair interview process.",
      ],
      [
        "Pipeline and stakeholder reporting",
        [
          "Maintain stage and follow-up records",
          "Review pipeline metrics and bottlenecks",
          "Escalate inconsistent criteria or feedback",
        ],
        "Review a mock hiring pipeline and prepare a hiring-manager update.",
        "Report hiring progress with clear stage definitions and evidence-based concerns.",
      ],
      [
        "Capstone: a sourcing and screening pack",
        [
          "Present the role brief and search strategy",
          "Evaluate synthetic profiles consistently",
          "Provide communication drafts and a pipeline review",
        ],
        "Deliver a role rubric, sourcing plan, sample assessments, unsent drafts, and tracker.",
        "Present a structured recruiting workflow with consistent criteria and clear privacy boundaries.",
      ],
    ],
  },
};
