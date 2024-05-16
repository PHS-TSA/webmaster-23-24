import { clsx } from "clsx";
import type { JSX } from "preact";
import { floatingButtonStyles } from "../components/floating-button.ts";
import { IconChevronUp } from "../utils/icons.ts";

export interface ScrollToTopProps {
  readonly class: string;
}

export function ScrollToTop(props: ScrollToTopProps): JSX.Element {
  return (
    <button
      type="button"
      aria-label="Scroll back to the top of the page."
      class={clsx(floatingButtonStyles, props.class, "appear-10%")}
      onClick={() => {
        globalThis.scrollTo({ top: 0 });
      }}
    >
      <IconChevronUp />
    </button>
  );
}
