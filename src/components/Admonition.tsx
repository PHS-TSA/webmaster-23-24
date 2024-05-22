import type { JSX, RenderableProps } from "preact";
import { tw } from "../utils/tags.ts";
import { IconAlertTriangle, IconFlame, IconInfoCircle } from "./icons.ts";

export type AdmonitionType =
  | "note"
  | "warning"
  | "tip"
  | "important"
  | "fun-fact"
  | "caution";

export interface AdmonitionProps {
  readonly type?: AdmonitionType;
}

const noteStyles = tw`bg-blue-300 divide-blue-500 border-blue-400 dark:divide-blue-400 dark:border-blue-500 dark:bg-blue-600`;
const warningStyles = tw`bg-red-300 divide-red-500 border-red-400 dark:divide-red-500 dark:border-red-500 dark:bg-red-600`;

function getAdmonitionStyles(type: AdmonitionType): string {
  switch (type) {
    case "note":
      return noteStyles;
    case "warning":
      return warningStyles;
    case "tip":
      return noteStyles;
    case "important":
      return noteStyles;
    case "fun-fact":
      return noteStyles;
    case "caution":
      return warningStyles;
  }
}

function getTitle(type: AdmonitionType): string {
  switch (type) {
    case "note":
      return "Note:";
    case "warning":
      return "Warning:";
    case "tip":
      return "Tip:";
    case "important":
      return "Important!";
    case "fun-fact":
      return "Did You Know?";
    case "caution":
      return "Caution:";
  }
}

interface AdmonitionIconProps extends AdmonitionProps {
  readonly type: AdmonitionType;
}

function AdmonitionIcon({ type }: AdmonitionIconProps): JSX.Element {
  switch (type) {
    case "note":
      return <IconInfoCircle />;
    case "warning":
      return <IconAlertTriangle />;
    case "tip":
      return <IconInfoCircle />;
    case "important":
      return <IconFlame />;
    case "fun-fact":
      return <IconInfoCircle />;
    case "caution":
      return <IconAlertTriangle />;
  }
}

export function Admonition({
  type = "note",
  children,
}: RenderableProps<AdmonitionProps>): JSX.Element {
  return (
    <div
      class={`flex w-2/3 flex-col divide-y rounded-lg border-2 *:px-4 ${getAdmonitionStyles(
        type,
      )}`}
    >
      <div class="flex flex-row items-center *:mr-4">
        <AdmonitionIcon type={type} /> {getTitle(type)}
      </div>
      <div>{children}</div>
    </div>
  );
}
