import type { GeoCostBreakdown } from "../../utils/calc/geo.ts";
import type { State, StateData } from "../../utils/calc/solar.ts";

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
