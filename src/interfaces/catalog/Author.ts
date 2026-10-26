import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { Country } from "./Country";
import type { Work } from "./Work";

export interface Author extends BaseEntity {
  authorId: number;
  name: string;
  description: string;
  address: string;
  country: Country | null;
  works: Work[];
}
