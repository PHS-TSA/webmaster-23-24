import type { FunctionalComponent } from "preact";
import IconSolarPanel2 from "tabler_icons_tsx/solar-panel-2.tsx";
import HeaderMenu from "../islands/HeaderMenu.tsx";
import { siteName } from "../site.ts";

interface Props {
  active: string; // TODO(lishaduck): https://deno.com/blog/fresh-1.5#easier-active-link-styling
}

const menus = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Going Green!",
    href: "/green/",
    items: [
      { name: "Getting Started", url: "getting-started" },
      { name: "Programs", url: "programs/" },
    ],
  },
  {
    name: "Monies",
    href: "/monies/",
    items: [
      { name: "Taxes", url: "guarantees-in-life/" },
      { name: "Pricing", url: "pricing/" },
    ],
  },
  {
    name: "About",
    href: "/about/",
  },
];
const Header: FunctionalComponent<Props> = ({ active }: Props) => (
  <header class="max-w-screen-xlg flex h-20 w-full flex-col gap-4 bg-white px-8 py-6 dark:bg-black sm:flex-row">
    <a class="flex flex-1 items-center" href="/">
      <IconSolarPanel2 aria-hidden="true" class="size-6 dark:text-white" />
      <div class="ml-1 text-2xl font-bold dark:text-white">{siteName}</div>
    </a>
    <ul class="flex flex-row flex-wrap items-center gap-6">
      {menus.map((menu) => (
        <li key={menu.name} class="flex h-8 items-end">
          <HeaderMenu
            title={menu.name}
            active={
              (active === "/" && menu.href === "/") ||
              (active.startsWith(menu.href) && menu.href !== "/")
            }
            href={menu.href}
            items={menu.items}
          />
        </li>
      ))}
    </ul>
  </header>
);

export { Header as default };
