#!/usr/bin/env node
import { spawn } from "node:child_process";
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { inspectHtml, parseCliArgs } from "./html-inventory.mjs";

const args = parseCliArgs(process.argv.slice(2));
if (!args.url || !args.slug) {
  console.error("Uso: node capture.mjs --url <url> --slug <slug> [--source <archivo-html>]");
  process.exit(1);
}

const sourceUrl = new URL(String(args.url));
if (!/^https?:$/.test(sourceUrl.protocol)) throw new Error("La URL debe usar http/https.");
const slug = String(args.slug).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
if (!slug) throw new Error("Slug invalido.");

const repoRoot = process.cwd();
const cloneScript = path.join(repoRoot, "scripts", "clone-desyres-webflow.mjs");
await access(cloneScript);
const templateRoot = args["template-root"]
  ? path.resolve(repoRoot, String(args["template-root"]))
  : path.join(repoRoot, "clientes", "quantum-hive", "public", "templates", slug);

await new Promise((resolve, reject) => {
  const childArgs = [cloneScript, sourceUrl.href, slug];
  if (args.source) childArgs.push(String(args.source));
  const child = spawn(process.execPath, childArgs, {
    cwd: repoRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      QH_CLONE_CONCURRENCY: process.env.QH_CLONE_CONCURRENCY || "8",
      QH_CLONE_OUTPUT_ROOT: path.join(templateRoot, "raw"),
    },
  });
  child.once("error", reject);
  child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`El clonador termino con codigo ${code}`)));
});

const rawPath = path.join(templateRoot, "raw", "index.html");
const html = await readFile(rawPath, "utf8");
const inventory = inspectHtml(html);
const payload = {
  source: sourceUrl.href,
  slug,
  generatedAt: new Date().toISOString(),
  summary: {
    texts: inventory.texts.length,
    images: inventory.images.length,
    links: inventory.links.length,
    dataWId: (html.match(/data-w-id/g) ?? []).length,
    webflowRuntime: /(?:src|href)=["'][^"']*webflow[^"']*\.js/i.test(html),
    jqueryRuntime: /(?:src|href)=["'][^"']*jquery[^"']*\.js/i.test(html),
  },
  ...inventory,
};

await writeFile(path.join(templateRoot, "INVENTORY.json"), JSON.stringify(payload, null, 2), "utf8");
const adaptationPath = path.join(templateRoot, "ADAPTATION.json");
try {
  await access(adaptationPath);
} catch {
  await writeFile(adaptationPath, JSON.stringify({ texts: {}, images: {}, links: {} }, null, 2), "utf8");
}

console.log(JSON.stringify({
  templateRoot,
  inventory: payload.summary,
  next: `Completar ${path.relative(repoRoot, adaptationPath)} y ejecutar apply.mjs`,
}, null, 2));
