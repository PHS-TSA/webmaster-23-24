import { IS_BROWSER } from "fresh/runtime";
import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { IconChevronDown } from "../components/icons.ts";
import { floatingButtonStyles } from "../components/styles.ts";
import { tw } from "../utils/tags.ts";

function scrollDown(): void {
  globalThis.scrollTo({ top: globalThis.innerHeight });
}

const scrollDownButtonStyles = tw`animate-bounce hover:bg-slate-50/15 hover:backdrop-blur-sm`;
const scrollDownButtonLabel = "Scroll to content.";

export function ScrollDown(): JSX.Element {
  if (!IS_BROWSER) {
    return (
      <button
        type="button"
        aria-label={scrollDownButtonLabel}
        class={clsx(floatingButtonStyles, scrollDownButtonStyles)}
        onClick={scrollDown}
      >
        <IconChevronDown class="size-8" />
      </button>
    );
  }

  return (
    <Button
      aria-label={scrollDownButtonLabel}
      className={clsx(floatingButtonStyles, scrollDownButtonStyles)}
      onClick={scrollDown}
    >
      <IconChevronDown />
    </Button>
  );
}
