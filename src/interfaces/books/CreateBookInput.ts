import type { BookStatus } from "@/enums/books/BookStatus";

export interface CreateBookInput {
  title: string;
  description: string;
  isbn: string;
  author: string;
  publisher: string;
  publishedAt: string;
  price: number;
  copiesTotal: number;
  bookImage?: string | null;
  condition?: BookStatus;
}
