import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { Page } from "@/interfaces/shared/Page";
import type { DownloadFile } from "@/interfaces/shared/files/DownloadFile";
import type { Transaction } from "@/interfaces/payments/Transaction";
import type { TransactionFilter } from "@/interfaces/payments/TransactionFilter";
import type { CheckoutInputDto } from "@/interfaces/payments/CheckoutInputDto";

export const transactionService = {
  checkout: (input: CheckoutInputDto) => api<Transaction>("/transactions/checkout", { method: "POST", body: JSON.stringify(input) }),
  list: (filter: TransactionFilter = {}) => api<Page<Transaction>>(`/transactions${buildQuery(filter)}`),
  get: (id: string) => api<Transaction>(`/transactions/${encodeURIComponent(id)}`),
  sync: (id: string) => api<Transaction>(`/transactions/${encodeURIComponent(id)}/sync`, { method: "POST" }),
  cancel: (id: string) => api<Transaction>(`/transactions/${encodeURIComponent(id)}/cancel`, { method: "POST" }),
  receipt: (id: string) => api<DownloadFile>(`/transactions/${encodeURIComponent(id)}/receipt`),
};
