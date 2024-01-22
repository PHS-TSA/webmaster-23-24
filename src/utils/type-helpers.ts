import type { Menu, MenuWithItems } from "./site-organization.ts";

export function hasItems(menu: Menu): menu is MenuWithItems {
  return (menu.items?.length ?? 0) > 0;
}

export function isKey<const T extends object>(
  obj: T,
  key: PropertyKey,
): key is keyof T {
  return Object.hasOwn(obj, key);
}
