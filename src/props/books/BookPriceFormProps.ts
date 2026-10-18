import type { Book } from "@/interfaces/books/Book";

export interface BookPriceFormProps {
  book: Book;
  onSaved: () => void;
}
