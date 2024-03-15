import { z } from "zod";

export type GeoType = z.infer<typeof geothermalLoopType>;

export const geothermalLoopType = z.union([
  z.literal("horizontal"),
  z.literal("vertical"),
  z.literal("open"),
  z.literal("closed"),
]);

export interface GeoCostBreakdown {
  /** $2000 */
  isHilly: boolean;
  /** $2000 */
  needsRenovations: boolean;
  /** See case statement */
  type: GeoType;
  /** See if statements */
  squareFootage: number;
  /** 250 */
  requiresPermit: boolean;
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
