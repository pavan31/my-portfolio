/** Preloader timings, shared so the hero can begin exactly as the veil lifts. */
export const PRELOADER_COUNT_SECONDS = 1.35;
export const PRELOADER_EXIT_SECONDS = 0.9;
export const PRELOADER_TOTAL_SECONDS =
  PRELOADER_COUNT_SECONDS + PRELOADER_EXIT_SECONDS;

/** Hero content starts while the veil is still clearing, not after. */
export const HERO_START_SECONDS = PRELOADER_COUNT_SECONDS + 0.25;
