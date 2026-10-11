import type { BookStatus } from "@/enums/books/BookStatus";
import type { BookFilters } from "@/interfaces/books/BookFilters";
import type { SortDirection } from "@/enums/shared/SortDirection";

export interface BookFilterForm {
  q: string;
  publisher: string;
  condition: BookStatus | "";
  minPrice: string;
  maxPrice: string;
  sort: NonNullable<BookFilters["sort"]>;
  sortDirection: SortDirection;
}
