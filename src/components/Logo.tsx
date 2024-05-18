import { clsx } from "clsx";
import type { JSX } from "preact";
import { logoAlt } from "../site.ts";

/**
 * Render the logo.
 * Currently, this is just a lightning bolt.
 * Eventually, it will be our logo.
 *
 * @returns The rendered logo component.
 */
export function Logo(props: JSX.HTMLAttributes<HTMLImageElement>): JSX.Element {
  return (
    <img
      class={clsx("my-6", props.class)}
      src="/logo.svg"
      width={500}
      height={500}
      alt={logoAlt}
    />
  );
}
