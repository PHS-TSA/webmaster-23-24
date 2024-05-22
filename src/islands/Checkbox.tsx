import { IS_BROWSER } from "$fresh/runtime.ts";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { tw } from "../utils/tags.ts";

export interface CheckboxProps {
  readonly name: string;
  readonly labelText: string;
  readonly required?: boolean;
}

const fieldStyles = tw`top-16 flex w-72 flex-col items-center gap-4`;
const labelStyles = tw`text-lg`;
// Removal of ring based on https://romansorin.com/blog/disabling-the-tailwind-input-ring
const inputStyles = tw`cursor-default rounded border-2 border-slate-500 bg-slate-200 shadow-md focus-visible:outline-none focus:ring-1 focus:ring-offset-0 focus-visible:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800`;

export function Checkbox({
  name,
  labelText,
  required,
}: CheckboxProps): JSX.Element {
  if (!IS_BROWSER) {
    return (
      <div class={fieldStyles}>
        <label class={labelStyles}>{labelText}</label>
        <input
          class={inputStyles}
          aria-label={labelText}
          type="checkbox"
          name={name}
          required={required}
          disabled
        />
      </div>
    );
  }

  return (
    <Field disabled={!IS_BROWSER} class={fieldStyles}>
      <Label class={labelStyles}>{labelText}</Label>
      <Input
        name={name}
        type="checkbox"
        className={clsx(tw`form-checkbox`, inputStyles)}
        required={required}
      />
    </Field>
  );
}
