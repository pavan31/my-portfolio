"use client";

import { motion, type Variants } from "motion/react";
import { skillGroups, skills, type SkillGroup } from "@/lib/data/skills";
import { ordinal } from "@/lib/utils";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Skills as a printed index rather than badges: grouped, numbered, and set in
 * display type. The detail note is earned by hovering, not dumped on the page.
 */
export function Stack() {
  const reducedMotion = usePrefersReducedMotion();

  // Ordered by group so the ledger reads top-to-bottom like a directory.
  const ordered = skillGroups.flatMap((group) =>
    skills.filter((skill) => skill.group === group),
  );

  let previousGroup: SkillGroup | null = null;

  return (
    <section
      id="stack"
      className="gutter scroll-mt-24 border-t border-line bg-surface py-28 md:py-40"
    >
      <SectionHeading
        index="02"
        label="Stack"
        title={["What I reach", "for, and why"]}
        note="Grouped by where it sits in the system. Hover a line for the reason it earns its place."
        className="max-w-none"
      />

      {/*
        Keyed on the motion preference so the list remounts when it resolves.
        The hydration render always reports "no preference" and applies the
        hidden state; dropping the props afterwards would leave the rows stuck
        at opacity 0, since there is no longer an `animate` target to reach.
      */}
      <motion.ul
        key={reducedMotion ? "static" : "animated"}
        className="mt-16 border-b border-line"
        {...(reducedMotion
          ? {}
          : {
              variants: list,
              initial: "hidden" as const,
              whileInView: "visible" as const,
              viewport: { once: true, margin: "0px 0px -8% 0px" },
            })}
      >
        {ordered.map((skill, index) => {
          const startsGroup = skill.group !== previousGroup;
          previousGroup = skill.group;

          return (
            <motion.li
              key={skill.name}
              {...(reducedMotion ? {} : { variants: row })}
              className="group border-t border-line"
              data-cursor="link"
            >
              {/*
                Mobile gets a standing group header instead of repeating the
                group on every row, and shows the note outright — there is no
                hover to earn it with.
              */}
              {startsGroup ? (
                <p className="label pt-6 text-accent md:hidden">{skill.group}</p>
              ) : null}

              <div className="grid grid-cols-1 gap-y-1 py-4 transition-[padding-left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-cols-12 md:items-baseline md:gap-x-6 md:py-5 md:group-hover:pl-3">
                <span className="label col-span-2 hidden self-center text-muted md:block">
                  {startsGroup ? skill.group : ""}
                </span>

                <span className="label col-span-1 hidden self-center text-muted transition-colors duration-300 group-hover:text-accent md:block">
                  {ordinal(index)}
                </span>

                <h3 className="font-display text-title font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:col-span-5">
                  {skill.primary ? (
                    <span
                      aria-hidden
                      className="mr-3 inline-block h-1.5 w-1.5 -translate-y-[0.35em] rounded-full bg-accent/70 align-middle"
                    />
                  ) : null}
                  {skill.name}
                </h3>

                <p className="text-sm text-muted md:col-span-4 md:self-center md:text-right md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                  {skill.note}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
