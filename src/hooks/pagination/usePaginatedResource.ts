"use client";

import { useRef, useState } from "react";
import type { Page } from "@/interfaces/shared/Page";

export const usePaginatedResource = <T, Q extends { page?: number }>(initial: Page<T>, load: (query: Q) => Promise<Page<T>>, initialQuery: Q) => {
  const [result, setResult] = useState(initial);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const latestRequest = useRef(0);

  const run = async (next: Q) => {
    const requestId = ++latestRequest.current;
    setLoading(true); setError("");
    try {
      const page = await load(next);
      if (requestId !== latestRequest.current) return;
      setResult(page); setQuery(next);
    } catch (cause) {
      if (requestId !== latestRequest.current) return;
      setError(cause instanceof Error ? cause.message : "Could not load results.");
    } finally { if (requestId === latestRequest.current) setLoading(false); }
  };

  return { result, query, loading, error, run, setResult };
};
