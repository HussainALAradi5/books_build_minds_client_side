"use client";

import { useTheme } from "next-themes";

export const useColorMode = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const toggle = () => setTheme(dark ? "light" : "dark");
  return { dark, toggle };
};
