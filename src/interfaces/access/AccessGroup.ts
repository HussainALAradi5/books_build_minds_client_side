import type { BaseEntity } from "@/interfaces/shared/BaseEntity";

export interface AccessGroup extends BaseEntity {
  groupId: number;
  name: string;
  description: string;
  roleKeys: string[];
  memberCount: number;
}
