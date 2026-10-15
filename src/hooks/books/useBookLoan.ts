"use client";
import { useCallback, useEffect, useState } from "react";
import { useBook } from "./useBook";
import { useBookEvents } from "./useBookEvents";
import type { LoanActionsProps } from "@/props/books/LoanActionsProps";
import type { Loan } from "@/interfaces/library/Loan";
import { loans } from "@/services/loans";

export const useBookLoan = ({ book: initialBook, signedIn }: LoanActionsProps) => {
  const { book, refresh, error: bookError } = useBook(initialBook);
  const [loan, setLoan] = useState<Loan | null>(null);
  const [message, setMessage] = useState("");
  const reload = useCallback(async () => {
    await refresh();
    if (signedIn) setLoan((await loans.current(initialBook.slug)).loan);
  }, [refresh, signedIn, initialBook.slug]);
  const onEvent = useCallback(() => { void reload().catch(() => setMessage("Could not refresh the loan. Try again.")); }, [reload]);
  useBookEvents(initialBook.slug, onEvent);
  useEffect(() => { const timer = setTimeout(onEvent, 0); return () => clearTimeout(timer); }, [onEvent]);
  const returnBook = async () => { await loans.return(book.slug); await reload(); setMessage("Book returned."); };
  const borrowed = async () => { await reload(); setMessage("Book borrowed successfully."); };
  return { book, loan, message, bookError, returnBook, borrowed };
};
