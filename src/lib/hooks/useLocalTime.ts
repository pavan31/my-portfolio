"use client";

import { useEffect, useState } from "react";

/**
 * Live clock for a fixed zone. Returns null until mounted so server and
 * client markup agree — rendering a time during SSR guarantees a mismatch.
 */
export function useLocalTime(timeZone: string): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
