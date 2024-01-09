import IconBrandDeno from "$tabler_icons/brand-deno.tsx";
import IconBrandReact from "$tabler_icons/brand-react.tsx";
import IconBrandTailwind from "$tabler_icons/brand-tailwind.tsx";
import IconLemon2 from "$tabler_icons/lemon-2.tsx";
import IconSolarPanel2 from "$tabler_icons/solar-panel-2.tsx";
import type { FunctionalComponent } from "preact";
import { siteName, slogan } from "../site.ts";

interface Props {
  class?: string | undefined;
}

const menus = [
  {
    title: "Going Green?",
    url: "/green/",
    children: [
      { name: "Getting Started", href: "getting-started/" },
      { name: "Programs", href: "programs/" },
    ],
  },
  {
    title: "Monies",
    url: "/monies/",
    children: [
      { name: "Taxes", href: "guarantees-in-life/" },
      { name: "Pricing", href: "pricing/" },
    ],
  },
];
const icons = [
  {
    icon: IconLemon2,
    href: "https://fresh.deno.dev/",
    name: "Fresh",
  },
  {
    icon: IconBrandDeno,
    href: "https://deno.com/",
    name: "Deno",
  },
  {
    icon: IconBrandReact,
    href: "https://preactjs.com/",
    name: "Preact",
  },
  {
    icon: IconBrandTailwind,
    href: "https://tailwindcss.com/",
    name: "Tailwind",
  },
];

const Footer: FunctionalComponent<Props> = ({ class: classes = "" }) => (
  <footer
    class={`max-w-screen-xlg grid w-full grid-flow-col grid-cols-footer-mobile grid-rows-footer-mobile gap-x-2 gap-y-16 bg-white p-8 text-sm dark:bg-black sm:grid-cols-footer-desktop sm:grid-rows-footer-desktop sm:gap-x-8 md:gap-16 ${classes}`}
  >
    <div class="col-start-1 col-end-3 row-start-1 row-end-2 sm:col-end-2">
      <div class="flex items-center gap-1">
        <IconSolarPanel2
          class="inline-block size-6 dark:text-white"
          aria-hidden="true"
        />
        <div class="text-2xl font-bold dark:text-white">{siteName}</div>
      </div>
      <div class="text-gray-500 dark:text-gray-400">{slogan}</div>
    </div>

    {menus.map((item) => (
      <div class={"row-start-2 mb-4 sm:row-start-auto"} key={item.title}>
        <span class="py-4 pr-4 font-bold dark:text-white">{item.title}</span>
        <ul class="mt-2">
          {item.children.map((child) => (
            <li class="mt-2" key={child.name}>
              <a
                class="py-4 pr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                href={`${item.url}${child.href}`}
              >
                {child.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}

    <div class="col-start-3 col-end-4 row-start-1 row-end-3 space-y-2 align-middle text-gray-500 dark:text-gray-400 sm:col-start-auto sm:col-end-auto sm:row-end-auto">
      <div class="m-1 text-xs">Made with</div>
      {icons.map((tool, index) => (
        <>
          <a
            href={tool.href}
            class="m-1 inline-block hover:text-black dark:hover:text-white"
            title={tool.name}
            key={tool.name}
          >
            <tool.icon aria-hidden="true" class="size-6" />
          </a>
          {index % 2 === 1 ? <br /> : <></>}
        </>
      ))}
    </div>
  </footer>
);

export { Footer as default };
