/**
 * Each project renders a generated SVG "plate" instead of a screenshot.
 * `motif` selects which one — see components/visuals/ProjectPlate.tsx.
 */
export type PlateMotif =
  | "arc"
  | "grid"
  | "wave"
  | "orbit"
  | "strata"
  | "pulse"
  | "mesh";

export type Project = {
  slug: string;
  title: string;
  /** Rendered oversized inside the plate. */
  mark: string;
  domain: string;
  discipline: string;
  role: string;
  summary: string;
  detail: string;
  stack: readonly string[];
  href: string | null;
  motif: PlateMotif;
  featured: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "amc-ladder",
    title: "AMC Ladder",
    mark: "AL",
    domain: "Medical education",
    discipline: "Web platform",
    role: "Full-stack",
    summary: "Exam preparation platform for the AMC CAT.",
    detail:
      "A preparation platform for Australian Medical Council candidates: timed practice tests, worked explanations, personalised study plans and analytics that surface the topics a candidate is quietly failing.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://www.amcladder.com/",
    motif: "arc",
    featured: true,
  },
  {
    slug: "happily-health",
    title: "Happily Health",
    mark: "HH",
    domain: "Health & wellness",
    discipline: "Mobile application",
    role: "Front-end lead, team of 4",
    summary: "Wellness app shipped to the Play Store.",
    detail:
      "A health and wellness companion built in React Native. I owned the front-end architecture and user experience while leading a cross-functional team of four through delivery.",
    stack: ["React Native", "JavaScript", "Health APIs"],
    href: "https://play.google.com/store/apps/details?id=com.sunpooh.Health&hl=en",
    motif: "pulse",
    featured: true,
  },
  {
    slug: "credr",
    title: "CredR",
    mark: "CR",
    domain: "Commerce",
    discipline: "Web platform",
    role: "Full-stack",
    summary: "Marketplace for used two-wheelers.",
    detail:
      "A marketplace for buying and selling used bikes and scooters. I worked on platform stability — clearing production defects and integrating new routes without disturbing live traffic.",
    stack: ["React", "Node.js", "MongoDB"],
    href: "https://www.credr.com",
    motif: "grid",
    featured: true,
  },
  {
    slug: "myclnq",
    title: "MyCLNQ",
    mark: "MC",
    domain: "Healthcare",
    discipline: "Mobile application",
    role: "Mobile engineer",
    summary: "Family healthcare, clinic discovery and booking.",
    detail:
      "An app for managing a household's healthcare. I built the clinic locator and the online appointment booking flow, keeping the interface simple enough for non-technical users under stress.",
    stack: ["React Native", "Location Services", "REST APIs"],
    href: "https://play.google.com/store/search?q=myclnq&c=apps&hl=en",
    motif: "orbit",
    featured: true,
  },
  {
    slug: "oceaneering",
    title: "Oceaneering",
    mark: "OC",
    domain: "Subsea engineering",
    discipline: "Enterprise system",
    role: "Backend engineer",
    summary: "GraphQL services for subsea operations.",
    detail:
      "Backend work for a subsea engineering company: integrating external APIs, modelling operational data in MongoDB and exposing it through GraphQL for internal consumers.",
    stack: ["GraphQL", "MongoDB", "Node.js"],
    href: null,
    motif: "mesh",
    featured: false,
  },
  {
    slug: "body-beat",
    title: "Body Beat",
    mark: "BB",
    domain: "Fitness",
    discipline: "Mobile application",
    role: "Mobile engineer",
    summary: "Vitals tracker aggregating wearable data.",
    detail:
      "A vitals tracker that pulls health and fitness signals from wearables and connected devices into one timeline, reconciling readings that rarely agree with each other.",
    stack: ["React Native", "Health APIs", "Data integration"],
    href: null,
    motif: "wave",
    featured: false,
  },
  {
    slug: "accelecom",
    title: "Accelecom",
    mark: "AC",
    domain: "Telecommunications",
    discipline: "Backend system",
    role: "Backend engineer",
    summary: "Synchronisation layer between disparate systems.",
    detail:
      "A Spring Boot service that keeps actions in step across applications that were never designed to talk to each other, exposed over a versioned REST surface.",
    stack: ["Spring Boot", "Java", "REST APIs"],
    href: null,
    motif: "strata",
    featured: false,
  },
] as const;
