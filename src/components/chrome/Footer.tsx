"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/lib/data/site";
import { scrollToTarget } from "@/lib/scroll";
import { useLocalTime } from "@/lib/hooks/useLocalTime";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Footer() {
  const time = useLocalTime(site.location.timeZone);
  const year = new Date().getFullYear();

  return (
    <footer className="gutter border-t border-line bg-void py-8">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="label text-muted">
          © {year} {site.name}
        </p>

        <p className="label text-muted">
          {site.location.city}
          <span className="px-2 text-line">/</span>
          <span className="tabular-nums text-ink">{time ?? "--:--:--"}</span>
        </p>

        <MagneticButton
          onClick={() => scrollToTarget(0)}
          ariaLabel="Back to top"
          className="label items-center text-muted transition-colors hover:text-accent"
        >
          Top
          <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
        </MagneticButton>
      </div>
    </footer>
  );
}
