insert into plantillas
  (id, nombre, nicho, descripcion, paleta, fuentes, paginas, estilo,
   caracteristicas, vista_previa, popular, url_demo, publicado)
values (
  'quantum-studio',
  'QUANTUM STUDIO — Agencia creativa',
  'Branding / Agencia',
  'One-pager editorial de gran formato con narrativa de estudio, servicios interactivos, portfolio, planes y contacto.',
  '{"primario":"#f5f5f0","secundario":"#9c9c98","acento":"#b8ef42","fondo":"#040404"}'::jsonb,
  '{"familias":"Inter + Manrope"}'::jsonb,
  '{"Portada","Enfoque","Identidad","Marketing","Interacción","Portfolio","Planes","Contacto"}',
  'Editorial premium',
  '{"Hero cinematográfico","Proceso escalonado","Bloques numerados","Portfolio interactivo","Planes dinámicos","FAQ desplegable"}',
  'creative',
  false,
  '/plantillas/quantum-studio/',
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
