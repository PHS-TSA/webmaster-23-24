import type { FunctionalComponent } from "preact";
import IconBolt from "tabler_icons_tsx/bolt.tsx";

const Logo: FunctionalComponent = () => (
  // <img
  //   class="my-6"
  //   src="/logo.svg"
  //   width="128"
  //   height="128"
  //   alt="the Fresh logo: a sliced lemon dripping with juice"
  // />
  <IconBolt
    class="text-yellow-200 dark:text-yellow-400 h-52 w-52"
    aria-hidden="true"
  />
);

export { Logo as default };
