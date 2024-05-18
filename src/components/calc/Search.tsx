import type { JSX } from "preact";
import { Checkbox } from "../../islands/Checkbox.tsx";
import { InputField } from "../../islands/InputField.tsx";
import { Selector, type SelectorListObject } from "../../islands/Selector.tsx";
import { Submit } from "../../islands/Submit.tsx";
import { type State, states } from "../../utils/calc/solar.ts";
import type { CalculatorSearchProps } from "../calc/props.ts";

export function CalculatorSearch(data: CalculatorSearchProps): JSX.Element {
  return (
    <form class="flex w-11/12 flex-col items-center gap-8 rounded-md bg-slate-100 p-8 text-center dark:bg-slate-900">
      <Selector
        name="region"
        question="What state are you from?"
        list={states.map(
          (state: State): SelectorListObject<State> => ({
            name: state,
            value: state,
          }),
        )}
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
        question="What type of geothermal system is applicable for your home?"
        list={[
          { name: "Horizontal loop", value: "horizontal" },
          { name: "Vertical loop", value: "vertical" },
          { name: "Open loop", value: "open" },
          { name: "Closed loop", value: "closed" },
        ]}
        current="horizontal"
        required
        hasInfo={true}
      >
        See{" "}
        <a href="/solutions/geothermal/what/">
          What Are Geothermal Energy Solutions?
        </a>
      </Selector>
      <InputField
        name="area"
        question="What is the square footage of your home?"
        required
      />
      <Checkbox
        name="permit"
        labelText="Does your county require a permit for construction?"
      />

      <Submit>Submit</Submit>
    </form>
  );
}
