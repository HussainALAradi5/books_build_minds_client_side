"use client";

import { DragEvent, useRef, useState } from "react";
import type { FileDropzoneProps } from "@/props";

export default function FileDropzone({ label, accept, maxFiles, onUpload }: FileDropzoneProps) {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function choose(incoming: FileList | File[]) {
    const picked = Array.from(incoming);
    if (picked.length > maxFiles) { setError(`Choose no more than ${maxFiles} files.`); return; }
    setError(""); setFiles(picked);
  }

  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault(); setDragging(false); choose(event.dataTransfer.files);
  }

  async function upload() {
    if (!files.length) return;
    setBusy(true); setError("");
    try { await onUpload(files); setFiles([]); if (input.current) input.current.value = ""; }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed."); }
    finally { setBusy(false); }
  }

  return <div className="file-upload"><div className={`dropzone ${dragging ? "dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop}>
    <span className="drop-icon" aria-hidden>↥</span><strong>{label}</strong><p>Drag files here, or use the button below. Up to {maxFiles} images.</p>
    <button type="button" className="secondary-button" onClick={() => input.current?.click()}>Choose files</button>
    <input ref={input} type="file" accept={accept} multiple={maxFiles > 1} className="visually-hidden" aria-label={label} onChange={(event) => choose(event.target.files || [])} />
  </div>{files.length > 0 && <><ul className="selected-files">{files.map((file, index) => <li key={`${file.name}-${index}`}><span>{file.name}</span><small>{(file.size / 1024 / 1024).toFixed(2)} MB</small></li>)}</ul><button type="button" className="primary-button" disabled={busy} onClick={() => void upload()}>{busy ? "Uploading..." : `Upload ${files.length} file${files.length > 1 ? "s" : ""}`}</button></>}{error && <p className="form-error" role="alert">{error}</p>}</div>;
}



