import type { JSX } from "preact";
import { siteName, slogan } from "../site.ts";
import {
  type Icon,
  IconBrandDeno,
  IconBrandReact,
  IconBrandTailwind,
  IconLemon2,
  IconSolarPanel2,
} from "../utils/icons.ts";
import {
  type Menu,
  type MenuItem,
  type MenuWithItems,
  hasItems,
  menus,
} from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";

const icons = [
  {
    icon: IconLemon2,
    href: "https://fresh.deno.dev/",
    name: "Fresh",
  },
  {
    icon: IconBrandDeno,
    href: "https://deno.com/",
    name: "Deno",
  },
  {
    icon: IconBrandReact,
    href: "https://preactjs.com/",
    name: "Preact",
  },
  {
    icon: IconBrandTailwind,
    href: "https://tailwindcss.com/",
    name: "Tailwind",
  },
] as const satisfies Tool[];

interface Tool {
  readonly href: string;
  readonly name: string;
  readonly icon: Icon;
}

export interface FooterProps {
  readonly class?: string;
}

export function Footer({ class: classes = tw`` }: FooterProps): JSX.Element {
  return (
    <footer
      class={`max-w-screen-xlg grid w-full grid-flow-col grid-cols-footer-mobile grid-rows-footer-mobile gap-x-2 gap-y-16 bg-white p-8 text-sm dark:bg-black md:grid-cols-footer-desktop sm:grid-rows-footer-desktop sm:gap-x-8 md:gap-16 ${classes}`}
    >
      <div class="col-start-1 col-end-3 row-start-1 row-end-2 sm:col-end-2">
        <Who />
      </div>

      <div class="grid grid-cols-footer-links gap-x-2 gap-y-16 sm:gap-x-8 md:gap-16">
        {menus.map(
          (item: Menu): JSX.Element => (
            <section class="col-span-1">
              <RenderMenu {...item} key={item.title} />
            </section>
          ),
        )}
      </div>

      <div
        class="col-start-2 col-end-3 row-start-1 row-end-3 space-y-2 align-middle text-gray-500 dark:text-gray-400 sm:col-start-auto sm:col-end-auto sm:row-end-auto flex flex-col justify-center" /* justify-end */
      >
        <With />
      </div>
    </footer>
  );
}

function RenderMenu(props: Menu): JSX.Element {
  return (
    <>
      <RenderMenuHeader {...props} />
      {hasItems(props) && <RenderMenuItems {...props} />}
    </>
  );
}

/**
 * Renders the menu header.
 *
 * @param {Object} props - The configuration for this component.
 * @param {string} props.url - The URL that should be linked.
 * @param {string} props.title - The title of the link.
 * @returns {JSX.Element} The rendered menu header.
 */
// TODO(lishaduck): Fix css to have a subtle color-switch on hover and add a <Link> component to centralize said styling.
// TODO(lishaduck): Render these all in one section once we have multiple.
function RenderMenuHeader({ url, title }: Menu): JSX.Element {
  return (
    <a class="py-4 pr-4 font-bold dark:text-white" href={url}>
      {title}
    </a>
  );
}

function RenderMenuItems({ items, url }: MenuWithItems): JSX.Element {
  return (
    <ul class="mt-2">
      {items.map(
        (child: MenuItem): JSX.Element => (
          <li class="mt-2" key={child.name}>
            <a
              class="py-4 pr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              href={`${url}${child.href}`}
            >
              {child.name}
            </a>
          </li>
        ),
      )}
    </ul>
  );
}

function Who(): JSX.Element {
  return (
    <>
      <div class="flex items-center gap-1">
        <IconSolarPanel2
          class="inline-block min-w-6 size-6 dark:text-white"
          aria-hidden="true"
        />
        <div class="text-xl sm:text-2xl font-bold dark:text-white">
          {siteName}
        </div>
      </div>
      <div class="text-gray-500 dark:text-gray-400 text-balance">{slogan}</div>
    </>
  );
}

function With(): JSX.Element {
  return (
    <>
      <div class="text-xs max-w-fit text-end">Made with</div>
      <div class="grid grid-cols-auto-2 justify-end max-w-fit">
        {icons.map(
          (tool: Tool): JSX.Element => (
            <a
              href={tool.href}
              class="m-1 size-6 inline-block hover:text-black dark:hover:text-white max-w-fit"
              title={tool.name}
              key={tool.name}
            >
              <tool.icon aria-hidden="true" class="size-6" />
            </a>
          ),
        )}
      </div>
    </>
  );
}
