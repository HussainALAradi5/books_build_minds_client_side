import { api } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import { publicApiGet } from "@/lib/publicApiClient";
import type { CreateBookInput } from "@/interfaces/books/CreateBookInput";
import type { UpdateBookPriceInput } from "@/interfaces/books/UpdateBookPriceInput";
import type { Book } from "@/interfaces/books/Book";
import type { BookFilters } from "@/interfaces/books/BookFilters";
import type { BookResult } from "@/interfaces/books/BookResult";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Page } from "@/interfaces/shared/Page";

const cleanFilters = (filters: BookFilters): BookFilters => ({
    ...filters,
    page: Math.max(1, Math.floor(filters.page || 1)),
    perPage: Math.min(50, Math.max(1, Math.floor(filters.perPage || 3))),
    q: filters.q?.trim() || undefined,
    publisher: filters.publisher?.trim() || undefined,
    category: filters.category?.trim() || undefined,
});

export const bookService = {
  catalog: (filters: BookFilters) => {
    const query = cleanFilters(filters);
    return publicApiGet<Page<BookSummary>>(`/catalog-data${buildQuery(query)}`);
  },
  get: (slug: string) => api<Book>(`/books/${encodeURIComponent(slug)}`),
  create: (book: CreateBookInput) => api<BookResult>("/books", { method: "POST", body: JSON.stringify(book) }),
  updatePrice: (slug: string, input: UpdateBookPriceInput) => api<BookResult>(`/books/${encodeURIComponent(slug)}/price`, { method: "PATCH", body: JSON.stringify(input) }),
  remove: (slug: string) => api<{ message: string }>(`/books/${encodeURIComponent(slug)}`, { method: "DELETE" }),
  managed: (filters: BookFilters) => api<Page<BookSummary>>(`/books/manage${buildQuery(filters)}`),
  export: (filters: BookFilters, format: "pdf" | "xlsx" | "csv", ids?: number[]) => api<{ base64: string }>(`/books/export${buildQuery({ ...filters, format, ids: ids?.length ? ids.join(",") : undefined })}`),
  import: (file: File) => {
    const body = new FormData();
    body.append("file", file);
    return api<{ message: string; count: number }>("/books/import", { method: "POST", body });
  },
  bulk: (ids: number[], action: "archive" | "unarchive" | "delete") =>
    api<{ message: string; count: number }>("/books/bulk", { method: "POST", body: JSON.stringify({ ids, action }) }),
};
