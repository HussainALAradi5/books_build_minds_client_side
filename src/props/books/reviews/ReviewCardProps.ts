import type { Review } from "@/interfaces/books/reviews/Review";
import type { ReactNode } from "react";

export interface ReviewCardProps {
  review: Review;
  canEdit: boolean;
  canDelete: boolean;
  editor?: ReactNode;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: number) => void;
}
