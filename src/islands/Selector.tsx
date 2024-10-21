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
import { IconCheck, IconChevronDown } from "@tabler/icons-preact";
import { clsx } from "clsx";
import type { ComponentChildren, JSX } from "preact";
import { Info } from "./Info.tsx";

export interface SelectorProps<T extends string, U extends T> {
  readonly name: string;
  readonly question: string;
  readonly list: SelectorListObject<T>[];
  readonly current?: U | undefined;
  readonly required?: boolean;
  /** A hacky way to get Fresh to serialize the `info` prop. */
  readonly children?: ComponentChildren;
}

export interface SelectorListObject<T extends string> {
  name: string;
  value: T;
}

function ButtonIcon(): JSX.Element {
  return (
    <IconChevronDown
      size={20}
      class="size-5 text-slate-400"
      aria-hidden="true"
    />
  );
}

export function Selector<T extends string, U extends T>({
  name,
  question,
  list,
  current: currentValue,
  required,
  children: info,
}: SelectorProps<T, U>): JSX.Element {
  const current = useSignal(
    list.find((val) => val.name === currentValue) ?? { name: "", value: "" },
  );
  const query = useSignal("");

  const filtered = list.filter((item) =>
    item.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.value.toLowerCase().replace(/\s+/g, "")),
  );

  return (
    <div class="top-16 flex w-48 md:w-72 flex-col items-center gap-4">
      <Combobox
        name={name}
        disabled={!IS_BROWSER}
        value={current.value}
        onChange={(newValue) => {
          if (newValue) {
            current.value = newValue;
          }
        }}
        onClose={() => {
          query.value = "";
        }}
      >
        <Label className="md:text-lg">
          {question}
          {info !== undefined && (
            <>
              {" "}
              <Info>{info}</Info>
            </>
          )}
        </Label>
        <div class="relative mt-1 w-min">
          <div class="relative w-full cursor-default rounded-lg bg-slate-200 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-50/75 focus-visible:ring-offset-2  sm:text-sm dark:bg-slate-800 dark:focus-visible:ring-slate-950/75">
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
            <ComboboxButton
              title="Options"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ButtonIcon />
            </ComboboxButton>
          </div>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
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
                    className="relative cursor-default select-none rounded-md py-2 pl-10 pr-4 text-slate-900 data-[focus]:bg-green-500 data-[focus]:text-slate-50 dark:text-slate-100 dark:data-[focus]:bg-green-700"
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          class={clsx(
                            "block truncate text-left ",
                            selected ? "font-medium" : "font-normal",
                          )}
                        >
                          {item.name}
                        </span>
                        {selected && (
                          <span
                            class={clsx(
                              "absolute inset-y-0 left-0 flex items-center pl-3",
                              focus ? "text-slate-50" : "text-green-700",
                            )}
                          >
                            <IconCheck
                              size={20}
                              class="size-5"
                              aria-hidden="true"
                            />
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
