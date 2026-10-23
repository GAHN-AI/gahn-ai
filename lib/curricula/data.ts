import type { CareerCourseDraft } from "./types";

export const dataCourses: Record<string, CareerCourseDraft> = {
  "data-analyst": {
    entry:
      "Answer a business question with clean data, SQL, spreadsheets, and a readable report.",
    requirements: [
      "Comfort with spreadsheets and basic arithmetic; SQL is introduced in the pathway.",
      "Employers may require a degree, domain knowledge, a portfolio, or analytical assessments.",
    ],
    modules: [
      [
        "Frame an analytical question",
        [
          "Identify a decision and its stakeholders",
          "Define metrics and their denominators",
          "Separate observations from causal claims",
        ],
        "Write a metric brief for a fictional online shop.",
        "Define a business question and metrics that can actually answer it.",
      ],
      [
        "Spreadsheets and data checks",
        [
          "Use formulas, filters, and pivot tables",
          "Identify duplicates, missing values, and inconsistent dates",
          "Keep a cleaning log and preserve raw data",
        ],
        "Clean a sample order file and reconcile row and revenue totals.",
        "Clean a dataset while preserving an audit trail and validating totals.",
      ],
      [
        "SQL foundations",
        [
          "Filter and sort records",
          "Group data and calculate aggregates",
          "Join tables without inflating counts",
        ],
        "Query customers and orders and explain the grain of each result.",
        "Write SQL joins and aggregations that respect the dataset's level of detail.",
      ],
      [
        "Explore patterns responsibly",
        [
          "Compare distributions and summary statistics",
          "Segment results and inspect outliers",
          "Recognize small samples and misleading comparisons",
        ],
        "Investigate a sales decline using segments and explicit caveats.",
        "Distinguish a supported pattern from an explanation the data cannot establish.",
      ],
      [
        "Charts and dashboards",
        [
          "Match chart types to questions",
          "Label axes, units, and reference periods",
          "Design useful filters and accessible color choices",
        ],
        "Build a dashboard answering three stakeholder questions.",
        "Create charts that communicate a specific comparison without distorting it.",
      ],
      [
        "Communicate findings",
        [
          "Write a short evidence-based recommendation",
          "Explain uncertainty and missing data",
          "Respond to a stakeholder challenge",
        ],
        "Prepare a one-page findings memo linked to reproducible calculations.",
        "Explain a recommendation with traceable numbers and clear limitations.",
      ],
      [
        "Capstone: a shop performance review",
        [
          "Combine cleaning, SQL, and visualization",
          "Reconcile calculations across the workflow",
          "Present an analysis and handoff notes",
        ],
        "Deliver a cleaned dataset, SQL queries, dashboard, and decision memo.",
        "Present a reproducible business analysis with validated totals and useful next steps.",
      ],
    ],
  },
  "data-scientist": {
    entry:
      "Move from exploratory analysis to a validated predictive study with explicit uncertainty.",
    requirements: [
      "Prior Python, SQL, probability, and introductory statistics knowledge is expected.",
      "Many roles require substantial quantitative training and domain experience. A course preview does not substitute for those requirements.",
    ],
    modules: [
      [
        "Problem framing and study design",
        [
          "Define prediction and decision targets",
          "Identify data availability and selection bias",
          "Choose a baseline and success metric",
        ],
        "Write a study proposal for predicting repeat purchases from synthetic data.",
        "Frame a measurable data-science problem with a justified baseline.",
      ],
      [
        "Python data workflows",
        [
          "Inspect tables with pandas",
          "Create reproducible cleaning and feature steps",
          "Track dataset versions and assumptions",
        ],
        "Build a cleaning notebook and a reproducible data dictionary.",
        "Prepare a reproducible dataset with documented transformations.",
      ],
      [
        "Statistical reasoning",
        [
          "Compare distributions and uncertainty intervals",
          "Formulate and critique a hypothesis test",
          "Recognize confounding and multiple comparisons",
        ],
        "Interpret a sample experiment and discuss what its evidence cannot prove.",
        "Interpret statistical evidence without overstating significance or causation.",
      ],
      [
        "Exploration and feature design",
        [
          "Analyze missingness and outliers",
          "Build features available at prediction time",
          "Check label quality and potential leakage",
        ],
        "Identify and remove a deliberately leaked future-outcome feature.",
        "Design features without exposing future information to the model.",
      ],
      [
        "Supervised learning",
        [
          "Compare regression and classification tasks",
          "Train simple linear and tree baselines",
          "Separate training, validation, and test data",
        ],
        "Train two baselines and record their evaluation protocols.",
        "Train and compare baseline models using an appropriate data split.",
      ],
      [
        "Model evaluation",
        [
          "Choose metrics for imbalanced outcomes",
          "Use cross-validation without contaminating the test set",
          "Inspect subgroup and error behavior",
        ],
        "Compare threshold choices and the costs of false positives and false negatives.",
        "Explain a model's errors using decision-relevant evaluation metrics.",
      ],
      [
        "Unsupervised and time-dependent data",
        [
          "Explore clustering and its limitations",
          "Recognize temporal dependence",
          "Use time-aware validation when appropriate",
        ],
        "Compare random and time-based splits for a synthetic demand dataset.",
        "Choose an evaluation approach that respects how data was collected.",
      ],
      [
        "Experiments and decisions",
        [
          "Design a controlled product experiment",
          "Define guardrail metrics",
          "Communicate uncertainty to decision makers",
        ],
        "Create an experiment plan with assumptions, sample considerations, and stop criteria.",
        "Propose an experiment with useful outcomes and explicit limitations.",
      ],
      [
        "Reproducibility and responsible use",
        [
          "Document provenance and consent assumptions",
          "Write a model and dataset summary",
          "Plan drift and performance monitoring",
        ],
        "Write a model card explaining intended use and unsupported uses.",
        "Document a model's intended use, data limitations, and monitoring needs.",
      ],
      [
        "Capstone: a predictive study",
        [
          "Build a reproducible modeling workflow",
          "Present baseline comparisons and error analysis",
          "Recommend whether the model should be used",
        ],
        "Deliver code, data documentation, a held-out evaluation, and a stakeholder report.",
        "Defend a predictive study using reproducible evidence rather than a single accuracy score.",
      ],
    ],
  },
  "machine-learning-engineer": {
    entry:
      "Build, evaluate, serve, and monitor a small machine-learning system.",
    requirements: [
      "Python software development, statistics, linear algebra, SQL, and basic model training are expected.",
      "ML engineering is typically an advanced role. Production jobs often require a degree or equivalent experience with software and data systems.",
    ],
    modules: [
      [
        "Define the ML system",
        [
          "Separate product objectives from model metrics",
          "Specify latency, reliability, and resource constraints",
          "Decide when a rules-based baseline is enough",
        ],
        "Write a system brief for a synthetic support-ticket classifier.",
        "Specify when an ML system is useful and how its success will be measured.",
      ],
      [
        "Reproducible data pipelines",
        [
          "Validate schemas and data quality",
          "Version datasets and transformations",
          "Prevent training-serving feature differences",
        ],
        "Build a repeatable pipeline from sample tickets to model-ready features.",
        "Create a validated pipeline with consistent training and inference transformations.",
      ],
      [
        "Baseline training",
        [
          "Train simple models before complex ones",
          "Choose splits that prevent leakage",
          "Record parameters, code versions, and results",
        ],
        "Compare a majority-class baseline with a simple classifier.",
        "Establish a reproducible baseline before optimizing model complexity.",
      ],
      [
        "Optimization and generalization",
        [
          "Interpret learning curves",
          "Tune parameters using validation data",
          "Control overfitting and class imbalance",
        ],
        "Compare regularization and sampling choices without touching the held-out test set.",
        "Use validation evidence to diagnose overfitting and choose model settings.",
      ],
      [
        "Neural-network foundations",
        [
          "Trace tensors, forward passes, and gradients",
          "Build a small neural model",
          "Inspect checkpoints and failed training runs",
        ],
        "Train a small local model and explain a failed or unstable run.",
        "Explain a neural training loop and diagnose basic training failures.",
      ],
      [
        "Evaluation and error analysis",
        [
          "Measure precision, recall, and calibration",
          "Inspect subgroup performance and failure clusters",
          "Define an abstention or human-review rule",
        ],
        "Audit classifier errors and choose a review threshold for uncertain tickets.",
        "Evaluate model failures and design a safe response to uncertain predictions.",
      ],
      [
        "Package and serve a model",
        [
          "Separate training code from inference code",
          "Validate inference inputs and outputs",
          "Expose a local prediction endpoint",
        ],
        "Build a local model API with input limits and useful errors.",
        "Serve a versioned model through a validated inference interface.",
      ],
      [
        "Test ML behavior",
        [
          "Test transformations and API contracts",
          "Compare models against a fixed evaluation set",
          "Check malformed, extreme, and shifted inputs",
        ],
        "Create a release gate that rejects a regressed candidate model.",
        "Test the software and evaluation boundaries of an ML release.",
      ],
      [
        "Deployment and observability",
        [
          "Plan shadow or staged rollout",
          "Monitor latency, errors, and distribution drift",
          "Define rollback and retraining triggers",
        ],
        "Write a rollout and rollback plan using simulated monitoring signals.",
        "Plan model deployment with monitoring signals and explicit rollback conditions.",
      ],
      [
        "Security, privacy, and cost",
        [
          "Limit sensitive data collection and retention",
          "Inspect model and dependency provenance",
          "Estimate inference and storage costs",
        ],
        "Review a fictional ML service for data exposure and unbounded compute.",
        "Identify data, supply-chain, and resource risks in an ML service.",
      ],
      [
        "Technical collaboration",
        [
          "Write a model-change proposal",
          "Review an experiment with a product owner",
          "Document supported and unsupported use cases",
        ],
        "Defend a model change with quality, latency, and cost evidence.",
        "Explain an ML trade-off to engineering and product stakeholders.",
      ],
      [
        "Capstone: a ticket-routing system",
        [
          "Connect pipeline, model, API, and evaluation",
          "Demonstrate uncertainty handling and rollback",
          "Hand over a model card and operational runbook",
        ],
        "Deliver a local service, reproducible training code, evaluation report, monitoring plan, and review workflow.",
        "Present an ML system whose software, data, evaluation, and operating assumptions can be inspected.",
      ],
    ],
  },
  "business-intelligence-analyst": {
    entry:
      "Model business data and build dashboards with agreed definitions and reliable refresh checks.",
    requirements: [
      "Spreadsheet skills and introductory SQL are helpful.",
      "BI roles may require familiarity with a specific reporting platform and the employer's business domain.",
    ],
    modules: [
      [
        "Stakeholders and KPI definitions",
        [
          "Clarify reporting decisions and audiences",
          "Write metric definitions and ownership",
          "Document reporting grain and refresh expectations",
        ],
        "Create a KPI dictionary for a fictional subscription service.",
        "Agree on precise reporting metrics before building a dashboard.",
      ],
      [
        "SQL and reconciliation",
        [
          "Join transactional and reference tables",
          "Calculate period and cohort metrics",
          "Reconcile totals against source records",
        ],
        "Build revenue and retention queries and check their denominators.",
        "Calculate business metrics with traceable SQL and reconciled totals.",
      ],
      [
        "Data modeling",
        [
          "Separate fact and dimension tables",
          "Choose keys and relationships",
          "Avoid ambiguous filters and double counting",
        ],
        "Design a small star schema for orders, customers, and products.",
        "Model reporting data with a clear grain and predictable relationships.",
      ],
      [
        "Dashboard calculations",
        [
          "Create measures and calculated fields",
          "Handle dates, missing values, and comparison periods",
          "Test filter context and drill-down behavior",
        ],
        "Build a sample BI report with period comparisons and tested filters.",
        "Create reporting calculations that remain correct under filters.",
      ],
      [
        "Visual design and accessibility",
        [
          "Match charts to stakeholder questions",
          "Prioritize information and use consistent labels",
          "Review contrast and color-independent meaning",
        ],
        "Redesign a cluttered dashboard around three decisions.",
        "Design a readable dashboard that supports specific business decisions.",
      ],
      [
        "Refresh, permissions, and handoff",
        [
          "Validate refresh and data-quality checks",
          "Define row-level access expectations",
          "Document report owners and changes",
        ],
        "Write a report runbook and a sample access-control test matrix.",
        "Document how a report is refreshed, checked, and shared appropriately.",
      ],
      [
        "Capstone: a management reporting pack",
        [
          "Build a modeled dashboard from sample data",
          "Reconcile measures and test access assumptions",
          "Present findings and a maintenance guide",
        ],
        "Deliver a KPI dictionary, data model, dashboard, reconciliation log, and handoff guide.",
        "Present a maintainable reporting solution with agreed definitions and tested calculations.",
      ],
    ],
  },
  "ai-automation-specialist": {
    entry:
      "Design bounded automations with validation, human review, and visible failure handling.",
    requirements: [
      "Comfort with spreadsheets and workflow tools; basic APIs and scripting are introduced.",
      "Real deployments require permission to access business systems and an approved provider budget. Practice uses mock services and synthetic data.",
    ],
    modules: [
      [
        "Map a workflow before automating it",
        [
          "Identify triggers, decisions, and outputs",
          "Separate deterministic steps from AI judgments",
          "Choose tasks requiring human approval",
        ],
        "Map a fictional intake-to-task workflow with a manual fallback.",
        "Identify which workflow steps can be automated and which need human review.",
      ],
      [
        "Data and integration basics",
        [
          "Read JSON and API request examples",
          "Validate required fields and identifiers",
          "Use least-privilege credentials and environment configuration",
        ],
        "Connect two local mock services with a validated payload.",
        "Connect workflow steps with explicit data schemas and access boundaries.",
      ],
      [
        "Structured AI outputs",
        [
          "Write task-specific instructions and examples",
          "Validate generated output against a schema",
          "Reject unsupported or untrusted actions",
        ],
        "Classify synthetic requests and route invalid outputs to manual review.",
        "Validate AI output before it can trigger a business action.",
      ],
      [
        "Trusted knowledge and retrieval",
        [
          "Select approved reference material",
          "Track sources and handle missing evidence",
          "Recognize instructions embedded in untrusted content",
        ],
        "Build a mock knowledge lookup that cites approved documents and abstains when evidence is missing.",
        "Design a knowledge workflow with source tracking and an uncertainty path.",
      ],
      [
        "Reliability and approval gates",
        [
          "Use idempotency to prevent duplicate actions",
          "Bound retries and preserve failed jobs",
          "Require approval before messages, purchases, or record changes",
        ],
        "Replay a failed workflow and show that it does not create duplicate tasks.",
        "Build bounded retries and approval checks into an automation design.",
      ],
      [
        "Evaluate quality and cost",
        [
          "Build a representative test set",
          "Measure false classifications and recovery cases",
          "Estimate request volume, latency, and provider costs",
        ],
        "Compare two workflow designs using a synthetic evaluation table.",
        "Assess an automation using error, latency, and cost evidence.",
      ],
      [
        "Operate and document",
        [
          "Log decisions without collecting unnecessary personal data",
          "Define incident alerts and a kill switch",
          "Write a clear owner handoff",
        ],
        "Create an operating checklist for a failed or suspicious job.",
        "Document who owns an automation and how to stop or recover it.",
      ],
      [
        "Capstone: a reviewed intake workflow",
        [
          "Assemble intake, validation, routing, and approval",
          "Demonstrate duplicate and malformed input handling",
          "Present evaluation results and limits",
        ],
        "Deliver a local workflow prototype, test cases, schema, approval map, and cost assumptions.",
        "Present an inspectable automation that keeps consequential actions under appropriate human control.",
      ],
    ],
  },
};
