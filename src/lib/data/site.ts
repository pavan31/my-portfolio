/*
 * Years of experience are counted from the career dates rather than restated
 * here — the career file is the only place employment history is written, so
 * the two cannot drift apart.
 */
import { EXPERIENCE_YEARS } from "./experience";

/**
 * Single source of truth for identity, contact coordinates and copy.
 * Presentation components must never hardcode any of this.
 */

export const site = {
  name: "Pavan Seshu Kumar",
  shortName: "Pavan",
  monogram: "PSK",
  role: "Senior Software Engineer I",
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
    "Pavan Seshu Kumar is a full-stack engineer in Visakhapatnam, India, building production web and mobile products with React, Next.js, React Native and Node — from AI-powered assessment platforms to healthcare apps and enterprise synchronization services.",
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
  invitation: [
    "Available for select work",
    "Product engineering",
    "Let's talk",
    "Web & mobile",
  ],
} as const;

/** Sections in scroll order — drives the nav, the edge rail and the sitemap. */
export const sections = [
  { id: "about", index: "01", label: "About" },
  { id: "dna", index: "02", label: "Engineering DNA" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "work", index: "04", label: "Work" },
  { id: "contact", index: "05", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/**
 * The About section: an identity statement, not a résumé paragraph.
 *
 * `statement` is revealed word by word against scroll, so it is authored as
 * one sentence and split at render — never as pre-broken lines.
 */
export const about = {
  title: ["About", "Me"],
  statement: "I build software that moves ideas forward.",
  /** The one word that resolves to accent rather than ink. */
  statementAccent: "forward.",
  lede: `${EXPERIENCE_YEARS} years building for the web, for phones, and for the services underneath both.`,
  paragraphs: [
    "I work the whole stack — the interface a product gets judged on, the services that have to stay up while it is, and the pipelines that get both into production without anyone staying late. Assessment platforms, healthcare, commerce, enterprise integration: different domains, same discipline.",
    "Lately that includes agent-shaped tooling: putting language models to work on the repetitive parts of engineering itself. I like problems that are still ambiguous, and code that is still legible six months after the deadline.",
  ],
  footnote: "Currently a Senior Software Engineer at Carelon Global Solutions India LLP.",
  /** Hand-off teaser, mirroring the hero's. */
  outro: {
    kicker: "Next",
    index: "02",
    title: "How I build",
  },
} as const;
