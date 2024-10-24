import { Button } from "@headlessui/react";
import { IconChevronUp } from "@tabler/icons-preact";
import { clsx } from "clsx";
import type { JSX } from "preact";
import {
  blueButtonStyles,
  floatingButtonStyles,
} from "../components/styles.ts";
import { tw } from "../utils/tags.ts";

function scrollToTop(): void {
  globalThis.scrollTo({ top: 0 });
}

export function ScrollToTop(): JSX.Element {
  return (
    <Button
      aria-label="Scroll back to the top of the page."
      className={clsx(
        floatingButtonStyles,
        blueButtonStyles,
        tw`opacity-0 appear-10%`,
      )}
      onClick={scrollToTop}
    >
      <IconChevronUp />
    </Button>
  );
}
