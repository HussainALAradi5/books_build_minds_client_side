"use client";
import { useState } from "react";
import { useBooks } from "./useBooks";
import { emptyBookFilters as emptyForm } from "@/constants/catalog/bookFilters";
import type { BookFilterForm } from "@/interfaces/books/BookFilterForm";
import type { BookFilters } from "@/interfaces/books/BookFilters";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Page } from "@/interfaces/shared/Page";
import { useCatalogActions } from "./useCatalogActions";

export const useBookCatalog = (initialPage: Page<BookSummary>) => {
  const [form, setForm] = useState<BookFilterForm>(emptyForm);
  const [validation, setValidation] = useState("");
  const { result, query, loading, error, run } = useBooks(initialPage);
  const actions = useCatalogActions(query, () => run(query));
  const update = <K extends keyof BookFilterForm>(key: K, value: BookFilterForm[K]) =>
    setForm((previous) => ({ ...previous, [key]: value }));
  const apply = () => {
    if (form.minPrice && form.maxPrice && Number(form.minPrice) > Number(form.maxPrice)) {
      setValidation("Minimum price must not exceed maximum price."); return;
    }
    setValidation("");
    return run({ page: 1, perPage: 3, q: form.q.trim(), publisher: form.publisher, category: form.category,
      condition: form.condition || undefined, minPrice: form.minPrice ? Number(form.minPrice) : undefined,
      maxPrice: form.maxPrice ? Number(form.maxPrice) : undefined, sort: form.sort, sortDirection: form.sortDirection });
  };
  const clear = () => { setForm(emptyForm); setValidation(""); return run({ page: 1, perPage: 3 }); };
  const pageChange = (page: number) => run({ ...query, page } as BookFilters);
  const activeFilters = [query.q && `Search: ${query.q}`, query.publisher && `Publisher: ${query.publisher}`,
    query.category && `Category: ${query.category}`,
    query.minPrice !== undefined && `From ${query.minPrice} BHD`,
    query.maxPrice !== undefined && `Up to ${query.maxPrice} BHD`].filter(Boolean) as string[];
  return { form, update, result, loading, error: validation || error, apply, clear, pageChange, activeFilters, appliedCondition: query.condition, actions };
};
