/**
 * Presented as a typographic ledger — no logos, no pills.
 * `note` is revealed on row hover, so keep it to one clause.
 */
export type Skill = {
  name: string;
  group: SkillGroup;
  note: string;
  /** Marks the tools reached for first; used for emphasis, not a rating bar. */
  primary?: boolean;
};

export type SkillGroup =
  | "Interface"
  | "Mobile"
  | "Server"
  | "Data"
  | "Language"
  | "Craft";

export const skillGroups: readonly SkillGroup[] = [
  "Interface",
  "Mobile",
  "Server",
  "Data",
  "Language",
  "Craft",
];

export const skills: readonly Skill[] = [
  {
    name: "React",
    group: "Interface",
    note: "Component architecture and state that survives a rewrite",
    primary: true,
  },
  {
    name: "Next.js",
    group: "Interface",
    note: "App Router, server components, static and hybrid delivery",
    primary: true,
  },
  {
    name: "Angular",
    group: "Interface",
    note: "Enterprise front ends where structure beats flexibility",
  },
  {
    name: "Redux",
    group: "Interface",
    note: "Predictable state for applications too large to intuit",
  },
  {
    name: "Tailwind CSS",
    group: "Interface",
    note: "Design systems expressed as constraints, not stylesheets",
    primary: true,
  },
  {
    name: "Material UI",
    group: "Interface",
    note: "Accessible component foundations under tight deadlines",
  },
  {
    name: "Bootstrap",
    group: "Interface",
    note: "Legacy surfaces that still need to ship today",
  },
  {
    name: "React Native",
    group: "Mobile",
    note: "One codebase, two stores, native-feeling motion",
    primary: true,
  },
  {
    name: "Node.js",
    group: "Server",
    note: "Services, schedulers and the glue between them",
    primary: true,
  },
  {
    name: "Express",
    group: "Server",
    note: "Thin, explicit HTTP layers over real domain logic",
  },
  {
    name: "Spring Boot",
    group: "Server",
    note: "JVM services where reliability outranks velocity",
  },
  {
    name: "FastAPI",
    group: "Server",
    note: "Typed Python endpoints for data-adjacent work",
  },
  {
    name: "GraphQL",
    group: "Data",
    note: "Schemas that let clients ask for exactly what they need",
  },
  {
    name: "MongoDB",
    group: "Data",
    note: "Document modelling that anticipates the next feature",
    primary: true,
  },
  {
    name: "TypeScript",
    group: "Language",
    note: "Types as the cheapest test suite available",
    primary: true,
  },
  {
    name: "JavaScript",
    group: "Language",
    note: "The language underneath everything above",
  },
  {
    name: "Python",
    group: "Language",
    note: "Automation, data wrangling and service work",
  },
  {
    name: "HTML & CSS",
    group: "Craft",
    note: "Semantics, cascade and layout done properly",
  },
  {
    name: "Git",
    group: "Craft",
    note: "History that reads like an explanation",
  },
];
