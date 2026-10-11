import type { ApiMessage } from "@/interfaces/shared/ApiMessage";
import type { Book } from "@/interfaces/books/Book";
import type { Receipt } from "@/interfaces/receipts/Receipt";

export interface BookResult extends ApiMessage { book: Book; receipt?: Receipt }
