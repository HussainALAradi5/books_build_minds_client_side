import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";
import type { AdminDecision } from "@/enums/accounts/AdminDecision";

export interface AdminRequestFilters extends PaginationFilter {
  status?: "all" | AdminDecision;
}
