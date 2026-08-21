"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/lib/data/site";
import { EXPERIENCE_YEARS } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { technologyCount } from "@/lib/data/dna";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Who Pavan is, in two beats.
 *
 * The first is an identity plate: the section title set against the copy at
 * the same optical weight. The second gives the whole viewport to one
 * sentence, resolved word by word as it is read.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const words = about.statement.split(" ");

  const figures = [
    { value: EXPERIENCE_YEARS, label: "Years shipping", suffix: "+" },
    { value: projects.length, label: "Products delivered", pad: 2 },
    { value: technologyCount, label: "Technologies", pad: 2 },
    { value: 4, label: "Engineers led", pad: 2 },
  ];

  useGSAP(
    () => {
      const statement = statementRef.current;
      if (!statement) return;

      const spans = statement.querySelectorAll<HTMLElement>("[data-word]");
      if (spans.length === 0) return;

      if (reducedMotion) {
        gsap.set(spans, { opacity: 1 });
        return;
      }

      // Reading is the animation. Opacity only — colour tweens on this many
      // spans would repaint text every frame for no visible gain.
      gsap.fromTo(
        spans,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: statement,
            start: "top 76%",
            end: "bottom 58%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24 bg-void"
    >
      {/* Carries the hero's grid across the seam so the two read as one plate. */}
      <div
        aria-hidden
        className="tech-grid about-seam pointer-events-none absolute inset-x-0 top-0 h-[42vh] opacity-70"
      />

      {/* ---------- Beat one: the plate ---------- */}
      <div className="gutter relative flex min-h-svh flex-col justify-between pb-16 pt-24 md:pt-32">
        <div>
          <Reveal>
            <p className="label border-t border-line pt-3 text-muted">
              <span className="text-accent">01</span>
              <span className="px-2 text-line">/</span>
              About
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            {/* The title, oversized and stepped. */}
            {/*
              The trigger sits on the heading, not on the moving spans. Each
              span starts translated fully outside its own overflow-hidden
              parent, so its clipped intersection rect is empty — an
              observer watching the span itself would wait forever.
            */}
            <motion.h2
              aria-label="About me"
              className="font-display text-[clamp(3rem,22vw,9rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em] text-ink lg:col-span-6 lg:text-[clamp(3rem,12vw,10rem)]"
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            >
              {about.title.map((line, index) => (
                <span key={line} aria-hidden className="reveal-clip">
                  <motion.span
                    className={`block ${index === 1 ? "pl-[0.14em]" : ""}`}
                    variants={{
                      hidden: { y: "108%" },
                      visible: {
                        y: "0%",
                        transition: {
                          duration: 1.1,
                          delay: index * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* The copy tucks into the negative space beside the title. */}
            <div className="lg:col-span-6 lg:self-end lg:border-l lg:border-line lg:pl-10">
              <Reveal delay={0.1}>
                <p className="text-lead text-ink">{about.lede}</p>
              </Reveal>

              <div className="mt-6 flex flex-col gap-5">
                {about.paragraphs.map((paragraph, index) => (
                  <Reveal key={index} delay={0.16 + index * 0.08}>
                    <p className="max-w-[58ch] text-ink/60">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.34}>
                <p className="label mt-8 flex items-center gap-2.5 text-muted">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {about.footnote}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Figures — hairline columns, deliberately not cards. */}
        <dl className="mt-12 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {figures.map((figure, index) => (
            <div
              key={figure.label}
              className={`flex flex-col gap-2 border-b border-line py-5 pr-6 ${
                index % 2 === 1 ? "border-l border-l-line pl-6" : ""
              } lg:border-b-0 lg:border-l lg:border-l-line lg:pl-6 ${
                index === 0 ? "lg:border-l-0 lg:pl-0" : ""
              }`}
            >
              <dd className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold leading-none tracking-tighter text-ink tabular-nums">
                <Counter
                  value={figure.value}
                  pad={figure.pad ?? 0}
                  suffix={figure.suffix ?? ""}
                />
              </dd>
              <dt className="label text-muted">{figure.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- Beat two: the statement ---------- */}
      <div className="gutter relative flex min-h-svh flex-col justify-center py-24">
        <p
          ref={statementRef}
          data-statement
          className="max-w-[17ch] font-display text-[clamp(2.5rem,8.5vw,8.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
        >
          {words.map((word, index) => (
            <span
              key={index}
              data-word
              className={
                word === about.statementAccent ? "text-accent" : "text-ink"
              }
              style={reducedMotion ? undefined : { opacity: 0.14 }}
            >
              {word}{" "}
            </span>
          ))}
        </p>

        {/* Hand-off, mirroring the hero's but kept to a rail. */}
        <div className="mt-16 border-t border-line pt-4">
          <Reveal>
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span className="text-accent">{about.outro.kicker}</span>
              <span className="text-line">/</span>
              <span>{about.outro.index}</span>
              <span className="text-ink">{about.outro.title}</span>
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
