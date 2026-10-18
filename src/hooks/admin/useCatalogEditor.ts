"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CatalogEditorProps } from "@/props/admin/CatalogEditorProps";
import { authors } from "@/services/authors";
import { publishers } from "@/services/publishers";

export const useCatalogEditor = ({ kind }: CatalogEditorProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const data = { name: name.trim(), description: description.trim(), countryCode: countryCode.trim().toUpperCase() || null };
    try {
      if (kind === "author") await authors.create(data);
      else await publishers.create(data);
      setName(""); setDescription(""); setCountryCode("");
      setMessage(`${kind === "author" ? "Author" : "Publisher"} added.`);
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not add profile."); }
    finally { setBusy(false); }
  };
  return { name, setName, description, setDescription, countryCode, setCountryCode, busy, error, message, submit };
};
