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
import type { ComponentChildren, JSX } from "preact";
import { IconCheck, IconChevronDown } from "../utils/icons.ts";
import { tw } from "../utils/tailwind.ts";
import { Info } from "./Info.tsx";

export interface SelectorProps<T extends string, U extends T> {
  readonly name: string;
  readonly question: string;
  readonly list: SelectorListObject<T>[];
  readonly current?: U | undefined;
  readonly required?: boolean;
  /** A hacky way to get Fresh to serialize the `info` prop. */
  readonly children?: ComponentChildren;
  /** A hacky way to get Fresh *not* to serialize the `info` prop. */
  readonly hasInfo?: boolean;
}

export interface SelectorListObject<T extends string> {
  name: string;
  value: T;
}

const wrapperStyles = tw`top-16 flex w-72 flex-col items-center gap-4`;
const labelStyles = tw`text-lg`;
const detach1Styles = tw`relative mt-1 w-min`;
const detach2Styles = tw`relative w-full cursor-default rounded-lg bg-slate-200 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-50/75 focus-visible:ring-offset-2  sm:text-sm dark:bg-slate-800 dark:focus-visible:ring-slate-950/75`;
const inputStyles = tw`rounded border-2 border-slate-500 bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800`;
const buttonStyles = tw`absolute inset-y-0 right-0 flex items-center pr-2`;
function ButtonIcon(): JSX.Element {
  return (
    <IconChevronDown
      size={20}
      class="size-5 text-slate-400"
      aria-hidden="true"
    />
  );
}
const buttonTitle = "Options";

export function Selector<T extends string, U extends T>({
  name,
  question,
  list,
  current: currentValue,
  required,
  children: info,
  hasInfo,
}: SelectorProps<T, U>): JSX.Element {
  const current = useSignal(
    list.find((val) => val.name === currentValue) ?? { name: "", value: "" },
  );
  const query = useSignal("");

  if (!IS_BROWSER) {
    return (
      <div class={wrapperStyles}>
        <label class={labelStyles}>{question}</label>
        <div class={detach1Styles}>
          <div class={detach2Styles}>
            <input
              class={inputStyles}
              autoComplete="off"
              required={required}
              value={current.value?.name}
              aria-label={question}
            />
            <button title={buttonTitle} type="button" class={buttonStyles}>
              <ButtonIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filtered = list.filter((item) =>
    item.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.value.toLowerCase().replace(/\s+/g, "")),
  );

  return (
    <div class={wrapperStyles}>
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
        <Label className={labelStyles}>
          {question}
          {hasInfo && (
            <>
              {" "}
              <Info>{info}</Info>
              {/* Hack b/c I don't have time to debug. */}
              <span class="hidden">{info}</span>
            </>
          )}
        </Label>
        <div class={detach1Styles}>
          <div class={detach2Styles}>
            <ComboboxInput
              className={inputStyles}
              autoComplete="off"
              required={required}
              displayValue={(state: SelectorListObject<T>) => `${state.name}`}
              onChange={(event) => {
                if (event.target instanceof HTMLInputElement) {
                  query.value = event.target.value;
                }
              }}
            />
            <ComboboxButton title={buttonTitle} className={buttonStyles}>
              <ButtonIcon />
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
                    {({ selected, focus }) => (
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
                              focus ? tw`text-slate-50` : tw`text-green-700`
                            }`}
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
