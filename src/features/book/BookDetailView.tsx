import Link from "next/link";
import { notFound } from "next/navigation";
import BookCover from "@/Components/catalog/BookCover";
import PurchaseActions from "@/Components/books/PurchaseActions";
import LoanActions from "@/Components/books/LoanActions";
import ReviewSection from "@/Components/reviews/ReviewSection";
import { getBook } from "@/lib/server-api";
import { getSessionUser } from "@/lib/session";

export default async function BookDetailView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { book, demo } = await getBook(slug);
  if (!book) notFound();
  const user = await getSessionUser();
  const purchased = Boolean(user?.purchased_books.includes(book.book_id));
  return <div className="detail-page"><Link href="/" className="back-link">← Back to books</Link><div className="detail-layout"><BookCover book={book} large /><div className="detail-content"><span className="eyebrow">THE COLLECTION / {book.publisher.toUpperCase()}</span><h1>{book.title}</h1><p className="detail-author">by {book.author}</p><div className="detail-rating"><span className="stars">★</span> {book.average_rating.toFixed(1)} <span className="muted">reader rating</span></div><div className="detail-price">{book.price.toFixed(2)} <span>BHD</span></div><p className="detail-lead">A book worth making room for on your shelf. Discover new perspectives, memorable stories, and the joy of reading.</p><LoanActions slug={slug} signedIn={Boolean(user)} available={book.available_copies} demo={demo} /><PurchaseActions slug={slug} signedIn={Boolean(user)} purchased={purchased} demo={demo} /><dl className="book-facts"><div><dt>Publisher</dt><dd>{book.publisher}</dd></div><div><dt>Published</dt><dd>{book.published_at}</dd></div><div><dt>ISBN</dt><dd>{book.isbn}</dd></div></dl></div></div><ReviewSection slug={slug} userId={user?.user_id} canReview={purchased} demo={demo} /></div>;
}






