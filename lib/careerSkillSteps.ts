// Four ordered, observable learning goals for each Career Skills path.
// Stage 1: concepts, Stage 2: practical tools, Stage 3: collaboration, Stage 4: proof.
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
  "user-interface-user-experience-ui-ux-designer": [
    "Identify user tasks, accessibility needs, journey maps, information architecture and measurable usability goals.",
    "Conduct interviews, produce Figma prototypes and test navigation, forms and task completion.",
    "Facilitate a design review with developers and users; prioritize evidence over personal preferences.",
    "Present a tested prototype, annotated handoff files and an evidence-based usability report."
  ],
  "technical-support-engineer-analyst": [
    "Explain account access, operating systems, networking, DNS, device faults and structured troubleshooting.",
    "Diagnose sample tickets, reproduce issues, collect non-sensitive logs and document reversible fixes.",
    "Practice empathetic communication with an upset customer and escalate with an accurate technical handoff.",
    "Close a simulated support queue with complete tickets, a knowledge article and a service-quality review."
  ],
  "medical-assistant": [
    "Explain terminology, care-team roles, infection prevention, vital-sign concepts and scope-of-practice limits.",
    "Simulate patient intake, vital-sign recording, appointment scheduling and accurate chart entries.",
    "Role-play patient questions and escalation of abnormal findings to an authorized clinician.",
    "Document a simulated visit workflow with safety checks; real care requires appropriate training and supervision."
  ],
  "registered-nurse": [
    "Explain patient assessment priorities, vital-sign trends, infection control and safety red flags.",
    "Simulate assessment, medication-safety checks, care planning, documentation and SBAR handoffs.",
    "Role-play patient teaching, informed questions and clear coordination with another nurse or clinician.",
    "Present a simulated patient case with priorities, reassessment and escalation; nursing licensure remains mandatory."
  ],
  "physician": [
    "Explain history-taking, differential-diagnosis reasoning, clinical uncertainty and evidence appraisal.",
    "Analyze a hypothetical patient history, given test findings and treatment-plan concepts in a supervised-style case.",
    "Practice empathetic shared decision-making and concise case presentation to other professionals.",
    "Submit a case analysis with alternatives, risks and limitations; this is not authorization to practice medicine."
  ],
  "paralegal": [
    "Distinguish statutes, case law, jurisdiction, deadlines, confidentiality and limits on legal advice.",
    "Research a hypothetical matter, verify citations, organize evidence and draft a chronology and case index.",
    "Practice gathering facts from a client and giving a supervising attorney a neutral status update.",
    "Deliver a sample case file with source citations, research memo, calendar and document controls."
  ],
  "lawyer": [
    "Learn issue spotting, statutory interpretation, precedent, claims, defenses and professional responsibility.",
    "Brief cases, apply rules to hypothetical facts, draft a structured memo and evaluate counterarguments.",
    "Role-play an ethical client interview, negotiation and case presentation with a skeptical colleague.",
    "Write a cited legal analysis with uncertainty and counterclaims; bar admission is required to practice."
  ],
  "compliance-specialist": [
    "Identify relevant rule sources, business processes, controls, evidence, exceptions and accountable owners.",
    "Build a mock compliance-control matrix and test a policy against realistic process records.",
    "Interview a process owner and explain deficiencies and remediation dates without assigning blame.",
    "Submit a mock audit packet with findings, evidence, controls, owners and follow-up checks."
  ],
  "accountant": [
    "Explain debits, credits, accrual accounting, financial statements and segregation of financial duties.",
    "Post example journal entries, reconcile accounts, track invoices and build a trial balance.",
    "Clarify a transaction with a business owner and explain a budget variance in plain language.",
    "Complete an illustrative month-end close with reconciliations, statements and exception notes."
  ],
  "insurance-underwriter": [
    "Explain exposure, risk classes, premiums, limits, exclusions, deductibles and underwriting guidelines.",
    "Evaluate a fictional application, identify missing information and document eligibility and referral triggers.",
    "Ask an agent clarifying questions and communicate a coverage decision without unsupported promises.",
    "Prepare a simulated underwriting file with evidence, risk factors, pricing rationale and compliance checks."
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
  "financial-advisor-wealth-management": [
    "Explain savings goals, time horizons, fees, diversification, taxes, cash flow and suitability.",
    "Build an educational plan for a hypothetical household covering emergency savings, debt and allocation.",
    "Role-play client discovery, explain risks and disclose uncertainties and conflicts transparently.",
    "Present a sample planning case with assumptions and review checkpoints; licensing rules still apply."
  ],
  "portfolio-manager": [
    "Explain benchmarks, constraints, asset allocation, liquidity, concentration, volatility and drawdowns.",
    "Model a diversified portfolio, compare returns with benchmarks, rebalance and stress-test scenarios.",
    "Present proposed changes to an investment committee and justify risk limits and trade-offs.",
    "Create a sample investment policy, portfolio report and attribution analysis with written decision records."
  ],
  "credit-analyst": [
    "Explain borrower cash flow, leverage, collateral, covenants, repayment sources and credit risk.",
    "Analyze fictional borrower statements, calculate coverage ratios and model a downside case.",
    "Request missing information from a borrower and present concerns fairly to a credit committee.",
    "Write a credit memo with documented ratios, risks, covenants and a reasoned recommendation."
  ],
  "customer-service-representative": [
    "Explain service standards, active listening, policies, identity checks, ticket records and escalation.",
    "Troubleshoot a sample delayed order or billing error; record the facts and next actions.",
    "Role-play de-escalating a frustrated customer and coordinating a resolution with another team.",
    "Resolve a simulated support case with a professional reply, accurate log and follow-up confirmation."
  ],
  "sales-representative": [
    "Explain ideal customers, lead qualification, buyer problems, value propositions, objections and sales stages.",
    "Research an account, conduct discovery and track decisions and next steps in a CRM.",
    "Role-play a real buyer conversation, handle pricing objections honestly and negotiate clear expectations.",
    "Complete a sample sales process with discovery notes, tailored proposal and professional follow-up."
  ],
  "project-manager": [
    "Turn a project request into scope, owners, deliverables, acceptance criteria, dependencies and deadlines.",
    "Build a task breakdown, milestone calendar, risk log, budget and change-control record.",
    "Lead a mock team meeting, resolve a blocker and coordinate stakeholders with conflicting needs.",
    "Deliver a project plan, status report, completed milestone and a retrospective with measured results."
  ],
  "electrician": [
    "Explain voltage, current, resistance, circuit diagrams, lockout/tagout, PPE and electrical hazards.",
    "Interpret safe training diagrams, calculate example circuits and plan de-energized troubleshooting.",
    "Explain a potential hazard to a supervisor and communicate observations to a customer.",
    "Submit a simulated diagnostic checklist and annotated drawing; live electrical work needs qualified supervision."
  ],
  "plumber": [
    "Explain water supply, drains, vents, pressure, fittings, backflow and job-site safety.",
    "Interpret a sample plumbing drawing, select fittings and estimate materials for a hypothetical job.",
    "Role-play explaining a leak report to a customer and escalating suspected hazards to a supervisor.",
    "Produce a diagnostic plan and materials checklist with code questions; real installation requires qualified supervision."
  ],
  "hvac-technician": [
    "Explain the heating/cooling cycle, airflow, refrigeration, electrical safety and refrigerant restrictions.",
    "Read example system diagrams and interpret hypothetical temperature and airflow measurements.",
    "Interview a customer about symptoms and discuss likely causes with a supervising technician.",
    "Write a simulated service report with readings, safety checks and escalation; credentials may be required."
  ]
};
