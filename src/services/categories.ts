import { api } from "@/lib/apiClient";
import type { Category } from "@/interfaces/catalog/Category";
import type { CategoryTopGroup } from "@/interfaces/catalog/CategoryTopGroup";
import type { Page } from "@/interfaces/shared/Page";

export const categories = {
  all: (page = 1, query = "") => api<Page<Category>>(`/categories?page=${page}&per_page=20&q=${encodeURIComponent(query)}`),
  create: (name: string) => api<{ message: string; category: Category }>("/categories", { method: "POST", body: JSON.stringify({ name }) }),
  top: (page = 1, sort: "most_rated" | "best_selling" = "most_rated") =>
    api<Page<CategoryTopGroup>>(`/categories/top?page=${page}&per_page=6&sort=${sort}`),
};
