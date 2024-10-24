import { IS_BROWSER } from "$fresh/runtime.ts";
import { Field, Input, Label } from "@headlessui/react";
import type { JSX } from "preact";

export interface CheckboxProps {
  readonly name: string;
  readonly labelText: string;
  readonly required?: boolean;
}

export function Checkbox({
  name,
  labelText,
  required,
}: CheckboxProps): JSX.Element {
  return (
    <Field
      disabled={!IS_BROWSER}
      class="top-16 flex w-48 md:w-72 flex-col items-center gap-4"
    >
      <Label class="md:text-lg">{labelText}</Label>
      <Input
        name={name}
        type="checkbox"
        // Removal of ring based on https://romansorin.com/blog/disabling-the-tailwind-input-ring
        className="form-checkbox cursor-default rounded border-2 border-slate-500 bg-slate-200 shadow-md focus-visible:outline-none focus:ring-1 focus:ring-offset-0 focus-visible:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800"
        required={required}
      />
    </Field>
  );
}
