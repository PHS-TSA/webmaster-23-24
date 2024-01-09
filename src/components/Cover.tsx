import type { ComponentFactory, FunctionalComponent, VNode } from "preact";
import Logo from "./Logo.tsx";

interface Props {
  title: string;
  children: VNode;
  icon?: ComponentFactory;
}

const Cover: FunctionalComponent<Props> = ({
  title,
  children,
  icon: Icon = Logo,
}) => (
  <div class="mx-0 bg-green-500 px-4 py-8 dark:bg-green-700">
    <div class="mx-auto flex max-w-screen-md flex-col items-center justify-center">
      <Icon />
      <h1 class="text-4xl font-bold dark:text-white">{title}</h1>
      {children}
    </div>
  </div>
);

export { Cover as default };
