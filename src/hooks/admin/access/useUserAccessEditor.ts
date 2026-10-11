"use client";

import { useState, type FormEvent } from "react";
import type { UserAccess } from "@/interfaces/access/UserAccess";
import { AccountRole } from "@/enums/accounts/AccountRole";
import { accessService } from "@/services/access/accessService";
import { toggleSelection } from "@/lib/toggleSelection";
import { useAccessAdminContext } from "./useAccessAdminContext";

export const useUserAccessEditor = () => {
  const { refresh } = useAccessAdminContext();
  const [selected, setSelected] = useState<UserAccess | null>(null);
  const [role, setRole] = useState<AccountRole>(AccountRole.Client);
  const [accessRoleKeys, setAccessRoleKeys] = useState<string[]>([]);
  const [groupIds, setGroupIds] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const choose = (item: UserAccess) => {
    setSelected(item); setRole(item.role); setAccessRoleKeys(item.accessRoleKeys);
    setGroupIds(item.groupIds); setError(""); setMessage("");
  };
  const toggleRole = (value: string) => setAccessRoleKeys((current) => toggleSelection(current, value));
  const toggleGroup = (value: number) => setGroupIds((current) => toggleSelection(current, value));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!selected) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await accessService.setUserAccess(selected.userId, { role, accessRoleKeys, groupIds });
      await refresh(); setMessage("User access updated.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update user access."); }
    finally { setBusy(false); }
  };
  return { selected, role, setRole, accessRoleKeys, groupIds, toggleRole, toggleGroup, busy, error, message, choose, submit };
};
