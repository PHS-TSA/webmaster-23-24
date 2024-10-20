import { Schema } from "@effect/schema";

export type GeoType = typeof GeothermalLoopTypeSchema.Type;

export const GeothermalLoopTypeSchema = Schema.Literal(
  "horizontal",
  "vertical",
  "open",
  "closed",
);

export interface GeoCostBreakdown {
  /** +$2000 */
  readonly isHilly: boolean;
  /** +$2000 */
  readonly needsRenovations: boolean;
  /** Varies */
  readonly type: GeoType;
  /** Varies */
  readonly squareFootage: number;
  /** +$250 */
  readonly requiresPermit: boolean;
}

export function calculatePricingIfHardInstallation(
  isHilly: boolean,
  needsRenovations: boolean,
): number {
  return isHilly || needsRenovations ? 2000 : 0;
}

export function calculatePricingFromType(type: GeoType): number {
  switch (type) {
    case "horizontal":
      return 15000;
    case "vertical":
      return 25000;
    case "open":
      return 12000;
    case "closed":
      return 25000;
  }
}

export function calculatePricingMultiplierFromArea(
  squareFootage: number,
): number {
  return squareFootage < 1000
    ? 0.8
    : squareFootage < 1500
      ? 1
      : squareFootage < 2000
        ? 1.4
        : squareFootage < 2500
          ? 1.8
          : 2;
}

export function calculatePricingIfRequiresPermit(
  requiresPermit: boolean,
): number {
  return requiresPermit ? 250 : 0;
}

export function calculatePricing({
  isHilly,
  needsRenovations,
  type,
  squareFootage,
  requiresPermit,
}: GeoCostBreakdown): number {
  let cost = 0;

  cost += calculatePricingIfHardInstallation(isHilly, needsRenovations);
  cost += calculatePricingFromType(type);
  cost *= calculatePricingMultiplierFromArea(squareFootage);
  cost += calculatePricingIfRequiresPermit(requiresPermit);

  return cost;
}
