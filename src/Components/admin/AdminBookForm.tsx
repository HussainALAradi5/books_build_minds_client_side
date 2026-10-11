"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import MediaUpload from "@/Components/media/MediaUpload";
import type { BookCreateDto } from "@/interfaces";
import { books } from "@/services/books";

const textFields = [["title", "Title"], ["author", "Author"], ["publisher", "Publisher"], ["isbn", "ISBN"]] as const;

export default function AdminBookForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [createdBookId, setCreatedBookId] = useState<number | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = event.currentTarget;
    const values = new FormData(form);
    const book: BookCreateDto = {
      title: String(values.get("title") || ""),
      author: String(values.get("author") || ""),
      publisher: String(values.get("publisher") || ""),
      isbn: String(values.get("isbn") || ""),
      published_at: String(values.get("published_at") || ""),
      price: Number(values.get("price")),
      copies_total: Number(values.get("copies_total")),
      book_image: String(values.get("book_image") || "") || null,
    };
    try {
      const result = await books.create(book);
      setCreatedBookId(result.book.book_id);
      form.reset();
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not add book.");
    } finally { setBusy(false); }
  }

  return <div><form onSubmit={submit} className="form-stack admin-form">
    <h2>Add a book</h2>
    {textFields.map(([name, label]) => <label key={name}>{label}<input name={name} required /></label>)}
    <label>Publication date<input type="date" name="published_at" required /></label>
    <label>Price in BHD<input type="number" name="price" min="0.01" step="0.01" required /></label>
    <label>Copies in library<input type="number" name="copies_total" min="1" defaultValue="1" required /></label>
    <label>Cover image URL<input type="url" name="book_image" /></label>
    {error && <p className="form-error">{error}</p>}
    <button className="primary-button" disabled={busy}>{busy ? "Saving..." : "Add book"}</button>
  </form>{createdBookId && <MediaUpload bookId={createdBookId} />}</div>;
}
