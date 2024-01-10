import IconChevronDown from "$tabler_icons/chevron-down.tsx";
import { Popover } from "@headlessui/react";
import type { VNode } from "preact";
import {
  type MenuProps,
  menuPropsSchemaRequired,
} from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";

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

export function HeaderMenu(props: MenuProps): VNode {
  try {
    const { items, title, active, url } = menuPropsSchemaRequired.parse(props);

    return (
      <Popover class="relative">
        <Popover.Button class={`h-8 ${prettyFocus} ${makeBorderStyle(active)}`}>
          <span class={`${makeTextStyle(active)} flex flex-row`}>
            {title} <IconChevronDown class="w-6 h-6" aria-hidden="true" />
          </span>
        </Popover.Button>

        <Popover.Panel>
          <div class="absolute right-0 z-10 mt-2 grid w-56 origin-top-right grid-flow-row divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {items.map((link) => (
              <a href={`${url}${link.href}`} key={link}>
                {link.name}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    );
  } catch (_) {
    return (
      <a
        href={props.url}
        class={`h-8 ${makeTextStyle(props.active)} ${makeBorderStyle(
          props.active,
        )}`}
      >
        {props.title}
      </a>
    );
  }
}
