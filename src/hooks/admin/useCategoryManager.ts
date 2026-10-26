"use client";

import { useEffect, useState, type FormEvent } from "react";
import { categories } from "@/services/categories";
import type { Category } from "@/interfaces/catalog/Category";
import type { Pagination } from "@/interfaces/shared/Pagination";

export const useCategoryManager = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [items, setItems] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await categories.all(page, query);
        if (active) { setItems(result.items); setPagination(result.pagination); setError(""); }
      } catch (cause) { if (active) setError(cause instanceof Error ? cause.message : "Could not load categories."); }
      finally { if (active) setLoading(false); }
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [page, query, revision]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError("");
    try { await categories.create(name.trim()); setName(""); setRevision((value) => value + 1); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not add category."); }
    finally { setBusy(false); }
  };
  return { name, setName, query, updateQuery: (value: string) => { setQuery(value); setPage(1); }, page, setPage,
    items, pagination, loading, busy, error, submit };
};
