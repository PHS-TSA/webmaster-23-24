import type { Menu, MenuWithItems } from "./site-organization.ts";

export function hasItems(menu: Menu): menu is MenuWithItems {
  return (menu.items?.length ?? 0) > 0;
}
