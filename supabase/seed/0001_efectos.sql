-- Carga inicial del catalogo: los 25 efectos del frontend.
-- Generado desde catalogo-efectos/page.tsx. El campo codigo queda null:
-- se llena aparte, nunca se expone por la API publica.

delete from efectos where id = 'prueba-rls';

insert into efectos (id, nombre, descripcion, categoria, impacto, ideal_para, componente, es_nuevo)
values
  ('animated-rays', 'Rayos Animados', 'Rayos de aurora animados para hero sections', 'Fondos', 5, array['Hero','Tech','Startups']::text[], '@/components/ui/animated-rays', false),
  ('interactive-particles', 'Partículas Interactivas', 'Partículas GPU que siguen el cursor y reaccionan al mouse', 'Fondos', 5, array['Creativo','Portafolio','Agencia']::text[], '@/components/ui/interactive-particles', false),
  ('aurora-hero', 'Aurora Hero', 'Hero dinámico con vidrio esmerilado e interruptor interactivo', 'Fondos', 4, array['SaaS','Landing','Producto']::text[], '@/components/ui/aurora-hero', false),
  ('fluid-morph-bg', 'Fondo Morph Fluido', 'Animación orgánica de formas morphing fluidas', 'Fondos', 4, array['Elegante','Wellness','Spa']::text[], '@/components/ui/fluid-morph-bg', false),
  ('wave-grid-background', 'Grid de Olas', 'Grid 3D interactivo de cubos con ondas de cursor', 'Fondos', 5, array['Tech','Innovación','3D']::text[], '@/components/ui/wave-grid-background', false),
  ('perspective-grid', 'Grid Perspectiva', 'Efecto de fondo matrix con perspectiva 3D', 'Fondos', 3, array['Retro','Synthwave','Tech']::text[], '@/components/ui/perspective-grid', false),
  ('morph-text', 'Texto Morfológico', 'Efecto de rotación de palabras con blur-morph para headlines', 'Texto y Movimiento', 5, array['Hero','Headlines','Dinámico']::text[], '@/components/ui/morph-text', false),
  ('flip-text', 'Texto Volteado', 'Animación de texto con rotación 3D por carácter', 'Texto y Movimiento', 4, array['Headlines','Cuenta Regresiva','Moderno']::text[], '@/components/ui/flip-text', false),
  ('flip-fade-text', 'Texto Flip Fade', 'Ciclo de animación de volteo y desvanecimiento de palabras', 'Texto y Movimiento', 4, array['Elegante','Moda','Lifestyle']::text[], '@/components/ui/flip-fade-text', false),
  ('stagger-text', 'Texto Escalonado', 'Animación escalonada de revelado de letras o palabras', 'Texto y Movimiento', 3, array['Dramático','Cine','Eventos']::text[], '@/components/ui/stagger-text', false),
  ('ascii-glitch-ripple', 'Glitch ASCII Ripple', 'Efecto de onda de scramble de caracteres dinámicos al hacer hover', 'Texto y Movimiento', 4, array['Gaming','Cyberpunk','Hacker']::text[], '@/components/ui/ascii-glitch-ripple', false),
  ('glow-border-card', 'Tarjeta Borde Brillante', 'Tarjeta con efecto de borde glow rotativo animado', 'Layout y Tarjetas', 5, array['Features','Precios','Servicios']::text[], '@/components/ui/glow-border-card', false),
  ('agent-bento-grid', 'Grid Bento de Agentes', 'Layout grid de workspace multi-agente', 'Layout y Tarjetas', 4, array['Dashboard','Portafolio','Showcase']::text[], '@/components/ui/agent-bento-grid', false),
  ('cursor-card', 'Tarjeta Cursor', 'Link de texto inline con tarjeta de preview que sigue al cursor', 'Layout y Tarjetas', 5, array['Interactivo','Portafolio','Links']::text[], '@/components/ui/cursor-card', false),
  ('highlight-grid', 'Grid Highlight', 'Grid con highlight coloreado que se desliza detrás de la celda en hover', 'Layout y Tarjetas', 4, array['Features','Comparación','Lista']::text[], '@/components/ui/highlight-grid', true),
  ('spotlight-navbar', 'Navbar Spotlight', 'Navbar con efecto spotlight animado que sigue al cursor', 'Navegación', 5, array['Navegación','SaaS','Landing']::text[], '@/components/ui/spotlight-navbar', false),
  ('glass-dock', 'Dock de Vidrio', 'Dock flotante estilo Mac con glass morphism', 'Navegación', 4, array['Mobile','Navegación','Apps']::text[], '@/components/ui/glass-dock', false),
  ('mega-menu-navbar', 'Mega Menu Navbar', 'Navbar SaaS responsiva con dropdowns enriquecidos', 'Navegación', 4, array['Corporativo','SaaS','E-commerce']::text[], '@/components/ui/mega-menu-navbar', true),
  ('radial-glow-button', 'Botón Glow Radial', 'Botón con efecto hover de gradiente radial animado', 'Botones', 4, array['CTA','Conversión','Primario']::text[], '@/components/ui/radial-glow-button', false),
  ('animated-button', 'Botón Animado', 'Botón CTA con efecto de brillo al hacer hover', 'Botones', 3, array['Todos','Moderno','Limpio']::text[], '@/components/ui/animated-button', false),
  ('liquid-metal', 'Metal Líquido', 'Botón con efecto de shader fluido metálico', 'Botones', 4, array['Premium','Gaming','Lujo']::text[], '@/components/ui/liquid-metal', false),
  ('image-trail', 'Estela de Imagen', 'Efecto de estela de imagen que sigue al cursor', 'Interactivo', 5, array['Portafolio','Galería','Creativo']::text[], '@/components/ui/image-trail', false),
  ('perspective-carousel', 'Carrusel Perspectiva', 'Carrusel de imágenes 3D con resortes', 'Interactivo', 4, array['Productos','Galería','Showcase']::text[], '@/components/ui/perspective-carousel', false),
  ('magnetic-spotlight-marquee', 'Marquee Magnético Spotlight', 'Marquee interactivo a pantalla completa con spotlight de cursor', 'Interactivo', 4, array['Logos','Marcas','Features']::text[], '@/components/ui/magnetic-spotlight-marquee', false),
  ('logo-slider', 'Slider de Logos', 'Marquee infinito de logos con animación suave', 'Interactivo', 3, array['Clientes','Socios','Confianza']::text[], '@/components/ui/logo-slider', false)
on conflict (id) do update set
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  categoria = excluded.categoria,
  impacto = excluded.impacto,
  ideal_para = excluded.ideal_para,
  componente = excluded.componente,
  es_nuevo = excluded.es_nuevo;

-- magnetic-spotlight-marquee no tiene componente real: su entrada del
-- registro de Vengeance UI devuelve 404.
update efectos set componente = null where id = 'magnetic-spotlight-marquee';
