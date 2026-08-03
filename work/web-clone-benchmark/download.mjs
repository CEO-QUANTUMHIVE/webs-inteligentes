import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import https from 'https';
import http from 'http';

const OUTPUT_DIR = join(import.meta.dirname, '..', 'outputs', 'studio-vanadium-clone');
const ASSETS_DIR = join(OUTPUT_DIR, 'assets');

if (!existsSync(ASSETS_DIR)) mkdirSync(ASSETS_DIR, { recursive: true });

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://studiovanadium.com/'
      } 
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
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
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function downloadAssets() {
  console.log('⬇️ Downloading assets from resources-after-scroll.json...');
  
  const resources = JSON.parse(readFileSync(join(OUTPUT_DIR, 'raw', 'resources-after-scroll.json'), 'utf-8'));
  
  // Filter to downloadable resources
  const toDownload = resources.filter(r => 
    r.name && 
    (r.name.endsWith('.png') || r.name.endsWith('.jpg') || r.name.endsWith('.jpeg') ||
     r.name.endsWith('.webp') || r.name.endsWith('.gif') || r.name.endsWith('.svg') ||
     r.name.endsWith('.woff2') || r.name.endsWith('.woff') || r.name.endsWith('.ttf') ||
     r.name.endsWith('.mp4') || r.name.endsWith('.webm') || r.name.endsWith('.json') ||
     r.name.endsWith('.mjs') || r.name.endsWith('.js'))
  );
  
  console.log(`📁 Found ${toDownload.length} downloadable resources`);
  
  const results = [];
  let downloaded = 0;
  let failed = 0;
  
  for (const res of toDownload) {
    try {
      // Create filename from URL
      const urlObj = new globalThis.URL(res.name);
      const filename = urlObj.pathname.replace(/^\//, '').replace(/\//g, '_');
      const filepath = join(ASSETS_DIR, filename);
      
      const result = await downloadFile(res.name, filepath);
      results.push({ ...result, originalUrl: res.name, filename, success: true });
      downloaded++;
      console.log(`  ✅ [${downloaded}/${toDownload.length}] ${filename.substring(0, 60)}`);
    } catch (err) {
      results.push({ url: res.name, error: err.message, success: false });
      failed++;
      console.log(`  ❌ ${res.name.substring(0, 60)}: ${err.message}`);
    }
  }
  
  writeFileSync(join(OUTPUT_DIR, 'ASSETS.json'), JSON.stringify(results, null, 2));
  
  console.log(`\n📊 Results: ${downloaded} downloaded, ${failed} failed`);
  return results;
}

downloadAssets().catch(console.error);
