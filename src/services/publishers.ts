import { api } from "@/lib/apiClient";
import type { Publisher } from "@/interfaces/catalog/Publisher";
import type { Page } from "@/interfaces/shared/Page";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";

export const publishers = {
  all: (page = 1, query = "") => api<Page<Publisher>>(`/publishers?page=${page}&per_page=20&q=${encodeURIComponent(query)}`),
  one: (id: number) => api<Publisher>(`/publishers/${id}`),
  create: (data: { name: string; description: string; countryCode: string | null }) => api<ApiMessage & { publisher: Publisher }>("/publishers", { method: "POST", body: JSON.stringify(data) }),
};
