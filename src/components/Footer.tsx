import type { FunctionalComponent } from "preact";
import IconBrandDeno from "tabler_icons_tsx/brand-deno.tsx";
import IconBrandReact from "tabler_icons_tsx/brand-react.tsx";
import IconBrandTailwind from "tabler_icons_tsx/brand-tailwind.tsx";
import IconLemon2 from "tabler_icons_tsx/lemon-2.tsx";
import IconSolarPanel2 from "tabler_icons_tsx/solar-panel-2.tsx";
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
    Icon: IconLemon2,
    href: "https://fresh.deno.dev/",
    name: "Fresh",
  },
  {
    Icon: IconBrandDeno,
    href: "https://deno.com/",
    name: "Deno",
  },
  {
    Icon: IconBrandReact,
    href: "https://preactjs.com/",
    name: "Preact",
  },
  {
    Icon: IconBrandTailwind,
    href: "https://tailwindcss.com/",
    name: "Tailwind",
  },
];

const Footer: FunctionalComponent<Props> = ({ class: classes = "" }) => (
  <footer
    class={`bg-white dark:bg-black grid grid-flow-col grid-rows-footer-mobile grid-cols-footer-mobile sm:grid-rows-footer-desktop sm:grid-cols-footer-desktop w-full max-w-screen-xlg gap-x-2 gap-y-16 sm:gap-x-8 md:gap-16 p-8 text-sm ${classes}`}
  >
    <div class="row-start-1 row-end-2 col-start-1 col-end-3 sm:col-end-2">
      <div class="flex items-center gap-1">
        <IconSolarPanel2
          class="inline-block dark:text-white w-6 h-6"
          aria-hidden="true"
        />
        <div class="font-bold text-2xl dark:text-white">{siteName}</div>
      </div>
      <div class="text-gray-500 dark:text-gray-400">
        {slogan}
      </div>
    </div>

    {menus.map((item) => (
      <div
        class={"mb-4 row-start-2 sm:row-start-auto"}
        key={item.title}
      >
        <span class="font-bold dark:text-white py-4 pr-4">
          {item.title}
        </span>
        <ul class="mt-2">
          {item.children.map((child) => (
            <li class="mt-2" key={child.name}>
              <a
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 py-4 pr-4"
                href={`${item.url}${child.href}`}
              >
                {child.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}

    <div class="text-gray-500 dark:text-gray-400 space-y-2 align-middle col-start-3 col-end-4 sm:col-start-auto sm:col-end-auto row-start-1 row-end-3 sm:row-end-auto">
      <div class="text-xs m-1">
        Made with
      </div>
      {icons.map((tool, index) => (
        <>
          <a
            href={tool.href}
            class="inline-block hover:text-black dark:hover:text-white m-1"
            title={tool.name}
            key={tool.name}
          >
            <tool.Icon aria-hidden="true" class="h-6 w-6" />
          </a>
          {index % 2 === 1 ? <br /> : <></>}
        </>
      ))}
    </div>
  </footer>
);

export { Footer as default };
