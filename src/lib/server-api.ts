import { demoBooks } from "./demo-books";
import type { Book, BookSummaryDto, PageDto } from "./types";

export function backendUrl(path: string): string {
  const base = process.env.BACKEND_URL || "http://127.0.0.1:5000";
  const apiPath = path.startsWith("/static/") ? path : `/api${path}`;
  return new URL(apiPath, base.endsWith("/") ? base : `${base}/`).toString();
}

const demoPage: PageDto<BookSummaryDto> = {
  items: demoBooks.slice(0, 3),
  pagination: { page: 1, per_page: 3, total: demoBooks.length, pages: 2, has_next: true, has_previous: false },
};

export async function getBooks(): Promise<{ page: PageDto<BookSummaryDto>; demo: boolean }> {
  try {
    const response = await fetch(backendUrl("/?per_page=3"), { cache: "no-store", signal: AbortSignal.timeout(3000) });
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
    const page = (await response.json()) as PageDto<BookSummaryDto>;
    return { page, demo: false };
  } catch {
    if (process.env.NODE_ENV === "production" && process.env.DEMO_CATALOG !== "true") throw new Error("Book API unavailable");
    return { page: demoPage, demo: true };
  }
}

export async function getBook(slug: string): Promise<{ book: Book | undefined; demo: boolean }> {
  try {
    const response = await fetch(backendUrl(`/book/${encodeURIComponent(slug)}`), { cache: "no-store", signal: AbortSignal.timeout(3000) });
    if (response.status === 404) return { book: undefined, demo: false };
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
    return { book: (await response.json()) as Book, demo: false };
  } catch {
    if (process.env.NODE_ENV === "production" && process.env.DEMO_CATALOG !== "true") throw new Error("Book API unavailable");
    return { book: demoBooks.find((book) => book.slug === slug), demo: true };
  }
}




