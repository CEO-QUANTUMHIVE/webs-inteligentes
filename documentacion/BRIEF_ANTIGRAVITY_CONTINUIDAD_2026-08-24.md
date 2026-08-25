# Brief de continuidad para Antigravity — Fábrica de Webs QuantumHive

Fecha de corte: 24 de agosto de 2026  
Repositorio local: `C:\Users\sergio\Desktop\QUANTUMHIVE FEDERADO\FABRICA DE WEBS`  
Repositorio remoto: `https://github.com/CEO-QUANTUMHIVE/webs-inteligentes.git`  
Branch actual: `main`  
Commit base observado: `47caa66`  

## 1. Objetivo de esta continuidad

Continuar la Fábrica de Webs sin reconstruir lo que ya funciona, sin borrar la skill de clonación y sin mezclar este repositorio con el scraper o con la Fábrica de Agentes.

La primera tarea concreta es corregir la publicación de **Áurea Nail Studio** en el catálogo público de plantillas. La ficha fue registrada en código, pero el catálogo `/catalogo-plantillas` no llega a renderizar localmente porque `obtenerPlantillas()` exige una clave de Supabase antes de usar las plantillas estáticas. Por eso el usuario no la ve.

No declarar la publicación terminada hasta que el catálogo real responda, muestre la tarjeta y su botón abra la demo.

## 2. Lectura obligatoria antes de modificar archivos

Leer en este orden:

1. `AGENTS.md` en la raíz del repositorio.
2. `C:\Users\sergio\.agents\skills\graphify\SKILL.md`.
3. `.agents/skills/clone-adapt-landing/SKILL.md`.
4. `documentacion/CLONACION-RAPIDA-WEBFLOW-PARA-OTRA-IA.md`.
5. Este brief.

Después consultar el grafo antes de explorar manualmente:

```powershell
graphify query "donde se registra el catalogo publico de plantillas y la seleccion de plantillas de FabricaWebCockpit"
graphify explain "FirmaQuantumHive"
graphify query "flujo de clonacion Webflow firma QuantumHive y preservacion de IX2"
```

El grafo todavía no reconoce bien los nodos nuevos `clone-adapt-landing` y `plantillasCatalog.ts`. Si una consulta no devuelve el nodo, leer únicamente los archivos exactos indicados en este brief. No hacer una exploración masiva del repositorio para compensarlo.

Después de un cambio estructural ejecutar una sola vez:

```powershell
graphify update .
```

En la última ejecución terminó la extracción AST de `689/689` archivos y después quedó detenido en el posprocesamiento. Si vuelve a ocurrir, no perder tiempo repitiéndolo indefinidamente: registrar el estado y continuar con verificaciones focalizadas. Los hooks del grafo se configuran con `scripts/setup-git-hooks.sh` en clones o worktrees nuevos.

## 3. Reglas inviolables del usuario y del repositorio

- No volver a clonar el repositorio. Trabajar en esta copia exacta.
- El worktree está sucio y contiene cambios del usuario. No usar `git reset --hard`, `git clean`, `git checkout --` ni borrar cambios ajenos.
- No borrar, reemplazar ni simplificar la skill funcional de clonación Webflow.
- Cuando se recibe una URL de referencia, no reconstruirla manualmente con React, JSX, Tailwind o Framer Motion.
- Capturar el HTML renderizado y reutilizar DOM, clases, CSS, fuentes, jQuery, `webflow.js`, atributos `data-wf-*` y animaciones originales.
- Adaptar identidad, textos, enlaces e imágenes; no hacer un clon comercial exacto.
- No inventar precios, testimonios, direcciones, horarios, años de experiencia, resultados ni nombres.
- Conservar la paleta, los fondos y las tipografías originales salvo pedido expreso del usuario.
- No generar imágenes. El usuario pidió expresamente no gastar tiempo ni tokens en generación. Usar assets aportados o fuentes con licencia registrada.
- Eliminar `Made in Webflow`, `Powered by Webflow`, enlaces comerciales a Webflow y `.w-webflow-badge`, pero conservar el runtime de Webflow.
- Insertar siempre la firma oficial QuantumHive con isotipo y `id="qh-digital-signature"`.
- Si una doble capa `.noise` titila, congelar `.noise-default` y ocultar `.noise-flipped`; no desactivar las demás animaciones.
- En sticky/stacking cards usar `overflow-x: clip`; nunca bloquear ancestros con `overflow: hidden`.
- No abrir Chrome, no tomar capturas y no hacer validación visual automática salvo pedido expreso. El usuario hace la revisión visual.
- No publicar a producción ni a un dominio externo sin autorización explícita. La autorización actual fue solamente agregar Áurea al catálogo de plantillas.
- Entregar resultados concretos y enlaces; evitar planificación larga o rediseños no solicitados.

## 4. Visión del producto que se debe preservar

QuantumHive se imagina como una **nave nodriza inmersiva pero liviana**. Dentro existen fábricas y productos como módulos o talleres conectados por un mismo lenguaje visual.

La Fábrica de Webs debe explicar sola este recorrido:

1. El cliente conoce el problema que resuelve una web inteligente.
2. Entra al catálogo y elige una base.
3. Carga la información de su negocio.
4. La fábrica adapta la plantilla y presenta una demo.
5. El cliente cambia la base o remixa efectos de scroll, mouse y canvas.
6. Un agente de la fábrica lo guía paso a paso.
7. Al final se integra el agente conversacional creado en la Fábrica de Agentes.

Una web inteligente no es solamente una landing: incorpora un agente conversacional capaz de atender y acompañar al cliente 24/7.

Lenguaje de marca general QuantumHive: negro, dorado, paneles, colmena cuántica y tecnología profesional. Esta identidad aplica al ecosistema y a las fábricas. No se debe imponer automáticamente sobre las plantillas de clientes: cada clon conserva la estética de su referencia salvo pedido expreso.

El scraper del Departamento de Investigaciones se está resolviendo en otro repositorio. No implementarlo aquí. La creación central de agentes también pertenece a la Fábrica de Agentes; aquí solamente se prevé su integración futura.

## 5. Estado real del repositorio

El repositorio tiene cambios sin commit. Antes de actuar ejecutar:

```powershell
git branch --show-current
git rev-parse --short HEAD
git status --short
git diff --stat
```

No asumir que todos los cambios pertenecen a esta tarea. Entre los cambios visibles están:

- landing principal y ruta duplicada integradas mediante `LandingWebs`;
- clon Desyres/Quantum usado actualmente como iframe de la landing;
- skill rápida de clonación Webflow;
- clon Áurea Nail Studio;
- registros del catálogo modificados;
- otros assets, documentación, scripts y trabajo experimental sin commit.

Archivos modificados o nuevos relevantes:

```text
clientes/quantum-hive/src/app/page.tsx
clientes/quantum-hive/src/app/webs-inteligentes/page.tsx
clientes/quantum-hive/src/components/webs-inteligentes/LandingWebs.tsx
clientes/quantum-hive/src/components/webs-inteligentes/HeroTechCanvas.tsx
clientes/quantum-hive/src/components/webs-inteligentes/landing-webs.module.css
clientes/quantum-hive/public/templates/desyres-quantum/
.agents/skills/clone-adapt-landing/
habilidades/clone-adapt-landing/
documentacion/CLONACION-RAPIDA-WEBFLOW-PARA-OTRA-IA.md
clientes/quantum-hive/perfiles/aurea-nail-studio.json
clientes/quantum-hive/assets/aurea-nail-studio/
clientes/quantum-hive/public/templates/aurea-nail-studio/
clientes/quantum-hive/src/lib/catalogo.ts
clientes/quantum-hive/src/lib/plantillasCatalog.ts
```

La landing principal actual usa:

```text
/templates/desyres-quantum/site/index.html
```

desde un iframe en `LandingWebs.tsx`. El usuario no considera terminado ese diseño y decidió postergar el concepto inmersivo de nave. No seguir puliéndolo sin una nueva indicación visual.

## 6. Skill funcional de clonación rápida

La skill activa está en:

```text
.agents/skills/clone-adapt-landing/
```

Existe una copia canónica sincronizada en:

```text
habilidades/clone-adapt-landing/
```

Si se modifica la skill, mantener ambas copias sincronizadas. No editar solamente una.

Flujo obligatorio desde la raíz del repositorio:

```powershell
node .agents/skills/clone-adapt-landing/scripts/capture.mjs --url "URL" --slug "SLUG"
node .agents/skills/clone-adapt-landing/scripts/apply.mjs --slug "SLUG" --profile "RUTA-AL-PERFIL.json"
```

Salida esperada:

```text
clientes/quantum-hive/public/templates/SLUG/
  raw/                 original intocable
  brand/               assets adaptados y firma
  site/index.html      resultado navegable
  ASSETS.json
  INVENTORY.json
  ADAPTATION.json
  VERIFY.json
```

Servir siempre desde la raíz de la plantilla, no desde `site/`:

```powershell
cd "clientes/quantum-hive/public/templates/SLUG"
python -m http.server 4190 --bind 127.0.0.1
```

Entregar:

```text
http://127.0.0.1:4190/site/index.html
```

La ruta relativa es importante porque `site/index.html` carga recursos desde `../raw/` y `../brand/`.

## 7. Clon terminado: Áurea Nail Studio

Referencia:

```text
https://nailorastudio.webflow.io/
```

Slug:

```text
aurea-nail-studio
```

Perfil:

```text
clientes/quantum-hive/perfiles/aurea-nail-studio.json
```

Assets:

```text
clientes/quantum-hive/assets/aurea-nail-studio/
```

Las diez fotografías son de Pexels. Licencia y URLs de origen:

```text
clientes/quantum-hive/assets/aurea-nail-studio/ASSET-SOURCES.json
```

Salida final:

```text
clientes/quantum-hive/public/templates/aurea-nail-studio/site/index.html
```

Ruta pública dentro de Next:

```text
/templates/aurea-nail-studio/site/index.html
```

Portada usada por el catálogo:

```text
/templates/aurea-nail-studio/brand/07-28712961.jpg
```

Estado estructural registrado en `VERIFY.json`:

- `pass: true`;
- 176 textos cambiados;
- 56 reemplazos de imagen;
- 11 assets copiados;
- 5 enlaces cambiados;
- jQuery y runtime Webflow preservados;
- firma QuantumHive presente;
- marca visible de Webflow eliminada;
- assets resueltos;
- cero `data-w-id` en la fuente y en la salida, por lo que no afirmar que se preservaron IDs inexistentes.

La métrica `changedTextPercent` figura como `115` porque compara textos cambiados contra textos elegibles. Es una anomalía de presentación del verificador, no una prueba de cobertura superior a 100 %. Puede corregirse después, pero no bloquea el catálogo.

El usuario revisó visualmente esta landing y aprobó continuar, después de corregir:

- fondo y paleta para que coincidan con la referencia original;
- firma digital QuantumHive;
- eliminación de `Made in Webflow`;
- titileo de la textura `.noise`.

No volver a cambiar el fondo ni la paleta de Áurea a negro/dorado.

## 8. Publicación en catálogo: estado parcial y causa real

Se agregaron dos registros:

### Catálogo interno de la Fábrica Web

Archivo:

```text
clientes/quantum-hive/src/lib/plantillasCatalog.ts
```

Entrada:

```text
id: well-aurea-nail-studio
rubro: wellness
urlPath: /templates/aurea-nail-studio/site/index.html
imagen: /templates/aurea-nail-studio/brand/07-28712961.jpg
badge: Premium IX2
```

También se actualizaron los contadores a 71 plantillas totales y 8 de Wellness. Esta lista alimenta `FabricaWebCockpit.tsx` y su modal de catálogo.

### Catálogo público de plantillas

Archivo:

```text
clientes/quantum-hive/src/lib/catalogo.ts
```

Entrada:

```text
PLANTILLA_AUREA_NAIL_STUDIO
id: aurea-nail-studio
urlDemo: /templates/aurea-nail-studio/site/index.html
```

La página pública se compone en:

```text
clientes/quantum-hive/src/app/catalogo-plantillas/page.tsx
clientes/quantum-hive/src/app/catalogo-plantillas/plantillas-cliente.tsx
```

### Bloqueo confirmado

Al abrir `/catalogo-plantillas`, la aplicación lanza:

```text
Error: Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
at obtenerPlantillas (src/lib/catalogo.ts)
```

La causa está en esta condición:

```ts
if (!CLAVE) throw new Error("Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
```

Aunque `PLANTILLAS_PUBLICADAS` ya contiene Áurea, el código falla antes de devolver las plantillas estáticas. La publicación no está terminada hasta resolver esto.

## 9. Primera tarea exacta para Antigravity

1. Consultar Graphify y leer solamente los cuatro archivos del catálogo indicados arriba.
2. Hacer que `obtenerPlantillas()` pueda devolver `PLANTILLAS_PUBLICADAS` cuando no exista la clave de Supabase, sin romper el camino Supabase cuando la clave sí exista.
3. No borrar la consulta remota ni el mapeo existente.
4. Mantener la entrada Áurea en ambos registros.
5. Comprobar por HTTP, sin abrir navegador:
   - `/catalogo-plantillas` responde 200;
   - el HTML o payload renderizado contiene `ÁUREA NAIL STUDIO`;
   - la demo responde 200;
   - la portada responde 200;
   - el HTML de la demo contiene `qh-digital-signature`.
6. Levantar el servidor Next en un puerto libre. En Windows usar:

```powershell
cd "clientes/quantum-hive"
npm.cmd run dev -- -p 4188
```

Si 4188 está ocupado, elegir otro puerto; no matar procesos desconocidos. En la última sesión 4187 tuvo una colisión entre un servidor estático y Next.

7. Dar al usuario el enlace directo a:

```text
http://127.0.0.1:PUERTO/catalogo-plantillas
```

8. Detenerse para revisión humana. No abrir Chrome ni evaluar el diseño por cuenta propia.

### Criterio de aceptación

Áurea debe verse como tarjeta dentro del **catálogo público de plantillas**, en la sección premium/Wellness, y el botón `Demo` debe abrir la landing adaptada con estilos, imágenes, animaciones y firma.

## 10. Verificaciones ya realizadas y límites

Se verificó sin navegador:

- `/fabrica-web` respondió HTTP 200;
- `/templates/aurea-nail-studio/site/index.html` respondió HTTP 200;
- la portada local respondió HTTP 200;
- el HTML de la demo contiene la firma `qh-digital-signature`.

No se verificó visualmente el catálogo. El lint focalizado fue iniciado pero quedó detenido sin resultado final. No afirmar que lint o build completo pasaron. La compilación de la ruta `/fabrica-web` sí terminó y respondió 200.

## 11. Lo que no se debe hacer ahora

- No rediseñar otra vez la landing principal.
- No construir todavía la nave 3D o el videojuego inmersivo.
- No crear el scraper de investigaciones en este repositorio.
- No crear aquí toda la Fábrica de Agentes.
- No iniciar una limpieza masiva de skills sin una auditoría separada y aprobación explícita.
- No volver a clonar Nailora manualmente.
- No sustituir la salida estática por una aproximación React.
- No generar nuevas imágenes.
- No desplegar a producción todavía.

## 12. Próximos pasos después de que Áurea sea visible

1. El usuario valida la tarjeta y la apertura de la demo.
2. Probar la skill con una segunda URL sencilla y medir el tiempo real desde captura hasta localhost.
3. Corregir únicamente fallas repetibles de la skill, no casos estéticos aislados.
4. Convertir el flujo en una operación delegable a un agente constructor especializado.
5. Poblar el catálogo con más clones adaptados por rubro y guardar sus efectos reutilizables.
6. Recién después retomar la experiencia inmersiva común de la nave QuantumHive.

## 13. Prompt de arranque para Antigravity

```text
Trabajá en C:\Users\sergio\Desktop\QUANTUMHIVE FEDERADO\FABRICA DE WEBS. No clones de nuevo el repo. Leé primero AGENTS.md, C:\Users\sergio\.agents\skills\graphify\SKILL.md, .agents/skills/clone-adapt-landing/SKILL.md, documentacion/CLONACION-RAPIDA-WEBFLOW-PARA-OTRA-IA.md y documentacion/BRIEF_ANTIGRAVITY_CONTINUIDAD_2026-08-24.md. Consultá Graphify antes de abrir archivos. El worktree está sucio: preservá todos los cambios y no uses reset, clean ni checkout destructivo. La primera tarea es hacer visible Áurea Nail Studio en /catalogo-plantillas. La ficha ya existe en src/lib/catalogo.ts y src/lib/plantillasCatalog.ts, y la demo está en public/templates/aurea-nail-studio/site/index.html. El bloqueo confirmado es que obtenerPlantillas() arroja error cuando falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY antes de devolver PLANTILLAS_PUBLICADAS. Implementá un fallback estático seguro sin borrar el camino Supabase. Verificá por HTTP que catálogo, demo, portada y firma respondan. No abras Chrome, no hagas QA visual, no generes imágenes, no cambies la paleta de Áurea y no despliegues a producción. Entregame el localhost del catálogo y detenete para que yo lo revise.
```

