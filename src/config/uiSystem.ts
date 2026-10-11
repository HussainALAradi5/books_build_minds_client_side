import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e8f0e8" },
          100: { value: "#d4e5d6" },
          500: { value: "#416f58" },
          700: { value: "#254e43" },
          900: { value: "#17372e" },
        },
      },
      fonts: {
        body: { value: "'DM Sans', Arial, sans-serif" },
        heading: { value: "'Playfair Display', Georgia, serif" },
      },
    },
  },
});

export const uiSystem = createSystem(defaultConfig, config);
