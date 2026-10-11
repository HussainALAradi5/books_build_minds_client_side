import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
export interface Receipt extends BaseEntity {
  receiptId: number;
  userId: number;
  bookId: number;
  writtenTime: string;
}
