import type { GeoCostBreakdown } from "./geo.ts";
import type { State, StateData } from "./solar.ts";

export type CalculatorProps = CalculatorSearchProps | CalculatorShowProps;

export interface CalculatorSearchProps {
  readonly state: "search";
  readonly region: State | undefined;
}

export interface CalculatorShowProps {
  readonly state: "display";
  readonly solarRegionData: StateData;
  readonly geoCostData: GeoCostBreakdown;
}
