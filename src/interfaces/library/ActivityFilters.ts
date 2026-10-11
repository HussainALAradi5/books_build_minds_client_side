import type { LibraryActionType } from "@/enums/library/LibraryActionType";
import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";

export interface ActivityFilters extends PaginationFilter {
  action?: LibraryActionType | "all";
}
