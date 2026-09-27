export type MvpPathSection = {
  title: string;
  description: string;
  lessons: string[];
};

export type MvpLearningPath = {
  whatYouLearn: string[];
  skills: string[];
  resources: string[];
  sections: MvpPathSection[];
  requirementNote?: string;
};

type SectionInput = [title: string, lessons: string[]];

function buildSections(inputs: SectionInput[]): MvpPathSection[] {
  return inputs.map(([title, lessons]) => ({
    title,
    description: `Learn ${lessons.join(", ")}.`,
    lessons,
  }));
}

function makePath(
  skills: string[],
  resources: string[],
  inputs: SectionInput[],
  requirementNote?: string
): MvpLearningPath {
  const sections = buildSections(inputs);
  return {
    whatYouLearn: sections.slice(0, 6).map((item) => item.description),
    skills,
    resources,
    sections,
    requirementNote,
  };
}

const careerPaths: Record<string, MvpLearningPath> = {
  Entrepreneurship: makePath(
    [
      "Customer Research",
      "Business Models",
      "MVP Planning",
      "Pricing",
      "Sales",
      "Marketing",
      "Cash Flow",
      "AI Workflows",
      "Product Building",
      "Growth Metrics",
    ],
    [
      "VS Code",
      "GitHub",
      "AI Coding Assistant",
      "Next.js",
      "Supabase",
      "Stripe",
      "Vercel",
      "PostHog",
      "Spreadsheets",
    ],
    [
      [
        "Choose the Business You Want to Build",
        [
          "SaaS: sell software by subscription",
          "One-product business: sell one focused product",
          "Retail and e-commerce: sell physical products",
          "Service business: sell a skill or service",
          "Marketplace: connect buyers and sellers",
          "Action: choose one business model and explain why",
        ],
      ],
      [
        "Find a Real Problem and Customer",
        [
          "Pick a specific customer instead of everyone",
          "Find painful problems people already try to solve",
          "Interview potential customers without pitching",
          "Study competitors and current alternatives",
          "Write a clear problem statement",
          "Action: complete 5 customer conversations",
        ],
      ],
      [
        "Turn the Problem Into an Offer",
        [
          "Write the result your customer is paying for",
          "Choose the smallest useful product or service",
          "Create a simple value proposition",
          "Set an early price and explain the value",
          "Decide what is included and what is not",
          "Action: create your first offer",
        ],
      ],
      [
        "Build an MVP With Modern AI Tools",
        [
          "What an MVP is and what not to build yet",
          "Use AI to turn product requirements into small tasks",
          "Use VS Code to open, edit, run, and debug a project",
          "Use Git and GitHub to save and manage code",
          "Build a web app with Next.js",
          "Use Supabase for accounts and data",
          "Use Stripe for payments",
          "Deploy the product with Vercel",
          "Action: ship one working customer flow",
        ],
      ],
      [
        "Use AI Like a Professional Builder",
        [
          "Give AI clear requirements instead of vague prompts",
          "Ask AI to explain code before accepting changes",
          "Break large features into small testable tasks",
          "Check AI output for bugs, security problems, and made-up answers",
          "Use AI for research, support, writing, analysis, and coding",
          "Keep human judgment for product and business decisions",
          "Action: create your own AI workflow for one repeated task",
        ],
      ],
      [
        "Create a Website That Converts",
        [
          "Write a clear headline around the customer problem",
          "Show the product and outcome instead of vague claims",
          "Build a simple pricing page",
          "Add one strong call to action",
          "Collect early-access signups before launch",
          "Action: publish a landing page and collect feedback",
        ],
      ],
      [
        "Get the First Customers",
        [
          "Start with direct outreach instead of paid ads",
          "Find communities where your customer already spends time",
          "Write a short outreach message",
          "Run demos and ask better customer questions",
          "Handle objections without arguing",
          "Ask for the sale or early-access commitment",
          "Action: contact 20 potential users",
        ],
      ],
      [
        "Learn the Numbers That Keep a Business Alive",
        [
          "Revenue, costs, profit, and cash flow",
          "Monthly recurring revenue for SaaS",
          "Customer acquisition cost and payback",
          "Gross margin for software, products, retail, and services",
          "Runway and monthly burn",
          "Break-even point",
          "Action: build a simple business spreadsheet",
        ],
      ],
      [
        "Launch, Measure, and Improve",
        [
          "Choose one launch goal",
          "Track signups, activation, usage, retention, and revenue",
          "Use PostHog or simple analytics to see what users do",
          "Interview users who stop using the product",
          "Improve the biggest problem before adding more features",
          "Action: run a small launch and review the results",
        ],
      ],
      [
        "Grow Without Losing Focus",
        [
          "Know when to improve the product versus add features",
          "Build repeatable sales and marketing channels",
          "Hire only when work truly requires it",
          "Create simple systems for support and operations",
          "Understand bootstrapping, loans, angels, and venture funding",
          "Action: write a 90-day growth plan based on real usage",
        ],
      ],
    ]
  ),

  Leadership: makePath(
    ["Goal Setting", "Decision Making", "Delegation", "Feedback", "Meetings", "Conflict", "Hiring", "Team Communication"],
    ["Google Docs", "Calendar", "Project Board", "AI Assistant", "Spreadsheets"],
    [
      ["Set Direction People Can Follow", ["Turn a big goal into measurable outcomes", "Choose priorities and say no to distractions", "Explain why the work matters", "Action: write a one-page team direction"]],
      ["Make Better Decisions", ["Separate facts from assumptions", "Compare options and tradeoffs", "Decide with incomplete information", "Document important decisions", "Action: make a decision memo"]],
      ["Delegate Work Clearly", ["Choose the right owner", "Explain the result, deadline, and limits", "Avoid micromanaging", "Follow up without taking the work back", "Action: delegate one real task"]],
      ["Run Useful Meetings", ["Write an agenda", "Keep discussion on the decision", "Assign owners and deadlines", "Use AI to summarize notes and action items", "Action: run a 20-minute meeting"]],
      ["Give Feedback and Handle Conflict", ["Give specific feedback with examples", "Listen before responding", "Address missed expectations", "Handle disagreement without personal attacks", "Action: practice a difficult conversation"]],
      ["Build and Manage a Team", ["Define a role before hiring", "Interview for evidence, not confidence", "Set expectations during onboarding", "Track performance with clear outcomes", "Action: write a scorecard for one role"]],
    ]
  ),

  Communication: makePath(
    ["Clear Writing", "Speaking", "Listening", "Presentations", "Email", "Negotiation", "Storytelling", "AI Editing"],
    ["Google Docs", "Slides", "Email", "AI Assistant", "Video Recording"],
    [
      ["Say What You Mean Clearly", ["Lead with the main point", "Remove unnecessary words", "Explain complex ideas in plain language", "Action: rewrite a confusing message"]],
      ["Listen and Ask Better Questions", ["Use open and closed questions", "Clarify instead of assuming", "Summarize what you heard", "Action: conduct a 10-minute interview"]],
      ["Write Professional Messages", ["Write clear emails", "Make requests with context and deadlines", "Give updates that are easy to scan", "Use AI to edit without changing your meaning", "Action: create three reusable message templates"]],
      ["Speak With Confidence", ["Structure an answer before speaking", "Control pace and filler words", "Explain ideas without rambling", "Action: record a two-minute explanation"]],
      ["Present Ideas and Tell Stories", ["Open with the problem", "Use evidence and examples", "Build simple slides", "End with a clear next step", "Action: deliver a five-slide presentation"]],
      ["Handle Disagreement and Negotiation", ["Separate people from the problem", "State your interests", "Ask what the other side needs", "Find workable tradeoffs", "Action: role-play a negotiation"]],
    ]
  ),

  Sales: makePath(
    ["Prospecting", "Discovery", "Qualification", "Demos", "Objections", "Closing", "CRM", "Follow-Up"],
    ["CRM", "Email", "LinkedIn", "Calendar", "AI Assistant", "Spreadsheets"],
    [
      ["Know Who You Are Selling To", ["Define the ideal customer", "Find buying signals", "Build a prospect list", "Action: create a list of 25 prospects"]],
      ["Start Conversations", ["Write cold emails that sound human", "Use phone and social outreach", "Personalize with real research", "Use AI for research without sending spam", "Action: send 10 targeted messages"]],
      ["Run Discovery Calls", ["Ask about the current problem", "Find the cost of doing nothing", "Understand decision makers and timing", "Action: run a mock discovery call"]],
      ["Show the Product Around the Customer", ["Plan a short demo", "Connect features to outcomes", "Avoid showing everything", "Action: create a 10-minute demo script"]],
      ["Handle Objections", ["Price objections", "Not-now objections", "Competitor objections", "Trust and risk concerns", "Action: practice five objection responses"]],
      ["Close and Follow Up", ["Ask directly for the next step", "Write a proposal", "Track deals in a CRM", "Follow up without chasing forever", "Action: build a simple sales pipeline"]],
    ]
  ),

  Marketing: makePath(
    ["Positioning", "Customer Research", "Copywriting", "Content", "SEO", "Email", "Analytics", "Conversion"],
    ["Google Trends", "Search Console", "Analytics", "PostHog", "Email Platform", "AI Assistant", "Spreadsheets"],
    [
      ["Understand the Market", ["Choose a customer segment", "Study competitors", "Find what customers already search for", "Action: create a one-page market map"]],
      ["Position the Product", ["Explain who it is for", "Name the problem it solves", "Show why it is different", "Action: write a positioning statement"]],
      ["Write Marketing That Converts", ["Headlines", "Landing-page copy", "Calls to action", "Proof and testimonials", "Use AI to generate options and then edit them", "Action: rewrite one product page"]],
      ["Create Content People Want", ["Choose useful topics", "Write educational posts", "Repurpose one idea across channels", "Action: build a two-week content plan"]],
      ["Get Found Through Search", ["Search intent", "Keywords", "Page titles and headings", "Internal links", "Action: optimize one page for search"]],
      ["Measure and Improve", ["Traffic versus qualified traffic", "Conversion rate", "Activation and retention", "Run simple A/B tests", "Action: create a weekly marketing scorecard"]],
    ]
  ),

  "Personal Finance": makePath(
    ["Budgeting", "Saving", "Banking", "Credit", "Debt", "Taxes", "Insurance", "Retirement"],
    ["Budget Spreadsheet", "Bank Account", "Credit Report", "Retirement Calculator"],
    [
      ["Know Where Your Money Goes", ["Income after taxes", "Fixed and variable expenses", "Build a monthly budget", "Action: track one month of spending"]],
      ["Build an Emergency Fund", ["Choose a savings target", "Automate transfers", "Keep emergency money accessible", "Action: set a savings plan"]],
      ["Use Credit Without Letting It Control You", ["How credit scores work", "Credit cards and interest", "Loans and payment schedules", "Action: calculate the real cost of debt"]],
      ["Pay Down Debt", ["List balances and rates", "Debt avalanche and snowball methods", "Avoid new high-cost debt", "Action: create a payoff schedule"]],
      ["Understand Taxes and Insurance", ["Paychecks and withholding", "Basic tax forms", "Health, auto, renters, and life insurance", "Action: review one real policy or pay stub"]],
      ["Start Long-Term Wealth Building", ["401(k), IRA, and taxable accounts", "Compound growth", "Diversification", "Action: create a long-term savings target"]],
    ]
  ),

  "Investing Basics": makePath(
    ["Stocks", "Bonds", "Funds", "Risk", "Diversification", "Valuation", "Research", "Portfolio Tracking"],
    ["Brokerage Research", "SEC Filings", "Spreadsheets", "Financial Statements", "Calculator"],
    [
      ["Understand What You Can Invest In", ["Stocks", "Bonds", "ETFs and mutual funds", "Cash and money-market funds", "Action: compare four asset types"]],
      ["Understand Risk and Return", ["Volatility", "Permanent loss", "Time horizon", "Risk tolerance", "Action: write your investing rules"]],
      ["Read a Company at a Basic Level", ["Revenue and profit", "Balance sheet", "Cash flow", "Debt", "Action: review one public company"]],
      ["Learn Basic Valuation", ["Price-to-earnings ratio", "Market value", "Growth expectations", "Why a great company can be a bad price", "Action: compare two companies"]],
      ["Build a Diversified Portfolio", ["Asset allocation", "Position size", "Rebalancing", "Fees and taxes", "Action: build a sample portfolio"]],
      ["Research Without Chasing Hype", ["Primary sources", "News versus evidence", "Use AI to organize research but verify every claim", "Avoid emotional buying and selling", "Action: write a one-page investment case"]],
    ],
    "GAHN teaches investing concepts for education. It does not provide personalized investment advice or promise returns."
  ),

  "Resume & Interview Skills": makePath(
    ["Resume Writing", "Achievements", "Interview Answers", "STAR Stories", "Research", "Follow-Up", "Negotiation"],
    ["Google Docs", "LinkedIn", "Job Boards", "AI Assistant", "Video Recording"],
    [
      ["Choose the Job You Are Targeting", ["Read a job description", "Separate required and preferred skills", "Identify evidence from your experience", "Action: pick one target role"]],
      ["Build a Strong Resume", ["Write a clear summary", "Turn duties into achievements", "Use numbers when they are real", "Keep formatting easy to scan", "Action: produce a one-page resume"]],
      ["Use AI Without Making Things Up", ["Tailor wording to a job description", "Keep facts truthful", "Check for fake skills or inflated claims", "Action: create a safe AI resume workflow"]],
      ["Prepare Interview Stories", ["Tell me about yourself", "STAR method", "Leadership and conflict stories", "Mistake and learning stories", "Action: write five interview stories"]],
      ["Practice the Interview", ["Behavioral questions", "Role-specific questions", "Ask strong questions", "Action: record a mock interview"]],
      ["Follow Up and Negotiate", ["Thank-you message", "Evaluate an offer", "Ask about compensation professionally", "Action: write a follow-up and negotiation script"]],
    ]
  ),

  "Project Management": makePath(
    ["Scope", "Planning", "Scheduling", "Risk", "Priorities", "Team Coordination", "Status Updates", "Delivery"],
    ["Notion or Project Board", "Calendar", "Spreadsheets", "GitHub Issues", "AI Assistant"],
    [
      ["Define the Project", ["Write the goal", "Define what is in and out of scope", "Name the people affected", "Action: create a project brief"]],
      ["Break Work Into Tasks", ["Turn outcomes into tasks", "Estimate effort", "Find dependencies", "Action: build a task list"]],
      ["Build the Schedule", ["Set milestones", "Assign owners", "Manage deadlines", "Action: create a simple timeline"]],
      ["Manage Risk and Changes", ["Identify likely problems", "Rank impact and likelihood", "Handle scope changes", "Action: create a risk list"]],
      ["Run the Team Workflow", ["Standups and check-ins", "Status updates", "Decision logs", "Use AI to summarize meetings and surface blockers", "Action: run a weekly review"]],
      ["Ship and Review", ["Check completion criteria", "Launch or hand off", "Review what worked and failed", "Action: write a short project retrospective"]],
    ]
  ),

  "Career Planning": makePath(
    ["Career Research", "Skill Gaps", "Goal Setting", "Learning Plans", "Networking", "Portfolio", "Job Search"],
    ["LinkedIn", "Job Boards", "Spreadsheets", "AI Assistant", "Portfolio Site"],
    [
      ["Choose Career Directions to Explore", ["List interests and strengths", "Research real job tasks", "Compare pay, training, and lifestyle", "Action: shortlist three paths"]],
      ["Study Real Job Requirements", ["Read 20 job listings", "Count repeated skills", "Separate must-have skills from nice-to-have skills", "Action: build a skill-gap list"]],
      ["Build a Learning Plan", ["Choose the highest-value missing skills", "Pick projects that prove those skills", "Set weekly practice goals", "Action: create a 12-week learning plan"]],
      ["Build Proof of Work", ["Portfolio projects", "Case studies", "GitHub or work samples", "Action: publish one project"]],
      ["Build Relationships", ["Reach out to people in the field", "Ask useful questions", "Follow up professionally", "Action: contact five people"]],
      ["Run a Focused Job Search", ["Target roles instead of mass applying", "Track applications", "Prepare interviews", "Use AI to organize research and practice", "Action: create a weekly job-search system"]],
    ]
  ),
};

const brainPaths: Record<string, MvpLearningPath> = {
  Memory: makePath(
    ["Active Recall", "Spaced Repetition", "Chunking", "Association", "Long-Term Memory"],
    ["Flashcards", "Recall Questions", "Spaced Review Calendar", "Notes"],
    [
      ["How Memory Actually Works", ["Attention and encoding", "Short-term versus long-term memory", "Why rereading feels easier than remembering", "Action: test what you remember without notes"]],
      ["Active Recall", ["Turn notes into questions", "Answer before checking", "Correct weak answers", "Action: build 20 recall questions"]],
      ["Spaced Repetition", ["Why spacing works", "Choose review intervals", "Avoid reviewing everything every day", "Action: schedule a week of reviews"]],
      ["Remember Hard Information", ["Chunking", "Associations", "Mental images", "Memory palace basics", "Action: memorize one difficult list"]],
      ["Remember What You Study", ["Preview", "Learn", "Recall", "Review", "Action: build a complete memory routine"]],
    ]
  ),
  Focus: makePath(
    ["Attention Control", "Deep Work", "Distraction Control", "Task Switching", "Mental Endurance"],
    ["Focus Timer", "Website Blocker", "Task List", "Distraction Log"],
    [
      ["Find What Breaks Your Focus", ["Track interruptions", "Phone and notification habits", "Environment problems", "Action: run a one-day distraction audit"]],
      ["Set Up a Focus Session", ["Choose one task", "Remove distractions", "Set a clear finish point", "Action: complete one 25-minute session"]],
      ["Build Longer Deep-Work Blocks", ["Increase focus time gradually", "Take useful breaks", "Avoid constant task switching", "Action: complete a 60-minute block"]],
      ["Recover After Distraction", ["Notice the interruption", "Write down the distraction", "Return to the exact next step", "Action: practice a focus reset"]],
      ["Build a Repeatable Focus System", ["Plan focus blocks", "Protect high-energy hours", "Review what breaks the system", "Action: create a weekly focus schedule"]],
    ]
  ),
  Discipline: makePath(
    ["Habit Building", "Consistency", "Self-Control", "Environment Design", "Follow-Through"],
    ["Habit Tracker", "Calendar", "Task List", "Reflection Notes"],
    [
      ["Turn Goals Into Daily Actions", ["Choose one measurable behavior", "Make the action small enough to start", "Action: define one daily target"]],
      ["Design Your Environment", ["Remove easy distractions", "Make useful actions easier", "Prepare before motivation is needed", "Action: change one part of your environment"]],
      ["Build Consistency", ["Use triggers and routines", "Track completion", "Restart quickly after a missed day", "Action: run a seven-day streak"]],
      ["Do the Work When You Do Not Feel Like It", ["Use a five-minute start", "Separate mood from the next action", "Break large work into the next small step", "Action: finish one delayed task"]],
      ["Review and Adjust", ["Find what keeps failing", "Change the system instead of making excuses", "Action: complete a weekly review"]],
    ]
  ),
  "Critical Thinking": makePath(
    ["Claims", "Evidence", "Sources", "Bias", "Logic", "Decision Making"],
    ["Source Checklist", "Claim-Evidence Notes", "Comparison Table"],
    [
      ["Separate Claims From Evidence", ["Identify the claim", "Find the evidence", "Ask what would prove it wrong", "Action: analyze one online claim"]],
      ["Check Sources", ["Primary versus secondary sources", "Expertise and incentives", "Date and context", "Action: compare three sources"]],
      ["Spot Weak Reasoning", ["Correlation versus cause", "Cherry-picking", "False choices", "Action: identify reasoning errors in examples"]],
      ["Notice Bias in Yourself", ["Confirmation bias", "Anchoring", "Framing", "Action: write the strongest case against your first opinion"]],
      ["Make Better Conclusions", ["Compare explanations", "State uncertainty", "Change your mind when evidence changes", "Action: write an evidence-based conclusion"]],
    ]
  ),
  "Problem Solving": makePath(
    ["Problem Framing", "Root Cause", "Options", "Testing", "Tradeoffs", "Iteration"],
    ["Problem Map", "Decision Table", "Test Plan", "Notes"],
    [
      ["Define the Real Problem", ["Describe what is happening", "Name who is affected", "Separate symptoms from causes", "Action: write a one-sentence problem"]],
      ["Find the Root Cause", ["Ask why repeatedly", "Map causes", "Check assumptions", "Action: build a cause map"]],
      ["Create Possible Solutions", ["Generate multiple options", "Avoid choosing the first idea", "Action: list five solutions"]],
      ["Compare Tradeoffs", ["Cost", "Speed", "Risk", "Impact", "Action: build a decision table"]],
      ["Test and Improve", ["Run a small test", "Measure the result", "Learn from failure", "Action: complete one test-and-review cycle"]],
    ]
  ),
  "Study Habits": makePath(
    ["Active Recall", "Spaced Review", "Note Taking", "Practice", "Test Prep"],
    ["Study Planner", "Flashcards", "Practice Questions", "Notes"],
    [
      ["Stop Passive Studying", ["Why rereading is weak", "Turn material into questions", "Action: replace one rereading session with recall"]],
      ["Take Useful Notes", ["Write ideas in your own words", "Capture examples", "Mark questions and weak spots", "Action: create one page of useful notes"]],
      ["Plan Reviews", ["Space study across days", "Mix old and new material", "Action: build a seven-day review plan"]],
      ["Practice Like the Test", ["Use problems and questions", "Time some practice", "Correct mistakes", "Action: complete a practice set"]],
      ["Build a Weekly Study System", ["Plan subjects", "Protect study blocks", "Review results", "Action: create your weekly routine"]],
    ]
  ),
  "Time Management": makePath(
    ["Priorities", "Planning", "Scheduling", "Deadlines", "Execution", "Review"],
    ["Calendar", "Task List", "Weekly Planner", "Timer"],
    [
      ["Know What Actually Matters", ["Separate urgent from important", "Choose three priorities", "Action: rank your current tasks"]],
      ["Plan the Week", ["Place deadlines first", "Block time for important work", "Leave room for surprises", "Action: build next week's calendar"]],
      ["Turn Plans Into Daily Work", ["Choose a top task", "Estimate time honestly", "Start with the next action", "Action: create tomorrow's plan"]],
      ["Handle Overload", ["Drop low-value work", "Renegotiate deadlines", "Break projects into smaller pieces", "Action: reduce one overloaded week"]],
      ["Review Your Time", ["Compare planned versus actual time", "Find repeated waste", "Action: run a weekly time review"]],
    ]
  ),
  "Learning Strategies": makePath(
    ["Learning Goals", "Examples", "Practice", "Feedback", "Recall", "Transfer"],
    ["Learning Plan", "Practice Log", "Recall Questions", "Feedback Notes"],
    [
      ["Define What You Need to Learn", ["Turn a broad goal into a skill", "Set a clear result", "Action: write one measurable learning goal"]],
      ["Understand Before Memorizing", ["Ask why and how", "Use examples", "Explain in your own words", "Action: teach one idea back"]],
      ["Practice the Skill", ["Use deliberate practice", "Target weak parts", "Action: complete a focused practice block"]],
      ["Use Feedback", ["Find the exact error", "Correct it", "Try again", "Action: keep an error log"]],
      ["Make Knowledge Stick", ["Active recall", "Spaced review", "Use knowledge in a new situation", "Action: build a complete learning loop"]],
    ]
  ),
};

const generalPaths: Record<string, MvpLearningPath> = {
  History: makePath(
    ["Chronology", "Cause and Effect", "Sources", "Comparison", "Historical Writing"],
    ["Timelines", "Primary Sources", "Maps", "Source Notes"],
    [
      ["Build a Timeline", ["Ancient civilizations", "Classical empires", "Middle Ages", "Early modern world", "Modern era"]],
      ["Understand Why Events Happen", ["Long-term causes", "Immediate triggers", "Consequences", "Action: build a cause-and-effect chain"]],
      ["Read Historical Evidence", ["Primary sources", "Secondary sources", "Bias and context", "Action: compare two accounts"]],
      ["Compare Societies", ["Government", "Economy", "Technology", "Culture", "Action: compare two civilizations"]],
      ["Explain History Clearly", ["Write a claim", "Use evidence", "Connect cause and effect", "Action: write a short historical explanation"]],
    ]
  ),
  Technology: makePath(
    ["Computers", "Internet", "Software", "AI", "Cybersecurity", "Cloud"],
    ["Browser DevTools", "VS Code", "GitHub", "AI Assistant"],
    [
      ["How Computers Work", ["CPU, memory, and storage", "Operating systems", "Files and programs", "Action: inspect your computer's system information"]],
      ["How the Internet Works", ["IP addresses", "DNS", "Web requests", "Browsers and servers", "Action: trace what happens when you open a website"]],
      ["How Software Is Built", ["Code", "APIs", "Databases", "Version control", "Action: open a simple project in VS Code"]],
      ["How Modern AI Works", ["Training data", "tokens and predictions", "LLMs", "strengths and limits", "Action: compare AI answers and verify them"]],
      ["Cybersecurity Basics", ["Passwords and MFA", "Phishing", "Updates", "Data privacy", "Action: improve one account's security"]],
      ["Cloud and Modern Apps", ["Cloud servers", "storage", "deployment", "software subscriptions", "Action: map the pieces of a modern web app"]],
    ]
  ),
  Science: makePath(
    ["Scientific Method", "Biology", "Chemistry", "Physics", "Earth Science", "Data"],
    ["Graphs", "Lab Notes", "Models", "Calculator"],
    [
      ["How Science Tests Ideas", ["Questions and hypotheses", "Variables", "Experiments", "Evidence", "Action: design a simple test"]],
      ["Biology", ["Cells", "genetics", "evolution", "ecosystems", "Action: explain one biological system"]],
      ["Chemistry", ["Atoms", "bonds", "reactions", "acids and bases", "Action: balance simple reaction examples"]],
      ["Physics", ["Motion", "forces", "energy", "waves", "Action: solve a real motion problem"]],
      ["Earth and Space", ["Earth systems", "weather and climate", "geology", "solar system", "Action: build a concept map"]],
      ["Read Scientific Data", ["Tables", "graphs", "averages", "uncertainty", "Action: interpret one dataset"]],
    ]
  ),
  Economics: makePath(
    ["Supply and Demand", "Incentives", "Markets", "Inflation", "Growth", "Trade"],
    ["Economic Charts", "Spreadsheets", "Public Data"],
    [
      ["Scarcity and Tradeoffs", ["Limited resources", "opportunity cost", "incentives", "Action: analyze one everyday tradeoff"]],
      ["Supply and Demand", ["Demand curves", "supply curves", "market price", "Action: explain a real price change"]],
      ["Businesses and Competition", ["Costs", "profit", "competition", "market power", "Action: compare two industries"]],
      ["Money, Inflation, and Interest Rates", ["What money does", "inflation", "interest rates", "central banks", "Action: trace how a rate change affects borrowers"]],
      ["Jobs, Growth, and Recessions", ["GDP", "unemployment", "productivity", "business cycles", "Action: read one economic report"]],
      ["Trade and Government Policy", ["Taxes", "spending", "trade", "regulation", "Action: compare benefits and costs of one policy"]],
    ]
  ),
  Geography: makePath(
    ["Maps", "Physical Geography", "Population", "Cities", "Resources", "Global Connections"],
    ["Maps", "Atlas", "Population Data", "Climate Charts"],
    [
      ["Read Maps Correctly", ["Latitude and longitude", "scale", "map projections", "Action: locate and compare five places"]],
      ["Land, Water, and Climate", ["Mountains", "rivers", "oceans", "climate zones", "Action: explain how geography shapes a region"]],
      ["Population and Migration", ["Population density", "migration", "urbanization", "Action: interpret a population map"]],
      ["Countries and Regions", ["Political borders", "regions", "languages", "economies", "Action: create a country profile"]],
      ["Resources and Trade", ["Energy", "food", "water", "transport routes", "Action: trace one product across countries"]],
    ]
  ),
  Culture: makePath(
    ["Culture", "Language", "Traditions", "Media", "Identity", "Cross-Cultural Communication"],
    ["Interviews", "Media Examples", "Cultural Comparison Notes"],
    [
      ["What Culture Includes", ["Values", "norms", "symbols", "traditions", "Action: map parts of one culture"]],
      ["Language and Communication", ["Direct and indirect communication", "gestures", "context", "Action: compare communication styles"]],
      ["Family, Community, and Identity", ["Roles", "identity", "community", "Action: compare how social roles differ"]],
      ["Media and Popular Culture", ["Film", "music", "social media", "advertising", "Action: analyze one media example"]],
      ["Communicate Across Cultures", ["Avoid stereotypes", "ask respectful questions", "adapt communication", "Action: practice a cross-cultural scenario"]],
    ]
  ),
  Communication: careerPaths.Communication,
  "Life Skills": makePath(
    ["Decision Making", "Organization", "Money Basics", "Home Skills", "Digital Safety", "Problem Solving"],
    ["Calendar", "Budget", "Checklists", "Password Manager"],
    [
      ["Make Better Everyday Decisions", ["Define the choice", "compare options", "consider consequences", "Action: make a decision table"]],
      ["Organize Your Responsibilities", ["Calendar", "deadlines", "documents", "appointments", "Action: build a weekly system"]],
      ["Handle Basic Money Tasks", ["Bank accounts", "bills", "budgets", "receipts", "Action: create a simple monthly budget"]],
      ["Take Care of a Home", ["Cleaning routines", "basic maintenance", "food planning", "Action: build a home checklist"]],
      ["Stay Safer Online", ["Strong passwords", "MFA", "scams", "privacy settings", "Action: secure one account"]],
      ["Solve Everyday Problems", ["Define the issue", "find options", "ask for help when needed", "Action: solve one real-life problem step by step"]],
    ]
  ),
};

const bookPaths: Record<string, MvpLearningPath> = {
  "Book Summaries": makePath(
    ["Main Ideas", "Summarizing", "Recall", "Organization"],
    ["Book Notes", "Chapter Notes", "Summary Template"],
    [
      ["Find the Book's Main Point", ["Identify the central idea", "separate main ideas from details", "Action: write the book in one sentence"]],
      ["Summarize Each Chapter", ["Capture the chapter purpose", "key events or arguments", "Action: write three bullets per chapter"]],
      ["Connect the Chapters", ["Track how ideas build", "remove repeated points", "Action: create a chapter map"]],
      ["Write the Final Summary", ["Opening overview", "main ideas", "important examples", "Action: produce a one-page summary"]],
      ["Check What You Remember", ["Recall without notes", "correct missing points", "Action: explain the book aloud"]],
    ]
  ),
  "Key Lessons": makePath(
    ["Key Ideas", "Prioritization", "Application", "Recall"],
    ["Lesson List", "Action Notes", "Recall Questions"],
    [
      ["Find the Ideas Worth Keeping", ["Mark repeated ideas", "find important claims", "Action: choose the top ten lessons"]],
      ["Understand Why Each Lesson Matters", ["Evidence and examples", "limits and exceptions", "Action: explain each lesson"]],
      ["Turn Lessons Into Actions", ["Choose where the lesson applies", "define a behavior", "Action: create three real actions"]],
      ["Review and Keep the Lessons", ["Recall questions", "spaced review", "Action: schedule future reviews"]],
    ]
  ),
  "Chapter Breakdown": makePath(
    ["Chapter Analysis", "Main Ideas", "Evidence", "Connections"],
    ["Chapter Template", "Notes", "Concept Map"],
    [
      ["What Happens or Is Argued", ["Main event or claim", "supporting details", "Action: write a chapter overview"]],
      ["Important People, Ideas, or Evidence", ["Characters or concepts", "examples", "evidence", "Action: list the important elements"]],
      ["How This Chapter Connects", ["Earlier chapters", "later setup", "themes", "Action: draw the connections"]],
      ["Questions and Recall", ["What is unclear", "what must be remembered", "Action: create five chapter questions"]],
    ]
  ),
  Vocabulary: makePath(
    ["Definitions", "Context Clues", "Usage", "Recall"],
    ["Vocabulary Cards", "Example Sentences", "Spaced Review"],
    [
      ["Find Important Words", ["Unknown words", "repeated terms", "subject-specific words", "Action: build a word list"]],
      ["Understand Words in Context", ["Context clues", "multiple meanings", "Action: explain why the word fits the sentence"]],
      ["Use the Words", ["Write your own sentence", "compare similar words", "Action: use ten new words correctly"]],
      ["Remember the Words", ["Recall cards", "spaced review", "Action: build a review schedule"]],
    ]
  ),
  "Study Notes": makePath(
    ["Note Taking", "Organization", "Summarizing", "Review"],
    ["Notes Template", "Concept Map", "Review Questions"],
    [
      ["Capture Only What Matters", ["Main ideas", "examples", "questions", "Action: create concise chapter notes"]],
      ["Organize the Notes", ["Headings", "connections", "definitions", "Action: turn notes into a clean study page"]],
      ["Turn Notes Into Questions", ["Recall prompts", "practice questions", "Action: make ten questions"]],
      ["Review the Notes", ["Close the notes and recall", "check gaps", "Action: run a self-test"]],
    ]
  ),
  "Book Quizzes": makePath(
    ["Recall", "Comprehension", "Application", "Error Review"],
    ["Quiz Builder", "Answer Review", "Score Tracker"],
    [
      ["Build Recall Questions", ["Names and facts", "definitions", "key events", "Action: create ten recall questions"]],
      ["Build Understanding Questions", ["Why and how questions", "compare ideas", "Action: create five explanation questions"]],
      ["Build Application Questions", ["Use the idea in a new situation", "Action: create three application questions"]],
      ["Review Wrong Answers", ["Find why the answer was wrong", "relearn the idea", "Action: keep an error list"]],
    ]
  ),
  "Critical Analysis": makePath(
    ["Claims", "Evidence", "Themes", "Author Choices", "Context", "Counterarguments"],
    ["Annotation Notes", "Claim-Evidence Table", "Comparison Notes"],
    [
      ["Identify the Main Claim or Theme", ["Central argument or theme", "supporting ideas", "Action: write a clear claim"]],
      ["Test the Evidence", ["Examples", "sources", "logic", "Action: rate the strongest and weakest evidence"]],
      ["Study the Author's Choices", ["Structure", "language", "examples", "point of view", "Action: analyze one passage"]],
      ["Add Context and Counterarguments", ["Historical context", "other viewpoints", "missing evidence", "Action: write the strongest counterargument"]],
      ["Write Your Analysis", ["Claim", "evidence", "reasoning", "conclusion", "Action: write a short analysis"]],
    ]
  ),
  "Personalized Reading Path": makePath(
    ["Goal Setting", "Book Selection", "Difficulty Progression", "Reading Schedule", "Review"],
    ["Reading List", "Calendar", "Book Notes", "Progress Tracker"],
    [
      ["Choose the Goal", ["Career knowledge", "school", "personal growth", "curiosity", "Action: define one reading goal"]],
      ["Pick the Right Books", ["Beginner versus advanced", "credible authors", "different viewpoints", "Action: choose the first five books"]],
      ["Order the Books", ["Prerequisites", "difficulty", "topic sequence", "Action: put the books in order"]],
      ["Build a Reading Schedule", ["Pages or chapters per week", "review time", "Action: create a realistic schedule"]],
      ["Track What You Learn", ["Notes", "recall", "application", "Action: review progress after each book"]],
    ]
  ),
};

type SchoolPlanMap = Record<string, Record<string, SectionInput[]>>;

const schoolPlans: SchoolPlanMap = {
  Math: {
    "Grade 6": [
      ["Fractions, Decimals & Percent", ["Add, subtract, multiply, and divide fractions", "Work with decimals", "Convert fractions, decimals, and percent"]],
      ["Ratios & Rates", ["Write ratios", "Find unit rates", "Solve percent problems"]],
      ["Expressions & Equations", ["Use variables", "Evaluate expressions", "Solve one-step equations and inequalities"]],
      ["Geometry & Data", ["Area and volume", "Coordinate plane", "Mean, median, and data displays"]],
    ],
    "Grade 7": [
      ["Rational Numbers", ["Positive and negative numbers", "Fractions and decimals", "Multi-step number problems"]],
      ["Proportions & Percent", ["Proportional relationships", "Scale drawings", "Percent increase and decrease"]],
      ["Expressions & Equations", ["Simplify expressions", "Solve multi-step equations", "Solve inequalities"]],
      ["Geometry & Probability", ["Circles and angles", "Area and volume", "Probability and sampling"]],
    ],
    "Grade 8": [
      ["Linear Equations", ["Solve multi-step equations", "Slope", "Graph linear equations"]],
      ["Functions", ["Understand functions", "Compare functions", "Model real situations"]],
      ["Geometry", ["Transformations", "Pythagorean theorem", "Volume"]],
      ["Numbers & Data", ["Exponents and scientific notation", "Irrational numbers", "Scatter plots and trends"]],
    ],
    "Grade 9": [
      ["Algebraic Expressions & Equations", ["Simplify expressions", "Solve linear equations", "Solve inequalities"]],
      ["Linear Functions", ["Slope and intercepts", "Graph lines", "Write equations from data"]],
      ["Systems & Exponents", ["Solve systems of equations", "Exponent rules", "Exponential growth"]],
      ["Polynomials & Quadratics", ["Add and multiply polynomials", "Factor simple quadratics", "Graph quadratic functions"]],
    ],
    "Grade 10": [
      ["Geometry Proofs & Reasoning", ["Angles and lines", "Congruence", "Write geometric proofs"]],
      ["Similarity & Trigonometry", ["Similar figures", "Right triangles", "Sine, cosine, and tangent"]],
      ["Circles & Coordinate Geometry", ["Circle theorems", "Distance and midpoint", "Equations of circles"]],
      ["Area, Surface Area & Volume", ["2D area", "3D surface area", "Volume and real-world problems"]],
    ],
    "Grade 11": [
      ["Functions & Transformations", ["Linear and quadratic functions", "Function notation", "Transform graphs"]],
      ["Polynomials & Rational Functions", ["Polynomial operations", "Zeros and factors", "Rational expressions"]],
      ["Exponential & Logarithmic Functions", ["Growth and decay", "Logarithms", "Solve exponential equations"]],
      ["Sequences, Probability & Statistics", ["Arithmetic and geometric sequences", "Probability", "Data distributions"]],
    ],
    "Grade 12": [
      ["Advanced Functions", ["Polynomial and rational functions", "Inverse functions", "Modeling"]],
      ["Trigonometry", ["Unit circle", "Trig identities", "Solve trig equations"]],
      ["Limits & Derivatives", ["Understand limits", "Derivative as rate of change", "Basic derivative rules"]],
      ["Integrals & Data", ["Area under a curve", "Basic integrals", "Statistics review and modeling"]],
    ],
    College: [
      ["College Algebra", ["Functions and graphs", "Polynomial and rational equations", "Exponential and logarithmic models"]],
      ["Calculus", ["Limits", "Derivatives", "Integrals and applications"]],
      ["Statistics", ["Probability", "Confidence intervals", "Hypothesis testing"]],
      ["Quantitative Problem Solving", ["Model real problems", "Use formulas correctly", "Check reasonableness of answers"]],
    ],
  },

  Science: {
    "Grade 6": [
      ["Matter & Energy", ["States of matter", "Physical and chemical changes", "Energy transfer"]],
      ["Earth Systems", ["Rocks and minerals", "Water cycle", "Weather and climate"]],
      ["Life Science", ["Cells", "Organisms", "Ecosystems"]],
      ["Science Skills", ["Variables", "Measurements", "Read graphs and tables"]],
    ],
    "Grade 7": [
      ["Cells & Body Systems", ["Cell structures", "Levels of organization", "Human body systems"]],
      ["Genetics & Reproduction", ["Traits", "Heredity", "Reproduction"]],
      ["Ecology", ["Food webs", "Populations", "Ecosystem change"]],
      ["Matter & Forces", ["Atoms and molecules", "Chemical reactions", "Forces and motion"]],
    ],
    "Grade 8": [
      ["Atoms & Reactions", ["Atomic structure", "Periodic table", "Chemical reactions"]],
      ["Forces, Motion & Energy", ["Speed and acceleration", "Newton's laws", "Work and energy"]],
      ["Waves & Electricity", ["Light and sound", "Electric circuits", "Magnetism"]],
      ["Earth & Space", ["Plate tectonics", "Earth history", "Solar system and stars"]],
    ],
    "Grade 9": [
      ["Cells & Biochemistry", ["Cell structure", "Photosynthesis and respiration", "Biomolecules"]],
      ["Genetics", ["DNA", "Mitosis and meiosis", "Inheritance"]],
      ["Evolution", ["Natural selection", "Evidence for evolution", "Speciation"]],
      ["Ecology", ["Populations", "Energy flow", "Biodiversity and ecosystems"]],
    ],
    "Grade 10": [
      ["Atomic Structure", ["Atoms and isotopes", "Electron structure", "Periodic trends"]],
      ["Chemical Bonding", ["Ionic and covalent bonds", "Molecular shapes", "Intermolecular forces"]],
      ["Chemical Reactions", ["Balance equations", "Moles and stoichiometry", "Reaction types"]],
      ["Energy, Acids & Solutions", ["Thermochemistry", "Acids and bases", "Solutions and concentration"]],
    ],
    "Grade 11": [
      ["Motion", ["Position and velocity", "Acceleration", "Motion graphs"]],
      ["Forces", ["Newton's laws", "Friction", "Circular motion"]],
      ["Energy & Momentum", ["Work and power", "Conservation of energy", "Momentum and collisions"]],
      ["Waves & Electricity", ["Waves", "Electric fields and circuits", "Magnetism"]],
    ],
    "Grade 12": [
      ["Ecosystems & Biodiversity", ["Population ecology", "Biodiversity", "Human impacts"]],
      ["Climate & Earth Systems", ["Carbon cycle", "Climate change", "Weather versus climate"]],
      ["Resources & Pollution", ["Water and energy resources", "Waste", "Air and water pollution"]],
      ["Environmental Data", ["Read environmental graphs", "Sampling", "Evaluate evidence and solutions"]],
    ],
    College: [
      ["Biology", ["Cells and genetics", "Evolution", "Ecology"]],
      ["Chemistry", ["Atomic structure", "Reactions and stoichiometry", "Equilibrium"]],
      ["Physics", ["Mechanics", "Energy", "Electricity and waves"]],
      ["Lab & Data Skills", ["Experimental design", "Graphing", "Uncertainty and scientific writing"]],
    ],
  },

  "English & Writing": {
    "Grade 6": [
      ["Sentence & Paragraph Writing", ["Complete sentences", "Paragraph structure", "Transitions"]],
      ["Reading Evidence", ["Find text evidence", "Main idea", "Make inferences"]],
      ["Narrative & Informative Writing", ["Narrative structure", "Explanatory writing", "Revision"]],
      ["Grammar & Vocabulary", ["Parts of speech", "Punctuation", "Context clues"]],
    ],
    "Grade 7": [
      ["Paragraphs to Essays", ["Thesis basics", "Body paragraphs", "Conclusions"]],
      ["Argument Writing", ["Claims", "Evidence", "Reasoning"]],
      ["Literary Analysis", ["Theme", "Character", "Author choices"]],
      ["Grammar & Revision", ["Sentence variety", "Common grammar errors", "Edit for clarity"]],
    ],
    "Grade 8": [
      ["Essay Structure", ["Thesis statements", "Organize evidence", "Transitions"]],
      ["Argument & Research", ["Reliable sources", "Quote and paraphrase", "Cite evidence"]],
      ["Literature", ["Theme", "Symbolism", "Point of view"]],
      ["Grammar & Style", ["Sentence structure", "Word choice", "Revision"]],
    ],
    "Grade 9": [
      ["Analytical Essays", ["Close reading", "Thesis", "Evidence and commentary"]],
      ["Narrative & Creative Writing", ["Scene", "Character", "Voice"]],
      ["Research Writing", ["Find sources", "Avoid plagiarism", "Basic citations"]],
      ["Grammar & Vocabulary", ["Sentence errors", "Academic vocabulary", "Editing"]],
    ],
    "Grade 10": [
      ["Literary Analysis", ["Theme and motif", "Structure", "Author's purpose"]],
      ["Argument Writing", ["Complex claims", "Counterclaims", "Evidence quality"]],
      ["Research", ["Source credibility", "Synthesis", "Citations"]],
      ["Style & Revision", ["Clarity", "Tone", "Sentence variety"]],
    ],
    "Grade 11": [
      ["Rhetoric", ["Ethos, pathos, and logos", "Rhetorical choices", "Analyze speeches and essays"]],
      ["Advanced Argument", ["Defensible thesis", "Multiple sources", "Counterargument"]],
      ["Research Writing", ["Research question", "Synthesize evidence", "Formal citation"]],
      ["College-Ready Writing", ["Clarity", "Organization", "Editing"]],
    ],
    "Grade 12": [
      ["College-Level Essays", ["Strong thesis", "Complex analysis", "Evidence and commentary"]],
      ["Research Projects", ["Plan research", "Evaluate sources", "Synthesize and cite"]],
      ["Professional Writing", ["Emails", "Reports", "Applications"]],
      ["Revision & Editing", ["Structure", "Style", "Grammar and proofreading"]],
    ],
    College: [
      ["Academic Writing", ["Thesis and argument", "Paragraph logic", "Evidence"]],
      ["Research", ["Scholarly sources", "Citation", "Synthesis"]],
      ["Critical Reading", ["Analyze arguments", "Evaluate evidence", "Compare authors"]],
      ["Professional Communication", ["Reports", "Presentations", "Professional email"]],
    ],
  },

  "Reading & Study Skills": {
    "Grade 6": [
      ["Reading Comprehension", ["Main idea", "Supporting details", "Make inferences"]],
      ["Vocabulary", ["Context clues", "Roots and affixes", "Use new words"]],
      ["Note Taking", ["Headings and key points", "Simple outlines", "Summarize in your own words"]],
      ["Study & Test Prep", ["Active recall", "Short study sessions", "Review mistakes"]],
    ],
    "Grade 7": [
      ["Read More Difficult Text", ["Central idea", "Evidence", "Author's purpose"]],
      ["Vocabulary & Meaning", ["Context", "Word parts", "Multiple meanings"]],
      ["Better Notes", ["Cornell-style notes", "Questions", "Summary"]],
      ["Study Systems", ["Spaced review", "Practice questions", "Plan for tests"]],
    ],
    "Grade 8": [
      ["Analyze Text", ["Claims and evidence", "Inference", "Compare texts"]],
      ["Read Textbooks Efficiently", ["Preview headings", "Annotate", "Summarize sections"]],
      ["Remember What You Read", ["Active recall", "Flashcards", "Spaced repetition"]],
      ["Prepare for High School Tests", ["Study plan", "Timed practice", "Error review"]],
    ],
    "Grade 9": [
      ["High-School Reading", ["Annotate", "Track arguments", "Use evidence"]],
      ["Class Notes", ["Listen for main points", "Organize notes", "Fill gaps after class"]],
      ["Homework & Study Planning", ["Prioritize work", "Break assignments into steps", "Use a weekly calendar"]],
      ["Quiz & Test Prep", ["Recall questions", "Practice problems", "Review errors"]],
    ],
    "Grade 10": [
      ["Read Across Subjects", ["Science texts", "History sources", "Literature"]],
      ["Take Better Notes", ["Condense ideas", "Diagrams and tables", "Question-based notes"]],
      ["Study for Retention", ["Spaced repetition", "Interleaving", "Teach-back"]],
      ["Manage Larger Assignments", ["Plan milestones", "Avoid last-minute work", "Track progress"]],
    ],
    "Grade 11": [
      ["Advanced Reading", ["Analyze arguments", "Evaluate sources", "Read dense material"]],
      ["Efficient Research", ["Search effectively", "Judge credibility", "Capture sources"]],
      ["Exam Preparation", ["Build study guides", "Timed practice", "Target weak areas"]],
      ["Independent Learning", ["Set goals", "Choose resources", "Track understanding"]],
    ],
    "Grade 12": [
      ["College-Ready Reading", ["Read long assignments", "Annotate efficiently", "Synthesize sources"]],
      ["College-Ready Notes", ["Lecture notes", "Reading notes", "Combine both"]],
      ["Long-Term Study Planning", ["Plan weeks ahead", "Balance subjects", "Review before exams"]],
      ["Self-Testing", ["Practice retrieval", "Use mock exams", "Analyze mistakes"]],
    ],
    College: [
      ["Read Academic Material", ["Textbooks", "Research articles", "Arguments and evidence"]],
      ["Lecture & Reading Notes", ["Capture key ideas", "Organize by concept", "Review after class"]],
      ["Study for Exams", ["Active recall", "Spaced repetition", "Practice exams"]],
      ["Research & Projects", ["Plan milestones", "Manage sources", "Finish before deadlines"]],
    ],
  },
};

function schoolPath(subject: string, level: string): MvpLearningPath | null {
  const plan = schoolPlans[subject]?.[level];
  if (!plan) return null;

  const skillMap: Record<string, string[]> = {
    Math: ["Problem Solving", "Equations", "Graphs", "Math Reasoning"],
    Science: ["Scientific Reasoning", "Data", "Models", "Experiments"],
    "English & Writing": ["Writing", "Grammar", "Evidence", "Revision"],
    "Reading & Study Skills": ["Reading", "Note Taking", "Active Recall", "Test Prep"],
  };

  const resourceMap: Record<string, string[]> = {
    Math: ["Worked Examples", "Practice Problems", "Calculator", "Graphs"],
    Science: ["Diagrams", "Data Tables", "Lab Examples", "Practice Questions"],
    "English & Writing": ["Writing Examples", "Editing Checklist", "Source Notes", "Practice Prompts"],
    "Reading & Study Skills": ["Study Planner", "Recall Questions", "Notes Template", "Flashcards"],
  };

  return makePath(
    skillMap[subject] ?? ["Understanding", "Practice"],
    resourceMap[subject] ?? ["Examples", "Practice Questions"],
    plan
  );
}

export function getMvpLearningPath(
  world: string,
  sectionTitle: string,
  title: string
): MvpLearningPath | null {
  if (world === "career-skills") {
    return careerPaths[title] ?? careerPaths[sectionTitle] ?? null;
  }

  if (world === "school-help") {
    return schoolPath(sectionTitle, title);
  }

  if (world === "brain-development") {
    return brainPaths[title] ?? brainPaths[sectionTitle] ?? null;
  }

  if (world === "general-knowledge") {
    return generalPaths[title] ?? generalPaths[sectionTitle] ?? null;
  }

  if (world === "book-intelligence") {
    return bookPaths[title] ?? bookPaths[sectionTitle] ?? null;
  }

  return null;
}
