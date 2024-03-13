import type { JSX, RenderableProps } from "preact";

export function Content({ children }: RenderableProps<unknown>): JSX.Element {
  return (
    <article class="prose prose-lg flex max-w-none flex-col place-items-center bg-slate-200 px-10 py-10 dark:prose-invert prose-headings:flex prose-headings:flex-row prose-headings:items-center md:px-20 lg:px-40 dark:bg-slate-800 [&_mjx-container>svg]:inline">
      {children}
    </article>
  );
}
