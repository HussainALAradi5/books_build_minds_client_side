"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookService } from "@/services/bookService";

export const useBookPurchase = (slug: string, purchased: boolean) => {
  const router = useRouter();
  const [owned, setOwned] = useState(purchased);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const purchase = async () => {
    setBusy(true); setMessage("");
    try { await bookService.purchase(slug); setOwned(true); setMessage("Book added to your collection."); router.refresh(); }
    catch (cause) { setMessage(cause instanceof Error ? cause.message : "Purchase failed."); }
    finally { setBusy(false); }
  };

  return { owned, message, busy, purchase };
};
