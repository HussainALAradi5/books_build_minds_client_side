import type { SortDirection } from "@/enums/shared/SortDirection";

export interface PaginationFilter {
  page?: number;
  perPage?: number;
  sortDirection?: SortDirection;
}
