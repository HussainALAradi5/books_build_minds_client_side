import type { Transaction } from "@/interfaces/payments/Transaction";

export interface TransactionCardProps {
  item: Transaction;
  onChange?: () => Promise<void>;
}
