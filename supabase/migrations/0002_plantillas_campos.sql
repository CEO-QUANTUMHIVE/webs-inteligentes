-- Campos que el frontend ya usaba y la tabla no tenia.
alter table plantillas
  add column if not exists estilo         text,
  add column if not exists caracteristicas text[] not null default '{}',
  add column if not exists vista_previa   text not null default 'minimal'
    check (vista_previa in ('minimal','bold','gradient','dark','clean','creative')),
  add column if not exists popular        boolean not null default false;

comment on column plantillas.vista_previa is
  'Estilo del preview visual en el catalogo, no del sitio final.';
