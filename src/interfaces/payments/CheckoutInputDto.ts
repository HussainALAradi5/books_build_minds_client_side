import type { TransactionKind } from "@/enums/payments/TransactionKind";

export interface CheckoutInputDto {
  bookSlug: string;
  kind: TransactionKind;
  requestKey: string;
  expectedAmountMinor: number;
  acceptedTerms: boolean;
  policyVersion: string;
}
