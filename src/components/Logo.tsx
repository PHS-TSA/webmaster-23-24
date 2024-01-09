import IconBolt from "$tabler_icons/bolt.tsx";
import type { VNode } from "preact";

export function Logo(): VNode {
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
