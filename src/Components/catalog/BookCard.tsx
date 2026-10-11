import Link from "next/link";
import BookCover from "@/Components/catalog/BookCover";
import type { BookSummaryDto } from "@/lib/types";

export default function BookCard({ book }: { book: BookSummaryDto }) {
  return <Link className="book-card" href={`/book/${book.slug}`}>
    <BookCover book={book} />
    <div className="card-meta"><span>★ {book.average_rating.toFixed(1)}</span><span>{book.price.toFixed(2)} BHD</span></div>
    <h3>{book.title}</h3><p>{book.author}</p>
    <span className="card-link">View book <span aria-hidden>↗</span></span>
  </Link>;
}



