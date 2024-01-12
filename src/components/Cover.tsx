import type { JSX, RenderableProps } from "preact";
import { Logo } from "./Logo.tsx";

export interface CoverProps {
  readonly title: string;
  readonly icon?: JSX.Element;
}

export function Cover({
  title,
  children,
  icon = <Logo />,
}: RenderableProps<CoverProps>): JSX.Element {
  return (
    <div class="mx-0 bg-green-500 px-4 py-8 dark:bg-green-700">
      <div class="mx-auto flex max-w-screen-md flex-col items-center justify-center">
        {icon}
        <h1 class="text-4xl font-bold dark:text-white">{title}</h1>
        {children}
      </div>
    </div>
  );
}
