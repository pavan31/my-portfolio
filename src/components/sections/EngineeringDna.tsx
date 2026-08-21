"use client";

import { useCallback, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dimensions, dna, technologyCount } from "@/lib/data/dna";
import { site } from "@/lib/data/site";
import type { DimensionId } from "@/lib/data/dna";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { usePointerBus } from "@/lib/hooks/usePointerBus";
import {
  useIsCoarsePointer,
  usePrefersReducedMotion,
} from "@/lib/hooks/useMediaQuery";
import { SectionHeading } from "@/components/motion/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/** Ring radius as a percentage of the square stage. */
const RADIUS = 34;

/** 0° is twelve o'clock; angles run clockwise. */
function pointFor(angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: Number((50 + RADIUS * Math.cos(radians)).toFixed(3)),
    y: Number((50 + RADIUS * Math.sin(radians)).toFixed(3)),
  };
}

const depth = (px: number) => ({ "--depth": `${px}px` }) as CSSProperties;

/**
 * How Pavan builds, as a system rather than a skills list.
 *
 * Six dimensions sit on a ring around a single centre, each joined by a spoke
 * that carries a slow travelling signal — the composition idles rather than
 * sitting still. Selecting one brightens its spoke and fills the readout.
 *
 * The same markup is a vertical spine on a phone: the tablist is never
 * duplicated, only re-laid-out in CSS, so there is exactly one set of tab ids.
 */
export function EngineeringDna() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [activeId, setActiveId] = useState<DimensionId>(dimensions[0].id);
  const reducedMotion = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();

  const activeIndex = dimensions.findIndex((item) => item.id === activeId);
  const active = dimensions[activeIndex] ?? dimensions[0];

  // The centre drifts with the pointer; one gated loop, no React renders.
  usePointerBus(stageRef, { enabled: !coarse && !reducedMotion, ease: 0.06 });

  /** Roving focus across the ring, with selection following focus. */
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    setActiveId((current) => {
      const index = dimensions.findIndex((item) => item.id === current);
      let next = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = (index + 1) % dimensions.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = (index - 1 + dimensions.length) % dimensions.length;
      } else if (event.key === "Home") {
        next = 0;
      } else if (event.key === "End") {
        next = dimensions.length - 1;
      }

      tabRefs.current[next]?.focus();
      return dimensions[next].id;
    });
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Spokes draw themselves in. `pathLength=100` normalises the dash
        // units so one value works for spokes of differing lengths.
        gsap.fromTo(
          "[data-dna-spoke]",
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            duration: 1.1,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: stageRef.current, start: "top 78%" },
          },
        );

        gsap.from("[data-dna-node]", {
          opacity: 0,
          scale: 0.82,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: stageRef.current, start: "top 78%" },
        });

        gsap.from("[data-dna-centre]", {
          opacity: 0,
          scale: 0.86,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: stageRef.current, start: "top 78%" },
        });

        // The system collapses as the section leaves, handing over to the
        // career log rather than cutting to it.
        gsap
          .timeline({
            defaults: { duration: 1, ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom 72%",
              end: "bottom 18%",
              scrub: 0.6,
            },
          })
          .to(stageRef.current, { scale: 0.84, opacity: 0.14 }, 0)
          .fromTo(
            outroRef.current,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.3,
          );
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="dna"
      className="gutter relative scroll-mt-24 border-t border-line bg-surface py-24 md:py-32"
    >
      <SectionHeading
        index="02"
        label="Engineering DNA"
        title={["How I", "build"]}
        note={`Six dimensions, ${technologyCount} tools. Pick one — the system reports what sits underneath it.`}
      />

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* ---------- Readout ---------- */}
        <div className="order-2 lg:order-1 lg:col-span-4 lg:min-h-[24rem]">
          <p className="label border-t border-line pt-3 text-muted">
            Active dimension
          </p>

          <div
            role="tabpanel"
            id={`dna-panel-${active.id}`}
            aria-labelledby={`dna-tab-${active.id}`}
            tabIndex={0}
            className="mt-5 focus-visible:outline-offset-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="label text-accent">{active.index}</p>

                <h3 className="mt-2 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
                  {active.label}
                </h3>

                <p className="mt-4 max-w-[38ch] text-ink/60">{active.summary}</p>

                <ul className="mt-7 grid grid-cols-2 gap-x-6 border-t border-line pt-4">
                  {active.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="label flex items-baseline gap-2 py-1.5 text-ink"
                    >
                      <span aria-hidden className="text-accent">
                        +
                      </span>
                      {technology}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------- The system ---------- */}
        <div className="order-1 lg:order-2 lg:col-span-8">
          <div
            ref={stageRef}
            className="dna-stage pointer-stage relative mx-auto w-full lg:aspect-square lg:max-w-[36rem]"
          >
            {/* Spokes and ring. Decorative: the readout carries the meaning. */}
            <svg
              viewBox="0 0 100 100"
              aria-hidden
              className="pointer-depth absolute inset-0 hidden h-full w-full lg:block"
              style={depth(5)}
            >
              <g className="dna-ring">
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="var(--color-line)"
                  strokeWidth="0.2"
                  strokeDasharray="0.5 2.6"
                />
              </g>

              {dimensions.map((dimension, index) => {
                const point = pointFor(dimension.angle);
                return (
                  <g key={dimension.id} data-active={dimension.id === activeId}>
                    <line
                      data-dna-spoke
                      className="dna-line"
                      x1="50"
                      y1="50"
                      x2={point.x}
                      y2={point.y}
                      pathLength={100}
                      strokeDasharray="100"
                    />
                    <line
                      className="dna-pulse"
                      x1="50"
                      y1="50"
                      x2={point.x}
                      y2={point.y}
                      pathLength={100}
                      style={{ animationDelay: `${index * -1.9}s` }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Centre */}
            <div
              className="dna-centre-wrap pointer-depth"
              style={depth(12)}
              data-dna-centre
            >
              <div className="flex flex-col items-center gap-2">
                <span className="dna-centre font-display text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold uppercase tracking-[-0.04em] text-ink lg:text-[clamp(2rem,4.5vw,3.5rem)]">
                  {dna.centre}
                </span>
                <span className="label text-muted">{site.monogram}</span>
              </div>
            </div>

            {/* Tablist — radial on desktop, a spine on a phone. */}
            <ul
              role="tablist"
              aria-label="Engineering dimensions"
              className="dna-nodes"
              onKeyDown={onKeyDown}
            >
              {dimensions.map((dimension, index) => {
                const point = pointFor(dimension.angle);
                const isActive = dimension.id === activeId;

                return (
                  <li
                    key={dimension.id}
                    data-dna-node
                    data-active={isActive}
                    className="dna-node relative"
                    style={
                      { "--x": point.x, "--y": point.y } as CSSProperties
                    }
                  >
                    <button
                      ref={(node) => {
                        tabRefs.current[index] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`dna-tab-${dimension.id}`}
                      aria-selected={isActive}
                      aria-controls={`dna-panel-${dimension.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveId(dimension.id)}
                      onFocus={() => setActiveId(dimension.id)}
                      onPointerEnter={() => {
                        if (!coarse) setActiveId(dimension.id);
                      }}
                      data-cursor="link"
                      className={`group flex w-full cursor-pointer items-baseline gap-3 whitespace-nowrap py-3.5 pl-9 transition-opacity duration-500 lg:w-auto lg:justify-center lg:px-3 lg:py-2 ${
                        isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                      }`}
                    >
                      <span
                        className={`label transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-muted"
                        }`}
                      >
                        {dimension.index}
                      </span>
                      <span
                        className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 lg:text-base ${
                          isActive ? "text-accent" : "text-ink"
                        }`}
                      >
                        {dimension.label}
                      </span>
                      <span className="label ml-auto text-muted lg:hidden">
                        {dimension.technologies.length}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Hand-off to the career log ---------- */}
      <div ref={outroRef} className="mt-20 border-t border-line pt-4">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
          <span className="text-accent">{dna.outro.kicker}</span>
          <span className="text-line">/</span>
          <span>{dna.outro.index}</span>
          <span className="text-ink">{dna.outro.title}</span>
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </p>
      </div>
    </section>
  );
}
