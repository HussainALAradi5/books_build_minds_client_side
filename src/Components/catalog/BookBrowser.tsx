"use client";

import { FormEvent, useState } from "react";
import BookCard from "@/Components/catalog/BookCard";
import PaginationControls from "@/Components/shared/PaginationControls";
import { demoBookPage } from "@/lib/demo-pagination";
import { usePaginatedResource } from "@/hooks/pagination/usePaginatedResource";
import { books, type BookFilters } from "@/services/books";
import type { BookSummaryDto, PageDto } from "@/lib/types";

export default function BookBrowser({ initialPage, demo }: { initialPage: PageDto<BookSummaryDto>; demo: boolean }) {
  const [form, setForm] = useState({ q: "", publisher: "", min_price: "", max_price: "", sort: "recent" });
  const load = demo ? async (filters: BookFilters) => demoBookPage(filters) : books.all;
  const { result, query, loading, error, run } = usePaginatedResource(initialPage, load, { page: 1, per_page: 3 } as BookFilters);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void run({ page: 1, per_page: 3, q: form.q, publisher: form.publisher,
      min_price: form.min_price ? Number(form.min_price) : undefined,
      max_price: form.max_price ? Number(form.max_price) : undefined,
      sort: form.sort as BookFilters["sort"] });
  }

  function clear() {
    setForm({ q: "", publisher: "", min_price: "", max_price: "", sort: "recent" });
    void run({ page: 1, per_page: 3 });
  }

  return <section className="catalog" id="catalog">
    <div className="section-heading"><div><span className="eyebrow">CURATED FOR CURIOUS MINDS</span><h2>Find your next great read.</h2></div><span className="book-count">{result.pagination.total} books</span></div>
    <form onSubmit={submit} className="catalog-controls"><label className="search-field"><span aria-hidden>⌕</span><input aria-label="Search books" placeholder="Title, author, publisher, or ISBN" value={form.q} onChange={(event) => setForm({ ...form, q: event.target.value })} /></label><input className="filter-input" aria-label="Publisher" placeholder="Publisher" value={form.publisher} onChange={(event) => setForm({ ...form, publisher: event.target.value })} /><input className="filter-input price-input" type="number" min="0" step="0.01" aria-label="Minimum price" placeholder="Min BHD" value={form.min_price} onChange={(event) => setForm({ ...form, min_price: event.target.value })} /><input className="filter-input price-input" type="number" min="0" step="0.01" aria-label="Maximum price" placeholder="Max BHD" value={form.max_price} onChange={(event) => setForm({ ...form, max_price: event.target.value })} /><label className="sort-field"><span>Sort</span><select value={form.sort} onChange={(event) => setForm({ ...form, sort: event.target.value })}><option value="recent">Newest</option><option value="title">Title</option><option value="rating">Top rated</option><option value="price_asc">Price: low</option><option value="price_desc">Price: high</option></select></label><button className="filter-button" disabled={loading}>Apply</button><button className="clear-button" type="button" onClick={clear}>Clear</button></form>
    {error && <p className="form-error" role="alert">{error}</p>}
    {result.items.length ? <div className="book-grid">{result.items.map((book) => <BookCard key={book.book_id} book={book} />)}</div> : <div className="empty-state">No books match these filters.</div>}
    <PaginationControls pagination={result.pagination} onPageChange={(page) => void run({ ...query, page })} loading={loading} />
  </section>;
}



