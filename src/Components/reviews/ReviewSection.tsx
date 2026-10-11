"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import PaginationControls from "@/Components/shared/PaginationControls";
import { reviews as reviewService } from "@/services/reviews";
import type { PaginationDto, ReviewDto } from "@/lib/types";

const emptyPage: PaginationDto = { page: 1, per_page: 5, total: 0, pages: 0, has_next: false, has_previous: false };

export default function ReviewSection({ slug, userId, canReview, demo }: { slug: string; userId?: number; canReview: boolean; demo: boolean }) {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [pagination, setPagination] = useState(emptyPage);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"recent" | "rating">("recent");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (page = 1, minimum = minRating, order = sort) => {
    if (demo) return;
    setLoading(true);
    try {
      const result = await reviewService.all(slug, { page, per_page: 5, min_rating: minimum || undefined, sort: order });
      setReviews(result.items);
      setPagination(result.pagination);
      setError("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load reviews."); }
    finally { setLoading(false); }
  }, [slug, demo, minRating, sort]);

  useEffect(() => {
    if (demo) return;
    reviewService.all(slug, { page: 1, per_page: 5 }).then((result) => {
      setReviews(result.items); setPagination(result.pagination);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load reviews."));
  }, [slug, demo]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    try {
      if (editing) await reviewService.edit(slug, editing, { rating, comment });
      else await reviewService.create(slug, { rating, comment });
      setEditing(null); setComment(""); setRating(5); await load(1);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save review."); }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this review?")) return;
    try { await reviewService.remove(slug, id); await load(1); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete review."); }
  }

  const mine = reviews.find((review) => review.user_id === userId);
  return <section className="reviews" id="reviews">
    <div className="section-heading"><div><span className="eyebrow">THE READER&apos;S TAKE</span><h2>Reviews &amp; reflections</h2></div><span className="book-count">{pagination.total} reviews</span></div>
    {demo && <p className="subtle-note">Reviews appear when the API is connected.</p>}
    {!demo && <div className="review-filters"><label>Minimum rating <select value={minRating} onChange={(event) => { const value = Number(event.target.value); setMinRating(value); void load(1, value, sort); }}>{[0,1,2,3,4,5].map((value) => <option key={value} value={value}>{value ? `${value}+ stars` : "All ratings"}</option>)}</select></label><label>Sort by <select value={sort} onChange={(event) => { const value = event.target.value as "recent" | "rating"; setSort(value); void load(1, minRating, value); }}><option value="recent">Newest</option><option value="rating">Highest rated</option></select></label></div>}
    {reviews.length ? <div className="review-list">{reviews.map((review) => <article className="review-card" key={review.review_id}><div className="review-top"><strong>{review.user_name}</strong><span className="stars">{"★".repeat(Math.round(review.rating))}</span></div><p>{review.comment}</p><small>{review.written_time}</small>{userId === review.user_id && <div className="review-actions"><button onClick={() => { setEditing(review.review_id); setRating(review.rating); setComment(review.comment); }}>Edit</button><button onClick={() => void remove(review.review_id)}>Delete</button></div>}</article>)}</div> : !demo && <p className="empty-state">Be the first to share your thoughts about this book.</p>}
    <PaginationControls pagination={pagination} onPageChange={(page) => void load(page)} loading={loading} />
    {canReview && !demo && <form className="review-form" onSubmit={submit}><h3>{editing ? "Edit your review" : mine ? "Your review" : "Write a review"}</h3>{(!mine || editing) && <><label>Rating<select value={rating} onChange={(event) => setRating(Number(event.target.value))}>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select></label><label>Your thoughts<textarea required minLength={10} maxLength={2000} value={comment} onChange={(event) => setComment(event.target.value)} /></label><button className="primary-button">{editing ? "Save changes" : "Publish review"}</button>{editing && <button type="button" onClick={() => { setEditing(null); setComment(""); }}>Cancel</button>}</>}</form>}
    {error && <p className="form-error" role="alert">{error}</p>}
  </section>;
}



