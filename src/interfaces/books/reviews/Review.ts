import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
export interface Review extends BaseEntity {
  reviewId: number;
  userId: number;
  userName: string;
  bookId: number;
  comment: string;
  description: string;
  writtenTime: string;
  lastEdit: string | null;
  rating: number;
}
