import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { AccountRole } from "@/enums/accounts/AccountRole";

export interface UserAccess extends BaseEntity {
  userId: number;
  userName: string;
  email: string;
  role: AccountRole;
  accessRoleKeys: string[];
  groupIds: number[];
  isActive: boolean;
}
