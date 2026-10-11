import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { BookStatus } from "@/enums/books/BookStatus";

export interface BookSummary extends BaseEntity {
  bookId: number;
  isbn: string;
  bookImage: string | null;
  slug: string;
  title: string;
  author: string;
  publisher: string;
  publishedAt: string;
  price: number;
  averageRating: number;
  copiesTotal: number;
  availableCopies: number;
  condition: BookStatus;
}
