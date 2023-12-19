import IconSolarPanel2 from "tabler_icons_tsx/solar-panel-2.tsx";
import type { FunctionalComponent } from "preact";
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
  <div class="bg-white dark:bg-black w-full max-w-screen-xlg py-6 px-8 flex flex-col sm:flex-row gap-4 h-20">
    <a class="flex items-center flex-1" href="/">
      <IconSolarPanel2
        aria-hidden="true"
        class="dark:text-white w-6 h-6"
      />
      <div class="text-2xl ml-1 font-bold dark:text-white">
        {siteName}
      </div>
    </a>
    <ul class="flex flex-row flex-wrap items-center gap-6">
      {menus.map((menu) => (
        <li key={menu.name} class="h-8 items-end flex">
          <HeaderMenu
            title={menu.name}
            active={(active === "/" && menu.href === "/") ||
              (active.startsWith(menu.href) && menu.href !== "/")}
            href={menu.href}
            items={menu.items}
          />
        </li>
      ))}
    </ul>
  </div>
);

export { Header as default };
