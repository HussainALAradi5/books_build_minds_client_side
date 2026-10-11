import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { LoanStatus } from "@/enums/library/LoanStatus";
import type { LoanKind } from "@/enums/library/LoanKind";

export interface Loan extends BaseEntity {
  loanId: number;
  userId: number;
  bookId: number;
  bookTitle: string;
  bookSlug: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  status: LoanStatus;
  loanKind: LoanKind;
  rentalFee: number;
}
