"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PaginationControls from "@/Components/shared/PaginationControls";
import { LoanStatus, type LoanDto, type PageDto } from "@/lib/types";
import { loans } from "@/services/loans";

export default function LoansPanel({ userId }: { userId: number }) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<LoanStatus | "all">("all");
  const [result, setResult] = useState<PageDto<LoanDto> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { setResult(await loans.all(userId, page, status)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load loans."); }
    finally { setLoading(false); }
  }, [userId, page, status]);
  useEffect(() => { queueMicrotask(() => void load()); }, [load]);
  async function returnBook(slug: string) {
    try { await loans.return(slug); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not return book."); }
  }
  return <section className="profile-loans"><div className="section-heading"><h2>Your loans</h2><label>Show <select value={status} onChange={(event) => { setStatus(event.target.value as LoanStatus | "all"); setPage(1); }}><option value="all">All</option><option value={LoanStatus.Active}>Active</option><option value={LoanStatus.Overdue}>Overdue</option><option value={LoanStatus.Returned}>Returned</option></select></label></div>
    {error && <p role="alert" className="form-error">{error}</p>}
    {loading && <p>Loading loans...</p>}
    {result && (result.items.length ? <ul className="loan-list">{result.items.map((loan) => <li key={loan.loan_id}><div><Link href={`/book/${loan.book_slug}`}>{loan.book_title}</Link><small>{loan.status} · Due {new Date(loan.due_at).toLocaleDateString()}</small></div>{loan.status !== LoanStatus.Returned && <button className="secondary-button" onClick={() => void returnBook(loan.book_slug)}>Return</button>}</li>)}</ul> : <p>No loans in this view.</p>)}
    {result && <PaginationControls pagination={result.pagination} onPageChange={setPage} loading={loading} />}
  </section>;
}



