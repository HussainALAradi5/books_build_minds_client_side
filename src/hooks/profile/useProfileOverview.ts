import { AccountRole } from "@/enums/accounts/AccountRole";
import { Permission } from "@/enums/accounts/Permission";
import type { User } from "@/interfaces/accounts/User";
import { hasPermission } from "@/lib/access";
import { mediaUrl } from "@/lib/mediaUrl";

export const useProfileOverview = (user: User) => ({
  pictureUrl: user.profilePictureUrl ? mediaUrl(user.profilePictureUrl) : undefined,
  initial: user.userName.charAt(0).toUpperCase(),
  canManage: user.role === AccountRole.Admin && hasPermission(user, Permission.BookReadAny),
});
