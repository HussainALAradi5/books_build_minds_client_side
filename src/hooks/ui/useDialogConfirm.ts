"use client";
import { useRef, useState } from "react";
import type { GenericDialogProps } from "@/props/custom/actions/GenericDialogProps";

export const useDialogConfirm = (onConfirm: GenericDialogProps["onConfirm"], onClose: GenericDialogProps["onClose"]) => {
  const locked = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const close = () => { if (!locked.current) { setError(""); onClose(); } };
  const confirm = async () => {
    if (locked.current) return;
    locked.current = true; setBusy(true); setError("");
    try { await onConfirm(); onClose(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "The change could not be saved. Try again."); }
    finally { locked.current = false; setBusy(false); }
  };
  return { busy, error, confirm, close };
};
