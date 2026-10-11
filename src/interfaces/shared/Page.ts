import type { Pagination } from "./Pagination";
export interface Page<T> { items: T[]; pagination: Pagination }
