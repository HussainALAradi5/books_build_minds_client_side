import type { BookSummaryDto } from "@/lib/types";

const styles = ["cover-plum", "cover-blue", "cover-sand", "cover-green", "cover-rose", "cover-ink"];

export default function BookCover({ book, large = false }: { book: BookSummaryDto; large?: boolean }) {
  if (book.book_image && /^(https:\/\/|\/static\/media\/)/.test(book.book_image)) {
    // External cover hosts are user supplied, so image optimization is disabled here.
    // eslint-disable-next-line @next/next/no-img-element
    return <div className={`book-cover image-cover ${large ? "cover-large" : ""}`}><img src={book.book_image.startsWith("/static/") ? `/api/backend${book.book_image}` : book.book_image} alt={`${book.title} cover`} /></div>;
  }
  return <div className={`book-cover ${styles[(book.book_id - 1) % styles.length]} ${large ? "cover-large" : ""}`} aria-label={`${book.title} cover`}>
    <span className="cover-top">BOOKS BUILD MINDS · THE COLLECTION</span>
    <strong>{book.title}</strong><span className="cover-author">{book.author}</span>
    <span className="cover-detail" aria-hidden>✳</span>
  </div>;
}





