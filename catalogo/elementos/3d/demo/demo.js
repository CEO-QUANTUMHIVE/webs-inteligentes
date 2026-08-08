// Demo de validacion del catalogo 3D.
// Reglas de performance implementadas: import dinamico de three, GLB lazy por
// IntersectionObserver, DPR limitado, render on-demand (sin loops inutiles),
// pausa fuera de viewport y con pestana oculta, fallback WebGL/red/modelo,
// prefers-reduced-motion y simplificacion tactil.

const $ = (s, r = document) => r.querySelector(s);

const PARAMS = new URLSearchParams(location.search);
const ES_TACTIL = matchMedia('(pointer: coarse)').matches;
// force-motion solo para el autotest headless (headless puede heredar reduced-motion del SO)
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches && !PARAMS.has('force-motion');
const DPR = Math.min(window.devicePixelRatio || 1, ES_TACTIL ? 1 : 1.5);

$('#st-dpr').textContent = String(DPR);
$('#st-pointer').textContent = ES_TACTIL ? 'tactil' : 'mouse';
$('#st-rm').textContent = REDUCED ? 'si (render estatico)' : 'no';

function hayWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}
const WEBGL = hayWebGL();
$('#st-webgl').textContent = WEBGL ? 'disponible' : 'NO disponible (fallback)';

// --- three se importa solo cuando hace falta --------------------------------
let THREE = null, GLTFLoader = null;
async function cargarThree() {
  if (THREE) return;
  THREE = await import('three');
  ({ GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js'));
}

// --- loop compartido on-demand ----------------------------------------------
const visoresActivos = new Set();
let rafId = 0;
function loop(t) {
  rafId = 0;
  let pendiente = false;
  for (const v of visoresActivos) {
    if (v.necesitaFrame()) { v.render(t); pendiente = true; }
  }
  if (pendiente && !document.hidden) rafId = requestAnimationFrame(loop);
}
function pedirFrame() {
  if (!rafId && !document.hidden && !REDUCED) rafId = requestAnimationFrame(loop);
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden && rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  else if (!document.hidden) pedirFrame();
});

// --- fallback por seccion (nunca rompe la pagina) ----------------------------
function aplicarFallback(sec, motivo) {
  const visor = $('.visor', sec);
  visor.innerHTML = '';
  const img = document.createElement('img');
  img.src = `../elementos/${sec.dataset.modelo}/preview.webp`;
  img.alt = `Preview estatico de ${sec.dataset.modelo}`;
  const aviso = document.createElement('p');
  aviso.className = 'aviso';
  aviso.textContent = `Vista estatica (${motivo})`;
  visor.append(img, aviso);
  sec.dataset.modo = 'fallback';
}

// --- base de un visor --------------------------------------------------------
class Visor {
  constructor(sec, visorEl) {
    this.sec = sec;
    this.el = visorEl;
    this.modelo = sec.dataset.modelo;
    this.sucio = true;          // necesita un frame
    this.frames = 0; this.t0 = 0;
    this.visible = false;
  }
  async init() {
    await cargarThree();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(DPR);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x30363f, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(2, 4, 3);
    this.scene.add(dir);

    this.el.innerHTML = '';
    this.renderer.domElement.setAttribute('role', 'img');
    this.renderer.domElement.setAttribute('aria-label', `Modelo 3D ${this.modelo}`);
    this.el.appendChild(this.renderer.domElement);

    const t0 = performance.now();
    const gltf = await new GLTFLoader().loadAsync(`../elementos/${this.modelo}/modelo.glb`);
    this.dtCarga = Math.round(performance.now() - t0);
    this.obj = gltf.scene;
    this.scene.add(this.obj);

    this.apisar();
    new ResizeObserver(() => this.apisar()).observe(this.el);

    this.fpsEl = $(`#fps-${this.sec.id.slice(2)}`);
    $(`#t-${this.sec.id.slice(2)}`).textContent = `${this.dtCarga} ms`;
    visoresActivos.add(this);
    this.marcar();
  }
  apisar() {
    const w = this.el.clientWidth || 1, h = this.el.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.marcar();
  }
  marcar() { this.sucio = true; if (this.visible) pedirFrame(); }
  necesitaFrame() { return this.sucio; }
  render(t) {
    this.sucio = false;
    this.tick(t);
    this.renderer.render(this.scene, this.camera);
    // fps promedio por segundo
    this.frames++;
    if (!this.t0) this.t0 = t;
    if (t - this.t0 >= 1000) {
      if (this.fpsEl) this.fpsEl.textContent = String(Math.round(this.frames * 1000 / (t - this.t0)));
      this.frames = 0; this.t0 = t;
    }
  }
  tick() {}
  setVisible(v) { this.visible = v; if (v) this.marcar(); else visoresActivos.delete(this); if (v) visoresActivos.add(this); }
}

// --- comportamiento: seguir_cursor + transformar_scroll (moneda) -------------
class VisorMoneda extends Visor {
  async init() {
    await super.init();
    // El GLB Kenney referencia una textura externa no embebida (hallazgo de esta
    // validacion). Patron del catalogo: el material se sobreescribe en runtime.
    this.obj.traverse((n) => {
      if (n.isMesh) n.material = new THREE.MeshStandardMaterial({
        color: 0xf5c542, metalness: 0.55, roughness: 0.25,
      });
    });
    const caja = new THREE.Box3().setFromObject(this.obj);
    const centro = caja.getCenter(new THREE.Vector3());
    this.obj.position.sub(centro);
    this.grupo = new THREE.Group();
    this.grupo.add(this.obj);
    this.scene.add(this.grupo);
    this.camera.position.set(0, 0, 3.2);
    this.objetivo = { x: 0, y: 0 };
    this.progreso = 0;

    if (!ES_TACTIL && !REDUCED) {
      document.addEventListener('pointermove', (e) => {
        this.objetivo.x = (e.clientX / innerWidth - 0.5) * 1.2;
        this.objetivo.y = -(e.clientY / innerHeight - 0.5) * 0.8;
        this.marcar();
      }, { passive: true });
    }
    if (!REDUCED) {
      addEventListener('scroll', () => {
        const r = this.sec.getBoundingClientRect();
        const total = r.height - innerHeight;
        this.progreso = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
        this.marcar();
      }, { passive: true });
    }
    this.marcar();
  }
  tick() {
    // seguir_cursor con easing; se detiene cuando converge (sin loop inutil)
    const g = this.grupo;
    const dx = this.objetivo.x - g.position.x, dy = this.objetivo.y - g.position.y;
    if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) {
      g.position.x += dx * 0.08; g.position.y += dy * 0.08;
      this.sucio = true;
    }
    // transformar_scroll
    const ry = this.progreso * Math.PI * 4;
    const es = 1 + this.progreso * 0.35;
    if (Math.abs(g.rotation.y - ry) > 1e-4 || Math.abs(g.scale.x - es) > 1e-4) {
      g.rotation.y = ry; g.rotation.x = this.progreso * 0.6;
      g.scale.setScalar(es);
      this.sucio = true;
    }
  }
}

// --- comportamiento: mirar_mouse (conejo) ------------------------------------
class VisorConejo extends Visor {
  async init() {
    await super.init();
    // La ficha lo indica: material original sin texturas con alphaMode BLEND.
    // Se sobreescribe en runtime (separacion modelo/comportamiento-material).
    this.obj.traverse((n) => {
      if (n.isMesh) n.material = new THREE.MeshStandardMaterial({
        color: 0x22d3ee, metalness: 0.35, roughness: 0.3,
      });
    });
    const caja = new THREE.Box3().setFromObject(this.obj);
    const centro = caja.getCenter(new THREE.Vector3());
    const tam = caja.getSize(new THREE.Vector3()).length();
    this.obj.position.sub(centro);
    this.obj.scale.setScalar(1.6 / tam);
    this.camera.position.set(0, 0, 2.4);
    this.meta = { x: 0, y: 0 };

    if (!ES_TACTIL && !REDUCED) {
      document.addEventListener('pointermove', (e) => {
        this.meta.y = (e.clientX / innerWidth - 0.5) * 1.4;
        this.meta.x = (e.clientY / innerHeight - 0.5) * 0.7;
        this.marcar();
      }, { passive: true });
    }
    this.marcar();
  }
  tick() {
    const dx = this.meta.y - this.obj.rotation.y, dy = this.meta.x - this.obj.rotation.x;
    if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) {
      this.obj.rotation.y += dx * 0.1;
      this.obj.rotation.x += dy * 0.1;
      this.sucio = true;
    }
  }
}

// --- comportamiento: arrastrar_rotar + orbita_zoom (ukelele) -----------------
class VisorUkelele extends Visor {
  async init() {
    await super.init();
    const caja = new THREE.Box3().setFromObject(this.obj);
    const centro = caja.getCenter(new THREE.Vector3());
    const tam = caja.getSize(new THREE.Vector3()).length();
    this.obj.position.sub(centro);
    this.obj.scale.setScalar(1.7 / tam);
    this.dist = 3.0;
    this.camera.position.set(0, 0, this.dist);
    this.vel = { x: 0, y: 0 };
    this.pointers = new Map();
    this.pinchDist = 0;

    const cv = this.renderer.domElement;
    cv.style.cursor = 'grab';
    cv.addEventListener('pointerdown', (e) => {
      try { cv.setPointerCapture(e.pointerId); } catch { /* pointerId sintetico (autotest) */ }
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        this.pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      }
      cv.style.cursor = 'grabbing';
    });
    cv.addEventListener('pointermove', (e) => {
      const p = this.pointers.get(e.pointerId);
      if (!p) return;
      if (this.pointers.size === 1) {
        this.vel.y = (e.clientX - p.x) * 0.006;
        this.vel.x = (e.clientY - p.y) * 0.006;
        this.obj.rotation.y += this.vel.y;
        this.obj.rotation.x += this.vel.x;
        this.marcar();
      } else if (this.pointers.size === 2) {
        p.x = e.clientX; p.y = e.clientY;
        const [a, b] = [...this.pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (this.pinchDist > 0) this.zoom(this.dist * (this.pinchDist / d));
        this.pinchDist = d;
      }
      p.x = e.clientX; p.y = e.clientY;
    });
    const soltar = (e) => {
      this.pointers.delete(e.pointerId);
      this.pinchDist = 0;
      cv.style.cursor = 'grab';
      this.marcar(); // inercia
    };
    cv.addEventListener('pointerup', soltar);
    cv.addEventListener('pointercancel', soltar);
    cv.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom(this.dist * (1 + e.deltaY * 0.001));
    }, { passive: false });

    $('#zoom-in').addEventListener('click', () => this.zoom(this.dist * 0.85));
    $('#zoom-out').addEventListener('click', () => this.zoom(this.dist * 1.18));
    this.marcar();
  }
  zoom(d) {
    this.dist = Math.min(5, Math.max(1.4, d));
    this.camera.position.z = this.dist;
    this.marcar();
  }
  tick() {
    // inercia del arrastre; se apaga sola
    if (Math.abs(this.vel.x) > 1e-4 || Math.abs(this.vel.y) > 1e-4) {
      this.obj.rotation.x += this.vel.x;
      this.obj.rotation.y += this.vel.y;
      this.vel.x *= 0.94; this.vel.y *= 0.94;
      this.sucio = true;
    }
  }
}

// --- arranque: lazy por IntersectionObserver ---------------------------------
const CLASES = { moneda: VisorMoneda, 'conejo-stanford': VisorConejo, ukelele: VisorUkelele };
const cargas = {};

function activar(sec) {
  const modelo = sec.dataset.modelo;
  if (cargas[modelo]) return cargas[modelo];
  cargas[modelo] = (async () => {
    try {
      if (!WEBGL) throw new Error('WebGL no disponible');
      const visor = new CLASES[modelo](sec, $('.visor', sec));
      await visor.init();
      sec._visor = visor;
      sec.dataset.modo = 'webgl';
      if (REDUCED) visor.render(performance.now()); // un solo frame estatico
      return visor;
    } catch (e) {
      aplicarFallback(sec, e.message || 'error de carga');
      return null;
    }
  })();
  return cargas[modelo];
}

const observer = new IntersectionObserver((ents) => {
  for (const en of ents) {
    const sec = en.target;
    if (en.isIntersecting) {
      activar(sec).then((v) => { if (v && !REDUCED) v.setVisible(true); });
    } else if (sec._visor) {
      sec._visor.setVisible(false);
    }
  }
}, { rootMargin: '150px' });

document.querySelectorAll('section.panel').forEach((s) => observer.observe(s));

// --- metricas globales --------------------------------------------------------
function pintarMetricas() {
  const partes = [];
  for (const sec of document.querySelectorAll('section.panel')) {
    partes.push(`${sec.dataset.modelo}: modo=${sec.dataset.modo || 'pendiente'}`);
  }
  partes.push(`three.js: ${THREE ? THREE.REVISION : 'no cargado'}`);
  partes.push(`reduced-motion=${REDUCED} dpr=${DPR} tactil=${ES_TACTIL}`);
  $('#metricas').textContent = 'metricas: ' + partes.join(' | ');
}
setInterval(pintarMetricas, 1500);
pintarMetricas();

// --- autotest (?autotest=1): dispara eventos sinteticos y verifica -----------
if (PARAMS.has('autotest')) {
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  (async () => {
    const out = [];
    const t0 = performance.now();
    await Promise.all(Object.values(cargas).length ? Object.values(cargas) : []);
    // forzar carga de las 3 secciones
    for (const sec of document.querySelectorAll('section.panel')) await activar(sec);
    await espera(400);

    const mon = $('#s-moneda')._visor, con = $('#s-conejo')._visor, uke = $('#s-ukelele')._visor;
    const prueba = (nombre, okv) => out.push(`${okv ? 'PASS' : 'FAIL'} ${nombre}`);

    if (mon && !REDUCED) {
      document.dispatchEvent(new PointerEvent('pointermove', { clientX: innerWidth * 0.9, clientY: innerHeight * 0.2 }));
      await espera(300);
      prueba('seguir_cursor', Math.abs(mon.grupo.position.x) > 0.01 || Math.abs(mon.objetivo.x) > 0.01);
      scrollTo(0, 400);
      dispatchEvent(new Event('scroll'));
      await espera(200);
      prueba('transformar_scroll', mon.progreso > 0 && Math.abs(mon.grupo.rotation.y) > 0.01);
    } else prueba('seguir_cursor/transformar_scroll', !!mon); // reduced-motion: carga estatica

    if (con && !REDUCED) {
      document.dispatchEvent(new PointerEvent('pointermove', { clientX: innerWidth * 0.1, clientY: innerHeight * 0.8 }));
      await espera(300);
      prueba('mirar_mouse', Math.abs(con.meta.y) > 0.01);
    } else prueba('mirar_mouse', !!con);

    if (uke) {
      const cv = uke.renderer.domElement;
      const r0 = uke.obj.rotation.y;
      cv.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 7, clientX: 100, clientY: 100, bubbles: true }));
      cv.dispatchEvent(new PointerEvent('pointermove', { pointerId: 7, clientX: 180, clientY: 100, bubbles: true }));
      cv.dispatchEvent(new PointerEvent('pointerup', { pointerId: 7, clientX: 180, clientY: 100, bubbles: true }));
      await espera(150);
      prueba('arrastrar_rotar', Math.abs(uke.obj.rotation.y - r0) > 0.01);
      const d0 = uke.dist;
      cv.dispatchEvent(new WheelEvent('wheel', { deltaY: -240, cancelable: true }));
      await espera(100);
      prueba('orbita_zoom', uke.dist !== d0);
    }

    prueba('fallback independiente', document.querySelectorAll('section.panel').length === 3);
    // rafaga de interaccion para medir throughput (fps) en este entorno
    for (let i = 0; i < 20; i++) {
      document.dispatchEvent(new PointerEvent('pointermove', { clientX: 200 + i * 30, clientY: 200 + (i % 5) * 40 }));
      await espera(100);
    }
    out.push(`fps bajo interaccion continua (swiftshader=CPU): moneda=${$('#fps-moneda').textContent} conejo=${$('#fps-conejo').textContent} ukelele=${$('#fps-ukelele').textContent}`);
    out.push(`modos: ${[...document.querySelectorAll('section.panel')].map((s) => `${s.dataset.modelo}=${s.dataset.modo}`).join(', ')}`);
    out.push(`errores: ${(window.__errores || []).length}`);
    out.push(`duracion autotest: ${Math.round(performance.now() - t0)} ms`);
    $('#autotest').textContent = 'autotest:\n' + out.join('\n');
    pintarMetricas();
  })();
}
