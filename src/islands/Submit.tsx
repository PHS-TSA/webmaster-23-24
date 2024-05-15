import { IS_BROWSER } from "$fresh/runtime.ts";
import { Button } from "@headlessui/react";
import type { ComponentChildren, JSX } from "preact";
import { tw } from "../utils/tailwind.ts";

interface SubmitProps {
  readonly children: ComponentChildren;
}

const buttonStyles = tw`bg-slate-200 dark:bg-slate-800 text-lg border-slate-500 border-2 rounded px-3 py-2`;

export function Submit({ children }: SubmitProps): JSX.Element {
  if (!IS_BROWSER) {
    return (
      <button className={buttonStyles} type="submit">
        {children}
      </button>
    );
  }

  return (
    <Button className={buttonStyles} type="submit">
      {children}
    </Button>
  );
}
