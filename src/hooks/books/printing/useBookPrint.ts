"use client";

import { useState } from "react";
import { bookPrintService } from "@/services/books/bookPrintService";
import { downloadBase64 } from "@/lib/downloadBase64";
import type { BookCodesDto } from "@/interfaces/books/printing/BookCodesDto";

export const useBookPrint = (slug: string) => {
  const [codes, setCodes] = useState<BookCodesDto | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const execute = async (action: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    setError("");
    try { await action(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load book printing data."); }
    finally { setBusy(false); }
  };
  const download = () => execute(async () => {
    const file = await bookPrintService.download(slug);
    downloadBase64(file.base64, `${slug}-book.pdf`, "application/pdf");
  });
  const toggleCodes = () => execute(async () => {
    setCodes(codes ? null : await bookPrintService.codes(slug));
  });
  return { codes, busy, error, download, toggleCodes };
};
