import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
export interface Review extends BaseEntity {
  reviewId: number;
  userId: number;
  userName: string;
  profilePictureUrl: string | null;
  bookId: number;
  comment: string;
  description: string;
  writtenTime: string;
  lastEdit: string | null;
  rating: number;
}
