import type { LoanQuoteDto } from "@/interfaces/library/LoanQuoteDto";
import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { Loan } from "@/interfaces/library/Loan";
import type { Page } from "@/interfaces/shared/Page";
import type { LoanFilters } from "@/interfaces/library/LoanFilters";

export const loans = {
  current: (slug: string) => api<{ loan: Loan | null }>(`/books/${encodeURIComponent(slug)}/loan`),
  quote: (slug: string) => api<LoanQuoteDto>(`/books/${encodeURIComponent(slug)}/quote`),
  borrow: (slug: string, policyVersion: string) => api<{ message: string; loan: Loan }>(`/books/${encodeURIComponent(slug)}/borrow`, { method: "POST", body: JSON.stringify({ acceptedTerms: true, policyVersion }) }),
  return: (slug: string) => api<{ message: string; loan: Loan }>(`/books/${encodeURIComponent(slug)}/return`, { method: "POST" }),
  all: (userId: number, filters: LoanFilters = {}) =>
    api<Page<Loan>>(`/accounts/${userId}/loans${buildQuery(filters)}`),
};
