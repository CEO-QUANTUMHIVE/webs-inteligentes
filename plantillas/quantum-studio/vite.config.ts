import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/plantillas/quantum-studio/",
  plugins: [react()],
  build: {
    outDir: "../../clientes/quantum-hive/public/plantillas/quantum-studio",
    emptyOutDir: true,
    target: "es2022",
  },
});
