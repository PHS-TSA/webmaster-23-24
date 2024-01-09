export function tw(
  strings: TemplateStringsArray,
  ...values: readonly unknown[]
): string {
  return strings.map((string, i) => string + (values[i] || "")).join("");
}
