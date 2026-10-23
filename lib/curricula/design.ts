import type { CareerCourseDraft } from "./types";

export const designCourses: Record<string, CareerCourseDraft> = {
  "user-interface-user-experience-ui-ux-designer": {
    entry:
      "Research a user problem and develop an accessible interface prototype backed by evidence.",
    requirements: [
      "Basic computer skills and interest in visual communication; drawing ability is not a prerequisite.",
      "Design jobs often require a portfolio explaining research, decisions, iteration, and collaboration.",
    ],
    modules: [
      [
        "Define the design problem",
        [
          "Separate a user problem from a requested feature",
          "Identify constraints and assumptions",
          "Write research questions and success criteria",
        ],
        "Prepare a brief for improving a fictional appointment-booking flow.",
        "Frame a design problem with clear users, constraints, and evidence needs.",
      ],
      [
        "User research and synthesis",
        [
          "Write neutral interview questions",
          "Organize observations without inventing findings",
          "Map a user journey and pain points",
        ],
        "Analyze supplied interview notes and distinguish observations from assumptions.",
        "Support a design decision with traceable user-research observations.",
      ],
      [
        "Information architecture",
        [
          "Group content and define navigation labels",
          "Map task flows and alternative paths",
          "Account for errors, empty states, and recovery",
        ],
        "Draw an appointment flow including cancellation and unavailable dates.",
        "Design a task flow that accounts for ordinary and unsuccessful outcomes.",
      ],
      [
        "Wireframes and interaction",
        [
          "Create low-fidelity screens",
          "Choose appropriate form and navigation patterns",
          "Make clickable prototype transitions",
        ],
        "Build a wireframe prototype and walk through the booking task.",
        "Create a prototype that demonstrates a complete user task.",
      ],
      [
        "Visual design foundations",
        [
          "Use type, spacing, color, and hierarchy",
          "Build reusable components and variants",
          "Document responsive and content rules",
        ],
        "Create a small component library for the booking interface.",
        "Apply a consistent visual system across interface states and screen sizes.",
      ],
      [
        "Accessibility and usability testing",
        [
          "Check contrast, focus, and target sizes",
          "Write a task-based usability test",
          "Prioritize findings by impact and evidence",
        ],
        "Run a simulated or consented usability review and revise the prototype.",
        "Evaluate usability and accessibility using specific, reproducible observations.",
      ],
      [
        "Design handoff",
        [
          "Specify component states and behavior",
          "Review implementation constraints with an engineer",
          "Document decisions and unresolved questions",
        ],
        "Write a handoff for the date picker and validation states.",
        "Explain interaction requirements clearly enough for implementation and review.",
      ],
      [
        "Capstone: booking-flow case study",
        [
          "Present the problem, evidence, and iterations",
          "Demonstrate the final prototype",
          "Explain limitations and next research steps",
        ],
        "Deliver a prototype, component guide, usability findings, and a concise case study.",
        "Present a design case study that connects research evidence to interface decisions.",
      ],
    ],
  },
  "graphic-designer": {
    entry:
      "Translate a communication brief into a coherent set of original digital assets.",
    requirements: [
      "Basic computer skills; access to a vector or layout tool for optional independent practice.",
      "Employers and clients typically assess a portfolio, originality, production quality, and ability to follow a brief.",
    ],
    modules: [
      [
        "Read a creative brief",
        [
          "Identify audience, message, and deliverables",
          "Collect references with usage rights",
          "Separate visual inspiration from copying",
        ],
        "Write a brief for a fictional community event campaign.",
        "Translate a communication goal into clear, rights-aware design requirements.",
      ],
      [
        "Composition and typography",
        [
          "Build hierarchy with size, weight, and spacing",
          "Use grids and alignment",
          "Choose readable type combinations",
        ],
        "Design three poster layouts with a clear reading order.",
        "Use typography and layout to communicate a message at a glance.",
      ],
      [
        "Color and vector graphics",
        [
          "Choose a limited color palette",
          "Construct original shapes and symbols",
          "Check contrast and color-independent meaning",
        ],
        "Create an original event symbol and two accessible color treatments.",
        "Build original vector assets with consistent geometry and readable contrast.",
      ],
      [
        "Images and production formats",
        [
          "Crop and prepare permitted image assets",
          "Distinguish raster and vector use cases",
          "Export appropriate dimensions and file formats",
        ],
        "Prepare a poster, social post, and web banner from one campaign system.",
        "Export design assets that fit their intended digital or print context.",
      ],
      [
        "Feedback and brand consistency",
        [
          "Present alternatives with a rationale",
          "Translate feedback into revisions",
          "Document reusable brand rules",
        ],
        "Respond to a fictional client's revision request without losing the core hierarchy.",
        "Revise a design against feedback and maintain a coherent visual identity.",
      ],
      [
        "Capstone: a campaign identity kit",
        [
          "Create a coordinated asset family",
          "Check dimensions, spelling, and rights",
          "Present final files and usage guidance",
        ],
        "Deliver a poster, three social formats, a banner, source files, and an asset-rights log.",
        "Present a consistent campaign kit with production-ready exports and clear usage notes.",
      ],
    ],
  },
  "video-editor": {
    entry:
      "Edit a clear short video with intentional pacing, intelligible sound, and accessible captions.",
    requirements: [
      "Basic file-management skills and access to an editing tool for optional practice.",
      "Professional work usually requires an editing portfolio and familiarity with client-specific formats and delivery standards.",
    ],
    modules: [
      [
        "Brief, rights, and media organization",
        [
          "Identify audience and delivery format",
          "Organize footage, audio, and project files",
          "Track permissions for footage, music, and fonts",
        ],
        "Build a project folder and media log from supplied or self-owned clips.",
        "Organize an editing project with traceable source files and usage permissions.",
      ],
      [
        "Assemble a story",
        [
          "Select shots that support a message",
          "Build an assembly edit and rough cut",
          "Use continuity and motivated transitions",
        ],
        "Create a rough cut for a fictional product explainer.",
        "Build a coherent sequence that communicates a specific story or message.",
      ],
      [
        "Pacing and visual clarity",
        [
          "Trim pauses and compare pacing choices",
          "Use B-roll and screen recordings purposefully",
          "Create readable titles and lower thirds",
        ],
        "Revise the rough cut and annotate the purpose of each major edit.",
        "Use timing, supporting visuals, and readable text to improve comprehension.",
      ],
      [
        "Audio, color, and captions",
        [
          "Balance dialogue, music, and sound effects",
          "Correct basic exposure and color differences",
          "Create and proofread synchronized captions",
        ],
        "Mix a sample dialogue sequence and add accurate captions.",
        "Deliver intelligible audio, consistent picture, and reviewed captions.",
      ],
      [
        "Feedback and delivery",
        [
          "Process time-coded review notes",
          "Export suitable resolution, frame rate, and encoding",
          "Check playback and archive editable source files",
        ],
        "Prepare landscape and vertical versions and run a playback checklist.",
        "Export and quality-check video deliverables against an agreed brief.",
      ],
      [
        "Capstone: a short explainer",
        [
          "Finish the edit from brief to final cut",
          "Demonstrate revision decisions",
          "Package exports, captions, and project files",
        ],
        "Deliver a concise explainer, caption file, source-project handoff, and rights log.",
        "Present a complete editing project with accessible delivery and documented revisions.",
      ],
    ],
  },
  "technical-writer": {
    entry:
      "Write usable technical documentation that readers can follow and maintain.",
    requirements: [
      "Strong reading and writing fundamentals; basic familiarity with software or a technical subject helps.",
      "Employers may require domain expertise, documentation samples, and collaboration with engineers or specialists.",
    ],
    modules: [
      [
        "Audience and documentation scope",
        [
          "Identify reader knowledge and tasks",
          "Separate tutorials, how-to guides, and reference",
          "Plan a documentation information structure",
        ],
        "Create a documentation plan for a fictional file-import tool.",
        "Choose documentation formats that match the reader's task and starting knowledge.",
      ],
      [
        "Research and source accuracy",
        [
          "Interview a subject-matter expert",
          "Verify behavior against a sample system",
          "Track assumptions and unanswered questions",
        ],
        "Turn supplied engineering notes into a verified fact and question log.",
        "Separate verified technical behavior from assumptions needing expert review.",
      ],
      [
        "Write procedures and examples",
        [
          "Use clear prerequisites and numbered steps",
          "Write realistic examples and expected results",
          "Document errors and recovery paths",
        ],
        "Write an import tutorial with sample input, expected output, and a troubleshooting section.",
        "Write a procedure a reader can follow and check independently.",
      ],
      [
        "Reference and API documentation",
        [
          "Describe parameters, types, and constraints",
          "Explain response examples and error codes",
          "Keep examples free of real credentials and private data",
        ],
        "Draft reference documentation for a small mock API.",
        "Document an interface with accurate examples, constraints, and failure behavior.",
      ],
      [
        "Docs as code and accessibility",
        [
          "Structure Markdown and navigation",
          "Review a documentation change in Git",
          "Write meaningful links, alt text, and headings",
        ],
        "Submit a sample documentation change with a review checklist.",
        "Maintain accessible documentation through a reviewable version-control workflow.",
      ],
      [
        "Capstone: a documentation pack",
        [
          "Test a tutorial with a new reader",
          "Resolve ambiguous or missing instructions",
          "Present a maintenance and ownership plan",
        ],
        "Deliver a tutorial, reference page, troubleshooting guide, glossary, and validation log.",
        "Present a tested documentation set with clear ownership and update triggers.",
      ],
    ],
  },
  "content-writer-editor": {
    entry:
      "Research, write, and edit useful articles for a defined audience and purpose.",
    requirements: [
      "Comfort reading and writing extended text; no specialized degree is assumed for the practice tasks.",
      "Professional assignments may require domain expertise, a portfolio, and editorial or subject-matter review.",
    ],
    modules: [
      [
        "Audience, brief, and editorial purpose",
        [
          "Identify the reader's question",
          "Define angle, tone, and scope",
          "Plan deliverables and editorial checkpoints",
        ],
        "Write a brief for an explanatory article about a familiar topic.",
        "Define a specific audience and information need before drafting.",
      ],
      [
        "Research and source handling",
        [
          "Choose credible primary sources",
          "Distinguish facts, opinion, and inference",
          "Quote, paraphrase, and attribute accurately",
        ],
        "Build a source log and annotate which claims each source supports.",
        "Support factual claims with accurate attribution and an inspectable source trail.",
      ],
      [
        "Structure and first drafts",
        [
          "Build an outline around reader questions",
          "Write informative headings and examples",
          "Connect paragraphs without repetitive filler",
        ],
        "Draft an article from the brief and source log.",
        "Organize a clear article around a reader's actual questions.",
      ],
      [
        "Editing and verification",
        [
          "Revise for clarity, concision, and consistency",
          "Check names, numbers, links, and claims",
          "Use an editorial style sheet",
        ],
        "Edit a deliberately flawed draft and explain the material changes.",
        "Improve a draft's accuracy and readability without changing its intended meaning.",
      ],
      [
        "Publishing and collaboration",
        [
          "Prepare titles, summaries, and accessible formatting",
          "Respond to editor and expert feedback",
          "Plan corrections and content updates",
        ],
        "Create a publication checklist and resolve a fictional editor's feedback.",
        "Prepare a reviewed article for publication with a clear correction process.",
      ],
      [
        "Capstone: an article and editorial pack",
        [
          "Deliver a researched article",
          "Provide a source and fact-check log",
          "Explain editorial decisions and update needs",
        ],
        "Deliver the article, brief, outline, style sheet, and source-backed fact checks.",
        "Present an original article with a transparent research and editing process.",
      ],
    ],
  },
};
