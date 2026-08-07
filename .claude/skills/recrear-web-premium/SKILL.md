---
name: recrear-web-premium
description: Orquesta la extraccion logica y reconstruccion de una URL publica hacia un proyecto Next.js limpio y editable bajo el estandar de excelencia de QuantumHive.
---

# Recrear Web Premium

Esta skill dirige el flujo completo de ingenieria inversa visual y tecnica para convertir una web de referencia en codigo Next.js modular. Prioriza la fidelidad extrema de las animaciones y la separacion limpia de componentes y logica, generando ademas candidatos de elementos para el sistema de diseno interno. Todo el codigo generado debe cumplir con el estandar de excelencia de QuantumHive.

## Estandar de excelencia QuantumHive

Todas las creaciones de QuantumHive deben cumplir el mismo nivel de calidad visual, tecnica y funcional.

Las categorias representan diferencias de complejidad, tecnologia e interaccion. Nunca diferencias de calidad.

QuantumHive no produce:
- webs basicas;
- webs genericas;
- versiones de baja calidad;
- copias literales;
- entregas improvisadas.

Una creacion con menor alcance debe conservar:
- direccion de arte profesional;
- composicion original;
- assets propios o licenciados;
- responsive completo;
- codigo mantenible;
- rendimiento controlado;
- accesibilidad;
- QA visual y funcional.

## Inputs Formales

Para iniciar la ejecucion, la skill requiere obligatoriamente los siguientes parametros:
- `url_referencia`: URL publica a reconstruir.
- `proyecto_destino`: Ruta o nombre del proyecto interno.
- `nombre_plantilla`: Nombre interno que recibira el diseno reconstruido.
- `rubro`: Sector o industria del sitio (ej. estudio creativo, SaaS, moda, arquitectura).
- `tipo_sitio`: Tipo funcional del sitio (ej. landing, portfolio, ecommerce, corporativo).
- `objetivo_recreacion`: Alcance de la tarea (`pagina_completa`, `secciones_especificas`, `elemento_aislado`).
- `complejidad_tecnica`: Nivel tecnologico y de interaccion (`Diseno de Autor`, `Interaccion Avanzada`, `Experiencia Inmersiva`, `Experiencia Canvas`, `Experiencia Tridimensional`, `Fusion Total`). Se asigna despues del analisis tecnologico.
- `modo_adaptacion`: Define el estilo a aplicar (`conservar_estilo`, `identidad_cliente`, `identidad_quantumhive`, `neutral_catalogo`).
- `extraer_elementos`: Booleano para generar el conjunto de elementos candidatos al catalogo.
- `capturar_mobile`: Booleano para realizar la captura y QA responsivo.
- `secciones_incluidas`: (Opcional) Array de selectores o nombres de secciones especificas a clonar, omitiendo el resto.

## Flujo Obligatorio

Sigue estrictamente esta secuencia. No comenzar la implementacion antes de generar y revisar PLAN_RECONSTRUCCION.md.

1. URL
2. inspeccion preliminar
3. captura base
4. deteccion tecnologica
5. router de skills
6. mapa de estructura
7. mapa de scroll
8. mapa de mouse
9. inventario de assets
10. equivalencias con el catalogo interno
11. plan de reconstruccion
12. checkpoint humano (aprobacion del plan)
13. implementacion por secciones
14. extraccion de elementos
15. QA
16. paquete candidato
17. aprobacion humana

## Router de Skills

La ejecucion decide la ruta exclusivamente segun las tecnologias detectadas en MAPA_TECNOLOGIAS.json. La categoria de la creacion se asigna despues del analisis, no antes.

- Sin runtimes avanzados -> copiar-pagina o clone-website
- GSAP, ScrollTrigger, Lenis, Lottie, Rive o animaciones complejas -> true-web-clone
- Spline -> web-3d
- Three.js, WebGL, shaders o canvas -> true-web-clone mas reconstruccion especializada centrada en mapear shaders o texturas
- Video ligado al scroll (scrubbing) -> captura especifica de timeline para extraer frames o el origen del video y mapearlo a la posicion de scroll

## Artefactos de Ejecucion

Para cada ejecucion, debes generar obligatoriamente dentro de la carpeta temporal del proyecto los siguientes archivos:

- CAPTURA_BASE.json
- MAPA_TECNOLOGIAS.json
- MAPA_ESTRUCTURA.json
- MAPA_SCROLL.json
- MAPA_MOUSE.json
- MAPA_ASSETS.json
- PLAN_COMPONENTES.json
- PLAN_RECONSTRUCCION.md
- SOLICITUD_ASSETS.json
- INFORME_QA.json

SOLICITUD_ASSETS.json debe registrar imagenes, videos, texturas, modelos 3D o recursos que deban generarse posteriormente con IA para evitar reutilizar activos propietarios.

Ademas, debes generar la siguiente estructura de capturas:

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

La generacion de MAPA_SCROLL.json debe combinar:
- Limites de cada seccion.
- Porcentajes del documento.
- Puntos de activacion detectados.
- Muestreo denso dentro de secciones sticky o pinned.
- Progreso de 0% a 100% de cada timeline.
- Checkpoints antes, durante y despues de cada transicion.

Registrar tambien:
- Duracion visual.
- Easing estimado.
- Direccion.
- Relacion entre scroll vertical y movimiento horizontal.
- Elementos que entran o salen de una escena.
- Estados mobile alternativos.

## Captura de Mouse Mejorada

La generacion de MAPA_MOUSE.json debe combinar:
- mousemove programatico.
- hover y pointer events.
- Muestreo de getComputedStyle.
- Lectura de matrices transform.
- Capturas comparativas de estado antes, durante y despues de la interaccion.
- Inspeccion de canvas.
- Deteccion de cambios visuales dentro de requestAnimationFrame.
- Fallback tactil.

## Limpieza, Adaptacion y Restriccion de Recursos

Los archivos de HTML, CSS, scripts y recursos crudos extraidos de la fuente pueden conservarse unicamente como material temporal de investigacion.

No pueden:
- Formar parte de la implementacion final.
- Publicarse.
- Entregarse al cliente.
- Incorporarse al catalogo.

La salida final debe ser codigo limpio, separando componentes, contenido, estilos, animaciones, datos y assets. Se debe purgar rastreadores, analytics, claves, endpoints privados, y sustituir imagenes/textos comerciales ajenos (registrados en SOLICITUD_ASSETS.json).

## Extraccion de Elementos Reutilizables

Tras reconstruir la plantilla, analizar y separar candidatos para el catalogo (ej: hero, navegacion, cursor, botones, cards, galerias, transiciones, scroll horizontal, pinned sections, canvas, fondos, videos, loaders, CTA, formularios, footer).

Cada candidato debe registrar:
- Nombre, categoria (usando terminologia QuantumHive), descripcion.
- Dependencias, tecnologias, props configurables.
- Comportamiento responsive, rendimiento estimado.
- Origen de inspiracion, archivos relacionados, preview, estado de QA.
- Clasificacion: reutilizacion directa, adaptacion o reconstruccion.

Estos elementos NO se incorporan automaticamente al catalogo.

## Paquete Candidato para Catalogo

Cada ejecucion exitosa generara una plantilla completa y un paquete candidato de elementos:

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

FUENTE_REFERENCIA.json debe contener:
- URL, plataforma, fecha de analisis.
- Secciones estudiadas, tecnicas observadas.
- Restricciones, activos descartados, elementos inspirados.
- Declaracion de reconstruccion y adaptacion propia.

Este paquete no modifica catalogo.ts. La publicacion es estrictamente manual y requiere aprobacion humana.

## QA Multicriterio y Estados

El QA (INFORME_QA.json) evalua por separado:
- Fidelidad estructural, visual, de animaciones, scroll, mouse.
- Responsive, errores de consola, recursos fallidos, rendimiento.
- Accesibilidad y reduced motion.

La comparacion visual (pixelmatch) es auxiliar y se hace por checkpoints de scroll, no con una unica captura full-page.

El informe debe terminar con uno de estos estados:
- APROBADO
- APROBADO_CON_OBSERVACIONES
- REQUIERE_CORRECCIONES
- BLOQUEADO

Solo APROBADO y APROBADO_CON_OBSERVACIONES pueden presentarse para incorporacion al catalogo, siempre con aprobacion humana.

## Manejo de Fallos (Fallbacks por Complejidad Tecnica)

Ante assets bloqueados, licencias restrictivas, fallos de renderizado o imposibilidad tecnica, registrar el problema en INFORME_QA.json y crear un fallback segun la complejidad tecnica exigida:

- Diseno de Autor: permite un fallback estatico equivalente (ej. reemplazar un video simple por una imagen de alta calidad si falla), preservando la direccion de arte y responsividad.
- Interaccion Avanzada: permite utilizar una alternativa visual/animada equivalente usando tecnologias nativas o CSS si la dependencia original falla, preservando el proposito de la interaccion.
- Experiencia Inmersiva: exige mantener el equivalente de interaccion (ej. si el scroll horizontal original falla, debe reprogramarse una experiencia inmersiva equivalente).
- Experiencia Canvas / Experiencia Tridimensional: si falla la extraccion o renderizado (shaders/3D), debe detenerse inmediatamente y pedir decision humana antes de degradar o simular con video.
- Fusion Total: ante un fallo critico que comprometa multiples niveles de interaccion compleja, detenerse y solicitar decision humana antes de cualquier degradacion automatica del efecto.