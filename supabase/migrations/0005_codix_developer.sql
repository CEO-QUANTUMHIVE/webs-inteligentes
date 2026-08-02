insert into plantillas
  (id, nombre, nicho, descripcion, paleta, fuentes, paginas, estilo,
   caracteristicas, vista_previa, popular, url_demo, publicado)
values (
  'codix-developer',
  'CODIX — Desarrollo independiente',
  'Tecnología / Portfolio',
  'Portfolio técnico de estética oscura y lima con servicios, proyectos, precios, testimonios y formulario de contacto.',
  '{"primario":"#ddff48","secundario":"#6d7e23","acento":"#ffffff","fondo":"#0e0e0e"}'::jsonb,
  '{"familias":"Plus Jakarta Sans + Roboto Mono"}'::jsonb,
  '{"Portada","Sobre mí","Servicios","Portfolio","Precios","Contacto"}',
  'Editorial técnico',
  '{"Hero editorial","Servicios interactivos","Portfolio filtrable","Marquee de testimonios","Preguntas desplegables","Formulario responsive"}',
  'bold',
  true,
  '/plantillas/codix/',
  true
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
  publicado = excluded.publicado;
