import type { CareerCourseDraft } from "./types";

export const marketingCourses: Record<string, CareerCourseDraft> = {
  "digital-marketing-specialist": {
    entry:
      "Plan and measure a small campaign using clear audience, channel, and conversion assumptions.",
    requirements: [
      "Basic spreadsheet and communication skills; no advertising spend is required for practice.",
      "Employers may expect channel experience, a portfolio, and familiarity with consent and advertising rules.",
    ],
    modules: [
      [
        "Audience and offer research",
        [
          "Define a customer problem and useful offer",
          "Separate audience evidence from assumptions",
          "Review competitors without copying claims",
        ],
        "Create an audience and offer brief for a fictional product.",
        "Define a marketing audience and message using evidence rather than stereotypes.",
      ],
      [
        "Campaign objectives and channels",
        [
          "Choose a measurable conversion goal",
          "Compare search, social, email, and partnerships",
          "Build a campaign calendar and budget assumptions",
        ],
        "Plan a no-spend launch campaign with explicit channel hypotheses.",
        "Choose channels that fit a campaign's audience, objective, and constraints.",
      ],
      [
        "Landing pages and content",
        [
          "Write clear headlines and calls to action",
          "Match creative to the destination page",
          "Check accessibility and product-claim accuracy",
        ],
        "Draft a landing page and two campaign variants without exaggerated promises.",
        "Create campaign copy that sets accurate expectations and supports a clear next step.",
      ],
      [
        "Measurement and attribution",
        [
          "Define events and successful conversions",
          "Use consistent source tags",
          "Distinguish people, sessions, clicks, and registrations",
        ],
        "Build a tracking plan and analyze a synthetic campaign table.",
        "Measure a campaign with consistent event definitions and attribution caveats.",
      ],
      [
        "Experiments and optimization",
        [
          "Choose one testable change at a time",
          "Define guardrails and stop conditions",
          "Recognize small samples and inconclusive results",
        ],
        "Propose an experiment and evaluate a sample result without claiming certainty.",
        "Interpret campaign tests without confusing noise with proven improvement.",
      ],
      [
        "Reporting and responsible practice",
        [
          "Write a concise performance update",
          "Review consent, targeting, and data access",
          "Prioritize next actions by evidence",
        ],
        "Prepare a campaign review separating observed results from proposed actions.",
        "Report performance honestly and identify consent or claims needing review.",
      ],
      [
        "Capstone: a campaign plan and review",
        [
          "Assemble creative, calendar, and tracking",
          "Analyze a synthetic results dataset",
          "Present the next experiment and its rationale",
        ],
        "Deliver a campaign brief, creative samples, measurement plan, and evidence-based review.",
        "Present a measurable campaign with realistic assumptions and a documented learning plan.",
      ],
    ],
  },
  "seo-specialist": {
    entry:
      "Audit search discoverability and build a prioritized plan for useful, accessible content.",
    requirements: [
      "Basic website and spreadsheet skills; HTML familiarity is useful.",
      "Search rankings and traffic cannot be guaranteed. Practice uses owned pages or supplied crawl data.",
    ],
    modules: [
      [
        "Search intent and page purpose",
        [
          "Distinguish informational and transactional intent",
          "Group queries by reader needs",
          "Match a page to a clear search task",
        ],
        "Create a search-intent map for a fictional tutorial site.",
        "Map search questions to useful pages without keyword stuffing.",
      ],
      [
        "Crawling and indexing basics",
        [
          "Read status codes and redirect chains",
          "Review robots instructions and sitemaps",
          "Distinguish canonicalization from blocking access",
        ],
        "Audit a supplied crawl report and identify pages needing investigation.",
        "Explain how crawl, index, and canonical signals affect discoverability.",
      ],
      [
        "On-page and content quality",
        [
          "Write informative titles and headings",
          "Plan internal links and meaningful anchor text",
          "Review originality, sources, and stale content",
        ],
        "Improve an example page and document why each change helps its reader.",
        "Improve page structure and content around a specific information need.",
      ],
      [
        "Technical and accessibility review",
        [
          "Inspect mobile usability and loading behavior",
          "Review structured data against visible content",
          "Identify broken links and duplicate pages",
        ],
        "Create a technical issue list with reproduction steps and severity.",
        "Prioritize technical SEO issues using verified page behavior and user impact.",
      ],
      [
        "Measurement and implementation",
        [
          "Interpret search impressions and clicks",
          "Separate correlation from a change's effect",
          "Write clear engineering and editorial tickets",
        ],
        "Analyze a synthetic search report and propose measurable follow-up work.",
        "Evaluate search performance with explicit attribution and seasonality caveats.",
      ],
      [
        "Capstone: a search audit",
        [
          "Combine intent, content, and technical evidence",
          "Rank fixes by impact and effort",
          "Define a monitoring and review schedule",
        ],
        "Deliver an audit, page map, example rewrite, prioritized tickets, and measurement plan.",
        "Present a search improvement plan grounded in useful content and verifiable technical findings.",
      ],
    ],
  },
  "social-media-manager": {
    entry:
      "Plan useful social content, manage community responses, and report meaningful results.",
    requirements: [
      "Basic writing and image-editing skills; practice does not require posting to a live account.",
      "Professional access to brand accounts requires permission, secure account handling, and an agreed escalation policy.",
    ],
    modules: [
      [
        "Audience and channel strategy",
        [
          "Identify community needs and platform context",
          "Choose content themes and realistic goals",
          "Set brand voice and account-access rules",
        ],
        "Write a channel strategy for a fictional educational project.",
        "Define a channel's audience, purpose, voice, and account responsibilities.",
      ],
      [
        "Content planning and production",
        [
          "Build a varied editorial calendar",
          "Write specific hooks, captions, and calls to action",
          "Prepare accessible images and captioned video briefs",
        ],
        "Create a two-week calendar with six original post drafts.",
        "Plan accessible social content with a clear audience benefit and publishing purpose.",
      ],
      [
        "Community management",
        [
          "Respond to questions and constructive criticism",
          "Separate spam, abuse, and genuine complaints",
          "Escalate sensitive issues without exposing private information",
        ],
        "Draft responses to a sample comment queue and flag escalation cases.",
        "Manage community responses consistently while protecting privacy.",
      ],
      [
        "Publishing workflow and rights",
        [
          "Review links, claims, and asset permissions",
          "Use an approval and scheduling checklist",
          "Prepare account-recovery and correction procedures",
        ],
        "Build a pre-publication checklist and handle a fictional erroneous post.",
        "Publish through an approval process that checks accuracy and content rights.",
      ],
      [
        "Analytics and iteration",
        [
          "Distinguish reach, engagement, clicks, and conversions",
          "Compare formats with appropriate denominators",
          "Turn feedback into a testable content change",
        ],
        "Analyze a synthetic post report and recommend the next three content tests.",
        "Interpret social results without treating visibility as proof of business outcomes.",
      ],
      [
        "Capstone: a social content pack",
        [
          "Present the strategy and content calendar",
          "Demonstrate comment moderation decisions",
          "Report sample results and next actions",
        ],
        "Deliver post drafts, creative briefs, moderation guidance, and a results review.",
        "Present a manageable social program with original content and clear operational rules.",
      ],
    ],
  },
  "email-marketing-specialist": {
    entry:
      "Plan permission-based email campaigns with readable content, clean data, and useful measurement.",
    requirements: [
      "Basic writing, spreadsheet, and HTML familiarity is helpful.",
      "Practice uses synthetic subscribers and rendered previews. Real sending requires authorization and review of applicable consent and unsubscribe requirements.",
    ],
    modules: [
      [
        "Audience permission and campaign goals",
        [
          "Document subscription sources and consent assumptions",
          "Separate service messages from promotional campaigns",
          "Define a useful audience segment",
        ],
        "Build a synthetic audience table and permission checklist.",
        "Plan an email audience without purchased lists or assumed permission.",
      ],
      [
        "Segmentation and lifecycle planning",
        [
          "Map welcome, onboarding, and re-engagement goals",
          "Use relevant event and preference data",
          "Define suppression and frequency rules",
        ],
        "Create a three-message onboarding map with stop and suppression conditions.",
        "Design a lifecycle sequence with explicit eligibility and frequency rules.",
      ],
      [
        "Copy and accessible templates",
        [
          "Write accurate subject lines and preheaders",
          "Structure a readable mobile email",
          "Use descriptive links, alt text, and a plain-text version",
        ],
        "Draft and render a welcome email without sending it.",
        "Create an accessible email that communicates one useful next step.",
      ],
      [
        "Deliverability and technical checks",
        [
          "Explain SPF, DKIM, and DMARC at a high level",
          "Review bounce and complaint signals",
          "Test links, personalization, and unsubscribe behavior",
        ],
        "Audit a sample campaign configuration and rendered message.",
        "Identify common email configuration and quality problems before a send.",
      ],
      [
        "Experiments and reporting",
        [
          "Choose conversion and guardrail metrics",
          "Interpret open-rate measurement limitations",
          "Compare segments and test results responsibly",
        ],
        "Analyze a synthetic campaign report and explain an inconclusive subject-line test.",
        "Report campaign performance with measurement limits and recipient experience in mind.",
      ],
      [
        "Capstone: a permission-based lifecycle pack",
        [
          "Assemble audience rules and three email previews",
          "Run a pre-send quality checklist",
          "Present measurement and correction plans",
        ],
        "Deliver a sequence map, email drafts, eligibility rules, QA checklist, and reporting template.",
        "Present a campaign plan with consent assumptions, suppression rules, and reviewed message previews.",
      ],
    ],
  },
  "sales-representative": {
    entry:
      "Practice discovery, qualification, follow-up, and clear CRM record keeping.",
    requirements: [
      "Clear communication and basic spreadsheet or CRM familiarity.",
      "Sales roles vary in product expertise, location, compensation, and licensing; this pathway does not authorize regulated sales.",
    ],
    modules: [
      [
        "Understand the product and customer",
        [
          "Explain a product's actual capabilities and limits",
          "Identify a customer's problem and buying context",
          "Avoid misleading outcome and pricing claims",
        ],
        "Write a factual product and customer brief for a fictional service.",
        "Explain an offer accurately and identify situations where it is unsuitable.",
      ],
      [
        "Discovery and qualification",
        [
          "Ask open questions and listen actively",
          "Clarify needs, budget, timing, and decision process",
          "Summarize the customer's priorities",
        ],
        "Role-play a discovery call and document unanswered questions.",
        "Conduct a discovery conversation without steering the customer into invented needs.",
      ],
      [
        "Demonstrations and objections",
        [
          "Connect a demonstration to a stated need",
          "Handle pricing and implementation questions",
          "Acknowledge uncertainty and involve specialists",
        ],
        "Prepare a short demo and respond to three realistic objections.",
        "Explain product fit and respond to objections with accurate information.",
      ],
      [
        "CRM and pipeline discipline",
        [
          "Record contacts, stages, and next actions",
          "Distinguish a qualified opportunity from a vague lead",
          "Maintain data quality and access boundaries",
        ],
        "Update a synthetic pipeline and identify stalled opportunities.",
        "Maintain CRM records that make ownership, evidence, and next steps clear.",
      ],
      [
        "Follow-up and negotiation boundaries",
        [
          "Write a concise recap and agreed next step",
          "Distinguish approved terms from unauthorized promises",
          "Hand over implementation and customer context",
        ],
        "Draft a follow-up email and an internal handoff without sending either.",
        "Follow up with clear commitments while staying within approved commercial terms.",
      ],
      [
        "Capstone: a simulated sales opportunity",
        [
          "Run discovery, demo, and follow-up",
          "Maintain a complete opportunity record",
          "Explain fit, risks, and a reasonable next decision",
        ],
        "Deliver call notes, a demo outline, objection responses, CRM updates, and an unsent follow-up.",
        "Manage a simulated opportunity with accurate claims and evidence-based qualification.",
      ],
    ],
  },
};
