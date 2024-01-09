export function tw(
  strings: TemplateStringsArray,
  ...values: readonly unknown[]
) {
  return strings.map((string, i) => string + (values[i] || "")).join("");
}
