# Clonacion rapida de una landing Webflow

Este procedimiento sirve para que otra IA clone una landing publica, conserve el diseno y las animaciones originales, y cambie solamente identidad, textos, enlaces e imagenes.

## Objetivo exacto

El resultado no es una reconstruccion aproximada. Debe reutilizar el HTML renderizado, el CSS, las fuentes, los assets decorativos y el runtime de Webflow de la referencia.

Por defecto se conserva:

- estructura y orden de secciones;
- clases y atributos `data-wf-*`;
- CSS, colores, fondos y tipografias;
- jQuery y `webflow.js`;
- animaciones, transiciones y efectos de scroll.

Se reemplaza:

- nombre y marca de la referencia;
- textos comerciales;
- servicios, CTA y datos de contacto;
- fotografias principales y galeria;
- enlaces que correspondan al nuevo negocio.

Además, toda salida debe:

- eliminar `Made in Webflow`, `Powered by Webflow`, el enlace comercial a Webflow y su badge;
- conservar `webflow.js` porque contiene las animaciones originales;
- incluir la firma digital oficial de Quantum Hive con isotipo, enlaces institucionales y el texto `Sitio desarrollado por Quantum Hive`;
- mantener estable cualquier textura `.noise`: si alterna dos capas y titila, congelar la primera y ocultar la segunda sin desactivar otros efectos.

No cambiar colores, fondos, tipografias ni layout salvo que el usuario lo pida expresamente.

## Datos de entrada

1. URL publica.
2. Slug corto para la carpeta de salida.
3. Perfil del negocio en JSON.
4. Carpeta con imagenes aprobadas o descargadas de una fuente con licencia verificable.

No inventar precios, testimonios, direccion, horarios, resultados, anos de experiencia ni nombres de personas.

## Paso 1: capturar la web original

Ejecutar desde la raiz de `FABRICA DE WEBS`:

```powershell
node .agents/skills/clone-adapt-landing/scripts/capture.mjs --url "URL" --slug "SLUG"
```

La captura debe descargar el HTML renderizado, CSS, JavaScript, fuentes, imagenes y videos. La salida queda en:

```text
clientes/quantum-hive/public/templates/SLUG/
  raw/                 copia original intocable
  INVENTORY.json       textos, imagenes y enlaces detectados
  ADAPTATION.json      mapa de reemplazos
```

Nunca reescribir la landing en React, JSX, Tailwind o Framer Motion si el runtime original funciona.

## Paso 2: preparar el perfil

Crear un perfil JSON con datos reales o copy neutral aprobado. Ejemplo minimo:

```json
{
  "business": {
    "name": "Nombre del negocio",
    "rubro": "Rubro",
    "headline": "Propuesta principal",
    "shortHeadline": "Titulo corto",
    "description": "Descripcion aprobada",
    "services": [
      { "name": "Servicio", "description": "Descripcion" }
    ]
  },
  "brand": {
    "assetDir": "clientes/quantum-hive/assets/SLUG",
    "hero": "portada.jpg",
    "gallery": ["foto-1.jpg", "foto-2.jpg"]
  },
  "contact": {
    "ctaLabel": "Consultar",
    "ctaUrl": "#contacto"
  },
  "site": {
    "language": "es-AR"
  }
}
```

No agregar `brand.colors`. Solo si el usuario pide cambiar la paleta se habilita:

```json
{
  "brand": {
    "overrideSourceColors": true,
    "colors": {
      "background": "#000000",
      "surface": "#111111",
      "primary": "#d7b85b",
      "accent": "#f3e6b4",
      "text": "#ffffff"
    }
  }
}
```

## Paso 3: adaptar textos e imagenes

Leer `INVENTORY.json` y completar `ADAPTATION.json` usando sus IDs:

```json
{
  "texts": {
    "t0001": "Nuevo titulo",
    "t0002": "Nuevo texto"
  },
  "images": {
    "i0001": {
      "file": "portada.jpg",
      "alt": "Descripcion de la imagen"
    }
  },
  "links": {
    "l0001": "#contacto"
  }
}
```

Reglas:

- traducir al espanol natural;
- mantener la funcion y una longitud similar de cada bloque;
- cambiar toda identidad de la referencia;
- no tocar clases, jerarquia ni atributos `data-wf-*`;
- asignar imagenes por su contenido y proporcion, no al azar;
- conservar iconos y recursos decorativos neutrales.

## Paso 4: generar la landing adaptada

```powershell
node .agents/skills/clone-adapt-landing/scripts/apply.mjs --slug "SLUG" --profile "RUTA-AL-PERFIL.json"
```

El archivo final queda en:

```text
clientes/quantum-hive/public/templates/SLUG/site/index.html
```

El aplicador copia automáticamente `quantumhive-isotipo.webp`, elimina la marca visible de Webflow, inserta `qh-digital-signature` y estabiliza la doble capa de ruido cuando existe.

## Paso 5: servirla correctamente

El servidor debe iniciarse desde la raiz de la plantilla, nunca desde `site/`:

```powershell
cd "clientes/quantum-hive/public/templates/SLUG"
python -m http.server 4187 --bind 127.0.0.1
```

Abrir:

```text
http://127.0.0.1:4187/site/index.html
```

Esto es obligatorio porque `site/index.html` carga CSS e imagenes desde `../raw/` y `../brand/`. Si el servidor se inicia dentro de `site/`, la web aparece sin estilos y con imagenes rotas.

## Criterio de finalizacion

La IA entrega el localhost y se detiene. No abre Chrome, no genera capturas y no ejecuta validacion visual automatica salvo pedido expreso. El usuario revisa la landing y marca las correcciones.

## Prompt corto para otra IA

```text
Usa la skill clone-adapt-landing. Clona esta URL conservando exactamente su HTML, CSS, colores, tipografias, animaciones y runtime Webflow. Cambia solamente identidad, textos, enlaces e imagenes con el perfil y assets que te doy. No reconstruyas React/JSX, no inventes datos y no cambies la paleta salvo pedido expreso. Elimina toda marca Made in Webflow o Powered by Webflow pero conserva webflow.js. Inserta la firma digital oficial de Quantum Hive con isotipo. Si la textura de fondo tiene dos capas noise y titila, congela la primera y oculta la segunda sin tocar las demas animaciones. Sirve la salida desde la raiz de la plantilla y dame /site/index.html en localhost. No abras navegador ni hagas QA visual: yo la reviso.
```
