/** Four progressively assessable, digital-practice outcomes per offered career. */
export const careerSkillSteps: Record<string, readonly [string, string, string, string]> = {
  "software-developer-engineer": [
    "Translate user needs into acceptance criteria; explain frontend, API, database, authorization and reliability requirements.",
    "Implement a small full-stack feature using version control, SQL, tested API endpoints, validation and error handling.",
    "Review a teammate's pull request, explain technical trade-offs to stakeholders, and resolve a bug collaboratively.",
    "Deploy a documented feature with passing tests, a reproducible bug fix and a user-facing walkthrough."
  ],
  "front-end-developer": [
    "Explain semantic HTML, CSS layout, responsive behavior, accessibility and interface requirements.",
    "Build a responsive React form with validation, keyboard navigation, accessible labels and API error states.",
    "Run a usability test, collaborate with a designer and translate feedback into prioritized UI improvements.",
    "Submit a cross-device website with annotated components, accessibility checks and completed user tasks."
  ],
  "python-developer": [
    "Explain Python types, control flow, functions, modules, exceptions, data structures and file operations.",
    "Build a tested script and Flask/Django API; validate inputs, query SQL safely and log failures.",
    "Clarify requirements with a teammate, review code and describe debugging evidence in a professional ticket.",
    "Deliver a reusable Python service with tests, setup instructions and working example requests."
  ],
  "cyber-security-analyst": [
    "Identify assets, attack surfaces, vulnerability versus incident, business impact and defensive controls.",
    "Interpret simulated security logs, prioritize vulnerabilities and write safe containment and remediation steps.",
    "Practice an incident handoff to IT and management with verified evidence, uncertainty and escalation rules.",
    "Submit a mock risk register and incident timeline; use only authorized defensive lab exercises."
  ],
  "devops-engineer": [
    "Explain branches, CI/CD, containers, infrastructure configuration, observability, secrets and rollback plans.",
    "Containerize a sample app, configure testing and deployment checks, and simulate a deployment failure.",
    "Coordinate a release, communicate risks to developers and support, and run a blameless incident review.",
    "Demonstrate repeatable deployment, monitoring, a tested rollback and a recovery runbook."
  ],
  "cloud-architect": [
    "Translate availability, security, budget, scalability and data-handling needs into architecture requirements.",
    "Diagram a sample cloud workload with least-privilege access, backups, cost estimates and infrastructure as code.",
    "Present two architectures to engineering and finance; explain trade-offs, risks and vendor constraints.",
    "Deliver an architecture decision record, cost forecast and simulated disaster-recovery test."
  ],
  "technical-support-engineer-analyst": [
    "Explain remote software support, user access, operating-system basics, networking and troubleshooting.",
    "Diagnose sample login, browser and connectivity tickets using authorized remote support steps.",
    "Help a frustrated user, confirm understanding and escalate with reproducible details.",
    "Resolve a mock online-support queue with clear tickets and a self-service guide."
  ],
  "qa-automation-engineer": [
    "Interpret acceptance criteria, expected behavior, edge cases and reproducible test evidence.",
    "Automate browser and API checks in a sample app and run them in CI.",
    "Work with developers to triage bugs, explain severity and agree on release blockers.",
    "Deliver a regression suite and quality report with open defects."
  ],
  "data-analyst": [
    "Turn a stakeholder's question into metrics; distinguish data quality, sampling, correlation and causation.",
    "Clean sample records, write SQL joins and aggregations, and build properly labeled visualizations.",
    "Interview a stakeholder and communicate assumptions, limitations and findings without misleading claims.",
    "Present reproducible queries, a dashboard, metric definitions and a clear recommended business action."
  ],
  "data-scientist": [
    "Frame a business prediction problem; explain baselines, data leakage, validation, bias and error costs.",
    "Prepare a dataset in Python, engineer features, compare models and analyze performance on held-out data.",
    "Discuss accuracy, fairness and uncertainty with a product owner and respond to critical questions.",
    "Present a reproducible experiment report with failure cases, limitations and a monitoring proposal."
  ],
  "machine-learning-engineer": [
    "Explain features, labels, data splits, model evaluation, inference latency and production drift.",
    "Train a small model, compare it with a baseline and expose validated predictions through an API.",
    "Discuss privacy, cost, latency and accuracy trade-offs with product and infrastructure teammates.",
    "Deliver tested training and inference code, documented metrics, rollback criteria and a model card."
  ],
  "business-intelligence-analyst": [
    "Explain KPIs, dimensions, data quality, reporting and stakeholder requirements.",
    "Write SQL views and build dashboards with verified calculations.",
    "Interview a manager and present findings, limitations and possible actions.",
    "Deliver a dashboard, metric dictionary and reporting runbook."
  ],
  "ai-automation-specialist": [
    "Map repeatable office processes, data permissions and human approval points.",
    "Create an API automation with logging, validation and tested AI error handling.",
    "Demo the workflow to colleagues and revise it after failure-case feedback.",
    "Deliver a documented automation with tests, audit trail and rollback plan."
  ],
  "user-interface-user-experience-ui-ux-designer": [
    "Identify user tasks, accessibility needs, journey maps, information architecture and measurable usability goals.",
    "Conduct interviews, produce Figma prototypes and test navigation, forms and task completion.",
    "Facilitate a design review with developers and users; prioritize evidence over personal preferences.",
    "Present a tested prototype, annotated handoff files and an evidence-based usability report."
  ],
  "graphic-designer": [
    "Identify digital audiences, hierarchy, typography, branding and accessibility.",
    "Design a banner, social graphics and an editable brand sheet.",
    "Run a mock client briefing and revise creative work from specific feedback.",
    "Deliver export-ready campaign assets with a quality checklist."
  ],
  "video-editor": [
    "Explain pacing, captions, aspect ratios, audio levels and asset licensing.",
    "Edit short and long demo footage with subtitles and cleaned audio.",
    "Review timecoded feedback with a client and complete revisions.",
    "Export a complete video package with accessible captions and a rights checklist."
  ],
  "technical-writer": [
    "Distinguish user tasks, technical terminology, source accuracy and version control.",
    "Write how-to instructions, troubleshooting articles and sample API requests.",
    "Interview an engineer and usability-test instructions with a novice.",
    "Publish a reviewed documentation set with accuracy checks and ownership."
  ],
  "content-writer-editor": [
    "Identify purpose, audience, source quality, original writing and attribution.",
    "Draft and edit a researched article, product description and clear email.",
    "Take a content brief, defend edits professionally and fact-check a teammate's work.",
    "Deliver publication-ready content with sources and an editorial review log."
  ],
  "digital-marketing-specialist": [
    "Explain channels, audiences, conversion funnels, metrics and advertising ethics.",
    "Build a campaign brief with hypotheses, landing-page offer and event tracking.",
    "Present spend and creative trade-offs to a client and coordinate with teammates.",
    "Deliver a performance report on real outcomes with next experiments."
  ],
  "seo-specialist": [
    "Explain search intent, indexing, page structure, usefulness and ranking uncertainty.",
    "Audit sample site pages, write content briefs and prioritize technical fixes.",
    "Collaborate with a writer and developer on revisions and explain trade-offs.",
    "Deliver a source-backed SEO audit and measurement plan."
  ],
  "social-media-manager": [
    "Define audience, brand voice, platform rules, engagement quality and moderation.",
    "Create a two-week calendar with scripts, graphics and measurable calls to action.",
    "Respond to customer questions and criticism respectfully in simulated conversations.",
    "Produce a channel report, moderation plan and content improvement list."
  ],
  "email-marketing-specialist": [
    "Explain consent, deliverability, segments, unsubscribe rules and email metrics.",
    "Build a short onboarding sequence with accessible templates and QA checks.",
    "Review a campaign with a client and respond to bounce or complaint scenarios.",
    "Deliver campaign assets, tracking metrics and a permission audit."
  ],
  "sales-representative": [
    "Explain ideal customers, lead qualification, buyer problems, value propositions, objections and sales stages.",
    "Research an account, conduct discovery and track decisions and next steps in a CRM.",
    "Role-play a real buyer conversation, handle pricing objections honestly and negotiate clear expectations.",
    "Complete a sample sales process with discovery notes, tailored proposal and professional follow-up."
  ],
  "bookkeeper": [
    "Explain chart of accounts, receipts, invoices, double-entry and reconciliations.",
    "Enter fictional transactions into a sample ledger and match bank records.",
    "Ask a client to clarify missing records and explain discrepancies tactfully.",
    "Produce an example month-end ledger, reconciliation and report."
  ],
  "accountant": [
    "Explain debits, credits, accrual accounting, financial statements and segregation of financial duties.",
    "Post example journal entries, reconcile accounts, track invoices and build a trial balance.",
    "Clarify a transaction with a business owner and explain a budget variance in plain language.",
    "Complete an illustrative month-end close with reconciliations, statements and exception notes."
  ],
  "financial-analyst": [
    "Link income statements, balance sheets and cash flow; interpret margins, liquidity and financial risk.",
    "Build a spreadsheet forecast with assumptions, variance analysis, runway and downside scenarios.",
    "Ask a manager about forecast changes and explain trade-offs clearly to decision-makers.",
    "Deliver an auditable 12-month model and a one-page recommendation with uncertainty and sensitivity analysis."
  ],
  "investment-analyst": [
    "Distinguish business quality from share price; explain filings, ratios, competitive advantages and valuation.",
    "Research a hypothetical stock, compare peers, estimate valuation ranges and build bull and bear cases.",
    "Defend investment assumptions to a simulated committee and respond to downside-risk questions.",
    "Submit a sourced research memo with valuation scenarios and risks, not personalized investment advice."
  ],
  "credit-analyst": [
    "Explain borrower cash flow, leverage, collateral, covenants, repayment sources and credit risk.",
    "Analyze fictional borrower statements, calculate coverage ratios and model a downside case.",
    "Request missing information from a borrower and present concerns fairly to a credit committee.",
    "Write a credit memo with documented ratios, risks, covenants and a reasoned recommendation."
  ],
  "insurance-underwriter": [
    "Explain exposure, risk classes, premiums, limits, exclusions, deductibles and underwriting guidelines.",
    "Evaluate a fictional application, identify missing information and document eligibility and referral triggers.",
    "Ask an agent clarifying questions and communicate a coverage decision without unsupported promises.",
    "Prepare a simulated underwriting file with evidence, risk factors, pricing rationale and compliance checks."
  ],
  "customer-service-representative": [
    "Explain service standards, active listening, policies, identity checks, ticket records and escalation.",
    "Troubleshoot a sample delayed order or billing error; record the facts and next actions.",
    "Role-play de-escalating a frustrated customer and coordinating a resolution with another team.",
    "Resolve a simulated support case with a professional reply, accurate log and follow-up confirmation."
  ],
  "project-manager": [
    "Turn a project request into scope, owners, deliverables, acceptance criteria, dependencies and deadlines.",
    "Build a task breakdown, milestone calendar, risk log, budget and change-control record.",
    "Lead a mock team meeting, resolve a blocker and coordinate stakeholders with conflicting needs.",
    "Deliver a project plan, status report, completed milestone and a retrospective with measured results."
  ],
  "virtual-assistant": [
    "Identify priorities, scheduling constraints, privacy and task handoff rules.",
    "Organize a simulated inbox, calendar, files, meetings and research requests.",
    "Clarify ambiguous client instructions and communicate time-sensitive changes.",
    "Deliver a weekly admin summary with a task tracker and privacy checks."
  ],
  "customer-success-specialist": [
    "Define onboarding goals, product adoption, churn signals and escalation routes.",
    "Create onboarding steps, CRM notes and a sample usage review.",
    "Role-play a client check-in and coordinate a product issue with support.",
    "Deliver an account health report and measurable follow-up plan."
  ],
  "operations-coordinator": [
    "Explain SOPs, recurring tasks, service levels, exceptions and remote teamwork.",
    "Create a task board, exception log, recurring report and process map.",
    "Coordinate delayed work among teams and communicate ownership and dates.",
    "Submit a revised workflow and measurable quality-improvement report."
  ],
  "recruiter-talent-sourcer": [
    "Describe job criteria, candidate privacy, fair hiring and interview structure.",
    "Draft an inclusive posting, candidate tracker and outreach emails.",
    "Conduct a simulated screen with objective notes and respectful follow-up.",
    "Present a hiring pipeline report and structured interview rubric."
  ],
  "medical-billing-coding-specialist": [
    "Explain claim stages, terminology, coding-system concepts, privacy and administrative limits.",
    "Code fictional examples using supplied reference excerpts and correct mock claim errors.",
    "Ask an authorized clinician for missing information and hand off a billing issue clearly.",
    "Submit a simulated claims audit; credentials and employer training may still be required."
  ],
  "health-information-specialist": [
    "Explain electronic records, record integrity, authorizations and privacy controls.",
    "Classify mock healthcare documents and check missing fields and audit trails.",
    "Report a records discrepancy to authorized staff without oversharing sensitive data.",
    "Deliver a sample quality audit and correction log."
  ],
  "patient-scheduling-coordinator": [
    "Explain appointment workflows, eligibility concepts, calendar constraints and patient privacy.",
    "Schedule and reschedule simulated visits in a training calendar.",
    "Role-play a patient call and escalate medical questions to licensed clinicians.",
    "Complete a sample scheduling queue with confirmations and documented handoffs."
  ],
  "contract-administrator": [
    "Identify contract parties, deliverables, approval stages, renewal dates and legal boundaries.",
    "Organize sample agreements and monitor versions and obligation dates.",
    "Coordinate a renewal among finance and legal teams without giving legal advice.",
    "Deliver a contract register, reminders, approval trail and escalation notes."
  ],
  "legal-operations-coordinator": [
    "Describe legal matter intake, confidentiality, document control and deadline tracking.",
    "Organize hypothetical matter folders, task records and status reports.",
    "Request attorney approvals and communicate factual updates without legal advice.",
    "Produce a fictional legal-operations packet with access and deadline checks."
  ],
  "compliance-specialist": [
    "Identify relevant rule sources, business processes, controls, evidence, exceptions and accountable owners.",
    "Build a mock compliance-control matrix and test a policy against realistic process records.",
    "Interview a process owner and explain deficiencies and remediation dates without assigning blame.",
    "Submit a mock audit packet with findings, evidence, controls, owners and follow-up checks."
  ]
};
