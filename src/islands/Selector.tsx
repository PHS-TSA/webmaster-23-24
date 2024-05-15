import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
  Transition,
} from "@headlessui/react";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { IconCheck, IconChevronDown } from "../utils/icons.ts";
import { tw } from "../utils/tailwind.ts";

export interface SelectorProps<T extends string, U extends T> {
  name: string;
  question: string;
  list: SelectorListObject<T>[];
  current?: U | undefined;
  required?: boolean;
}

export interface SelectorListObject<T extends string> {
  name: string;
  value: T;
}

export function Selector<T extends string, U extends T>({
  name,
  question,
  list,
  current: currentValue,
  required,
}: SelectorProps<T, U>): JSX.Element {
  const current = useSignal(list.find((val) => val.name === currentValue));
  const query = useSignal("");

  if (!IS_BROWSER) {
    return <></>;
  }

  const filtered = list.filter((item) =>
    item.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.value.toLowerCase().replace(/\s+/g, "")),
  );

  return (
    <div class="top-16 flex w-72 flex-col items-center gap-4">
      <Combobox
        name={name}
        disabled={!IS_BROWSER}
        value={current.value}
        onChange={(newValue) => {
          if (newValue) {
            current.value = newValue;
          }
        }}
      >
        <Label className="text-lg">{question}</Label>
        <div class="relative mt-1 w-min">
          <div class="relative w-full cursor-default rounded-lg bg-slate-200 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-50/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm dark:bg-slate-800 dark:focus-visible:ring-slate-950/75 dark:focus-visible:ring-offset-teal-700">
            <ComboboxInput
              className="rounded border-2 border-slate-500 bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800"
              autoComplete="off"
              required={required}
              displayValue={(state: SelectorListObject<T>) => `${state.name}`}
              onChange={(event) => {
                if (event.target instanceof HTMLInputElement) {
                  query.value = event.target.value;
                }
              }}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <IconChevronDown
                class="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <Transition
            enter={tw`transition ease-out duration-100`}
            enterFrom={tw`opacity-0`}
            enterTo={tw`opacity-100`}
            leave={tw`transition ease-in duration-100`}
            leaveFrom={tw`opacity-100`}
            leaveTo={tw`opacity-0`}
            afterLeave={() => {
              query.value = "";
            }}
          >
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full max-w-full overflow-auto rounded-md bg-slate-200 text-base shadow-lg ring-1 ring-slate-950/5 focus:outline-none sm:text-sm dark:bg-slate-800">
              {filtered.length === 0 && query.value !== "" ? (
                <div class="relative cursor-default select-none px-4 py-2 text-slate-700">
                  No results found
                </div>
              ) : (
                filtered.map((item) => (
                  <ComboboxOption
                    key={item.name}
                    className="relative cursor-default select-none rounded-md py-2 pl-10 pr-4 ui-active:bg-green-500 ui-active:text-slate-50 ui-not-active:text-slate-900 dark:ui-active:bg-green-700 ui-not-active:dark:text-slate-100"
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          class={tw`block truncate text-left ${
                            selected ? tw`font-medium` : tw`font-normal`
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected && (
                          <span
                            class={tw`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? tw`text-slate-50` : tw`text-green-700`
                            }`}
                          >
                            <IconCheck class="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
