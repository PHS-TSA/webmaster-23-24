import type { Menu, MenuWithItems } from "./site-organization.ts";

/**
 * Check if a {@link Menu} has items.
 */
export function hasItems(menu: Menu): menu is MenuWithItems {
  return (menu.items?.length ?? 0) > 0;
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
