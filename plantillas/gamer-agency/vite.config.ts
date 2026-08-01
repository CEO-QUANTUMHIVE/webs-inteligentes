import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/plantillas/gamer/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../../clientes/quantum-hive/public/plantillas/gamer",
    emptyOutDir: true,
    target: "es2022",
  },
});
