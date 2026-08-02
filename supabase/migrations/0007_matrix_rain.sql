insert into efectos
  (id, nombre, descripcion, categoria, impacto, ideal_para, componente,
   origen, es_nuevo, publicado)
values (
  'matrix-rain',
  'Lluvia Matrix',
  'Lluvia animada de caracteres japoneses y alfanuméricos con brillo verde',
  'Fondos',
  4,
  array['Gaming','Cyberpunk','Tech']::text[],
  '@/components/ui/matrix-rain',
  'adaptado',
  true,
  true
)
on conflict (id) do update set
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  categoria = excluded.categoria,
  impacto = excluded.impacto,
  ideal_para = excluded.ideal_para,
  componente = excluded.componente,
  origen = excluded.origen,
  es_nuevo = excluded.es_nuevo,
  publicado = excluded.publicado,
  actualizado_en = now();
