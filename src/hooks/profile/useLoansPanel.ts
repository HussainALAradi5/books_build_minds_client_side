"use client";

import { useCallback, useEffect, useState } from "react";
import { LoanStatus } from "@/enums/library/LoanStatus";
import type { Loan } from "@/interfaces/library/Loan";
import type { Page } from "@/interfaces/shared/Page";
import { loans } from "@/services/loans";

export const useLoansPanel = (userId: number) => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<LoanStatus | "all">("all");
  const [result, setResult] = useState<Page<Loan> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { setResult(await loans.all(userId, { page, status })); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load loans."); }
    finally { setLoading(false); }
  }, [userId, page, status]);
  useEffect(() => { queueMicrotask(() => void load()); }, [load]);
  const returnBook = async (slug: string) => {
    try { await loans.return(slug); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not return book."); }
  };
  const changeStatus = (next: LoanStatus | "all") => { setStatus(next); setPage(1); };
  return { page, setPage, status, changeStatus, result, error, loading, returnBook };
};
