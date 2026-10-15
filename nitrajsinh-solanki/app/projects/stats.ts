/**
 * Lightweight project counts for client components.
 *
 * Keep these values in sync with PROJECTS in data.ts. This small module keeps
 * the homepage bundle from importing full descriptions, feature lists and
 * case-study copy just to display a few aggregate counts.
 */
export const STATS = {
  total: 11,
  hackathon: 7,
  client: 3,
  personal: 1,
  live: 4,
} as const;
