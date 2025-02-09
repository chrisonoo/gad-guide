// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["en", "no", "pl"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      fallbackType: "rewrite",
    },
    fallback: {
      no: "en",
      pl: "en",
    },
  },
  integrations: [react(), mdx()],
  output: "static",
});
