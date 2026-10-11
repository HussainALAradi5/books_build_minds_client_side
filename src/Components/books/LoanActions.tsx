"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LoanDto } from "@/lib/types";
import type { LoanActionsProps } from "@/props";
import { loans } from "@/services/loans";

export default function LoanActions({ slug, signedIn, available, demo }: LoanActionsProps) {
  const [loan, setLoan] = useState<LoanDto | null>(null);
  const [remaining, setRemaining] = useState(available);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!signedIn || demo) return;
    let live = true;
    loans.current(slug).then((result) => { if (live) setLoan(result.loan); }).catch(() => {});
    return () => { live = false; };
  }, [slug, signedIn, demo]);

  async function change(action: "borrow" | "return") {
    setBusy(true); setMessage("");
    try {
      const result = action === "borrow" ? await loans.borrow(slug) : await loans.return(slug);
      setLoan(action === "borrow" ? result.loan : null);
      setRemaining((count) => Math.max(0, count + (action === "borrow" ? -1 : 1)));
      setMessage(result.message);
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Could not update loan."); }
    finally { setBusy(false); }
  }

  if (demo) return <p className="subtle-note">Preview catalog · Connect the API to borrow books.</p>;
  return <div className="loan-actions">
    <p className="availability">{remaining} copies available</p>
    {!signedIn ? <Link className="secondary-button" href="/login">Sign in to borrow</Link> : loan ?
      <><p>Due {new Date(loan.due_at).toLocaleDateString()}</p><button className="secondary-button" disabled={busy} onClick={() => void change("return")}>Return book</button></> :
      <button className="secondary-button" disabled={busy || remaining < 1} onClick={() => void change("borrow")}>{remaining ? "Borrow for 14 days" : "No copies available"}</button>}
    {message && <p role="status">{message}</p>}
  </div>;
}



