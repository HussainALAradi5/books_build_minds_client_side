import { api } from "@/lib/apiClient";
import type { ReceiptFile } from "@/interfaces/receipts/ReceiptFile";

export const receiptService = {
  download: (slug: string) => api<ReceiptFile>(`/books/${encodeURIComponent(slug)}/receipt`),
};
