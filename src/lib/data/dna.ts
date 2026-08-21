/**
 * The six dimensions of the Engineering DNA system.
 *
 * PROVENANCE — worth keeping straight, because this is a hiring document.
 *
 * Corroborated by the résumé, the project list, or this repository:
 *   React, Next.js, TypeScript, JavaScript, Angular, React Native,
 *   Tailwind CSS, Redux, Node.js, Express, Spring Boot, Java, Python,
 *   FastAPI, GraphQL, MongoDB, REST APIs, Git, GitHub Actions, CI/CD,
 *   team leadership, code review, mentoring.
 *
 * Asserted by Pavan and NOT independently corroborated here:
 *   AWS, Docker, Kubernetes, Jenkins, Playwright, Cypress, Selenium,
 *   AI agents, LLM applications, prompt engineering, developer tooling.
 *
 * Pruning any of them is a one-line edit in this file.
 */

export type DimensionId =
  | "product"
  | "frontend"
  | "backend"
  | "cloud"
  | "automation"
  | "ai";

export type Dimension = {
  id: DimensionId;
  index: string;
  label: string;
  /** Position on the ring in degrees; 0 is twelve o'clock, running clockwise. */
  angle: number;
  /** One line on what the dimension means in practice — never a definition. */
  summary: string;
  technologies: readonly string[];
};

/**
 * Ordered clockwise from the top as a delivery loop: decide, build the
 * surface, build what holds it up, ship it, automate it, then teach the
 * machine to do the dull parts.
 */
export const dimensions: readonly Dimension[] = [
  {
    id: "product",
    index: "01",
    label: "Product",
    angle: 0,
    summary: "Deciding what is worth building, and what can wait.",
    technologies: [
      "Discovery",
      "Scoping",
      "Team leadership",
      "Code review",
      "Mentoring",
    ],
  },
  {
    id: "frontend",
    index: "02",
    label: "Frontend",
    angle: 60,
    summary: "The layer a product gets judged on, before anything else.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Angular",
      "React Native",
      "Tailwind CSS",
      "Redux",
    ],
  },
  {
    id: "backend",
    index: "03",
    label: "Backend",
    angle: 120,
    summary: "Services that stay boring while everything above them changes.",
    technologies: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "Python",
      "FastAPI",
      "GraphQL",
      "MongoDB",
      "REST APIs",
    ],
  },
  {
    id: "cloud",
    index: "04",
    label: "Cloud",
    angle: 180,
    summary: "Where it runs, and how it gets there without a manual step.",
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: "automation",
    index: "05",
    label: "Automation",
    angle: 240,
    summary: "Removing the work that should never have needed a person.",
    technologies: [
      "GitHub Actions",
      "Jenkins",
      "Playwright",
      "Cypress",
      "Selenium",
      "Git",
    ],
  },
  {
    id: "ai",
    index: "06",
    label: "AI / Agents",
    angle: 300,
    summary: "Putting models to work on the repetitive parts of engineering.",
    technologies: [
      "AI agents",
      "LLM applications",
      "Prompt engineering",
      "Developer tooling",
    ],
  },
];

export const dna = {
  /** The centre of the composition. Typography, not an object. */
  centre: "Build",
  outro: {
    kicker: "Next",
    index: "03",
    title: "Career.log",
  },
} as const;

export const technologyCount = dimensions.reduce(
  (total, dimension) => total + dimension.technologies.length,
  0,
);
