import IconChevronDown from "$tabler_icons/chevron-down.tsx";
import { Popover } from "@headlessui/react";
import type { VNode } from "preact";
import {
  type MenuProps,
  menuPropsSchemaRequired,
} from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";
import { Transitions } from "./Headless.tsx";

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
          <span class={`flex flex-row ${makeTextStyle(active)}`}>
            {title} <IconChevronDown class="w-6 h-6" aria-hidden="true" />
          </span>
        </Popover.Button>

        <Transitions
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel class="max-w-full">
            <div class="absolute left-0 right-auto z-10 grid min-w-12 max-w-fit origin-top-right grid-flow-row divide-y divide-gray-200 rounded-md bg-gray-50 shadow-lg ring-1 ring-black/5 focus:outline-none sm:left-auto sm:right-0">
              {items.map((link) => (
                <a
                  href={`${url}${link.href}`}
                  key={link}
                  class={`mx-4 my-0.5 ${makeTextStyle(false)}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </Popover.Panel>
        </Transitions>
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
