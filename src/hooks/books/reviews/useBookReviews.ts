"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Review } from "@/interfaces/books/reviews/Review";
import type { Pagination } from "@/interfaces/shared/Pagination";
import type { BookReviewsProps } from "@/props/books/reviews/BookReviewsProps";
import { reviewService } from "@/services/reviews/reviewService";
import { bookService } from "@/services/bookService";
import { useBookEvents } from "../useBookEvents";

const emptyPagination: Pagination = { page: 1, perPage: 5, total: 0, pages: 0, hasNext: false, hasPrevious: false };

export const useBookReviews = ({ slug, userId, isAdmin, purchased, averageRating }: BookReviewsProps) => {
  const [items, setItems] = useState<Review[]>([]);
  const [pagination, setPagination] = useState(emptyPagination);
  const [ownReview, setOwnReview] = useState<Review | null>(null);
  const [average, setAverage] = useState(averageRating);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (page = 1) => {
    try {
      const [result, mine, book] = await Promise.all([
        reviewService.all(slug, { page }),
        userId ? reviewService.mine(slug) : Promise.resolve({ review: null }),
        bookService.get(slug),
      ]);
      setItems(result.items);
      setPagination(result.pagination);
      setOwnReview(mine.review);
      setAverage(book.averageRating);
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load reviews.");
    }
  }, [slug, userId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);
  const onBookChanged = useCallback((resource: string) => {
    if (resource === "reviews") void load(pagination.page);
  }, [load, pagination.page]);
  useBookEvents(slug, onBookChanged);

  const clearForm = () => { setEditingId(null); setRating(0); setComment(""); setDescription(""); };
  const startEdit = (item: Review) => {
    setEditingId(item.reviewId);
    setRating(item.rating);
    setComment(item.comment);
    setDescription(item.description);
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating < 1 || comment.trim().length < 10 || (editingId === null && (!purchased || ownReview))) return;
    setBusy(true);
    try {
      const input = { rating, comment: comment.trim(), description: description.trim() };
      if (editingId !== null) await reviewService.edit(slug, editingId, input);
      else await reviewService.create(slug, input);
      clearForm();
      await load(1);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save review.");
    } finally { setBusy(false); }
  };
  const removeSelected = async () => {
    if (deleteId === null) return;
    setBusy(true);
    try { await reviewService.remove(slug, deleteId); setDeleteId(null); clearForm(); await load(pagination.page); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete review."); throw cause; }
    finally { setBusy(false); }
  };
  const canManage = (item: Review) => Boolean(userId && (item.userId === userId || isAdmin));
  const showForm = editingId !== null || Boolean(userId && purchased && !ownReview);
  return { items, pagination, ownReview, average, rating, setRating, comment, setComment, description, setDescription,
    editingId, deleteId, setDeleteId, busy, error, load, submit, startEdit, clearForm, removeSelected, canManage, showForm };
};
