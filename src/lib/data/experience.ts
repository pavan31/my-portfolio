export type Experience = {
  id: string;
  /** Rendered as the oversized odometer numeral. */
  year: string;
  period: string;
  role: string;
  organisation: string;
  kind: "work" | "education";
  current?: boolean;
  summary: string;
  highlights: readonly string[];
};

export const experience: readonly Experience[] = [
  {
    id: "aspire",
    year: "2018",
    period: "2018 — Present",
    role: "Software Development Engineer II",
    organisation: "Aspire Infolabs Global",
    kind: "work",
    current: true,
    summary:
      "Building and leading delivery on web and mobile products across healthcare, commerce and industrial clients — front end, backend, and the decisions in between.",
    highlights: ["Team leadership", "Full-stack delivery", "Mentoring"],
  },
  {
    id: "srushty",
    year: "2017",
    period: "2017",
    role: "Software Engineering Intern",
    organisation: "Srushty Global Solutions",
    kind: "work",
    summary:
      "First exposure to software built for other people: version control that matters, code review that stings, and requirements that move.",
    highlights: ["Industry practice", "Version control", "Code review"],
  },
  {
    id: "iiitdm",
    year: "2014",
    period: "2014 — 2018",
    role: "B.Tech, Computer Engineering",
    organisation: "IIITDM Kancheepuram",
    kind: "education",
    summary:
      "Four years on the fundamentals that do not expire — algorithms, systems, and how to reason about a program before writing it.",
    highlights: ["Algorithms", "Systems", "Software engineering"],
  },
];
