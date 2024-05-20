import { clsx } from "clsx";
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
import { prettyFocus } from "./styles.ts";

/**
 * Properties for the {@linkcode Header} component.
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
    <header class="max-w-screen-xlg sticky top-0 z-30 w-full bg-slate-50/95 px-8 py-4 backdrop-blur-md dark:bg-slate-950/95 animate-scroll-shadow">
      <div class="flex flex-row flex-wrap lg:justify-between items-center justify-center pb-1">
        <div class="flex justify-center lg:justify-start w-full lg:w-auto">
          <HomeLink />
        </div>
        <HeaderGroup class="flex justify-center lg:justify-start w-full lg:w-auto">
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
      </div>
      {/\/(solutions\/.+\/.*|about\/|green\/)$/.test(active) && (
        <div
          class="progress relative -left-8 top-[1.125rem] z-40 -m-[0.125rem] h-1 w-screen rounded-se-sm bg-green-400/90 dark:bg-green-600/90"
          aria-hidden="true"
        />
      )}
    </header>
  );
}

interface HomeLinkProps {
  readonly class?: string;
}

/**
 * Render the link to the home page.
 *
 * @returns The rendered home link component.
 */
function HomeLink(props: HomeLinkProps): JSX.Element {
  return (
    <a
      class={clsx(
        "flex max-w-fit flex-row items-center rounded-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
        prettyFocus,
        props.class,
      )}
      href="/"
    >
      <Logo aria-hidden="true" class="size-10" />
      <div class="ml-1 text-2xl font-bold">{siteName}</div>
    </a>
  );
}
