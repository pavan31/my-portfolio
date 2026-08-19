/**
 * Single source of truth for identity, contact coordinates and copy.
 * Presentation components must never hardcode any of this.
 */

export const CAREER_START_YEAR = 2018;

/**
 * Stated experience, in years. Deliberately an explicit figure rather than
 * `currentYear - CAREER_START_YEAR`, which counts from the first full-time
 * role and reads high. Every surface that quotes a number reads it from here,
 * so the site cannot contradict itself.
 */
export const EXPERIENCE_YEARS = 6;

export const site = {
  name: "Pavan Seshu Kumar",
  shortName: "Pavan",
  monogram: "PSK",
  role: "Software Development Engineer II",
  discipline: "Full-stack engineer",
  url: "https://pavanseshukumar.github.io",
  locale: "en_IN",
  email: "poluparthipavanseshukumar@gmail.com",
  phone: "+91 9790564056",
  phoneHref: "tel:+919790564056",
  resume: "/Pavan-Seshu-Kumar-Resume-v10.pdf",
  location: {
    city: "Visakhapatnam",
    region: "Andhra Pradesh",
    country: "India",
    /** Used for the live-clock readout in the hero and footer. */
    timeZone: "Asia/Kolkata",
    coordinates: "17.6868° N, 83.2185° E",
  },
  availability: "Open to select work",
  tagline: "Full-stack engineer building web and mobile products end to end.",
  description:
    "Pavan Seshu Kumar is a full-stack engineer in Visakhapatnam, India, building production web and mobile products with React, Next.js, React Native and Node — from healthcare apps to exam platforms and subsea engineering systems.",
  keywords: [
    "Pavan Seshu Kumar",
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "React Native developer",
    "Node.js",
    "portfolio",
    "Visakhapatnam",
    "software engineer India",
  ],
} as const;

/**
 * Hero content. The wordmark is split into the two groups the scroll
 * transition drives apart, so the composition and the animation read from the
 * same definition rather than duplicating the name as literals.
 */
export const hero = {
  wordmark: {
    lead: ["Pavan"],
    trail: ["Seshu", "Kumar"],
  },
  discipline: "Full stack developer",
  experience: `${EXPERIENCE_YEARS}+ years experience`,
  stack: "React / Next.js / Java / Node / AWS",
  based: "Based in India",
  /** Teaser for the section the hero hands over to. */
  outro: {
    kicker: "Next",
    title: "About me",
  },
} as const;

/** Ticker strips — connective tissue between sections, not decoration. */
export const tickers = {
  disciplines: [
    "Front-end architecture",
    "React Native",
    "Design systems",
    "Node services",
    "GraphQL",
    "Performance",
    "Team leadership",
  ],
  invitation: [
    "Available for select work",
    "Product engineering",
    "Let's talk",
    "Web & mobile",
  ],
} as const;

/** Sections in scroll order — drives the nav, the edge rail and the sitemap. */
export const sections = [
  { id: "index", index: "01", label: "Index" },
  { id: "stack", index: "02", label: "Stack" },
  { id: "work", index: "03", label: "Work" },
  { id: "trajectory", index: "04", label: "Trajectory" },
  { id: "contact", index: "05", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/** Words the manifesto highlights in accent as they resolve on scroll. */
export const manifesto = {
  statement:
    "I build the parts people actually touch — and the parts that hold them up. Work across healthcare, commerce and subsea engineering has taught me that the interface is the product, and that nothing ships unless the layer beneath it is boring, predictable and fast.",
  accents: ["the interface is the product", "boring, predictable and fast"],
  supporting: [
    "I work end to end: React and Next.js on the front, React Native where the product lives in a pocket, Node, Spring Boot and GraphQL behind it. I lead small teams, review hard, and prefer the solution that is still legible six months later.",
    "Currently building at Aspire Infolabs from Visakhapatnam, India.",
  ],
} as const;
