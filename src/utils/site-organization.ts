import { solutions } from "./categories.gen.ts";
import { isKey } from "./type-helpers.ts";

export interface Menu {
  readonly title: string;
  readonly url: `/${string}/`;
  readonly items?: readonly MenuItem[];
}

export interface MenuItem {
  readonly href: `${string}/`;
  readonly name: string;
}

export interface MenuWithItems extends Menu {
  readonly items: readonly [MenuItem, ...MenuItem[]];
}

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

const categoryMap = {
  green: "Going Green?",
  monies: "Monies",
  about: "About",
  solar: "Solar",
} as const;

export const menus = generateMenus();
