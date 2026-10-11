export enum LibraryActionType {
  Borrow = "borrow",
  Rent = "rent",
  Return = "return",
  Buy = "buy",
  Sell = "sell",
}
export const libraryActionLabels: Record<LibraryActionType, string> = {
  borrow: "Borrow",
  rent: "Rent",
  return: "Return",
  buy: "Buy",
  sell: "Sell",
};
export const libraryActionColors: Record<
  LibraryActionType,
  "blue" | "green" | "purple" | "orange" | "teal"
> = { borrow: "blue", rent: "teal", return: "green", buy: "purple", sell: "orange" };
