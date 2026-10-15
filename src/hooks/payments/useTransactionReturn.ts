"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { transactionService } from "@/services/payments/transactionService";
import { TransactionStatus } from "@/enums/payments/TransactionStatus";
import type { Transaction } from "@/interfaces/payments/Transaction";

export const useTransactionReturn = () => {
  const id = useSearchParams()?.get("transaction");
  const router = useRouter();
  const [item, setItem] = useState<Transaction | null>(null);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    if (!id) return;
    const result = await transactionService.get(id);
    setItem(result); setError("");
    return result;
  }, [id]);
  useEffect(() => {
    if (!id) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    const poll = async () => {
      try {
        const result = await transactionService.get(id);
        if (stopped) return;
        setItem(result); setError("");
        if (result.status === TransactionStatus.Completed) router.refresh();
        else if (result.status === TransactionStatus.Pending && ++attempts < 40) timer = setTimeout(poll, 3000);
      } catch (cause) { if (!stopped) setError(cause instanceof Error ? cause.message : "Could not check payment."); }
    };
    timer = setTimeout(poll, 0);
    return () => { stopped = true; clearTimeout(timer); };
  }, [id, router]);
  return { item, error, load: async () => { await load(); router.refresh(); } };
};
