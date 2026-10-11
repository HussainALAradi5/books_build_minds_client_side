import type { Pagination } from "@/interfaces/shared/Pagination";
export interface GenericPaginationProps { pagination: Pagination; onPageChange: (page: number) => void; loading?: boolean }
