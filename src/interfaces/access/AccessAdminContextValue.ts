import type { Page } from "@/interfaces/shared/Page";
import type { AccessPermission } from "./AccessPermission";
import type { AccessRole } from "./AccessRole";
import type { AccessGroup } from "./AccessGroup";
import type { UserAccess } from "./UserAccess";

export interface AccessAdminContextValue {
  permissions: Page<AccessPermission> | null;
  roles: Page<AccessRole> | null;
  groups: Page<AccessGroup> | null;
  users: Page<UserAccess> | null;
  loading: boolean;
  error: string;
  loadPermissions: (page?: number) => Promise<void>;
  loadRoles: (page?: number) => Promise<void>;
  loadGroups: (page?: number) => Promise<void>;
  loadUsers: (page?: number) => Promise<void>;
  refresh: () => Promise<void>;
}
