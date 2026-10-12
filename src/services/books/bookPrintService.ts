import { api } from "@/lib/apiClient";
import type { BookCodesDto } from "@/interfaces/books/printing/BookCodesDto";
import type { DownloadFile } from "@/interfaces/shared/files/DownloadFile";

export const bookPrintService = {
  codes: (slug: string) => api<BookCodesDto>(`/books/${encodeURIComponent(slug)}/codes`),
  download: (slug: string) => api<DownloadFile>(`/books/${encodeURIComponent(slug)}/print`),
};
