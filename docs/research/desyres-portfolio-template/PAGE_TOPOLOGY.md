# Desyres Portfolio Template — topología de página

Fuente inspeccionada: `https://desyres-portfolio-template.webflow.io/`.

Este documento describe únicamente la arquitectura visual y el modelo de interacción que conviene trasladar a Quantum Hive. No es una especificación de contenido ni autoriza copiar textos o imágenes de la referencia.

## Runtime y estructura global

- Documento Webflow (`w-mod-js w-mod-ix w-mod-ix3`) con jQuery, runtime Webflow IX, GSAP 3.15, SplitText y ScrollTrigger.
- No hay `canvas`, `<video>`, Lenis ni Locomotive Scroll. El desplazamiento es nativo; GSAP/ScrollTrigger transforma elementos a partir del scroll.
- Desktop medido a `1440 × 900`: área útil `1425 px`, documento `16.369 px` de alto.
- Capas globales:
  1. header fijo a `top: 20 px`, `z-index: 10`;
  2. popup de navegación móvil fijo a viewport completo, normalmente oculto, `z-index: 5`;
  3. preload fijo de viewport completo, ya oculto después de reproducirse;
  4. contenido en flujo con dos secuencias sticky extensas;
  5. fondo de transición sticky que cambia de oscuro a claro.

## Orden visual desktop — 1440 × 900

| # | Bloque real | Rango/altura medida | Posición | Modelo |
|---|---|---:|---|---|
| 0 | `.section-navbar` | `y 20`, `h 29` | fixed | click + hover |
| 1 | `.section-hero` | `0–900`, `h 900` | flow | entrada inicial |
| 2 | `.section-about` | `900–1800`, `h 900` | flow | hover editorial |
| 3 | `.section-advantages` | `1800–2544`, `h 744` | flow, dentro de wrapper largo | scroll reveal |
| 4 | `.section-works` | empieza `y 2644`, `h 900` | sticky `top: 0` | scroll-driven 3D |
| 5 | `.section-testimonial` | `6244–6844`, `h 600` | flow, overflow hidden | marquee temporal |
| 6 | `.section-capabilities` | `6844–8497`, `h 1653` | flow | reveal + contador + marquee + hover |
| 7 | `.section-transitions` | `8497–11197`, `h 2700` | flow con hijo sticky | scroll-driven theme wipe |
| 8 | `.section-services` | `11197–16066`, `h 4869` | flow con varios sticky | scroll-driven stacking |
| 9 | `.section-footer` | `16066–16369`, `h 303` | flow | enlaces estáticos |

## Ensamble por bloque

### 1. Navegación global

- Logo a la izquierda; cuatro anclas a la derecha: About, Expertise, Works y Contact.
- En desktop cada etiqueta se duplica dentro de un wrapper con overflow para el intercambio vertical en hover.
- En `max-width: 991px`, la navegación horizontal se oculta y aparece un botón hamburguesa de `32 × 32 px`.
- El popup móvil ocupa `100vw × 100vh`, es fixed y contiene cuatro enlaces apilados.

### 2. Hero editorial

- Pantalla completa (`100vh`).
- Eyebrow `/AI ENGINEER` sobre una palabra-marca enorme pegada a la zona inferior.
- En desktop el display mide aproximadamente `1203 × 288 px`; en móvil el texto baja a `78.06 px` y ocupa `326 × 78 px`.
- No usa imagen hero ni canvas: el impacto depende de escala tipográfica, aire y contraste.

### 3. About como lista manifiesto

- Cuatro renglones grandes separados por líneas: “HEY, I’M DAVID!”, “AI ENGINEER”, “BRAND VOICE”, “EMPOWER CODE”.
- Cada renglón contiene una imagen colapsada que se revela horizontalmente en hover.
- Dos párrafos breves se alinean en la parte inferior en desktop/tablet y se apilan en móvil.

### 4. Advantages

- Título grande en columna izquierda y etiqueta `/ADVANTAGES` con cuatro argumentos numerados a la derecha.
- Es contenido de apoyo previo a la secuencia visual de trabajos.
- El wrapper conjunto `.advantages---works-wrapper` mide `4444 px`; permite que Works permanezca fijado durante varios viewports.

### 5. Selected Works

- Sección de `100vh` con `position: sticky; top: 0`.
- Titulares laterales `/SELECTED` y `CASE STUDIES` convergen hacia el centro.
- Cuatro casos se comprimen, despliegan y rotan como un carrusel 3D conducido por scroll; cada tarjeta sigue siendo un enlace a su detalle.
- No es slider por clic: el estado y la tarjeta dominante dependen del progreso vertical.

### 6. Testimonial

- Banda negra de `600 px`, título superior y dos copias contiguas del mismo grupo de cuatro testimonios.
- La duplicación permite un marquee horizontal infinito sin salto.

### 7. Capabilities

- Encabezado tipográfico con letras divididas por SplitText.
- Fila superior: impacto/contador y herramientas.
- Cinta de 12 logos repartidos en dos tracks contiguos.
- Fila media: cuatro expertise con hover.
- Fila inferior: cuatro explicaciones de sistemas.

### 8. Transición de tema

- Sección vacía de `2700 px` cuya única función es coreográfica.
- Un fondo claro sticky escala verticalmente de `scaleY(0)` a `scaleY(1)` hasta cubrir el viewport y preparar Services.

### 9. Services + CTA

- Encabezado de `100vh` sticky a `top: 90 px` en desktop.
- Descripción sticky cerca del borde inferior (`top: 720 px` desktop).
- Tres cards de servicio de `1345 × 810 px`, sticky a `top: 66.6 px`, que se apilan una sobre otra al avanzar.
- Después del deck aparece el CTA “DRIVE CHANGE / MAKE IMPACT” con botón de contacto.

### 10. Footer

- Email/título, párrafo de cierre, firma y enlaces legales.
- En desktop es una franja de `303 px`; en móvil se apila y crece a `478 px`.

## Responsive medido

### Tablet — 768 × 900

- Documento: `16.408 px` de alto; contenido útil `753 px`.
- Hero y About conservan `900 px` de alto.
- Hero display: `153.6 px`.
- About pasa a columna, aunque mantiene la lista completa y su hover.
- Works conserva sticky `100vh`; Transitions y Services conservan sus coreografías.
- El menú responsive se rige por la regla CSS publicada `screen and (max-width: 991px)`.

### Móvil — 390 × 844

- Documento: `15.743 px`; ancho útil `375 px`; sin overflow horizontal.
- Márgenes laterales principales: `25 px`; ancho de contenido: `325 px`.
- Secuencia medida:
  - Hero `0–844`;
  - About `844–1688`;
  - Advantages `1688–2438`, `h 750`;
  - Works sticky desde `y 2538`, `h 844`;
  - Testimonial `5914–6514`, `h 600`;
  - Capabilities `6514–8129`, `h 1615`;
  - Transitions `8129–10661`, `h 2532`;
  - Services `10661–15265`, `h 4604`;
  - Footer `15266–15744`, `h 478`.
- About y sus descripciones se apilan.
- Services title cambia a columna y sigue sticky (`top: 84.4 px`); descripción sticky a `top: 675.2 px`.
- Cards de servicios: `325 × 760 px`, sticky a `top: 62.456 px`.

## Dependencias para la adaptación Quantum Hive

- La narrativa debe conservar esta alternancia: **promesa enorme → manifiesto/problema → beneficios → demostraciones visuales → prueba social → capacidades → cambio de tema → servicios apilados → CTA**.
- Works, la transición de tema y Services dependen de que ningún ancestro tenga `overflow: hidden` o `overflow-x: hidden`; usar `overflow-x: clip` en la página.
- Para fidelidad del movimiento conviene preservar el modelo Webflow/GSAP: no convertir Works en tabs ni Services en cards estáticas.
