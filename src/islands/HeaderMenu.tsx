import IconChevronDown from "$tabler_icons/chevron-down.tsx";
import { Popover } from "@headlessui/react";
import type { VNode } from "preact";

export interface HeaderMenuProps {
  title: string;
  active: boolean;
  items: MenuItem[] | undefined;
  href?: string;
}

export interface MenuItem {
  url: string;
  name: string;
}

function makeTextStyle(active: boolean): string {
  return `text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 py-1 whitespace-nowrap ${
    active ? "font-bold" : ""
  }`;
}

function makeBorderStyle(active: boolean): string {
  return `border-gray-500 hover:border-gray-700 dark:border-gray-400 dark:hover:border-gray-200 ${
    active ? "border-b-2" : ""
  }`;
}

const prettyFocus =
  "rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75";

export function HeaderMenu({
  title,
  items,
  active,
  href,
}: HeaderMenuProps): VNode {
  return items !== undefined ? (
    <Popover class="relative">
      <Popover.Button class={`h-8 ${prettyFocus} ${makeBorderStyle(active)}`}>
        <span class={`${makeTextStyle(active)} flex flex-row`}>
          {title} <IconChevronDown class="w-6 h-6" aria-hidden="true" />
        </span>
      </Popover.Button>

      <Popover.Panel>
        <div class="absolute right-0 z-10 mt-2 grid w-56 origin-top-right grid-flow-row divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {items.map((link) => (
            <a href={`${href}${link.url}`}>{link.name}</a>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  ) : (
    <a
      href={href}
      class={`h-8 ${makeTextStyle(active)} ${makeBorderStyle(active)}`}
    >
      {title}
    </a>
  );
}
