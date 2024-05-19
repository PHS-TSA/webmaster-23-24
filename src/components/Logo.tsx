import { asset } from "$fresh/runtime.ts";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { logoAlt } from "../site.ts";

/**
 * Render our logo.
 *
 * @param props - The component's properties.
 * @returns The rendered logo component.
 */
export function Logo(props: JSX.HTMLAttributes<HTMLImageElement>): JSX.Element {
  return (
    <img
      class={clsx("my-6", props.class)}
      src={asset("/logo.svg")}
      width={500}
      height={500}
      alt={logoAlt}
    />
  );
}
