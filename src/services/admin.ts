import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { AdminRequestDto, MessageDto, PageDto } from "@/lib/types";

export const admin = {
  requests: (filters: { page?: number; status?: "all" | "pending" | "accepted" | "rejected" } = {}) => api<PageDto<AdminRequestDto>>(`/admin-requests${buildQuery(filters)}`),
  requestAccess: (reason_for_request: string) => api<MessageDto & { request: AdminRequestDto }>("/admin-requests", { method: "POST", body: JSON.stringify({ reason_for_request }) }),
  review: (id: number, is_accepted: boolean) => api<MessageDto & { request: AdminRequestDto }>(`/admin-requests/${id}`, { method: "PATCH", body: JSON.stringify({ is_accepted }) }),
};


