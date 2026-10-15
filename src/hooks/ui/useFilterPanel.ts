"use client";
import { useState } from "react";
export const useFilterPanel = () => {
  const [expanded, setExpanded] = useState(false);
  return { expanded, toggle: () => setExpanded((previous) => !previous) };
};
