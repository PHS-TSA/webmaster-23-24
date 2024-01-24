/**
 * Interpolates a string with values.
 * Theoretically, this should perfectly match a normal template literal, but it isn't particularly well-tested.
 * It's used for Tailwind CSS class formatting.
 *
 * @param strings - The strings to interpolate.
 * @param values - The values to interpolate.
 * @returns The interpolated string.
 */
export function tw(
  strings: TemplateStringsArray,
  ...values: readonly unknown[]
): string {
  return strings
    .map((string: string, i: number): string => string + (values[i] || ""))
    .join("");
}
