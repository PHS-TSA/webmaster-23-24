import type { JSX, RenderableProps } from "preact";
import { Logo } from "./Logo.tsx";

/**
 * Properties for the {@link Cover} component.
 */
export interface CoverProps {
  /**
   * The title of the page.
   */
  readonly title: string;

  /**
   * The icon to render as the attention grabber.
   */
  readonly icon?: JSX.Element;
}

/**
 * Render a cover component, which is used as a header for pages.
 * It contains a title and an optional icon.
 * It can optionally also contain additional content, in the form which are rendered below the title; it is typically used to render a description.
 *
 * @param props - The component's properties.
 * @param props.title - The title of the page.
 * @param props.children - The additional content to render.
 * @param props.icon - The icon to render as the attention grabber.
 * @returns The rendered cover component.
 */
export function Cover({
  title,
  children,
  icon = <Logo />,
}: RenderableProps<CoverProps>): JSX.Element {
  return (
    <div class="flex justify-center bg-green-500 px-4 py-8 dark:bg-green-700">
      <div class="flex max-w-screen-sm flex-col items-center justify-center gap-y-4 text-balance text-center lg:max-w-screen-md">
        {icon}
        <h1 class="text-4xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
