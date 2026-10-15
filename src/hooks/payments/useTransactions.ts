"use client";
import { useCallback, useEffect, useState } from "react";
import { transactionService } from "@/services/payments/transactionService";
import type { Page } from "@/interfaces/shared/Page";
import type { Transaction } from "@/interfaces/payments/Transaction";
import type { TransactionStatus } from "@/enums/payments/TransactionStatus";

export const useTransactions = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<TransactionStatus | "">("");
  const [result, setResult] = useState<Page<Transaction> | null>(null);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try { setResult(await transactionService.list({ page, perPage: 5, status: status || undefined })); setError(""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load transactions."); }
  }, [page, status]);
  useEffect(() => { const timer = setTimeout(() => void load(), 0); return () => clearTimeout(timer); }, [load]);
  return { result, error, load, page, setPage, status, changeStatus: (value: TransactionStatus | "") => { setStatus(value); setPage(1); } };
};
