# Clonación Webflow rápida

## Objetivo

Convertir una referencia Webflow en una plantilla QuantumHive en 3–10 minutos,
conservando su estructura y sus efectos originales. La tarea no consiste en
rediseñar la página ni reconstruirla con React.

## Flujo automático

```text
URL
  → descargar HTML, CSS, fuentes, imágenes y runtime
  → conservar clases y data-wf-*
  → cambiar textos, enlaces, colores y assets
  → validar desktop/mobile y recursos
  → guardar efectos detectados para remixes
  → publicar como demo dentro del catálogo
```

### 1. Clonar

```powershell
node scripts/clone-desyres-webflow.mjs <url-webflow> <slug>
```

Genera una copia fuente inmutable en:

```text
clientes/quantum-hive/public/templates/<slug>/raw/
```

El script trabaja en paralelo con cuatro descargas, localiza recursos anidados
del CSS y registra el resultado en `ASSETS.json`.

### 2. Adaptar

Crear un adaptador pequeño por plantilla. Sólo puede:

- reemplazar textos y metadatos;
- asignar imágenes de QuantumHive o del cliente;
- cambiar enlaces y llamadas a la acción;
- agregar overrides de marca después del CSS fuente;
- añadir `Powered by Quantum Hive`.

No debe modificar la jerarquía del DOM, las clases ni los atributos
`data-wf-page`, `data-wf-site` y `data-w-id`. La copia adaptada se genera en:

```text
clientes/quantum-hive/public/templates/<slug>/site/
```

### 3. Validar

La revisión rápida comprueba solamente:

1. portada en desktop y mobile;
2. ausencia de identidad o textos de la referencia;
3. imágenes coherentes y sin recursos rotos;
4. cantidad de nodos animados preservada;
5. scroll, hover, menú mobile y enlaces principales;
6. lint y TypeScript del contenedor.

Si estas comprobaciones pasan, la plantilla queda lista. La auditoría extensa y
los documentos por sección se reservan para sitios cuyo runtime no pueda
reutilizarse o para una reconstrucción manual solicitada expresamente.

## Biblioteca de efectos para remixes

Cada clon debe registrar un inventario corto:

- nombre del efecto;
- disparador: scroll, mouse, hover, tiempo o clic;
- selector y nodos `data-w-id` involucrados;
- runtime requerido: Webflow, GSAP, Three.js, canvas u otro;
- restricciones de layout, especialmente sticky y overflow;
- ruta de la plantilla fuente donde puede probarse.

No se extrae el efecto como componente nuevo si el runtime original ya lo
ejecuta correctamente. Primero se guarda el patrón funcional; la extracción se
hace cuando un remix concreto lo necesita.

## Contrato para delegar a un agente constructor

El agente —incluido un subagente externo como Antigravity— recibe únicamente:

- URL de referencia;
- slug de salida;
- carpeta de assets aprobados;
- mapa de textos y enlaces;
- colores de marca;
- rutas que debe conectar.

Debe devolver:

- `raw/` intacto;
- `site/` adaptado;
- `ASSETS.json`;
- inventario breve de efectos;
- resultado de las seis validaciones.

No puede inventar contenido, generar imágenes sin autorización, reconstruir el
JSX si el runtime funciona ni publicar la demo.

## Landing y Fábrica

- La landing es la introducción: explica el problema, los beneficios y qué hace
  inteligente a la web.
- La Fábrica es el taller operativo: cargar datos, elegir plantilla, revisar la
  demo, remixar efectos con ayuda del agente y conectar el agente conversacional.

