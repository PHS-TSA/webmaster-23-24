import IconLemon2 from "tabler_icons_tsx/lemon-2.tsx";
import IconBrandDeno from "tabler_icons_tsx/brand-deno.tsx";
import IconSolarPanel2 from "tabler_icons_tsx/solar-panel-2.tsx";
import IconBrandTailwind from "tabler_icons_tsx/brand-tailwind.tsx";
import IconBrandReact from "tabler_icons_tsx/brand-react.tsx";

export default function Footer() {
  const menus = [
    {
      title: "Going Green?",
      url: "/green/",
      children: [
        { name: "Getting Started", href: "getting_started/" },
        { name: "Programs", href: "programs/" },
      ],
    },
    {
      title: "Monies",
      url: "/monies/",
      children: [
        { name: "Taxes", href: "/guarantees-in-life/" },
        { name: "Pricing", href: "pricing/" },
      ],
    },
  ];

  return (
    <div class="bg-white flex flex-col sm:flex-row w-full max-w-screen-xlg gap-8 md:gap-16 px-8 py-8 text-sm">
      <div class="flex-1">
        <div class="flex items-center gap-1">
          <IconSolarPanel2 class="inline-block" aria-hidden="true" />
          <div class="font-bold text-2xl">
            Why Switch
          </div>
        </div>
        <div class="text-gray-500">
          The Truth about Going Green!
        </div>
      </div>

      {menus.map((item) => (
        <div class="mb-4" key={item.title}>
          <div class="font-bold">{item.title}</div>
          <ul class="mt-2">
            {item.children.map((child) => (
              <li class="mt-2" key={child.name}>
                <a
                  class="text-gray-500 hover:text-gray-700"
                  href={item.url + child.href}
                >
                  {child.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div class="text-gray-500 space-y-2 align-middle">
        <div class="text-xs">
          Made with{" "}
        </div>
        <a
          href="https://fresh.deno.dev/"
          class="inline-block hover:text-black"
          aria-label="Fresh"
        >
          <IconLemon2 aria-hidden="true" />
        </a>
        <a
          href="https://deno.com/"
          class="inline-block hover:text-black"
          aria-label="Deno"
        >
          <IconBrandDeno aria-hidden="true" />
        </a>
        <br />
        <a
          href="https://preactjs.com/"
          class="inline-block hover:text-black"
          aria-label="Preact"
        >
          <IconBrandReact></IconBrandReact>
        </a>
        <a
          href="https://tailwindcss.com/"
          class="inline-block hover:text-black"
          aria-label="Tailwind"
        >
          <IconBrandTailwind />
        </a>
      </div>
    </div>
  );
}
