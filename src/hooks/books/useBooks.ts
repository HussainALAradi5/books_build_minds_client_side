"use client";

import { usePaginatedResource } from "@/hooks/pagination/usePaginatedResource";
import type { BookFilters } from "@/interfaces/books/BookFilters";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Page } from "@/interfaces/shared/Page";
import { bookService } from "@/services/bookService";

export const useBooks = (initialPage: Page<BookSummary>) => {
  return usePaginatedResource(initialPage, (filters: BookFilters) => bookService.catalog(filters),
    { page: 1, perPage: 3 } as BookFilters);
};
