import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../../", import.meta.url);

test("Quantum Studio queda registrada y verificada por el deploy", async () => {
  const catalog = await readFile(new URL("clientes/quantum-hive/src/lib/catalogo.ts", root), "utf8");
  const workflow = await readFile(new URL(".github/workflows/deploy-cloud-run.yml", root), "utf8");
  const migration = await readFile(new URL("supabase/migrations/0006_quantum_studio.sql", root), "utf8");

  assert.match(catalog, /id:\s*["']quantum-studio["']/);
  assert.match(catalog, /PLANTILLA_QUANTUM_STUDIO/);
  assert.match(catalog, /codix-developer,quantum-studio/);
  assert.match(workflow, /out\/plantillas\/quantum-studio\/index\.html/);
  assert.match(migration, /'quantum-studio'/);
  assert.match(migration, /'\/plantillas\/quantum-studio\/'/);
});
