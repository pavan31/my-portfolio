"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/data/experience";
import { ordinal } from "@/lib/utils";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { SectionHeading } from "@/components/motion/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/**
 * The years are the visual. A single oversized numeral sits behind the
 * entries and rolls like an odometer as each one takes focus — no dots, no
 * connector, no timeline cliché.
 */
export function Trajectory() {
  const sectionRef = useRef<HTMLElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const roll = rollRef.current;
      const entries = gsap.utils.toArray<HTMLElement>("[data-entry]");
      if (!roll || entries.length === 0) return;

      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Rail fill tracks progress through the whole section.
      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          },
        );
      }

      entries.forEach((entry, index) => {
        const activate = () => {
          gsap.to(roll, {
            yPercent: -100 * index,
            duration: still ? 0 : 0.85,
            ease: "power3.inOut",
            overwrite: true,
          });
          if (periodRef.current) {
            periodRef.current.textContent =
              experience[index]?.period ?? "";
          }
          // Dimming the inactive entries is a focus effect, not information.
          // At 0.32 opacity the text fails contrast, so reduced motion keeps
          // every entry fully legible instead.
          if (!still) {
            gsap.to(entries, { opacity: 0.32, duration: 0.5, overwrite: "auto" });
            gsap.to(entry, { opacity: 1, duration: 0.5, overwrite: "auto" });
          }
        };

        ScrollTrigger.create({
          trigger: entry,
          start: "top 62%",
          end: "bottom 62%",
          onEnter: activate,
          onEnterBack: activate,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="trajectory"
      className="gutter scroll-mt-24 border-t border-line bg-surface py-28 md:py-40"
    >
      <SectionHeading
        index="04"
        label="Trajectory"
        title={["How I got", "here"]}
        note="Eight years from a first internship to leading delivery."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        {/* Odometer */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[28vh]">
            <div
              aria-hidden
              className="h-[0.78em] overflow-hidden font-display text-[clamp(5rem,15vw,13rem)] font-extrabold leading-[0.78] tracking-tighter text-dim"
            >
              <div ref={rollRef} className="will-change-transform">
                {experience.map((item) => (
                  <span key={item.id} className="block">
                    {item.year}
                  </span>
                ))}
              </div>
            </div>
            <p className="label mt-4 text-accent">
              <span ref={periodRef}>{experience[0]?.period}</span>
            </p>
          </div>
        </div>

        {/* Entries */}
        <ol className="relative lg:col-span-7">
          <span
            aria-hidden
            className="absolute left-0 top-0 hidden h-full w-px bg-line lg:block"
          >
            <span
              ref={railRef}
              className="absolute inset-0 origin-top scale-y-0 bg-accent"
            />
          </span>

          {experience.map((item, index) => (
            <li
              key={item.id}
              data-entry
              className="border-t border-line py-10 first:border-t-0 lg:pl-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <p className="label text-muted">
                  <span className="text-accent">{ordinal(index)}</span>
                  <span className="px-2 text-line">/</span>
                  {item.period}
                </p>
                {item.current ? (
                  <p className="label flex items-center gap-2 text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Current
                  </p>
                ) : (
                  <p className="label text-muted">
                    {item.kind === "education" ? "Education" : "Industry"}
                  </p>
                )}
              </div>

              <h3 className="mt-4 font-display text-title font-bold tracking-tight text-ink">
                {item.role}
              </h3>
              <p className="mt-1 text-ink/60">{item.organisation}</p>
              <p className="mt-4 max-w-[54ch] text-ink/60">{item.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="label text-muted">
                    <span aria-hidden className="pr-2 text-accent">
                      +
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
