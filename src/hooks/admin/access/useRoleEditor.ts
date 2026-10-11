"use client";

import { useState, type FormEvent } from "react";
import type { AccessRole } from "@/interfaces/access/AccessRole";
import { accessService } from "@/services/access/accessService";
import { toggleSelection } from "@/lib/toggleSelection";
import { useAccessAdminContext } from "./useAccessAdminContext";

export const useRoleEditor = () => {
  const { refresh } = useAccessAdminContext();
  const [selected, setSelected] = useState<AccessRole | null>(null);
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissionKeys, setPermissionKeys] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const choose = (item: AccessRole) => {
    setSelected(item); setKey(item.key); setName(item.name); setDescription(item.description);
    setPermissionKeys(item.permissionKeys); setError(""); setMessage("");
  };
  const clear = () => { setSelected(null); setKey(""); setName(""); setDescription(""); setPermissionKeys([]); setError(""); };
  const toggle = (value: string) => setPermissionKeys((current) => toggleSelection(current, value));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      await accessService.saveRole({ key: key.trim(), name: name.trim(), description: description.trim(), permissionKeys }, selected?.key);
      await refresh(); clear(); setMessage("Role saved.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save role."); }
    finally { setBusy(false); }
  };
  const remove = async () => {
    if (!selected || selected.isSystem) return;
    setBusy(true); setError("");
    try { await accessService.deleteRole(selected.key); await refresh(); clear(); setMessage("Role deleted."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete role."); }
    finally { setBusy(false); }
  };
  return { selected, key, setKey, name, setName, description, setDescription, permissionKeys, toggle, busy, error, message, choose, clear, submit, remove };
};
