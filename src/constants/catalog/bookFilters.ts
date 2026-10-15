import { SortDirection } from "@/enums/shared/SortDirection";
import type { BookFilterForm } from "@/interfaces/books/BookFilterForm";

export const emptyBookFilters: BookFilterForm = {
  q: "", publisher: "", condition: "", minPrice: "", maxPrice: "", sort: "recent", sortDirection: SortDirection.Desc,
};
export const bookSortOptions = [
  { value: "recent", label: "Date added" }, { value: "title", label: "Title" },
  { value: "rating", label: "Rating" }, { value: "price", label: "Price" },
] satisfies { value: BookFilterForm["sort"]; label: string }[];
