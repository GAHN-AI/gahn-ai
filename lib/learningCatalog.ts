export type LearningOption = {
  title: string;
  description: string;
  skills?: string[];
  tools?: string[];
  modules?: string[];
};

export type LearningSection = {
  slug: string;
  title: string;
  description: string;
  options: LearningOption[];
};

function option(
  title: string,
  description: string,
  skills: string[] = [],
  tools: string[] = [],
  modules: string[] = []
): LearningOption {
  return { title, description, skills, tools, modules };
}

function grade(
  slug: string,
  title: string,
  description: string,
  options: LearningOption[]
): LearningSection {
  return { slug, title, description, options };
}

const elementarySubjects = (gradeNumber: number): LearningOption[] => [
  option(
    "Math",
    `Grade ${gradeNumber} number sense, operations, measurement, geometry, and problem solving.`,
    ["Number Sense", "Problem Solving", "Mental Math", "Math Reasoning"]
  ),
  option(
    "Reading",
    `Grade ${gradeNumber} reading fluency, comprehension, vocabulary, and understanding stories and informational text.`,
    ["Reading Comprehension", "Vocabulary", "Main Idea", "Inference"]
  ),
  option(
    "Writing",
    `Grade ${gradeNumber} sentences, paragraphs, storytelling, explanations, and clear written communication.`,
    ["Writing", "Grammar", "Organization", "Revision"]
  ),
  option(
    "Science",
    `Grade ${gradeNumber} life, Earth, physical science, observation, experiments, and scientific thinking.`,
    ["Scientific Thinking", "Observation", "Evidence", "Experiments"]
  ),
  option(
    "Social Studies",
    `Grade ${gradeNumber} communities, geography, history, citizenship, and how people live and work together.`,
    ["History", "Geography", "Civics", "Communities"]
  ),
  option(
    "Grammar & Vocabulary",
    `Grade ${gradeNumber} language conventions, word meaning, spelling, sentence structure, and usage.`,
    ["Grammar", "Vocabulary", "Spelling", "Sentence Structure"]
  ),
  option(
    "Health",
    `Grade ${gradeNumber} health, safety, wellness, body awareness, and healthy daily choices.`,
    ["Health", "Safety", "Wellness", "Healthy Habits"]
  ),
  option(
    "Computer Skills",
    `Grade ${gradeNumber} digital literacy, keyboarding, files, safe internet use, and basic computing.`,
    ["Digital Literacy", "Keyboarding", "Internet Safety", "Computer Basics"]
  ),
];

const middleSchoolSubjects = (gradeNumber: number): LearningOption[] => [
  option(
    "Math",
    `Grade ${gradeNumber} ratios, equations, geometry, data, expressions, and multi-step problem solving.`,
    ["Pre-Algebra", "Equations", "Geometry", "Data Analysis"]
  ),
  option(
    "English Language Arts",
    `Grade ${gradeNumber} reading, writing, grammar, vocabulary, argument, and literary analysis.`,
    ["Reading", "Writing", "Grammar", "Text Evidence"]
  ),
  option(
    "Science",
    `Grade ${gradeNumber} life, Earth, physical science, labs, data, models, and scientific reasoning.`,
    ["Scientific Reasoning", "Lab Skills", "Data Analysis", "Models"]
  ),
  option(
    "History & Social Studies",
    `Grade ${gradeNumber} history, civics, geography, economics, culture, and primary-source thinking.`,
    ["History", "Civics", "Geography", "Source Analysis"]
  ),
  option(
    "Computer Science",
    `Grade ${gradeNumber} coding foundations, algorithms, digital systems, and computational thinking.`,
    ["Coding", "Algorithms", "Logic", "Digital Systems"],
    ["Browser", "Code Editor"]
  ),
  option(
    "World Languages",
    `Practice school-level vocabulary, grammar, reading, writing, listening, and conversation.`,
    ["Vocabulary", "Grammar", "Reading", "Conversation"]
  ),
  option(
    "Health & Wellness",
    `Grade ${gradeNumber} wellness, fitness, nutrition, safety, decision-making, and healthy habits.`,
    ["Wellness", "Nutrition", "Fitness", "Decision Making"]
  ),
  option(
    "Study & Test Skills",
    `Build note-taking, organization, review, test preparation, and homework routines for grade ${gradeNumber}.`,
    ["Study Planning", "Active Recall", "Note Taking", "Test Prep"]
  ),
];

export const learningSectionsByWorld: Record<string, LearningSection[]> = {
  "school-help": [
    grade(
      "grade-1",
      "Grade 1",
      "Build strong foundations in reading, writing, math, science, social studies, and digital skills.",
      elementarySubjects(1)
    ),
    grade(
      "grade-2",
      "Grade 2",
      "Strengthen elementary foundations with guided practice across the core school subjects.",
      elementarySubjects(2)
    ),
    grade(
      "grade-3",
      "Grade 3",
      "Develop stronger reading, writing, math, science, and independent learning skills.",
      elementarySubjects(3)
    ),
    grade(
      "grade-4",
      "Grade 4",
      "Move into more advanced elementary concepts with explanations, examples, and practice.",
      elementarySubjects(4)
    ),
    grade(
      "grade-5",
      "Grade 5",
      "Prepare for middle school with stronger problem solving, reading, writing, science, and study habits.",
      elementarySubjects(5)
    ),
    grade(
      "grade-6",
      "Grade 6",
      "Start middle-school learning with structured support across core and practical subjects.",
      middleSchoolSubjects(6)
    ),
    grade(
      "grade-7",
      "Grade 7",
      "Build deeper reasoning, academic writing, math, science, history, and study skills.",
      middleSchoolSubjects(7)
    ),
    grade(
      "grade-8",
      "Grade 8",
      "Prepare for high school through stronger subject mastery and independent learning.",
      middleSchoolSubjects(8)
    ),
    grade(
      "grade-9",
      "Grade 9",
      "High-school foundations with subject-specific learning paths and assessment preparation.",
      [
        option("Algebra I", "Linear equations, functions, inequalities, systems, exponents, and graphing.", ["Algebra", "Functions", "Graphing", "Problem Solving"]),
        option("English I", "Reading analysis, grammar, vocabulary, essays, evidence, and literature.", ["Essay Writing", "Reading Analysis", "Grammar", "Text Evidence"]),
        option("Biology", "Cells, genetics, evolution, ecology, organisms, and biological systems.", ["Biology", "Lab Reasoning", "Scientific Models", "Data"]),
        option("World History", "Civilizations, empires, revolutions, conflict, culture, and historical change.", ["History", "Chronology", "Source Analysis", "Cause & Effect"]),
        option("Computer Science", "Programming foundations, logic, algorithms, data, and digital systems.", ["Programming", "Algorithms", "Logic", "Computing"], ["Code Editor", "Browser"]),
        option("Health", "Wellness, nutrition, fitness, safety, decision-making, and health literacy.", ["Wellness", "Health Literacy", "Decision Making"]),
        option("World Language", "School-level vocabulary, grammar, reading, writing, listening, and speaking.", ["Vocabulary", "Grammar", "Reading", "Speaking"]),
        option("Study & Test Prep", "Organization, note-taking, review systems, test preparation, and homework planning.", ["Active Recall", "Study Planning", "Test Prep", "Notes"]),
      ]
    ),
    grade(
      "grade-10",
      "Grade 10",
      "Continue high-school learning with deeper math, science, writing, history, technology, and practical skills.",
      [
        option("Geometry", "Proofs, angles, triangles, circles, similarity, area, volume, and coordinate geometry.", ["Geometry", "Proofs", "Spatial Reasoning", "Problem Solving"]),
        option("English II", "Literature, argument, research, grammar, vocabulary, and analytical writing.", ["Literary Analysis", "Argument Writing", "Research", "Grammar"]),
        option("Chemistry", "Atoms, bonding, reactions, stoichiometry, matter, acids, bases, and energy.", ["Chemistry", "Equations", "Lab Reasoning", "Stoichiometry"]),
        option("U.S. History", "Major eras, institutions, conflicts, movements, and changes in United States history.", ["U.S. History", "Source Analysis", "Chronology", "Cause & Effect"]),
        option("Computer Science", "Programming, data, web concepts, algorithms, debugging, and projects.", ["Programming", "Debugging", "Algorithms", "Web Basics"], ["Code Editor", "GitHub"]),
        option("Personal Finance", "Budgeting, banking, saving, credit, interest, investing basics, and financial decisions.", ["Budgeting", "Credit", "Saving", "Financial Literacy"]),
        option("World Language", "Intermediate vocabulary, grammar, reading, writing, listening, and conversation.", ["Vocabulary", "Grammar", "Listening", "Conversation"]),
        option("Test & Quiz Prep", "Target weak areas, build study guides, practice questions, and improve test performance.", ["Test Prep", "Recall", "Practice", "Error Review"]),
      ]
    ),
    grade(
      "grade-11",
      "Grade 11",
      "Advanced high-school coursework with college-readiness and standardized-test support.",
      [
        option("Algebra II", "Quadratics, polynomials, rational functions, exponentials, logarithms, and complex equations.", ["Algebra", "Functions", "Polynomials", "Logarithms"]),
        option("English III", "Advanced reading, rhetoric, argument, research, and evidence-based writing.", ["Rhetoric", "Research", "Argument", "Writing"]),
        option("Physics", "Motion, forces, energy, momentum, waves, electricity, and quantitative problem solving.", ["Physics", "Modeling", "Equations", "Problem Solving"]),
        option("U.S. Government & Civics", "Constitutional systems, institutions, rights, elections, law, and civic participation.", ["Government", "Civics", "Constitution", "Institutions"]),
        option("Statistics", "Data, probability, distributions, sampling, inference, and statistical reasoning.", ["Statistics", "Probability", "Data Analysis", "Inference"]),
        option("Computer Science", "Programming, data structures, algorithms, web development, and software projects.", ["Programming", "Data Structures", "Algorithms", "Projects"], ["Code Editor", "Git", "GitHub"]),
        option("SAT / ACT Prep", "Math, reading, grammar, timing, strategy, practice, and targeted weakness review.", ["Test Strategy", "Math", "Reading", "Grammar"]),
        option("World Language", "Intermediate-to-advanced reading, writing, listening, grammar, and conversation.", ["Reading", "Writing", "Listening", "Speaking"]),
      ]
    ),
    grade(
      "grade-12",
      "Grade 12",
      "Finish high school with advanced academics, practical life knowledge, and college or career preparation.",
      [
        option("Precalculus & Calculus", "Functions, trigonometry, limits, derivatives, integrals, and college-math preparation.", ["Precalculus", "Calculus", "Functions", "Problem Solving"]),
        option("English IV", "Advanced literature, composition, research, argument, and college-level writing preparation.", ["Writing", "Literature", "Research", "Argument"]),
        option("Environmental Science", "Ecosystems, biodiversity, climate, resources, pollution, and sustainability.", ["Ecology", "Climate", "Data", "Environmental Systems"]),
        option("Government & Economics", "Institutions, markets, public policy, personal economics, and civic decision-making.", ["Government", "Economics", "Policy", "Civics"]),
        option("Statistics", "Probability, data analysis, sampling, inference, and evidence-based conclusions.", ["Statistics", "Probability", "Inference", "Data"]),
        option("Personal Finance", "Banking, taxes, credit, insurance, investing, budgeting, and adult financial decisions.", ["Budgeting", "Taxes", "Credit", "Investing"]),
        option("College & Career Prep", "Applications, resumes, interviews, majors, careers, workplace skills, and planning.", ["Applications", "Resume", "Interviewing", "Planning"]),
        option("Computer Science", "Programming, software projects, web systems, data, algorithms, and deployment basics.", ["Programming", "Software Projects", "Git", "Deployment"], ["VS Code", "Git", "GitHub"]),
      ]
    ),
    grade(
      "college",
      "College",
      "College-level support across common general-education, STEM, business, writing, and technology courses.",
      [
        option("College Algebra", "Functions, equations, graphs, polynomial, rational, exponential, and logarithmic models.", ["Algebra", "Functions", "Modeling"]),
        option("Calculus", "Limits, derivatives, integrals, applications, and problem solving.", ["Calculus", "Derivatives", "Integrals"]),
        option("Statistics", "Probability, distributions, confidence intervals, hypothesis testing, and data analysis.", ["Statistics", "Probability", "Inference"]),
        option("Biology", "Cells, genetics, evolution, ecology, physiology, and college-level scientific reasoning.", ["Biology", "Scientific Reasoning", "Data"]),
        option("Chemistry", "Atomic structure, bonding, reactions, stoichiometry, thermochemistry, and equilibrium.", ["Chemistry", "Stoichiometry", "Equilibrium"]),
        option("Physics", "Mechanics, energy, momentum, waves, electricity, and mathematical modeling.", ["Physics", "Modeling", "Problem Solving"]),
        option("Academic Writing", "Thesis, argument, evidence, research, citation, organization, and revision.", ["Research", "Argument", "Citation", "Writing"]),
        option("Economics", "Microeconomics, macroeconomics, markets, incentives, growth, inflation, and policy.", ["Economics", "Markets", "Policy"]),
        option("Psychology", "Cognition, behavior, development, social psychology, research, and major theories.", ["Psychology", "Research", "Behavior"]),
        option("Computer Science", "Programming, algorithms, data structures, software engineering, and computer systems.", ["Programming", "Algorithms", "Data Structures"], ["VS Code", "Git", "GitHub"]),
        option("Business", "Management, marketing, finance, accounting, operations, and business strategy.", ["Business", "Finance", "Marketing", "Management"]),
        option("Research & Study Skills", "Read academic sources, take useful notes, plan projects, study efficiently, and prepare for exams.", ["Research", "Active Recall", "Notes", "Study Planning"]),
      ]
    ),
  ],

  "brain-development": [
    {
      slug: "focus-attention",
      title: "Focus & Attention",
      description: "Train concentration, distraction control, sustained attention, and deep-work ability.",
      options: [
        option("Focus Training", "Build the ability to stay mentally engaged with one task for longer periods.", ["Concentration", "Attention Control", "Focus Routines"]),
        option("Deep Work", "Create focused work blocks for difficult learning and problem solving.", ["Deep Work", "Planning", "Distraction Control"]),
        option("Digital Distraction Control", "Reduce interruptions from phones, apps, notifications, and compulsive browsing.", ["Digital Discipline", "Environment Design", "Attention"]),
        option("Task Switching Control", "Reduce unnecessary switching and recover focus faster when interruptions happen.", ["Attention Recovery", "Task Management", "Focus"]),
        option("Mental Endurance", "Gradually increase how long you can sustain demanding thinking.", ["Mental Stamina", "Concentration", "Pacing"]),
        option("Focus Routines", "Build repeatable start-up and shutdown routines that make focused work easier.", ["Habits", "Planning", "Consistency"]),
      ],
    },
    {
      slug: "memory-recall",
      title: "Memory & Recall",
      description: "Strengthen how you encode, retain, retrieve, and review information.",
      options: [
        option("Active Recall", "Practice retrieving information from memory instead of only rereading it.", ["Active Recall", "Testing Effect", "Retention"]),
        option("Spaced Repetition", "Review information at increasing intervals to improve long-term memory.", ["Spaced Repetition", "Review Planning", "Retention"]),
        option("Memorization Techniques", "Use chunking, association, imagery, and other strategies to remember information.", ["Chunking", "Association", "Visualization"]),
        option("Long-Term Memory", "Understand how durable memories form and how to strengthen retrieval.", ["Encoding", "Consolidation", "Retrieval"]),
        option("Memory Palace", "Learn the basics of spatial-memory techniques for organized recall.", ["Visualization", "Association", "Recall"]),
        option("Remember What I Study", "Build a complete study process around durable memory instead of familiarity.", ["Recall", "Review", "Study Design"]),
      ],
    },
    {
      slug: "critical-thinking",
      title: "Critical Thinking & Reasoning",
      description: "Strengthen logic, analysis, evidence evaluation, and clear thinking.",
      options: [
        option("Critical Thinking", "Question assumptions, evaluate evidence, and form stronger conclusions.", ["Evidence", "Reasoning", "Analysis"]),
        option("Logical Reasoning", "Practice valid reasoning, deductions, relationships, and structured thought.", ["Logic", "Deduction", "Pattern Recognition"]),
        option("Argument Analysis", "Identify claims, evidence, assumptions, strengths, and weaknesses.", ["Arguments", "Evidence", "Assumptions"]),
        option("Spotting Bias", "Recognize cognitive bias, framing, and distorted reasoning.", ["Bias Detection", "Metacognition", "Evaluation"]),
        option("Evidence Evaluation", "Judge the quality, relevance, and limits of evidence.", ["Evidence Quality", "Sources", "Reasoning"]),
        option("Mental Models", "Use reusable thinking frameworks to understand complex situations.", ["Systems Thinking", "Models", "Analysis"]),
      ],
    },
    {
      slug: "learning-study",
      title: "Learning & Study Systems",
      description: "Build efficient systems for learning, practicing, reviewing, and improving.",
      options: [
        option("How to Study", "Use active study methods instead of passive rereading.", ["Study Strategy", "Active Recall", "Review"]),
        option("How to Take Notes", "Capture useful information without copying everything.", ["Note Taking", "Summarization", "Organization"]),
        option("How to Practice", "Design practice that targets weaknesses and produces feedback.", ["Deliberate Practice", "Feedback", "Skill Building"]),
        option("Study Planning", "Turn deadlines and goals into realistic study sessions.", ["Planning", "Prioritization", "Time Management"]),
        option("Interleaving", "Mix related skills so you learn when and how to use them.", ["Interleaving", "Transfer", "Practice Design"]),
        option("Teach It Back", "Test understanding by explaining ideas clearly in your own words.", ["Explanation", "Recall", "Understanding"]),
      ],
    },
    {
      slug: "problem-solving",
      title: "Problem Solving & Decisions",
      description: "Define problems, generate options, compare tradeoffs, and choose better actions.",
      options: [
        option("Problem Solving", "Break complex problems into manageable parts and work toward solutions.", ["Problem Framing", "Analysis", "Solutions"]),
        option("Decision Making", "Compare options, consequences, uncertainty, and priorities.", ["Tradeoffs", "Judgment", "Decision Making"]),
        option("Root Cause Analysis", "Look beyond symptoms to identify why a problem is happening.", ["Root Cause", "Systems Thinking", "Analysis"]),
        option("Systems Thinking", "Understand how connected parts influence one another over time.", ["Systems", "Feedback Loops", "Relationships"]),
        option("Creative Problem Solving", "Generate more possible solutions before choosing one.", ["Creativity", "Ideation", "Evaluation"]),
        option("Planning Under Uncertainty", "Make reasonable decisions when information is incomplete or changing.", ["Risk", "Uncertainty", "Planning"]),
      ],
    },
    {
      slug: "discipline-habits",
      title: "Discipline & Habits",
      description: "Build routines, consistency, self-control, and follow-through for long-term goals.",
      options: [
        option("Habit Building", "Create repeatable behaviors using cues, routines, and rewards.", ["Habit Design", "Consistency", "Behavior"]),
        option("Self-Discipline", "Practice doing planned work despite discomfort or distraction.", ["Discipline", "Follow-Through", "Self-Control"]),
        option("Goal Setting", "Turn broad goals into specific targets and measurable actions.", ["Goals", "Planning", "Measurement"]),
        option("Procrastination Control", "Reduce avoidance and make difficult tasks easier to start.", ["Task Initiation", "Planning", "Behavior Change"]),
        option("Daily Routines", "Build practical routines around study, work, health, and recovery.", ["Routines", "Consistency", "Planning"]),
        option("Progress Reflection", "Review what worked, what failed, and what to adjust next.", ["Reflection", "Feedback", "Adjustment"]),
      ],
    },
    {
      slug: "creativity-flexibility",
      title: "Creativity & Mental Flexibility",
      description: "Generate ideas, shift perspectives, connect concepts, and think beyond obvious answers.",
      options: [
        option("Creative Thinking", "Practice producing varied and original ideas.", ["Creativity", "Ideation", "Originality"]),
        option("Brainstorming", "Generate options quickly before filtering or judging them.", ["Brainstorming", "Idea Generation", "Divergent Thinking"]),
        option("Perspective Shifting", "Look at the same situation through multiple viewpoints.", ["Perspective", "Flexibility", "Empathy"]),
        option("Idea Connection", "Combine unrelated concepts to create useful new possibilities.", ["Connections", "Synthesis", "Creativity"]),
        option("Flexible Thinking", "Adapt when rules, information, or conditions change.", ["Adaptability", "Reframing", "Mental Flexibility"]),
        option("Design Thinking Basics", "Understand people, define problems, generate ideas, and test solutions.", ["Empathy", "Ideation", "Prototyping"]),
      ],
    },
  ],

  "general-knowledge": [
    {
      slug: "history-civilizations",
      title: "History & Civilizations",
      description: "Understand civilizations, major events, movements, conflicts, and historical change.",
      options: [
        option("Ancient Civilizations", "Mesopotamia, Egypt, Greece, Rome, early Asia, Africa, and the Americas."),
        option("World History", "Major global developments from early societies to the modern world."),
        option("U.S. History", "Colonial America, independence, expansion, conflict, reform, and modern history."),
        option("European History", "Empires, religion, revolution, industrialization, war, and integration."),
        option("African History", "Kingdoms, trade, colonization, independence, culture, and modern states."),
        option("Asian History", "China, India, Japan, Southeast Asia, empires, trade, and modern change."),
        option("Military History", "Strategy, technology, major wars, and how conflict shaped societies."),
        option("Modern History", "Industrialization, world wars, Cold War, globalization, and recent change."),
      ],
    },
    {
      slug: "science-nature",
      title: "Science & Nature",
      description: "Explore the physical universe, living systems, Earth, space, and scientific discovery.",
      options: [
        option("Biology", "Life, cells, genetics, evolution, ecology, and organisms."),
        option("Physics", "Matter, motion, energy, forces, fields, waves, and the universe."),
        option("Chemistry", "Atoms, molecules, reactions, materials, and chemical behavior."),
        option("Space & Astronomy", "Planets, stars, galaxies, black holes, cosmology, and exploration."),
        option("Earth Science", "Geology, atmosphere, oceans, climate, and Earth systems."),
        option("Environment", "Ecosystems, biodiversity, resources, pollution, conservation, and climate."),
        option("Human Body", "Anatomy, physiology, body systems, health, and biological function."),
        option("Scientific Breakthroughs", "How major discoveries changed what humans understand about nature."),
      ],
    },
    {
      slug: "technology-digital-world",
      title: "Technology & The Digital World",
      description: "Understand computers, software, AI, networks, cybersecurity, and emerging technology.",
      options: [
        option("How Computers Work", "Hardware, software, operating systems, memory, storage, and processing."),
        option("The Internet", "Networks, websites, servers, protocols, domains, and online communication."),
        option("Artificial Intelligence", "Machine learning, models, agents, capabilities, limitations, and applications."),
        option("Cybersecurity", "Threats, defense, privacy, authentication, networks, and digital safety."),
        option("Software", "How applications are designed, built, deployed, and maintained."),
        option("Robotics", "Sensors, control, automation, hardware, and intelligent machines."),
        option("Cloud Computing", "Remote infrastructure, services, storage, scaling, and modern computing."),
        option("Emerging Technology", "New developments across AI, biotech, energy, computing, and more."),
      ],
    },
    {
      slug: "economics-money-business",
      title: "Economics, Money & Business",
      description: "Learn how markets, money, companies, incentives, finance, and economic systems work.",
      options: [
        option("Economics", "Scarcity, incentives, markets, trade, growth, inflation, and policy."),
        option("Personal Finance", "Budgeting, saving, banking, investing, credit, and financial planning."),
        option("Investing Basics", "Stocks, bonds, funds, risk, return, diversification, and long-term investing."),
        option("How Businesses Work", "Customers, products, operations, revenue, costs, teams, and competition."),
        option("Entrepreneurship", "Ideas, customers, business models, startups, funding, and growth."),
        option("Banking & Credit", "Banks, loans, interest, credit scores, debt, and financial institutions."),
        option("Taxes", "Why taxes exist, major tax types, filing basics, and public finance."),
        option("Global Trade", "Imports, exports, exchange rates, supply chains, and international markets."),
      ],
    },
    {
      slug: "government-law-civics",
      title: "Government, Law & Civics",
      description: "Understand institutions, legal systems, rights, public policy, and civic life.",
      options: [
        option("How Government Works", "Branches, institutions, elections, agencies, and public administration."),
        option("Constitutions & Rights", "Foundational rules, civil liberties, rights, and legal protections."),
        option("Law Basics", "Courts, legal categories, procedures, evidence, and legal reasoning."),
        option("Civics", "Citizenship, participation, responsibilities, community, and public institutions."),
        option("Public Policy", "How governments identify problems, choose policies, and measure outcomes."),
        option("International Relations", "States, diplomacy, conflict, alliances, institutions, and global cooperation."),
        option("Political Systems", "Compare democracies, monarchies, authoritarian systems, and institutions."),
        option("Local Government", "Cities, counties, services, budgets, planning, and local decision making."),
      ],
    },
    {
      slug: "geography-world",
      title: "Geography & The World",
      description: "Learn how places, populations, resources, borders, and regions connect.",
      options: [
        option("World Geography", "Countries, regions, physical features, populations, and spatial relationships."),
        option("Maps & Navigation", "Coordinates, scale, projections, direction, and reading maps."),
        option("Population & Migration", "Population patterns, cities, migration, demographics, and human movement."),
        option("Resources & Energy", "Where resources come from and how societies use and trade them."),
        option("Climate & Regions", "Climate zones, environments, adaptation, and regional differences."),
        option("Cities & Urbanization", "How cities grow, function, and shape economic and social life."),
        option("Countries of the World", "Learn about individual countries, cultures, geography, and institutions."),
      ],
    },
    {
      slug: "psychology-human-behavior",
      title: "Psychology & Human Behavior",
      description: "Understand thinking, emotion, behavior, personality, development, and social interaction.",
      options: [
        option("Psychology Basics", "Core ideas about behavior, thought, emotion, and scientific study."),
        option("Cognitive Psychology", "Attention, memory, perception, language, learning, and thinking."),
        option("Social Psychology", "Groups, influence, identity, relationships, and social behavior."),
        option("Developmental Psychology", "How people change from childhood through adulthood."),
        option("Personality", "Traits, individual differences, personality theories, and behavior patterns."),
        option("Motivation", "Goals, rewards, needs, habits, effort, and why people act."),
        option("Communication", "How people exchange information, interpret messages, and avoid misunderstandings."),
        option("Decision Psychology", "Biases, judgment, risk, choices, and how people make decisions."),
      ],
    },
    {
      slug: "practical-life",
      title: "Practical Life Knowledge",
      description: "Useful everyday knowledge for adult life, independence, work, and decision making.",
      options: [
        option("Budgeting", "Plan income, expenses, savings, and financial priorities."),
        option("Credit", "Understand credit scores, cards, borrowing, interest, and responsible use."),
        option("Renting & Housing", "Leases, deposits, utilities, moving, maintenance, and housing basics."),
        option("Insurance Basics", "Health, auto, renters, life, deductibles, premiums, and coverage."),
        option("Job & Workplace Basics", "Applications, interviews, communication, pay, policies, and workplace behavior."),
        option("Time Management", "Prioritize responsibilities, schedule work, and manage competing demands."),
        option("Everyday Problem Solving", "Handle practical decisions, compare options, and solve common life problems."),
        option("Digital Safety", "Protect accounts, recognize scams, manage privacy, and use technology safely."),
      ],
    },
    {
      slug: "culture-arts-media",
      title: "Culture, Arts & Media",
      description: "Explore art, music, film, literature, media, culture, and creative expression.",
      options: [
        option("Art History", "Major artistic periods, movements, creators, works, and visual ideas."),
        option("Music", "Genres, theory basics, history, instruments, production, and culture."),
        option("Film & Cinema", "Storytelling, directing, editing, genres, history, and visual language."),
        option("Literature", "Genres, authors, themes, movements, and major works."),
        option("Media Literacy", "Evaluate media messages, sources, framing, advertising, and misinformation."),
        option("World Cultures", "Traditions, beliefs, language, food, customs, and cultural diversity."),
        option("Architecture", "Styles, structures, design ideas, history, and the built environment."),
        option("Photography", "Composition, light, cameras, visual storytelling, and image interpretation."),
      ],
    },
  ],

  "book-intelligence": [
    {
      slug: "fiction-library",
      title: "Fiction Library",
      description: "Use fictional stories to build imagination, creativity, interpretation, empathy, and literary understanding.",
      options: [
        option("Novels", "Study long-form fiction through plot, character, theme, worldbuilding, and interpretation.", ["Character Analysis", "Theme", "Plot", "Interpretation"]),
        option("Short Stories", "Study compact fiction through structure, symbolism, voice, and meaning.", ["Close Reading", "Symbolism", "Structure", "Interpretation"]),
        option("Fantasy", "Explore imagined worlds, systems, myth, character arcs, and creative worldbuilding.", ["Worldbuilding", "Creativity", "Theme", "Character"]),
        option("Science Fiction", "Explore speculative technology, society, ethics, futures, and imaginative ideas.", ["Speculation", "Technology Themes", "Worldbuilding", "Critical Reading"]),
        option("Mystery & Thriller", "Analyze clues, suspense, pacing, perspective, and problem solving in fiction.", ["Inference", "Evidence", "Plot", "Suspense"]),
        option("Historical Fiction", "Connect fictional stories with real historical settings, events, and perspectives.", ["Historical Context", "Character", "Interpretation", "Research"]),
        option("Drama & Plays", "Study dialogue, performance, conflict, character, structure, and dramatic themes.", ["Dialogue", "Drama", "Character", "Theme"]),
        option("Poetry", "Study imagery, sound, form, figurative language, voice, and interpretation.", ["Poetry", "Imagery", "Language", "Interpretation"]),
      ],
    },
    {
      slug: "nonfiction-library",
      title: "Nonfiction Library",
      description: "Learn from books built around real facts, real people, research, ideas, events, and documented experience.",
      options: [
        option("Biography & Memoir", "Learn from real lives, decisions, experiences, context, and documented events.", ["Biography", "Context", "Evidence", "Life Lessons"]),
        option("History", "Learn documented events, chronology, evidence, competing interpretations, and historical context.", ["History", "Evidence", "Chronology", "Source Evaluation"]),
        option("Science", "Understand scientific ideas, discoveries, evidence, experiments, and explanations.", ["Science", "Evidence", "Concepts", "Research"]),
        option("Business & Entrepreneurship", "Learn real business frameworks, cases, strategy, finance, leadership, and operations.", ["Business", "Strategy", "Finance", "Leadership"]),
        option("Finance & Investing", "Learn money, markets, investing, risk, valuation, and financial decision-making.", ["Finance", "Investing", "Risk", "Valuation"]),
        option("Psychology & Human Behavior", "Learn research-based ideas about thinking, behavior, relationships, and decision-making.", ["Psychology", "Behavior", "Research", "Decision Making"]),
        option("Self-Development", "Evaluate practical frameworks for habits, productivity, learning, communication, and growth.", ["Habits", "Learning", "Productivity", "Reflection"]),
        option("Politics & Society", "Study institutions, history, policy, social systems, arguments, evidence, and public life.", ["Institutions", "Policy", "Evidence", "Society"]),
        option("Technology", "Learn how technologies work, how they developed, and how they affect people and industries.", ["Technology", "Systems", "Innovation", "Impact"]),
        option("Textbooks & Academic Books", "Turn dense academic reading into clear explanations, notes, practice, and review.", ["Academic Reading", "Notes", "Recall", "Concepts"]),
      ],
    },
    {
      slug: "understand-analyze",
      title: "Understand & Analyze",
      description: "Go deeper than summaries by examining passages, themes, arguments, evidence, and author choices.",
      options: [
        option("Explain a Passage", "Break a difficult passage into plain language and key ideas."),
        option("Analyze a Chapter", "Examine what a chapter says, how it works, and why it matters."),
        option("Themes & Ideas", "Identify recurring ideas, patterns, and deeper meaning."),
        option("Arguments & Evidence", "Map claims, evidence, assumptions, and reasoning."),
        option("Author's Purpose", "Understand what the author is trying to accomplish and why."),
        option("Difficult Concepts", "Slow down and unpack ideas that are hard to understand."),
        option("Context", "Learn the historical, cultural, intellectual, or personal context behind the text."),
        option("Question the Book", "Challenge assumptions and examine what may be incomplete or debatable."),
      ],
    },
    {
      slug: "remember-study",
      title: "Remember & Study",
      description: "Turn reading into durable knowledge with recall, notes, testing, and spaced review.",
      options: [
        option("Book Recall", "Retrieve the important ideas without looking back at the book."),
        option("Practice Questions", "Answer questions that test real understanding rather than recognition."),
        option("Flashcards", "Create concise prompts for concepts, definitions, people, and arguments."),
        option("Chapter Review", "Test what you remember after each chapter before moving on."),
        option("Teach It Back", "Explain the book in your own words and receive feedback."),
        option("Spaced Book Review", "Build a schedule for revisiting important ideas over time."),
        option("Book Study Guide", "Organize concepts, people, arguments, examples, and review questions."),
        option("Concept Map", "Show how the book's major ideas connect to one another."),
      ],
    },
    {
      slug: "apply-create",
      title: "Apply & Create",
      description: "Turn what you read into actions, projects, writing, creativity, decisions, and new ideas.",
      options: [
        option("Apply This Book", "Turn the book's ideas into practical actions for your situation."),
        option("Real-World Examples", "Connect abstract ideas to realistic cases and situations."),
        option("Projects", "Build a project that requires applying the book's lessons."),
        option("Personal Application", "Adapt useful ideas to your goals, habits, work, or life."),
        option("Action Plan", "Convert important lessons into a sequence of concrete next steps."),
        option("Creative Writing From Fiction", "Use fictional techniques to strengthen imagination, characters, scenes, and storytelling."),
        option("Compare Two Books", "See where two books agree, disagree, overlap, and differ."),
        option("Synthesize Multiple Books", "Combine insights from several books into one coherent understanding."),
      ],
    },
  ],
};

export function getLearningSections(world: string) {
  return learningSectionsByWorld[world] ?? [];
}

export function getLearningSection(world: string, sectionSlug: string) {
  return getLearningSections(world).find((section) => section.slug === sectionSlug);
}

export function slugifyLearningTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLearningOption(
  world: string,
  sectionSlug: string,
  topicSlug: string
) {
  const section = getLearningSection(world, sectionSlug);
  if (!section) return null;

  const option = section.options.find(
    (item) => slugifyLearningTitle(item.title) === topicSlug
  );

  return option ? { section, option } : null;
}
