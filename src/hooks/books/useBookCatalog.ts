"use client";

import { useState } from "react";
import { useBooks } from "./useBooks";
import type { BookFilterForm } from "@/interfaces/books/BookFilterForm";
import type { BookFilters } from "@/interfaces/books/BookFilters";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Page } from "@/interfaces/shared/Page";
import { SortDirection } from "@/enums/shared/SortDirection";

const emptyForm: BookFilterForm = {
  q: "", publisher: "", condition: "", minPrice: "", maxPrice: "", sort: "recent", sortDirection: SortDirection.Desc,
};

export const useBookCatalog = (initialPage: Page<BookSummary>) => {
  const [form, setForm] = useState<BookFilterForm>(emptyForm);
  const { result, query, loading, error, run } = useBooks(initialPage);

  const update = <K extends keyof BookFilterForm>(key: K, value: BookFilterForm[K]) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const apply = () => run({
    page: 1, perPage: 3, q: form.q, publisher: form.publisher,
    condition: form.condition || undefined,
    minPrice: form.minPrice ? Number(form.minPrice) : undefined,
    maxPrice: form.maxPrice ? Number(form.maxPrice) : undefined,
    sort: form.sort, sortDirection: form.sortDirection,
  });

  const clear = () => { setForm(emptyForm); void run({ page: 1, perPage: 3 }); };
  const pageChange = (page: number) => run({ ...query, page } as BookFilters);

  return { form, update, result, loading, error, apply, clear, pageChange };
};
