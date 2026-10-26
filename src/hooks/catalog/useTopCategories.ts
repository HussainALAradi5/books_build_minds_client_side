"use client";

import { useEffect, useState } from "react";
import { categories } from "@/services/categories";
import type { CategoryTopGroup } from "@/interfaces/catalog/CategoryTopGroup";
import type { Pagination } from "@/interfaces/shared/Pagination";

export const useTopCategories = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<"most_rated" | "best_selling">("most_rated");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<CategoryTopGroup[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!open) return;
    let active = true;
    const load = async () => {
      setLoading(true); setError("");
      try {
        const result = await categories.top(page, sort);
        if (active) { setItems(result.items); setPagination(result.pagination); }
      } catch (cause) { if (active) setError(cause instanceof Error ? cause.message : "Could not load rankings."); }
      finally { if (active) setLoading(false); }
    };
    void load();
    return () => { active = false; };
  }, [open, page, sort]);
  return { open, toggle: () => setOpen((value) => !value), sort, chooseSort: (value: "most_rated" | "best_selling") => { setSort(value); setPage(1); },
    items, pagination, loading, error, setPage };
};
