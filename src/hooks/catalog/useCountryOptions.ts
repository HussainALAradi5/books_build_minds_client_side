"use client";

import { useEffect, useState } from "react";
import { countries } from "@/services/countries";
import type { Country } from "@/interfaces/catalog/Country";

export const useCountryOptions = () => {
  const [items, setItems] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const first = await countries.all(1);
        const pages = await Promise.all(Array.from({ length: Math.max(0, first.pagination.pages - 1) }, (_, index) => countries.all(index + 2)));
        if (active) setItems([first, ...pages].flatMap((page) => page.items).sort((a, b) => a.name.localeCompare(b.name)));
      } catch {
        if (active) setError("Countries could not be loaded. Ask an administrator to refresh country data.");
      } finally { if (active) setLoading(false); }
    };
    void load();
    return () => { active = false; };
  }, []);

  return { items, loading, error };
};
