import { IS_BROWSER } from "$fresh/runtime.ts";
import { Field, Input, Label } from "@headlessui/react";
import type { JSX } from "preact";
import { tw } from "../utils/tags.ts";

export interface InputFieldProps {
  readonly name: string;
  readonly question: string;
  readonly required?: boolean;
}

const wrapperStyles = tw`top-16 flex w-48 md:w-72 flex-col items-center gap-4`;
const labelStyles = tw`md:text-lg`;
const inputStyles = tw`w-min cursor-default rounded border-2 border-slate-500 bg-slate-200 text-left shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 autofill:bg-slate-300 autofill:dark:bg-slate-700`;

export function InputField({
  question,
  name,
  required,
}: InputFieldProps): JSX.Element {
  if (!IS_BROWSER) {
    return (
      <div class={wrapperStyles}>
        <label class={labelStyles}>{question}</label>
        <input
          name={name}
          class={inputStyles}
          required={required}
          aria-label={question}
        />
      </div>
    );
  }

  return (
    <Field disabled={!IS_BROWSER} className={wrapperStyles}>
      <Label className={labelStyles}>{question}</Label>
      <Input name={name} className={inputStyles} required={required} />
    </Field>
  );
}
