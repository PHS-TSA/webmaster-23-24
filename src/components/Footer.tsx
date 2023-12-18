import IconLemon2 from "tabler_icons_tsx/lemon-2.tsx";
import IconBrandDeno from "tabler_icons_tsx/brand-deno.tsx";
import IconSolarPanel2 from "tabler_icons_tsx/solar-panel-2.tsx";
import IconBrandTailwind from "tabler_icons_tsx/brand-tailwind.tsx";
import IconBrandReact from "tabler_icons_tsx/brand-react.tsx";
import type { FunctionalComponent } from "preact";

const Footer: FunctionalComponent = () => {
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

  return (
    <div class="bg-white dark:bg-black flex flex-col sm:flex-row w-full max-w-screen-xlg gap-8 md:gap-16 px-8 py-8 text-sm">
      <div class="flex-1">
        <div class="flex items-center gap-1">
          <IconSolarPanel2
            class="inline-block dark:text-white"
            aria-hidden="true"
          />
          <div class="font-bold text-2xl dark:text-white">Why Switch</div>
        </div>
        <div class="text-gray-500 dark:text-gray-400">
          The Truth about Going Green!
        </div>
      </div>

      {menus.map((item) => (
        <div class="mb-4" key={item.title}>
          <a class="font-bold dark:text-white" href={item.url}>{item.title}</a>
          <ul class="mt-2">
            {item.children.map((child) => (
              <li class="mt-2" key={child.name}>
                <a
                  class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  href={item.url + child.href}
                >
                  {child.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div class="text-gray-500 dark:text-gray-400 space-y-2 align-middle">
        <div class="text-xs">
          Made with
        </div>
        {icons.map(({ Icon, href, name }, index) => {
          return (
            <>
              <a
                href={href}
                class="inline-block hover:text-black dark:hover:text-white"
                title={name}
              >
                <Icon aria-hidden="true" />
              </a>
              {index % 2 === 1 ? <br /> : <></>}
            </>
          );
        })}
      </div>
    </div>
  );
};

export { Footer as default };
