import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { Country } from "./Country";
import type { Work } from "./Work";

export interface Publisher extends BaseEntity {
  publisherId: number;
  name: string;
  description: string;
  address: string;
  country: Country | null;
  works: Work[];
}
