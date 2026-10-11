import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
export interface Country extends BaseEntity {
  code: string;
  name: string;
  flagUrl: string | null;
}
