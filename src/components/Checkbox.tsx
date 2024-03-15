import type { JSX } from "preact";

export interface CheckboxProps {
  name: string;
  id: string;
  labelText: string;
  required?: boolean;
}

export function Checkbox({
  name,
  id,
  labelText,
  required,
}: CheckboxProps): JSX.Element {
  return (
    <div class="top-16 flex w-72 flex-col items-center gap-4">
      <label class="text-lg" for={id}>
        {labelText}
      </label>
      <input
        name={name}
        type="checkbox"
        /* Removal of ring based on https://romansorin.com/blog/disabling-the-tailwind-input-ring */
        class="cursor-default rounded border-2 border-gray-500 bg-slate-200 shadow-md focus:outline-none focus:ring-1 focus:ring-offset-0 focus-visible:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800"
        id={id}
        required={required}
      />
    </div>
  );
}
