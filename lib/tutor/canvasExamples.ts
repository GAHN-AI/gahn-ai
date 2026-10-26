import { additionalExamples } from "./additionalExamples";
import type { Course } from "../course-content/schema";
import type { CanvasBlock } from "./progression";
// Static, clearly labeled design examples. These never emit tutor events or award progress.
const examples: Record<string, CanvasBlock[]> = {
  computer: [
    {
      type: "text",
      title: "A file lives inside a folder",
      text: "Keep one project in its own folder. A descriptive filename tells you what the file contains; its extension tells your computer what kind of file it is.",
    },
    {
      type: "table",
      title: "Your first project folder",
      headers: ["Name", "Purpose"],
      rows: [
        ["my-first-website/", "The folder for this project"],
        ["index.html", "The page your browser opens"],
        ["styles.css", "The page’s appearance"],
        ["images/", "Pictures used by the page"],
      ],
    },
    {
      type: "steps",
      title: "First workspace task",
      items: [
        "Create a folder named my-first-website.",
        "Find that folder again in your file manager.",
        "Keep the project together instead of saving its files in different places.",
      ],
    },
  ],
  "digital-work": [
    {
      type: "text",
      title: "A folder structure that another person can understand",
      text: "Separate original material from work in progress and approved deliverables. Keep the original available so a mistaken edit can be traced and corrected.",
    },
    {
      type: "table",
      title: "Example client project",
      headers: ["Folder", "What belongs here"],
      rows: [
        ["01-source", "Original brief and supplied data"],
        ["02-working", "Drafts, calculations and review notes"],
        ["03-approved", "Reviewed files ready for handoff"],
      ],
    },
    {
      type: "code",
      title: "A filename with a clear version",
      language: "filename",
      code: "client-report-2026-10-v01-draft.xlsx\nclient-report-2026-10-v02-reviewed.xlsx",
    },
  ],
  "whole-number": [
    {
      type: "equation",
      title: "Place value: 48,305",
      lines: [
        "48,305 = 40,000 + 8,000 + 300 + 5",
        "4 ten-thousands · 8 thousands · 3 hundreds",
        "0 tens · 5 ones",
      ],
    },
    {
      type: "text",
      title: "Why the zero matters",
      text: "The zero holds the tens place. Removing it changes 48,305 into 4,835, which is a different number.",
    },
  ],
  rational: [
    {
      type: "equation",
      title: "Representing rational numbers",
      lines: [
        "−3/4 = −0.75",
        "−1 < −3/4 < 0",
        "3/4 and 6/8 name the same point",
      ],
    },
    {
      type: "text",
      title: "Numerator and denominator",
      text: "A rational number can be written as a ratio of two integers with a nonzero denominator. Its sign tells you which side of zero it lies on.",
    },
  ],
  exponents: [
    {
      type: "equation",
      title: "Multiplying powers with the same base",
      lines: ["2³ × 2² = (2 × 2 × 2) × (2 × 2)", "2³ × 2² = 2⁵ = 32"],
    },
    {
      type: "text",
      title: "Count the factors",
      text: "The exponents add because you are combining three factors of 2 with two more factors of 2. This rule requires the same base.",
    },
  ],
  "algebra-foundations": [
    {
      type: "equation",
      title: "Equivalent expressions",
      lines: [
        "3(x + 4) = 3x + 12",
        "When x = 2:",
        "3(2 + 4) = 18",
        "3(2) + 12 = 18",
      ],
    },
    {
      type: "text",
      title: "One expression, two forms",
      text: "Distributing multiplies each term inside the parentheses. Testing one value is a useful check; the distributive property explains why the expressions agree for every x.",
    },
  ],
  "geometry-angles": [
    {
      type: "equation",
      title: "Angles on a straight line",
      lines: ["a + b = 180°", "If a = 65°, then b = 180° − 65°", "b = 115°"],
    },
    {
      type: "text",
      title: "Identify the relationship first",
      text: "Adjacent angles form a straight angle only when their nonshared sides lie on the same straight line. Do not assume a drawing is to scale.",
    },
  ],
  "function-language": [
    {
      type: "equation",
      title: "Inputs and outputs",
      lines: [
        "f(x) = 2x + 3",
        "f(4) = 2(4) + 3 = 11",
        "Input: 4     Output: 11",
      ],
    },
    {
      type: "text",
      title: "Read function notation",
      text: "f(4) means the output of f when the input is 4. It does not mean f multiplied by 4.",
    },
  ],
  "science-method": [
    {
      type: "text",
      title: "Observation and explanation",
      text: "“The second sample dissolved faster” records an observation. “The temperature caused the change” is an explanation that needs a controlled test.",
    },
    {
      type: "table",
      title: "Plan a fair comparison",
      headers: ["Part of the investigation", "Example"],
      rows: [
        ["Change one factor", "Water temperature"],
        ["Measure an outcome", "Time until a supplied sample dissolves"],
        [
          "Keep other conditions consistent",
          "Sample mass, water volume and stirring",
        ],
      ],
    },
    {
      type: "text",
      title: "Evidence before a conclusion",
      text: "Repeated measurements help reveal variation. One observation alone does not rule out other explanations.",
    },
  ],
  cells: [
    {
      type: "equation",
      title: "Reading a microscope image scale",
      lines: [
        "Scale bar = 10 μm",
        "A cell spans 3 scale-bar lengths",
        "Estimated cell length = 3 × 10 μm = 30 μm",
      ],
    },
    {
      type: "text",
      title: "Image size and real size",
      text: "A printed image can be enlarged without changing the cell’s real size. Use its scale bar, rather than the apparent size on your screen.",
    },
  ],
  "atomic-structure": [
    {
      type: "table",
      title: "Particles in an atom",
      headers: ["Particle", "Charge", "Location"],
      rows: [
        ["Proton", "Positive", "Nucleus"],
        ["Neutron", "Neutral", "Nucleus"],
        ["Electron", "Negative", "Around the nucleus"],
      ],
    },
    {
      type: "text",
      title: "Atomic number",
      text: "The number of protons identifies the element. Changing the number of neutrons changes the isotope, while changing electrons changes the charge.",
    },
  ],
  motion: [
    {
      type: "equation",
      title: "Distance and displacement",
      lines: [
        "Walk 3 m east, then 1 m west",
        "Distance traveled = 3 + 1 = 4 m",
        "Displacement = 3 − 1 = 2 m east",
      ],
    },
    {
      type: "text",
      title: "Two different questions",
      text: "Distance measures the full path. Displacement describes the change from the starting position to the ending position, including direction.",
    },
  ],
  sentences: [
    {
      type: "text",
      title: "Find the subject and predicate",
      text: "“The students in the library reviewed their notes.” The subject is “the students”; the predicate tells what they did: “reviewed their notes.”",
    },
    {
      type: "table",
      title: "Read the sentence in parts",
      headers: ["Part", "Example"],
      rows: [
        ["Who or what?", "The students"],
        ["Extra information", "in the library"],
        ["What happened?", "reviewed their notes"],
      ],
    },
  ],
  recall: [
    {
      type: "text",
      title: "Encoding, storage and retrieval",
      text: "Encoding is the process of taking in and representing information. Storage is its retention over time. Retrieval is bringing it back when you need it.",
    },
    {
      type: "steps",
      title: "A small retrieval exercise",
      items: [
        "Read a short explanation once.",
        "Close it and explain the main idea in your own words.",
        "Reopen it, compare your explanation, and correct what was missing.",
      ],
    },
  ],
  attention: [
    {
      type: "table",
      title: "Notice what interrupts a task",
      headers: ["Distraction", "Possible adjustment"],
      rows: [
        ["A notification", "Silence it for one study period"],
        ["An unrelated thought", "Write a short reminder and return"],
        ["Missing materials", "Gather the materials before starting"],
      ],
    },
    {
      type: "text",
      title: "Observe before changing the plan",
      text: "Record what actually interrupts you. A useful focus plan responds to your situation instead of assuming every distraction has the same cause.",
    },
  ],
  planning: [
    {
      type: "table",
      title: "Turn work into a realistic plan",
      headers: ["Task", "Dependency", "Time estimate"],
      rows: [
        ["Read the brief", "None", "15 minutes"],
        ["Draft an outline", "Understand the brief", "25 minutes"],
        ["Review the outline", "Finish a draft", "10 minutes"],
      ],
    },
    {
      type: "text",
      title: "An estimate can change",
      text: "Leave room for transitions and unexpected work. Compare the estimate with the actual time, then adjust the next plan.",
    },
  ],
  "history-method": [
    {
      type: "table",
      title: "Read a historical source",
      headers: ["Question", "What to record"],
      rows: [
        ["Who created it?", "Author and position"],
        ["When and where?", "Date and historical setting"],
        ["Why was it made?", "Audience and purpose"],
        ["What is missing?", "Perspectives or evidence to compare"],
      ],
    },
    {
      type: "text",
      title: "Source and interpretation",
      text: "A source supplies evidence from a particular perspective. An interpretation explains that evidence and should acknowledge its limits.",
    },
  ],
  ratios: [
    {
      type: "equation",
      title: "Read a ratio in order",
      lines: [
        "2 red counters for every 3 blue counters",
        "Red : blue = 2 : 3",
        "Total counters in one group = 2 + 3 = 5",
      ],
    },
    {
      type: "text",
      title: "Part to part and part to whole",
      text: "The red-to-blue ratio is 2:3. The red-to-total ratio is 2:5. The labels tell you which quantities are being compared.",
    },
  ],
  "reading-foundations": [
    {
      type: "text",
      title: "Choose a reading purpose",
      text: "A reader looking for an argument’s evidence will pay attention differently from a reader learning the steps in a process. State the question you want the text to help answer.",
    },
    {
      type: "table",
      title: "Purpose changes the notes you take",
      headers: ["Reading purpose", "What to look for"],
      rows: [
        ["Understand a process", "Steps, conditions and exceptions"],
        ["Evaluate an argument", "Claims, evidence and assumptions"],
        ["Interpret a story", "Character choices and supporting passages"],
      ],
    },
  ],
};
export function canvasExampleFor(course: Course): CanvasBlock[] {
  const section = course.sections[0];
  return (
    examples[section.id] ??
    additionalExamples[section.id] ?? [
      {
        type: "text",
        title: section.lessons[0].title,
        text: `This section develops ${section.title.toLowerCase()}. The tutor will explain one idea at a time and use your answers to decide whether to revisit an example.`,
      },
      {
        type: "steps",
        title: "The first skills in this section",
        items: section.lessons.slice(0, 4).map((lesson) => lesson.title),
      },
      {
        type: "text",
        title: "Practice you are working toward",
        text: section.practice,
      },
    ]
  );
}
