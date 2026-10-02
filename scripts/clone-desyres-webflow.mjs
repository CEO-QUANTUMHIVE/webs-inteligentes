import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const workspace = path.resolve(import.meta.dirname, "..");
const [requestedUrl, requestedSlug, requestedSourceFile] = process.argv.slice(2);
const sourceUrl = requestedUrl || "https://desyres-portfolio-template.webflow.io/";
const templateSlug = requestedSlug || "desyres-quantum";
const sourceFile = requestedSourceFile
  ? path.resolve(workspace, requestedSourceFile)
  : requestedUrl
    ? null
    : path.join(workspace, "work", "web-clone-benchmark", "desyres", "source.html");
const outputRoot = process.env.QH_CLONE_OUTPUT_ROOT
  ? path.resolve(workspace, process.env.QH_CLONE_OUTPUT_ROOT)
  : path.join(
      workspace,
      "clientes",
      "quantum-hive",
      "public",
      "templates",
      templateSlug,
      "raw",
    );
const assetsRoot = path.join(outputRoot, "assets");
const MAX_FILE_BYTES = 12 * 1024 * 1024;

await mkdir(assetsRoot, { recursive: true });

const originalHtml = sourceFile
  ? await readFile(sourceFile, "utf8")
  : await fetch(sourceUrl, {
      redirect: "follow",
      headers: { "user-agent": "QuantumHive-WebClone/1.0" },
    }).then(async (response) => {
      if (!response.ok) throw new Error(`No se pudo abrir ${sourceUrl}: HTTP ${response.status}`);
      return response.text();
    });
const htmlWithoutSrcset = originalHtml.replace(/\s+srcset=("[^"]*"|'[^']*')/gi, "");

function cleanUrl(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("\\/", "/")
    .replace(/[),;]+$/, "");
}

function collectDocumentUrls(html) {
  const urls = new Set();
  const attrPattern = /(?:src|href|poster)=["'](https?:\/\/[^"']+)["']/gi;
  for (const match of html.matchAll(attrPattern)) urls.add(cleanUrl(match[1]));

  const scriptPattern = /https?:\\?\/\\?\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%-]+/g;
  for (const match of html.matchAll(scriptPattern)) urls.add(cleanUrl(match[0]));

  return urls;
}

function safeFileName(url, contentType = "") {
  const parsed = new URL(url);
  let base = decodeURIComponent(path.posix.basename(parsed.pathname)) || "asset";
  base = base.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!path.extname(base)) {
    const extensionByType = {
      "text/css": ".css",
      "application/javascript": ".js",
      "text/javascript": ".js",
      "image/svg+xml": ".svg",
      "image/webp": ".webp",
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "font/woff2": ".woff2",
    };
    base += extensionByType[contentType.split(";")[0]] || ".bin";
  }
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 10);
  return `${hash}-${base}`;
}

const discovered = collectDocumentUrls(htmlWithoutSrcset);
const records = [];
const localByUrl = new Map();

async function download(url) {
  if (localByUrl.has(url)) return;
  const record = { url, status: "pending" };
  records.push(record);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "QuantumHive-WebClone/1.0" },
    });
    record.httpStatus = response.status;
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > MAX_FILE_BYTES) {
      record.status = "skipped-too-large";
      record.bytes = contentLength;
      return;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > MAX_FILE_BYTES) {
      record.status = "skipped-too-large";
      record.bytes = buffer.byteLength;
      return;
    }

    const contentType = response.headers.get("content-type") || "";
    const fileName = safeFileName(url, contentType);
    await writeFile(path.join(assetsRoot, fileName), buffer);
    record.status = "downloaded";
    record.bytes = buffer.byteLength;
    record.contentType = contentType;
    record.file = `assets/${fileName}`;
    localByUrl.set(url, record.file);
  } catch (error) {
    record.status = "failed";
    record.error = error instanceof Error ? error.message : String(error);
  }
}

async function downloadPool(urls, concurrency = Number(process.env.QH_CLONE_CONCURRENCY || 8)) {
  const queue = [...urls];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const url = queue.shift();
      if (url) await download(url);
    }
  });
  await Promise.all(workers);
}

await downloadPool(discovered);

const cssRecords = records.filter(
  (record) => record.status === "downloaded" && record.contentType?.includes("text/css"),
);

for (const cssRecord of cssRecords) {
  const cssPath = path.join(outputRoot, cssRecord.file);
  let css = await readFile(cssPath, "utf8");
  const nestedUrls = new Set();
  for (const match of css.matchAll(/url\((['"]?)([^)'"\s]+)\1\)/gi)) {
    const raw = cleanUrl(match[2]);
    if (raw.startsWith("data:")) continue;
    try {
      nestedUrls.add(new URL(raw, cssRecord.url).href);
    } catch {
      // Ignore malformed third-party URLs; they stay external.
    }
  }
  await downloadPool(nestedUrls);
  for (const nestedUrl of nestedUrls) {
    const local = localByUrl.get(nestedUrl);
    if (!local) continue;
    const relative = path.posix.relative("assets", local);
    css = css.split(nestedUrl).join(relative);
  }
  await writeFile(cssPath, css, "utf8");
}

let localizedHtml = htmlWithoutSrcset;
for (const [url, local] of localByUrl) {
  localizedHtml = localizedHtml.split(url).join(local);
  localizedHtml = localizedHtml.split(url.replaceAll("&", "&amp;")).join(local);
}

// Los recursos locales pueden haber cambiado al reescribir URLs internas. La firma SRI
// original ya no coincide y el navegador bloquearia CSS/JS validos del clon.
localizedHtml = localizedHtml.replace(
  /(<(?:link|script)\b[^>]*(?:href|src)=["']assets\/[^"']+["'][^>]*?)\s+integrity=(?:"[^"]*"|'[^']*')/gi,
  "$1",
);

localizedHtml = localizedHtml.replace(
  /<head>/i,
  `<head>\n<meta name="qh-clone-source" content="${sourceUrl}">`,
);

await writeFile(path.join(outputRoot, "index.html"), localizedHtml, "utf8");
await writeFile(path.join(outputRoot, "source.html"), originalHtml, "utf8");
await writeFile(
  path.join(outputRoot, "ASSETS.json"),
  JSON.stringify(
    {
      source: sourceUrl,
      downloadedAt: new Date().toISOString(),
      summary: records.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {}),
      assets: records,
    },
    null,
    2,
  ),
  "utf8",
);

console.log(JSON.stringify({ outputRoot, total: records.length, downloaded: localByUrl.size }, null, 2));
