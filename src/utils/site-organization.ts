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
    const solutionCategory = solution.data.category;

    // If the category doesn't exist yet, create it
    if (!categories.has(solutionCategory)) {
      categories.set(solutionCategory, {
        title: isKey(categoryMap, solutionCategory)
          ? categoryMap[solutionCategory]
          : solutionCategory,
        url: `/solutions/${solutionCategory}/`,
        items: [],
      });
    }

    // Add the solution to the category's items
    const category = categories.get(solutionCategory);
    if (category !== undefined) {
      categories.set(solutionCategory, {
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
  solar: "Solar",
  geothermal: "Geothermal",
  recycling: "Recycling",
  about: "About",
} as const;

/**
 * The generated menus.
 */
export const menus = generateMenus();
