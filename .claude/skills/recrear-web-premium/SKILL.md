---
name: recrear-web-premium
description: Orquesta la extracción lógica y reconstrucción de una URL pública hacia un proyecto Next.js limpio y editable bajo el estándar de excelencia de QuantumHive.
---

# Recrear Web Premium

Esta skill dirige el flujo completo de ingeniería inversa visual y técnica para convertir una web de referencia en código Next.js modular. Prioriza la fidelidad extrema de las animaciones y la separación limpia de componentes y lógica, generando además candidatos de elementos para el sistema de diseño interno. Todo el código generado debe cumplir con el estándar de excelencia de QuantumHive.

## Estándar de excelencia QuantumHive

Todas las creaciones de QuantumHive deben cumplir el mismo nivel de calidad visual, técnica y funcional.

Las categorías representan diferencias de complejidad, tecnología e interacción. Nunca diferencias de calidad.

QuantumHive no produce:
- webs básicas;
- webs genéricas;
- versiones de baja calidad;
- copias literales;
- entregas improvisadas.

Una creación con menor alcance debe conservar:
- dirección de arte profesional;
- composición original;
- assets propios o licenciados;
- responsive completo;
- código mantenible;
- rendimiento controlado;
- accesibilidad;
- QA visual y funcional.

## Inputs Formales

Para iniciar la ejecución, la skill requiere obligatoriamente los siguientes parámetros:
- `url_referencia`: URL pública a reconstruir.
- `proyecto_destino`: Ruta o nombre del proyecto interno.
- `nombre_plantilla`: Nombre interno que recibirá el diseño reconstruido.
- `rubro`: Sector o industria del sitio (ej. estudio creativo, SaaS, moda, arquitectura).
- `tipo_sitio`: Tipo funcional del sitio (ej. landing, portfolio, ecommerce, corporativo).
- `objetivo_recreacion`: Alcance de la tarea (`pagina_completa`, `secciones_especificas`, `elemento_aislado`).
- `complejidad_tecnica`: Nivel tecnológico y de interacción (`Diseño de Autor`, `Interacción Avanzada`, `Experiencia Inmersiva`, `Experiencia Canvas`, `Experiencia Tridimensional`, `Fusión Total`). Se asigna después del análisis tecnológico.
- `modo_adaptacion`: Define el estilo a aplicar (`conservar_estilo`, `identidad_cliente`, `identidad_quantumhive`, `neutral_catalogo`).
- `extraer_elementos`: Booleano para generar el conjunto de elementos candidatos al catálogo.
- `capturar_mobile`: Booleano para realizar la captura y QA responsivo.
- `secciones_incluidas`: (Opcional) Array de selectores o nombres de secciones específicas a clonar, omitiendo el resto.

## Flujo Obligatorio

Sigue estrictamente esta secuencia. No comenzar la implementación antes de generar y revisar PLAN_RECONSTRUCCION.md.

1. URL
2. inspección preliminar
3. captura base
4. detección tecnológica
5. router de skills
6. mapa de estructura
7. mapa de scroll
8. mapa de mouse
9. inventario de assets
10. equivalencias con el catálogo interno
11. plan de reconstrucción
12. checkpoint humano (aprobación del plan)
13. implementación por secciones
14. extracción de elementos
15. QA
16. paquete candidato
17. aprobación humana

## Router de Skills

La ejecución decide la ruta exclusivamente según las tecnologías detectadas en `MAPA_TECNOLOGIAS.json`. La categoría de la creación se asigna después del análisis, no antes.

- Sin runtimes avanzados → `copiar-pagina` o `clone-website`
- GSAP, ScrollTrigger, Lenis, Lottie, Rive o animaciones complejas → `true-web-clone`
- Spline → `web-3d`
- Three.js, WebGL, shaders o canvas → `true-web-clone` más reconstrucción especializada centrada en mapear shaders o texturas
- Video ligado al scroll (scrubbing) → captura específica de timeline para extraer frames o el origen del video y mapearlo a la posición de scroll

## Artefactos de Ejecución

Para cada ejecución, debes generar obligatoriamente dentro de la carpeta temporal del proyecto los siguientes archivos:

- `CAPTURA_BASE.json`
- `MAPA_TECNOLOGIAS.json`
- `MAPA_ESTRUCTURA.json`
- `MAPA_SCROLL.json`
- `MAPA_MOUSE.json`
- `MAPA_ASSETS.json`
- `PLAN_COMPONENTES.json`
- `PLAN_RECONSTRUCCION.md`
- `SOLICITUD_ASSETS.json`
- `INFORME_QA.json`

`SOLICITUD_ASSETS.json` debe registrar imágenes, videos, texturas, modelos 3D o recursos que deban generarse posteriormente con IA para evitar reutilizar activos propietarios.

Además, debes generar la siguiente estructura de capturas:

```
capturas/
├── fuente/
│   ├── desktop/
│   └── mobile/
└── resultado/
    ├── desktop/
    └── mobile/
```

Las capturas deben cubrir:
- inicio;
- checkpoints de secciones;
- estados intermedios de scroll;
- interacciones de mouse;
- resultado final;
- mobile.

## Captura de Scroll Mejorada

La generación de `MAPA_SCROLL.json` debe combinar:
- Límites de cada sección.
- Porcentajes del documento.
- Puntos de activación detectados.
- Muestreo denso dentro de secciones sticky o pinned.
- Progreso de 0% a 100% de cada timeline.
- Checkpoints antes, durante y después de cada transición.

Registrar también:
- Duración visual.
- Easing estimado.
- Dirección.
- Relación entre scroll vertical y movimiento horizontal.
- Elementos que entran o salen de una escena.
- Estados mobile alternativos.

## Captura de Mouse Mejorada

La generación de `MAPA_MOUSE.json` debe combinar:
- `mousemove` programático.
- `hover` y `pointer events`.
- Muestreo de `getComputedStyle`.
- Lectura de matrices `transform`.
- Capturas comparativas de estado antes, durante y después de la interacción.
- Inspección de canvas.
- Detección de cambios visuales dentro de `requestAnimationFrame`.
- Fallback táctil.

## Limpieza, Adaptación y Restricción de Recursos

Los archivos de HTML, CSS, scripts y recursos crudos extraídos de la fuente pueden conservarse únicamente como material temporal de investigación.

No pueden:
- Formar parte de la implementación final.
- Publicarse.
- Entregarse al cliente.
- Incorporarse al catálogo.

La salida final debe ser código limpio, separando componentes, contenido, estilos, animaciones, datos y assets. Se debe purgar rastreadores, analytics, claves, endpoints privados, y sustituir imágenes/textos comerciales ajenos (registrados en `SOLICITUD_ASSETS.json`).

## Extracción de Elementos Reutilizables

Tras reconstruir la plantilla, analizar y separar candidatos para el catálogo (ej: hero, navegación, cursor, botones, cards, galerías, transiciones, scroll horizontal, pinned sections, canvas, fondos, videos, loaders, CTA, formularios, footer).

Cada candidato debe registrar:
- Nombre, categoría (usando terminología QuantumHive), descripción.
- Dependencias, tecnologías, props configurables.
- Comportamiento responsive, rendimiento estimado.
- Origen de inspiración, archivos relacionados, preview, estado de QA.
- Clasificación: reutilización directa, adaptación o reconstrucción.

Estos elementos NO se incorporan automáticamente al catálogo.

## Paquete Candidato para Catálogo

Cada ejecución exitosa generará una plantilla completa y un paquete candidato de elementos:

```
CANDIDATO_CATALOGO/
├── ficha-plantilla.json
├── ficha-tecnica.md
├── preview-desktop.png
├── preview-mobile.png
├── mapa-interacciones.json
├── dependencias.json
├── elementos-candidatos/
├── informe-qa.json
└── FUENTE_REFERENCIA.json
```

`FUENTE_REFERENCIA.json` debe contener:
- URL, plataforma, fecha de análisis.
- Secciones estudiadas, técnicas observadas.
- Restricciones, activos descartados, elementos inspirados.
- Declaración de reconstrucción y adaptación propia.

Este paquete no modifica `catalogo.ts`. La publicación es estrictamente manual y requiere aprobación humana.

## QA Multicriterio y Estados

El QA (`INFORME_QA.json`) evalúa por separado:
- Fidelidad estructural, visual, de animaciones, scroll, mouse.
- Responsive, errores de consola, recursos fallidos, rendimiento.
- Accesibilidad y reduced motion.

La comparación visual (pixelmatch) es auxiliar y se hace por checkpoints de scroll, no con una única captura full-page.

El informe debe terminar con uno de estos estados:
- `APROBADO`
- `APROBADO_CON_OBSERVACIONES`
- `REQUIERE_CORRECCIONES`
- `BLOQUEADO`

Solo `APROBADO` y `APROBADO_CON_OBSERVACIONES` pueden presentarse para incorporación al catálogo, siempre con aprobación humana.

## Manejo de Fallos (Fallbacks por Complejidad Técnica)

Ante assets bloqueados, licencias restrictivas, fallos de renderizado o imposibilidad técnica, registrar el problema en `INFORME_QA.json` y crear un fallback según la complejidad técnica exigida:

- Diseño de Autor: permite un fallback estático equivalente (ej. reemplazar un video simple por una imagen de alta calidad si falla), preservando la dirección de arte y responsividad.
- Interacción Avanzada: permite utilizar una alternativa visual/animada equivalente usando tecnologías nativas o CSS si la dependencia original falla, preservando el propósito de la interacción.
- Experiencia Inmersiva: exige mantener el equivalente de interacción (ej. si el scroll horizontal original falla, debe reprogramarse una experiencia inmersiva equivalente).
- Experiencia Canvas / Experiencia Tridimensional: si falla la extracción o renderizado (shaders/3D), debe detenerse inmediatamente y pedir decisión humana antes de degradar o simular con video.
- Fusión Total: ante un fallo crítico que comprometa múltiples niveles de interacción compleja, detenerse y solicitar decisión humana antes de cualquier degradación automática del efecto.
