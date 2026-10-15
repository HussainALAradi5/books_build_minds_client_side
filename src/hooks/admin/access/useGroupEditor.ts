"use client";

import { useState, type FormEvent } from "react";
import type { AccessGroup } from "@/interfaces/access/AccessGroup";
import { accessService } from "@/services/access/accessService";
import { toggleSelection } from "@/lib/toggleSelection";
import { useAccessAdminContext } from "./useAccessAdminContext";

export const useGroupEditor = () => {
  const { refresh } = useAccessAdminContext();
  const [selected, setSelected] = useState<AccessGroup | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [roleKeys, setRoleKeys] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const choose = (item: AccessGroup) => {
    setSelected(item); setName(item.name); setDescription(item.description);
    setRoleKeys(item.roleKeys); setError(""); setMessage("");
  };
  const clear = () => { setSelected(null); setName(""); setDescription(""); setRoleKeys([]); setError(""); };
  const toggle = (value: string) => setRoleKeys((current) => toggleSelection(current, value));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      await accessService.saveGroup({ name: name.trim(), description: description.trim(), roleKeys }, selected?.groupId);
      await refresh(); clear(); setMessage("Group saved.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save group."); }
    finally { setBusy(false); }
  };
  const remove = async () => {
    if (!selected) return;
    setBusy(true); setError("");
    try { await accessService.deleteGroup(selected.groupId); await refresh(); clear(); setMessage("Group deleted."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete group."); throw cause; }
    finally { setBusy(false); }
  };
  return { selected, name, setName, description, setDescription, roleKeys, toggle, busy, error, message, choose, clear, submit, remove };
};
