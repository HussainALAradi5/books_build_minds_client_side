import { api } from "@/lib/apiClient";
import type { Page } from "@/interfaces/shared/Page";
import type { AccessPermission } from "@/interfaces/access/AccessPermission";
import type { AccessRole } from "@/interfaces/access/AccessRole";
import type { AccessGroup } from "@/interfaces/access/AccessGroup";
import type { UserAccess } from "@/interfaces/access/UserAccess";
import type { PermissionInput } from "@/interfaces/access/PermissionInput";
import type { RoleInput } from "@/interfaces/access/RoleInput";
import type { GroupInput } from "@/interfaces/access/GroupInput";
import type { UserAccessInput } from "@/interfaces/access/UserAccessInput";

const body = (value: object) => JSON.stringify(value);
const list = <T>(resource: string, page = 1, query = "") =>
  api<Page<T>>(`/access/${resource}?page=${page}&per_page=100&q=${encodeURIComponent(query)}`);

export const accessService = {
  permissions: (page = 1, query = "") => list<AccessPermission>("permissions", page, query),
  roles: (page = 1, query = "") => list<AccessRole>("roles", page, query),
  groups: (page = 1, query = "") => list<AccessGroup>("groups", page, query),
  users: (page = 1, query = "") => list<UserAccess>("users", page, query),
  savePermission: (input: PermissionInput, key?: string) => api<{ permission: AccessPermission }>(
    `/access/permissions${key ? `/${encodeURIComponent(key)}` : ""}`,
    { method: key ? "PUT" : "POST", body: body(input) }),
  deletePermission: (key: string) => api(`/access/permissions/${encodeURIComponent(key)}`, { method: "DELETE" }),
  saveRole: (input: RoleInput, key?: string) => api<{ role: AccessRole }>(
    `/access/roles${key ? `/${encodeURIComponent(key)}` : ""}`,
    { method: key ? "PUT" : "POST", body: body(input) }),
  deleteRole: (key: string) => api(`/access/roles/${encodeURIComponent(key)}`, { method: "DELETE" }),
  saveGroup: (input: GroupInput, id?: number) => api<{ group: AccessGroup }>(
    `/access/groups${id ? `/${id}` : ""}`,
    { method: id ? "PUT" : "POST", body: body(input) }),
  deleteGroup: (id: number) => api(`/access/groups/${id}`, { method: "DELETE" }),
  setUserAccess: (id: number, input: UserAccessInput) => api<{ user: UserAccess }>(
    `/access/users/${id}`, { method: "PUT", body: body(input) }),
};
