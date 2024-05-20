import { IS_BROWSER } from "$fresh/runtime.ts";
import { PopoverGroup } from "@headlessui/react";
import { clsx } from "clsx";
import type { JSX } from "preact";
import type { ComponentChildren } from "preact";
import { tw } from "../utils/tailwind.ts";

const listStyles = tw`flex flex-shrink flex-row flex-wrap items-center gap-6`;

export interface HeaderGroupProps {
  readonly children?: ComponentChildren;
  readonly class?: string;
}

export function HeaderGroup({
  children,
  ...props
}: HeaderGroupProps): JSX.Element {
  if (!IS_BROWSER) {
    return <ul class={listStyles}>{children}</ul>;
  }

  return (
    // @ts-expect-error: `PopoverGroup`'s types are wacky.
    <PopoverGroup as={"ul"} className={clsx(listStyles, props)}>
      {children}
    </PopoverGroup>
  );
}
