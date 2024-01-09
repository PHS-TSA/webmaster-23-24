import IconBolt from "$tabler_icons/bolt.tsx";
import type { FunctionalComponent } from "preact";

const Logo: FunctionalComponent = () => (
  // <img
  //   class="my-6"
  //   src="/logo.svg"
  //   width="128"
  //   height="128"
  //   alt="the Fresh logo: a sliced lemon dripping with juice"
  // />
  <IconBolt
    class="size-52 text-yellow-200 dark:text-yellow-400"
    aria-hidden="true"
  />
);

export { Logo as default };
