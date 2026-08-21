"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { impact, type ImpactMetric } from "@/lib/data/impact";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { cn, ordinal } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/*
 * A short interlude between the work and the invitation: one figure, held at
 * one place on the page, replaced by the next as the reader scrolls.
 *
 * Every metric occupies the same grid cell, so the number never travels down
 * the document — only its content changes. The section's own height is the
 * scroll distance the sequence needs; the stage inside it sticks, so seven
 * figures cost about two and a half screens rather than one screen each.
 *
 * One direction, throughout: the outgoing figure leaves upward as the
 * incoming one arrives from below, on the same beat. Because the whole
 * sequence is a single scrubbed timeline and nothing is fired by an
 * observer, scrolling back up plays the identical motion in reverse.
 */

/*
 * One slot per metric, in four phases. The hand-over is *sequential*, not a
 * crossfade: a figure is a tall block — number, label, source — so two of
 * them half-lit at once put the incoming number straight on top of the
 * outgoing label. The outgoing one has to be gone before the next arrives.
 *
 *   0.00 → 0.60   hold, at rest and readable
 *   0.60 → 0.79   exits upward, alone
 *   0.79 → 0.83   the stage is empty
 *   0.83 → 1.00   the next one arrives from below, alone
 *
 * The phases must fill the slot exactly, or the sequence develops a seam.
 */
const STEP = 1;
/** 60% of the slot: the figure simply sits there and can be read. */
const HOLD = 0.6;
const EXIT_DURATION = 0.19;
/** The short beat with nothing on stage. This is what stops the collision. */
const CLEAR = 0.04;
const ENTER_AT = HOLD + EXIT_DURATION + CLEAR;
const ENTER_DURATION = STEP - ENTER_AT;

/** Restrained on a laptop, smaller again on a tablet and a phone. */
const travel = (): number => {
  const width = window.innerWidth;
  if (width < 768) return 40;
  if (width < 1024) return 60;
  return 88;
};

export function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const unitRefs = useRef<Array<HTMLLIElement | null>>([]);

  const reducedMotion = usePrefersReducedMotion();
  const metrics = impact.metrics;

  useGSAP(
    () => {
      if (reducedMotion) return;

      const units = unitRefs.current.filter(
        (node): node is HTMLLIElement => node !== null,
      );
      if (units.length === 0) return;

      /* Only the first figure is lit before the sequence starts. */
      gsap.set(units, { opacity: 0 });
      gsap.set(units[0], { opacity: 1 });

      /* ---------- The masthead establishes the section first ---------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "bottom top",
            /*
              Plays on the way in from either direction — a reader who jumps
              to Contact from the index and then scrolls back up must not
              meet a title still parked in its hidden start state. `play` on
              a finished timeline is a no-op, so it never replays.
            */
            toggleActions: "play none play none",
          },
          defaults: { ease: "power3.out" },
        })
        .from(kickerRef.current, { opacity: 0, y: 14, duration: 0.6 })
        .from(
          titleRef.current,
          { yPercent: 110, duration: 1, ease: "expo.out" },
          0.12,
        )
        /* Then, and only then, the first number — arriving from below, as
           every figure after it will. */
        .from(
          units[0],
          { opacity: 0, y: () => travel(), duration: 0.85 },
          0.42,
        );

      /* ---------- The sequence itself ---------- */

      /*
       * Every tween is a fromTo with immediateRender off: a scrubbed timeline
       * gets rendered at arbitrary times and in both directions, and a plain
       * `to` would latch whatever happened to be on screen when it first ran.
       * Linear easing keeps the type moving at the speed of the scroll, which
       * is what makes the hand-over read as one continuous line of typography.
       */
      const timeline = gsap.timeline({
        defaults: { ease: "none", immediateRender: false },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          /*
           * Scrubbed, never snapped: stopping mid-transition holds it there.
           * The lag is deliberate — the type keeps travelling for a beat
           * after the wheel stops, which is what makes it settle rather than
           * halt. Past roughly this value it stops feeling scroll-driven.
           */
          scrub: 1.5,
          /* Resize re-reads the travel distance rather than keeping stale px. */
          invalidateOnRefresh: true,
        },
      });

      /** Centre → up and out. The only exit in the section. */
      const shiftOut = (target: HTMLElement, at: number) =>
        timeline.fromTo(
          target,
          { y: 0, opacity: 1 },
          { y: () => -travel(), opacity: 0, duration: EXIT_DURATION },
          at,
        );

      /** Below → centre. The only entrance in the section. */
      const shiftIn = (target: HTMLElement, at: number) =>
        timeline.fromTo(
          target,
          { y: () => travel(), opacity: 0 },
          { y: 0, opacity: 1, duration: ENTER_DURATION },
          at,
        );

      units.forEach((unit, index) => {
        const at = index * STEP;
        const next = units[index + 1];

        /*
         * Strictly one after the other, with CLEAR between them: at no point
         * in the slot are two figures both carrying opacity. Reversed, the
         * same order simply runs backwards.
         */
        shiftOut(unit, at + HOLD);
        if (next) shiftIn(next, at + ENTER_AT);
      });

      /*
       * The hand-off. The masthead leaves on the same beat as the last
       * figure — and in the same direction — so Contact arrives on an empty
       * stage rather than rising behind a title that is still lit.
       */
      const tailAt = (units.length - 1) * STEP + HOLD;
      timeline.fromTo(
        headRef.current,
        { y: 0, opacity: 1 },
        { y: () => -travel() * 0.5, opacity: 0, duration: EXIT_DURATION },
        tailAt,
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  /* ---------------------------------------------------------------- *
   * Reduced motion: the title stays, and the figures are simply read
   * in order — all of them, with no scroll-linked transform anywhere.
   * ---------------------------------------------------------------- */
  if (reducedMotion) {
    return (
      <section
        id="impact"
        className="gutter scroll-mt-24 border-t border-line bg-void py-24 md:py-32"
      >
        <Masthead count={metrics.length} />

        <ol className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <li key={metric.figure} className="border-t border-line pt-5">
              <Figure
                metric={metric}
                className="text-[clamp(2.5rem,7vw,4.5rem)]"
              />
              <Meta metric={metric} index={index} total={metrics.length} />
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="impact"
      /*
       * The height *is* the scroll distance: the stage takes one screen, and
       * the sequence runs in the remainder — 280vh for seven figures, so a
       * slot is about 41vh of scroll: roughly 25vh of it holding the figure
       * still, and 16vh handing over to the next one.
       */
      className="relative min-h-[380svh] scroll-mt-24 border-t border-line bg-void"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="gutter flex h-full flex-col justify-center py-[10svh]">
          {/* Index, then title. Anchored: only the figures below move. */}
          <div ref={headRef}>
            <div ref={kickerRef}>
              <Masthead count={metrics.length} />
            </div>
            <h2 className="reveal-clip mt-4">
              <span
                ref={titleRef}
                className="block font-display text-[clamp(1.75rem,4.4vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink"
              >
                {impact.label}
                <span className="text-accent">.</span>
              </span>
            </h2>
          </div>

          {/*
            One cell, seven occupants. A grid rather than absolute positioning,
            so the well is exactly as tall as its tallest figure and the number
            keeps its place when a label runs to two lines.
          */}
          <ol className="relative mt-[6svh] grid justify-items-start">
            {metrics.map((metric, index) => (
              <li
                key={metric.figure}
                ref={(node) => {
                  unitRefs.current[index] = node;
                }}
                /*
                  Hidden in the markup rather than only by the script: the
                  seven figures share one cell, so a frame rendered before
                  GSAP takes over would stack all of them on top of each
                  other. The timeline overrides this with inline opacity.

                  Number, label and source move as one element — they are one
                  metric, not three things that happen to animate together.
                */
                className={cn(
                  "pointer-events-none col-start-1 row-start-1 select-none will-change-transform",
                  index > 0 && "opacity-0",
                )}
              >
                <Figure
                  metric={metric}
                  className="text-[clamp(3.5rem,15vw,10rem)]"
                />
                <Meta metric={metric} index={index} total={metrics.length} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** The section's index line — the same form every other section carries. */
function Masthead({ count }: { count: number }) {
  return (
    <p className="label text-muted">
      <span className="text-accent">{impact.index}</span>
      <span className="px-2 text-line">/</span>
      {impact.label}
      <span className="px-2 text-line">·</span>
      <span aria-hidden>{ordinal(count - 1)} figures</span>
    </p>
  );
}

function Figure({
  metric,
  className,
}: {
  metric: ImpactMetric;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display font-extrabold leading-[0.82] tracking-[-0.045em] tabular-nums text-ink",
        className,
      )}
    >
      {metric.figure}
      {metric.suffix ? (
        <span className="text-accent">{metric.suffix}</span>
      ) : null}
    </p>
  );
}

/** Label, then the source project, then the counter — in that order of weight. */
function Meta({
  metric,
  index,
  total,
}: {
  metric: ImpactMetric;
  index: number;
  total: number;
}) {
  return (
    <div className="mt-5 md:mt-7">
      <p className="font-display text-[clamp(1.05rem,2.6vw,1.75rem)] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-ink-60">
        {metric.label.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <p className="label mt-4 text-muted/80">
        {metric.source ? (
          <>
            <span>{metric.source}</span>
            <span aria-hidden className="px-2 text-line">
              ·
            </span>
          </>
        ) : null}
        <span className="sr-only">{`Figure ${index + 1} of ${total}`}</span>
        <span aria-hidden>{`${ordinal(index)} / ${ordinal(total - 1)}`}</span>
      </p>
    </div>
  );
}
