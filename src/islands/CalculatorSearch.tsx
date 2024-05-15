import { IS_BROWSER } from "$fresh/runtime.ts";
import { Button, Field, Input, Label } from "@headlessui/react";
import type { JSX } from "preact";
import { Checkbox } from "../islands/Checkbox.tsx";
import { Selector, type SelectorListObject } from "../islands/Selector.tsx";
import type { CalculatorSearchProps } from "../utils/calc/search-props.ts";
import { type State, states } from "../utils/calc/solar.ts";

export function CalculatorSearch(data: CalculatorSearchProps): JSX.Element {
  if (!IS_BROWSER) {
    return <></>;
  }

  return (
    <form class="flex w-11/12 flex-col items-center gap-8 rounded-md bg-slate-100 p-8 text-center dark:bg-slate-900">
      <Selector
        name="region"
        question="What state are you from?"
        list={states.map((state: State): SelectorListObject<State> => {
          return { name: state, value: state };
        })}
        current={data.region}
        required
      />
      <Checkbox name="hills" labelText="Is your property hilly?" />
      <Checkbox
        name="renovations"
        labelText="Is your property in need of renovations?"
      />
      <Selector
        name="geo-type"
        question="What type of geothermal system would you like?"
        list={[
          { name: "Horizontal loop", value: "horizontal" },
          { name: "Vertical loop", value: "vertical" },
          { name: "Open loop", value: "open" },
          { name: "Closed loop", value: "closed" },
        ]}
        current="horizontal"
        required
      />
      <Field
        disabled={!IS_BROWSER}
        className="top-16 flex w-72 flex-col items-center gap-4"
      >
        <Label className="text-lg">
          What is the square footage of your home?
        </Label>
        <Input
          name="area"
          className="relative w-min cursor-default rounded border-2 border-slate-500 bg-slate-200 text-left shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800"
          required
        />
      </Field>
      <Checkbox name="permit" labelText="Does your county require a permit?" />

      <Button
        className="bg-slate-200 dark:bg-slate-800 text-lg border-slate-500 border-2 rounded px-3 py-2"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
