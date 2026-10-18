"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { bookService } from "@/services/bookService";
import type { BookPriceFormProps } from "@/props/books/BookPriceFormProps";

export const useBookPriceEdit = ({ book, onSaved }: BookPriceFormProps) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(new FormData(event.currentTarget).get("price"));
    if (!Number.isFinite(price) || price <= 0) { setError("Enter a positive price."); return; }
    setBusy(true); setError("");
    try {
      await bookService.updatePrice(book.slug, { price });
      onSaved();
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update the price."); }
    finally { setBusy(false); }
  };

  return { busy, error, submit };
};
