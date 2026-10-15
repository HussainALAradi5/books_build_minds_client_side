export enum TransactionStatus {
  Pending = "pending",
  Completed = "completed",
  Expired = "expired",
  Failed = "failed",
  RefundPending = "refund_pending",
  Refunded = "refunded",
}

export const transactionStatusLabels: Record<TransactionStatus, string> = {
  pending: "Awaiting payment", completed: "Completed", expired: "Expired", failed: "Failed",
  refund_pending: "Refund pending", refunded: "Refunded",
};
export const transactionStatusColors: Record<TransactionStatus, string> = {
  pending: "orange", completed: "green", expired: "gray", failed: "red", refund_pending: "purple", refunded: "blue",
};
