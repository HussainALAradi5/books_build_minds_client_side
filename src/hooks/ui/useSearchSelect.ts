"use client";
import { useEffect, useRef, useState } from "react";
import { createListCollection } from "@chakra-ui/react";
import type { SelectOption } from "@/interfaces/ui/SelectOption";
import type { GenericSearchSelectProps } from "@/props/custom/forms/GenericSearchSelectProps";

export const useSearchSelect = ({ value, loadOptions }: GenericSearchSelectProps) => {
  const [search, setSearch] = useState(value);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const version = useRef(0);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const id = ++version.current;
    const timer = setTimeout(async () => {
      setLoading(true); setError("");
      try {
        const result = await loadOptions(search, 1);
        if (id !== version.current) return;
        setOptions(result.items); setPage(1); setHasMore(result.hasMore);
      } catch (cause) { if (id === version.current) setError(cause instanceof Error ? cause.message : "Could not load options."); }
      finally { if (id === version.current) setLoading(false); }
    }, 250);
    return () => { clearTimeout(timer); version.current = id + 1; };
  }, [search, loadOptions, retry]);
  const more = async () => {
    const id = version.current;
    setLoading(true); setError("");
    try {
      const result = await loadOptions(search, page + 1);
      if (id !== version.current) return;
      setOptions((previous) => [...new Map([...previous, ...result.items].map((item) => [item.value, item])).values()]);
      setPage(page + 1); setHasMore(result.hasMore);
    } catch { if (id === version.current) setError("Could not load more options. Retry."); }
    finally { if (id === version.current) setLoading(false); }
  };
  const collection = createListCollection({ items: options });
  return { search, setSearch, collection, loading, error, hasMore, more, retry: () => setRetry((value) => value + 1) };
};
