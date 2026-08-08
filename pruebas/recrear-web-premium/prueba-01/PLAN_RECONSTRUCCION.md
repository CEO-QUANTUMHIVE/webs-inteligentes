# Plan de Reconstrucción: Prueba 01 (Bucks Sauce - Gourmet BBQ Experience)

- **URL de Referencia:** https://buckssauce.com/
- **Proyecto Destino:** `pruebas/recrear-web-premium/prueba-01`
- **Nombre de Plantilla Interna:** `bucks-sauce-gourmet`
- **Rubro:** Gastronomía / Alimentos Gourmet / Salsas Artesanales
- **Tipo de Sitio:** Landing / Brand Experience / E-commerce de Producto Único
- **Objetivo de Recreación:** `pagina_completa`
- **Modo de Adaptación:** `neutral_catalogo`
- **Complejidad Técnica Asignada:** Experiencia Canvas
- **Fecha de Análisis:** 2026-08-07

---

## 1. Detección Tecnológica y Runtimes
El análisis empírico mediante Chrome headless reveló la siguiente infraestructura técnica en la fuente. Nota: el sitio activó un Vercel Security Checkpoint durante la primera petición de inspección — el evento fue registrado como BLOQUEADO y la inspección se completó en la sesión posterior sin emplear técnicas de evasión de seguridad.
- **Framework:** Next.js (Static Export con fragmentación de chunks via Turbopack).
- **Estilos:** Tailwind CSS con clases de utilidad complejas (`p-container`, `mt-25!`, `z-9990`) y variables CSS personalizadas.
- **CMS Headless:** Prismic CMS (`images.prismic.io`) para el almacenamiento de assets de producto.
- **Scroll Engine:** Lenis Smooth Scroll para desacoplamiento cinemático del viewport.
- **Visualizador 3D & Canvas:** Escena interactiva Three.js / HTML5 Canvas para el renderizado e inclinación (tilt) de la botella principal en el Hero.
- **Animaciones:** Transformaciones dinámicas CSS sincronizadas con scroll + badges animados en formato Lottie JSON.

---

## 2. Decisión del Router de Skills
- **Skill Elegida:** `true-web-clone`
- **Estrategia:** `true-web-clone` más reconstrucción especializada.
- **Justificación:** Debido a la integración de Lenis, canvas 3D interactivo en el Hero y la sección narrativa pinned de 3,149px de alto con scroll horizontal ("Why Bucks Sauce"), la skill adecuada para la captura cruda de transformaciones y timelines es `true-web-clone`. Posterior a dicha captura, la reconstrucción se modularizará limpiamente en componentes nativos de Next.js en React 19.

---

## 3. Desglose de Secciones y Arquitectura
La web se compone de **9 secciones visuales** + **1 contenedor estructural** (`main`), con una altura de documento total de **11,283 px**. El contenido dentro de `main` abarca de `top 100px` a `11040px` (altura 10,940px); el `footer` (hermano de `main`) se extiende de `11040px` a `11383px` medidos. Los rangos se tomaron de las posiciones reales medidas en `raw_inspection.json` (no apiladas contiguamente desde 0):

1. **`HeaderNavbar` (Fixed Header):** Navegación superior flotante con isotipo SVG, enlaces directos, botón de carrito interactivo y menú colapsable responsivo.
2. **`HeroProductStage` (Hero 3D Canvas):** Escena principal con titular serif gigante ("THE BBQ SAUCE THAT MAKES OTHER SAUCES INSECURE"), selector 01-03 de variaciones y lienzo Canvas 3D.
3. **`IntroManifesto` (Manifiesto de Marca):** Bloque tipográfico de manifiesto con efecto reveal al scroll.
4. **`IngredientsGrid` (Quality Badges & Parallax):** Cuadrícula de características (No HFCS, No Seed Oils, Gluten Free) acompañada de assets de ingredientes flotantes con parallax vertical.
5. **`ProductWeaponShowcase` (Showcase de Productos):** Catálogo de 3 productos individuales (Pineapple Sriracha, Habanero Garlic, Cherry Garlic) con toggle de imagen frente/dorso y botones de acción "ADD TO CART".
6. **`WhyStickyStorySection` (Sticky Narrative Scroll):** Sección de 3,149px de alto con scroll locked (pinned), texto marquee en movimiento y personajes Lottie animados.
7. **`BundlePackPricing` (Packs de Ahorro):** Selector de 3-Pack y 6-Pack con cálculo de descuento y galería fotográfica.
8. **`ReviewsGrid` (Prueba Social):** Grilla de testimonios y menciones de creadores/chefs destacados.
9. **`BucksClubFooter` (Footer & Newsletter):** Formulario de suscripción al club, mapa del sitio y derechos de autor.

---

## 4. Reutilización del Sistema Interno QuantumHive
Clasificación de componentes frente a nuestro catálogo existente:
- **`HeaderNavbar`:** *Adaptación* de Vengeance UI Floating Nav.
- **`HeroProductStage`:** *Reconstrucción total* con Three.js / React Three Fiber.
- **`IngredientsGrid`:** *Reutilización directa* de la plantilla de Gastronomía (Features Grid).
- **`ProductWeaponShowcase`:** *Adaptación* de componentes de catálogo Retail / Gastronomía.
- **`WhyStickyStorySection`:** *Reconstrucción total* utilizando GSAP ScrollTrigger / Lenis.
- **`BundlePackPricing`:** *Reutilización directa* de componentes de Pricing Packs.
- **`ReviewsGrid`:** *Reutilización directa* de Vengeance UI Testimonials.
- **`BucksClubFooter`:** *Adaptación* de Vengeance UI Footer.

---

## 5. Gestión de Assets y Reemplazos (SOLICITUD_ASSETS.json)
Para no violar derechos de autor ni reutilizar marcas registradas de Bucks Sauce Co.:
- **Logotipos e Isotipos:** Se sustituyen por la marca neutra gourmet *Artisan Flame Co.*
- **Renders de Botellas:** Se sustituirán por 3 renders 3D neutros generados por IA (Piña Sriracha, Habanero Ajo, Cereza Ajo).
- **Badges Lottie:** Se reemplazarán por ilustraciones SVG vectoriales del catálogo interno con micro-animaciones CSS keyframes.

---

## 6. Criterios de QA Visual y Funcional

### 6.1 Fidelidad Estructural y Layout
- Todas las 9 secciones de contenido visibles en desktop (1440px) y mobile (390px) deben renderizar sin solapamientos ni overflow horizontal no intencional.
- Tolerancia de desplazamiento de layout: ≤ 8px respecto a la referencia capturada (medible con inspección de bounding box).
- El breakpoint de hamburguesa debe activarse en el mismo rango de viewport que el original (≤ 768px).

### 6.2 Rendimiento (Core Web Vitals objetivo)
- **LCP** (Largest Contentful Paint): ≤ 2.5 s en conexión simulada 4G.
- **CLS** (Cumulative Layout Shift): < 0.1.
- **INP** (Interaction to Next Paint): < 200 ms para eventos de hover y click en botones principales.
- Puntuación Lighthouse Performance: ≥ 85 en mobile, ≥ 90 en desktop.

### 6.3 Fidelidad de Scroll e Interacción
- El tilt del canvas 3D del Hero debe responder al movimiento del mouse con latencia visual ≤ 16 ms (60 fps).
- La sección sticky "Why Bucks Sauce" debe mantener el pin durante el rango de scroll de 3,149px sin saltos ni flicker.
- Los botones "ADD TO CART" deben mostrar feedback visual (cambio de estado) en ≤ 100 ms tras el click.

### 6.4 Salud Técnica
- 0 errores en consola del navegador (nivel error o superior) al navegar la página completa.
- Compatibilidad estricta con React 19 (tipado `React.JSX.Element`, sin APIs deprecadas).
- Exportación estática Next.js válida (`output: "export"`) — `next build` debe completar sin errores.

### 6.5 Accesibilidad
- Todos los elementos interactivos (botones, links, inputs) deben tener atributos ARIA o texto visible accesible.
- Contraste de texto sobre fondo: ratio ≥ 4.5:1 para texto normal (WCAG AA).

---

> ✋ **CHECKPOINT HUMANO (PASO 12)**
> Este plan de reconstrucción, la detección tecnológica y la captura de artefactos han sido completados. 
> La ejecución se detiene en este punto a la espera de aprobación humana explícita antes de comenzar cualquier codificación o implementación de componentes.
