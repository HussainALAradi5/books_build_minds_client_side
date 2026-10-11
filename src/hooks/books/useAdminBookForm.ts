"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { CreateBookInput } from "@/interfaces/books/CreateBookInput";
import { bookFormFields } from "@/features/admin/bookFormConfig";
import { formDataToObject } from "@/lib/formDataToObject";
import { bookService } from "@/services/bookService";
import type { Book } from "@/interfaces/books/Book";

export const useAdminBookForm = (initialBook?: Book) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [createdBookId, setCreatedBookId] = useState<number | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setBusy(true);
    const form = event.currentTarget;
    const book = formDataToObject<CreateBookInput>(new FormData(form), bookFormFields);
    try {
      const result = initialBook ? await bookService.update(initialBook.slug, book) : await bookService.create(book);
      setCreatedBookId(result.book.bookId);
      if (!initialBook) form.reset();
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not add book."); }
    finally { setBusy(false); }
  };

  return { error, busy, createdBookId, submit };
};
