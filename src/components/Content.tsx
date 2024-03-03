import type { JSX, RenderableProps } from "preact";

export function Content({ children }: RenderableProps<unknown>): JSX.Element {
  return (
    <article class="prose prose-lg max-w-none bg-slate-200 px-10 md:px-20 lg:px-40 py-10 dark:prose-invert prose-headings:flex prose-headings:flex-row prose-headings:items-center dark:bg-slate-800">
      {children}
    </article>
  );
}
