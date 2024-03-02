import { Popover, Transition } from "@headlessui/react";
import type { JSX } from "preact";
import { IconChevronDown } from "../utils/icons.ts";
import type { BasicMenu, Menu, MenuItem } from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";

/**
 * Make the text style for the menu.
 *
 * @param active - If the menu is for the current page.
 * @returns The text style for the menu.
 */
function makeTextStyle(active: boolean): string {
  return tw`whitespace-nowrap py-1 hover:text-gray-700 data-[current]:font-bold dark:hover:text-gray-200 ${
    active
      ? tw`font-bold text-gray-700 dark:text-gray-200`
      : tw`text-gray-500 dark:text-gray-400`
  }`;
}

/**
 * Make the border style for the menu.
 *
 * @param active - If the menu is for the current page.
 * @returns The border style for the menu.
 */
function makeBorderStyle(active: boolean): string {
  return tw` hover:border-gray-700 data-[current]:border-b-2 dark:hover:border-gray-200 ${
    active
      ? tw`border-b-2 border-gray-700 dark:border-gray-200`
      : tw`border-gray-500 dark:border-gray-400`
  }`;
}

/**
 * The style for the menu when it is focused.
 */
const prettyFocus = tw`rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`;

/**
 * Properties for the {@link HeaderMenu} component.
 */
export interface WithActive {
  /**
   * If the menu is for the current page.
   */
  readonly active: boolean;
}

/**
 * Render a menu component.
 * It can either be a link to a page, or a dropdown menu.
 *
 * @param props - The component's properties.
 * @param props.title - The title of the menu.
 * @param props.url - The URL of the menu.
 * @param props.items - The items to render.
 * @param props.active - If the menu is for the current page.
 * @returns The rendered menu component.
 */
export function HeaderMenu(props: Menu & WithActive): JSX.Element {
  return <PopoverMenu {...props} />;
}

/**
 * Render a dropdown menu component.
 * It contains a header and a list of items.
 * The header is a link to the menu's URL and the items are links to the menu items' URLs.
 *
 * @param props - The component's properties.
 * @param props.title - The title of the menu.
 * @param props.url - The URL of the menu.
 * @param props.items - The items to render.
 * @param props.active - If the menu is for the current page.
 * @returns The rendered menu component.
 */
function PopoverMenu({
  title,
  url,
  items,
  active,
}: Menu & WithActive): JSX.Element {
  return (
    <Popover class="relative">
      <Popover.Button class={`h-8 ${prettyFocus} ${makeBorderStyle(active)}`}>
        <span class={`flex flex-row ${makeTextStyle(active)}`}>
          {title} <IconChevronDown class="w-6 h-6" aria-hidden="true" />
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
            <a href={`${url}`} class={`mx-4 my-0.5 ${makeTextStyle(false)}`}>
              About {title}
            </a>
            {items.map(
              (link: MenuItem): JSX.Element => (
                <a
                  href={`${url}${link.href}`}
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
  );
}

/**
 * Render a link menu component.
 * It contains a link to a page.
 *
 * @param props - The component's properties.
 * @param props.title - The title of the menu.
 * @param props.url - The URL of the menu.
 * @param props.active - If the menu is for the current page.
 * @returns The rendered menu component.
 */
export function LinkMenu({
  url,
  active,
  title,
}: BasicMenu & WithActive): JSX.Element {
  return (
    <a
      href={url}
      class={`h-8 ${makeTextStyle(active)} ${makeBorderStyle(active)}`}
    >
      {title}
    </a>
  );
}
