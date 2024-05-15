import { IS_BROWSER } from "$fresh/runtime.ts";
import { PopoverGroup } from "@headlessui/react";
import type { JSX } from "preact";
import type { ComponentChildren } from "preact";
import { tw } from "../utils/tailwind.ts";

const listStyles = tw`flex flex-shrink flex-row flex-wrap items-center gap-6`;

export interface HeaderGroupProps {
  readonly children: ComponentChildren;
}

export function HeaderGroup({ children }: HeaderGroupProps): JSX.Element {
  if (!IS_BROWSER) {
    return <ul class={listStyles}>{children}</ul>;
  }

  return (
    // @ts-expect-error: `PopoverGroup`'s types are wacky.
    <PopoverGroup as={"ul"} className={listStyles}>
      {children}
    </PopoverGroup>
  );
}
