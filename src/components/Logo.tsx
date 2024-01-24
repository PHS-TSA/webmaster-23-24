import type { JSX } from "preact";
import { IconBolt } from "../utils/icons.ts";

/**
 * Render the logo.
 * Currently, this is just a lightning bolt.
 * Eventually, it will be our logo.
 *
 * @returns The rendered logo component.
 */
export function Logo(): JSX.Element {
  // <img
  //   class="my-6"
  //   src="/logo.svg"
  //   width="128"
  //   height="128"
  //   alt="the Fresh logo: a sliced lemon dripping with juice"
  // />
  return (
    <IconBolt
      class="size-52 text-yellow-200 dark:text-yellow-400"
      aria-hidden="true"
    />
  );
}
