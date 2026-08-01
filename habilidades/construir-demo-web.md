---
name: construir-demo-web
description: Arma la web de un cliente desde su brief, partiendo de la plantilla maestra. Es el orquestador del pipeline de Web Factory.
---

# Construir Demo Web

> **Versión 2.0** — Reescrita contra el estado real del repo.

## Qué cambió respecto de la v1.0

Tres cosas que no funcionaban:

1. Mandaba a copiar la plantilla desde `sistema-de-diseno/plantillas/`, donde
   solo hay un `templates.ts`. La plantilla real ahora existe en
   `plantillas/base-premium/`.
2. Incluía un paso "Configurar Agente" con knowledge base y widget. **Nada de
   eso existe**: `motor-agentes/` es andamiaje.
3. No mencionaba el deploy. Terminaba en "QA inicial" y la web quedaba en local.

---

## Antes de arrancar

Leé el `CLAUDE.md` de la raíz. Y verificá que tenés el brief del cliente con
**datos verificados**: nombre, dirección, teléfono, servicios, precios y
horarios. Sin eso no se arranca.

> **No se inventan datos de un negocio real.** Si falta un precio, va un
> placeholder marcado y se avisa. Una demo con precios inventados es peor que
> una incompleta: el cliente lo detecta y perdés la venta.

---

## FASE 1 — Partir de la plantilla

```bash
cp -r plantillas/base-premium clientes/<cliente>
cd clientes/<cliente>
npm install
```

Cambiar `name` en `package.json`. Se olvida siempre: `quantum-hive` arrastró
`"name": "base-premium"` durante todo el proyecto.

---

## FASE 2 — Sistema de diseño del nicho

**Primero mirá si el nicho ya tiene paleta propia:**

```bash
ls habilidades/paletas-por-nicho/
```

Si existe, usala: están escritas para el rubro y con los contrastes medidos.

Si no existe, consultá `ui-ux-pro-max`, **en inglés**:

```bash
python .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system
```

> El dataset está en inglés y organizado por *product type*. Una consulta en
> español cae al default de SaaS: azul, naranja y glassmorphism para cualquier
> rubro. Y si el nicho no está en el dataset, el resultado no sirve — a
> "barbería" la clasifica como *Beauty/Spa* y devuelve rosa con lavanda.

### Verificar el contraste, siempre

Sea cual sea el origen de la paleta, medí antes de usarla. La paleta de
barberías afirmaba "contraste perfecto" y el texto del CTA daba 3.19:1.

| Combinación | Mínimo |
|---|---|
| Texto de cuerpo sobre fondo | 4.5:1 |
| **Texto dentro de botones** | 4.5:1 |
| Bordes y separadores | 3:1 |

Volcar los colores en las variables `--marca-*` de `globals.css` y las fuentes
en `layout.tsx`.

---

## FASE 3 — Contenido

Reemplazar todos los `[corchetes]` de `page.tsx` con la información real.

Adaptar el vocabulario al rubro:

| Nicho | CTA |
|---|---|
| Gastronomía | Ver menú · Reservar mesa |
| Barbería | Reservar turno · Ver servicios |
| Retail | Ver productos · Comprar |
| Wellness | Reservar clase · Ver horarios |

Si el negocio tiene web o redes, sacá de ahí los datos con `copiar-pagina.md`,
que analiza el sitio en un navegador real.

---

## FASE 4 — Efectos

```bash
npx shadcn@latest add @vengeanceui/animated-rays
```

El catálogo con los 25 efectos y su ficha técnica está en `/catalogo-efectos`.

Dos reglas que salieron de romper cosas en producción:
- **En la home, efectos livianos.** Los de impacto 5 rinden mejor de a uno.
- Para páginas críticas preferir CSS puro. Algunos componentes de Vengeance se
  rompieron en producción por depender de configuración especial.

---

## FASE 5 — QA

```bash
npm run build
```

Verificar que **todas** las rutas aparecen en el output: una página faltante
falla en silencio.

Después, en el navegador:

1. `preview_start` sobre el build.
2. `read_console_messages { onlyErrors: true }` → tiene que dar vacío.
3. `resize_window` a 360×640 y comprobar que no hay desborde horizontal.
4. Cada ruta con su propio `<title>`. Si es `"use client"` no puede exportar
   `metadata`: separar en server component + cliente adentro.

Después correr `qa-web-cliente.md`.

---

## FASE 6 — Deploy

```bash
npm run build
gcloud run deploy <cliente> --source . --region us-central1 --project bubbly-stone-502214-u7
```

- El **403** inicial no es un deploy fallido: falta el acceso público. La
  organización bloquea `allUsers` en IAM; se resuelve con
  `--no-invoker-iam-check`.
- `.gcloudignore` no se toca. Sin él, gcloud usa el `.gitignore` —que excluye
  `out/`— y sube `node_modules` sin ningún HTML.

---

## FASE 7 — Registrar

```sql
insert into clientes (nombre, nicho, estado, contacto)
values ('<nombre>', '<nicho>', 'piloto', '{"tel":"...","ig":"..."}');

insert into proyectos (cliente_id, nombre, estado, url_deploy, efectos)
values ('<uuid>', '<nombre>', 'en_revision', 'https://...', array['animated-rays']);
```

Si algo falló y se resolvió, cargarlo en `aprendizajes` y correr
`mejorar-skills.md`. Es lo que evita repetir el error en el próximo cliente.

---

## Qué NO prometer

**No hay agente conversacional.** `motor-agentes/` son READMEs sin código, y el
endpoint de QuantumCore es el asistente interno del CEO: inyecta constitución y
memoria propias, y no tiene autenticación. Exponerlo en la web de un cliente
filtraría contexto interno.

Se puede vender como fase 2. No se muestra como si existiera.

---

## Errores conocidos

| Síntoma | Causa | Solución |
|---|---|---|
| Build no encuentra `package.json` | Directorio equivocado | `cd clientes/<cliente>` |
| Namespace JSX | React 19 | `React.JSX.Element` |
| Todas las rutas con el mismo título | Páginas `"use client"` | Separar server + cliente |
| Cloud Run devuelve 403 | Falta acceso público | No es fallo de deploy |
| Componente de Vengeance roto en prod | Config especial | Reemplazar por CSS puro |
| Un componente del registro no compila | Viene roto de origen | Pasó con `mega-menu-navbar`: bloque duplicado y `className` truncado |
