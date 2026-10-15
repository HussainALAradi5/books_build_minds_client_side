import type { PaginationFilter } from "@/interfaces/shared/PaginationFilter";
import type { TransactionStatus } from "@/enums/payments/TransactionStatus";

export interface TransactionFilter extends PaginationFilter {
  status?: TransactionStatus;
}
