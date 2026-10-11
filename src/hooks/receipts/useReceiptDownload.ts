"use client";

import { useState } from "react";
import { downloadBase64 } from "@/lib/downloadBase64";
import { receiptService } from "@/services/receipts/receiptService";

export const useReceiptDownload = (slug: string) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const download = async () => {
    setBusy(true);
    setError("");
    try {
      const { base64 } = await receiptService.download(slug);
      downloadBase64(base64, `${slug}-receipt.pdf`, "application/pdf");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not download receipt.");
    } finally {
      setBusy(false);
    }
  };

  return { busy, error, download };
};
