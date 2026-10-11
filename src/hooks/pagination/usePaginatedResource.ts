"use client";

import { useState } from "react";
import type { PageDto } from "@/lib/types";

export function usePaginatedResource<T, Q extends { page?: number }>(initial: PageDto<T>, load: (query: Q) => Promise<PageDto<T>>, initialQuery: Q) {
  const [result, setResult] = useState(initial);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run(next: Q) {
    setLoading(true); setError("");
    try {
      const page = await load(next);
      setResult(page); setQuery(next);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load results.");
    } finally { setLoading(false); }
  }

  return { result, query, loading, error, run, setResult };
}


