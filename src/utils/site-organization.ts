import { solutions } from "./categories.gen.ts";
import { isKey } from "./type-helpers.ts";

/**
 * A menu.
 */
export interface Menu {
  /**
   * The title of the menu.
   */
  readonly title: string;

  /**
   * The URL that the menu links to.
   */
  readonly url: `/${string}/`;

  /**
   * The sub-items of the menu.
   */
  readonly items?: readonly MenuItem[];
}

/**
 * A menu item.
 */
export interface MenuItem {
  /**
   * The URL that the menu item links to.
   */
  readonly href: `${string}/`;

  /**
   * The name of the menu item.
   */
  readonly name: string;
}

/**
 * A menu with items.
 */
export interface MenuWithItems extends Menu {
  /**
   * The items of the menu are destined to be non-empty.
   */
  readonly items: readonly [MenuItem, ...MenuItem[]];
}

/**
 * The additional menus that are not generated with the {@link solutions}.
 */
const extraMenus = [
  {
    title: "About",
    url: "/about/",
  },
] as const satisfies Menu[];

/**
 * Convert the {@link solutions} into to {@link Menu | menus} based on the category.
 * Should also append the {@link extraMenus} to the end to add the `/about/` page and such.
 *
 * @returns The generated menus.
 */

function generateMenus(): Menu[] {
  const categories = new Map<string, Menu>();

  for (const solution of solutions) {
    // If the category doesn't exist yet, create it
    if (!categories.has(solution.data.category)) {
      categories.set(solution.data.category, {
        title: isKey(categoryMap, solution.data.category)
          ? categoryMap[solution.data.category]
          : solution.data.category,
        url: "/solutions/",
        items: [],
      });
    }

    // Add the solution to the category's items
    const category = categories.get(solution.data.category);
    if (category !== undefined) {
      categories.set(solution.data.category, {
        ...category,
        items: [
          ...(category.items ?? []),
          {
            name: solution.data.title,
            href: `${solution.slug}/`,
          },
        ],
      });
    }
  }

  for (const menu of extraMenus) {
    categories.set(menu.title, menu);
  }

  return Array.from(categories.values());
}

/**
 * A mapping of categories to their titles.
 */
const categoryMap = {
  green: "Going Green?",
  monies: "Monies",
  about: "About",
  solar: "Solar",
} as const;

/**
 * The generated menus.
 */
export const menus = generateMenus();
