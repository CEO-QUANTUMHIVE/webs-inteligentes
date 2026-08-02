-- Plantilla de cocteleria. Replica el sistema de diseno de una referencia
-- (negro + un solo dorado, display italica + cuerpo neutro, carta anclada
-- al scroll) con fuentes libres y contenido propio: la referencia usaba una
-- fuente "Demo" de uso personal y sus propias fotos y textos.
insert into plantillas
  (id, nombre, nicho, descripcion, paleta, fuentes, paginas, estilo,
   caracteristicas, vista_previa, popular, url_demo)
values (
  'nocturno-cocteleria',
  'NOCTURNO — Coctelería de autor',
  'Gastronomía / Bares',
  'One-pager oscuro y elegante para bares de autor. Título con entrada carácter por carácter, cartas de tragos escalonadas y una carta rotativa anclada al scroll. Un solo acento dorado sobre negro.',
  '{"primario":"#e7d393","secundario":"#b9a46c","acento":"#ffffff","fondo":"#000000"}'::jsonb,
  '{"familias":"Playfair Display + Inter"}'::jsonb,
  '{"Portada","Cartas","El oficio","La carta","Visitanos"}',
  'Elegante',
  '{"Título carácter por carácter","Carta anclada al scroll","Navegación por trago","Grano sutil","Nav que se solidifica","Contraste 14:1 verificado"}',
  'dark',
  true,
  '/plantillas/nocturno/'
)
on conflict (id) do update set
  nombre=excluded.nombre, nicho=excluded.nicho, descripcion=excluded.descripcion,
  paleta=excluded.paleta, fuentes=excluded.fuentes, paginas=excluded.paginas,
  estilo=excluded.estilo, caracteristicas=excluded.caracteristicas,
  vista_previa=excluded.vista_previa, popular=excluded.popular, url_demo=excluded.url_demo;
