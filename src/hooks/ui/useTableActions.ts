"use client";

import { useRef, useState, type ChangeEvent } from "react";
import type { TableActions } from "@/props/custom/tables/TableActions";

export const useTableActions = (actions?: TableActions) => {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [format, setFormat] = useState<"pdf" | "xlsx" | "csv">("xlsx");
  const [bulkAction, setBulkAction] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const toggle = (id: string | number) => setSelected((previous) =>
    previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  const toggleAll = (ids: (string | number)[]) => setSelected((previous) =>
    ids.every((id) => previous.includes(id)) ? previous.filter((id) => !ids.includes(id)) : [...new Set([...previous, ...ids])]);
  const perform = async (work?: () => Promise<void>) => {
    if (!work) return;
    setBusy(true); setError("");
    try { await work(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Table action failed."); }
    finally { setBusy(false); }
  };
  const exportRows = () => perform(() => actions?.onExport?.(format) ?? Promise.resolve());
  const importRows = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void perform(() => actions?.onImport?.(file) ?? Promise.resolve());
    event.target.value = "";
  };
  const bulk = async () => {
    if (!bulkAction || !selected.length || !actions?.onBulk) return;
    await actions.onBulk(selected, bulkAction);
    setSelected([]);
  };
  return { selected, toggle, toggleAll, format, setFormat, bulkAction, setBulkAction, busy, error, fileInput, exportRows, importRows, bulk };
};
