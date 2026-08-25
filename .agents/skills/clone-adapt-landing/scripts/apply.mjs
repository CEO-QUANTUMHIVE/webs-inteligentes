#!/usr/bin/env node
import { access, copyFile, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { inspectHtml, parseCliArgs, transformHtml } from "./html-inventory.mjs";

const args = parseCliArgs(process.argv.slice(2));
if (!args.slug || !args.profile) {
  console.error("Uso: node apply.mjs --slug <slug> --profile <perfil.json> [--adaptation <archivo.json>]");
  process.exit(1);
}

const repoRoot = process.cwd();
const slug = String(args.slug).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
const templateRoot = args["template-root"]
  ? path.resolve(repoRoot, String(args["template-root"]))
  : path.join(repoRoot, "clientes", "quantum-hive", "public", "templates", slug);
const rawPath = path.join(templateRoot, "raw", "index.html");
const inventoryPath = path.join(templateRoot, "INVENTORY.json");
const adaptationPath = args.adaptation
  ? path.resolve(repoRoot, String(args.adaptation))
  : path.join(templateRoot, "ADAPTATION.json");
const profilePath = path.resolve(repoRoot, String(args.profile));

const [rawHtml, inventory, profile, adaptation] = await Promise.all([
  readFile(rawPath, "utf8"),
  readFile(inventoryPath, "utf8").then(JSON.parse),
  readFile(profilePath, "utf8").then(JSON.parse),
  readFile(adaptationPath, "utf8").then(JSON.parse),
]);

const business = profile.business || {};
const brand = profile.brand || {};
const contact = profile.contact || {};
const site = profile.site || {};
if (!business.name) throw new Error("El perfil necesita business.name.");

function unique(values) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

const services = Array.isArray(business.services) ? business.services : [];
const serviceNames = services.map((service) => typeof service === "string" ? service : service.name);
const serviceBodies = services.map((service) => typeof service === "string" ? "" : service.description);
const benefits = Array.isArray(business.benefits) ? business.benefits : [];
const processSteps = Array.isArray(business.process) ? business.process : [];
const pools = {
  brand: unique([business.name]),
  nav: unique(["Inicio", "Servicios", "Cómo funciona", "Contacto"]),
  button: unique([contact.ctaLabel, "Conocer más", "Ver servicios", "Contactar"]),
  heading: unique([
    business.shortHeadline,
    business.headline,
    `${business.name}: ${business.rubro || "una propuesta hecha para vos"}`,
    "Soluciones pensadas para tus necesidades",
    "Cómo trabajamos",
    "Hablemos de tu proyecto",
    ...serviceNames,
  ]),
  paragraph: unique([
    business.description,
    ...serviceBodies,
    ...benefits,
    ...processSteps,
    `Conocé la propuesta de ${business.name} y elegí la opción adecuada para vos.`,
    "Encontrá información clara, respuestas directas y una forma simple de avanzar.",
  ]),
  label: unique([business.rubro, "Servicios", "Beneficios", "Proceso", "Contacto", ...serviceNames]),
  other: unique([business.description, business.rubro, ...benefits, ...processSteps, business.name]),
};
for (const [key, values] of Object.entries(pools)) {
  if (!values.length) pools[key] = [business.name];
}

const counters = {};
const autoTexts = {};
function fitCopy(value, entry) {
  const text = String(value || "").trim();
  if (!text) return business.name;
  if (!["brand", "nav", "button", "heading", "label"].includes(entry.kind)) return text;
  const headingFloor = entry.chars <= 6 ? 8 : 18;
  const maxLength = Math.max(Math.ceil(entry.chars * 1.35), entry.kind === "heading" ? headingFloor : 12);
  if (text.length <= maxLength) return text;
  const alternatives = pools[entry.kind] || pools.other;
  const candidate = alternatives.find((item) => item.length <= maxLength);
  if (candidate) return candidate;
  const clipped = text.slice(0, maxLength + 1).replace(/\s+\S*$/, "").trim();
  return clipped || text.slice(0, maxLength).trim();
}
let reviewHeadingIndex = 0;
for (const entry of inventory.texts || []) {
  if (!/[\p{L}]/u.test(entry.text)) {
    autoTexts[entry.id] = entry.text;
    continue;
  }
  const pool = pools[entry.kind] || pools.other;
  const index = counters[entry.kind] || 0;
  counters[entry.kind] = index + 1;
  let value = pool[index % pool.length];
  if (entry.kind === "heading" && /testimonial|review/i.test(entry.context || "")) {
    reviewHeadingIndex += 1;
    value = `Paso ${reviewHeadingIndex}`;
  } else if (entry.kind === "heading" && /hero/i.test(entry.context || "")) {
    value = business.shortHeadline || business.headline || `${business.name} · ${business.rubro || ""}`.replace(/ · $/, "");
  }
  autoTexts[entry.id] = fitCopy(value, entry);
}
const textMap = { ...autoTexts, ...(adaptation.texts || {}) };

const brandDir = path.join(templateRoot, "brand");
const copiedAssets = [];
let assetNames = [];
let sourceDir = brand.assetDir ? path.resolve(repoRoot, String(brand.assetDir)) : null;
if (!sourceDir && business.rubro) {
  const rubroClean = String(business.rubro).toLowerCase();
  let key = "retail";
  if (rubroClean.includes("gastro") || rubroClean.includes("restaurante")) key = "gastronomia";
  else if (rubroClean.includes("barber")) key = "barberia";
  else if (rubroClean.includes("wellness") || rubroClean.includes("estéti") || rubroClean.includes("spa")) key = "wellness";
  else if (rubroClean.includes("inmob") || rubroClean.includes("propiedad")) key = "inmobiliaria";
  else if (rubroClean.includes("tech") || rubroClean.includes("saas") || rubroClean.includes("software")) key = "tech";
  else if (rubroClean.includes("servicio") || rubroClean.includes("agencia") || rubroClean.includes("pro")) key = "servicios-pro";
  else if (rubroClean.includes("moda") || rubroClean.includes("retail") || rubroClean.includes("tienda")) key = "retail";

  const candidate = path.join(repoRoot, "clientes", "quantum-hive", "assets", "by-rubro", key);
  if (existsSync(candidate)) sourceDir = candidate;
}

if (sourceDir && existsSync(sourceDir)) {
  await mkdir(brandDir, { recursive: true });
  const approved = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webm", ".webp", ".mp4"]);
  const entries = await readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !approved.has(path.extname(entry.name).toLowerCase())) continue;
    const safeName = entry.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
    await copyFile(path.join(sourceDir, entry.name), path.join(brandDir, safeName));
    copiedAssets.push(safeName);
  }
  assetNames = copiedAssets;
}

await mkdir(brandDir, { recursive: true });
const signatureAssetName = "quantumhive-isotipo.webp";
const signatureAssetSource = path.join(repoRoot, "clientes", "quantum-hive", "public", "marca", signatureAssetName);
await access(signatureAssetSource);
await copyFile(signatureAssetSource, path.join(brandDir, signatureAssetName));
if (!copiedAssets.includes(signatureAssetName)) copiedAssets.push(signatureAssetName);
assetNames = copiedAssets;

const safeAsset = (name) => {
  if (!name) return null;
  const base = path.basename(String(name)).replace(/[^a-zA-Z0-9._-]+/g, "-");
  return copiedAssets.includes(base) ? base : null;
};
const logo = safeAsset(brand.logo);
const hero = safeAsset(brand.hero);
const gallery = unique(Array.isArray(brand.gallery) ? brand.gallery.map(safeAsset) : []).filter(Boolean);
const contentPool = gallery.length ? gallery : assetNames.filter((name) => name !== logo && name !== hero);
const autoImages = {};
let contentIndex = 0;
for (const image of inventory.images || []) {
  let file = null;
  if (image.role === "logo") file = logo;
  else if (image.role === "hero") file = hero || (contentPool.length ? contentPool[contentIndex++ % contentPool.length] : null);
  else if (image.role === "content" && contentPool.length) file = contentPool[contentIndex++ % contentPool.length];
  if (file) autoImages[image.id] = { src: `../brand/${file}`, alt: `${business.name} — ${business.rubro || "imagen"}` };
}
for (const [id, configured] of Object.entries(adaptation.images || {})) {
  const item = typeof configured === "string" ? { file: configured } : configured;
  const file = safeAsset(item.file);
  if (file) autoImages[id] = { src: `../brand/${file}`, alt: item.alt || `${business.name} — ${business.rubro || "imagen"}` };
}

const autoLinks = {};
for (const link of inventory.links || []) {
  if (link.role === "email" && contact.email) autoLinks[link.id] = `mailto:${contact.email}`;
  else if (link.role === "phone" && contact.phone) autoLinks[link.id] = `tel:${String(contact.phone).replace(/[^+\d]/g, "")}`;
  else if (link.role === "cta" && contact.ctaUrl) autoLinks[link.id] = contact.ctaUrl;
  else if (link.role === "nav" && site.catalogUrl && /work|portfolio|catalog/i.test(link.href || "")) autoLinks[link.id] = site.catalogUrl;
}
const linkMap = { ...autoLinks, ...(adaptation.links || {}) };

let localized = rawHtml
  .replaceAll('href="assets/', 'href="../raw/assets/')
  .replaceAll('src="assets/', 'src="../raw/assets/')
  .replaceAll('content="assets/', 'content="../raw/assets/')
  .replaceAll('url(assets/', 'url(../raw/assets/');
localized = localized.replace(
  /(<(?:link|script)\b[^>]*(?:href|src)=["']\.\.\/raw\/assets\/[^"']+["'][^>]*?)\s+integrity=(?:"[^"]*"|'[^']*')/gi,
  "$1",
);
const transformed = transformHtml(localized, { texts: textMap, images: autoImages, links: linkMap });
let html = transformed.html;

html = html
  .replace(/<!--\s*This site was created in Webflow[\s\S]*?-->/gi, "")
  .replace(/<!--\s*Last Published:[\s\S]*?-->/gi, "")
  .replace(/<a\b[^>]*(?:href=["'][^"']*webflow\.com|class=["'][^"']*w-webflow-badge)[^>]*>(?:(?!<\/a>)[\s\S])*<\/a>/gi, "")
  .replace(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*(?:Made in Webflow|Powered by Webflow|Powered by Quantum Hive)(?:(?!<\/a>)[\s\S])*<\/a>/gi, "");

const title = business.headline ? `${business.name} | ${business.headline}` : business.name;
const description = business.description || `${business.name} — ${business.rubro || "sitio oficial"}`;
html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title.replace(/[<>&]/g, "")}</title>`);
html = html.replace(/<html([^>]*)\slang=("[^"]*"|'[^']*')/i, `<html$1 lang="${site.language || "es-AR"}"`);
const safeTitle = title.replace(/["<>&]/g, "");
const safeDescription = description.replace(/["<>&]/g, "");
html = html
  .replace(/<meta\s+[^>]*(?:name|property)=("(?:description|og:description|twitter:description)"|'(?:description|og:description|twitter:description)')[^>]*>/gi, (tag) => {
    return /property=/i.test(tag)
      ? `<meta property="${/twitter:/i.test(tag) ? "twitter:description" : "og:description"}" content="${safeDescription}">`
      : `<meta name="${/twitter:/i.test(tag) ? "twitter:description" : "description"}" content="${safeDescription}">`;
  })
  .replace(/<meta\s+[^>]*(?:name|property)=("(?:og:title|twitter:title)"|'(?:og:title|twitter:title)')[^>]*>/gi, (tag) => {
    return /property=/i.test(tag)
      ? `<meta property="og:title" content="${safeTitle}">`
      : `<meta name="twitter:title" content="${safeTitle}">`;
  });
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: business.name,
  description,
  url: site.domain ? `https://${String(site.domain).replace(/^https?:\/\//, "")}/` : undefined,
  inLanguage: site.language || "es-AR",
});
html = html.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, `<script type="application/ld+json">${structuredData}</script>`);
if (site.domain) html = html.replace(/data-wf-domain=("[^"]*"|'[^']*')/gi, `data-wf-domain="${String(site.domain).replace(/["<>&]/g, "")}"`);

const color = (value, fallback) => /^#[0-9a-f]{3,8}$/i.test(String(value || "")) ? value : fallback;
const colors = brand.colors || {};
const overrideSourceColors = brand.overrideSourceColors === true;
const paletteCss = overrideSourceColors ? `
:root{--qh-bg:${color(colors.background, "#080808")};--qh-surface:${color(colors.surface, "#121212")};--qh-primary:${color(colors.primary, "#d7b85b")};--qh-accent:${color(colors.accent, "#f3e6b4")};--qh-text:${color(colors.text, "#f7f2e7")}}
body{background-color:var(--qh-bg);color:var(--qh-text)}
::selection{background:var(--qh-primary);color:var(--qh-bg)}
` : "";
const brandCss = `<style id="qh-brand-overrides">
html,body{overflow-x:clip}
${paletteCss}
.noise{opacity:.1!important;animation:none!important;transition:none!important}
.noise .noise-default{opacity:1!important;transform:none!important;animation:none!important;transition:none!important}
.noise .noise-flipped{display:none!important;opacity:0!important;animation:none!important;transition:none!important}
.w-webflow-badge{display:none!important}
.qh-signature{background:#000!important;border-top:1px solid rgba(212,175,55,.28)!important;padding:2.25rem 1.5rem 2.5rem!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:1rem!important;text-align:center!important;color:#5f5a52!important;font-family:system-ui,-apple-system,"Segoe UI",sans-serif!important}
.qh-signature-brand{display:inline-flex!important;align-items:center!important;gap:.9rem!important;text-decoration:none!important;transition:opacity 200ms ease,transform 200ms ease!important}
.qh-signature-brand:hover{opacity:.9!important;transform:translateY(-1px)!important}
.qh-signature-iso{width:46px!important;height:46px!important;object-fit:contain!important;filter:drop-shadow(0 2px 8px rgba(212,175,55,.35))!important}
.qh-signature-text{display:flex!important;flex-direction:column!important;align-items:flex-start!important;line-height:1.15!important}
.qh-signature-eyebrow{font-size:.66rem!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:#8a7a4a!important}
.qh-signature-name{font-size:1.15rem!important;font-weight:800!important;letter-spacing:.14em!important;background:linear-gradient(90deg,#d4af37,#ffd700,#d4af37)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
.qh-signature-tagline{font-size:.68rem!important;color:#6f6a5e!important;letter-spacing:.02em!important}
.qh-signature-copy{font-size:.74rem!important;color:#5f5a52!important;max-width:60ch!important}
.qh-signature-copy a{color:#b8973a!important;text-decoration:none!important;transition:color 200ms ease!important}
.qh-signature-copy a:hover{color:#ffd700!important}
</style>`;
if (!html.includes('id="qh-brand-overrides"')) html = html.replace(/<\/head>/i, `${brandCss}</head>`);
if (!html.includes('id="qh-digital-signature"')) {
  const year = new Date().getFullYear();
  const signature = `<footer id="qh-digital-signature" class="qh-signature"><a href="https://www.quantumhive.com.ar" target="_blank" rel="noopener noreferrer" class="qh-signature-brand" aria-label="Sitio desarrollado por Quantum Hive"><img src="../brand/${signatureAssetName}" alt="Quantum Hive" class="qh-signature-iso" width="46" height="46" loading="lazy"><span class="qh-signature-text"><span class="qh-signature-eyebrow">Sitio desarrollado por</span><span class="qh-signature-name">QUANTUM HIVE</span><span class="qh-signature-tagline">Multi-Agent Business Infrastructure</span></span></a><span class="qh-signature-copy">© ${year} Quantum Hive. Todos los derechos reservados · Módulo <a href="https://websinteligentes.quantumhive.com.ar" target="_blank" rel="noopener noreferrer">Webs Inteligentes</a></span></footer>`;
  html = html.replace(/<\/body>/i, `${signature}</body>`);
}

const siteDir = path.join(templateRoot, "site");
await mkdir(siteDir, { recursive: true });
const outputPath = path.join(siteDir, "index.html");
await writeFile(outputPath, html, "utf8");

const sourceWIds = (rawHtml.match(/data-w-id/g) ?? []).length;
const adaptedWIds = (html.match(/data-w-id/g) ?? []).length;
const totalTexts = inventory.texts?.length || 0;
const eligibleTexts = (inventory.texts || []).filter((entry) => /[\p{L}]/u.test(entry.text)).length;
const changeRatio = eligibleTexts ? transformed.changedTexts / eligibleTexts : 1;
const layoutRiskTextIds = (inventory.texts || [])
  .filter((entry) => ["brand", "nav", "button", "heading", "label"].includes(entry.kind))
  .filter((entry) => String(textMap[entry.id] || "").length > Math.max(entry.chars * 1.65, entry.chars + 10))
  .map((entry) => entry.id);
const missingBrandAssets = [];
for (const match of html.matchAll(/(?:src|href)="\.\.\/brand\/([^"]+)"/g)) {
  try { await access(path.join(brandDir, path.basename(match[1]))); } catch { missingBrandAssets.push(match[1]); }
}
const checks = {
  textAdaptation: changeRatio >= 0.75,
  copyLengthSafe: layoutRiskTextIds.length === 0,
  effectsPreserved: sourceWIds === adaptedWIds,
  webflowRuntimePreserved: !inventory.summary?.webflowRuntime || /(?:src|href)=["'][^"']*webflow[^"']*\.js/i.test(html),
  jqueryRuntimePreserved: !inventory.summary?.jqueryRuntime || /(?:src|href)=["'][^"']*jquery[^"']*\.js/i.test(html),
  signaturePresent: html.includes('id="qh-digital-signature"') && html.includes(`../brand/${signatureAssetName}`),
  webflowBrandRemoved: !/(?:Made in Webflow|Powered by Webflow|<[^>]+class=["'][^"']*w-webflow-badge|<a[^>]+href=["'][^"']*webflow\.com)/i.test(html),
  assetsResolved: missingBrandAssets.length === 0,
};
const verify = {
  pass: Object.values(checks).every(Boolean),
  generatedAt: new Date().toISOString(),
  source: inventory.source,
  output: path.relative(repoRoot, outputPath),
  metrics: {
    totalTexts,
    eligibleTexts,
    changedTexts: transformed.changedTexts,
    changedTextPercent: Math.round(changeRatio * 100),
    changedImages: transformed.changedImages,
    copiedAssets: copiedAssets.length,
    changedLinks: transformed.changedLinks,
    sourceDataWId: sourceWIds,
    adaptedDataWId: adaptedWIds,
  },
  checks,
  issues: [
    ...missingBrandAssets.map((file) => `Asset faltante: ${file}`),
    ...layoutRiskTextIds.map((id) => `Texto demasiado largo para el bloque: ${id}`),
  ],
};
await writeFile(path.join(templateRoot, "VERIFY.json"), JSON.stringify(verify, null, 2), "utf8");
console.log(JSON.stringify(verify, null, 2));
if (!verify.pass) process.exitCode = 2;
