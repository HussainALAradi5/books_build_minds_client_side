export interface BookReviewsProps {
  slug: string;
  userId: number | null;
  isAdmin: boolean;
  purchased: boolean;
  averageRating: number;
}
