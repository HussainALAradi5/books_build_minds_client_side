import { authors } from "@/services/authors";
import type { SelectOptionPage } from "@/interfaces/ui/SelectOptionPage";

export const authorOptions = async (query: string, page: number): Promise<SelectOptionPage> => {
  const result = await authors.all(page, query);
  return { items: result.items.map((item) => ({ value: item.name, label: item.name })), hasMore: result.pagination.hasNext };
};
