import { fromBackend } from "./caseConversion";
import type { Book } from "@/interfaces/books/Book";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Page } from "@/interfaces/shared/Page";

export const backendUrl = (path: string): string => {
  const base = process.env.BACKEND_URL || "http://127.0.0.1:5000";
  const apiPath = path.startsWith("/static/") ? path : `/api${path}`;
  return new URL(apiPath, base.endsWith("/") ? base : `${base}/`).toString();
};

export const getBooks = async (): Promise<Page<BookSummary>> => {
  const response = await fetch(backendUrl("/?per_page=3"), { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error(`Book API returned ${response.status}`);
  return fromBackend<Page<BookSummary>>(await response.json());
};

export const getBook = async (slug: string): Promise<Book | undefined> => {
  const response = await fetch(backendUrl(`/book/${encodeURIComponent(slug)}`), { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error(`Book API returned ${response.status}`);
  return fromBackend<Book>(await response.json());
};
