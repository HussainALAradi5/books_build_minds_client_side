import { api } from "@/lib/apiClient";
import type { Publisher } from "@/interfaces/catalog/Publisher";
import type { Page } from "@/interfaces/shared/Page";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";

export const publishers = {
  all: (page = 1) => api<Page<Publisher>>(`/publishers?page=${page}&per_page=20`),
  one: (id: number) => api<Publisher>(`/publishers/${id}`),
  create: (data: { name: string; description: string; countryCode: string | null }) => api<ApiMessage & { publisher: Publisher }>("/publishers", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: { name: string; description: string; countryCode: string | null }) => api<ApiMessage & { publisher: Publisher }>(`/publishers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};
