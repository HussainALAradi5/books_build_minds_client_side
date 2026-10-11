"use client";

import { useEffect, useState } from "react";
import { useBook } from "./useBook";
import type { LoanActionsProps } from "@/props/books/LoanActionsProps";
import type { Loan } from "@/interfaces/library/Loan";
import { loans } from "@/services/loans";

export const useBookLoan = ({ book: initialBook, signedIn }: LoanActionsProps) => {
  const { book, refresh, error: bookError } = useBook(initialBook);
  const [loan, setLoan] = useState<Loan | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!signedIn) return;
    let live = true;
    loans.current(book.slug).then((result) => { if (live) setLoan(result.loan); }).catch(() => {});
    return () => { live = false; };
  }, [book.slug, signedIn]);

  const change = async (action: "borrow" | "rent" | "return") => {
    setBusy(true); setMessage("");
    try {
      const result = action === "borrow" ? await loans.borrow(book.slug) : action === "rent" ? await loans.rent(book.slug) : await loans.return(book.slug);
      setLoan(action === "return" ? null : result.loan);
      await refresh();
      setMessage(result.message);
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Could not update loan."); }
    finally { setBusy(false); }
  };

  return { book, loan, busy, message, bookError, change };
};
