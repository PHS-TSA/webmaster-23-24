import type { GeoCostBreakdown } from "./geo.ts";
import type { State, StateData } from "./solar.ts";

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
