import type { CanvasBlock } from "./progression";
export const additionalExamples: Record<string, CanvasBlock[]> = {
  style: [
    {
      type: "text",
      title: "Choose precise nouns and verbs",
      text: "Draft: “The person did something to the document.”\nRevision: “The editor shortened the introduction.”\nThe revision identifies who acted, what changed, and where the change happened.",
    },
    {
      type: "steps",
      title: "A useful revision question",
      items: [
        "Find a vague noun or verb.",
        "Replace it with the specific action or thing you mean.",
        "Check that the new wording is supported by what you know.",
      ],
    },
  ],
  fiction: [
    {
      type: "text",
      title: "Who tells the story?",
      text: "Original example: “I waited by the window, certain that Leo had forgotten.”\nThe narrator tells us their own thought. The sentence does not establish what Leo actually remembers.",
    },
    {
      type: "table",
      title: "Keep the perspectives separate",
      headers: ["Textual evidence", "What it supports"],
      rows: [
        ["“I waited”", "A first-person narrator describes an action"],
        [
          "“certain that Leo had forgotten”",
          "The narrator believes something about Leo",
        ],
        ["No statement from Leo", "Leo’s actual thoughts remain unknown"],
      ],
    },
  ],
  "literary-analysis": [
    {
      type: "text",
      title: "Narrator and reliability",
      text: "Original example: “I never lose anything,” Mara said, searching for the keys she had misplaced again.\nThe action complicates Mara’s claim. An interpretation should point to that contradiction instead of simply labeling her unreliable.",
    },
    {
      type: "steps",
      title: "Support the inference",
      items: [
        "Identify the claim made by the character or narrator.",
        "Locate an action or detail that supports or challenges it.",
        "Explain the relationship without inventing missing events.",
      ],
    },
  ],
  "rhetorical-analysis": [
    {
      type: "table",
      title: "Identify the rhetorical situation",
      headers: ["Element", "Fictional example"],
      rows: [
        ["Speaker", "A student addressing the school council"],
        ["Audience", "People who can change library hours"],
        ["Purpose", "Request a later closing time"],
        ["Constraint", "A limited staffing budget"],
      ],
    },
    {
      type: "text",
      title: "Context shapes the argument",
      text: "The speaker needs to explain how the request addresses a student need and how it could work within the council’s constraints.",
    },
  ],
  "academic-writing": [
    {
      type: "table",
      title: "Read the assignment before drafting",
      headers: ["Instruction", "What the paper must do"],
      rows: [
        [
          "Compare two explanations",
          "Discuss meaningful similarities and differences",
        ],
        [
          "Use three supplied sources",
          "Support claims with evidence from the assigned material",
        ],
        ["Evaluate limitations", "Explain what the evidence cannot establish"],
      ],
    },
    {
      type: "text",
      title: "Turn the rubric into a checklist",
      text: "Identify the required task, evidence, audience and format. A polished summary will not satisfy an assignment that asks for evaluation.",
    },
  ],
  "reading-fluency": [
    {
      type: "steps",
      title: "Preview a chapter before reading",
      items: [
        "Read the title and section headings.",
        "Notice the opening question and the order of sections.",
        "Look for a glossary, examples or a concluding summary.",
        "Write one question you expect the chapter to answer.",
      ],
    },
    {
      type: "text",
      title: "Previewing gives you a purpose",
      text: "For a chapter titled “How rivers change landscapes,” headings about erosion and deposition suggest two processes to compare as you read.",
    },
  ],
  "reading-inference": [
    {
      type: "text",
      title: "An explicit statement and a reasonable inference",
      text: "Original example: “Rain dripped from Ana’s coat as she closed the umbrella.”\nExplicit: water dripped from her coat, and she closed an umbrella.\nReasonable inference: she has likely just come in from the rain.\nUnsupported: she walked exactly two miles.",
    },
    {
      type: "text",
      title: "Check the evidence",
      text: "An inference connects details in the text. It should remain open to revision when another detail supplies a different explanation.",
    },
  ],
  textbook: [
    {
      type: "table",
      title: "Use a textbook’s structure",
      headers: ["Feature", "Reading task"],
      rows: [
        ["Section heading", "Predict the question it answers"],
        ["Worked example", "Explain the reason for each step"],
        [
          "Figure and caption",
          "Connect the visual with the written explanation",
        ],
        ["Practice question", "Attempt it before checking the answer"],
      ],
    },
    {
      type: "text",
      title: "Preview, then read actively",
      text: "A quick scan helps you locate the chapter’s ideas. Understanding still requires reading, explaining and practicing those ideas.",
    },
  ],
  "research-reading": [
    {
      type: "table",
      title: "A first pass through a research paper",
      headers: ["Section", "Question to ask"],
      rows: [
        ["Abstract", "What question, method and main finding are summarized?"],
        ["Introduction", "What problem motivates the study?"],
        ["Methods", "How was the evidence collected?"],
        ["Limitations", "Where should the conclusion be qualified?"],
      ],
    },
    {
      type: "text",
      title: "A summary is a starting point",
      text: "The abstract helps orient you. Check the methods and results before treating its headline finding as a complete account.",
    },
  ],
  motivation: [
    {
      type: "table",
      title: "Separate an outcome from an action",
      headers: ["Outcome goal", "Action you can control"],
      rows: [
        [
          "Understand linear equations",
          "Solve three equations and explain each step",
        ],
        ["Write a clearer essay", "Revise one paragraph against the rubric"],
        [
          "Remember new vocabulary",
          "Recall five words before checking the definitions",
        ],
      ],
    },
    {
      type: "text",
      title: "Make progress observable",
      text: "An action goal tells you what to do next and what evidence to review. It does not guarantee the outcome, but it gives you a concrete practice step.",
    },
  ],
  argument: [
    {
      type: "text",
      title: "Identify the claim and its scope",
      text: "“Keeping the library open one hour later would help students who finish work at 5 p.m.”\nThe claim concerns a specific change and a particular group. It does not claim that every student would benefit.",
    },
    {
      type: "table",
      title: "Ask what evidence is needed",
      headers: ["Question", "Evidence to look for"],
      rows: [
        [
          "Who needs the later hour?",
          "Relevant student schedules or a representative survey",
        ],
        ["Would students use it?", "A measured trial or attendance evidence"],
        ["Can it be staffed?", "A staffing and cost estimate"],
      ],
    },
  ],
  problem: [
    {
      type: "text",
      title: "Define a problem you can test",
      text: "Vague: “Our group is disorganized.”\nSpecific: “Two of the last four tasks missed their deadline because no owner was recorded.”\nThe specific statement identifies an observable result and a possible contributing process.",
    },
    {
      type: "table",
      title: "Set success criteria",
      headers: ["Part", "Example"],
      rows: [
        ["Proposed change", "Assign one owner and due date to each task"],
        ["Evidence", "A shared task record"],
        [
          "Success criterion",
          "Every new task has both fields before work starts",
        ],
      ],
    },
  ],
  study: [
    {
      type: "equation",
      title: "Study a worked example",
      lines: [
        "2x + 5 = 17",
        "2x = 12        subtract 5 from both sides",
        "x = 6          divide both sides by 2",
        "Check: 2(6) + 5 = 17",
      ],
    },
    {
      type: "text",
      title: "Explain before copying",
      text: "Ask why the same operation is applied to both sides. Then hide the example and try a similar equation, checking the reasoning rather than memorizing the answer.",
    },
  ],
  maps: [
    {
      type: "equation",
      title: "Read latitude and longitude",
      lines: [
        "Example coordinate: 20° N, 30° E",
        "20° north of the equator",
        "30° east of the prime meridian",
      ],
    },
    {
      type: "text",
      title: "The order matters",
      text: "Latitude describes north–south position. Longitude describes east–west position. Always check the coordinate format and direction labels before locating a point.",
    },
  ],
  culture: [
    {
      type: "text",
      title: "Culture is learned and changing",
      text: "Greeting practices, language use, food traditions and shared institutions are learned through participation. They can change over time and vary within the same community.",
    },
    {
      type: "table",
      title: "Replace a sweeping claim with context",
      headers: ["Overgeneralization", "A more careful question"],
      rows: [
        [
          "“Everyone in that community does this.”",
          "Who participates, in what setting, and with what variations?",
        ],
        [
          "“This tradition has never changed.”",
          "What evidence shows how the practice developed?",
        ],
      ],
    },
  ],
  communication: [
    {
      type: "table",
      title: "Purpose, audience and context",
      headers: ["Element", "Example"],
      rows: [
        ["Purpose", "Ask a project partner to review a draft"],
        ["Audience", "A partner who knows the project"],
        ["Context", "The draft is due tomorrow"],
        [
          "Clear request",
          "Please review the introduction by 3 p.m. and flag unclear claims.",
        ],
      ],
    },
    {
      type: "text",
      title: "Make the next action clear",
      text: "A useful message says what you need, why it matters, and when a response would help. The wording should fit the relationship and situation.",
    },
  ],
  "life-admin": [
    {
      type: "table",
      title: "Keep deadlines in one place",
      headers: ["Fictional task", "Due date", "Preparation"],
      rows: [
        ["Return a library book", "Friday", "Locate the book Thursday evening"],
        [
          "Attend an appointment",
          "Tuesday, 10 a.m.",
          "Check the address and required documents",
        ],
        [
          "Review a sample bill",
          "Before its stated due date",
          "Confirm the amount, service period and any unclear fee",
        ],
      ],
    },
    {
      type: "text",
      title: "Plan the step before the deadline",
      text: "A reminder is most useful when it leaves time to gather information or ask for clarification.",
    },
  ],
  "reading-path": [
    {
      type: "table",
      title: "Start with a reading goal",
      headers: ["Question", "Example answer"],
      rows: [
        ["What do I want to understand?", "How an author builds an argument"],
        ["What can I already do?", "Identify the main claim in a short text"],
        [
          "What needs practice?",
          "Explain whether the evidence supports that claim",
        ],
        [
          "What should I read next?",
          "A short, accessible argument with clear supporting evidence",
        ],
      ],
    },
    {
      type: "text",
      title: "Choose the next text for a reason",
      text: "A good reading path considers interest, difficulty, availability and prerequisite knowledge. Finishing a book is different from understanding its ideas.",
    },
  ],
};
