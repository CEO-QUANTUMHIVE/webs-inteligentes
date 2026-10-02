# Mapa de adaptación: Desyres → Quantum Hive

## Objetivo

Usar la estructura editorial, el ritmo de scroll y las animaciones nativas de
`https://desyres-portfolio-template.webflow.io/` como base visual de la landing
de Webs Inteligentes, reemplazando completamente la identidad y el contenido
del portfolio original por la propuesta real de Quantum Hive.

Este documento es un mapa de contenido. No autoriza a inventar proyectos,
clientes, testimonios, cifras de conversión ni integraciones que no estén
comprobadas.

## Fuentes auditadas

- Referencia Desyres: DOM público revisado el 2026-08-23.
- Copy actual de Quantum Hive:
  `clientes/quantum-hive/src/components/webs-inteligentes/LandingWebs.tsx`.
- Assets institucionales:
  `clientes/quantum-hive/public/marca/`.
- Rutas existentes del producto: catálogo, demos con scroll, catálogo de
  efectos y fábrica web.

## Dirección de marca obligatoria

- Fondo: negro profundo y grafito.
- Color dominante: dorado metálico tomado de los assets reales.
- Lenguaje visual: panales, hexágonos, circuitos y colmena cuántica.
- Cian y violeta: sólo como reflejos tecnológicos secundarios presentes en
  `portada-panal.webp`; no convertirlos en la paleta principal.
- Evitar verde lima, gradientes multicolor genéricos y estética gamer.
- Conservar de Desyres: escala tipográfica editorial, composición asimétrica,
  títulos cinéticos, imagen dominante, transiciones y ritmo de scroll.
- Reemplazar de Desyres: nombre, portfolio personal, textos, fotografías,
  testimonios, métricas, email, enlaces y toda referencia a David/8AM Design.

## Assets disponibles y uso recomendado

| Asset local | Contenido real | Uso recomendado en la adaptación |
|---|---|---|
| `/marca/wordmark.webp` | Wordmark metálico dorado `QUANTUM HIVE` | Navegación y footer. No estirarlo ni colocarlo sobre fondos claros. |
| `/marca/quantumhive-isotipo.webp` | Isotipo hexagonal con núcleo de colmena | Sello pequeño del hero, indicador de scroll o firma de una transición. No usar como imagen de pantalla completa. |
| `/marca/portada-panal.webp` | Composición vertical con marca, colmena dorada y núcleo cian/violeta | Imagen protagonista del hero o del manifiesto. Como ya incluye el nombre, evitar repetir otro wordmark grande encima. |
| `/marca/panal-circuito.webp` | Panal vertical negro/dorado conectado por circuitos | Sección de proceso, fábrica o agente conectado; funciona bien en una columna vertical con parallax. |
| `/marca/panal-ui.webp` | Panal horizontal con celdas negras, circuitos y redes | Sección de personalización, efectos o catálogo; apto para recorte panorámico y hover. |
| `/marca/hexagono-capacidades.webp` | Diagrama oscuro/dorado de capacidades: inteligencia, automatización, conocimiento, workflow y multiagente | Sección de sistema inteligente o capa conversacional. No presentar los rótulos internos como funcionalidades nuevas; deben acompañarse con el copy aprobado del sitio. |
| `/marca/textura-panal.webp` | Textura oscura y discreta de hexágonos | Fondo continuo o máscara entre secciones. Mantener contraste bajo para no competir con el texto. |

No hace falta generar imágenes nuevas para esta primera adaptación. Los siete
assets cubren marca, hero, fondos, proceso, personalización y sistema.

## Mapeo sección por sección

### 1. Navegación

**Desyres**

`ABOUT / EXPERTISE / WORKS / CONTACT`

**Quantum Hive**

- Marca: `wordmark.webp` + etiqueta breve `Fábrica de webs`.
- Enlaces: `Qué resuelve / Cómo funciona / Personalización`.
- CTA persistente: `Ver catálogo` → `/catalogo-plantillas`.

**Criterio**

Mantener la navegación compacta y cinética de Desyres, pero no agregar links
sin destino real. El objetivo primario es llevar al catálogo, no a un formulario
de contacto ficticio.

### 2. Hero editorial

**Desyres**

`/AI Engineer` + `DESYRE ®`, presentación personal y retrato protagonista.

**Quantum Hive**

- Etiqueta: `/FÁBRICA DE WEBS INTELIGENTES`.
- Título principal: `TU NEGOCIO`.
- Secuencia cinética: `24/7 / AUTOMATIZADO / CONECTADO / INTELIGENTE`.
- Bajada aprobada:
  `Cada consulta sin respuesta y cada visita que no entiende tu propuesta es
  una venta que se enfría. Creamos una web premium que explica, genera
  confianza y atiende incluso cuando vos no estás.`
- CTA principal: `VER WEBS PREMIUM` → `/catalogo-plantillas`.
- CTA secundario: `CONOCER LA SOLUCIÓN` → sección `#problema`.
- Imagen: `portada-panal.webp` como pieza dominante.
- Sello: `quantumhive-isotipo.webp`.

**Criterio**

La primera pantalla debe vender la solución al problema, no explicar la
tecnología interna. La colmena cuántica reemplaza el retrato personal y el
título cinético conserva la energía del hero de Desyres.

### 3. Presentación cinética / identidad

**Desyres**

`HEY, I'M DAVID! / AI ENGINEER / BRAND VOICE / EMPOWER CODE`.

**Quantum Hive**

Usar la misma mecánica de palabras o líneas en movimiento con:

- `WEB PREMIUM`
- `ATENCIÓN 24/7`
- `INFORMACIÓN ORDENADA`
- `NEGOCIO CONECTADO`

Texto de apoyo:

`Una web premium adelante. Un sistema inteligente detrás.`

**Asset**

`textura-panal.webp` como fondo de bajo contraste; isotipo como punto de
transición.

### 4. Problema y manifiesto

**Desyres**

Dos párrafos sobre diseñar sistemas de IA que resuelven problemas reales, más
la frase `THIS, HOW I DEVELOP.`.

**Quantum Hive**

- Rótulo: `/EL PROBLEMA QUE RESOLVEMOS`.
- Título: `NO ALCANZA CON TENER UNA WEB. TIENE QUE TRABAJAR PARA TU NEGOCIO.`
- Desarrollo:
  `Quantum Hive convierte una presencia digital pasiva en un sistema que
  muestra el valor de tu marca, ordena la información y acompaña al cliente
  hasta el próximo paso.`
- Frase de cierre: `ESTO ES LO QUE CAMBIAMOS.`

**Criterio**

Conservar el bloque de texto grande y el aire editorial. No introducir
afirmaciones cuantitativas sobre ventas o conversión.

### 5. Marquee doble

**Desyres**

`WHY IT MATTERS / BUILT FOR YOU`.

**Quantum Hive**

`TU NEGOCIO PRESENTE / AUNQUE VOS NO ESTÉS`

Alternativa, si el corte tipográfico funciona mejor:

`MÁS QUE UNA WEB / UN SISTEMA VIVO`

**Asset**

Sin imagen; líneas doradas, negro y textura hexagonal muy tenue.

### 6. Advantages → problemas que se resuelven

**Desyres**

Cuatro ventajas: `PRACTICAL / STRUCTURE / ADAPTIVE / IMPACTFUL`.

**Quantum Hive**

| Número | Título | Texto |
|---|---|---|
| `/01` | `SE ENTIENDE` | `Tu propuesta, servicios y productos quedan claros desde el primer vistazo.` |
| `/02` | `RESPONDE` | `Las consultas pueden encontrar información útil incluso cuando vos no estás.` |
| `/03` | `TE REPRESENTA` | `La experiencia visual queda a la altura del negocio, no de una plantilla genérica.` |
| `/04` | `EVOLUCIONA` | `La demo puede cambiar de base, sumar efectos y remixarse sin empezar de cero.` |

**Fuente del contenido**

Estos cuatro ejes condensan la barra de capacidades, los problemas y la sección
de personalización ya existentes. Son resultados cualitativos, no métricas.

### 7. Selected works → catálogo y demostraciones reales

**Desyres**

Cuatro proyectos de portfolio con imagen, título y descripción.

**Quantum Hive**

No presentarlos como clientes ni “casos de éxito”. Deben rotularse como
demostraciones explorables:

| Título | Descripción | Destino | Asset / visual |
|---|---|---|---|
| `CATÁLOGO DE WEBS` | `Estructuras y estilos para recorrer antes de elegir una base.` | `/catalogo-plantillas` | Capturas reales del catálogo o `panal-ui.webp` mientras no haya captura seleccionada. |
| `DEMOS CON SCROLL` | `Movimiento editorial, stacking cards y transiciones listas para adaptar.` | `/catalogo/plantillas/basicas/efecto-scroll` | Captura real de una demo; no usar mockup inventado. |
| `EFECTOS INTERACTIVOS` | `Mouse, cursor y canvas para personalizar la experiencia sin sobrecargarla.` | `/catalogo-efectos` | Captura real del catálogo de efectos o `panal-ui.webp`. |
| `FÁBRICA WEB` | `El espacio donde se carga la información, se revisa la demo y se piden remixes.` | `/fabrica-web` | Captura real del cockpit o `panal-circuito.webp`. |

Rótulo de sección: `/EXPLORÁ LA FÁBRICA`.

**Criterio**

La interacción hover de los trabajos de Desyres sí es reutilizable. El contenido
visual debe provenir de páginas existentes del repositorio o de los assets de
marca. No atribuir demos a negocios reales.

### 8. Case studies / testimonial → proceso verificable

**Desyres**

Carrusel de testimonios con nombres y frases de clientes.

**Quantum Hive**

Eliminar testimonios. No existen testimonios aprobados en las fuentes
auditadas. Reutilizar el mismo componente de carrusel o track horizontal para
mostrar las seis etapas reales:

1. `EXPLORÁ EL CATÁLOGO`
2. `ELEGÍ UNA BASE`
3. `CARGÁ TU NEGOCIO`
4. `REVISÁ LA DEMO`
5. `PERSONALIZÁ Y REMIXÁ`
6. `INTEGRÁ TU AGENTE`

Rótulo: `/CÓMO FUNCIONA`.

**Asset**

`panal-circuito.webp` puede acompañar el track como columna sticky o fondo
vertical. Cada etapa puede representarse como una celda conectada de la
colmena.

### 9. Manifiesto de gran formato

**Desyres**

`WE BELIEVE THAT THE RIGHT TOOLS CAN CHANGE EVERYTHING.`

**Quantum Hive**

`CREEMOS QUE TU WEB DEBE TRABAJAR PARA TU NEGOCIO, NO SER SOLAMENTE UNA
VIDRIERA.`

Subtexto:

`El visitante ve una experiencia clara y profesional. Detrás, la información
queda lista para personalizar la demo, conectar automatizaciones e integrar el
agente conversacional.`

**Asset**

`portada-panal.webp` en recorte inmersivo o `textura-panal.webp` si la imagen ya
tuvo demasiado protagonismo en el hero.

### 10. Skills / impact → decisiones de personalización

**Desyres**

Bloque de impacto con contador porcentual y luego capacidades técnicas.

**Quantum Hive**

No usar porcentajes ni cifras de mejora: no están verificadas. Sustituir el
contador por una progresión de cuatro decisiones, donde el número describe una
etapa y no un resultado comercial:

| Número | Título | Descripción |
|---|---|---|
| `01` | `BASE VISUAL` | `La estructura que mejor explica tu negocio.` |
| `02` | `MOVIMIENTO` | `Efectos de scroll que ya fueron probados.` |
| `03` | `INTERACCIÓN` | `Mouse y canvas al servicio de la experiencia.` |
| `04` | `REMIX` | `Combinaciones nuevas a partir de recursos que funcionan.` |

**Asset**

`panal-ui.webp`, con celdas activándose según el scroll.

### 11. Tools & integrations → sistema detrás de la web

**Desyres**

Listado de tecnologías, expertise y sistemas.

**Quantum Hive**

- Título: `EL SISTEMA DETRÁS DE LA EXPERIENCIA`.
- Intro: `Primero se aprueban el diseño y la información. Después se conecta la
  capa conversacional.`
- Flujo de tres partes:
  1. `INFORMACIÓN APROBADA` — `Servicios, productos, horarios y políticas.`
  2. `AGENTE PREPARADO` — `Creado y entrenado en la Fábrica de Agentes.`
  3. `WEB CONECTADA` — `Atención integrada dentro de la experiencia final.`

**Asset**

`hexagono-capacidades.webp` como imagen principal. La ilustración puede
representar la arquitectura visual, pero el texto público debe limitarse al
flujo aprobado de tres etapas.

### 12. Services → tres capas del servicio

**Desyres**

Tres servicios: `AI SOLUTIONS / INTELLIGENT SYSTEMS / UX-DRIVEN`.

**Quantum Hive**

| Servicio | Texto | CTA |
|---|---|---|
| `WEB PREMIUM` | `Una presentación clara, profesional y adaptada a la información real de tu negocio.` | `VER CATÁLOGO` → `/catalogo-plantillas` |
| `PERSONALIZACIÓN Y REMIX` | `Base visual, scroll, cursor, canvas y recursos de distintas demos combinados en una versión propia.` | `VER EFECTOS` → `/catalogo-efectos` |
| `AGENTE CONVERSACIONAL` | `La capa final se integra cuando el diseño y la información ya fueron aprobados.` | `CONOCER EL PROCESO` → ancla de la sección del agente |

**Criterio**

La sección debe explicar el alcance actual. No prometer publicación automática,
autonomía ilimitada, resultados comerciales garantizados ni capacidades no
visibles en el producto.

### 13. Marquee final y CTA

**Desyres**

`DRIVE CHANGE / MAKE IMPACT`, `Your next step starts with us.` y botón de
contacto.

**Quantum Hive**

- Marquee: `ELEGÍ UNA BASE / CONSTRUÍ ALGO PROPIO`.
- Título: `ENCONTRÁ UNA WEB QUE TE REPRESENTE.`
- Bajada: `Después la fábrica se encarga de convertirla en una web propia,
  explicable y lista para seguir creciendo.`
- CTA principal: `ENTRAR AL CATÁLOGO` → `/catalogo-plantillas`.
- CTA secundario: `IR A LA FÁBRICA` → `/fabrica-web`.

**Asset**

`panal-ui.webp` o `panal-circuito.webp` con máscara oscura. Mantener los CTA
legibles y evitar colocar texto sobre el sector más brillante.

### 14. Footer

**Desyres**

Email de 8AM Design, mensaje de colaboración, links del template y copyright.

**Quantum Hive**

- `wordmark.webp`.
- Frase: `Webs inteligentes diseñadas para convertirse en sistemas vivos.`
- Enlaces existentes:
  - `Plantillas` → `/catalogo-plantillas`
  - `Efectos` → `/catalogo-efectos`
  - `Fábrica` → `/fabrica-web`
- Copyright: `© 2026 Quantum Hive`.

No copiar el email, créditos ni enlaces de licencia/style guide/changelog del
template. No agregar teléfono, email o redes si no fueron aprobados.

## Jerarquía narrativa final

1. Captar atención con `Tu negocio 24/7` y la colmena cuántica.
2. Nombrar el costo real de una presencia digital que no explica ni responde.
3. Mostrar resultados cualitativos claros: entender, responder, representar y
   evolucionar.
4. Dejar que el visitante explore demos reales.
5. Explicar el recorrido de catálogo a fábrica.
6. Mostrar las decisiones de personalización y remix.
7. Presentar el agente conversacional como última capa, después de la
   aprobación visual y de información.
8. Cerrar con una acción concreta: entrar al catálogo.

## Guardrails de implementación

- Preservar en lo posible el DOM, clases, atributos `data-w-*`, CSS y runtime de
  Webflow del clon para conservar las animaciones.
- Traducir el contenido dentro de la estructura original; no reconstruir una
  aproximación visual desde cero.
- Reemplazar assets originales por rutas locales de Quantum Hive y verificar
  que no queden fotografías, logos, emails o nombres de Desyres/8AM Design.
- No reutilizar los testimonios originales ni escribir equivalentes ficticios.
- No convertir números decorativos de Desyres en métricas de negocio.
- Toda referencia a proyectos debe decir `demo`, `plantilla`, `catálogo` o
  `experiencia`; nunca `cliente` o `caso de éxito` sin evidencia.
- Mantener `Powered by Quantum Hive` / firma institucional cuando la adaptación
  se use como plantilla, según las reglas del repositorio.
- Verificar en QA que las animaciones de scroll y Webflow IX2 sobrevivan al
  reemplazo de textos e imágenes.
