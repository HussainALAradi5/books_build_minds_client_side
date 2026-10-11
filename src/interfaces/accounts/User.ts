import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { Receipt } from "@/interfaces/receipts/Receipt";
import type { AccountRole } from "@/enums/accounts/AccountRole";

export interface User extends BaseEntity {
  userId: number;
  userName: string;
  email: string;
  isActive: boolean;
  role: AccountRole;
  permissions: string[];
  purchasedBooks: number[];
  receipts: Receipt[];
  profilePictureUrl: string | null;
}
