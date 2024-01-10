import type { ComponentFactory, RenderableProps, VNode } from "preact";
import { Logo } from "./Logo.tsx";

export interface CoverProps {
  readonly title: string;
  readonly icon?: ComponentFactory;
}

export function Cover({
  title,
  children,
  icon: Icon = Logo,
}: RenderableProps<CoverProps>): VNode {
  return (
    <div class="mx-0 bg-green-500 px-4 py-8 dark:bg-green-700">
      <div class="mx-auto flex max-w-screen-md flex-col items-center justify-center">
        <Icon />
        <h1 class="text-4xl font-bold dark:text-white">{title}</h1>
        {children}
      </div>
    </div>
  );
}
