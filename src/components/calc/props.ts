import type { GeoCostBreakdown } from "../../utils/calc/geo.ts";
import type { State, StateData } from "../../utils/calc/solar.ts";

export type CalculatorProps = CalculatorSearchProps | CalculatorShowProps;

export interface CalculatorSearchProps {
  state: "search";
  region: State | undefined;
}

export interface CalculatorShowProps {
  state: "display";
  solarRegionData: StateData;
  geoCostData: GeoCostBreakdown;
}
