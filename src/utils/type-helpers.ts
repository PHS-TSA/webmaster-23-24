import type { SolutionPage } from "./solutions.ts";

export function hasSlug(
  data: SolutionPage,
): data is SolutionPage & { slug: string | undefined } {
  return Object.hasOwn(data, "slug");
}
