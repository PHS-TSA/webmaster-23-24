import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { IconChevronDown } from "../utils/icons.ts";
import type { Menu } from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";

/**
 * Make the text style for the menu.
 *
 * @param active - If the menu is for the current page.
 * @returns The text style for the menu.
 */
export function makeTextStyle(active: boolean): string {
  return tw`whitespace-nowrap py-1 hover:text-slate-700 aria-[current]:font-bold dark:hover:text-slate-200 ${
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
  return tw` hover:border-slate-700 aria-[current]:border-b-2 dark:hover:border-slate-200 ${
    active
      ? tw`border-b-2 border-slate-700 dark:border-slate-200`
      : tw`border-slate-500 dark:border-slate-400`
  }`;
}

/**
 * The style for the menu when it is focused.
 */
export const prettyFocus = tw`rounded-sm data-[focus]:outline-none focus-visible:ring-2 focus-visible:ring-slate-50/75`;

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
  if (!IS_BROWSER) {
    return <></>;
  }

  return (
    <Popover>
      <PopoverButton
        className={clsx(
          tw`flex h-8 flex-row`,
          prettyFocus,
          makeBorderStyle(active),
          makeTextStyle(active),
        )}
      >
        {title}
        <IconChevronDown class="w-6 h-6" aria-hidden="true" />
      </PopoverButton>
      <Transition
        enter={tw`transition ease-out duration-200`}
        enterFrom={tw`opacity-0 translate-y-1`}
        enterTo={tw`opacity-100 translate-y-0`}
        leave={tw`transition ease-in duration-150`}
        leaveFrom={tw`opacity-100 translate-y-0`}
        leaveTo={tw`opacity-0 translate-y-1`}
      >
        <PopoverPanel
          className="origin-top-right [--anchor-gap:var(--spacing-5)]"
          anchor="bottom end"
        >
          <div class="grid max-w-64  grid-flow-row gap-x-4 gap-y-0.5 divide-y divide-slate-200/5 rounded-lg drop-shadow-lg bg-slate-50 px-4 py-1 text-slate-500 ring-1 ring-slate-950/5 dark:divide-slate-800 dark:bg-slate-950 dark:ring-slate-50/5">
            {[{ href: "", name: `About ${title}` } as const, ...items].map(
              (link): JSX.Element => (
                <div key={link} class="py-2 transition">
                  <a
                    href={`${url}${link.href}`}
                    class={`px-3 block whitespace-break-spaces text-balance rounded overflow-y-hidden hover:bg-slate-50/5  ${makeTextStyle(
                      false,
                    )}`}
                  >
                    {link.name}
                  </a>
                </div>
              ),
            )}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
