"use client";

import { useEffect, useState } from "react";
import { LibraryActionType } from "@/enums/library/LibraryActionType";
import type { LibraryActivity } from "@/interfaces/library/LibraryActivity";
import type { Page } from "@/interfaces/shared/Page";
import { accounts } from "@/services/accounts";

const emptyPage: Page<LibraryActivity> = { items: [], pagination: { page: 1, perPage: 10, total: 0, pages: 0, hasNext: false, hasPrevious: false } };

export const useActivityPanel = (userId: number) => {
  const [selected, setSelected] = useState<LibraryActionType | "all">("all");
  const [query, setQuery] = useState<{ page: number; action: LibraryActionType | "all" }>({ page: 1, action: "all" });
  const [result, setResult] = useState(emptyPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    accounts.activities(userId, query).then((page) => { if (live) { setResult(page); setError(""); } })
      .catch((cause) => { if (live) setError(cause instanceof Error ? cause.message : "Could not load activity."); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [userId, query]);

  const apply = (page: number, action = selected) => { setLoading(true); setQuery({ page, action }); };
  const clear = () => { setSelected("all"); apply(1, "all"); };
  return { selected, setSelected, query, result, loading, error, apply, clear };
};
