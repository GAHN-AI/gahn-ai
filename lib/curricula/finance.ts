import type { CareerCourseDraft } from "./types";

export const financeCourses: Record<string, CareerCourseDraft> = {
  bookkeeper: {
    entry:
      "Practice accurate transaction records, reconciliations, and an orderly monthly close.",
    requirements: [
      "Basic arithmetic, spreadsheet skills, and attention to detail.",
      "Real bookkeeping work requires approved access, supervision, and jurisdiction-specific tax and payroll guidance. All practice records are fictional.",
    ],
    modules: [
      [
        "Bookkeeping foundations",
        [
          "Distinguish assets, liabilities, equity, income, and expenses",
          "Use debits and credits in simple transactions",
          "Choose accounts from a chart of accounts",
        ],
        "Record ten fictional transactions and check that the entries balance.",
        "Record basic transactions using a consistent chart of accounts and balanced entries.",
      ],
      [
        "Sales, bills, and source documents",
        [
          "Match invoices and receipts to entries",
          "Track accounts receivable and payable",
          "Identify missing or duplicate documents",
        ],
        "Build an invoice and bill register with an exception list.",
        "Maintain transaction records linked to supporting source documents.",
      ],
      [
        "Bank reconciliation",
        [
          "Match statement lines to ledger entries",
          "Identify timing differences and duplicates",
          "Investigate an unexplained variance",
        ],
        "Reconcile a synthetic bank statement and document unresolved differences.",
        "Reconcile a bank balance without inventing entries to force agreement.",
      ],
      [
        "Close and reporting",
        [
          "Prepare a month-end checklist",
          "Review accrual and adjustment examples",
          "Read a basic income statement and balance sheet",
        ],
        "Prepare a sample close pack and flag items needing an accountant's review.",
        "Prepare a close checklist and explain the meaning of basic financial reports.",
      ],
      [
        "Controls and client communication",
        [
          "Separate entry, approval, and payment duties",
          "Protect financial records and access",
          "Ask a client for missing information clearly",
        ],
        "Write an unsent request for missing documents and an approval-control map.",
        "Explain exceptions and maintain clear boundaries around financial approvals.",
      ],
      [
        "Capstone: a fictional monthly close",
        [
          "Organize source documents and post entries",
          "Complete reconciliations and exception checks",
          "Present reports and a handoff memo",
        ],
        "Deliver a ledger, document index, reconciliations, close checklist, and unresolved-item memo.",
        "Present an auditable bookkeeping cycle with accurate records and transparent exceptions.",
      ],
    ],
  },
  accountant: {
    entry:
      "Develop accounting analysis and financial-report preparation using fictional company records.",
    requirements: [
      "Bookkeeping fundamentals and spreadsheet competence are expected.",
      "Many accounting roles require a degree or equivalent training. This pathway does not grant a CPA license or authority to provide regulated services.",
    ],
    modules: [
      [
        "Accounting framework and evidence",
        [
          "Connect transactions to financial statements",
          "Distinguish cash and accrual examples",
          "Document accounting-policy questions",
        ],
        "Map a fictional company's transaction cycle and reporting requirements.",
        "Explain how transaction evidence flows into financial statements.",
      ],
      [
        "Journal entries and trial balances",
        [
          "Prepare and review journal entries",
          "Investigate unbalanced or misclassified entries",
          "Reconcile subsidiary and general ledgers",
        ],
        "Correct a supplied trial balance with an adjustment log.",
        "Prepare and reconcile a trial balance with traceable adjustments.",
      ],
      [
        "Revenue and expense timing",
        [
          "Analyze simple deferred and accrued items",
          "Distinguish policy from unsupported assumptions",
          "Identify matters requiring expert interpretation",
        ],
        "Prepare a schedule of sample accruals and deferrals for review.",
        "Explain the timing and evidence behind routine accrual and deferral entries.",
      ],
      [
        "Assets and liabilities",
        [
          "Prepare fixed-asset and depreciation schedules",
          "Reconcile receivables and payables",
          "Review supporting schedules for liabilities",
        ],
        "Build a fictional asset roll-forward and investigate a reconciliation difference.",
        "Support balance-sheet accounts with reconciled schedules.",
      ],
      [
        "Financial statements and analysis",
        [
          "Assemble linked statement schedules",
          "Analyze changes and financial ratios",
          "Write notes explaining material movements",
        ],
        "Prepare a sample reporting pack with linked calculations and variance notes.",
        "Explain financial movements using reconciled statements and explicit assumptions.",
      ],
      [
        "Internal controls and review",
        [
          "Document approval and segregation controls",
          "Create a supporting-document trail",
          "Respond to review queries professionally",
        ],
        "Review a mock close file for missing approvals and unsupported adjustments.",
        "Identify control and documentation weaknesses in a financial close.",
      ],
      [
        "Tax and audit coordination",
        [
          "Organize records for a qualified tax or audit professional",
          "Track requests, versions, and deadlines",
          "Separate administrative preparation from regulated advice",
        ],
        "Create a fictional information-request tracker without preparing a real filing.",
        "Prepare an orderly financial evidence pack for specialist review.",
      ],
      [
        "Capstone: an accounting close pack",
        [
          "Complete a fictional period-end review",
          "Present statements and reconciliations",
          "Explain adjustments, risks, and outstanding questions",
        ],
        "Deliver a trial balance, schedules, linked statements, review log, and management memo.",
        "Present a reviewable accounting close with documented policies and unresolved judgments.",
      ],
    ],
  },
  "financial-analyst": {
    entry:
      "Build a financial model, explain variances, and compare business scenarios.",
    requirements: [
      "Spreadsheet skills, accounting fundamentals, and basic algebra are expected.",
      "Employers commonly seek quantitative education or experience. Exercises are business-analysis practice, not personalized investment or financial advice.",
    ],
    modules: [
      [
        "Business model and analytical scope",
        [
          "Identify revenue and cost drivers",
          "Read statements and operating metrics",
          "Define a decision and model boundaries",
        ],
        "Write a modeling brief for a fictional subscription company.",
        "Identify the operating drivers relevant to a financial decision.",
      ],
      [
        "Spreadsheet model structure",
        [
          "Separate inputs, calculations, and outputs",
          "Use consistent formulas and error checks",
          "Document units, periods, and assumptions",
        ],
        "Create a model template with an assumptions sheet and reconciliation checks.",
        "Build a spreadsheet that another analyst can inspect and update.",
      ],
      [
        "Revenue and expense forecasts",
        [
          "Model customer volume and pricing",
          "Separate fixed and variable costs",
          "Translate operational assumptions into forecasts",
        ],
        "Build a driver-based forecast using synthetic business data.",
        "Create a forecast tied to explicit operating assumptions.",
      ],
      [
        "Cash flow and working capital",
        [
          "Distinguish profit from cash movement",
          "Model receivables, payables, and timing",
          "Identify cash shortfalls and funding assumptions",
        ],
        "Prepare a rolling cash forecast and identify its most sensitive inputs.",
        "Explain how operating timing affects cash availability.",
      ],
      [
        "Variance and scenario analysis",
        [
          "Compare actuals, budget, and prior periods",
          "Separate price, volume, and mix effects",
          "Build downside, base, and upside scenarios",
        ],
        "Analyze a fictional monthly variance and produce a sensitivity table.",
        "Explain financial changes and scenario sensitivity without presenting forecasts as certainty.",
      ],
      [
        "Business cases and review",
        [
          "Compare incremental costs and benefits",
          "Document timing and discount-rate assumptions",
          "Stress-test conclusions and check formulas",
        ],
        "Evaluate a fictional software purchase and document the decision's assumptions.",
        "Assess a business case using transparent calculations and risk assumptions.",
      ],
      [
        "Stakeholder communication",
        [
          "Write a concise financial narrative",
          "Use clear charts and reconciled figures",
          "Respond to a challenged assumption",
        ],
        "Prepare a five-slide or one-page review for a nonfinancial manager.",
        "Communicate financial analysis in terms a decision maker can inspect and question.",
      ],
      [
        "Capstone: a planning and analysis pack",
        [
          "Integrate forecasts, cash flow, and scenarios",
          "Run model integrity checks",
          "Present a recommendation and caveats",
        ],
        "Deliver a linked model, assumptions register, variance analysis, and management memo.",
        "Present a traceable financial model with realistic scenarios and explicit limitations.",
      ],
    ],
  },
  "investment-analyst": {
    entry:
      "Research a fictional investment case and explain valuation assumptions and risks.",
    requirements: [
      "Accounting, financial modeling, spreadsheet, and statistics foundations are expected.",
      "Professional investment work may require degrees, experience, registration, or licenses. Practice does not authorize investment advice or securities activity.",
    ],
    modules: [
      [
        "Research mandate and information quality",
        [
          "Define an investment question and time horizon",
          "Identify primary filings and credible evidence",
          "Separate fact, forecast, and opinion",
        ],
        "Create a research plan for a fictional publicly reported business.",
        "Define a research mandate and maintain a source-backed evidence trail.",
      ],
      [
        "Business and industry analysis",
        [
          "Explain revenue drivers and competitive position",
          "Analyze industry structure and dependencies",
          "Identify customer, supplier, and regulatory risks",
        ],
        "Write a business-model and risk overview from supplied materials.",
        "Explain how business and industry conditions affect an investment thesis.",
      ],
      [
        "Financial statement review",
        [
          "Assess earnings quality and cash conversion",
          "Normalize clearly identified unusual items",
          "Compare leverage, margins, and working capital",
        ],
        "Review fictional statements and flag assumptions requiring further investigation.",
        "Analyze financial quality without hiding adjustments or uncertainty.",
      ],
      [
        "Valuation methods",
        [
          "Build a simple discounted-cash-flow model",
          "Compare multiples using consistent definitions",
          "Explain terminal and discount-rate assumptions",
        ],
        "Compare two valuation methods on a synthetic company dataset.",
        "Explain why valuation results depend on method, comparables, and assumptions.",
      ],
      [
        "Risk and scenario analysis",
        [
          "Stress-test growth, margins, and financing",
          "Distinguish volatility from permanent-loss scenarios",
          "Describe evidence that would invalidate a thesis",
        ],
        "Write a downside scenario and an explicit thesis-change checklist.",
        "Evaluate an investment thesis against plausible downside and disconfirming evidence.",
      ],
      [
        "Research ethics and communication",
        [
          "Handle conflicts and information boundaries",
          "Write balanced research with clear caveats",
          "Respond to a skeptical committee",
        ],
        "Review a mock research note for unsupported claims and undisclosed conflicts.",
        "Present balanced investment research with clear sources, conflicts, and limits.",
      ],
      [
        "Capstone: a research memorandum",
        [
          "Assemble business, financial, and valuation evidence",
          "Present scenarios and risks",
          "Defend a fictional case without promising returns",
        ],
        "Deliver a source log, model, thesis, downside case, and committee-style question responses.",
        "Present an inspectable investment-research case without treating uncertain returns as guaranteed.",
      ],
    ],
  },
  "credit-analyst": {
    entry:
      "Review a fictional credit application, assess repayment risks, and write a reasoned memo.",
    requirements: [
      "Financial statements, spreadsheet calculations, and basic business numeracy are expected.",
      "Real credit decisions require employer authority and applicable lending, fairness, privacy, and regulatory review.",
    ],
    modules: [
      [
        "Credit purpose and application evidence",
        [
          "Identify borrower, purpose, and requested terms",
          "Check completeness and document sources",
          "Protect personal and financial information",
        ],
        "Build an evidence checklist for a fictional small-business application.",
        "Identify the evidence needed to review a credit request responsibly.",
      ],
      [
        "Financial capacity analysis",
        [
          "Read income, balance-sheet, and cash-flow information",
          "Calculate leverage and coverage ratios",
          "Investigate inconsistencies and unusual trends",
        ],
        "Calculate and reconcile ratios from synthetic borrower statements.",
        "Assess repayment capacity using reconciled financial evidence.",
      ],
      [
        "Cash flow and sensitivity",
        [
          "Estimate operating cash available for repayment",
          "Model seasonal and stress scenarios",
          "Document assumptions and missing information",
        ],
        "Stress-test a fictional borrower's cash flow under two adverse scenarios.",
        "Explain how changed operating assumptions affect repayment capacity.",
      ],
      [
        "Risk structure and controls",
        [
          "Distinguish collateral from repayment ability",
          "Review proposed covenants and monitoring",
          "Identify exceptions requiring approval",
        ],
        "Prepare a risk matrix and questions for a qualified credit officer.",
        "Identify credit risks, potential mitigations, and issues outside your approval authority.",
      ],
      [
        "Fairness and decision documentation",
        [
          "Apply consistent documented criteria",
          "Separate evidence from unsupported personal judgments",
          "Write a clear rationale and escalation note",
        ],
        "Review two fictional cases for inconsistent reasoning and missing evidence.",
        "Document a credit analysis using consistent criteria and traceable reasoning.",
      ],
      [
        "Capstone: a fictional credit memo",
        [
          "Present the request and financial analysis",
          "Explain risks, conditions, and monitoring",
          "Respond to a reviewer's challenge",
        ],
        "Deliver a source checklist, ratio workbook, stress scenarios, and review-ready credit memo.",
        "Present a credit case with evidence, uncertainty, and appropriate approval boundaries.",
      ],
    ],
  },
  "insurance-underwriter": {
    entry:
      "Practice reviewing fictional applications against documented underwriting guidelines.",
    requirements: [
      "Strong reading, numeracy, and spreadsheet skills; insurance terminology is introduced.",
      "Actual underwriting may require licensing, employer training, and delegated authority. The pathway does not authorize binding coverage or pricing real risks.",
    ],
    modules: [
      [
        "Insurance and underwriting scope",
        [
          "Distinguish application, quote, policy, and claim",
          "Identify coverage terms and exclusions",
          "Understand authority and escalation boundaries",
        ],
        "Create a terminology and authority map for a fictional product.",
        "Explain an underwriting workflow without promising coverage or exceeding delegated authority.",
      ],
      [
        "Application review",
        [
          "Check completeness and supporting documents",
          "Identify inconsistent disclosures",
          "Request clarification through approved channels",
        ],
        "Review a synthetic application and prepare a missing-information request.",
        "Review an application systematically and document unresolved information.",
      ],
      [
        "Risk assessment",
        [
          "Apply documented risk factors",
          "Read sample loss and exposure information",
          "Distinguish evidence from unsupported assumptions",
        ],
        "Compare three fictional risks using the same supplied guideline.",
        "Assess fictional risks consistently against an explicit underwriting guide.",
      ],
      [
        "Terms, pricing, and referrals",
        [
          "Read a sample rating worksheet",
          "Identify terms requiring specialist approval",
          "Document exceptions and referral reasons",
        ],
        "Complete a fictional worksheet and refer cases outside the sample authority limit.",
        "Explain a proposed underwriting decision and identify required approvals.",
      ],
      [
        "Portfolio and communication",
        [
          "Review sample loss and renewal trends",
          "Write a clear broker or internal update",
          "Protect records and maintain an audit trail",
        ],
        "Draft an unsent renewal-review note supported by a sample risk history.",
        "Communicate underwriting reasoning with accurate records and privacy safeguards.",
      ],
      [
        "Capstone: an underwriting case file",
        [
          "Assess a complete synthetic application",
          "Document terms, risks, and referral points",
          "Present a review-ready recommendation",
        ],
        "Deliver an application checklist, risk analysis, worksheet, and decision or referral rationale.",
        "Present a fictional underwriting case with consistent criteria and clear authority limits.",
      ],
    ],
  },
};
