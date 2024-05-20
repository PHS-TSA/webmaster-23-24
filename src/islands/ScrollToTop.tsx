import { IS_BROWSER } from "$fresh/runtime.ts";
import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { IconChevronUp } from "../components/icons.ts";
import { floatingButtonStyles } from "../components/styles.ts";
import { tw } from "../utils/tailwind.ts";

export interface ScrollToTopProps {
  readonly class: string;
}

function scrollToTop(): void {
  globalThis.scrollTo({ top: 0 });
}

const scrollToTopButtonStyles = tw`opacity-0 appear-10%`;
const scrollToTopButtonLabel = "Scroll back to the top of the page.";

export function ScrollToTop(props: ScrollToTopProps): JSX.Element {
  if (!IS_BROWSER) {
    return (
      <button
        type="button"
        aria-label={scrollToTopButtonLabel}
        class={clsx(floatingButtonStyles, props.class, scrollToTopButtonStyles)}
        onClick={scrollToTop}
      >
        <IconChevronUp />
      </button>
    );
  }

  return (
    <Button
      aria-label={scrollToTopButtonLabel}
      className={clsx(
        floatingButtonStyles,
        props.class,
        scrollToTopButtonStyles,
      )}
      onClick={scrollToTop}
    >
      <IconChevronUp />
    </Button>
  );
}
