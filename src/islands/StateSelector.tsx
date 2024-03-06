import { IS_BROWSER } from "$fresh/runtime.ts";
import { Combobox, Transition } from "@headlessui/react";
import { useSignal } from "@preact/signals";
import { Fragment, type JSX } from "preact";
import { type State, states } from "../utils/calc.ts";
import { IconCheck, IconChevronDown } from "../utils/icons.ts";
import { tw } from "../utils/tailwind.ts";

export interface StateSelectorProps {
  currentState?: State | undefined;
}

export function StateSelector({
  currentState,
}: StateSelectorProps): JSX.Element {
  const state = useSignal(currentState);
  const query = useSignal("");

  const filteredStates = states.filter((state) =>
    state
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.value.toLowerCase().replace(/\s+/g, "")),
  );

  return (
    <div class="top-16 flex w-72 flex-col items-center gap-4">
      <Combobox
        disabled={!IS_BROWSER}
        value={state.value}
        onChange={(newState) => {
          state.value = newState;
        }}
      >
        <Combobox.Label class="text-lg">
          What state are you from?
        </Combobox.Label>
        <div class="relative mt-1 w-min">
          <div class="relative w-full cursor-default rounded-lg bg-slate-200 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm dark:bg-slate-800 dark:focus-visible:ring-black/75 dark:focus-visible:ring-offset-teal-700">
            <Combobox.Input
              name="region"
              class="rounded border-2 border-gray-500 bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800"
              autoComplete="off"
              onChange={(event) => {
                if (event.target instanceof HTMLInputElement) {
                  query.value = event.target.value;
                }
              }}
            />
            <Combobox.Button class="absolute inset-y-0 right-0 flex items-center pr-2">
              <IconChevronDown
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
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
            <Combobox.Options class="absolute mt-1 max-h-60 w-full max-w-full overflow-auto rounded-md bg-slate-200 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-slate-800">
              {filteredStates.length === 0 && query.value !== "" ? (
                <div class="relative cursor-default select-none px-4 py-2 text-gray-700">
                  No results found
                </div>
              ) : (
                filteredStates.map((state) => (
                  <Combobox.Option
                    key={state}
                    class="relative cursor-default select-none rounded-md py-2 pl-10 pr-4 ui-active:bg-green-500 ui-active:text-white ui-not-active:text-gray-900 dark:ui-active:bg-green-700 ui-not-active:dark:text-gray-100"
                    value={state}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          class={tw`block truncate text-left ${
                            selected ? tw`font-medium` : tw`font-normal`
                          }`}
                        >
                          {state}
                        </span>
                        {selected ? (
                          <span
                            class={tw`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? tw`text-white` : tw`text-green-700`
                            }`}
                          >
                            <IconCheck class="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : undefined}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
