import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { type ComponentChildren, Fragment, type JSX } from "preact";
import { IconInfoCircle } from "../utils/icons.ts";

export interface InfoProps {
  readonly children: ComponentChildren;
}

export function Info({ children }: InfoProps): JSX.Element {
  return (
    <Popover as={Fragment}>
      <PopoverButton
        type="button"
        title="More Information"
        class="focus-visible:outline-none"
      >
        <IconInfoCircle class="inline" size={20} />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        class="absolute left-0 z-20 top-0 max-w-fit w-48 border-4 bg-slate-900/80 p-1 text-sm prose prose-sm prose-invert shadow-2xl border-none rounded-md"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}
