import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { Review } from "@/interfaces/books/reviews/Review";
import type { Media } from "@/interfaces/media/Media";
import type { Author } from "@/interfaces/catalog/Author";
import type { Publisher } from "@/interfaces/catalog/Publisher";

export interface Book extends BookSummary {
  description: string;
  reviews: Review[];
  addedByUserId: number;
  purchasedBy: number[];
  media: Media[];
  authorDetails: Author | null;
  publisherDetails: Publisher | null;
}
