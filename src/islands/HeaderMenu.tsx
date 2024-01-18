import { Popover, Transition } from "@headlessui/react";
import type { JSX } from "preact";
import { IconChevronDown } from "../utils/icons.ts";
import type { Menu, MenuItem } from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";
import { hasItems } from "../utils/type-helpers.ts";

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

export interface HeaderMenuProps extends Menu {
  active: boolean;
}

export function HeaderMenu(props: HeaderMenuProps): JSX.Element {
  return hasItems(props) ? (
    <Popover class="relative">
      <Popover.Button
        class={`h-8 ${prettyFocus} ${makeBorderStyle(props.active)}`}
      >
        <span class={`flex flex-row ${makeTextStyle(props.active)}`}>
          {props.title} <IconChevronDown class="w-6 h-6" aria-hidden="true" />
        </span>
      </Popover.Button>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel class="max-w-full">
          <div class="absolute left-0 right-auto top-1 z-10 grid max-w-fit origin-top-right grid-flow-row divide-y divide-gray-200 dark:divide-gray-800 rounded-md bg-gray-50 dark:bg-gray-950 shadow-lg ring-1 ring-black/5 dark:ring-white/5 focus:outline-none sm:left-auto sm:right-0">
            {props.items.map(
              (link: MenuItem): JSX.Element => (
                <a
                  href={`${props.url}${link.href}`}
                  key={link}
                  class={`mx-4 my-0.5 ${makeTextStyle(false)}`}
                >
                  {link.name}
                </a>
              ),
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  ) : (
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
