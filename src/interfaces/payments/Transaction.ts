import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { TransactionKind } from "@/enums/payments/TransactionKind";
import type { TransactionStatus } from "@/enums/payments/TransactionStatus";

export interface Transaction extends BaseEntity {
  transactionId: string;
  bookId: number;
  bookTitle: string;
  bookSlug: string;
  kind: TransactionKind;
  status: TransactionStatus;
  amountMinor: number;
  currency: string;
  currencyScale: number;
  paidAt: string | null;
  checkoutUrl: string | null;
  receiptId: number | null;
  failureReason: string | null;
}
