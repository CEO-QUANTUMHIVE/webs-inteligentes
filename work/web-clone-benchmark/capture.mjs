import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import https from 'https';
import http from 'http';

const URL = 'https://studiovanadium.com/';
const OUTPUT_DIR = join(import.meta.dirname, '..', 'outputs', 'studio-vanadium-clone');
const RAW_DIR = join(OUTPUT_DIR, 'raw');
const ASSETS_DIR = join(OUTPUT_DIR, 'assets');

// Create directories
[OUTPUT_DIR, RAW_DIR, ASSETS_DIR].forEach(dir => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        writeFileSync(filepath, buffer);
        resolve({ url, filepath, size: buffer.length, status: res.statusCode });
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function capture() {
  console.log('🚀 Starting capture of', URL);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  // Collect console messages and failed requests
  const consoleMessages = [];
  const failedRequests = [];
  
  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
  page.on('requestfailed', req => failedRequests.push({ url: req.url(), error: req.failure()?.errorText }));
  
  console.log('📡 Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  
  // Wait for animations to settle
  await page.waitForTimeout(3000);
  
  console.log('📸 Taking screenshots...');
  await page.screenshot({ path: join(RAW_DIR, 'desktop-full.png'), fullPage: true });
  await page.screenshot({ path: join(RAW_DIR, 'desktop-viewport.png') });
  
  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(RAW_DIR, 'mobile-viewport.png') });
  await page.screenshot({ path: join(RAW_DIR, 'mobile-full.png'), fullPage: true });
  
  // Back to desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);
  
  console.log('🔍 Extracting page data...');
  
  // Get rendered HTML
  const html = await page.content();
  writeFileSync(join(RAW_DIR, 'rendered.html'), html);
  
  // Get page title and meta
  const meta = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    generator: document.querySelector('meta[name="generator"]')?.content,
    viewport: document.querySelector('meta[name="viewport"]')?.content,
  }));
  writeFileSync(join(RAW_DIR, 'meta.json'), JSON.stringify(meta, null, 2));
  
  // Detect runtime libraries
  const runtimeLibs = await page.evaluate(() => ({
    gsap: !!window.gsap,
    ScrollTrigger: !!window.ScrollTrigger,
    Swiper: !!window.Swiper,
    lenis: !!window.lenis,
    lottie: !!window.lottie || !!window.bodymovin,
    three: !!window.THREE,
    canvas: document.querySelectorAll('canvas').length,
    rive: document.querySelectorAll('[data-rive]').length,
    video: document.querySelectorAll('video').length,
  }));
  writeFileSync(join(RAW_DIR, 'runtime-libs.json'), JSON.stringify(runtimeLibs, null, 2));
  console.log('📦 Runtime libraries:', runtimeLibs);
  
  // Get all resources
  console.log('📊 Collecting resources...');
  const resources = await page.evaluate(() => {
    return performance.getEntriesByType('resource').map(r => ({
      name: r.name,
      type: r.initiatorType,
      duration: r.duration,
      size: r.transferSize || 0,
    }));
  });
  writeFileSync(join(RAW_DIR, 'resources.json'), JSON.stringify(resources, null, 2));
  console.log(`📁 Found ${resources.length} resources`);
  
  // Scroll through page to trigger lazy loading
  console.log('📜 Scrolling to trigger lazy loads...');
  await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    const scrollHeight = document.body.scrollHeight;
    const step = window.innerHeight;
    for (let y = 0; y < scrollHeight; y += step) {
      window.scrollTo(0, y);
      await delay(500);
    }
    window.scrollTo(0, 0);
  });
  
  await page.waitForTimeout(2000);
  
  // Get resources after scroll
  const resourcesAfterScroll = await page.evaluate(() => {
    return performance.getEntriesByType('resource').map(r => ({
      name: r.name,
      type: r.initiatorType,
      size: r.transferSize || 0,
    }));
  });
  writeFileSync(join(RAW_DIR, 'resources-after-scroll.json'), JSON.stringify(resourcesAfterScroll, null, 2));
  console.log(`📁 After scroll: ${resourcesAfterScroll.length} resources`);
  
  // Download all same-origin resources
  console.log('⬇️ Downloading assets...');
  const sameOrigin = resourcesAfterScroll.filter(r => 
    r.name.startsWith('https://studiovanadium.com/') ||
    r.name.startsWith('https://framerusercontent.com/') ||
    r.name.startsWith('https://fonts.gstatic.com/')
  );
  
  const downloadResults = [];
  for (const res of sameOrigin.slice(0, 50)) { // Limit to 50 for now
    try {
      const url = new URL(res.name);
      const filepath = join(ASSETS_DIR, url.pathname.replace(/\//g, '_').replace(/^_/, ''));
      const result = await downloadFile(res.name, filepath);
      downloadResults.push({ ...result, success: true });
      console.log(`  ✅ ${url.pathname}`);
    } catch (err) {
      downloadResults.push({ url: res.name, error: err.message, success: false });
      console.log(`  ❌ ${res.name}: ${err.message}`);
    }
  }
  writeFileSync(join(OUTPUT_DIR, 'ASSETS.json'), JSON.stringify(downloadResults, null, 2));
  
  // Save verification data
  const verification = {
    url: URL,
    timestamp: new Date().toISOString(),
    meta,
    runtimeLibs,
    resourceCount: resourcesAfterScroll.length,
    downloadedCount: downloadResults.filter(r => r.success).length,
    failedDownloads: downloadResults.filter(r => !r.success).length,
    consoleErrors: consoleMessages.filter(m => m.type === 'error').length,
    failedRequests: failedRequests.length,
    screenshots: {
      desktop: 'raw/desktop-viewport.png',
      mobile: 'raw/mobile-viewport.png',
      desktopFull: 'raw/desktop-full.png',
      mobileFull: 'raw/mobile-full.png',
    }
  };
  writeFileSync(join(OUTPUT_DIR, 'VERIFY.json'), JSON.stringify(verification, null, 2));
  
  console.log('\n✅ Capture complete!');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`📸 Screenshots: ${RAW_DIR}`);
  console.log(`📦 Assets: ${ASSETS_DIR}`);
  console.log(`📊 Resources: ${resourcesAfterScroll.length}`);
  console.log(`⬇️ Downloaded: ${downloadResults.filter(r => r.success).length}`);
  
  await browser.close();
}

capture().catch(console.error);
