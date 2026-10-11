"use client";

import { useEffect, useState } from "react";
import type { AdminRequest } from "@/interfaces/accounts/AdminRequest";
import type { AdminRequestFilters } from "@/interfaces/accounts/AdminRequestFilters";
import type { Page } from "@/interfaces/shared/Page";
import { accounts } from "@/services/accounts";

const emptyPage: Page<AdminRequest> = { items: [], pagination: { page: 1, perPage: 10, total: 0, pages: 0, hasNext: false, hasPrevious: false } };

export const useAdminRequests = () => {
  const [status, setStatus] = useState<NonNullable<AdminRequestFilters["status"]>>("pending");
  const [filters, setFilters] = useState<AdminRequestFilters>({ page: 1, status: "pending" });
  const [result, setResult] = useState(emptyPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    accounts.adminRequests(filters).then((page) => { if (live) { setResult(page); setError(""); } })
      .catch((cause) => { if (live) setError(cause instanceof Error ? cause.message : "Could not load requests."); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [filters]);

  const apply = (next: AdminRequestFilters) => { setLoading(true); setFilters(next); };
  const clear = () => { setStatus("all"); apply({ page: 1, status: "all" }); };
  const review = async (id: number, accepted: boolean) => {
    try { await accounts.reviewAdminRequest(id, accepted); setResult(await accounts.adminRequests(filters)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not review request."); }
  };
  return { status, setStatus, filters, result, loading, error, apply, clear, review };
};
