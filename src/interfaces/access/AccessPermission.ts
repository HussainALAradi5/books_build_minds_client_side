import type { BaseEntity } from "@/interfaces/shared/BaseEntity";

export interface AccessPermission extends BaseEntity {
  key: string;
  label: string;
  description: string;
  isSystem: boolean;
}
