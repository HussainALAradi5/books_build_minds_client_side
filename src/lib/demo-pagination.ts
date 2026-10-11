import { demoBooks } from "./demo-books";
import type { PageDto, BookSummaryDto } from "./types";
import type { BookFilters } from "@/services/books";

export function demoBookPage(filters: BookFilters): PageDto<BookSummaryDto> {
  const q = filters.q?.trim().toLowerCase() || "";
  const publisher = filters.publisher?.trim().toLowerCase() || "";
  const items = demoBooks.filter((book) =>
    [book.title, book.author, book.publisher, book.isbn].some((value) => value.toLowerCase().includes(q)) &&
    book.publisher.toLowerCase().includes(publisher) &&
    (filters.min_price === undefined || book.price >= filters.min_price) &&
    (filters.max_price === undefined || book.price <= filters.max_price)
  );
  if (filters.sort === "rating") items.sort((a, b) => b.average_rating - a.average_rating);
  if (filters.sort === "title") items.sort((a, b) => a.title.localeCompare(b.title));
  if (filters.sort === "price_asc") items.sort((a, b) => a.price - b.price);
  if (filters.sort === "price_desc") items.sort((a, b) => b.price - a.price);
  const perPage = filters.per_page || 3;
  const pages = Math.ceil(items.length / perPage);
  const page = Math.min(filters.page || 1, Math.max(1, pages));
  return { items: items.slice((page - 1) * perPage, page * perPage), pagination: {
    page, per_page: perPage, total: items.length, pages,
    has_next: page < pages, has_previous: page > 1,
  } };
}


