import type { SolutionPage } from "./solutions.ts";

export function hasSlug(
  data: SolutionPage,
): data is SolutionPage & { slug: string | undefined } {
  return isKey(data, "slug");
}

/**
 * Check if an object has a key.
 *
 * @typeParam T - The type of the object.
 * @param obj - The object to check.
 * @param key - The key to check for.
 * @returns Whether the object has the key.
 */
export function isKey<const T extends object>(
  obj: T,
  key: PropertyKey,
): key is keyof T {
  return Object.hasOwn(obj, key);
}
