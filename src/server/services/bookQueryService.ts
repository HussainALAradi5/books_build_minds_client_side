import { backendUrl } from "@/config/backendUrl";
import { fromBackend } from "@/lib/caseConversion";
import type { Book } from "@/interfaces/books/Book";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Page } from "@/interfaces/shared/Page";

const getJson = async <T,>(path: string): Promise<T | undefined> => {
  const response = await fetch(backendUrl(path), { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error(`Book API returned ${response.status}`);
  return fromBackend<T>(await response.json());
};

export const bookQueryService = {
  catalog: async (): Promise<Page<BookSummary>> => {
    const page = await getJson<Page<BookSummary>>("/?per_page=3");
    if (!page) throw new Error("Catalog API returned 404");
    return page;
  },
  catalogOrUnavailable: async (): Promise<Page<BookSummary> | undefined> => {
    try { return await bookQueryService.catalog(); }
    catch (error) {
      if (error instanceof TypeError || error instanceof DOMException && error.name === "TimeoutError") {
        console.warn("Catalog API unavailable. Start Flask or check BACKEND_URL.");
      } else {
        console.error("Catalog API returned an unexpected error", error);
      }
      return undefined;
    }
  },
  get: (slug: string) => getJson<Book>(`/book/${encodeURIComponent(slug)}`),
};
