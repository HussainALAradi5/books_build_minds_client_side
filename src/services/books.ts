import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { BookDto, BookSummaryDto, BookResultDto, BookCreateDto, PageDto } from "@/lib/types";

export interface BookFilters {
  page?: number;
  per_page?: number;
  q?: string;
  publisher?: string;
  min_price?: number;
  max_price?: number;
  sort?: "recent" | "title" | "rating" | "price_asc" | "price_desc";
}

export const books = {
  all: (filters: BookFilters = {}) => api<PageDto<BookSummaryDto>>(`/${buildQuery(filters)}`),
  bySlug: (slug: string) => api<BookDto>(`/book/${slug}`),
  create: (data: BookCreateDto) => api<BookResultDto>("/book", { method: "POST", body: JSON.stringify(data) }),
  purchase: (slug: string) => api<BookResultDto>(`/book/${slug}/purchase`, { method: "POST" }),
  receiptUrl: (slug: string) => `/api/backend/book/${slug}/receipt`,
};


