import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import edgeoneAdapter from "@edgeone/astro";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: edgeoneAdapter(),
  vite: {
    plugins: [tailwindcss()],
  },
});
