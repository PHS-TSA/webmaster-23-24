import { IS_BROWSER } from "$fresh/runtime.ts";
import { Field, Input, Label } from "@headlessui/react";
import type { JSX } from "preact";

export interface InputFieldProps {
  readonly name: string;
  readonly question: string;
  readonly required?: boolean;
}

export function InputField({
  question,
  name,
  required,
}: InputFieldProps): JSX.Element {
  return (
    <Field
      disabled={!IS_BROWSER}
      className="top-16 flex w-48 md:w-72 flex-col items-center gap-4"
    >
      <Label className="md:text-lg">{question}</Label>
      <Input
        name={name}
        className="w-min cursor-default rounded border-2 border-slate-500 bg-slate-200 text-left shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 autofill:bg-slate-300 autofill:dark:bg-slate-700"
        required={required}
      />
    </Field>
  );
}
