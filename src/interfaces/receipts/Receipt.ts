import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
export interface Receipt extends BaseEntity {
  receiptId: number;
  transactionId: string | null;
  amountMinor: number | null;
  currency: string | null;
  currencyScale: number | null;
  userId: number;
  bookId: number;
  writtenTime: string;
}
