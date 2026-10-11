import type { MediaType, LoanStatus } from "@/enums";

export interface ReviewDto {
  review_id: number;
  user_id: number;
  user_name: string;
  book_id: number;
  comment: string;
  written_time: string;
  last_edit: string | null;
  rating: number;
}

export interface ReceiptDto {
  receipt_id: number;
  user_id: number;
  book_id: number;
  written_time: string;
}

export interface MediaDto {
  media_id: number;
  book_id: number | null;
  user_id: number | null;
  media_type: MediaType;
  uploaded_by_user_id: number;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  uploaded_at: string;
  url: string;
}

export interface BookSummaryDto {
  book_id: number;
  isbn: string;
  book_image: string | null;
  slug: string;
  title: string;
  author: string;
  publisher: string;
  published_at: string;
  price: number;
  average_rating: number;
  copies_total: number;
  available_copies: number;
}

export interface BookDto extends BookSummaryDto {
  reviews: ReviewDto[];
  added_by_user_id: number;
  purchased_by: number[];
  media: MediaDto[];
}

export interface BookCreateDto {
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  published_at: string;
  price: number;
  copies_total: number;
  book_image?: string | null;
}

export interface UserDto {
  user_id: number;
  user_name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  purchased_books: number[];
  receipts: ReceiptDto[];
  profile_picture_url: string | null;
}

export interface LoanDto {
  loan_id: number;
  user_id: number;
  book_id: number;
  book_title: string;
  book_slug: string;
  borrowed_at: string;
  due_at: string;
  returned_at: string | null;
  status: LoanStatus;
}

export interface AdminRequestDto {
  request_id: number;
  is_accepted: boolean | null;
  review_time: string | null;
  reviewed_by_user_id: number | null;
  reason_for_request: string;
  requester_id: number;
}

export interface ErrorDto { error: string }
export interface MessageDto { message: string }
export interface PaginationDto {
  page: number;
  per_page: number;
  total: number;
  pages: number;
  has_next: boolean;
  has_previous: boolean;
}
export interface PageDto<T> { items: T[]; pagination: PaginationDto }
export interface LoginDto extends MessageDto { token: string; user_id: number }
export interface BookResultDto extends MessageDto { book: BookDto; receipt?: ReceiptDto }

export type Book = BookDto;
export type Review = ReviewDto;
export type User = UserDto;


