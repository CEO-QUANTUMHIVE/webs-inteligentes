import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/plantillas/codix/",
  plugins: [react()],
  build: {
    outDir: "../../clientes/quantum-hive/public/plantillas/codix",
    emptyOutDir: true,
    target: "es2022",
  },
});
