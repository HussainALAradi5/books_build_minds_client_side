import type { LoanStatus } from "@/enums/library/LoanStatus";
import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";

export interface LoanFilters extends PaginationFilter {
  status?: LoanStatus | "all";
}
