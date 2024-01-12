export function tw(
  strings: TemplateStringsArray,
  ...values: readonly unknown[]
): string {
  return strings
    .map((string: string, i: number): string => string + (values[i] || ""))
    .join("");
}
