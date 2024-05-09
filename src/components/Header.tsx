import type { JSX } from "preact";
import { HeaderMenu } from "../islands/HeaderMenu.tsx";
import { siteName } from "../site.ts";
import {
  type BasicMenu,
  type Menu,
  extraMenus,
  menus,
} from "../utils/site-organization.ts";
import { LinkMenu } from "./HeaderMenu.server.tsx";
import { Logo } from "./Logo.tsx";

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
    <header class="max-w-screen-xlg flex w-full flex-col flex-wrap gap-4 bg-slate-50 px-8 py-6 sm:flex-row dark:bg-slate-950">
      <HomeLink />
      <ul class="flex flex-shrink flex-row flex-wrap items-center gap-6">
        {menus.map((menu: Menu) => (
          <li key={menu.title} class="flex h-8 flex-row items-end">
            <HeaderMenu {...menu} active={active.startsWith(menu.url)} />
          </li>
        ))}
        {extraMenus.map(
          ({ title, url }: BasicMenu): JSX.Element => (
            <li key={url} class="flex h-8 flex-row items-end">
              <LinkMenu active={active === url} title={title} url={url} />
            </li>
          ),
        )}
      </ul>
    </header>
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
      class="flex flex-shrink-0 flex-grow flex-row items-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      href="/"
    >
      <Logo aria-hidden="true" class="size-10" />
      <div class="ml-1 text-2xl font-bold">{siteName}</div>
    </a>
  );
}
