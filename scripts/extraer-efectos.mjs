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
      // Webflow IX2: anima con estilos inline desde rAF, no aparece en getAnimations().
      // La evidencia dura es webflow.js + los atributos data-w-id de cada interaccion.
      webflow: {
        ix2: document.querySelectorAll('[data-w-id]').length > 0,
        interacciones: document.querySelectorAll('[data-w-id]').length,
        bundleado: buscarEnScripts(/webflow/i),
        jquery: typeof window.jQuery !== 'undefined',
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

/**
 * Estructura tipada + presupuesto vertical.
 * Mecaniza las lecciones L01, L02, L03 y L12 de la prueba-01: el modelo contaba
 * <main> como seccion visual, apilaba alturas desde 0 ignorando rect.top real,
 * y no cerraba el alto del documento. Eso ahora lo calcula y lo verifica el script.
 */
const extraerEstructura = (page) =>
  page.evaluate(() => {
    const ENVOLTORIOS = new Set(['MAIN', 'BODY', 'HTML']);
    const alto = document.documentElement.scrollHeight;
    const desc = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        clase: (el.className || '').toString().split(' ')[0].slice(0, 40) || null,
        titulo: el.querySelector('h1,h2,h3')?.textContent?.trim().slice(0, 70) || null,
        top_px: Math.round(r.top + window.scrollY),
        alto_px: Math.round(r.height),
        position: s.position,
        // L12: una seccion pinned tiene alto visible != alto en flujo
        pinned: s.position === 'sticky' || s.position === 'fixed',
      };
    };

    const todos = [...document.querySelectorAll('body section, body main, body header, body footer, main > div')];
    const secciones_visuales = [];
    const contenedores_estructurales = [];
    const fuera_de_flujo = [];

    for (const el of todos) {
      const d = desc(el);
      const s = getComputedStyle(el);
      if (ENVOLTORIOS.has(el.tagName)) contenedores_estructurales.push(d);
      else if (s.position === 'fixed') fuera_de_flujo.push(d);
      else if (d.alto_px > 40) secciones_visuales.push(d);
    }

    // L03 + L12: el presupuesto vertical se calcula por UNION de intervalos, no sumando
    // alturas. Sumar hace doble cuenta cuando una seccion esta anidada o es un wrapper
    // pinned, que es justo el caso que hay que detectar, no esconder.
    const enFlujo = secciones_visuales.slice().sort((a, b) => a.top_px - b.top_px);

    const solapamientos = [];
    for (let i = 0; i < enFlujo.length; i++) {
      for (let j = i + 1; j < enFlujo.length; j++) {
        const a = enFlujo[i];
        const b = enFlujo[j];
        const finA = a.top_px + a.alto_px;
        if (b.top_px < finA - 2) {
          const contenida = b.top_px + b.alto_px <= finA + 2;
          solapamientos.push({
            exterior: `${a.tag}${a.clase ? '.' + a.clase : ''}@${a.top_px}`,
            interior: `${b.tag}${b.clase ? '.' + b.clase : ''}@${b.top_px}`,
            relacion: contenida ? 'anidada' : 'solapada',
            // L12: un wrapper que contiene otra seccion y mide mucho mas suele ser pin/sticky
            probable_pin: contenida && a.alto_px > b.alto_px * 1.2,
          });
        }
      }
    }

    // Union de intervalos cubiertos
    const fusionados = [];
    for (const s of enFlujo) {
      const ini = s.top_px;
      const fin = s.top_px + s.alto_px;
      const ultimo = fusionados[fusionados.length - 1];
      if (ultimo && ini <= ultimo.fin + 2) ultimo.fin = Math.max(ultimo.fin, fin);
      else fusionados.push({ ini, fin });
    }

    const huecos = [];
    let cursor = 0;
    for (const f of fusionados) {
      if (f.ini > cursor + 2) huecos.push({ desde_px: cursor, hasta_px: f.ini, alto_px: f.ini - cursor });
      cursor = Math.max(cursor, f.fin);
    }
    if (alto > cursor + 2) huecos.push({ desde_px: cursor, hasta_px: alto, alto_px: alto - cursor });

    const cubiertoPorSecciones = fusionados.reduce((a, f) => a + (f.fin - f.ini), 0);
    const cubierto = cubiertoPorSecciones + huecos.reduce((a, h) => a + h.alto_px, 0);

    return {
      document_height_px: alto,
      secciones_visuales,
      contenedores_estructurales,
      fuera_de_flujo,
      solapamientos,
      huecos,
      presupuesto_vertical: {
        cubierto_por_secciones_px: cubiertoPorSecciones,
        cubierto_por_huecos_px: huecos.reduce((a, h) => a + h.alto_px, 0),
        cubierto_px: cubierto,
        delta_px: Math.abs(alto - cubierto),
        cierra: Math.abs(alto - cubierto) <= 2,
      },
    };
  });

/**
 * Clasifica cada script externo. Mecaniza L04 (toda tecnologia necesita evidencia)
 * y L05 (los trackers se marcan EXCLUIR, nunca se reconstruyen).
 */
const clasificarScripts = (page) =>
  page.evaluate(() => {
    const TRACKERS = /googletagmanager|google-analytics|gtag\/js|analytics\.js|fbevents|connect\.facebook|logrocket|hotjar|clarity\.ms|segment\.(com|io)|mixpanel|amplitude|intercom|klaviyo|tiktok|pinterest|doubleclick|hubspot|matomo|plausible|posthog|sentry/i;
    const VISUAL = /gsap|scrolltrigger|lenis|locomotive|three|barba|swiper|splide|lottie|rive|aos|framer-motion|motion|anime|matter/i;

    return [...document.querySelectorAll('script[src]')].map((s) => {
      const url = s.src;
      const esTracker = TRACKERS.test(url);
      return {
        script_url: url,
        categoria: esTracker ? 'tracker_o_analytics' : VISUAL.test(url) ? 'tecnologia_visual' : 'runtime_reconstruible',
        accion_reconstruccion: esTracker ? 'EXCLUIR' : 'EVALUAR',
      };
    });
  });

/** Marca los elementos que vamos a seguir, para poder re-consultarlos con un selector estable. */
const marcarElementos = (page) =>
  page.evaluate(() => {
    const estructural = new Set();
    const animado = new Set();

    document.querySelectorAll('header, nav, section, main > div, footer').forEach((el) => estructural.add(el));

    // Elementos animados por JS. Webflow IX2, GSAP y compañia no aparecen en
    // getAnimations() porque escriben estilos inline desde un loop de rAF; su
    // huella es justamente ese style inline con transform/opacity.
    document.querySelectorAll('[style]').forEach((el) => {
      const s = el.getAttribute('style') || '';
      if (/transform|opacity|clip-path|filter/.test(s)) animado.add(el);
    });

    // Marcadores declarativos de las librerias mas comunes
    document
      .querySelectorAll('[data-w-id],[data-scroll],[data-aos],[data-framer-name],[class*="parallax" i],[class*="reveal" i],[class*="sticky" i]')
      .forEach((el) => animado.add(el));

    // La estructura entra completa; los animados se recortan para que el JSON no explote.
    const seleccion = [...estructural, ...[...animado].filter((el) => !estructural.has(el)).slice(0, 60)];

    let n = 0;
    for (const el of seleccion) el.setAttribute('data-qh-id', `qh-${n++}`);

    return { total: n, estructurales: estructural.size, animados: seleccion.length - estructural.size };
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
    const scripts = await clasificarScripts(page);
    const estructura = await extraerEstructura(page);
    const marcados = await marcarElementos(page);

    console.log(
      `  secciones=${estructura.secciones_visuales.length}` +
        `  contenedores=${estructura.contenedores_estructurales.length}` +
        `  fuera-de-flujo=${estructura.fuera_de_flujo.length}`
    );
    console.log(
      `  presupuesto vertical: ${estructura.presupuesto_vertical.cubierto_px}/${estructura.document_height_px}px ` +
        `${estructura.presupuesto_vertical.cierra ? 'CIERRA' : `NO CIERRA (delta ${estructura.presupuesto_vertical.delta_px}px)`}`
    );
    if (estructura.solapamientos.length) {
      const pins = estructura.solapamientos.filter((s) => s.probable_pin);
      console.log(
        `  secciones anidadas/solapadas: ${estructura.solapamientos.length}` +
          (pins.length ? `  (${pins.length} probable pin/sticky)` : '')
      );
      for (const s of pins.slice(0, 3)) console.log(`    pin? ${s.exterior}  contiene  ${s.interior}`);
    }
    console.log(
      `  elementos seguidos: ${marcados.total}  (${marcados.estructurales} estructurales + ${marcados.animados} animados por JS)\n`
    );

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
      JSON.stringify(
        {
          meta,
          // L04: nada se declara sin evidencia. Si no hay script_url ni window_var, es hipotesis.
          nota: 'Toda tecnologia necesita evidencia (script_url o window_var). Sin eso es hipotesis, no dato.',
          tecnologias,
          scripts_externos: scripts,
          // L05: los trackers nunca se reconstruyen
          excluir_por_tracker: scripts.filter((s) => s.accion_reconstruccion === 'EXCLUIR').map((s) => s.script_url),
        },
        null,
        2
      )
    );
    await writeFile(
      path.join(SALIDA, 'MAPA_ESTRUCTURA.json'),
      JSON.stringify({ meta, ...estructura }, null, 2)
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
      tecnologias.webflow.ix2 && `Webflow IX2 (${tecnologias.webflow.interacciones} interacciones)`,
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
