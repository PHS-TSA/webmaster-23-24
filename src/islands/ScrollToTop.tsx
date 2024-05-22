import { IS_BROWSER } from "$fresh/runtime.ts";
import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { IconChevronUp } from "../components/icons.ts";
import {
  blueButtonStyles,
  floatingButtonStyles,
} from "../components/styles.ts";
import { tw } from "../utils/tags.ts";

function scrollToTop(): void {
  globalThis.scrollTo({ top: 0 });
}

const scrollToTopButtonStyles = tw`opacity-0 appear-10%`;
const scrollToTopButtonLabel = "Scroll back to the top of the page.";

export function ScrollToTop(): JSX.Element {
  const buttonStyles = clsx(
    floatingButtonStyles,
    blueButtonStyles,
    scrollToTopButtonStyles,
  );

  if (!IS_BROWSER) {
    return (
      <button
        type="button"
        aria-label={scrollToTopButtonLabel}
        class={buttonStyles}
        onClick={scrollToTop}
      >
        <IconChevronUp />
      </button>
    );
  }

  return (
    <Button
      aria-label={scrollToTopButtonLabel}
      className={buttonStyles}
      onClick={scrollToTop}
    >
      <IconChevronUp />
    </Button>
  );
}
