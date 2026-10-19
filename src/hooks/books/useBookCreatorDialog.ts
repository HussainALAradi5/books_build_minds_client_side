"use client";

import { useState } from "react";

export const useBookCreatorDialog = () => {
  const [selected, setSelected] = useState<"author" | "publisher" | null>(null);
  return { selected, showAuthor: () => setSelected("author"), showPublisher: () => setSelected("publisher"), close: () => setSelected(null) };
};
