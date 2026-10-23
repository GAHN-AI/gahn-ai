import type { CareerCourseDraft } from "./types";

export const administrationCourses: Record<string, CareerCourseDraft> = {
  "medical-billing-coding-specialist": {
    entry:
      "Explore administrative billing and coding workflows with synthetic records and supervised-practice boundaries.",
    requirements: [
      "Basic anatomy terminology, reading accuracy, and spreadsheet skills are helpful; terminology is introduced.",
      "Employers commonly require formal coding education, current code-set knowledge, certifications, or experience. This pathway is not credential preparation or authorization to code real claims.",
    ],
    modules: [
      [
        "Healthcare revenue-cycle overview",
        [
          "Trace registration, documentation, coding, billing, and payment",
          "Separate clinical decisions from administrative duties",
          "Identify role permissions and escalation points",
        ],
        "Map a fictional encounter through the administrative revenue cycle.",
        "Explain billing and coding responsibilities without making clinical decisions.",
      ],
      [
        "Terminology and documentation",
        [
          "Read basic medical terminology in context",
          "Identify required documentation and missing information",
          "Prepare a neutral clarification request",
        ],
        "Review a synthetic encounter note and flag items needing qualified review.",
        "Identify documentation gaps without inventing diagnoses or procedures.",
      ],
      [
        "Code-set structure and lookup",
        [
          "Distinguish diagnosis, procedure, and supply code systems",
          "Use authorized current reference material",
          "Recognize version, setting, and payer dependencies",
        ],
        "Explain a supplied coding example using licensed or publicly available reference excerpts.",
        "Explain why coding requires current authoritative references and appropriate training.",
      ],
      [
        "Claim preparation and validation",
        [
          "Identify claim fields and supporting information",
          "Check identifiers, dates, and completeness",
          "Distinguish a validation error from a coverage decision",
        ],
        "Review a fictional claim worksheet for missing and inconsistent fields.",
        "Check an administrative claim worksheet without treating assumptions as verified facts.",
      ],
      [
        "Denials, payment, and follow-up",
        [
          "Read a sample remittance and denial reason",
          "Match payments and adjustments to claims",
          "Track corrections and authorized appeals",
        ],
        "Create a synthetic denial-follow-up log with owners and deadlines.",
        "Organize claim follow-up with traceable reasons, records, and approval points.",
      ],
      [
        "Privacy and quality review",
        [
          "Apply minimum-necessary data handling",
          "Recognize inappropriate record access",
          "Escalate suspected errors or unsupported coding",
        ],
        "Review a fictional workflow for unnecessary patient-data exposure.",
        "Identify privacy and documentation risks requiring qualified review.",
      ],
      [
        "Capstone: a synthetic billing case file",
        [
          "Trace a case from intake through follow-up",
          "Document missing evidence and review questions",
          "Present quality and privacy checks",
        ],
        "Deliver a process map, fictional claim checklist, denial tracker, and specialist-review questions; use no real patient data.",
        "Present a billing-workflow exercise with accurate records and clear professional limits.",
      ],
    ],
  },
  "health-information-specialist": {
    entry:
      "Practice health-record quality, indexing, release workflows, and privacy-aware administration.",
    requirements: [
      "Detail-oriented reading, basic spreadsheet skills, and introductory health terminology.",
      "Many roles require health-information education, credentials, background checks, or employer training. Practice does not authorize access to patient records.",
    ],
    modules: [
      [
        "Health-record structure",
        [
          "Distinguish encounters, documents, and identifiers",
          "Trace record creation and correction",
          "Separate administrative quality checks from clinical interpretation",
        ],
        "Build an index for a set of synthetic health documents.",
        "Organize a health-record set without changing clinical meaning or inventing information.",
      ],
      [
        "Data quality and reconciliation",
        [
          "Identify missing fields and duplicate records",
          "Use consistent date and naming rules",
          "Escalate identity mismatches",
        ],
        "Review a synthetic record register and create a discrepancy log.",
        "Identify health-record inconsistencies and route identity questions for review.",
      ],
      [
        "Privacy and access",
        [
          "Apply role-based and minimum-necessary access concepts",
          "Recognize inappropriate sharing and access",
          "Document a possible privacy incident",
        ],
        "Assess a fictional record-access scenario and prepare an escalation note.",
        "Recognize data-access boundaries and document privacy concerns appropriately.",
      ],
      [
        "Release and retention workflows",
        [
          "Check a request against approved procedures",
          "Track authorization and identity-verification requirements",
          "Document release, correction, and retention actions",
        ],
        "Create a mock release-request tracker with verification and approval checkpoints.",
        "Track a records request without assuming it authorizes disclosure.",
      ],
      [
        "Reporting and audit support",
        [
          "Summarize document-quality issues",
          "Prepare a traceable audit evidence pack",
          "Coordinate corrections with authorized teams",
        ],
        "Build a synthetic quality report and correction-ownership register.",
        "Report health-information quality issues with an auditable evidence trail.",
      ],
      [
        "Capstone: a health-information quality pack",
        [
          "Index and validate fictional records",
          "Assess sample access and release requests",
          "Present an exception and improvement report",
        ],
        "Deliver a synthetic index, quality log, request tracker, and privacy-aware handoff.",
        "Present a health-information workflow that preserves quality and clear access boundaries.",
      ],
    ],
  },
  "patient-scheduling-coordinator": {
    entry:
      "Coordinate appointments and administrative follow-up without providing clinical advice.",
    requirements: [
      "Clear communication, basic calendar skills, and accurate data entry.",
      "Employers may require healthcare administration training, background checks, onsite onboarding, and specific privacy procedures.",
    ],
    modules: [
      [
        "Scheduling roles and boundaries",
        [
          "Distinguish appointment administration from clinical triage",
          "Follow identity-verification procedures",
          "Recognize requests requiring a clinical professional",
        ],
        "Classify fictional patient requests as administrative or requiring escalation.",
        "Recognize when an appointment request needs clinical rather than administrative judgment.",
      ],
      [
        "Calendar and availability rules",
        [
          "Read appointment types and resource requirements",
          "Coordinate time zones and availability",
          "Handle holds, conflicts, and rescheduling",
        ],
        "Build a fictional clinic schedule with room and provider constraints.",
        "Coordinate appointments against documented availability and resource rules.",
      ],
      [
        "Patient communication",
        [
          "Confirm logistical details accurately",
          "Use respectful and accessible language",
          "Document questions without giving medical instructions",
        ],
        "Draft unsent confirmation and rescheduling messages using supplied approved text.",
        "Communicate appointment logistics accurately while keeping medical questions with clinicians.",
      ],
      [
        "Registration and referral checks",
        [
          "Check required administrative fields",
          "Track referrals and authorization status",
          "Escalate missing documentation",
        ],
        "Review synthetic appointment records and flag missing prerequisites.",
        "Identify administrative documentation gaps without claiming coverage or clinical clearance.",
      ],
      [
        "Privacy and service recovery",
        [
          "Protect patient information in messages",
          "Handle cancellations and dissatisfied callers",
          "Record incidents and follow-up owners",
        ],
        "Role-play a scheduling complaint and document an appropriate recovery action.",
        "Resolve scheduling issues with privacy-aware communication and clear escalation.",
      ],
      [
        "Capstone: a scheduling coordination shift",
        [
          "Manage synthetic booking and rescheduling requests",
          "Maintain an accurate schedule and exception log",
          "Present a handover for unresolved requests",
        ],
        "Deliver a sample schedule, unsent message drafts, verification checklist, and shift handover.",
        "Coordinate a simulated appointment queue without exceeding administrative responsibilities.",
      ],
    ],
  },
  "contract-administrator": {
    entry:
      "Organize contract records, approvals, obligations, and renewals for qualified decision makers.",
    requirements: [
      "Strong reading, document organization, and spreadsheet skills.",
      "Some positions require legal, procurement, or sector experience. Administrative practice does not qualify a learner to provide legal advice or negotiate outside assigned authority.",
    ],
    modules: [
      [
        "Contract lifecycle and authority",
        [
          "Identify request, review, approval, signature, and renewal stages",
          "Separate administration from legal interpretation",
          "Map signing and decision authority",
        ],
        "Draw a lifecycle and approval map for a fictional supplier agreement.",
        "Explain a contract workflow with clear legal-review and signing boundaries.",
      ],
      [
        "Document and version control",
        [
          "Organize drafts, signed copies, and supporting records",
          "Compare versions and preserve a change log",
          "Check completeness and document status",
        ],
        "Reconcile a fictional agreement folder and identify the authoritative copy.",
        "Maintain a contract record with reliable version and approval history.",
      ],
      [
        "Terms and obligation tracking",
        [
          "Extract dates, deliverables, fees, and notice requirements",
          "Record terms without inventing interpretations",
          "Assign owners and review questions",
        ],
        "Build an obligation register from a supplied fictional agreement.",
        "Track explicit contractual obligations and flag ambiguous terms for qualified review.",
      ],
      [
        "Approvals and change requests",
        [
          "Route a change to the correct reviewer",
          "Track open comments and decisions",
          "Record approved amendments and dependencies",
        ],
        "Coordinate a fictional amendment through an approval checklist.",
        "Manage a contract change through a documented approval process.",
      ],
      [
        "Renewals and reporting",
        [
          "Calculate reminder dates from supplied terms",
          "Prepare renewal and expiration reports",
          "Escalate overdue obligations and missing approvals",
        ],
        "Create a renewal calendar and a short exception report.",
        "Maintain timely contract reminders with traceable dates and ownership.",
      ],
      [
        "Capstone: a contract administration register",
        [
          "Organize a synthetic agreement portfolio",
          "Track obligations, changes, and renewals",
          "Present unresolved legal and commercial questions",
        ],
        "Deliver a document index, approval map, obligation register, renewal calendar, and handoff memo.",
        "Present an inspectable contract-administration system without offering legal conclusions.",
      ],
    ],
  },
  "legal-operations-coordinator": {
    entry:
      "Support a legal team's intake, records, reporting, and administrative delivery.",
    requirements: [
      "Careful writing, spreadsheet skills, and discretion with sensitive material.",
      "Employers may require legal-services experience or specialist training. The role supports qualified legal professionals and does not authorize legal advice.",
    ],
    modules: [
      [
        "Legal operations and request intake",
        [
          "Identify request type, owner, and urgency",
          "Collect only necessary administrative information",
          "Recognize legal judgment requiring an attorney",
        ],
        "Triage a fictional legal-intake queue using supplied routing rules.",
        "Route legal-team requests without substituting administrative judgment for legal advice.",
      ],
      [
        "Matter and document organization",
        [
          "Maintain matter identifiers and metadata",
          "Use access-controlled folders and naming rules",
          "Track versions and review status",
        ],
        "Organize a synthetic matter folder and document register.",
        "Maintain a findable matter record with clear access and version controls.",
      ],
      [
        "Workflows and approvals",
        [
          "Map review and signature steps",
          "Track deadlines and dependencies",
          "Record approvals without assuming authority",
        ],
        "Create a fictional request workflow and escalation checklist.",
        "Coordinate legal-team work with explicit approvals and deadline ownership.",
      ],
      [
        "Spend and vendor administration",
        [
          "Match invoices to approved matters and terms",
          "Flag inconsistent billing entries",
          "Track vendor documentation and approvals",
        ],
        "Review synthetic legal invoices and prepare an exception log.",
        "Support legal-spend review with accurate records and clear exception handling.",
      ],
      [
        "Reporting and confidentiality",
        [
          "Build useful workload and turnaround reports",
          "Restrict sensitive reporting fields",
          "Escalate suspected disclosure or access issues",
        ],
        "Create a fictional operations dashboard with a field-access matrix.",
        "Report legal operational activity while limiting unnecessary disclosure.",
      ],
      [
        "Capstone: a legal operations pack",
        [
          "Manage synthetic intake and matter records",
          "Review a billing and deadline scenario",
          "Present a process and reporting handoff",
        ],
        "Deliver an intake tracker, matter register, workflow map, invoice exceptions, and confidentiality checklist.",
        "Present a coordinated legal-team support workflow with clear professional boundaries.",
      ],
    ],
  },
  "compliance-specialist": {
    entry:
      "Organize obligations, control evidence, monitoring, and escalation for qualified compliance owners.",
    requirements: [
      "Strong reading, documentation, and spreadsheet skills; sector knowledge is important.",
      "Professional requirements depend on industry and jurisdiction and may include degrees, credentials, or experience. This plan does not provide a legal compliance determination.",
    ],
    modules: [
      [
        "Compliance scope and sources",
        [
          "Distinguish laws, policies, standards, and procedures",
          "Identify qualified owners and authoritative sources",
          "Document applicability questions for review",
        ],
        "Create a source and responsibility register for a fictional organization.",
        "Identify compliance sources and route applicability questions to qualified owners.",
      ],
      [
        "Risk and obligation mapping",
        [
          "Translate supplied requirements into a register",
          "Assign owners, review dates, and evidence",
          "Prioritize risks using documented criteria",
        ],
        "Build a fictional obligation and risk register from supplied policy excerpts.",
        "Map requirements to owners, evidence, and review checkpoints.",
      ],
      [
        "Control design and documentation",
        [
          "Separate preventive and detective controls",
          "Write a usable control procedure",
          "Define evidence of operation and exceptions",
        ],
        "Document a mock access-review control and its supporting evidence checklist.",
        "Describe how a control operates and what evidence would support its effectiveness.",
      ],
      [
        "Monitoring and testing",
        [
          "Choose a documented sample and review method",
          "Record observations without overstating assurance",
          "Distinguish a finding from an unverified concern",
        ],
        "Review synthetic control evidence and write a traceable testing record.",
        "Evaluate sample control evidence with clear methods and limitations.",
      ],
      [
        "Issues and remediation",
        [
          "Write an issue with evidence and impact",
          "Assign actions, owners, and deadlines",
          "Verify closure and escalate overdue risks",
        ],
        "Build a remediation tracker and evaluate a fictional closure submission.",
        "Track a compliance issue from evidence to verified remediation.",
      ],
      [
        "Reporting and training coordination",
        [
          "Prepare a concise risk update",
          "Translate procedures into practical staff guidance",
          "Protect sensitive investigation information",
        ],
        "Draft an internal guidance note and a sample compliance status report.",
        "Communicate compliance actions clearly without claiming unsupported legal certainty.",
      ],
      [
        "Capstone: a compliance review pack",
        [
          "Assemble requirements, controls, and test evidence",
          "Present findings and remediation priorities",
          "Document specialist-review questions and limitations",
        ],
        "Deliver a fictional obligation register, control description, testing log, remediation plan, and review memo.",
        "Present an auditable compliance-support review with explicit scope and unresolved questions.",
      ],
    ],
  },
};
