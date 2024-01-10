import { Transition } from "@headlessui/react";
import type { TransitionClasses } from "@headlessui/react";
import type { FunctionalComponent, RenderableProps, VNode } from "preact";
import type { Ref } from "preact/hooks";

interface TransitionProps extends RenderableProps<TransitionClasses> {
  ref?: Ref<HTMLElement>;
  as?: FunctionalComponent;
}

export function Transitions({
  children,
  enter,
  enterFrom,
  enterTo,
  entered,
  leave,
  leaveFrom,
  leaveTo,
  ref,
  as,
}: TransitionProps): VNode {
  const definedProps = Object.fromEntries(
    Object.entries({
      enter,
      enterFrom,
      enterTo,
      entered,
      leave,
      leaveFrom,
      leaveTo,
      ref,
      as,
    }).filter(([_key, value]) => value !== undefined),
  );

  return <Transition {...definedProps}>{children}</Transition>;
}
