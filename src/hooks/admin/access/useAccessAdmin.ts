"use client";

import { useCallback, useEffect, useState } from "react";
import { accessService } from "@/services/access/accessService";
import type { AccessAdminContextValue } from "@/interfaces/access/AccessAdminContextValue";
import type { Page } from "@/interfaces/shared/Page";
import type { AccessPermission } from "@/interfaces/access/AccessPermission";
import type { AccessRole } from "@/interfaces/access/AccessRole";
import type { AccessGroup } from "@/interfaces/access/AccessGroup";
import type { UserAccess } from "@/interfaces/access/UserAccess";

export const useAccessAdmin = (): AccessAdminContextValue => {
  const [permissions, setPermissions] = useState<Page<AccessPermission> | null>(null);
  const [roles, setRoles] = useState<Page<AccessRole> | null>(null);
  const [groups, setGroups] = useState<Page<AccessGroup> | null>(null);
  const [users, setUsers] = useState<Page<UserAccess> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const run = useCallback(async (task: () => Promise<void>) => {
    setError("");
    try { await task(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load access data."); }
  }, []);
  const loadPermissions = useCallback((page = 1) => run(async () => setPermissions(await accessService.permissions(page))), [run]);
  const loadRoles = useCallback((page = 1) => run(async () => setRoles(await accessService.roles(page))), [run]);
  const loadGroups = useCallback((page = 1) => run(async () => setGroups(await accessService.groups(page))), [run]);
  const loadUsers = useCallback((page = 1) => run(async () => setUsers(await accessService.users(page))), [run]);
  const refresh = useCallback(async () => {
    await run(async () => {
      const result = await Promise.all([
        accessService.permissions(permissions?.pagination.page ?? 1),
        accessService.roles(roles?.pagination.page ?? 1),
        accessService.groups(groups?.pagination.page ?? 1),
        accessService.users(users?.pagination.page ?? 1),
      ]);
      setPermissions(result[0]); setRoles(result[1]); setGroups(result[2]); setUsers(result[3]);
    });
  }, [run, permissions?.pagination.page, roles?.pagination.page, groups?.pagination.page, users?.pagination.page]);
  useEffect(() => {
    let active = true;
    Promise.all([accessService.permissions(), accessService.roles(), accessService.groups(), accessService.users()])
      .then(([nextPermissions, nextRoles, nextGroups, nextUsers]) => {
        if (!active) return;
        setPermissions(nextPermissions); setRoles(nextRoles); setGroups(nextGroups); setUsers(nextUsers);
      })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "Could not load access data."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return { permissions, roles, groups, users, loading, error, loadPermissions, loadRoles, loadGroups, loadUsers, refresh };
};
