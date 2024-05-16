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
  return tw`py-1 hover:text-slate-700 data-[current]:font-bold dark:hover:text-slate-200 ${
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

function menuButtonStyles(active: boolean): string {
  return clsx(
    tw`flex h-8 flex-row whitespace-nowrap focus-visible:outline-none gap-0.5`,
    prettyFocus,
    makeBorderStyle(active),
    makeTextStyle(active),
  );
}

function ButtonIcon(): JSX.Element {
  return <IconChevronDown class="w-6 h-6" aria-hidden="true" />;
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
    return (
      <div class={menuButtonStyles(active)}>
        <div>{title}</div>
        <ButtonIcon />
      </div>
    );
  }

  return (
    <Popover>
      <PopoverButton className={menuButtonStyles(active)}>
        {title}
        <ButtonIcon />
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
          className="z-50 origin-top-right rounded-md shadow-2xl [--anchor-gap:8px]"
          anchor="bottom end"
        >
          <ul class="grid max-w-64 grid-flow-row gap-x-4 gap-y-0.5 divide-y divide-slate-200/95 bg-slate-50 px-4 py-1 ring-1 ring-slate-950/5 focus:outline-none sm:left-auto sm:right-0 dark:divide-slate-800 dark:bg-slate-950 dark:ring-slate-50/5">
            {[{ href: "", name: `About ${title}` } as const, ...items].map(
              (link): JSX.Element => (
                <li key={link} class="py-2 transition">
                  <a
                    href={`${url}${link.href}`}
                    class={clsx(
                      "block overflow-y-hidden text-balance rounded px-3 hover:bg-slate-950/5 hover:dark:bg-slate-50/5",
                      makeTextStyle(false),
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ),
            )}
          </ul>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
