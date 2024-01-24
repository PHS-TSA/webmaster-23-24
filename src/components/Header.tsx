import type { JSX } from "preact";
import { HeaderMenu } from "../islands/HeaderMenu.tsx";
import { siteName } from "../site.ts";
import { IconSolarPanel2 } from "../utils/icons.ts";
import { type Menu, menus } from "../utils/site-organization.ts";

/**
 * Properties for the {@link Header} component.
 */
export interface HeaderProps {
  /**
   * The URL of the page that is currently active.
   */
  readonly active: string;
}

/**
 * Render a header component, which is used as a header for pages.
 * @param props - The component's properties.
 * @param props.active - The URL of the page that is currently active.
 * @returns The rendered header component.
 */
export function Header({ active }: HeaderProps): JSX.Element {
  return (
    <header class="max-w-screen-xlg flex w-full flex-col gap-4 bg-white px-8 py-6 sm:flex-row dark:bg-black">
      <HomeLink />
      <ul class="flex flex-row flex-wrap items-center gap-6">
        {menus.map((menu: Menu) => (
          <HeaderLinkMenu menu={menu} active={active} />
        ))}
      </ul>
    </header>
  );
}

/**
 * Properties for the {@link HeaderLinkMenu} component.
 */
interface HeaderLinkMenuProps {
  /**
   * The menu to render.
   */
  readonly menu: Menu;
  /**
   * The URL of the page that is currently active.
   */
  readonly active: string;
}

/**
 * Render a menu component.
 * This is just a thin wrapper around {@link HeaderMenu} which adds a key for the VDOM.
 *
 * @param props - The component's properties.
 * @param props.menu - The menu to render.
 * @param props.active - The URL of the page that is currently active.
 * @returns The rendered menu component.
 */
function HeaderLinkMenu({ menu, active }: HeaderLinkMenuProps): JSX.Element {
  return (
    <li key={menu.title} class="flex h-8 items-end">
      <HeaderMenu {...menu} active={active.startsWith(menu.url)} />
    </li>
  );
}

/**
 * Render the link to the home page.
 *
 * @returns The rendered home link component.
 */
function HomeLink(): JSX.Element {
  return (
    <a
      class="flex flex-1 items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      href="/"
    >
      <IconSolarPanel2 aria-hidden="true" class="size-6" />
      <div class="ml-1 text-2xl font-bold">{siteName}</div>
    </a>
  );
}
