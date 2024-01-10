import IconChevronDown from "$tabler_icons/chevron-down.tsx";
import { Popover } from "@headlessui/react";
import type { VNode } from "preact";
import { tw } from "../utils/tailwind.ts";

export interface HeaderMenuProps {
  readonly title: string;
  readonly active: boolean;
  readonly items?: readonly MenuItem[];
  readonly href?: `/${string}/`;
}

export interface MenuItem {
  readonly url: `${string}/`;
  readonly name: string;
}

function makeTextStyle(active: boolean): string {
  return tw`whitespace-nowrap py-1 hover:text-gray-700 data-[current]:font-bold dark:hover:text-gray-200 ${
    active
      ? "font-bold text-gray-700 dark:text-gray-200"
      : "text-gray-500 dark:text-gray-400"
  }`;
}

function makeBorderStyle(active: boolean): string {
  return tw` hover:border-gray-700 data-[current]:border-b-2 dark:hover:border-gray-200 ${
    active
      ? "border-b-2 border-gray-700 dark:border-gray-200"
      : "border-gray-500 dark:border-gray-400"
  }`;
}

const prettyFocus = tw`rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`;

/**
 * Checks if the menu has items.
 *
 * @param menu The menu to check.
 * @returns True if the menu has items, false otherwise.
 *
 * @todo Replace with zod.
 */
export function isMenuWithItems(
  menu: unknown,
): menu is { readonly items: readonly MenuItem[] } {
  return isMenuWithItemsHelper(menu) && Array.isArray(menu.items);
}

function isMenuWithItemsHelper(
  menu: unknown,
): menu is { readonly items: unknown } {
  return isMenuWithItemsHelper2(menu) && Object.hasOwn(menu, "items");
}

function isMenuWithItemsHelper2(menu: unknown): menu is object {
  return typeof menu === "object" && menu !== null;
}

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
