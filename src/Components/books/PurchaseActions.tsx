"use client";

import Link from "next/link";
import { useState } from "react";
import { books } from "@/services/books";

export default function PurchaseActions({ slug, signedIn, purchased, demo }: { slug: string; signedIn: boolean; purchased: boolean; demo: boolean }) {
  const [owned, setOwned] = useState(purchased);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function purchase() {
    setBusy(true); setMessage("");
    try { await books.purchase(slug); setOwned(true); setMessage("Book added to your collection."); }
    catch (cause) { setMessage(cause instanceof Error ? cause.message : "Purchase failed."); }
    finally { setBusy(false); }
  }
  if (demo) return <p className="subtle-note">Preview catalog · Connect the API to purchase this book.</p>;
  if (!signedIn) return <Link className="primary-button" href="/login">Sign in to purchase <span aria-hidden>→</span></Link>;
  return <div className="purchase-actions">{owned ? <a className="primary-button" href={books.receiptUrl(slug)}>Download receipt ↓</a> : <button className="primary-button" onClick={purchase} disabled={busy}>{busy ? "Please wait..." : "Purchase book →"}</button>}{message && <p role="status">{message}</p>}</div>;
}




