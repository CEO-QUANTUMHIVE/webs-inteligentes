# Base de datos — Web Factory

Proyecto Supabase: `paviigrgdumrwldegliy` · https://paviigrgdumrwldegliy.supabase.co

Es la base del frente **Webs Inteligentes**: memoria, catálogo, clientes,
proyectos, activos y aprendizajes. Se comparte con QuantumCore por `ambito`.

## Aplicar el esquema

Requiere la contraseña de Postgres (la clave `publishable` no puede correr DDL).

```bash
npx supabase db push --db-url "postgresql://postgres:PASSWORD@db.paviigrgdumrwldegliy.supabase.co:5432/postgres"
```

Alternativa sin pasar la contraseña por línea de comandos:

```bash
npx supabase login
npx supabase link --project-ref paviigrgdumrwldegliy
npx supabase db push
```

## Claves

| Clave | Dónde va | Se commitea |
|-------|----------|-------------|
| `publishable` (`sb_publishable_…`) | Frontend, navegador | Sí — es pública por diseño |
| `secret` / `service_role` | Solo backend en Cloud Run, como variable de entorno | **Nunca** |
| Contraseña de Postgres | Solo local, para migraciones | **Nunca** |

## Seguridad: por qué RLS no es opcional

La clave publishable viaja al navegador de cualquiera que abra la web. Sin RLS,
esa clave permite leer y escribir **todas** las tablas.

El esquema activa RLS en las 8 tablas. Solo hay dos políticas públicas, ambas de
lectura: `efectos` y `plantillas` publicadas. El resto —memorias, clientes,
proyectos, activos, aprendizajes, skills— no tiene políticas, así que solo se
accede con `service_role` desde el backend.

### El código de los efectos no se expone

`efectos` tiene una columna `codigo` que es desarrollo propio. La política
pública da `select` sobre la tabla, pero **el frontend consulta la vista
`efectos_publicos`**, que no incluye esa columna.

> Pendiente al montar el frontend: la política actual permite a `anon` leer la
> tabla completa, incluida `codigo`. Antes de exponer la web hay que revocar el
> select público sobre `efectos` y dejarlo solo sobre la vista. Está anotado en
> `aprendizajes`.

## Tablas

| Tabla | Para qué |
|-------|----------|
| `memorias` | Memoria compartida. Forma compatible con Memanto |
| `efectos` | Catálogo de animaciones. `codigo` es privado |
| `plantillas` | Plantillas por nicho |
| `clientes` | Prospectos y clientes |
| `proyectos` | Cada web que se construye |
| `activos` | Imágenes y media en Storage, con licencia |
| `aprendizajes` | Errores y soluciones. Alimenta `mejorar-skills` |
| `skills` | Registro de skills y versiones |

## Memoria compartida con QuantumCore

`memorias` replica la forma de `mementoClient.ts`: `contenido`, `tipo`,
`ambito` (scope), `agente_id`, `etiquetas`, `importancia`.

QuantumCore ya tiene el mecanismo para montarla: `providers/dbRouter.ts` expone
`addProjectDatabase({ scope, supabaseUrl, supabaseAnonKey })`. Registrando esta
base con `scope: 'web-factory'`, Dominus y los demás agentes la consultan sin
tocar código.

**Nota:** Memanto (el sidecar semántico en `localhost:8000`) está caído en
producción — `/api/memanto/status` devuelve `available: false`. Hasta que se
levante, la memoria vive acá en Postgres, con índice de texto en español para
recall. No hay embeddings todavía.

## Convenciones

- Nombres de tablas y columnas en español, `snake_case`, sin acentos ni ñ.
- Toda tabla lleva `creado_en`. Las que mutan llevan `actualizado_en` con trigger.
- Los `id` de `efectos` y `plantillas` son slugs, no uuid: se referencian desde
  el código del frontend.
