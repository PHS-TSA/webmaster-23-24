import IconBolt from "tabler_icons_tsx/bolt.tsx";
import type { FunctionalComponent } from "preact";

const Logo: FunctionalComponent = () => {
  return (
    // <img
    //   class="my-6"
    //   src="/logo.svg"
    //   width="128"
    //   height="128"
    //   alt="the Fresh logo: a sliced lemon dripping with juice"
    // />
    <IconBolt size={200} class="text-yellow-200 dark:text-yellow-400" />
  );
};

export { Logo as default };
