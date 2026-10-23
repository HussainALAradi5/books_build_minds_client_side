"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import type { EmotionRegistryProps } from "@/props/layout/EmotionRegistryProps";

const EmotionRegistry = ({ children }: EmotionRegistryProps) => {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    const previousInsert = cache.insert;
    let inserted: string[] = [];

    // Flush only styles added in this server render so streamed HTML hydrates consistently.
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return previousInsert(...args);
    };

    const flush = () => {
      const names = inserted;
      inserted = [];
      return names;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    const styles = names.map((name) => cache.inserted[name]).join("");
    return <style data-emotion={`${cache.key} ${names.join(" ")}`} dangerouslySetInnerHTML={{ __html: styles }} />;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default EmotionRegistry;
