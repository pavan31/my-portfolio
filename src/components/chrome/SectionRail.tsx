"use client";

import { sections } from "@/lib/data/site";
import { scrollToTarget } from "@/lib/scroll";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * Right-edge position indicator — the instrument-panel detail that tells you
 * where you are without a persistent nav bar.
 */
export function SectionRail() {
  const active = useActiveSection();

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-4 top-1/2 z-[72] hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToTarget(`#${section.id}`)}
                className="group flex items-center gap-2.5"
                data-cursor="link"
                aria-current={isActive ? "true" : undefined}
              >
                {/*
                  Revealed on hover only. Shown for the active section it
                  collides with right-aligned page content at common widths,
                  and the tick alone already communicates position.
                */}
                <span
                  className={cn(
                    "label translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100",
                    isActive ? "text-accent" : "text-muted",
                  )}
                >
                  {section.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "block h-px transition-all duration-500",
                    isActive
                      ? "w-7 bg-accent"
                      : "w-3.5 bg-muted group-hover:w-5 group-hover:bg-ink",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
