#!/usr/bin/env node
import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { access, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { inspectHtml, parseCliArgs } from "./html-inventory.mjs";

const args = parseCliArgs(process.argv.slice(2));
if (!args.slug) {
  console.error("Uso: node qa.mjs --slug <slug> [--template-root <carpeta>]");
  process.exit(1);
}

const repoRoot = process.cwd();
const slug = String(args.slug).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
const templateRoot = args["template-root"]
  ? path.resolve(repoRoot, String(args["template-root"]))
  : path.join(repoRoot, "clientes", "quantum-hive", "public", "templates", slug);
const sitePath = path.join(templateRoot, "site", "index.html");
const html = await readFile(sitePath, "utf8");

const missingFiles = [];
for (const match of html.matchAll(/(src|href|poster)=["']([^"']+)["']/gi)) {
  const attribute = match[1].toLowerCase();
  const reference = match[2].split(/[?#]/)[0];
  if (!reference || /^(?:https?:|data:|mailto:|tel:|javascript:|#)/i.test(reference)) continue;
  const looksLikeFile = /\.[a-z0-9]{2,8}$/i.test(reference);
  if (attribute === "href" && !looksLikeFile && !/^\.\.\/(?:raw|brand)\//.test(reference)) continue;
  const target = path.resolve(path.dirname(sitePath), reference);
  if (!target.startsWith(`${templateRoot}${path.sep}`)) {
    missingFiles.push(reference);
    continue;
  }
  try { await access(target); } catch { missingFiles.push(reference); }
}

const chromeCandidates = [
  process.env.QH_CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe") : null,
].filter(Boolean);
let chromePath = null;
for (const candidate of chromeCandidates) {
  try { await access(candidate); chromePath = candidate; break; } catch { /* siguiente */ }
}
if (!chromePath) throw new Error("No se encontro Chrome. Defini QH_CHROME_PATH para el QA visual.");

const types = {
  ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".mp4": "video/mp4", ".png": "image/png",
  ".svg": "image/svg+xml", ".webm": "video/webm", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2",
};
const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "site/index.html";
  const filePath = path.resolve(templateRoot, relative);
  if (!filePath.startsWith(`${templateRoot}${path.sep}`)) return response.writeHead(403).end();
  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("not-file");
    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "Connection": "close",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForFile(filePath, timeout = 7000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try { await access(filePath); return; } catch { await sleep(75); }
  }
  throw new Error(`Chrome no creo ${filePath}`);
}

async function connectCdp(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let id = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result || {});
      return;
    }
    for (const listener of listeners.get(message.method) || []) listener(message.params || {});
  });
  return {
    send(method, params = {}) {
      id += 1;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    once(method, timeout = 20000) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`Timeout esperando ${method}`)), timeout);
        const handler = (params) => {
          clearTimeout(timer);
          listeners.set(method, (listeners.get(method) || []).filter((item) => item !== handler));
          resolve(params);
        };
        listeners.set(method, [...(listeners.get(method) || []), handler]);
      });
    },
    on(method, handler) {
      listeners.set(method, [...(listeners.get(method) || []), handler]);
    },
    close() { socket.close(); },
  };
}

async function captureViewport({ name, width, height }, pageUrl, profileRoot) {
  const userDataDir = path.join(profileRoot, name);
  const chrome = spawn(chromePath, [
    "--headless=new", "--disable-gpu", "--disable-breakpad", "--disable-crash-reporter",
    "--noerrdialogs", "--no-first-run", "--no-default-browser-check",
    "--remote-debugging-port=0", `--user-data-dir=${userDataDir}`,
    `--window-size=${width},${height}`, "about:blank",
  ], { stdio: "ignore", windowsHide: true });
  const activePortPath = path.join(userDataDir, "DevToolsActivePort");
  const localFailures = [];
  const browserErrors = [];

  try {
    await waitForFile(activePortPath);
    const [port] = (await readFile(activePortPath, "utf8")).trim().split(/\r?\n/);
    const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
    const target = targets.find((item) => item.type === "page");
    if (!target?.webSocketDebuggerUrl) throw new Error("Chrome no expuso una pagina controlable.");
    const cdp = await connectCdp(target.webSocketDebuggerUrl);
    cdp.on("Network.responseReceived", ({ response }) => {
      if (response.url.startsWith(pageUrl.split("/site/")[0]) && response.status >= 400) {
        localFailures.push({ status: response.status, url: response.url });
      }
    });
    cdp.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
      browserErrors.push(exceptionDetails?.text || "Excepcion de JavaScript");
    });
    await Promise.all([
      cdp.send("Page.enable"), cdp.send("Runtime.enable"), cdp.send("Network.enable"),
      cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 }),
    ]);
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: pageUrl });
    await loaded;
    await sleep(6500);
    const metricsResult = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const visible = [...document.body.querySelectorAll('h1,h2,h3,p,a,button')].filter((el) => {
          const s = getComputedStyle(el), r = el.getBoundingClientRect();
          return r.width > 1 && r.height > 1 && s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity || 1) > .05;
        });
        return {
          styleSheets: document.styleSheets.length,
          bodyTextLength: document.body.innerText.trim().length,
          visibleTextElements: visible.length,
          images: document.images.length,
          brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).length,
          htmlClasses: document.documentElement.className
        };
      })()`,
    });
    const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", fromSurface: true });
    const screenshotPath = path.join(templateRoot, `QA-${name}.png`);
    const screenshotBuffer = Buffer.from(screenshot.data, "base64");
    await writeFile(screenshotPath, screenshotBuffer);
    cdp.close();
    return {
      screenshot: { path: path.relative(repoRoot, screenshotPath), bytes: screenshotBuffer.length, width, height },
      metrics: metricsResult.result.value,
      localFailures,
      browserErrors,
    };
  } finally {
    chrome.kill();
    await sleep(200);
  }
}

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const pageUrl = `http://127.0.0.1:${address.port}/site/index.html`;
const profileDir = await mkdtemp(path.join(os.tmpdir(), "qh-clone-qa-"));
const results = [];
try {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) results.push(await captureViewport(viewport, pageUrl, profileDir));
} finally {
  await new Promise((resolve) => server.close(resolve));
  try { await rm(profileDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 }); } catch { /* Crashpad */ }
}

const [desktop, mobile] = results;
const inventory = inspectHtml(html);
const localFailures = [...desktop.localFailures, ...mobile.localFailures];
const browserErrors = [...new Set([...desktop.browserErrors, ...mobile.browserErrors])];
const expectsWebflowIx = /data-w-id/i.test(html);
const pass = missingFiles.length === 0
  && localFailures.length === 0
  && desktop.metrics.styleSheets >= 1
  && mobile.metrics.styleSheets >= 1
  && desktop.metrics.visibleTextElements >= 5
  && mobile.metrics.visibleTextElements >= 3
  && (!expectsWebflowIx || (desktop.metrics.htmlClasses.includes("w-mod-ix3") && mobile.metrics.htmlClasses.includes("w-mod-ix3")))
  && desktop.metrics.brokenImages === 0
  && mobile.metrics.brokenImages === 0;
const result = {
  pass,
  generatedAt: new Date().toISOString(),
  screenshots: { desktop: desktop.screenshot, mobile: mobile.screenshot },
  metrics: {
    inventoryTextNodes: inventory.texts.length,
    desktop: desktop.metrics,
    mobile: mobile.metrics,
  },
  missingFiles: [...new Set(missingFiles)],
  localFailures,
  browserErrors,
};
await writeFile(path.join(templateRoot, "VISUAL_QA.json"), JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(result, null, 2));
if (!pass) process.exitCode = 2;
