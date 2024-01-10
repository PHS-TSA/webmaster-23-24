import IconChevronDown from "$tabler_icons/chevron-down.tsx";
import { Popover } from "@headlessui/react";
import type { VNode } from "preact";
import { z } from "zod";
import { tw } from "../utils/tailwind.ts";

export type HeaderMenuProps = z.infer<typeof headerMenuPropsSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;

const menuItemSchema = z
  .object({
    url: z.custom<`${string}/`>(
      (val) => z.string().regex(/.*\/$/).safeParse(val).success,
    ),
    name: z.string(),
  })
  .readonly();

/**
 * `.readonly()` has to go last, and this allows customizing it before doing so.
 */
const headerMenuPropsSchemaInternal = z.object({
  title: z.string(),
  active: z.boolean(),
  items: menuItemSchema.array().readonly().optional(),
  href: z.custom<`${string}/`>(
    (val) =>
      z
        .string()
        .regex(/^\/.*\/$/)
        .safeParse(val).success,
  ),
});

export const headerMenuPropsSchema = headerMenuPropsSchemaInternal.readonly();

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
export const menuWithItemsSchema = headerMenuPropsSchemaInternal
  .required()
  .readonly();

export function HeaderMenu(props: HeaderMenuProps): VNode {
  try {
    const { items, title, active, href } = menuWithItemsSchema.parse(props);

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
              <a href={`${href}${link.url}`}>{link.name}</a>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    );
  } catch (_) {
    const { title, active, href } = headerMenuPropsSchema.parse(props);

    return (
      <a
        href={href}
        class={`h-8 ${makeTextStyle(active)} ${makeBorderStyle(active)}`}
      >
        {title}
      </a>
    );
  }
}
