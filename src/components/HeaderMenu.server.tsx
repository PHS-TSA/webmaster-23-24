import type { JSX } from "preact";
import {
  type WithActive,
  makeBorderStyle,
  makeTextStyle,
  prettyFocus,
} from "../islands/HeaderMenu.tsx";
import type { BasicMenu } from "../utils/site-organization.ts";

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
      class={`h-8 ${prettyFocus} ${makeTextStyle(active)} ${makeBorderStyle(
        active,
      )}`}
    >
      {title}
    </a>
  );
}
