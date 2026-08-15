#!/usr/bin/env node
/**
 * extraer-efectos.mjs — Extrae los efectos reales de una web de referencia.
 *
 * Por que existe: las herramientas de navegador del agente controlan una pestaña
 * en segundo plano. Chrome congela requestAnimationFrame a 0 en pestañas de fondo,
 * asi que Lenis / GSAP / ScrollTrigger nunca avanzan y el agente termina leyendo
 * una web muerta. Playwright no tiene ese problema: la pagina siempre esta visible.
 *
 * Uso:
 *   node scripts/extraer-efectos.mjs <url> [--pasos 10] [--mobile] [--salida carpeta]
 *
 * Genera en investigacion/<host>/:
 *   MAPA_TECNOLOGIAS.json  — que librerias de animacion usa el sitio
 *   MAPA_SCROLL.json       — que cambia al scrollear, con valores exactos
 *   MAPA_ANIMACIONES.json  — keyframes y timing de cada animacion viva
 *   capturas/paso-NN.jpg   — una captura por paso de scroll
 */

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// ---------------------------------------------------------------- argumentos

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));

if (!url) {
  console.error('Falta la URL.\n  node scripts/extraer-efectos.mjs https://ejemplo.com');
  process.exit(1);
}

const opcion = (nombre, porDefecto) => {
  const i = args.indexOf(`--${nombre}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : porDefecto;
};

const PASOS = Number(opcion('pasos', 10));
const MOBILE = args.includes('--mobile');
const VIEWPORT = MOBILE ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const host = new URL(url).hostname.replace(/^www\./, '');
const SALIDA = path.resolve(opcion('salida', path.join('investigacion', host)));

// ------------------------------------------------- scripts que corren en la pagina

/** Mide cuantos frames dibuja el navegador en 1 segundo. Si da 0, todo lo demas miente. */
const medirFps = async (page) =>
  page.evaluate(async () => {
    let frames = 0;
    const t0 = performance.now();
    const tick = () => {
      frames++;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    await new Promise((r) => setTimeout(r, 1000));
    return {
      fps: +(frames / ((performance.now() - t0) / 1000)).toFixed(1),
      visibilityState: document.visibilityState,
    };
  });

/** Detecta librerias de animacion y scroll. */
const detectarTecnologias = (page) =>
  page.evaluate(() => {
    const html = document.documentElement;
    const scripts = [...document.querySelectorAll('script[src]')].map((s) => s.src);
    const buscarEnScripts = (re) => scripts.filter((s) => re.test(s));

    return {
      gsap: {
        global: typeof window.gsap !== 'undefined',
        version: window.gsap?.version ?? null,
        scrollTrigger: typeof window.ScrollTrigger !== 'undefined',
        // Si ScrollTrigger esta expuesto, esto es un volcado de toda la logica de scroll.
        triggers:
          typeof window.ScrollTrigger !== 'undefined'
            ? window.ScrollTrigger.getAll().map((t) => ({
                start: t.start,
                end: t.end,
                pin: !!t.pin,
                scrub: t.vars?.scrub ?? null,
                trigger: t.trigger?.tagName + '.' + (t.trigger?.className || '').toString().split(' ')[0],
              }))
            : null,
        bundleado: buscarEnScripts(/gsap|scrolltrigger/i),
      },
      lenis: {
        clase: html.className.includes('lenis'),
        instancia: typeof window.lenis !== 'undefined',
        bundleado: buscarEnScripts(/lenis/i),
      },
      locomotive: !!document.querySelector('[data-scroll-container]'),
      framerMotion: !!document.querySelector('[style*="--motion"], [data-framer-name]'),
      aos: !!document.querySelector('[data-aos]'),
      three: { global: typeof window.THREE !== 'undefined', bundleado: buscarEnScripts(/three|r3f/i) },
      canvas: [...document.querySelectorAll('canvas')].map((c) => ({
        w: c.width,
        h: c.height,
        contexto: c.getContext('webgl2') ? 'webgl2' : c.getContext('webgl') ? 'webgl' : '2d/desconocido',
      })),
      // CSS scroll-driven animations (scroll-timeline / view-timeline)
      cssScrollDriven: [...document.querySelectorAll('*')].some((el) => {
        const s = getComputedStyle(el);
        return s.animationTimeline && s.animationTimeline !== 'auto';
      }),
      scrollSnap: [...document.querySelectorAll('*')]
        .filter((el) => {
          const t = getComputedStyle(el).scrollSnapType;
          return t && t !== 'none';
        })
        .slice(0, 3)
        .map((el) => el.tagName + '.' + (el.className || '').toString().split(' ')[0]),
    };
  });

/** Marca los elementos que vamos a seguir, para poder re-consultarlos con un selector estable. */
const marcarElementos = (page) =>
  page.evaluate(() => {
    const candidatos = new Set();
    document.querySelectorAll('header, nav, section, main > div, footer').forEach((el) => candidatos.add(el));
    // Elementos que se ven animables aunque no sean secciones
    document.querySelectorAll('[class*="parallax" i],[class*="reveal" i],[class*="sticky" i],[data-scroll]')
      .forEach((el) => candidatos.add(el));

    let n = 0;
    [...candidatos].slice(0, 40).forEach((el) => {
      el.setAttribute('data-qh-id', `qh-${n++}`);
    });
    return n;
  });

const PROPS = [
  'transform', 'opacity', 'backgroundColor', 'color', 'filter', 'backdropFilter',
  'position', 'top', 'left', 'width', 'height', 'clipPath', 'borderRadius',
  'boxShadow', 'scale', 'rotate', 'translate', 'visibility',
];

/** Fotografia el estado de todos los elementos marcados. */
const capturarEstado = (page) =>
  page.evaluate(
    (props) => ({
      scrollY: Math.round(window.scrollY),
      alturaTotal: document.documentElement.scrollHeight,
      elementos: Object.fromEntries(
        [...document.querySelectorAll('[data-qh-id]')].map((el) => {
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return [
            el.getAttribute('data-qh-id'),
            {
              etiqueta: el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0].slice(0, 24),
              rect: { top: Math.round(r.top), alto: Math.round(r.height) },
              estilos: Object.fromEntries(props.map((p) => [p, s[p]])),
            },
          ];
        })
      ),
      animaciones: document.getAnimations().map((a) => {
        let keyframes = [];
        try {
          keyframes = a.effect.getKeyframes();
        } catch {}
        return {
          tipo: a.constructor.name,
          estado: a.playState,
          objetivo:
            (a.effect?.target?.tagName || '?') +
            '.' +
            (a.effect?.target?.className || '').toString().split(' ')[0].slice(0, 24),
          timing: a.effect?.getTiming?.() ?? null,
          keyframes,
        };
      }),
    }),
    PROPS
  );

/** Espera a que la pagina deje de moverse (preloader terminado, animaciones estabilizadas). */
async function esperarQueSeEstabilice(page, maxMs = 15000) {
  const t0 = Date.now();
  let anterior = null;
  let iguales = 0;
  while (Date.now() - t0 < maxMs) {
    const ahora = await page.evaluate(() => ({
      alto: document.documentElement.scrollHeight,
      texto: document.body.innerText.length,
      corriendo: document.getAnimations().filter((a) => a.playState === 'running').length,
    }));
    const firma = JSON.stringify(ahora);
    if (firma === anterior) {
      if (++iguales >= 2) return { estable: true, ms: Date.now() - t0, ...ahora };
    } else {
      iguales = 0;
    }
    anterior = firma;
    await page.waitForTimeout(600);
  }
  return { estable: false, ms: Date.now() - t0 };
}

// ------------------------------------------------------------------- el diff

/** Compara los estados y devuelve SOLO lo que cambio. Ese diff es la especificacion del efecto. */
function calcularDiff(muestras) {
  const cambios = {};
  const ids = Object.keys(muestras[0].estado.elementos);

  for (const id of ids) {
    const porProp = {};
    for (const prop of PROPS) {
      const serie = muestras.map((m) => m.estado.elementos[id]?.estilos?.[prop]);
      const distintos = [...new Set(serie.filter((v) => v !== undefined))];
      if (distintos.length > 1) {
        porProp[prop] = muestras.map((m, i) => ({
          paso: i,
          progreso: +(m.progreso * 100).toFixed(0) + '%',
          scrollY: m.estado.scrollY,
          valor: m.estado.elementos[id]?.estilos?.[prop],
        }));
      }
    }
    if (Object.keys(porProp).length) {
      cambios[id] = { etiqueta: muestras[0].estado.elementos[id].etiqueta, propiedades: porProp };
    }
  }
  return cambios;
}

// -------------------------------------------------------------------- main

async function main() {
  await mkdir(path.join(SALIDA, 'capturas'), { recursive: true });

  console.log(`\n  Objetivo : ${url}`);
  console.log(`  Viewport : ${VIEWPORT.width}x${VIEWPORT.height}${MOBILE ? ' (mobile)' : ''}`);
  console.log(`  Salida   : ${SALIDA}\n`);

  const navegador = await chromium.launch({
    headless: true,
    args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--disable-lcd-text'],
  });
  const contexto = await navegador.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    isMobile: MOBILE,
    hasTouch: MOBILE,
  });
  const page = await contexto.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

    // ---- GUARDA: sin frames no hay nada que extraer -------------------------
    const salud = await medirFps(page);
    console.log(`  fps=${salud.fps}  visibilityState=${salud.visibilityState}`);
    if (salud.fps < 5) {
      console.error(
        `\n  ABORTADO: el navegador no esta dibujando frames (fps=${salud.fps}).\n` +
          `  Todo lo que se extraiga de aca seria una web congelada.\n`
      );
      process.exitCode = 2;
      return;
    }

    const estabilidad = await esperarQueSeEstabilice(page);
    console.log(`  estabilizada: ${estabilidad.estable ? 'si' : 'no (timeout)'} en ${estabilidad.ms}ms`);

    // ---- GUARDA: el sitio puede estar bloqueando la automatizacion ----------
    const bloqueo = await page.evaluate(() => {
      const t = document.body.innerText.slice(0, 600);
      const patrones = [
        /security checkpoint/i, /failed to verify your browser/i, /just a moment/i,
        /checking your browser/i, /enable javascript and cookies/i,
        /access denied/i, /are you a robot/i, /captcha/i,
      ];
      const coincide = patrones.find((p) => p.test(t));
      return {
        bloqueado: !!coincide && document.body.innerText.length < 1500,
        motivo: coincide?.source ?? null,
        texto: t.trim().slice(0, 200),
        elementos: document.querySelectorAll('*').length,
      };
    });

    if (bloqueo.bloqueado || bloqueo.elementos < 60) {
      console.error(
        `\n  ABORTADO: el sitio no sirvio la pagina real a un navegador automatizado.\n` +
          `  Detectado : ${bloqueo.motivo ?? 'pagina casi vacia'} (${bloqueo.elementos} elementos)\n` +
          `  En pantalla: "${bloqueo.texto}"\n\n` +
          `  Esto NO se evade. Opciones: pedir permiso al dueño del sitio,\n` +
          `  o elegir otra referencia que no bloquee automatizacion.\n`
      );
      process.exitCode = 3;
      return;
    }

    const tecnologias = await detectarTecnologias(page);
    const marcados = await marcarElementos(page);
    console.log(`  elementos seguidos: ${marcados}\n`);

    // ---- barrido de scroll con rueda REAL -----------------------------------
    const alturaTotal = await page.evaluate(() => document.documentElement.scrollHeight);
    const recorrido = alturaTotal - VIEWPORT.height;
    const deltaPorPaso = Math.max(1, Math.round(recorrido / PASOS));
    const muestras = [];

    for (let i = 0; i <= PASOS; i++) {
      if (i > 0) {
        // Rueda real: es lo unico que Lenis / Locomotive / ScrollTrigger escuchan.
        // window.scrollTo() no dispara su logica.
        let restante = deltaPorPaso;
        while (restante > 0) {
          const trozo = Math.min(120, restante);
          await page.mouse.wheel(0, trozo);
          restante -= trozo;
          await page.waitForTimeout(16);
        }
        await page.waitForTimeout(900); // que el scroll suavizado termine de asentarse
      }

      const estado = await capturarEstado(page);
      muestras.push({ paso: i, progreso: i / PASOS, estado });

      const archivo = path.join(SALIDA, 'capturas', `paso-${String(i).padStart(2, '0')}.jpg`);
      await page.screenshot({ path: archivo, quality: 80, type: 'jpeg' });
      console.log(`  paso ${String(i).padStart(2)}  scrollY=${String(estado.scrollY).padStart(6)}  animaciones=${estado.animaciones.length}`);
    }

    // ---- resultados ---------------------------------------------------------
    const diff = calcularDiff(muestras);
    const animacionesUnicas = [];
    const vistas = new Set();
    for (const m of muestras) {
      for (const a of m.estado.animaciones) {
        const clave = a.objetivo + JSON.stringify(a.timing) + JSON.stringify(a.keyframes);
        if (!vistas.has(clave)) {
          vistas.add(clave);
          animacionesUnicas.push(a);
        }
      }
    }

    const meta = { url, host, viewport: VIEWPORT, pasos: PASOS, fps: salud.fps, fecha: new Date().toISOString() };

    await writeFile(
      path.join(SALIDA, 'MAPA_TECNOLOGIAS.json'),
      JSON.stringify({ meta, tecnologias }, null, 2)
    );
    await writeFile(
      path.join(SALIDA, 'MAPA_SCROLL.json'),
      JSON.stringify({ meta, alturaTotal, elementosQueCambian: diff }, null, 2)
    );
    await writeFile(
      path.join(SALIDA, 'MAPA_ANIMACIONES.json'),
      JSON.stringify({ meta, total: animacionesUnicas.length, animaciones: animacionesUnicas }, null, 2)
    );

    // ---- resumen en consola -------------------------------------------------
    const libs = [
      tecnologias.gsap.global && `GSAP ${tecnologias.gsap.version ?? ''}`,
      tecnologias.gsap.scrollTrigger && `ScrollTrigger (${tecnologias.gsap.triggers?.length ?? 0} triggers)`,
      tecnologias.lenis.clase && 'Lenis',
      tecnologias.locomotive && 'Locomotive',
      tecnologias.aos && 'AOS',
      tecnologias.three.global && 'Three.js',
      tecnologias.cssScrollDriven && 'CSS scroll-driven',
      tecnologias.canvas.length && `${tecnologias.canvas.length} canvas`,
    ].filter(Boolean);

    console.log(`\n  Tecnologias  : ${libs.join(' · ') || 'ninguna detectada globalmente'}`);
    console.log(`  Cambian con scroll : ${Object.keys(diff).length} elementos`);
    console.log(`  Animaciones unicas : ${animacionesUnicas.length}`);
    console.log(`\n  Escrito en ${SALIDA}\n`);

    for (const [id, info] of Object.entries(diff).slice(0, 6)) {
      console.log(`   ${info.etiqueta}  ->  ${Object.keys(info.propiedades).join(', ')}`);
    }
    console.log();
  } finally {
    await navegador.close();
  }
}

main().catch((e) => {
  console.error('\n  Fallo:', e.message, '\n');
  process.exit(1);
});
