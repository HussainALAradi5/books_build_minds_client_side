import { categories } from "@/services/categories";
import type { SelectOptionPage } from "@/interfaces/ui/SelectOptionPage";

export const categoryFilterOptions = async (query: string, page: number): Promise<SelectOptionPage> => {
  const result = await categories.all(page, query);
  return { items: result.items.map((item) => ({ value: item.slug, label: item.name })), hasMore: result.pagination.hasNext };
};
