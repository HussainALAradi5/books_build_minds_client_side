"use client";
import { useRef, useState } from "react";
import { loans } from "@/services/loans";
import { transactionService } from "@/services/payments/transactionService";
import { openCheckout } from "@/lib/payments/openCheckout";
import type { LoanQuoteDto } from "@/interfaces/library/LoanQuoteDto";
import type { LibraryWorkflowProps } from "@/props/books/workflow/LibraryWorkflowProps";

export const useLibraryWorkflow = ({ slug, action, onCompleted }: LibraryWorkflowProps) => {
  const [quote, setQuote] = useState<LoanQuoteDto | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const requestKey = useRef("");
  const show = async () => {
    setLoading(true); setError(""); setAccepted(false);
    try { setQuote(await loans.quote(slug)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load library terms."); }
    finally { setLoading(false); }
  };
  const confirm = async () => {
    if (!quote || !accepted) throw new Error("Accept the library terms to continue.");
    if (action === "borrow") {
      await loans.borrow(slug, quote.policyVersion);
      await onCompleted?.();
    } else {
      requestKey.current ||= crypto.randomUUID();
      const item = await transactionService.checkout({ bookSlug: slug, kind: action,
        requestKey: requestKey.current, expectedAmountMinor: action === "rental" ? quote.rentalAmountMinor : quote.purchaseAmountMinor, acceptedTerms: true, policyVersion: quote.policyVersion });
      if (!item.checkoutUrl) {
        requestKey.current = "";
        throw new Error("This checkout is already closed. Check Transactions in your profile before starting again.");
      }
      openCheckout(item.checkoutUrl);
    }
  };
  return { quote, accepted, setAccepted, loading, error, show, close: () => setQuote(null), confirm };
};
