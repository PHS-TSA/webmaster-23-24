import type { JSX } from "preact";
import { HeaderMenu } from "../islands/HeaderMenu.tsx";
import { siteName } from "../site.ts";
import { IconSolarPanel2 } from "../utils/icons.ts";
import { type Menu, menus } from "../utils/site-organization.ts";

export interface HeaderProps {
  readonly active: string;
}

export function Header({ active }: HeaderProps): JSX.Element {
  return (
    <header class="max-w-screen-xlg flex w-full flex-col gap-4 bg-white px-8 py-6 sm:flex-row dark:bg-black">
      <HomeLink />
      <ul class="flex flex-row flex-wrap items-center gap-6">
        {menus.map((menu: Menu) => {
          return (
            <li key={menu.title} class="flex h-8 items-end">
              <HeaderMenu {...menu} active={active.startsWith(menu.url)} />
            </li>
          );
        })}
      </ul>
    </header>
  );
}

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
