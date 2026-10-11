"use client";

import { DragEvent, useRef, useState } from "react";
import type { GenericUploadProps } from "@/props/custom/media/GenericUploadProps";

export const useGenericUpload = ({ maxFiles, onUpload }: Pick<GenericUploadProps, "maxFiles" | "onUpload">) => {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const choose = (incoming: FileList | File[]) => {
    const picked = Array.from(incoming);
    if (picked.length > maxFiles) { setError(`Choose no more than ${maxFiles} files.`); return; }
    setError(""); setFiles(picked);
  };
  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); setDragging(false); choose(event.dataTransfer.files);
  };
  const upload = async () => {
    if (!files.length) return;
    setBusy(true); setError("");
    try { await onUpload(files); setFiles([]); if (input.current) input.current.value = ""; }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed."); }
    finally { setBusy(false); }
  };

  return { input, files, dragging, setDragging, busy, error, choose, drop, upload };
};
