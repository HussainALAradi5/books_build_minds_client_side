import type { BaseEntity } from "@/interfaces/shared/BaseEntity";

export interface AccessRole extends BaseEntity {
  key: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissionKeys: string[];
}
