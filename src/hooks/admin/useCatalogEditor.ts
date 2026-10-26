"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CatalogEditorProps } from "@/props/admin/CatalogEditorProps";
import { authors } from "@/services/authors";
import { publishers } from "@/services/publishers";

export const useCatalogEditor = ({ kind, onCreated }: CatalogEditorProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const data = { name: name.trim(), description: description.trim(), address: address.trim(), countryCode: countryCode.trim().toUpperCase() || null };
    try {
      if (kind === "author") await authors.create(data);
      else await publishers.create(data);
      setName(""); setDescription(""); setAddress(""); setCountryCode("");
      setMessage(`${kind === "author" ? "Author" : "Publisher"} added.`);
      onCreated?.();
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not add profile."); }
    finally { setBusy(false); }
  };
  return { name, setName, description, setDescription, address, setAddress, countryCode, setCountryCode, busy, error, message, submit };
};
