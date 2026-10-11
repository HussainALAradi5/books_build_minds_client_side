import { api } from "@/lib/apiClient";
import type { Country } from "@/interfaces/catalog/Country";
import type { Page } from "@/interfaces/shared/Page";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";

export const countries = {
  all: (page = 1) => api<Page<Country>>(`/countries?page=${page}&per_page=50`),
  sync: () => api<ApiMessage & { count: number }>("/countries/sync", { method: "POST" }),
};
