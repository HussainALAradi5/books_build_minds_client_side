import type { BaseEntity } from "@/interfaces/shared/BaseEntity";

export interface Category extends BaseEntity {
  categoryId: number;
  name: string;
  slug: string;
}
