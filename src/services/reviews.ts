import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { MessageDto, ReviewDto, PageDto } from "@/lib/types";

export const reviews = {
  all: (slug: string, filters: { page?: number; per_page?: number; min_rating?: number; sort?: "recent" | "rating" } = {}) => api<PageDto<ReviewDto>>(`/book/${slug}/review${buildQuery(filters)}`),
  create: (slug: string, data: { rating: number; comment: string }) => api<MessageDto & { review: ReviewDto }>(`/book/${slug}/review`, { method: "POST", body: JSON.stringify(data) }),
  edit: (slug: string, id: number, data: { rating: number; comment: string }) => api<MessageDto & { review: ReviewDto }>(`/book/${slug}/review/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (slug: string, id: number) => api<MessageDto>(`/book/${slug}/review/${id}`, { method: "DELETE" }),
};


