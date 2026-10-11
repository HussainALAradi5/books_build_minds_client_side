"use client";

import { useState } from "react";
import type { Page } from "@/interfaces/shared/Page";

export const usePaginatedResource = <T, Q extends { page?: number }>(initial: Page<T>, load: (query: Q) => Promise<Page<T>>, initialQuery: Q) => {
  const [result, setResult] = useState(initial);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async (next: Q) => {
    setLoading(true); setError("");
    try {
      const page = await load(next);
      setResult(page); setQuery(next);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load results.");
    } finally { setLoading(false); }
  };

  return { result, query, loading, error, run, setResult };
};
