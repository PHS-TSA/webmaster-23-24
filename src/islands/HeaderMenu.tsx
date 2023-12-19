import { Menu } from "@headlessui/react";
import type { FunctionalComponent } from "preact";
import IconChevronDown from "tabler_icons_tsx/chevron-down.tsx";

interface Props {
  title: string;
  active: boolean;
  items: MenuItem[] | undefined;
  href?: string;
}

interface MenuItem {
  url: string;
  name: string;
}

function makeTextStyle(active: boolean): string {
  return `text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 py-1 whitespace-nowrap ${
    active && "font-bold border-b-2"
  } border-gray-500 dark:border-gray-400 hover:border-gray-700 dark:hover:border-gray-200`;
}

const HeaderMenu: FunctionalComponent<Props> = (
  {
    title,
    items,
    active,
    href,
  },
) => {
  return items !== undefined
    ? (
      <Menu>
        <Menu.Button>
          <span class={`${makeTextStyle(active)} flex flex-row`}>
            {title} <IconChevronDown />
          </span>
        </Menu.Button>
        <div class="relative">
          <Menu.Items class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none flex flex-col">
            {items.map(({ name, url }) => (
              <Menu.Item>
                <a href={`${href}${url}`}>{name}</a>
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Menu>
    )
    : (
      <a href={href} class={makeTextStyle(active)}>
        {title}
      </a>
    );
};

export { HeaderMenu as default };
