import type { Author } from "@/interfaces/catalog/Author";
import type { Publisher } from "@/interfaces/catalog/Publisher";

export interface BookCreatorActionsProps {
  author: Author | null;
  publisher: Publisher | null;
}
