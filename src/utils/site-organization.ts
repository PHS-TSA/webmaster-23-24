// TODO(lishaduck): generate from  `solutions`.
export const menus = [
  {
    title: "Going Green?",
    url: "/green/",
    items: [
      { name: "Getting Started", href: "getting-started/" },
      { name: "Programs", href: "programs/" },
    ],
  },
  {
    title: "Monies",
    url: "/monies/",
    items: [
      { name: "Taxes", href: "guarantees-in-life/" },
      { name: "Pricing", href: "pricing/" },
    ],
  },
  {
    title: "About",
    url: "/about/",
  },
] as const satisfies Menu[];

export interface Menu {
  readonly title: string;
  readonly url: `${string}/`;
  readonly items?: readonly MenuItem[];
}

export interface MenuItem {
  readonly href: `${string}/`;
  readonly name: string;
}

export interface MenuWithItems extends Menu {
  readonly items: readonly [MenuItem, ...(readonly MenuItem[])];
}
