import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";
import type { ReviewSort } from "@/enums/books/ReviewSort";

export interface ReviewFilters extends PaginationFilter {
  includeDeleted?: boolean;
  q?: string;
  minRating?: number;
  sort?: ReviewSort;
}
