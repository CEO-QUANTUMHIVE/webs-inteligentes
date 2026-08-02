import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appPath = new URL("../src/App.tsx", import.meta.url);
const cssPath = new URL("../src/index.css", import.meta.url);

test("la plantilla contiene la home completa de Quantum Studio", async () => {
  const app = await readFile(appPath, "utf8");

  for (const section of [
    "inicio",
    "enfoque",
    "identidad",
    "marketing",
    "interaccion",
    "portfolio",
    "premios",
    "opiniones",
    "planes",
    "preguntas",
    "socios",
    "contacto",
  ]) {
    assert.match(app, new RegExp(`id=["']${section}["']`));
  }

  assert.match(app, /QUANTUM STUDIO/);
  assert.match(app, /Powered by Quantum Hive/);
  assert.doesNotMatch(app, /Norvin/i);
  assert.doesNotMatch(app, /https?:\/\/.*\.(png|jpe?g|webp|avif)/i);
});

test("la plantilla incluye responsive y movimiento accesible", async () => {
  const css = await readFile(cssPath, "utf8");

  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /overflow-x:\s*hidden/);
  assert.match(css, /@keyframes\s+marquee/);
});
