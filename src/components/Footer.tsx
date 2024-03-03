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
  type BasicMenu,
  type Menu,
  type MenuItem,
  menus,
} from "../utils/site-organization.ts";
import { extraMenus } from "../utils/site-organization.ts";
import { tw } from "../utils/tailwind.ts";

/**
 * The icons of some of the tools that were used to build the site.
 */
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

/**
 * A tool that was used to build the site.
 */
interface Tool {
  /**
   * The URL to the tool's website.
   */
  readonly href: string;

  /**
   * The name of the tool.
   */
  readonly name: string;

  /**
   * The icon of the tool.
   */
  readonly icon: Icon;
}

/**
 * Properties for the {@link Footer} component.
 */
export type FooterProps = JSX.HTMLAttributes<HTMLElement>;

/**
 * Render a footer component, which is used as a footer for pages.
 * It contains an about section, a categories section, and a "made with" section.
 * The about section contains the site name and slogan.
 * The categories section contains links to the various pages of the site.
 * The "made with" section contains links to the tools that were used to build the site.
 *
 * @param props - The component's properties.
 * @param props.class - The CSS classes to apply to this component.
 * @returns The rendered footer component.
 */
export function Footer(props: FooterProps): JSX.Element {
  return (
    <footer
      {...props}
      class={tw`max-w-screen-xlg grid w-full grid-flow-col grid-cols-footer-mobile grid-rows-footer-mobile gap-x-2 gap-y-16 bg-white p-8 text-sm sm:grid-rows-footer-desktop sm:gap-x-8 md:grid-cols-footer-desktop md:gap-16 dark:bg-black ${props.class}`}
    >
      <div class="col-start-1 col-end-2 row-start-1 row-end-2">
        <Who />
      </div>

      <div class="grid col-start-1 col-end-3 grid-flow-row gap-x-8 gap-y-16 text-pretty sm:gap-x-8 md:gap-16 grid-cols-2 lg:grid-cols-4 md:col-start-2 md:col-end-3">
        {menus.map(
          (item: Menu): JSX.Element => (
            <section class="col-span-1 max-w-52">
              <RenderCategory {...item} key={item.title} />
            </section>
          ),
        )}
        <section class="col-span-1 max-w-52">
          <RenderAbouts />
        </section>
      </div>

      <div class="col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col justify-start space-y-2 align-middle text-gray-500 sm:col-start-auto sm:col-end-auto sm:row-end-auto dark:text-gray-400 md:col-start-3 md:col-end-4">
        <With />
      </div>
    </footer>
  );
}

/**
 * Render a category component.
 * It contains a header and an optional list of items.
 * The header is a link to the category's URL and the items are links to the category items' URLs.
 *
 * @param props - The component's properties.
 * @param props.title - The title of the category.
 * @param props.url - The URL to the category's index page.
 * @param props.items - The items to render.
 * @returns The rendered category component.
 */
function RenderCategory(props: Menu): JSX.Element {
  return (
    <>
      <RenderCategoryHeader {...props} />
      <RenderCategoryItems {...props} />
    </>
  );
}

/**
 * Render a category header.
 *
 * @param props - The configuration for this component.
 * @param props.url - The URL that should be linked.
 * @param props.title - The title of the link.
 * @returns The rendered category header.
 */
// TODO(lishaduck): Add a <Link> component to centralize said styling.
// TODO(lishaduck): Render these all in one section once we have multiple.
function RenderCategoryHeader({ url, title }: BasicMenu): JSX.Element {
  return (
    <a
      class="py-4 pr-4 font-bold text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
      href={url}
    >
      {title}
    </a>
  );
}

/**
 * Render the items in te category.
 * The items are links to the category items' URLs.
 *
 * @param props - The component's properties.
 * @param props.items - The items to render.
 * @param props.url - The URL to prepend to the items' URLs.
 * @returns The rendered category's items.
 */
function RenderCategoryItems({ items, url }: Menu): JSX.Element {
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

function RenderAbouts(): JSX.Element {
  return (
    <>
      {extraMenus.map(
        (menu: BasicMenu): JSX.Element => (
          <RenderCategoryHeader {...menu} />
        ),
      )}
    </>
  );
}

/**
 * Render the "who" section of the footer.
 * It contains the site name and slogan.
 *
 * @returns The rendered "who" section of the footer.
 */
function Who(): JSX.Element {
  return (
    <>
      <div class="flex items-center gap-1">
        <IconSolarPanel2
          class="inline-block size-6 min-w-6"
          aria-hidden="true"
        />
        <div class="text-xl font-bold sm:text-2xl">{siteName}</div>
      </div>
      <div class="text-balance text-gray-500 dark:text-gray-400">{slogan}</div>
    </>
  );
}

/**
 * Render the "with" section of the footer.
 * It contains linked icons of the tools that were used to build the site.
 *
 * @returns The rendered "with" section of the footer.
 */
function With(): JSX.Element {
  return (
    <>
      <span class="max-w-fit text-end text-xs">Made with</span>
      <div class="grid max-w-fit grid-cols-auto-2 justify-end gap-2">
        {icons.map(
          (tool: Tool): JSX.Element => (
            <a
              href={tool.href}
              class="inline-block size-6 max-w-fit hover:text-black dark:hover:text-white"
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
