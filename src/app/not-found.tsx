import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

/** Exported as 404.html, which GitHub Pages serves for unmatched paths. */
export default function NotFound() {
  return (
    <section className="gutter flex min-h-svh flex-col justify-between py-24">
      <p className="label text-muted">
        <span className="text-accent">404</span>
        <span className="px-2 text-line">/</span>
        No such page
      </p>

      <div>
        <h1 className="font-display text-mega font-extrabold uppercase text-dim">
          Lost
        </h1>
        <p className="mt-6 max-w-[42ch] text-lead text-ink/60">
          That address doesn&apos;t resolve to anything here. The work, the
          stack and the way to reach me are all one page away.
        </p>
      </div>

      <Link
        href="/"
        className="label inline-flex w-fit items-center gap-2 border border-line px-6 py-4 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
        data-cursor="link"
      >
        Return home
      </Link>
    </section>
  );
}
