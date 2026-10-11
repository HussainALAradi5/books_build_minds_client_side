"use client";

import { useCallback, useEffect, useState } from "react";
import { SortDirection } from "@/enums/shared/SortDirection";
import type { BookFilters } from "@/interfaces/books/BookFilters";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Page } from "@/interfaces/shared/Page";
import { bookService } from "@/services/bookService";
import { downloadBase64 } from "@/lib/downloadBase64";

const emptyPage: Page<BookSummary> = { items: [], pagination: { page: 1, perPage: 10, total: 0, pages: 0, hasNext: false, hasPrevious: false } };
const initialFilters: BookFilters = { page: 1, perPage: 10, sort: "recent", sortDirection: SortDirection.Desc };

export const useAdminInventory = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<BookFilters>(initialFilters);
  const [result, setResult] = useState(emptyPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const load = useCallback(async (query: BookFilters) => {
    setLoading(true);
    try { setResult(await bookService.managed(query)); setError(""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load inventory."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => { void load(filters); }, 0);
    return () => window.clearTimeout(timer);
  }, [filters, load]);
  const apply = () => setFilters({ ...filters, page: 1, q: search.trim() || undefined });
  const clear = () => { setSearch(""); setFilters(initialFilters); };
  const pageChange = (page: number) => setFilters((previous) => ({ ...previous, page }));
  const exportRows = async (format: "pdf" | "xlsx" | "csv") => {
    const result = await bookService.export(filters, format);
    const mimeType = format === "pdf" ? "application/pdf" : format === "csv" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    downloadBase64(result.base64, `library-books.${format}`, mimeType);
  };
  const importRows = async (file: File) => {
    const result = await bookService.import(file);
    setMessage(`${result.count} books imported.`);
    await load(filters);
  };
  const bulk = async (ids: (string | number)[], action: string) => {
    if (!["archive", "unarchive", "delete"].includes(action)) throw new Error("Unsupported bulk action.");
    const result = await bookService.bulk(ids.map(Number), action as "archive" | "unarchive" | "delete");
    setMessage(`${result.count} books updated.`);
    await load(filters);
  };
  return { search, setSearch, filters, result, loading, error, message, apply, clear, pageChange, exportRows, importRows, bulk };
};
