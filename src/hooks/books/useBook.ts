"use client";

import { useState } from "react";
import type { Book } from "@/interfaces/books/Book";
import { bookService } from "@/services/bookService";

export const useBook = (initialBook: Book) => {
  const [book, setBook] = useState(initialBook);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true); setError("");
    try { setBook(await bookService.get(initialBook.slug)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not refresh book."); }
    finally { setLoading(false); }
  };

  return { book, loading, error, refresh };
};
