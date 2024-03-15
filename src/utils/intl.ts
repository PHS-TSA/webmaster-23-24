export const usdFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const yearFormat = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "year",
  unitDisplay: "long",
  maximumFractionDigits: 0,
});
