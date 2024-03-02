import { solutions } from "./categories.gen.ts";
import { capitalize } from "./strings.ts";
import { hasSlug } from "./type-helpers.ts";

/**
 * A menu.
 */
export interface Menu extends BasicMenu {
  /**
   * The sub-items of the menu.
   */
  readonly items: readonly MenuItem[];
}

export interface BasicMenu {
  /**
   * The title of the menu.
   */
  readonly title: string;

  /**
   * The URL that the menu links to.
   */
  readonly url: `/${string}/`;
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
 * Convert the {@link solutions} into to {@link Menu | menus} based on the category.
 *
 * @returns The generated menus.
 */
function generateMenus(): Menu[] {
  const categories = new Map<string, Menu>();

  for (const solution of solutions) {
    const { category: solutionCategory } = solution.data;

    // If the category doesn't exist yet, create it
    if (!categories.has(solutionCategory)) {
      categories.set(solutionCategory, {
        title: capitalize(solutionCategory),
        url: `/solutions/${solutionCategory}/`,
        items: [],
      });
    }

    // Add the solution to the category's items
    const category = categories.get(solutionCategory);
    if (category !== undefined && hasSlug(solution)) {
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

  return Array.from(categories.values());
}

/**
 * The generated menus.
 */
export const menus = generateMenus();

/**
 * The additional menus that are not generated with the {@link solutions}.
 */
export const extraMenus = [
  {
    title: "About",
    url: "/about/",
  },
] as const satisfies BasicMenu[];
