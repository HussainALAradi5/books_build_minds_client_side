import type { Author } from "@/interfaces/catalog/Author";
import type { Publisher } from "@/interfaces/catalog/Publisher";

export interface CatalogProfileProps {
  label: string;
  profile: Author | Publisher | null;
}
