import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../../../../", import.meta.url);

test("Lluvia Matrix tiene componente real y registro completo", async () => {
  const component = await readFile(new URL("clientes/quantum-hive/src/components/ui/matrix-rain.tsx", root), "utf8");
  const previews = await readFile(new URL("clientes/quantum-hive/src/app/catalogo-efectos/previews-reales.tsx", root), "utf8");
  const catalog = await readFile(new URL("clientes/quantum-hive/src/lib/catalogo.ts", root), "utf8");
  const seed = await readFile(new URL("supabase/seed/0001_efectos.sql", root), "utf8");
  const migration = await readFile(new URL("supabase/migrations/0007_matrix_rain.sql", root), "utf8");

  assert.match(component, /Array\.from\(\{ length: 40 \}/);
  assert.match(component, /prefers-reduced-motion:\s*reduce/);
  assert.match(component, /export function MatrixRain/);
  assert.match(previews, /"matrix-rain"/);
  assert.match(previews, /<MatrixRain\s*\/>/);
  assert.match(catalog, /EFECTO_MATRIX_RAIN/);
  assert.match(catalog, /id:\s*"matrix-rain"/);
  assert.match(seed, /'matrix-rain',\s*'Lluvia Matrix'/);
  assert.match(migration, /'matrix-rain',\s*'Lluvia Matrix'/);
});
