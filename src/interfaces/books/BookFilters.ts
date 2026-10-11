import type { BookStatus } from "@/enums/books/BookStatus";
import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";

export interface BookFilters extends PaginationFilter {
  q?: string;
  publisher?: string;
  condition?: BookStatus;
  minPrice?: number;
  maxPrice?: number;
  sort?: "recent" | "title" | "rating" | "price";
}
