"use client";
import { useState } from "react";
import { transactionService } from "@/services/payments/transactionService";
import { downloadBase64 } from "@/lib/downloadBase64";
import { openCheckout } from "@/lib/payments/openCheckout";
import type { TransactionCardProps } from "@/props/payments/TransactionCardProps";

export const useTransactionActions = ({ item, onChange }: TransactionCardProps) => {
  const [error, setError] = useState("");
  const refresh = async () => {
    setError("");
    try { await transactionService.sync(item.transactionId); await onChange?.(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not refresh payment."); }
  };
  const cancel = async () => { await transactionService.cancel(item.transactionId); await onChange?.(); };
  const resume = async () => {
    setError("");
    try { if (item.checkoutUrl) openCheckout(item.checkoutUrl); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not open checkout."); }
  };
  const receipt = async () => {
    setError("");
    try {
      const file = await transactionService.receipt(item.transactionId);
      downloadBase64(file.base64, `receipt-${item.transactionId}.pdf`, "application/pdf");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not download receipt."); }
  };
  return { error, refresh, cancel, resume, receipt };
};
