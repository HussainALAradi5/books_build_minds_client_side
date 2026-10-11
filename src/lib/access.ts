import type { User } from "@/interfaces/accounts/User";

export const hasPermission = (user: User | null, permission: string) =>
  Boolean(user?.permissions.includes(permission));

export const hasAllPermissions = (user: User | null, permissions: readonly string[]) =>
  permissions.every((permission) => hasPermission(user, permission));

export const hasAnyPermission = (user: User | null, permissions: readonly string[]) =>
  permissions.some((permission) => hasPermission(user, permission));
