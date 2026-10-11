"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { UiProviderProps } from "@/props/layout/UiProviderProps";
import { uiSystem } from "@/config/uiSystem";

const UiProvider = ({ children }: UiProviderProps) =>
  <ChakraProvider value={uiSystem}><ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider></ChakraProvider>;

export default UiProvider;
