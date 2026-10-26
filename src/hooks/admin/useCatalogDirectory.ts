"use client";

import { useEffect, useState } from "react";
import { authors } from "@/services/authors";
import { publishers } from "@/services/publishers";
import type { Author } from "@/interfaces/catalog/Author";
import type { Publisher } from "@/interfaces/catalog/Publisher";
import type { Pagination } from "@/interfaces/shared/Pagination";

export const useCatalogDirectory = (kind: "author" | "publisher", revision: number) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<(Author | Publisher)[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true); setError("");
      try {
        const result = kind === "author" ? await authors.all(page, query) : await publishers.all(page, query);
        if (active) { setItems(result.items); setPagination(result.pagination); }
      } catch (cause) { if (active) setError(cause instanceof Error ? cause.message : "Could not load catalog."); }
      finally { if (active) setLoading(false); }
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [kind, page, query, revision]);
  return { query, updateQuery: (value: string) => { setQuery(value); setPage(1); }, page, setPage, items, pagination, loading, error };
};
