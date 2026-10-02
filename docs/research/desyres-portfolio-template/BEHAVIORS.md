# Desyres Portfolio Template — comportamientos observados

Fuente inspeccionada: `https://desyres-portfolio-template.webflow.io/`.

Las medidas siguientes provienen de estados reales del DOM y estilos computados durante la inspección. Cuando un mecanismo es inferido por la combinación de DOM y runtime, se indica explícitamente.

## Motor de interacción

- Webflow IX3 está activo (`w-mod-ix3`).
- Scripts cargados: jQuery 3.5.1, runtime Webflow, GSAP 3.15, SplitText y ScrollTrigger.
- No se detectaron canvas, videos, Lenis, Locomotive Scroll ni scroll snap.
- Interacción dominante: scroll vertical nativo + timelines GSAP/ScrollTrigger.

## Scroll

### Header

- `.section-navbar` permanece fixed en `top: 20 px`, `z-index: 10`.
- Entre `scrollY 0` y `600` no cambió rect, color, fondo, opacidad ni transform: no existe un estado “header scrolled” en ese tramo.

### Works — carrusel 3D conducido por scroll

- INTERACTION MODEL: exclusivamente scroll-driven; no hay flechas, dots ni tabs.
- `.section-works` conserva rect `y 0, h 900` mientras el documento avanza.
- Evidencia de estados desktop:
  - `scrollY 2700`: wrapper central `77 × 77 px`; encabezados desplazados `+365.213 px` y `-365.213 px` hacia el centro.
  - `scrollY 3500`: wrapper `235 × 543 px`; encabezados ya en `translateX(0)`; transformación 3D con rotación Y marcada.
  - `scrollY 4500`: wrapper `496 × 504 px`; las cuatro tarjetas aparecen como caras/capas con anchos alternados `61/496 px` y nueva rotación 3D.
- Resultado: el scroll abre el núcleo, rota el deck y cambia el caso dominante sin clic.

### Capabilities — reveals y contador

- El heading está partido en spans `.gsap_split_word` y `.gsap_split_letter`; la entrada es una animación por caracteres controlada por GSAP.
- Al entrar en el bloque, el track numérico termina en `translateY(-640 px)` dentro de overflow hidden, mostrando el resultado `40%`.

### Theme transition

- `.transitions-background` es sticky, clara (`rgb(250,250,250)`) y usa escala Y.
- Estados desktop medidos:
  - `scrollY 8100`: `scaleY(0)`, altura visible `0`;
  - `scrollY 8700`: `scaleY(0.05005)`, altura `45.04 px`;
  - `scrollY 9600`: `scaleY(0.60562)`, altura `545.06 px`;
  - `scrollY 10400`: `scaleY(1)`, ocupa `1425 × 900 px`.
- Es una cortina de tema, no una sección de contenido.

### Services — stack sticky

- INTERACTION MODEL: scroll-driven.
- Desktop:
  - title sticky `top: 90 px`, alto `900 px`;
  - descripción sticky `top: 720 px`;
  - tres cards sticky `top: 66.6 px`, cada una `810 px` de alto.
- Móvil:
  - title sticky `top: 84.4 px` y layout en columna;
  - descripción sticky `top: 675.2 px`;
  - cards `325 × 760 px`, sticky `top: 62.456 px`.
- Las cards siguientes cubren progresivamente a las anteriores. No convertir en carrusel horizontal ni acordeón.

## Movimiento temporal

### Testimonial marquee

- Dos `.reviewer-wrapper` duplicados, cada uno de `2480 × 210 px`.
- En `1.4 s` el transform X pasó de `-1324.73` a `-1533.28 px`: desplazamiento `-208.55 px`, aproximadamente `149 px/s`.
- Ambos tracks se mueven sincronizados; la segunda copia continúa a la primera para formar un bucle infinito.

### Logos marquee

- Dos `.logo-wrapper` duplicados, cada uno de `630 px` de ancho, con 12 logos totales.
- En `1.2 s` el transform X pasó de `-130.005` a `-211.944 px`: aproximadamente `68 px/s`.
- Los gradientes laterales ocultan la entrada y salida del track.

## Hover

### About list

- Estado base del primer renglón: imagen `0 × 186 px`, título en `x 60 px`.
- Hover completo: imagen `150 × 186 px`, título desplazado hasta `x 210 px`.
- La imagen se revela por ancho y empuja el titular; no aparece como modal ni fondo.

### Expertise

- En hover el icono rota `90°` (`matrix(0,1,-1,0,15,0)`) y se desplaza `15 px`.
- El texto acompaña con `translateX(15 px)`.
- El cambio fue visible a los `500 ms` de mantener el puntero.

### Navegación

- Desktop contiene dos copias de cada label dentro de `.nav-link-anim-wrapper` con overflow hidden. Esto evidencia un intercambio vertical en hover mediante Webflow IX (inferencia estructural; no se midió el valor final del transform).
- En el popup móvil, el hover del primer enlace cambió el color computado de `rgb(250,250,250)` a `rgb(64,64,64)` en `500 ms`.

### Systems y footer

- No se observó cambio computado de fondo, color, transform o icono al pasar por la primera tarjeta de Systems.
- Los enlaces de footer son navegación simple; no abren overlays ni estados internos.

## Click

### Menú móvil

- Breakpoint publicado: `screen and (max-width: 991px)`.
- Cerrado: `.section-navbar-popup { display: none; }`; las dos líneas del hamburger no tienen transform.
- Después del clic:
  - popup `display: block`, fixed, `375 × 844 px`, `z-index: 5` en la prueba móvil;
  - fondo computado `rgb(250,250,250)`;
  - líneas rotan a `+45°` y `-45°`, con traslaciones Y `+3.44/-3.44 px`, formando una X;
  - aparecen `/ABOUT`, `/EXPERTISE`, `/WORKS`, `/CONTACT`.
- Los enlaces saltan a anclas internas; no hay navegación secundaria.

### Enlaces de trabajo y servicios

- Las cuatro tarjetas de Works navegan a páginas de caso (`/single-post/...`).
- Los tres botones “VIEW SERVICE” y el botón “CONTACT” usan `href="#"` en la referencia; son placeholders sin estado de aplicación.
- No existen tabs, acordeones, modal, filtros ni cambios de contenido por clic.

## Responsive

- `max-width: 991px`: navegación horizontal oculta, hamburger visible y popup fixed disponible.
- A `768 × 900`, las secuencias sticky de Works, Transition y Services siguen activas; no se reemplazan por versiones estáticas.
- A `390 × 844`:
  - contenido útil `375 px`, margen lateral `25 px`, sin overflow horizontal;
  - About y descripciones pasan a columna;
  - hero display baja a `78.0571 px` y eyebrow a `26 px`;
  - Works conserva `position: sticky; top: 0` y `height: 844 px`;
  - el testimonial mantiene su marquee horizontal dentro de overflow hidden;
  - Services conserva el stack sticky con cards más angostas y altas.

## Reglas para la adaptación Quantum Hive

1. Mantener los modelos de interacción: Works por scroll, testimonios/logos por tiempo y Services por stack sticky.
2. Sustituir identidad y copy por negro, dorado, panales y colmena cuántica; no conservar assets ni textos de Desyres.
3. No sumar canvas dentro del hero si compite con la tipografía; el canvas puede vivir como capa sutil o en la transición, manteniendo el foco editorial.
4. Respetar `prefers-reduced-motion` en la adaptación, aunque la referencia inspeccionada no mostró una variante accesible explícita.
5. No usar `overflow: hidden` en ancestros de Works/Services. Reservar overflow hidden solo para los tracks internos y bandas que realmente recortan contenido.
