import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { AdminRequest } from "@/interfaces/accounts/AdminRequest";
import type { AdminRequestFilters } from "@/interfaces/accounts/AdminRequestFilters";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { LibraryActivity } from "@/interfaces/library/LibraryActivity";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";
import type { Page } from "@/interfaces/shared/Page";
import type { UpdateProfileInput } from "@/interfaces/accounts/UpdateProfileInput";
import type { User } from "@/interfaces/accounts/User";
import type { ActivityFilters } from "@/interfaces/library/ActivityFilters";
import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";

export const accounts = {
  profile: (id: number) => api<User>(`/accounts/${id}`),
  edit: (id: number, data: UpdateProfileInput) => api<ApiMessage & { user: User }>(`/accounts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  purchasedBooks: (id: number, filters: PaginationFilter = {}) => api<Page<BookSummary>>(`/accounts/${id}/books${buildQuery(filters)}`),
  activities: (id: number, filters: ActivityFilters = {}) =>
    api<Page<LibraryActivity>>(`/accounts/${id}/activities${buildQuery(filters)}`),
  adminRequests: (filters: AdminRequestFilters = {}) => api<Page<AdminRequest>>(`/accounts/admin-requests${buildQuery(filters)}`),
  requestAdminAccess: (reasonForRequest: string) => api<ApiMessage & { request: AdminRequest }>("/accounts/admin-requests", { method: "POST", body: JSON.stringify({ reasonForRequest }) }),
  reviewAdminRequest: (id: number, isAccepted: boolean) => api<ApiMessage & { request: AdminRequest }>(`/accounts/admin-requests/${id}`, { method: "PATCH", body: JSON.stringify({ isAccepted }) }),
};
