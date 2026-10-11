import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";
import type { Page } from "@/interfaces/shared/Page";
import type { Review } from "@/interfaces/books/reviews/Review";
import type { ReviewFilters } from "@/interfaces/books/reviews/ReviewFilters";
import type { ReviewInput } from "@/interfaces/books/reviews/ReviewInput";

const path = (slug: string) => `/books/${encodeURIComponent(slug)}/reviews`;

export const reviewService = {
  all: (slug: string, filters: ReviewFilters = {}) => api<Page<Review>>(`${path(slug)}${buildQuery({ perPage: 5, ...filters })}`),
  mine: (slug: string) => api<{ review: Review | null }>(`${path(slug)}/mine`),
  create: (slug: string, input: ReviewInput) => api<ApiMessage & { review: Review }>(path(slug), { method: "POST", body: JSON.stringify(input) }),
  edit: (slug: string, id: number, input: ReviewInput) => api<ApiMessage & { review: Review }>(`${path(slug)}/${id}`, { method: "PUT", body: JSON.stringify(input) }),
  remove: (slug: string, id: number) => api<ApiMessage>(`${path(slug)}/${id}`, { method: "DELETE" }),
};
