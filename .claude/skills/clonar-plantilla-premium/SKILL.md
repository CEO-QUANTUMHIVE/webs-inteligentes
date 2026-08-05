---
name: clonar-plantilla-premium
description: >
  Pipeline EXACTO para clonar el molde de plantilla web PREMIUM (estilo Editorial
  Premium) a un nuevo rubro dentro del catálogo de Web Factory. Se activa cuando
  piden "crear/clonar plantilla premium de <rubro>", "sumar rubro al catálogo
  premium" o "replicar el molde en <rubro>". Está pensado para que un modelo
  económico (Gemini / opencode) lo ejecute paso a paso SIN inventar nada: el
  diseño ya está resuelto, solo hay que transplantar el molde y cambiar los datos
  del rubro. Referencias que YA FUNCIONAN: gastronomia (molde original) y barberia.
---

# Clonar plantilla PREMIUM a un rubro nuevo

> **Regla de oro: NO INVENTAR.** El diseño ya está probado en `gastronomia` y
> `barberia`. Este pipeline solo transplanta el molde y cambia: paleta,
> tipografía, fotos, textos y secciones propias del rubro. Si dudás, **copiá de
> `gastronomia` o `barberia`** y cambiá los valores. No rediseñes.

## Qué produce
Una landing premium navegable en producción, en
`clientes/quantum-hive/src/app/catalogo/plantillas/basicas/<id>/`, con:
hero cinematográfico (foto + ken-burns + parallax), motion (reveals, contadores,
stagger), fotos reales de stock, secciones del rubro, footer multi-columna y la
firma de Quantum Hive. Todo data-driven (textos en arrays al principio del
`page.tsx`).

## Estilo de este molde
**Editorial Premium**: fondo oscuro cálido, tipografía display con carácter +
cuerpo neutro, acento cálido, profundidad por sombras en capas, motion sutil.

---

## PIEZAS COMPARTIDAS (ya existen — NO recrear, solo importar)
Estos componentes ya están en el repo y los usan TODAS las plantillas premium:

| Import | Archivo | Uso |
|---|---|---|
| `@/components/premium/reveal` | `src/components/premium/reveal.tsx` | Aparición al scroll. `<Reveal className delay>` |
| `@/components/premium/contador` | `src/components/premium/contador.tsx` | Número que cuenta al entrar. `<Contador to decimals prefix suffix className>` |
| `@/components/premium/hero-parallax` | `src/components/premium/hero-parallax.tsx` | Imagen de hero con ken-burns+parallax. `<HeroParallax src alt />` |
| `@/components/premium/nav-scroll-flag` | `src/components/premium/nav-scroll-flag.tsx` | Marca `<html data-scrolled>` para condensar el nav. `<NavScrollFlag />` |
| `@/components/marca/firma-quantumhive` | `src/components/marca/firma-quantumhive.tsx` | Firma de marca al pie. `<FirmaQuantumHive />` (isotipo + link a www.quantumhive.com.ar) |

Si alguno NO existe, algo está mal: pará y avisá. No los reescribas.

---

## INPUTS que definís antes de empezar
- `<id>`: slug del rubro (ej. `wellness`, `retail`, `salud`).
- `<Nombre ficticio>`: nombre del negocio de demo (inventado, no real).
- Paleta oficial: `habilidades/paletas-por-nicho/<archivo>.md`. Si el rubro NO
  tiene paleta, crearla primero con contrastes WCAG AA calculados (copiar el
  formato de `barberias.md`).
- Tipografía del rubro (display + body de Google Fonts). Ver la paleta: suele
  sugerir el par.

---

## PASO 1 — Leer la paleta y anotar reglas de contraste
`Read habilidades/paletas-por-nicho/<archivo>.md`.
Anotar: primario, acento, fondo, superficie, texto, texto-suave, y **CRÍTICO**:
¿el texto DENTRO del botón va oscuro o claro? (En barbería va **oscuro**
`#1c1917` porque blanco sobre ámbar no cumple AA). Ese valor va en
`--t-primary-foreground`.

## PASO 2 — Verificar fotos ANTES de usarlas (nunca a ciegas)
Fotos de Unsplash (stock libre), como placeholder swappable. Necesitás ~8:
1 hero + 1 destacado + 6 galería.

**2a. Probar que existen (evita imágenes rotas):**
```bash
test_url() { code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 "https://images.unsplash.com/${1}?w=400&q=60&auto=format&fit=crop"); echo "$code  $1"; }
for id in photo-XXXX photo-YYYY ... ; do test_url "$id"; done
```
Quedarte solo con las que dan `200`.

**2b. Verlas antes de asignar** (armar contact-sheet con PIL y mirarlo):
```bash
python - <<'PY'
import urllib.request
from PIL import Image, ImageDraw
ids = ["photo-XXXX","photo-YYYY", ...]  # solo las 200
base=r"<scratchpad>/"
th=[]
for i,p in enumerate(ids):
    fn=base+f"t{i}.jpg"; urllib.request.urlretrieve(f"https://images.unsplash.com/{p}?w=300&q=60&auto=format&fit=crop",fn)
    th.append((i,Image.open(fn).convert("RGB").resize((300,200))))
cols=3; cw,ch=300,230; rows=(len(th)+cols-1)//cols
s=Image.new("RGB",(cols*cw,rows*ch),(20,20,20)); d=ImageDraw.Draw(s)
for k,(i,im) in enumerate(th):
    x=(k%cols)*cw; y=(k//cols)*ch; s.paste(im,(x,y)); d.text((x+5,y+205),f"#{i} {ids[i][:20]}",fill=(255,200,90))
s.save(base+"sheet.png"); print("OK")
PY
```
Después `Read` el `sheet.png` y asignar cada foto por su CONTENIDO (hero =
la más cinematográfica del rubro; galería = variedad; nada fuera de tema).
Los paths en Windows van con `C:/...` (Python no entiende `/c/...`).

## PASO 3 — layout.tsx (fuentes del rubro)
Copiar `basicas/gastronomia/layout.tsx` y cambiar SOLO las dos fuentes de
`next/font/google` por las del rubro. Mantener `variable: "--t-font-display"`
y `--t-font-body`. Ejemplo barbería: `Bebas_Neue` + `Inter`.

## PASO 4 — <id>.module.css (copiar molde, cambiar tokens)
**Copiar TODO** `basicas/barberia/barberia.module.css` (es el molde más
completo: tiene servicios, equipo, testimonios, mapa, footer, barra móvil).
Cambiar SOLO:
1. Los tokens `--t-*` del bloque `.raiz` por los de la paleta del rubro
   (incluido `--t-primary-foreground` según Paso 1).
2. Los `rgba(...)` hardcodeados del hero/nav/glow/focus que usan el color
   primario, para que matcheen (buscar el hex viejo y reemplazar).
3. Si la fuente display es **serif con itálica** (tipo Playfair): en
   `.heroTitulo span` poné `font-style: italic`. Si es **caps sin itálica**
   (tipo Bebas): NO itálica, solo `color: var(--t-primary)`.
No cambiar la estructura, tamaños, ni el motion. Ya funcionan.

## PASO 5 — page.tsx (copiar molde, cambiar datos)
Copiar `basicas/barberia/page.tsx` (o `gastronomia` si el rubro se parece más a
gastro). Cambiar SOLO:
- `metadata` (título + descripción del rubro).
- Los arrays de datos del principio (`SERVICIOS`/`MENU`, `GALERIA`, `EQUIPO`,
  `TESTIMONIOS`) con el contenido y las fotos verificadas del Paso 2.
- Textos del hero, nombre de marca (`<span className={styles.marca}>`), CTAs,
  secciones propias del rubro, footer y firma queda igual.
- Los `<Contador to={N} />` del hero con los números del rubro.

**Errores conocidos — evitalos:**
- **NUNCA** `&amp;` en texto JSX: se come el espacio anterior (`2026Andrade`).
  Usar el `&` literal.
- Imágenes: `<img>` plano con `width`/`height` + `loading="lazy"` (hero sin
  lazy, lo maneja `HeroParallax`). Dejar el comentario
  `{/* eslint-disable-next-line @next/next/no-img-element */}` arriba de cada img.
- Los contadores de sección grande (tipo "historia") envolverlos en `<strong>`
  para que tomen el estilo del número.
- `React.JSX.Element` como tipo de retorno, nunca `JSX.Element` (React 19).

## PASO 6 — Build (no commitear roto)
```bash
cd clientes/quantum-hive && CLOUDSDK_PYTHON= npm run build
```
Debe decir `Compiled successfully`, `Finished TypeScript` sin errores, y listar
la ruta `/catalogo/plantillas/basicas/<id>`. Si falla, arreglar ANTES de seguir.

## PASO 7 — Verificar con píxeles
El proyecto usa `output: "export"` → el build genera `out/`, y cada ruta es un
**`.html`** (no `index.html` en carpeta). Servir y mirar:
```bash
python -m http.server 8099 --directory clientes/quantum-hive/out
# abrir: http://localhost:8099/catalogo/plantillas/basicas/<id>.html
```
Mirar hero, fotos, motion y mobile 360px. (En Windows: matar el `http.server`
antes del próximo build o da `EBUSY` al borrar `out/`.)

## PASO 8 — Ficha + índice del catálogo
- Crear `catalogo/plantillas/basicas/<id>/ficha.json` copiando el formato de
  `catalogo/plantillas/basicas/gastronomia/ficha.json` (mismos campos, sin
  vacíos; `nivel: "premium"`).
- Agregar la ficha al array de `catalogo/plantillas/basicas/indice.json`.

## PASO 9 — Cerrar
- `graphify update .` (mantener el grafo vivo, sin costo de LLM).
- Commit: `feat(catalogo): plantilla premium <id>` y push a la rama verificada.

---

## Checklist de terminado (por plantilla)
- [ ] Paleta leída; `--t-primary-foreground` correcto (contraste AA del botón)
- [ ] 8 fotos verificadas (200) y asignadas por contenido
- [ ] layout.tsx con las 2 fuentes del rubro
- [ ] module.css copiado del molde, solo tokens/rgba/itálica cambiados
- [ ] page.tsx copiado del molde, solo datos/textos cambiados
- [ ] Sin `&amp;` en JSX; tipos `React.JSX.Element`
- [ ] `npm run build` verde y ruta listada
- [ ] Verificado con píxeles (hero + mobile)
- [ ] ficha.json + indice.json actualizados
- [ ] Firma de Quantum Hive presente (viene sola con `<FirmaQuantumHive/>`)
- [ ] Commit + push

## Referencias vivas (copiar de acá)
- Molde más completo: `basicas/barberia/` (servicios + equipo + testimonios + mapa)
- Molde gastro: `basicas/gastronomia/` (menú por grupos + historia)
- Componentes: `src/components/premium/` y `src/components/marca/`
- Contexto del producto: memoria `reference_vision_quantumhive`
