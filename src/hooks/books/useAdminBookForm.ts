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
