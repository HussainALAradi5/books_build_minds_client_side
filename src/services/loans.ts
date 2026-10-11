import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { LoanDto, LoanStatus, PageDto } from "@/lib/types";

export const loans = {
  current: (slug: string) => api<{ loan: LoanDto | null }>(`/book/${slug}/loan`),
  borrow: (slug: string) => api<{ message: string; loan: LoanDto }>(`/book/${slug}/borrow`, { method: "POST" }),
  return: (slug: string) => api<{ message: string; loan: LoanDto }>(`/book/${slug}/return`, { method: "POST" }),
  all: (userId: number, page = 1, status: LoanStatus | "all" = "all") =>
    api<PageDto<LoanDto>>(`/profile/${userId}/loans${buildQuery({ page, status })}`),
};


