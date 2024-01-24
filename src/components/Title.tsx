import type { JSX } from "preact";
import { makeTitle } from "../site.ts";

/**
 * Properties for the {@link Title} component.
 */
export interface TitleProps {
  /**
   * The title of the page.
   */
  readonly children: string;
}

/**
 * Render a title component, which stores the title of the page.
 *
 * @param props - The component's properties.
 * @param props.children - The title of the page.
 * @returns The rendered title component.
 */
export function Title({ children }: TitleProps): JSX.Element {
  return <title>{makeTitle(children)}</title>;
}
