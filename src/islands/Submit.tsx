import { Button } from "@headlessui/react";
import type { ComponentChildren, JSX } from "preact";

export interface SubmitProps {
  readonly children: ComponentChildren;
}

export function Submit({ children }: SubmitProps): JSX.Element {
  return (
    <Button
      className="bg-slate-200 dark:bg-slate-800 text-lg border-slate-500 border-2 rounded px-3 py-2"
      type="submit"
    >
      {children}
    </Button>
  );
}
