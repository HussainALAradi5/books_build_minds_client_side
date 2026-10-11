import type { Book } from "@/interfaces/books/Book";
export interface BookDetailContentProps { book: Book; signedIn: boolean; purchased: boolean; userId: number | null; isAdmin: boolean }
