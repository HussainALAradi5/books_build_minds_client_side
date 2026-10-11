"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Author } from "@/interfaces/catalog/Author";
import type { Publisher } from "@/interfaces/catalog/Publisher";
import type { CatalogEditorProps } from "@/props/admin/CatalogEditorProps";
import { authors } from "@/services/authors";
import { publishers } from "@/services/publishers";

export const useCatalogEditor = ({ kind }: CatalogEditorProps) => {
  const [items, setItems] = useState<(Author | Publisher)[]>([]);
  const [selected, setSelected] = useState<Author | Publisher | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const load = useCallback(async () => {
    try {
      const result = kind === "author" ? await authors.all() : await publishers.all();
      setItems(result.items);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load catalog profiles."); }
  }, [kind]);
  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const choose = (item: Author | Publisher) => {
    setSelected(item); setName(item.name); setDescription(item.description);
    setCountryCode(item.country?.code || ""); setMessage("");
  };
  const clear = () => {
    setSelected(null); setName(""); setDescription(""); setCountryCode(""); setError(""); setMessage("");
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError("");
    const data = { name: name.trim(), description: description.trim(), countryCode: countryCode.trim().toUpperCase() || null };
    try {
      if (kind === "author") {
        const id = selected && "authorId" in selected ? selected.authorId : null;
        if (id) await authors.update(id, data); else await authors.create(data);
      } else {
        const id = selected && "publisherId" in selected ? selected.publisherId : null;
        if (id) await publishers.update(id, data); else await publishers.create(data);
      }
      await load();
      clear();
      setMessage(`${kind === "author" ? "Author" : "Publisher"} saved.`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save profile."); }
    finally { setBusy(false); }
  };
  return { items, selected, name, setName, description, setDescription, countryCode, setCountryCode, busy, error, message, choose, clear, submit };
};
