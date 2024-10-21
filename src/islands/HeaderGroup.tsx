import { PopoverGroup } from "@headlessui/react";
import { clsx } from "clsx";
import type { JSX } from "preact";
import type { ComponentChildren } from "preact";

export interface HeaderGroupProps {
  readonly children?: ComponentChildren;
  readonly class?: string;
}

export function HeaderGroup({
  children,
  ...props
}: HeaderGroupProps): JSX.Element {
  return (
    <PopoverGroup
      as={"ul"}
      className={clsx(
        "flex flex-shrink flex-row flex-wrap items-center gap-6",
        props,
      )}
    >
      {children}
    </PopoverGroup>
  );
}
