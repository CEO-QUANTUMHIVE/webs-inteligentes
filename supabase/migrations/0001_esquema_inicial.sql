-- ============================================================================
-- Web Factory — esquema inicial
--
-- Principio de seguridad: RLS activo en TODAS las tablas. La clave
-- publishable es publica por diseno, asi que sin RLS cualquiera con esa
-- clave leeria y escribiria todo.
--
-- El catalogo se ve publico, pero el codigo de los efectos NO: se expone
-- solo la vista `efectos_publicos`, que no incluye la columna `codigo`.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- 1. MEMORIA COMPARTIDA
--    Forma compatible con Memanto (mementoClient.ts de QuantumCore) para
--    que ambos sistemas lean y escriban la misma memoria.
-- ─────────────────────────────────────────────────────────────────────────

create type tipo_memoria as enum (
  'fact', 'preference', 'decision', 'rule', 'goal', 'context',
  'person', 'project', 'architecture', 'business', 'constraint',
  'feedback', 'misc'
);

create table memorias (
  id           uuid primary key default gen_random_uuid(),
  contenido    text not null,
  tipo         tipo_memoria not null default 'misc',
  -- 'web-factory' aisla esta memoria; QuantumCore la monta por scope
  -- usando dbRouter.addProjectDatabase().
  ambito       text not null default 'web-factory',
  agente_id    text,
  etiquetas    text[] not null default '{}',
  importancia  numeric(3,2) not null default 0.5
                 check (importancia between 0 and 1),
  creado_en    timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create index on memorias (ambito, tipo);
create index on memorias using gin (etiquetas);
-- Busqueda de texto en espanol para recall sin depender de embeddings.
create index on memorias using gin (to_tsvector('spanish', contenido));

-- ─────────────────────────────────────────────────────────────────────────
-- 2. CATALOGO DE EFECTOS
-- ─────────────────────────────────────────────────────────────────────────

create table efectos (
  id           text primary key,               -- slug: 'animated-rays'
  nombre       text not null,
  descripcion  text not null,
  categoria    text not null,
  impacto      smallint not null default 3 check (impacto between 1 and 5),
  ideal_para   text[] not null default '{}',
  -- Ruta del componente en el repo. El agente la usa para importarlo.
  componente   text,
  -- Props de demostracion que usa el preview del catalogo.
  props_demo   jsonb not null default '{}',
  origen       text not null default 'vengeance-ui'
                 check (origen in ('vengeance-ui', 'propio', 'adaptado')),
  -- PRIVADO. Nunca se expone por la API publica.
  codigo       text,
  publicado    boolean not null default true,
  es_nuevo     boolean not null default false,
  creado_en    timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create index on efectos (categoria) where publicado;

-- Lo unico que ve el publico: sin `codigo`.
create view efectos_publicos
  with (security_invoker = true)
  as select id, nombre, descripcion, categoria, impacto,
            ideal_para, origen, es_nuevo
     from efectos
     where publicado;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. PLANTILLAS
-- ─────────────────────────────────────────────────────────────────────────

create table plantillas (
  id           text primary key,
  nombre       text not null,
  nicho        text not null,
  descripcion  text,
  paleta       jsonb not null default '{}',    -- {primary, secondary, accent, bg}
  fuentes      jsonb not null default '{}',
  paginas      text[] not null default '{}',
  efectos      text[] not null default '{}',   -- ids de efectos que usa
  publicado    boolean not null default true,
  creado_en    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- 4. CLIENTES Y PROYECTOS
-- ─────────────────────────────────────────────────────────────────────────

create table clientes (
  id           uuid primary key default gen_random_uuid(),
  nombre       text not null,
  nicho        text,
  estado       text not null default 'prospecto'
                 check (estado in ('prospecto','piloto','activo','pausado','perdido')),
  contacto     jsonb not null default '{}',
  notas        text,
  creado_en    timestamptz not null default now()
);

create table proyectos (
  id           uuid primary key default gen_random_uuid(),
  cliente_id   uuid not null references clientes(id) on delete cascade,
  nombre       text not null,
  plantilla_id text references plantillas(id),
  estado       text not null default 'borrador'
                 check (estado in ('borrador','en_desarrollo','en_revision','lanzado','archivado')),
  efectos      text[] not null default '{}',
  url_deploy   text,
  url_repo     text,
  creado_en    timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create index on proyectos (cliente_id, estado);

-- ─────────────────────────────────────────────────────────────────────────
-- 5. ACTIVOS (imagenes y media en Supabase Storage)
-- ─────────────────────────────────────────────────────────────────────────

create table activos (
  id            uuid primary key default gen_random_uuid(),
  proyecto_id   uuid references proyectos(id) on delete cascade,
  tipo          text not null default 'imagen'
                  check (tipo in ('imagen','video','logo','icono','fuente')),
  ruta_storage  text not null,                -- bucket/carpeta/archivo.png
  alt           text,
  -- Sin licencia clara, un activo no se publica en una web de cliente.
  licencia      text not null default 'desconocida',
  creado_en     timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- 6. APRENDIZAJES — alimenta la skill que mejora a las demas skills
-- ─────────────────────────────────────────────────────────────────────────

create table aprendizajes (
  id             uuid primary key default gen_random_uuid(),
  titulo         text not null,
  sintoma        text not null,               -- que se vio fallar
  causa          text,                        -- por que fallaba
  solucion       text not null,               -- que lo arreglo
  skill_afectada text,                        -- que skill deberia cambiar
  severidad      text not null default 'media'
                   check (severidad in ('baja','media','alta','critica')),
  -- Solo cuenta si se comprobo que la solucion funciona.
  verificado     boolean not null default false,
  aplicado       boolean not null default false,
  creado_en      timestamptz not null default now()
);

create index on aprendizajes (skill_afectada) where not aplicado;

-- ─────────────────────────────────────────────────────────────────────────
-- 7. REGISTRO DE SKILLS
-- ─────────────────────────────────────────────────────────────────────────

create table skills (
  nombre       text primary key,
  version      text not null default '1.0',
  descripcion  text,
  ruta         text not null,                 -- habilidades/copiar-pagina.md
  estado       text not null default 'activa'
                 check (estado in ('activa','borrador','deprecada')),
  actualizado_en timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- 8. actualizado_en automatico
-- ─────────────────────────────────────────────────────────────────────────

create or replace function tocar_actualizado_en()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

create trigger t_memorias  before update on memorias
  for each row execute function tocar_actualizado_en();
create trigger t_efectos   before update on efectos
  for each row execute function tocar_actualizado_en();
create trigger t_proyectos before update on proyectos
  for each row execute function tocar_actualizado_en();

-- ─────────────────────────────────────────────────────────────────────────
-- 9. RLS
--
-- Por defecto: nadie entra. Activar RLS sin politicas deja la tabla
-- cerrada para las claves publicas; la service_role siempre las saltea.
-- ─────────────────────────────────────────────────────────────────────────

alter table memorias     enable row level security;
alter table efectos      enable row level security;
alter table plantillas   enable row level security;
alter table clientes     enable row level security;
alter table proyectos    enable row level security;
alter table activos      enable row level security;
alter table aprendizajes enable row level security;
alter table skills       enable row level security;

-- Lo unico publico: el catalogo, en modo lectura y sin codigo.
create policy "catalogo publico" on efectos
  for select to anon
  using (publicado);

create policy "plantillas publicas" on plantillas
  for select to anon
  using (publicado);

-- El resto (memorias, clientes, proyectos, activos, aprendizajes, skills)
-- queda sin politicas: solo accesible con service_role desde el backend.

-- La vista hereda el RLS de `efectos` por security_invoker.
grant select on efectos_publicos to anon;

-- El codigo de los efectos es desarrollo propio: anon no lo ve nunca.
-- La politica de RLS sola no alcanza, porque filtra filas y no columnas.
-- Se revoca el select de tabla completa y se otorga columna por columna.
revoke select on efectos from anon;
grant select (id, nombre, descripcion, categoria, impacto, ideal_para,
              origen, es_nuevo, publicado)
  on efectos to anon;
