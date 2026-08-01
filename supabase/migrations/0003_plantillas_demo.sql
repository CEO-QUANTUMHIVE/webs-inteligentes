-- URL de la demo navegable. Sin esto el catalogo solo puede mostrar una
-- tarjeta; con esto el cliente entra y recorre la plantilla de verdad.
alter table plantillas
  add column if not exists url_demo text;

comment on column plantillas.url_demo is
  'Ruta de la demo servida desde public/plantillas/<slug>/. Relativa al sitio.';

-- El catalogo se reinicia con una unica plantilla verificada. Las entradas
-- anteriores eran conceptos sin una demo real y no deben publicarse.
delete from plantillas
where id <> 'concreto-streetwear';

insert into plantillas
  (id, nombre, nicho, descripcion, paleta, fuentes, paginas, estilo,
   caracteristicas, vista_previa, popular, url_demo)
values (
  'concreto-streetwear',
  'CONCRETO — Moda de calle',
  'Streetwear / Indumentaria',
  'One-pager cinematografico con cuatro escenas ancladas al scroll que descienden del cielo nocturno al asfalto, antes de aterrizar en un catalogo de producto. Grano de pelicula, tipografia de cartel y una sola acentuacion naranja.',
  '{"primario":"#ff5a1f","secundario":"#ffb03c","acento":"#8c897f","fondo":"#0a0a0a"}'::jsonb,
  '{"familias":"Anton + Space Grotesk"}'::jsonb,
  '{"Portada","Coleccion","Manifiesto","Tienda","Contacto"}',
  'Cinematico',
  '{"Escenas ancladas al scroll","Galeria rotativa","Grano de pelicula","Particulas en canvas","Altimetro de capitulo","Header de contraste adaptativo"}',
  'dark',
  true,
  '/plantillas/concreto/'
)
on conflict (id) do update set
  nombre = excluded.nombre,
  nicho = excluded.nicho,
  descripcion = excluded.descripcion,
  paleta = excluded.paleta,
  fuentes = excluded.fuentes,
  paginas = excluded.paginas,
  estilo = excluded.estilo,
  caracteristicas = excluded.caracteristicas,
  vista_previa = excluded.vista_previa,
  popular = excluded.popular,
  url_demo = excluded.url_demo,
  publicado = true;
