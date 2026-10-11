import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";

export interface AdminRequestFilters extends PaginationFilter {
  status?: "all" | "pending" | "accepted" | "rejected";
}
