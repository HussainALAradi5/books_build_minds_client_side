export interface LoanQuoteDto {
  bookTitle: string;
  availableCopies: number;
  borrowDays: number;
  rentalDays: number;
  rentalAmountMinor: number;
  purchaseAmountMinor: number;
  currency: string;
  currencyScale: number;
  policyVersion: string;
  terms: string[];
}
