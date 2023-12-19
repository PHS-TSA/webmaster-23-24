import { Popover } from "@headlessui/react";
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
    active ? "font-bold" : ""
  }`;
}

function makeBorderStyle(active: boolean): string {
  return `border-gray-500 dark:border-gray-400 hover:border-gray-700 dark:hover:border-gray-200 ${
    active ? "border-b-2" : ""
  }`;
}

const prettyFocus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 rounded-sm";

const HeaderMenu: FunctionalComponent<Props> = ({
  title,
  items,
  active,
  href,
}) =>
  items !== undefined
    ? (
      <Popover class="relative">
        <Popover.Button class={`h-8 ${prettyFocus} ${makeBorderStyle(active)}`}>
          <span class={`${makeTextStyle(active)} flex flex-row`}>
            {title} <IconChevronDown class="w-6 h-6" aria-hidden="true" />
          </span>
        </Popover.Button>

        <Popover.Panel>
          <div class="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none grid grid-flow-row">
            {items.map((link) => <a href={`${href}${link.url}`}>{link.name}
            </a>)}
          </div>
        </Popover.Panel>
      </Popover>
    )
    : (
      <a
        href={href}
        class={`h-8 ${makeTextStyle(active)} ${makeBorderStyle(active)}`}
      >
        {title}
      </a>
    );

export { HeaderMenu as default };
