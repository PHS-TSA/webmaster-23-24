import type { JSX, RenderableProps } from "preact";
import { tw } from "../utils/tailwind.ts";

export interface AdmonitionProps {
  type?: "note" | "warning" | "tip" | "important";
  title: string;
}

const noteStyles = tw`bg-blue-300 border-blue-400 divide-blue-500`;
const warningStyles = tw`bg-red-300 border-red-400 divide-red-500`;

export function Admonition({
  type = "note",
  title,
  children,
}: RenderableProps<AdmonitionProps>): JSX.Element {
  return (
    <div
      class={`rounded-lg border-2 flex-col divide-y *:px-4 ${
        type === "note" ? noteStyles : warningStyles
      }`}
    >
      <div class="admonition-title">{title}</div>
      <div class="admonition-content">{children}</div>
    </div>
  );
}
