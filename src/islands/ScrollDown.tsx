import { Button } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-preact";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { floatingButtonStyles } from "../components/styles.ts";

function scrollDown(): void {
  globalThis.scrollTo({ top: globalThis.innerHeight });
}

export function ScrollDown(): JSX.Element {
  return (
    <Button
      aria-label="Scroll to content."
      className={clsx(
        floatingButtonStyles,
        "animate-bounce hover:bg-slate-50/15 hover:backdrop-blur-sm",
      )}
      onClick={scrollDown}
    >
      <IconChevronDown />
    </Button>
  );
}
