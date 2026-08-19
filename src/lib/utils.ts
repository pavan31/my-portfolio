export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

/** "01", "02", … — used for every index numeral on the page. */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function splitGraphemes(input: string): string[] {
  return Array.from(input);
}
