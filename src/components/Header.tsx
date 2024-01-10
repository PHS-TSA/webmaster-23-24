import IconSolarPanel2 from "$tabler_icons/solar-panel-2.tsx";
import type { VNode } from "preact";
import { HeaderMenu, headerMenuPropsSchema } from "../islands/HeaderMenu.tsx";
import { siteName } from "../site.ts";

export interface HeaderProps {
  readonly active: string;
}

const menus = [
  {
    name: "Going Green!",
    href: "/green/",
    items: [
      { name: "Getting Started", url: "getting-started/" },
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
] as const;

export function Header({ active }: HeaderProps): VNode {
  return (
    <header class="max-w-screen-xlg flex h-20 w-full flex-col gap-4 bg-white px-8 py-6 sm:flex-row dark:bg-black">
      <HomeLink />
      <ul class="flex flex-row flex-wrap items-center gap-6">
        {menus.map((menu) => {
          const data = headerMenuPropsSchema
            .required()
            .pick({ items: true })
            .readonly()
            .safeParse(menu);

          return (
            <li key={menu.name} class="flex h-8 items-end">
              <HeaderMenu
                name={menu.name}
                active={active === menu.href || active.startsWith(menu.href)}
                href={menu.href}
                items={data.success ? data?.data.items : undefined}
              />
            </li>
          );
        })}
      </ul>
    </header>
  );
}

function HomeLink(): VNode {
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
