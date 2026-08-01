insert into plantillas
  (id, nombre, nicho, descripcion, paleta, fuentes, paginas, estilo,
   caracteristicas, vista_previa, popular, url_demo)
values (
  'gamer-agency',
  'GAMER — Global design agency',
  'Branding / Agencia',
  'Hero editorial de pantalla completa con video controlado por el mouse y herramientas interactivas de estudio.',
  '{"primario":"#ff5733","secundario":"#ff4500","acento":"#f1eee9","fondo":"#000000"}'::jsonb,
  '{"familias":"Outfit + Inter + JetBrains Mono"}'::jsonb,
  '{"Hero interactivo","Menu","Configurador","Chat"}',
  'Editorial tecnologico',
  '{"Video scrub por mouse","Wordmark estratificado","Sintetizador Web Audio","Estudio de luz ambiente","Configurador de proyecto","Chat drawer interactivo"}',
  'creative',
  true,
  '/plantillas/gamer/'
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
