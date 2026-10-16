import { AccountRole } from "@/enums/accounts/AccountRole";
import { Permission } from "@/enums/accounts/Permission";
import type { User } from "@/interfaces/accounts/User";
import { hasPermission } from "@/lib/access";

export const useProfileOverview = (user: User) => ({
  canManage: user.role === AccountRole.Admin && hasPermission(user, Permission.BookReadAny),
});
