import { api } from "@/lib/apiClient";
import type { Author } from "@/interfaces/catalog/Author";
import type { Page } from "@/interfaces/shared/Page";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";

export const authors = {
  all: (page = 1) => api<Page<Author>>(`/authors?page=${page}&per_page=20`),
  one: (id: number) => api<Author>(`/authors/${id}`),
  create: (data: { name: string; description: string; countryCode: string | null }) => api<ApiMessage & { author: Author }>("/authors", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: { name: string; description: string; countryCode: string | null }) => api<ApiMessage & { author: Author }>(`/authors/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};
