import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import https from 'https';

const OUTPUT_DIR = join(import.meta.dirname, '..', 'outputs', 'studio-vanadium-clone');
const ASSETS_DIR = join(OUTPUT_DIR, 'assets');

if (!existsSync(ASSETS_DIR)) mkdirSync(ASSETS_DIR, { recursive: true });

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { 
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
        resolve({ size: buffer.length });
      });
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function downloadImages() {
  console.log('⬇️ Downloading images from Framer CDN...');
  
  const resources = JSON.parse(readFileSync(join(OUTPUT_DIR, 'raw', 'resources-after-scroll.json'), 'utf-8'));
  
  // Filter to framer images
  const images = resources.filter(r => 
    r.name && r.name.includes('framerusercontent.com/images/')
  );
  
  console.log(`🖼️ Found ${images.length} images`);
  
  const results = [];
  let downloaded = 0;
  let failed = 0;
  
  for (const res of images) {
    try {
      // Create clean filename from URL
      const urlObj = new globalThis.URL(res.name);
      const hash = urlObj.pathname.split('/').pop().split('?')[0];
      const ext = res.name.includes('.gif') ? '.gif' : 
                  res.name.includes('.jpg') || res.name.includes('.jpeg') ? '.jpg' : 
                  res.name.includes('.webp') ? '.webp' : '.png';
      const filename = `img_${hash.substring(0, 20)}${ext}`;
      const filepath = join(ASSETS_DIR, filename);
      
      await downloadFile(res.name, filepath);
      results.push({ originalUrl: res.name, filename, success: true });
      downloaded++;
      console.log(`  ✅ [${downloaded}/${images.length}] ${filename}`);
    } catch (err) {
      results.push({ url: res.name, error: err.message, success: false });
      failed++;
      console.log(`  ❌ ${res.name.substring(0, 50)}: ${err.message}`);
    }
  }
  
  // Also download fonts from framer
  const fonts = resources.filter(r => 
    r.name && r.name.includes('framerusercontent.com/assets/') && 
    (r.name.endsWith('.woff2') || r.name.endsWith('.woff'))
  );
  
  console.log(`\n🔤 Found ${fonts.length} fonts`);
  
  for (const res of fonts) {
    try {
      const urlObj = new globalThis.URL(res.name);
      const filename = `font_${urlObj.pathname.split('/').pop()}`;
      const filepath = join(ASSETS_DIR, filename);
      
      await downloadFile(res.name, filepath);
      results.push({ originalUrl: res.name, filename, success: true });
      downloaded++;
      console.log(`  ✅ ${filename}`);
    } catch (err) {
      results.push({ url: res.name, error: err.message, success: false });
      failed++;
    }
  }
  
  writeFileSync(join(OUTPUT_DIR, 'IMAGES.json'), JSON.stringify(results, null, 2));
  
  console.log(`\n📊 Total: ${downloaded} downloaded, ${failed} failed`);
  return results;
}

downloadImages().catch(console.error);
