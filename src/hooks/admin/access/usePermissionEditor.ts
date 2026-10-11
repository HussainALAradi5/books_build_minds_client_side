"use client";

import { useState, type FormEvent } from "react";
import type { AccessPermission } from "@/interfaces/access/AccessPermission";
import { accessService } from "@/services/access/accessService";
import { useAccessAdminContext } from "./useAccessAdminContext";

export const usePermissionEditor = () => {
  const { refresh } = useAccessAdminContext();
  const [selected, setSelected] = useState<AccessPermission | null>(null);
  const [key, setKey] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const choose = (item: AccessPermission) => {
    setSelected(item); setKey(item.key); setLabel(item.label); setDescription(item.description);
    setError(""); setMessage("");
  };
  const clear = () => { setSelected(null); setKey(""); setLabel(""); setDescription(""); setError(""); };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      await accessService.savePermission({ key: key.trim(), label: label.trim(), description: description.trim() }, selected?.key);
      await refresh(); clear(); setMessage("Permission saved.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save permission."); }
    finally { setBusy(false); }
  };
  const remove = async () => {
    if (!selected || selected.isSystem) return;
    setBusy(true); setError("");
    try { await accessService.deletePermission(selected.key); await refresh(); clear(); setMessage("Permission deleted."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete permission."); }
    finally { setBusy(false); }
  };
  return { selected, key, setKey, label, setLabel, description, setDescription, busy, error, message, choose, clear, submit, remove };
};
