import type { Review } from "@/interfaces/books/reviews/Review";

export interface ReviewCardProps {
  review: Review;
  canManage: boolean;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: number) => void;
}
