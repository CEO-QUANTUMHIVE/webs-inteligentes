import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const templateRoot = path.join(
  root,
  "clientes/quantum-hive/public/templates/desyres-quantum",
);
const sourcePath = path.join(templateRoot, "raw/index.html");
const outputDir = path.join(templateRoot, "site");
const outputPath = path.join(outputDir, "index.html");

let html = await fs.readFile(sourcePath, "utf8");

const replacements = [
  ["Desyres - Webflow HTML Website Template", "Webs Inteligentes | Quantum Hive"],
  ["Desyres is a modern portfolio website designed to showcase creative work with clean layouts, smooth interactions, and a refined visual style.", "Webs premium que presentan tu negocio, ordenan la información y quedan listas para integrar atención inteligente."],
  ["DESYRE", "FÁBRICA"],
  ["AI Engineering Studio", "TALLER OPERATIVO DE WEBS"],
  ["/AI Engineer", "/WEBS INTELIGENTES"],
  ["HEY, I’M DAVID!", "TU NEGOCIO 24/7"],
  ["AI ENGINEER", "AUTOMATIZADO"],
  ["BRAND VOICE", "CONECTADO"],
  ["EMPOWER CODE", "INTELIGENTE"],
  ["I design and deploy AI systems that\nsolve real problems.", "Entrás con la información de tu negocio.\nSalís con una web lista para trabajar."],
  ["I believe AI isn’t just about code, it’s\nabout creating tools.", "Elegís una base, la remixás con efectos\ny un agente te ayuda durante el proceso."],
  ["THIS, HOW I DEVELOP.", "ESTO ES LA FÁBRICA DE WEBS."],
  ["WHY IT MATTERS", "QUÉ HACÉS ADENTRO"],
  ["BUILT FOR YOU", "QUÉ GANÁS COMO CLIENTE"],
  ["/ADVANTAGES", "/EL RECORRIDO"],
  ["PRACTICAL", "CARGÁ TUS DATOS"],
  ["STRUCTURE", "ELEGÍ UNA PLANTILLA"],
  ["ADAPTIVE", "REMIXÁ CON EFECTOS"],
  ["IMPACTFUL", "PUBLICÁ CON TU AGENTE"],
  ["Models must solve real needs, not just benchmarks. Every line of code should serve people, products, and progress, not vanity metrics.", "Sumá servicios, productos, horarios, ubicación, contactos e imágenes reales de tu negocio."],
  ["Good ideas fall apart without structure. Clear process, clean pipelines, and scalable systems turn creativity into something that actually works.", "Recorré el catálogo y elegí una web completa como punto de partida, también en celular."],
  ["Technology changes fast, so solutions must bend, not break. Adaptability means staying useful tomorrow, not just impressive today.", "Combiná scroll, transiciones, cursor y canvas sin empezar otra vez desde cero."],
  ["Code is only as good as the difference it makes. Every build should improve accuracy, speed, or experience, because results are what truly matter.", "Aprobá la demo y conectá el agente que responde usando la información de tu negocio."],
  ["/SELECTED", "/ELEGÍ UNA BASE"],
  ["CASE STUDIES", "DESPUÉS HACELA TUYA"],
  ["Autonomous AI", "Base editorial"],
  ["Predictive Models", "Experiencia inmersiva"],
  ["Smart Chat System", "Web conectada"],
  ["Vision AI", "Colmena cuántica"],
  ["Engineering intelligence for motion. Advancing safety, control, and performance on every road ahead.", "Una estructura limpia para presentar negocios que necesitan claridad, jerarquía y confianza."],
  ["Forecasting the future with data-driven precision. Enabling businesses to act before trends even arrive.", "Scroll, capas y movimiento cinematográfico adaptados a una historia real de marca."],
  ["Redefining customer support with intelligent conversations that resolve, adapt seamlessly.", "Información aprobada y una experiencia preparada para integrar el agente conversacional."],
  ["Turning raw visuals into real-time insights. Sowering industries to see, react, and adapt faster than ever.", "Negro, dorado y panales para una presencia tecnológica propia de Quantum Hive."],
  ["/TESTIMONIAL", "/PIPELINE DE LA FÁBRICA"],
  ["OLIVE", "01 · TUS DATOS"],
  ["MARK", "02 · TU PLANTILLA"],
  ["ELLIE", "03 · TU REMIX"],
  ["RICHARD", "04 · TU AGENTE"],
  ["“Collaborating with David brought clarity and vision to our project. They transformed complex ideas into practical solutions that everyone could understand and apply.”", "Cargá la información real que la web y el agente necesitan conocer."],
  ["“Working with David gave us not just an engineer, but a strategic thinker. They made AI both understandable and incredibly useful.”", "Elegí una plantilla recorriendo ejemplos funcionales del catálogo."],
  ["“David helped us see beyond the technical side. They made the process intuitive, clear, and impactful, leaving us with tools we could immediately use.”", "Mezclá estructura, imágenes y efectos con ayuda del agente constructor."],
  ["“Partnering with David was like adding a new dimension to our team. They simplified the complicated, guided us with precision, and made the outcome exceptionally useful.”", "Integrá un agente conversacional que atiende con el contexto aprobado."],
  ["WE BELIEVE THAT THE RIGHT TOOLS CAN CHANGE EVERYTHING.", "UNA WEB INTELIGENTE NO SÓLO SE VE BIEN: ENTIENDE TU NEGOCIO Y PUEDE ATENDER."],
  ["/SKILLS", "/PERSONALIZACIÓN"],
  ["IMPACT", "DECISIONES"],
  ["Improved model accuracy", "Base · movimiento · interacción · remix"],
  ["TOOLS &amp;\nINTEGRATIONS", "SISTEMA &amp;\nEXPERIENCIA"],
  ["The latest and most advanced technologies and tools", "Una fábrica visual que conserva recursos probados y los combina para tu marca"],
  ["NLP", "BASE VISUAL"],
  ["Data Pipelines", "SCROLL"],
  ["MLOps", "MOUSE Y CANVAS"],
  ["LLM Itegrations", "REMIX"],
  ["SYSTEMS", "INTEGRACIÓN"],
  ["Keeps apps and models consistent everywhere.", "Servicios, productos, horarios y políticas aprobadas."],
  ["Tracks experiments and makes deployment simple.", "Demo visible para revisar y corregir sin imaginar el resultado."],
  ["Orchestrates services so everything runs in sync.", "Agente preparado en la Fábrica de Agentes con contexto claro."],
  ["Scales ideas into systems used at any size.", "Web y atención conectadas dentro de una sola experiencia."],
  ["WE PUSH FORWARD TO POWER YOUR DEFINING EDGE EXPERIENCE", "LA LANDING TE PRESENTA EL SISTEMA. LA FÁBRICA ES EL TALLER DONDE CONSTRUÍS TU WEB."],
  ["/SERVICES", "/DENTRO DE LA FÁBRICA"],
  ["VIEW SERVICE", "CONOCER MÁS"],
  ["AI SOLUTIONS", "CARGÁ Y ORDENÁ TU NEGOCIO"],
  ["Intelligent Systems", "ELEGÍ, PROBÁ Y REMIXÁ"],
  ["UX-driven", "INTEGRÁ TU AGENTE"],
  ["DRIVE CHANGE", "CONOCÉ EL SISTEMA"],
  ["MAKE IMPACT", "ENTRÁ A LA FÁBRICA"],
  ["Your next step starts with us.", "Tu web empieza con una decisión simple."],
  ["HELLO@8AM.DESIGN", "ABRIR LA FÁBRICA"],
  ["Have a challenge where AI could be the solution?", "¿Tu negocio merece una presencia más clara, profesional e inteligente?"],
  ["Let’s architect it, test it, and scale it.", "Elegí una base. La fábrica la adapta. Vos aprobás cada paso."],
  ["Let’s Build Together!", "CARGAR MI NEGOCIO"],
  ["@2025 All Right Reserved by", "Webs Inteligentes · 2026"],
  ["8AM DESIGN", "POWERED BY QUANTUM HIVE"],
  ["ABOUT", "FÁBRICA WEB"],
  ["EXPERTISE", "PLANTILLAS"],
  ["WORKS", "EFECTOS"],
  ["CONTACT", "EMPEZAR"],
];

for (const [from, to] of replacements) {
  html = html.replaceAll(from, to);
}

html = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Webs Inteligentes | Quantum Hive",
    url: "https://websinteligentes.quantumhive.com.ar/",
    inLanguage: "es-AR",
    description:
      "Webs premium personalizadas con catálogo, efectos, remixes y agente conversacional integrado.",
  })}</script>`,
);

html = html
  .replace('lang="en"', 'lang="es"')
  .replaceAll('data-wf-domain="desyres-portfolio-template.webflow.io"', 'data-wf-domain="websinteligentes.quantumhive.com.ar"')
  .replaceAll('href="assets/', 'href="../raw/assets/')
  .replaceAll('src="assets/', 'src="../raw/assets/')
  .replaceAll('content="assets/', 'content="../raw/assets/')
  .replaceAll('"assets/', '"../raw/assets/');

const imagePools = {
  image: ["brand-lockup.jpeg"],
  "hero-background-image": ["orchestration-background.jpeg"],
  "about-image": ["organic-honeycomb.jpeg", "futuristic-honeycomb.jpeg", "agi-fusion.jpeg", "orchestration-background.jpeg"],
  "advantages-image": ["organic-honeycomb.jpeg", "futuristic-honeycomb.jpeg", "agi-fusion.jpeg", "orchestration-background.jpeg"],
  "works-image": ["futuristic-honeycomb.jpeg", "organic-honeycomb.jpeg"],
  "advantage-item-image": ["organic-honeycomb.jpeg", "futuristic-honeycomb.jpeg", "agi-fusion.jpeg", "orchestration-background.jpeg"],
  "image-2": ["organic-honeycomb.jpeg", "futuristic-honeycomb.jpeg", "agi-fusion.jpeg", "orchestration-background.jpeg"],
  "capabilities-logo": ["brand-lockup.jpeg", "organic-honeycomb.jpeg", "futuristic-honeycomb.jpeg"],
  "system-icon": ["brand-lockup.jpeg", "organic-honeycomb.jpeg", "agi-fusion.jpeg", "futuristic-honeycomb.jpeg"],
  "services-image": ["organic-honeycomb.jpeg", "futuristic-honeycomb.jpeg", "agi-fusion.jpeg", "orchestration-background.jpeg"],
};

const counters = new Map();
html = html.replace(/<img\b[^>]*>/g, (tag) => {
  const className = tag.match(/class="([^"]*)"/)?.[1] ?? "";
  const key = Object.keys(imagePools).find((candidate) =>
    className.split(/\s+/).includes(candidate),
  );
  if (!key) return tag;
  const index = counters.get(key) ?? 0;
  counters.set(key, index + 1);
  const pool = imagePools[key];
  const src = `../brand/${pool[index % pool.length]}`;
  return tag
    .replace(/\s+srcset="[^"]*"/g, "")
    .replace(/\s+sizes="[^"]*"/g, "")
    .replace(/src="[^"]*"/, `src="${src}"`);
});

const navTargets = [
  ["#About", "/fabrica-web"],
  ["#Expertise", "/catalogo-plantillas"],
  ["#Works", "/catalogo-efectos"],
  ["#Contact", "https://wa.me/5491142070819?text=Hola!%20Quiero%20una%20Web%20Inteligente"],
  ["mailto:HELLO@8AM.DESIGN", "/catalogo-plantillas"],
];

for (const [from, to] of navTargets) {
  html = html.replaceAll(`href="${from}"`, `href="${to}"${to.startsWith("/") ? ' target="_top"' : ""}`);
}

html = html.replaceAll(/href="\/single-post\/[^"]*"/g, 'href="/catalogo-plantillas" target="_top"');
html = html.replaceAll('href="#"', 'href="/catalogo-efectos" target="_top"');

const brandCss = `
<style id="quantumhive-brand-overrides">
  :root {
    --base-color--50: #f3e6b4;
    --base-color--100: #e7d18a;
    --base-color--200: #d8bd67;
    --base-color--300: #c7a94e;
    --base-color--400: #aa8a35;
    --base-color--500: #806724;
    --base-color--600: #5f4c1e;
    --base-color--700: #392f19;
    --base-color--800: #1c1810;
    --base-color--900: #0d0c09;
    --base-color--950: #050505;
    --opacity-adjusting--950-80: #050505dc;
    --opacity-adjusting--950-60: #050505b8;
    --opacity-adjusting--950-50: #05050599;
  }
  html, body { background: #050505; overflow-x: clip; }
  body { color: #f3e6b4; }
  ::selection { color: #050505; background: #d7b85b; }
  .section-hero, .section-about, .section-advantages, .section-works,
  .section-testimonial, .section-capabilities { background-color: #050505; }
  .section-hero {
    background-image: linear-gradient(90deg, #050505 0%, #050505e8 34%, #05050573 68%, #050505 100%),
      url("../brand/dark-matte.jpeg");
    background-size: cover;
    background-position: center;
  }
  .hero-background-image, .works-image, .advantage-item-image, .services-image,
  .advantages-image, .about-image, .image-2 {
    filter: saturate(.72) contrast(1.12) brightness(.78) sepia(.16);
  }
  .hero-background-image {
    opacity: .74; mix-blend-mode: screen; object-fit: cover; object-position: 68% 42%;
    -webkit-mask-image: linear-gradient(90deg, transparent 4%, #000 42%, #000 78%, transparent 100%);
    mask-image: linear-gradient(90deg, transparent 4%, #000 42%, #000 78%, transparent 100%);
  }
  .navbar-logo .image { width: 188px; height: 30px; object-fit: contain; object-position: left center; }
  .section-navbar { backdrop-filter: blur(16px); }
  .navbar-wrapper { border-color: #d7b85b4d; }
  .section-services, .transitions-background { background: #d7b85b !important; color: #050505; }
  .services-item { box-shadow: 0 28px 80px #00000038; }
  .button, .nav-link, a { transition: color .25s ease, border-color .25s ease, background-color .25s ease; }
  .button:hover { border-color: #f3e6b4; }
  .capabilities-logo { border-radius: 10px; object-fit: cover; filter: sepia(.35) saturate(.7) brightness(.75); }
  .qh-powered {
    display: flex; justify-content: space-between; gap: 20px; align-items: center;
    padding: 24px 40px; border-top: 1px solid #d7b85b45; background: #050505;
    color: #d7b85b; font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
  }
  .qh-powered strong { font-size: 15px; }
  @media (max-width: 991px) {
    .qh-powered { padding: 22px 25px; align-items: flex-start; flex-direction: column; }
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto !important; }
  }
</style>`;

html = html.replace("</head>", `${brandCss}</head>`);
html = html.replace(
  "</body>",
  '<div class="qh-powered"><strong>Powered by Quantum Hive</strong><span>Webs premium · automatización · agentes</span></div></body>',
);

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputPath, html, "utf8");

console.log(`Adaptación generada: ${path.relative(root, outputPath)}`);
console.log(`Webflow data-w-id preservados: ${(html.match(/data-w-id/g) ?? []).length}`);
console.log(`Assets QuantumHive usados: ${(html.match(/\.\.\/brand\//g) ?? []).length}`);
