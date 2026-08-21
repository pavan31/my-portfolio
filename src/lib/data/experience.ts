/**
 * The career, in chapters.
 *
 * PROVENANCE — this is a hiring document.
 *
 * Institution, employers, roles, dates and the AspireInfolabs engineering
 * detail are supplied by Pavan and used verbatim. Carelon deliberately
 * carries nothing but company, role and start date: no detail has been given
 * for it yet, and a plausible invention is the fastest way to lose an
 * interview. When that detail arrives it goes here, and the section renders
 * it without a component change.
 *
 * These dates are the single source of truth for every other surface —
 * schema markup, the About copy and the stated years of experience all read
 * from this file so the site cannot contradict itself.
 */

export type ChapterKind = "education" | "experience";

export type CareerChapter = {
  id: string;
  /** Chapter numeral. */
  index: string;
  kind: ChapterKind;
  /** The oversized plate numeral. */
  year: string;
  period: string;
  organisation: string;
  /** Role, or qualification where the chapter is education. */
  title: string;
  /** Education only. */
  field?: string;
  /**
   * Where this chapter sits in the arc, from computer engineering through to
   * senior software engineering. The progression is the point of the section.
   */
  discipline: string;
  /** The one verified career-level figure, on the chapter that earned it. */
  figure?: { value: string; label: string };
  /** What the years were actually spent doing. */
  practice?: readonly string[];
  technologies?: readonly string[];
  since?: { iso: string; label: string };
  current?: boolean;
};

export const career: readonly CareerChapter[] = [
  {
    id: "iiitdm",
    index: "01",
    kind: "education",
    year: "2014",
    period: "2014 — 2018",
    organisation: "IIITDM Kancheepuram",
    title: "B.Tech",
    field: "Computer Engineering",
    discipline: "Computer engineering",
  },
  {
    id: "aspire",
    index: "02",
    kind: "experience",
    year: "2018",
    period: "August 2018 — June 2026",
    organisation: "AspireInfolabs Global Pvt. Ltd.",
    title: "Software Development Engineer II",
    discipline: "Software engineering → full-stack development",
    figure: { value: "08", label: "Years of building" },
    practice: [
      "Web applications in React.js, React Native and Node.js — built for scale, performance, responsive layout and reuse.",
      "Reusable React components and shared libraries, so consistency and maintainability held across modules.",
      "RESTful APIs for data fetching, state, and the traffic between front end and back end.",
      "Secure authentication flows and data handling, for user privacy and data integrity.",
      "Performance work: refactoring, responsive layouts, and modern practice applied to code already in production.",
      "Debugging, troubleshooting and reliability in an inherited codebase — technical debt paid down rather than deferred.",
      "TypeScript across React and Node, for applications that stay type-safe and maintainable.",
      "Working with product managers and UX leads to define deliverables, refine requirements, and turn them into something people could use.",
    ],
    technologies: [
      "React.js",
      "React Native",
      "Node.js",
      "TypeScript",
      "REST APIs",
    ],
  },
  {
    id: "carelon",
    index: "03",
    kind: "experience",
    year: "2026",
    period: "2026 — Present",
    organisation: "Carelon Global Solutions India LLP",
    title: "Senior Software Engineer I",
    discipline: "Senior software engineering",
    since: { iso: "2026-06-22", label: "Since 22 June 2026" },
    current: true,
  },
];

/** Drives the schema markup and any copy that names the current employer. */
export const currentRecord =
  career.find((chapter) => chapter.current) ?? career[career.length - 1];

/** Drives `alumniOf` in the structured data. */
export const educationRecord =
  career.find((chapter) => chapter.kind === "education") ?? career[0];

/**
 * Years in professional engineering, counted from the AspireInfolabs start.
 * Quoted as a figure in the career section and as the stated experience
 * everywhere else, so the two can never disagree.
 */
export const EXPERIENCE_YEARS = 8;

export const careerLog = {
  /** Authored as lines, because the break is the composition. */
  statement: ["From writing code", "to building systems."],
  /** The tail that resolves to accent — one word, as everywhere else. */
  statementAccent: "systems.",
  note: "Three chapters. One direction.",
  currentLabel: "Current",
  practiceLabel: "What the years were",
  status: {
    label: "Status",
    value: "Active",
    line: "Still building.",
  },
  /** The typographic hand-off: one log becomes the next. */
  morph: { from: "Career.log", to: "Selected work" },
  outro: { kicker: "Next", index: "04", title: "Selected work" },
} as const;
