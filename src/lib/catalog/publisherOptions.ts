import { publishers } from "@/services/publishers";
import type { SelectOptionPage } from "@/interfaces/ui/SelectOptionPage";

export const publisherOptions = async (query: string, page: number): Promise<SelectOptionPage> => {
  const result = await publishers.all(page, query);
  return { items: result.items.map((item) => ({ value: item.name, label: item.name })), hasMore: result.pagination.hasNext };
};
