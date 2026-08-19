"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { EXPERIENCE_YEARS, manifesto, site } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { skills } from "@/lib/data/skills";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

type Token = { word: string; accent: boolean };

/**
 * Marks which words belong to an accented phrase, so the highlight can be
 * authored as readable copy in the data file rather than as inline markup.
 */
function tokenise(statement: string, accents: readonly string[]): Token[] {
  const ranges = accents
    .map((phrase) => {
      const at = statement.indexOf(phrase);
      return at === -1 ? null : { start: at, end: at + phrase.length };
    })
    .filter((range): range is { start: number; end: number } => range !== null);

  const tokens: Token[] = [];
  let cursor = 0;

  for (const word of statement.split(" ")) {
    const start = statement.indexOf(word, cursor);
    const end = start + word.length;
    cursor = end;
    tokens.push({
      word,
      // Overlap, not containment: a phrase authored without its trailing
      // punctuation would otherwise drop its final word out of the highlight.
      accent: ranges.some((range) => start < range.end && end > range.start),
    });
  }

  return tokens;
}

export function Index() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const tokens = tokenise(manifesto.statement, manifesto.accents);
  const years = EXPERIENCE_YEARS;

  useGSAP(
    () => {
      const statement = statementRef.current;
      if (!statement) return;

      const words = statement.querySelectorAll<HTMLElement>("[data-word]");
      if (words.length === 0) return;

      if (reducedMotion) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      // Reading is the animation: each word resolves as the line passes the fold.
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.35,
          scrollTrigger: {
            trigger: statement,
            start: "top 78%",
            end: "bottom 62%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const stats = [
    { value: years, label: "Years shipping", suffix: "+" },
    { value: projects.length, label: "Products delivered", pad: 2 },
    { value: skills.length, label: "Tools in rotation", pad: 2 },
    { value: 4, label: "Engineers led", pad: 2 },
  ];

  return (
    <section
      ref={sectionRef}
      id="index"
      className="gutter relative scroll-mt-24 border-t border-line bg-void py-28 md:py-40"
    >
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        {/* Sticky ledger */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-28">
            <p className="label text-muted">
              <span className="text-accent">01</span>
              <span className="px-2 text-line">/</span>
              Index
            </p>

            <dl className="mt-8 flex flex-col gap-4 border-t border-line pt-6">
              {[
                ["Based", `${site.location.city}, ${site.location.country}`],
                ["Focus", "Web · Mobile · Services"],
                ["Status", site.availability],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col gap-1">
                  <dt className="label text-muted">{term}</dt>
                  <dd className="text-sm text-ink/60">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Statement */}
        <div className="md:col-span-8 lg:col-span-9">
          <p
            ref={statementRef}
            className="font-display text-title font-semibold leading-[1.18] tracking-tight text-balance"
          >
            {tokens.map((token, index) => (
              <span
                key={index}
                data-word
                className={token.accent ? "text-accent" : "text-ink"}
                style={reducedMotion ? undefined : { opacity: 0.16 }}
              >
                {token.word}{" "}
              </span>
            ))}
          </p>

          <div className="mt-14 grid gap-6 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
            {manifesto.supporting.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="max-w-[52ch] text-ink/60">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* Figures — hairline-separated columns, deliberately not cards. */}
          <dl className="mt-16 grid grid-cols-2 border-t border-line lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-2 border-b border-line py-6 pr-6 ${
                  index % 2 === 1 ? "border-l border-l-line pl-6" : ""
                } lg:border-b-0 lg:border-l lg:border-l-line lg:pl-6 ${
                  index === 0 ? "lg:border-l-0 lg:pl-0" : ""
                }`}
              >
                <dd className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-none tracking-tighter text-ink tabular-nums">
                  <Counter
                    value={stat.value}
                    pad={stat.pad ?? 0}
                    suffix={stat.suffix ?? ""}
                  />
                </dd>
                <dt className="label text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
