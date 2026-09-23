export type CareerLesson = {
  title: string;
  description: string;
};

export type CareerSection = {
  slug: string;
  title: string;
  description: string;
  lessons: CareerLesson[];
};

export const careerSections: CareerSection[] = [
  {
    slug: "technology-computing",
    title: "Technology & Computing",
    description:
      "Software, AI, cybersecurity, data, cloud systems, product design, and modern computing careers.",
    lessons: [
      { title: "Software Engineer", description: "Programming languages, computer science, algorithms, databases, APIs, testing, architecture, security, Git, and software deployment." },
      { title: "Full-Stack Web Developer", description: "Build complete web products with HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, SQL/PostgreSQL, APIs, authentication, testing, and deployment." },
      { title: "Frontend Developer", description: "Build accessible, responsive interfaces with HTML, CSS, JavaScript, TypeScript, React, modern frontend frameworks, testing, and performance." },
      { title: "Backend Developer", description: "Build server applications with Node.js/TypeScript, Python, Java/C#/Go concepts, SQL databases, APIs, authentication, testing, security, and cloud deployment." },
      { title: "Mobile App Developer", description: "Build iOS and Android applications with React Native/TypeScript or Flutter/Dart, device APIs, networking, storage, testing, and app distribution." },
      { title: "AI Engineer", description: "Build AI products with Python, SQL, machine-learning foundations, LLM APIs, RAG, embeddings, vector databases, evaluation, agents, guardrails, and deployment." },
      { title: "Machine Learning Engineer", description: "Train and deploy models using Python, SQL, statistics, scikit-learn, PyTorch/TensorFlow, data pipelines, experiment tracking, containers, and MLOps." },
      { title: "Cybersecurity Analyst", description: "Learn networking, Linux/Windows security, Python and shell scripting, SIEM, packet analysis, vulnerability management, IAM, incident response, web security, and cloud security." },
      { title: "Data Scientist", description: "Use Python, SQL, statistics, experimentation, visualization, machine learning, reproducible analysis, and data storytelling." },
      { title: "Data Analyst", description: "Use Excel, SQL, statistics, dashboards, Power BI/Tableau-style tools, data cleaning, visualization, business metrics, and Python analysis." },
      { title: "Cloud Engineer", description: "Build cloud infrastructure with Linux, networking, AWS/Azure/GCP concepts, IAM, Terraform, Docker, Kubernetes, CI/CD, monitoring, security, and cost controls." },
      { title: "DevOps Engineer", description: "Automate software delivery with Linux, Bash/Python, Git, CI/CD, Docker, Kubernetes, Terraform, cloud infrastructure, observability, reliability, and incident practices." },
      { title: "UX / Product Designer", description: "Learn user research, information architecture, wireframing, Figma-style tools, prototyping, interaction design, accessibility, usability testing, and design systems." },
      { title: "IT Support Specialist", description: "Troubleshoot hardware, Windows/macOS, networking, accounts, endpoints, directory services, ticketing, PowerShell, security, and user support." },
      { title: "Solutions Architect", description: "Design systems across applications, APIs, data, networking, cloud, security, identity, reliability, scalability, cost, integrations, and technical documentation." },
    ],
  },
  {
    slug: "healthcare-medicine",
    title: "Healthcare & Medicine",
    description:
      "Clinical care, medicine, therapy, diagnostics, pharmacy, dentistry, and health-support careers.",
    lessons: [
      { title: "Physician / Doctor", description: "Understand the medical career path, clinical reasoning, specialties, and patient care." },
      { title: "Registered Nurse", description: "Learn nursing responsibilities, patient care, communication, and clinical basics." },
      { title: "Pharmacist", description: "Learn medication science, pharmacy practice, safety, and patient counseling." },
      { title: "Dentist", description: "Explore oral health, dentistry training, procedures, and patient care." },
      { title: "Physical Therapist", description: "Learn movement assessment, rehabilitation, and recovery planning." },
      { title: "Occupational Therapist", description: "Help people regain independence in daily activities and work." },
      { title: "Radiologic Technologist", description: "Learn medical imaging, patient positioning, safety, and clinical workflow." },
      { title: "Medical Laboratory Scientist", description: "Study lab testing, specimens, diagnostics, and healthcare quality." },
      { title: "Emergency Medical Technician", description: "Learn emergency response, patient assessment, and pre-hospital care." },
      { title: "Mental Health Counselor", description: "Explore counseling skills, ethics, communication, and client support." },
      { title: "Healthcare Administrator", description: "Learn healthcare operations, finance, staffing, quality, and policy." },
      { title: "Medical Assistant", description: "Learn front-office and basic clinical support responsibilities." },
    ],
  },
  {
    slug: "engineering-architecture",
    title: "Engineering & Architecture",
    description:
      "Design, build, test, and improve physical systems, structures, machines, products, and infrastructure.",
    lessons: [
      { title: "Mechanical Engineer", description: "Machines, mechanics, product design, manufacturing, and problem solving." },
      { title: "Civil Engineer", description: "Roads, bridges, buildings, water systems, and public infrastructure." },
      { title: "Electrical Engineer", description: "Circuits, electronics, power systems, controls, and hardware." },
      { title: "Aerospace Engineer", description: "Aircraft, spacecraft, aerodynamics, propulsion, and flight systems." },
      { title: "Chemical Engineer", description: "Chemical processes, manufacturing, materials, safety, and scale-up." },
      { title: "Biomedical Engineer", description: "Apply engineering to medical devices, healthcare technology, and biology." },
      { title: "Industrial Engineer", description: "Improve systems, efficiency, quality, operations, and production." },
      { title: "Environmental Engineer", description: "Solve water, pollution, waste, and environmental infrastructure problems." },
      { title: "Architect", description: "Design buildings through space planning, drawing, codes, and construction knowledge." },
      { title: "Urban Planner", description: "Plan communities, transportation, land use, and long-term development." },
      { title: "CAD Designer", description: "Create technical drawings and digital models for products and structures." },
      { title: "Construction Engineer", description: "Coordinate engineering, field work, schedules, safety, and construction delivery." },
    ],
  },
  {
    slug: "finance-accounting-economics",
    title: "Finance, Accounting & Economics",
    description:
      "Money, investments, accounting, banking, financial planning, markets, risk, and economic decision-making.",
    lessons: [
      { title: "Accountant", description: "Financial statements, bookkeeping, controls, taxes, and accounting careers." },
      { title: "Financial Analyst", description: "Analyze companies, forecasts, financial performance, and decisions." },
      { title: "Investment Analyst", description: "Research investments, markets, valuation, and portfolio decisions." },
      { title: "Investment Banker", description: "Learn deals, capital raising, valuation, mergers, and banking workflows." },
      { title: "Financial Planner", description: "Help people plan saving, investing, retirement, taxes, and financial goals." },
      { title: "Economist", description: "Study markets, incentives, policy, data, and economic behavior." },
      { title: "Actuary", description: "Use statistics and risk models for insurance and financial decisions." },
      { title: "Commercial Banker", description: "Learn lending, credit analysis, client relationships, and banking products." },
      { title: "Auditor", description: "Evaluate records, controls, compliance, and financial accuracy." },
      { title: "Tax Specialist", description: "Learn tax concepts, filing, planning, compliance, and client work." },
      { title: "Risk Analyst", description: "Identify and measure financial, operational, and market risks." },
      { title: "Treasury Analyst", description: "Manage cash, liquidity, banking, forecasting, and corporate funding." },
    ],
  },
  {
    slug: "business-entrepreneurship",
    title: "Business & Entrepreneurship",
    description:
      "Build, operate, lead, finance, market, and grow companies without making the entire career world only about business.",
    lessons: [
      { title: "Startup Founder", description: "Idea validation, MVPs, customers, funding, hiring, and growth." },
      { title: "Small Business Owner", description: "Operations, pricing, customers, cash flow, and daily business management." },
      { title: "Product Manager", description: "Product strategy, user needs, roadmaps, teams, and prioritization." },
      { title: "Operations Manager", description: "Processes, people, quality, costs, logistics, and execution." },
      { title: "Project Manager", description: "Plan scope, schedules, teams, risks, communication, and delivery." },
      { title: "Management Consultant", description: "Analyze business problems, structure recommendations, and communicate solutions." },
      { title: "Human Resources Manager", description: "Hiring, performance, employee relations, policies, and culture." },
      { title: "Supply Chain Manager", description: "Sourcing, inventory, logistics, suppliers, and operations planning." },
      { title: "Business Analyst", description: "Translate business problems into requirements, processes, and solutions." },
      { title: "Chief Executive Officer", description: "Strategy, leadership, capital allocation, teams, and company direction." },
    ],
  },
  {
    slug: "law-government-public-safety",
    title: "Law, Government & Public Safety",
    description:
      "Legal work, public service, emergency response, policy, justice, and community safety careers.",
    lessons: [
      { title: "Lawyer / Attorney", description: "Legal reasoning, research, writing, advocacy, ethics, and practice areas." },
      { title: "Paralegal", description: "Legal research, case preparation, documents, filings, and client support." },
      { title: "Police Officer", description: "Public safety, law enforcement responsibilities, communication, and procedure." },
      { title: "Firefighter", description: "Emergency response, fire safety, rescue, teamwork, and physical preparation." },
      { title: "Emergency Manager", description: "Prepare for disasters, coordinate response, recovery, and public communication." },
      { title: "Policy Analyst", description: "Research policy problems, data, tradeoffs, and recommendations." },
      { title: "City / Public Administrator", description: "Learn government operations, budgeting, services, and public management." },
      { title: "Probation Officer", description: "Supervision, case management, rehabilitation, documentation, and public safety." },
      { title: "Court Reporter", description: "Learn legal proceedings, transcription, accuracy, and courtroom workflow." },
      { title: "Criminal Investigator", description: "Evidence, interviews, case analysis, documentation, and investigative process." },
    ],
  },
  {
    slug: "education-human-services",
    title: "Education & Human Services",
    description:
      "Teaching, counseling, social services, training, child development, and people-centered careers.",
    lessons: [
      { title: "Teacher", description: "Lesson planning, classroom management, instruction, assessment, and student support." },
      { title: "Professor", description: "Higher education teaching, research, academic careers, and mentoring." },
      { title: "School Counselor", description: "Student support, academic planning, wellbeing, and school communication." },
      { title: "Social Worker", description: "Case management, resources, advocacy, ethics, and client support." },
      { title: "Psychologist", description: "Behavior, assessment, research, specialties, and psychology career paths." },
      { title: "Childcare / Early Childhood Educator", description: "Child development, learning environments, safety, and family communication." },
      { title: "Corporate Trainer", description: "Teach employees through training programs, facilitation, and learning design." },
      { title: "Instructional Designer", description: "Design courses, learning activities, assessments, and digital instruction." },
      { title: "Academic Advisor", description: "Help students choose courses, goals, programs, and academic paths." },
      { title: "Community Services Manager", description: "Coordinate programs, teams, funding, outreach, and community impact." },
    ],
  },
  {
    slug: "science-research",
    title: "Science & Research",
    description:
      "Laboratory, field, analytical, and research careers across the natural and applied sciences.",
    lessons: [
      { title: "Biologist", description: "Living systems, research methods, labs, field work, and biological careers." },
      { title: "Chemist", description: "Matter, reactions, laboratory methods, safety, and chemical research." },
      { title: "Physicist", description: "Matter, energy, mathematical modeling, experiments, and research." },
      { title: "Astronomer", description: "Stars, planets, galaxies, observation, data, and space science." },
      { title: "Environmental Scientist", description: "Study ecosystems, pollution, climate, conservation, and environmental data." },
      { title: "Geologist", description: "Earth materials, rocks, hazards, resources, and field investigation." },
      { title: "Microbiologist", description: "Microorganisms, lab methods, disease, biotechnology, and research." },
      { title: "Forensic Scientist", description: "Apply laboratory science to evidence, analysis, documentation, and legal cases." },
      { title: "Research Scientist", description: "Design studies, collect data, analyze results, and communicate findings." },
      { title: "Laboratory Technician", description: "Specimen handling, instruments, safety, quality control, and lab workflow." },
    ],
  },
  {
    slug: "creative-media-design",
    title: "Creative Arts, Media & Design",
    description:
      "Visual design, writing, film, audio, fashion, content, animation, and creative production careers.",
    lessons: [
      { title: "Graphic Designer", description: "Visual communication, layout, typography, branding, and design tools." },
      { title: "Animator", description: "Motion, storytelling, character animation, production, and animation careers." },
      { title: "Video Editor", description: "Editing, pacing, audio, color, storytelling, and post-production workflow." },
      { title: "Filmmaker / Director", description: "Story development, directing, production, cinematography, and crews." },
      { title: "Photographer", description: "Composition, lighting, cameras, editing, clients, and photography careers." },
      { title: "Content Creator", description: "Audience building, content strategy, production, platforms, and monetization." },
      { title: "Copywriter", description: "Write persuasive marketing, brand, advertising, and web copy." },
      { title: "Journalist", description: "Reporting, interviewing, verification, writing, and media ethics." },
      { title: "Fashion Designer", description: "Garment design, materials, sketching, collections, and fashion production." },
      { title: "Music Producer", description: "Recording, arrangement, sound design, mixing, and music production workflow." },
      { title: "Interior Designer", description: "Space planning, materials, color, furnishings, clients, and design presentation." },
      { title: "Game Designer", description: "Design mechanics, systems, player experiences, levels, and game concepts." },
    ],
  },
  {
    slug: "skilled-trades-construction",
    title: "Skilled Trades & Construction",
    description:
      "Hands-on careers that build, install, repair, maintain, and improve homes, buildings, and infrastructure.",
    lessons: [
      { title: "Electrician", description: "Electrical systems, wiring, safety, codes, tools, and apprenticeship paths." },
      { title: "Plumber", description: "Water, drainage, fixtures, piping, repair, codes, and job-site skills." },
      { title: "HVAC Technician", description: "Heating, cooling, refrigeration, diagnostics, maintenance, and installation." },
      { title: "Carpenter", description: "Framing, finish work, tools, measurements, plans, and construction practices." },
      { title: "Welder", description: "Welding processes, metals, safety, fabrication, inspection, and career paths." },
      { title: "Construction Manager", description: "Schedules, budgets, contractors, safety, plans, and site coordination." },
      { title: "Heavy Equipment Operator", description: "Operate machinery safely for construction, excavation, and infrastructure." },
      { title: "Automotive Technician", description: "Vehicle systems, diagnostics, maintenance, repair, and shop workflow." },
      { title: "Diesel Mechanic", description: "Maintain and repair diesel engines, trucks, and heavy equipment." },
      { title: "Solar Installer", description: "Solar systems, electrical basics, rooftop safety, installation, and maintenance." },
      { title: "Building Inspector", description: "Codes, plans, construction quality, safety, and inspection procedures." },
      { title: "Machinist", description: "Precision measurement, machine tools, CNC, materials, and manufacturing." },
    ],
  },
  {
    slug: "hospitality-travel-culinary",
    title: "Hospitality, Travel & Culinary",
    description:
      "Food, hotels, tourism, events, guest experience, travel, and service-management careers.",
    lessons: [
      { title: "Chef", description: "Cooking fundamentals, kitchen operations, menus, food safety, and culinary careers." },
      { title: "Baker / Pastry Chef", description: "Baking science, pastry techniques, production, presentation, and business basics." },
      { title: "Restaurant Manager", description: "Staffing, service, inventory, costs, food safety, and guest experience." },
      { title: "Hotel Manager", description: "Front desk, rooms, operations, service quality, staffing, and hotel finance." },
      { title: "Event Planner", description: "Plan venues, budgets, timelines, vendors, guests, and event execution." },
      { title: "Travel Advisor", description: "Plan travel, research destinations, manage bookings, and serve clients." },
      { title: "Tourism Manager", description: "Destinations, attractions, visitor experience, marketing, and tourism operations." },
      { title: "Flight Attendant", description: "Cabin safety, service, communication, emergency procedures, and airline careers." },
      { title: "Catering Manager", description: "Menus, staffing, logistics, service, events, and food operations." },
      { title: "Guest Experience Specialist", description: "Service recovery, communication, hospitality standards, and customer care." },
    ],
  },
  {
    slug: "transportation-aviation-logistics",
    title: "Transportation, Aviation & Logistics",
    description:
      "Move people and goods safely through aviation, shipping, trucking, rail, supply chains, and logistics systems.",
    lessons: [
      { title: "Airline Pilot", description: "Flight training, aviation systems, safety, navigation, and pilot career paths." },
      { title: "Aircraft Mechanic", description: "Aircraft systems, maintenance, inspections, repair, and aviation safety." },
      { title: "Air Traffic Controller", description: "Traffic sequencing, communication, safety, procedures, and aviation operations." },
      { title: "Logistics Coordinator", description: "Shipments, carriers, schedules, tracking, documentation, and problem solving." },
      { title: "Supply Chain Analyst", description: "Analyze inventory, demand, suppliers, transportation, and supply-chain performance." },
      { title: "Truck Driver", description: "Commercial driving, safety, regulations, route planning, and freight operations." },
      { title: "Marine / Ship Officer", description: "Navigation, vessel operations, safety, cargo, and maritime careers." },
      { title: "Railroad Operations", description: "Rail systems, safety, dispatch, maintenance, and freight/passenger operations." },
      { title: "Warehouse Manager", description: "Inventory, labor, safety, layout, technology, and fulfillment operations." },
      { title: "Fleet Manager", description: "Vehicles, maintenance, drivers, routing, safety, and operating costs." },
    ],
  },
  {
    slug: "sales-marketing-customer-experience",
    title: "Sales, Marketing & Customer Experience",
    description:
      "Reach customers, communicate value, build brands, grow revenue, and improve customer relationships.",
    lessons: [
      { title: "Sales Representative", description: "Prospecting, discovery, presenting value, objections, and closing." },
      { title: "Account Executive", description: "Manage sales opportunities, demos, negotiations, and client relationships." },
      { title: "Marketing Manager", description: "Strategy, campaigns, customers, channels, budgets, and measurement." },
      { title: "Digital Marketing Specialist", description: "SEO, paid media, email, social, analytics, and online growth." },
      { title: "Brand Manager", description: "Positioning, messaging, customer perception, campaigns, and brand strategy." },
      { title: "Market Research Analyst", description: "Research customers, competitors, trends, data, and market opportunities." },
      { title: "Customer Success Manager", description: "Onboarding, adoption, relationships, retention, and customer outcomes." },
      { title: "Public Relations Specialist", description: "Media relations, messaging, reputation, press, and public communication." },
      { title: "Social Media Manager", description: "Content planning, community, platforms, analytics, and brand voice." },
      { title: "E-Commerce Specialist", description: "Online stores, merchandising, conversion, promotions, and digital operations." },
    ],
  },
  {
    slug: "environment-agriculture-animal-care",
    title: "Environment, Agriculture & Animal Care",
    description:
      "Work with ecosystems, food systems, natural resources, farming, animals, and conservation.",
    lessons: [
      { title: "Veterinarian", description: "Animal medicine, diagnosis, treatment, client communication, and veterinary careers." },
      { title: "Veterinary Technician", description: "Animal care, clinical support, procedures, labs, and veterinary workflow." },
      { title: "Agricultural Scientist", description: "Crops, soil, food systems, research, and agricultural technology." },
      { title: "Farm Manager", description: "Production, equipment, workers, crops, livestock, costs, and farm operations." },
      { title: "Conservation Scientist", description: "Protect land, habitats, wildlife, and natural resources using science and planning." },
      { title: "Wildlife Biologist", description: "Study animals, habitats, populations, field methods, and conservation." },
      { title: "Forester", description: "Forest health, timber, ecology, fire management, and sustainable land use." },
      { title: "Environmental Technician", description: "Field sampling, monitoring, testing, compliance, and environmental data." },
      { title: "Landscape Designer", description: "Plants, outdoor spaces, site planning, aesthetics, and client projects." },
      { title: "Animal Trainer", description: "Behavior, reinforcement, safety, communication, and animal training careers." },
    ],
  },
  {
    slug: "sports-fitness-wellness",
    title: "Sports, Fitness & Wellness",
    description:
      "Performance, coaching, exercise, sports business, recreation, nutrition, and wellness careers.",
    lessons: [
      { title: "Personal Trainer", description: "Exercise programming, technique, client goals, safety, and coaching." },
      { title: "Strength & Conditioning Coach", description: "Performance training, testing, recovery, programming, and athlete development." },
      { title: "Athletic Trainer", description: "Injury prevention, evaluation, rehabilitation support, and sports healthcare." },
      { title: "Sports Coach", description: "Teach skills, strategy, communication, practice planning, and team development." },
      { title: "Sports Manager", description: "Teams, events, business operations, sponsorships, and sports organizations." },
      { title: "Sports Analyst", description: "Use performance data, video, statistics, and strategy to analyze sports." },
      { title: "Nutrition Coach", description: "Nutrition basics, habits, client education, goals, and scope of practice." },
      { title: "Recreation Director", description: "Programs, facilities, staff, events, budgets, and community recreation." },
      { title: "Fitness Instructor", description: "Lead group exercise safely through cueing, programming, and motivation." },
      { title: "Sports Marketing Specialist", description: "Fans, brands, sponsorships, campaigns, partnerships, and events." },
    ],
  },
  {
    slug: "professional-workplace-skills",
    title: "Professional & Workplace Skills",
    description:
      "Universal skills that help in almost every career, from communication and leadership to planning and problem solving.",
    lessons: [
      { title: "Communication", description: "Speak clearly, listen well, ask better questions, and avoid misunderstandings." },
      { title: "Public Speaking", description: "Present ideas confidently, structure talks, and handle nerves." },
      { title: "Professional Writing", description: "Write clear emails, reports, proposals, messages, and workplace documents." },
      { title: "Leadership", description: "Set direction, build trust, give feedback, make decisions, and lead teams." },
      { title: "Negotiation", description: "Prepare, communicate interests, trade value, and reach stronger agreements." },
      { title: "Project Management", description: "Plan tasks, timelines, scope, risks, teams, and delivery." },
      { title: "Time Management", description: "Prioritize, plan, focus, and manage competing responsibilities." },
      { title: "Problem Solving", description: "Define problems, identify causes, compare options, and choose solutions." },
      { title: "Job Interviewing", description: "Prepare answers, tell strong stories, ask questions, and improve interview performance." },
      { title: "Resume & LinkedIn", description: "Present experience, skills, achievements, and professional value clearly." },
      { title: "Networking", description: "Build genuine professional relationships and follow up effectively." },
      { title: "Workplace Etiquette", description: "Professional behavior, reliability, communication, boundaries, and teamwork." },
    ],
  },
];

export function getCareerSection(slug: string) {
  return careerSections.find((section) => section.slug === slug);
}
