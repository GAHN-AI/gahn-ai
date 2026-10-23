import { readUnits } from "./schema";

export const schoolUnits = readUnits(`
whole-number|Whole numbers and calculation|Place value and expanded notation;Compare and round whole numbers;Multi-digit multiplication;Long division and remainders;Factors and multiples;Order of operations|Explain and check a multi-step shopping calculation
fractions|Fractions and mixed numbers|Equivalent fractions with models;Simplify with common factors;Compare fractions on a number line;Add and subtract unlike denominators;Multiply fractions and mixed numbers;Divide fractions and explain the reciprocal|Solve a recipe-scaling problem with labeled models
decimals|Decimals and percentages|Decimal place value;Add and subtract decimals;Multiply and divide decimals;Convert fractions and decimals;Find a percent of a quantity;Estimate to check a decimal answer|Compare three sale prices including a percentage discount
ratios|Ratios and unit rates|Read and write a ratio;Equivalent ratio tables;Unit rates with units;Double number lines;Compare rates;Scale a recipe or map|Choose a better-value purchase using two different methods
integers|Signed numbers and coordinate planes|Opposites and absolute value;Order signed numbers;Add and subtract integers;Multiply and divide signed numbers;Plot points in four quadrants;Interpret coordinates in a situation|Describe a temperature change using a number line
expressions|Expressions and one-step equations|Translate words into expressions;Evaluate an expression;Distributive property;Combine like terms;Solve one-step equations;Write and check a simple inequality|Model an unknown price and verify the solution
measurement|Area, surface area and volume|Area of triangles and quadrilaterals;Composite figures;Nets of prisms;Surface area;Volume of rectangular prisms;Convert measurement units|Design packaging and calculate its material and capacity
data-intro|Describing data|Statistical questions;Dot plots and frequency tables;Mean, median and mode;Range and interquartile range;Box plots;Choose a useful summary|Compare two small datasets and explain an outlier
proportions|Proportional relationships|Recognize proportional tables;Constant of proportionality;Graph a proportional relationship;Scale drawings;Percent increase and decrease;Simple interest in a fictional example|Compare a scale drawing with its real dimensions
rational|Rational-number reasoning|Represent rational numbers;Operate with signed fractions;Operate with signed decimals;Nested expressions;Estimate rational results;Explain common sign errors|Correct and justify a set of rational-number calculations
linear-equations|Linear equations and inequalities|Two-step equations;Variables on both sides;Equations with parentheses;No solution and infinitely many solutions;Multi-step inequalities;Graph solution sets|Model a budget limit with an inequality
geometry-angles|Angles, triangles and circles|Angle relationships;Triangle angle sum;Construct triangles from measurements;Circumference;Area of circles;Composite area and volume|Design a circular garden with a measured border
probability|Probability and sampling|Probability as a proportion;Sample spaces;Independent events;Experimental probability;Random sampling;Compare populations cautiously|Compare a simulated probability with a theoretical prediction
exponents|Exponents and roots|Exponent rules;Zero and negative exponents;Scientific notation;Square and cube roots;Approximate irrational numbers;Compare orders of magnitude|Explain a scientific-notation calculation with units
linear-functions|Slope and linear functions|Rate of change from a table;Slope between two points;Slope-intercept form;Graph from an equation;Write a linear model;Interpret intercepts and domain|Model a rental cost and explain where the model applies
systems|Systems of linear equations|Solutions as intersections;Solve by graphing;Solve by substitution;Solve by elimination;Classify systems;Model two changing quantities|Find and interpret the break-even point of two plans
transformations|Transformations and similarity|Translations on a coordinate plane;Reflections;Rotations;Dilations;Congruence and similarity;Use a similarity scale factor|Create and justify a sequence of transformations
pythagoras|Right triangles and distance|Explain the Pythagorean relationship;Find a missing side;Converse of the theorem;Distance on a coordinate plane;Volume of cylinders;Volume of cones and spheres|Solve a route-distance problem with a diagram
bivariate|Relationships in data|Scatterplots;Direction and strength of association;Informal lines of fit;Residuals as prediction errors;Two-way frequency tables;Association does not establish cause|Describe and critique a prediction from a scatterplot
algebra-foundations|Algebraic structure and equations|Equivalent expressions;Distribute and factor common terms;Literal equations;Interval notation;Compound inequalities;Absolute-value equations|Create an algebraic model and check all restrictions
function-language|Functions and representations|Input, output and function notation;Domain and range;Read function graphs;Piecewise functions;Compare two representations;Transform a parent function|Describe a piecewise pricing function across its domain
polynomials|Polynomial operations|Terms, degree and coefficients;Add and subtract polynomials;Multiply monomials and binomials;Special products;Factor greatest common factors;Factor simple quadratics|Connect an area model to a factored polynomial
quadratics|Quadratic functions and equations|Parabolas and key features;Solve by factoring;Complete the square;Quadratic formula;Discriminant and number of roots;Choose a suitable form|Model a quadratic situation and explain the useful solution
exponential|Exponential growth and decay|Repeated multiplication;Exponential equations from tables;Growth and decay factors;Compare linear and exponential change;Interpret an initial value;Limitations of a growth model|Compare two fictional growth scenarios with graphs
proof|Geometric reasoning and proof|Definitions, postulates and theorems;Conditional statements;Converse and counterexamples;Parallel lines and transversals;Write a two-column proof;Write a clear paragraph proof|Prove an angle relationship and identify every justification
triangle-proof|Triangle congruence and similarity|SSS, SAS and ASA;Why SSA is not a general criterion;Corresponding parts;Similarity criteria;Proportional segments;Geometric constructions|Prove two triangles are congruent or provide a counterexample
circle-geometry|Circle geometry|Central and inscribed angles;Chords and tangents;Arc length;Sector area;Equations of circles;Circle intersections in context|Plan and justify a circular design using arcs and sectors
coordinate-proof|Coordinate geometry|Midpoints and distance;Parallel and perpendicular slopes;Classify quadrilaterals;Partition a segment;Coordinate proofs;Area from coordinates|Prove the type of a quadrilateral from its vertices
trigonometry|Right-triangle trigonometry|Sine, cosine and tangent;Choose a trigonometric ratio;Find an unknown side;Inverse trigonometric ratios;Angles of elevation;Interpret measurement error|Estimate a height from safe supplied measurements
solid-geometry|Solid geometry and scale|Cross-sections of solids;Surface area of composite solids;Volume and scale factors;Density as a ratio;Compare similar solids;Optimize within a stated constraint|Compare two container designs with a justified recommendation
complex|Complex numbers and polynomial roots|The imaginary unit;Add and multiply complex numbers;Complex conjugates;Solve quadratics with complex roots;Polynomial division;Remainder and factor theorems|Connect real and complex roots to polynomial factors
rational-functions|Rational expressions and functions|Simplify with domain restrictions;Multiply and divide rational expressions;Add unlike denominators;Solve rational equations;Vertical and horizontal asymptotes;Identify extraneous solutions|Analyze a rational model including excluded inputs
radical-functions|Radicals and inverse functions|Simplify radical expressions;Rational exponents;Solve radical equations;Check extraneous roots;Inverse functions;Restrict domains for invertibility|Find and verify an inverse with an appropriate domain
logarithms|Logarithms and exponential models|Logarithms as inverses;Product and quotient rules;Power rule;Change of base;Solve exponential equations;Interpret a logarithmic scale|Fit and interpret a growth model with its assumptions
sequences|Sequences and series|Arithmetic sequences;Geometric sequences;Explicit and recursive rules;Finite arithmetic series;Finite geometric series;Convergence of an infinite geometric series|Compare recurring deposits in two fictional models
unit-circle|Angles and the unit circle|Radians and degrees;Arc length in radians;Coordinates on the unit circle;Exact trigonometric values;Reference angles;Signs in each quadrant|Build and explain a unit-circle reference from triangles
trig-functions|Trigonometric functions and identities|Graph sine and cosine;Amplitude, period and phase shift;Graph tangent;Pythagorean identities;Solve trigonometric equations;Model periodic behavior|Model a periodic dataset and explain parameter choices
vectors|Vectors and analytic geometry|Vector components and magnitude;Vector addition;Scalar multiplication;Dot product;Parametric equations;Polar coordinates|Model a two-dimensional displacement with vectors
limits|Limits and continuity|Estimate limits from tables;Read one-sided limits;Limit laws;Resolve a removable discontinuity;Infinite limits and asymptotes;Continuity at a point|Explain a limit using numerical, graphical and algebraic evidence
derivatives|Derivatives and rates of change|Average versus instantaneous rate;Derivative from a limit;Power rule;Product and quotient rules;Chain rule;Interpret derivative units|Derive and interpret a changing quantity in context
calculus-applications|Applications of derivatives|Increasing and decreasing intervals;Critical points and extrema;Concavity and inflection;Optimization;Related rates;Check endpoint and domain conditions|Solve an optimization problem with a justified domain
integrals|Integrals and accumulation|Area estimates and Riemann sums;Definite integrals;Fundamental theorem of calculus;Antiderivatives;Substitution;Net change versus total amount|Connect an accumulation graph with its rate of change
inferential-stats|Statistical inference foundations|Study design and confounding;Sampling distributions;Standard error;Confidence intervals;Hypothesis tests;Interpret p-values and limitations|Critique an inference using a supplied study and dataset
cells|Cells and living systems|Use a microscope image scale;Plant and animal cell structures;Specialized cells;Diffusion and osmosis;Levels of organization;Distinguish a model from a cell|Explain transport in a labeled cell model
ecology|Ecosystems and interactions|Food chains and webs;Energy transfer;Competition and interdependence;Population changes;Carbon and water cycles;Human effects on ecosystems|Predict and justify the effect of one ecosystem change
earth-processes|Earth materials and change|Rock types and the rock cycle;Weathering and erosion;Plate boundaries;Earthquakes and volcanoes;Geologic time;Evidence from fossils and strata|Explain a landscape using multiple forms of evidence
weather|Weather and climate|Air pressure and winds;Clouds and precipitation;Weather maps;Ocean and atmospheric circulation;Climate versus daily weather;Read a long-term climate graph|Compare two locations using supplied climate data
space|Earth and space|Day, night and seasons;Moon phases;Gravity and orbits;Solar-system scale;Stars and light;Evidence and limitations of space models|Explain a seasonal pattern using a physical model
body-systems|Human body systems|Cells to organs and systems;Digestion and absorption;Respiration and gas exchange;Circulation;Nervous-system signaling;Homeostasis and feedback|Trace oxygen and nutrients through interacting systems
genetics|Inheritance and variation|DNA, genes and chromosomes;Mitosis and meiosis;Dominant and recessive models;Punnett squares;Genetic and environmental variation;Limits of simple inheritance models|Interpret a fictional inheritance example without predicting a real person's health
evolution|Evolution and biodiversity|Variation within populations;Natural selection;Adaptation versus intention;Evidence for common ancestry;Speciation;Classification and biodiversity|Explain a population change with evidence across generations
chemical-change|Chemical reactions|Physical versus chemical change;Atoms and molecules;Elements and compounds;Conservation of mass;Read a chemical equation;Balance simple equations|Balance and explain a set of safe hypothetical reactions
motion|Forces and motion|Position, distance and displacement;Speed and velocity;Acceleration;Force diagrams;Newton's laws;Friction and drag|Interpret a motion graph and a matching force diagram
waves|Waves, sound and light|Amplitude, wavelength and frequency;Transverse and longitudinal waves;Wave speed;Reflection and refraction;Sound and vibration;Electromagnetic spectrum|Explain a supplied wave pattern using measurements
circuits|Electricity and circuits|Charge and current;Voltage and resistance;Series circuits;Parallel circuits;Ohm's law;Electrical energy and power|Analyze a simulated low-voltage circuit
cell-energy|Cell chemistry and energy|Biological macromolecules;Enzymes and activation energy;Photosynthesis inputs and outputs;Cellular respiration;ATP as an energy-transfer model;Limiting factors in a biological experiment|Interpret an enzyme-rate dataset with controlled variables
molecular-genetics|Molecular genetics|DNA structure and replication;Transcription;Translation;Mutations;Gene regulation;Ethical questions around genetic technologies|Trace a supplied DNA sequence through a simplified protein model
biology-investigation|Biological investigation|Frame a testable biological question;Choose controls and replicates;Measure a response consistently;Graph variation;Evaluate sampling limitations;Write a biological conclusion|Design a safe paper-based biological investigation
atomic-structure|Atoms and periodicity|Subatomic particles;Isotopes and relative mass;Electron arrangement;Periodic groups and periods;Trends across the periodic table;Connect structure with reactivity|Explain a periodic trend using a particle model
bonding|Chemical bonding and structure|Ionic bonding;Covalent bonding;Metallic bonding;Intermolecular forces;Structure and physical properties;Draw and critique simple bonding models|Predict and justify properties of three modeled substances
moles|Amounts of substances|Relative formula mass;Moles and particle number;Convert mass and moles;Stoichiometric ratios;Limiting reactants;Theoretical and percentage yield|Work through a reaction calculation with units at every step
solutions|Solutions, acids and bases|Solute, solvent and concentration;Molar concentration;Dilution calculations;Acids, bases and pH;Neutralization;Interpret a supplied titration curve|Analyze a fictional concentration and titration dataset
reaction-energy|Reaction energy and rates|Exothermic and endothermic changes;Energy profiles;Activation energy;Collision theory;Effects of temperature and concentration;Catalysts and rates|Compare reaction-rate graphs and evaluate one conclusion
equilibrium|Chemical equilibrium|Dynamic equilibrium;Forward and reverse reactions;Equilibrium expressions;Reaction quotient concept;Shifts under changed conditions;Distinguish rate from equilibrium position|Explain an equilibrium shift using a particle model
momentum|Momentum and energy|Momentum and impulse;Conservation of momentum;Work and kinetic energy;Gravitational potential energy;Conservation of energy;Power and efficiency|Compare two modeled collisions with stated assumptions
fields|Fields and electromagnetism|Gravitational field strength;Electric fields;Electric potential;Magnetic fields;Force on a moving charge;Electromagnetic induction|Explain a generator model using fields and energy transfer
oscillation|Oscillations and wave behavior|Simple harmonic motion;Period and frequency;Energy in an oscillator;Superposition and interference;Standing waves;Resonance|Interpret oscillation data and identify a model limitation
thermal|Thermal physics|Temperature versus internal energy;Specific heat capacity;Latent heat;Gas particle model;Pressure, volume and temperature;First-law energy accounting|Analyze a heating curve using energy calculations
modern-physics|Matter, radiation and scientific models|Photons and quantized energy;Photoelectric-effect evidence;Atomic spectra;Radioactive decay models;Half-life calculations;Model limits and measurement uncertainty|Interpret a supplied decay dataset with uncertainty
scientific-computing|Quantitative scientific investigation|Dimensional analysis;Significant figures;Uncertainty and propagation basics;Linearize a relationship;Fit and inspect residuals;Reproducible calculations and data records|Prepare a reproducible analysis of an openly supplied scientific dataset
sentences|Sentences and grammar|Subjects and predicates;Clauses and phrases;Fragments and run-ons;Subject-verb agreement;Pronouns and reference;Sentence combining|Revise a paragraph for complete and varied sentences
punctuation|Punctuation and editing|Sentence boundaries;Commas in lists and clauses;Apostrophes;Quotation punctuation;Colons and semicolons;Edit without changing meaning|Edit a short draft and explain each change
paragraphs|Paragraph structure|Topic sentences;Relevant supporting details;Explanation after evidence;Transitions;Paragraph unity;Concluding sentences|Write and revise one evidence-based paragraph
narrative|Narrative writing|Character and setting;Point of view;Sequence and pacing;Dialogue;Sensory detail;Revision for a purposeful ending|Draft a short narrative and revise one scene
explanation|Explanatory writing|Choose a focused question;Organize by cause or process;Define unfamiliar terms;Use examples accurately;Connect ideas with transitions;Conclude without adding new evidence|Explain a process to a reader encountering it for the first time
argument-writing|Argument writing|Develop a debatable claim;Select relevant evidence;Explain the reasoning;Address a counterclaim;Use qualified language;Revise the conclusion|Write a short argument supported by supplied sources
research-writing|Research and source use|Turn a topic into a research question;Locate credible sources;Take source-linked notes;Paraphrase faithfully;Integrate short quotations;Create consistent citations|Build an annotated source set and a supported draft
poetry|Reading poetry|Speaker and situation;Imagery;Figurative language;Sound and rhythm;Form and line breaks;Support an interpretation with words from the poem|Compare two interpretations of a public-domain poem
drama|Reading drama|Dialogue and stage directions;Conflict and motivation;Scenes and dramatic structure;Dramatic irony;Performance choices;Textual evidence for an interpretation|Explain how a performance choice changes a scene
fiction|Reading fiction|Narrator and point of view;Character development;Plot and conflict;Setting and atmosphere;Theme versus topic;Evidence for an inference|Write an interpretation of a supplied short story
nonfiction|Reading nonfiction|Central idea and supporting details;Text structures;Author's purpose;Facts, opinions and claims;Evaluate examples and evidence;Compare two accounts|Compare the structure and evidence of two short texts
style|Style, voice and revision|Precise nouns and verbs;Concision;Sentence rhythm;Tone and audience;Cohesion across paragraphs;Revision versus proofreading|Revise a draft for a specified audience and explain choices
comparative-writing|Comparative analysis|Choose a defensible comparison;Point-by-point organization;Compare author choices;Integrate evidence from both works;Avoid summary-only paragraphs;Develop a comparative conclusion|Write a comparison of two supplied texts
rhetorical-analysis|Rhetorical analysis|Audience and rhetorical situation;Purpose and constraints;Ethos, pathos and logos;Structure and emphasis;Evaluate rhetorical effects;Separate effectiveness from agreement|Analyze the choices in a sourced public speech
synthesis|Synthesis across sources|Find points of agreement;Identify genuine disagreement;Compare evidence quality;Organize by ideas rather than sources;Integrate sources into a claim;Acknowledge unresolved questions|Write a synthesis using three supplied sources
academic-writing|College academic writing|Read an assignment and rubric;Develop an arguable thesis;Build an essay structure;Use disciplinary evidence;Integrate citations consistently;Revise from substantive feedback|Produce a source-based essay with a revision memo
research-project|Extended research project|Define scope and feasibility;Plan a source search;Create an annotated bibliography;Develop a working outline;Draft and review sections;Reflect on limitations and next questions|Complete a research paper grounded in a manageable source set
oral-presentation|Speaking and presentation|Choose a clear central message;Structure an introduction;Use supporting examples;Design readable supporting materials;Practice pacing and transitions;Answer questions with evidence|Deliver a short presentation and revise from a rubric
reading-fluency|Reading accurately and actively|Preview headings and structure;Break long sentences into clauses;Resolve unfamiliar words in context;Track pronoun references;Pause to paraphrase;Notice and repair a loss of meaning|Annotate a short text to show where comprehension changed
reading-inference|Inference and evidence|Explicit statements versus inferences;Connect details across paragraphs;Use context without inventing facts;Infer motives carefully;Test an inference against contradictory details;State uncertainty|Support three inferences with specific text references
annotation|Annotation and useful notes|Mark claims and questions selectively;Distinguish evidence from reaction;Record page or paragraph references;Use a short annotation key;Turn notes into an outline;Return to unresolved questions|Create concise annotated notes that support a summary
textbook|Learning from textbooks|Preview a chapter's structure;Read definitions in context;Explain a worked example;Interpret diagrams and tables;Turn headings into questions;Check understanding before proceeding|Build and test a study guide for a supplied textbook excerpt
exam-preparation|Preparing for assessments|Identify assessed skills;Diagnose gaps from past work;Plan distributed practice;Mix problem types;Review and correct errors;Prepare a realistic final review|Build a study plan around an error log and a sample assessment
research-reading|Reading research and academic sources|Read an abstract and introduction;Locate a research question;Distinguish methods and findings;Interpret a table or figure;Identify limitations;Compare a paper with a media claim|Create an evidence-focused reading record for a supplied accessible paper
independent-study|Independent study projects|Define a learning question;Select suitable materials;Schedule checkpoints;Keep an evidence log;Request useful feedback;Evaluate transfer to a new task|Complete a small independent study with a portfolio and reflection
`);

export const schoolSequences: Record<string, string[]> = {
  "math/grade-6": [
    "whole-number",
    "fractions",
    "decimals",
    "ratios",
    "integers",
    "expressions",
    "measurement",
    "data-intro",
  ],
  "math/grade-7": [
    "rational",
    "proportions",
    "linear-equations",
    "geometry-angles",
    "measurement",
    "probability",
    "data-intro",
  ],
  "math/grade-8": [
    "exponents",
    "linear-equations",
    "linear-functions",
    "systems",
    "transformations",
    "pythagoras",
    "bivariate",
  ],
  "math/grade-9": [
    "algebra-foundations",
    "function-language",
    "linear-functions",
    "systems",
    "polynomials",
    "quadratics",
    "exponential",
    "bivariate",
  ],
  "math/grade-10": [
    "geometry-angles",
    "proof",
    "triangle-proof",
    "coordinate-proof",
    "circle-geometry",
    "trigonometry",
    "solid-geometry",
    "probability",
  ],
  "math/grade-11": [
    "function-language",
    "polynomials",
    "quadratics",
    "complex",
    "rational-functions",
    "radical-functions",
    "logarithms",
    "sequences",
  ],
  "math/grade-12": [
    "function-language",
    "rational-functions",
    "logarithms",
    "unit-circle",
    "trig-functions",
    "vectors",
    "sequences",
    "limits",
  ],
  "math/college": [
    "function-language",
    "limits",
    "derivatives",
    "calculus-applications",
    "integrals",
    "probability",
    "inferential-stats",
  ],
  "science/grade-6": [
    "science-method",
    "matter",
    "energy",
    "cells",
    "earth-processes",
    "weather",
    "space",
  ],
  "science/grade-7": [
    "science-method",
    "cells",
    "body-systems",
    "genetics",
    "ecology",
    "evolution",
    "biology-investigation",
  ],
  "science/grade-8": [
    "science-method",
    "matter",
    "chemical-change",
    "motion",
    "energy",
    "waves",
    "circuits",
  ],
  "science/grade-9": [
    "science-method",
    "atomic-structure",
    "chemical-change",
    "motion",
    "cells",
    "ecology",
    "earth-processes",
  ],
  "science/grade-10": [
    "cells",
    "cell-energy",
    "body-systems",
    "genetics",
    "molecular-genetics",
    "evolution",
    "ecology",
    "biology-investigation",
  ],
  "science/grade-11": [
    "atomic-structure",
    "bonding",
    "chemical-change",
    "moles",
    "solutions",
    "reaction-energy",
    "equilibrium",
  ],
  "science/grade-12": [
    "motion",
    "momentum",
    "circuits",
    "fields",
    "oscillation",
    "thermal",
    "modern-physics",
  ],
  "science/college": [
    "science-method",
    "scientific-computing",
    "cell-energy",
    "moles",
    "momentum",
    "thermal",
    "inferential-stats",
  ],
  "english-and-writing/grade-6": [
    "sentences",
    "punctuation",
    "paragraphs",
    "narrative",
    "explanation",
    "fiction",
    "nonfiction",
  ],
  "english-and-writing/grade-7": [
    "sentences",
    "paragraphs",
    "narrative",
    "poetry",
    "nonfiction",
    "argument-writing",
    "research-writing",
  ],
  "english-and-writing/grade-8": [
    "style",
    "fiction",
    "drama",
    "explanation",
    "argument-writing",
    "research-writing",
    "oral-presentation",
  ],
  "english-and-writing/grade-9": [
    "fiction",
    "poetry",
    "drama",
    "argument-writing",
    "research-writing",
    "style",
    "comparative-writing",
  ],
  "english-and-writing/grade-10": [
    "literary-analysis",
    "rhetorical-analysis",
    "comparative-writing",
    "argument-writing",
    "research-writing",
    "style",
    "oral-presentation",
  ],
  "english-and-writing/grade-11": [
    "rhetorical-analysis",
    "literary-analysis",
    "synthesis",
    "research-writing",
    "comparative-writing",
    "style",
    "research-project",
  ],
  "english-and-writing/grade-12": [
    "literary-analysis",
    "rhetorical-analysis",
    "synthesis",
    "academic-writing",
    "research-project",
    "oral-presentation",
  ],
  "english-and-writing/college": [
    "academic-writing",
    "sources",
    "rhetorical-analysis",
    "synthesis",
    "research-writing",
    "research-project",
    "style",
  ],
  "reading-and-study-skills/grade-6": [
    "reading-fluency",
    "vocab",
    "summary",
    "annotation",
    "recall",
    "planning",
    "spacing",
  ],
  "reading-and-study-skills/grade-7": [
    "reading-fluency",
    "reading-inference",
    "chapter",
    "annotation",
    "notes",
    "study",
    "exam-preparation",
  ],
  "reading-and-study-skills/grade-8": [
    "reading-inference",
    "nonfiction",
    "sources",
    "textbook",
    "notes",
    "spacing",
    "exam-preparation",
  ],
  "reading-and-study-skills/grade-9": [
    "textbook",
    "argument",
    "sources",
    "annotation",
    "recall",
    "study",
    "exam-preparation",
  ],
  "reading-and-study-skills/grade-10": [
    "reading-inference",
    "rhetoric",
    "sources",
    "notes",
    "study",
    "transfer",
    "independent-study",
  ],
  "reading-and-study-skills/grade-11": [
    "research-reading",
    "argument",
    "bias",
    "synthesis",
    "review-plan",
    "exam-preparation",
    "independent-study",
  ],
  "reading-and-study-skills/grade-12": [
    "research-reading",
    "sources",
    "synthesis",
    "planning",
    "transfer",
    "review-plan",
    "independent-study",
  ],
  "reading-and-study-skills/college": [
    "research-reading",
    "textbook",
    "sources",
    "notes",
    "spacing",
    "review-plan",
    "independent-study",
  ],
};
