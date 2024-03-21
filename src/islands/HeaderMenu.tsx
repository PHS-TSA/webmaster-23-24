import { Popover, Transition } from "@headlessui/react";
import type { JSX } from "preact";
import { IconChevronDown } from "../utils/icons.ts";
import type { Menu, MenuItem } from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";

/**
 * Make the text style for the menu.
 *
 * @param active - If the menu is for the current page.
 * @returns The text style for the menu.
 */
export function makeTextStyle(active: boolean): string {
  return tw`whitespace-nowrap py-1 hover:text-slate-700 data-[current]:font-bold dark:hover:text-slate-200 ${
    active
      ? tw`font-bold text-slate-700 dark:text-slate-200`
      : tw`text-slate-500 dark:text-slate-400`
  }`;
}

/**
 * Make the border style for the menu.
 *
 * @param active - If the menu is for the current page.
 * @returns The border style for the menu.
 */
export function makeBorderStyle(active: boolean): string {
  return tw` hover:border-slate-700 data-[current]:border-b-2 dark:hover:border-slate-200 ${
    active
      ? tw`border-b-2 border-slate-700 dark:border-slate-200`
      : tw`border-slate-500 dark:border-slate-400`
  }`;
}

/**
 * The style for the menu when it is focused.
 */
export const prettyFocus = tw`rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-50/75`;

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
        enter={tw`transition ease-out duration-200`}
        enterFrom={tw`opacity-0 translate-y-1`}
        enterTo={tw`opacity-100 translate-y-0`}
        leave={tw`transition ease-in duration-150`}
        leaveFrom={tw`opacity-100 translate-y-0`}
        leaveTo={tw`opacity-0 translate-y-1`}
      >
        <Popover.Panel class="max-w-full">
          <div class="absolute left-0 right-auto top-1 z-10 grid max-w-fit origin-top-right grid-flow-row gap-x-4 gap-y-0.5 divide-y divide-slate-200 rounded-md bg-slate-50 px-4 py-1 shadow-lg ring-1 ring-slate-950/5 focus:outline-none sm:left-auto sm:right-0 dark:divide-slate-800 dark:bg-slate-950 dark:ring-slate-50/5">
            <a href={`${url}`} class={makeTextStyle(false)}>
              About {title}
            </a>
            {items.map(
              (link: MenuItem): JSX.Element => (
                <a
                  href={`${url}${link.href}`}
                  key={link}
                  class={makeTextStyle(false)}
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
