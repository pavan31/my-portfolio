import type { PlateMotif } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const W = 400;
const H = 500;

/**
 * Every motif is generated from fixed arithmetic — no randomness — so server
 * and client markup are byte-identical and hydration stays clean.
 */
function Motif({ motif }: { motif: PlateMotif }) {
  switch (motif) {
    case "arc":
      return (
        <g fill="none" strokeWidth={1}>
          {Array.from({ length: 14 }, (_, i) => {
            const r = 45 + i * 42;
            return (
              <path
                key={i}
                d={`M ${r} ${H} A ${r} ${r} 0 0 0 0 ${H - r}`}
                stroke={i % 5 === 2 ? "var(--color-accent)" : "currentColor"}
                opacity={i % 5 === 2 ? 0.55 : 1}
              />
            );
          })}
        </g>
      );

    case "grid":
      return (
        <g strokeWidth={1}>
          {Array.from({ length: 17 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 25}
              y1={0}
              x2={i * 25}
              y2={H}
              stroke="currentColor"
            />
          ))}
          {Array.from({ length: 21 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 25}
              x2={W}
              y2={i * 25}
              stroke="currentColor"
            />
          ))}
          {/* One quadrant lifted out of alignment — the deliberate flaw. */}
          <g transform="translate(212 268) rotate(4)">
            {Array.from({ length: 6 }, (_, i) => (
              <line
                key={`o${i}`}
                x1={0}
                y1={i * 25}
                x2={150}
                y2={i * 25}
                stroke="var(--color-accent)"
                opacity={0.5}
              />
            ))}
          </g>
        </g>
      );

    case "wave":
      return (
        <g fill="none" strokeWidth={1}>
          {Array.from({ length: 16 }, (_, row) => {
            const y = 30 + row * 29;
            const amp = 10 + (row % 5) * 5;
            const points = Array.from({ length: 41 }, (_, i) => {
              const x = i * 10;
              return `${x},${(y + Math.sin(i / 3 + row / 2) * amp).toFixed(2)}`;
            }).join(" ");
            return (
              <polyline
                key={row}
                points={points}
                stroke={row === 8 ? "var(--color-accent)" : "currentColor"}
                opacity={row === 8 ? 0.6 : 1}
              />
            );
          })}
        </g>
      );

    case "orbit":
      return (
        <g fill="none" strokeWidth={1}>
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse
              key={i}
              cx={W / 2}
              cy={H / 2}
              rx={40 + i * 22}
              ry={150 - i * 4}
              transform={`rotate(${i * 20} ${W / 2} ${H / 2})`}
              stroke={i === 4 ? "var(--color-accent)" : "currentColor"}
              opacity={i === 4 ? 0.55 : 1}
            />
          ))}
        </g>
      );

    case "strata":
      return (
        <g>
          {Array.from({ length: 22 }, (_, i) => {
            const y = i * 23;
            const h = 2 + ((i * 7) % 11);
            return (
              <rect
                key={i}
                x={0}
                y={y}
                width={W}
                height={h}
                fill={i % 6 === 3 ? "var(--color-accent)" : "currentColor"}
                opacity={i % 6 === 3 ? 0.4 : 0.85}
              />
            );
          })}
        </g>
      );

    case "pulse":
      return (
        <g fill="none" strokeWidth={1}>
          {Array.from({ length: 11 }, (_, row) => {
            const y = 40 + row * 42;
            const points = Array.from({ length: 33 }, (_, i) => {
              const x = i * 12.5;
              // A single beat interrupts an otherwise flat trace.
              const spike =
                i === 14 ? -26 : i === 15 ? 30 : i === 16 ? -12 : 0;
              return `${x},${y + spike}`;
            }).join(" ");
            return (
              <polyline
                key={row}
                points={points}
                stroke={row === 5 ? "var(--color-accent)" : "currentColor"}
                opacity={row === 5 ? 0.7 : 0.8}
              />
            );
          })}
        </g>
      );

    case "mesh":
    default:
      return (
        <g strokeWidth={1}>
          {Array.from({ length: 26 }, (_, i) => (
            <line
              key={`a${i}`}
              x1={-200 + i * 40}
              y1={0}
              x2={i * 40}
              y2={H}
              stroke="currentColor"
            />
          ))}
          {Array.from({ length: 26 }, (_, i) => (
            <line
              key={`b${i}`}
              x1={600 - i * 40}
              y1={0}
              x2={400 - i * 40}
              y2={H}
              stroke={i === 13 ? "var(--color-accent)" : "currentColor"}
              opacity={i === 13 ? 0.5 : 1}
            />
          ))}
        </g>
      );
  }
}

type ProjectPlateProps = {
  motif: PlateMotif;
  mark: string;
  className?: string;
};

/**
 * Stands in for a screenshot. Each project gets a distinct constructed motif
 * plus its initials, which reads as an identity rather than a placeholder.
 */
export function ProjectPlate({ motif, mark, className }: ProjectPlateProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden border border-line bg-surface",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        className="absolute inset-0 h-full w-full text-ink/[0.09] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      >
        <Motif motif={motif} />
      </svg>

      <span
        aria-hidden
        className="absolute bottom-[-0.14em] right-[0.06em] font-display text-[clamp(6rem,20vw,13rem)] font-extrabold leading-none tracking-tighter text-ink/[0.07] transition-colors duration-700 group-hover:text-accent/20"
      >
        {mark}
      </span>
    </div>
  );
}
