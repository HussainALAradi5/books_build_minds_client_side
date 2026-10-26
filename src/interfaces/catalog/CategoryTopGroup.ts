import type { Category } from "./Category";
import type { BookSummary } from "@/interfaces/books/BookSummary";

export interface CategoryTopGroup {
  category: Category;
  books: BookSummary[];
}
