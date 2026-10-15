export const formatMoney = (amountMinor: number, currency: string, scale: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: currency.toUpperCase() }).format(amountMinor / scale);
