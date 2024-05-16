import type { JSX } from "preact";
import { HeaderGroup } from "../islands/HeaderGroup.tsx";
import { HeaderMenu } from "../islands/HeaderMenu.tsx";
import { siteName } from "../site.ts";
import {
  type BasicMenu,
  type Menu,
  extraMenus,
  menus,
} from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";
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

const itemStyles = tw`flex h-8 flex-row items-end`;

/**
 * Render a header component, which is used as a header for pages.
 * @param props - The component's properties.
 * @param props.active - The URL of the page that is currently active.
 * @returns The rendered header component.
 */
export function Header({ active }: HeaderProps): JSX.Element {
  return (
    <header class="max-w-screen-xlg sticky top-0 flex w-full flex-col flex-wrap gap-4 bg-slate-50/95 px-8 py-4 sm:flex-row dark:bg-slate-950/95 backdrop-blur-md shadow-2xl z-30">
      <div class="flex-shrink-0 flex-grow">
        <HomeLink />
      </div>
      <HeaderGroup>
        {menus.map((menu: Menu) => (
          <li key={menu.title} class={itemStyles}>
            <HeaderMenu {...menu} active={active.startsWith(menu.url)} />
          </li>
        ))}
        {extraMenus.map(
          ({ title, url }: BasicMenu): JSX.Element => (
            <li key={url} class={itemStyles}>
              <LinkMenu active={active === url} title={title} url={url} />
            </li>
          ),
        )}
      </HeaderGroup>
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
      class="flex max-w-fit flex-row items-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      href="/"
    >
      <Logo aria-hidden="true" class="size-10" />
      <div class="ml-1 text-2xl font-bold">{siteName}</div>
    </a>
  );
}
