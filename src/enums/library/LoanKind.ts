export enum LoanKind {
  Borrow = "borrow",
  Rent = "rent",
}
export const loanKindLabels: Record<LoanKind, string> = { borrow: "Borrow", rent: "Rent" };
export const loanKindColors: Record<LoanKind, "blue" | "teal"> = { borrow: "blue", rent: "teal" };
