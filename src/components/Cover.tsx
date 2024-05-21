import type { ComponentChildren, ComponentType, JSX } from "preact";
import { Logo } from "./Logo.tsx";

/**
 * Properties for the {@linkcode Cover} component.
 */
export interface CoverProps {
  /**
   * The title of the page.
   */
  readonly title: string;

  /**
   * The icon to render as the attention grabber.
   */
  readonly icon?: ComponentChildren;

  /**
   * The additional content to render.
   */
  readonly children?: ComponentChildren;

  readonly Hero?: ComponentType<HeroProps>;
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
  icon = <Logo class="size-32" />,
  Hero = Hulk,
}: CoverProps): JSX.Element {
  return (
    <Hero>
      <div class="flex max-w-screen-sm flex-col items-center justify-center gap-y-4 text-balance text-center lg:max-w-screen-md">
        {icon}
        <div class="inset-0 rounded-md p-4 backdrop-blur-sm">
          <h1 class="text-pretty text-4xl font-bold">{title}</h1>
          {children}
        </div>
      </div>
    </Hero>
  );
}

export interface HeroProps {
  readonly children?: ComponentChildren;
}

function Hulk({ children }: HeroProps): JSX.Element {
  return (
    <div class="flex flex-row justify-center bg-green-500 px-4 py-8 dark:bg-green-700">
      {children}
    </div>
  );
}
