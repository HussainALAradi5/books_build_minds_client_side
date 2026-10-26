"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { CreateBookInput } from "@/interfaces/books/CreateBookInput";
import { bookFormFields } from "@/constants/books/bookFormFields";
import { formDataToObject } from "@/lib/formDataToObject";
import { bookService } from "@/services/bookService";

export const useAdminBookForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [createdBookId, setCreatedBookId] = useState<number | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setBusy(true);
    const form = event.currentTarget;
    const book = formDataToObject<CreateBookInput>(new FormData(form), bookFormFields);
    if (!book.author || !book.publisher) { setError("Select an existing author and publisher. Add missing profiles in Catalog first."); setBusy(false); return; }
    if (!book.categoryIds.length || book.categoryIds.length > 5) { setError("Choose between 1 and 5 categories."); setBusy(false); return; }
    try {
      const result = await bookService.create(book);
      setCreatedBookId(result.book.bookId);
      form.reset();
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not add book."); }
    finally { setBusy(false); }
  };

  return { error, busy, createdBookId, submit };
};
