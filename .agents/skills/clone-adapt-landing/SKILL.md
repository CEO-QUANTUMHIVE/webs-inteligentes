---
name: clone-adapt-landing
description: Clona rapidamente una landing publica, especialmente Webflow, conserva su CSS, colores y animaciones originales y la adapta con textos, enlaces y assets de otro negocio o rubro. Cambia la paleta solo si el usuario lo pide expresamente. Usar cuando el usuario pida clonar y personalizar una landing en minutos, no para una reconstruccion React pixel-perfect.
---

# Clone & Adapt Landing

## Resultado obligatorio

Entregar una landing local que conserve el DOM, las clases, el CSS, la paleta y las animaciones de la referencia, pero no su identidad, sus textos comerciales ni sus imagenes principales. Debe usar datos y assets aprobados, eliminar toda marca visible de Webflow e incluir la firma digital oficial de Quantum Hive con isotipo.

El camino rapido es predeterminado. No reconstruyas JSX, no redactes especificaciones por seccion y no delegues componentes cuando el runtime original pueda reutilizarse.

## Entradas

1. URL publica de una landing.
2. `slug` de salida.
3. Perfil JSON del cliente. Si no existe, crealo desde la informacion aportada sin inventar servicios, precios, testimonios, ubicaciones ni resultados.
4. Carpeta de assets aprobados. Si faltan, conserva solo recursos decorativos neutrales y reportalo; no generes imagenes.

Lee [references/profile-schema.md](references/profile-schema.md) solo al crear o corregir el perfil.

## Flujo rapido

Ejecuta desde la raiz del repositorio.

### 1. Capturar e inventariar

```powershell
node .agents/skills/clone-adapt-landing/scripts/capture.mjs --url <url> --slug <slug>
```

Genera `raw/`, `ASSETS.json`, `INVENTORY.json` y `ADAPTATION.json` en `clientes/quantum-hive/public/templates/<slug>/`.

### 2. Adaptar

Lee solo `INVENTORY.json`, el perfil y los nombres de assets. Completa `ADAPTATION.json`:

- reemplaza toda identidad y copy comercial de la referencia;
- conserva la funcion de cada texto: titulo por titulo, CTA por CTA y parrafo por parrafo;
- manten la longitud aproximadamente dentro de +/-35% cuando sea posible;
- escribe en espanol natural y enfocado en el problema real del cliente;
- inspecciona visualmente los candidatos aprobados y asigna logo, portada y galeria por rol, no al azar;
- conserva colores, tipografias, fondos y estilos originales; solo define `brand.overrideSourceColors: true` si el usuario pidio cambiar la paleta;
- no modifiques clases, jerarquia ni atributos `data-wf-*`.

El mapa puede ser parcial porque el aplicador completa huecos con copy neutral derivado del perfil. Para calidad final, mapea como minimo hero, navegacion, titulos, CTA y contacto. Usa `business.shortHeadline` cuando la plantilla tenga display text de gran escala.

### 3. Aplicar

```powershell
node .agents/skills/clone-adapt-landing/scripts/apply.mjs --slug <slug> --profile <perfil-cliente.json>
```

El comando crea `site/index.html`, copia los assets a `brand/` y escribe `VERIFY.json` con comprobaciones estructurales sin abrir Chrome.

Si falla, corrige solo los IDs informados y repite. Limite: dos correcciones rapidas. Si sigue fallando, informa el bloqueo sin iniciar una reconstruccion manual.

### 4. Entregar para revision humana

Inicia el servidor estatico desde `clientes/quantum-hive/public/templates/<slug>/`, nunca desde `site/`, y entrega `http://127.0.0.1:<puerto>/site/index.html`. Servir desde `site/` rompe las rutas `../raw/` y `../brand/`. No abras Chrome, no saques capturas y no ejecutes `qa.mjs` salvo que el usuario lo pida expresamente. La revision visual final pertenece al usuario, que marcara los cambios necesarios.

## Invariantes

- Webflow: preservar `webflow.js`, jQuery cuando exista, `data-wf-page`, `data-wf-site` y todos los `data-w-id`.
- Sticky: usar `overflow-x: clip`; nunca agregar `overflow: hidden` a sus ancestros.
- No borrar ni sobrescribir `raw/` durante la adaptacion.
- No publicar sin autorizacion explicita.
- No copiar testimonios, nombres, correos, telefonos, marcas ni afirmaciones comerciales de la referencia.
- No generar imagenes salvo pedido explicito.
- No cambiar colores, fondos ni tipografias salvo pedido explicito.
- Eliminar `Made in Webflow`, `Powered by Webflow`, enlaces de marca a Webflow y `.w-webflow-badge` sin eliminar el runtime `webflow.js`.
- Insertar siempre la firma digital oficial `qh-digital-signature` con `quantumhive-isotipo.webp`, enlaces institucionales y el texto `Sitio desarrollado por Quantum Hive`.
- Si la referencia anima dos capas `.noise` alternando opacidad y produce titileo, congelar `.noise-default` y ocultar `.noise-flipped`; no desactivar las demas animaciones.

## Salida breve

Reporta el enlace localhost, la ruta de `site/index.html`, porcentaje de textos cambiados, imagenes reemplazadas y `data-w-id` preservados.
