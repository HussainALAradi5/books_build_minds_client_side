export enum TransactionKind {
  Purchase = "purchase",
  Rental = "rental",
}

export const transactionKindLabels: Record<TransactionKind, string> = {
  [TransactionKind.Purchase]: "Purchase",
  [TransactionKind.Rental]: "Rental",
};
export const transactionKindColors: Record<TransactionKind, "purple" | "teal"> = {
  [TransactionKind.Purchase]: "purple",
  [TransactionKind.Rental]: "teal",
};
