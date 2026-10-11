import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { BookSummaryDto, MessageDto, PageDto, UserDto } from "@/lib/types";

export const accounts = {
  profile: (id: number) => api<UserDto>(`/profile/${id}`),
  edit: (id: number, data: { user_name?: string; email?: string; password?: string }) => api<MessageDto & { user: UserDto }>(`/profile/${id}/edit`, { method: "PUT", body: JSON.stringify(data) }),
  purchasedBooks: (id: number, page = 1) => api<PageDto<BookSummaryDto>>(`/profile/${id}/books${buildQuery({ page })}`),
};


