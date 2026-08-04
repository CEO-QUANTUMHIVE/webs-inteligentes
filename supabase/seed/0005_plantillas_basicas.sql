-- ============================================================================
-- Memoria: catálogo de plantillas básicas (8 nichos)
--
-- Requiere service_role (la tabla `memorias` tiene RLS sin policy de
-- escritura para `anon`). No se pudo correr en la sesión que construyó las
-- plantillas porque solo estaba disponible NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
-- Correr manualmente desde el SQL Editor de Supabase o con la service key.
-- ============================================================================

insert into memorias (contenido, tipo, ambito, agente_id, etiquetas, importancia)
values (
  $$Se construyeron 8 plantillas básicas del catálogo (una por nicho), navegables en
producción bajo /catalogo/plantillas/basicas/<id>:

1. gastronomia — "Ceniza — Parrilla & Bodegón" (Playfair Display + Karla, paleta
   oficial de gastronomia.md)
2. barberia — "La Navaja — Barbería Clásica" (Bebas Neue + Inter, paleta oficial
   de barberias.md — la herramienta ui-ux-pro-max sugería rosa/lavanda de spa,
   se descartó por sesgo de nicho)
3. servicios-pro — "Andrade & Vega — Consultoría Legal y de Negocios"
   (Poppins + Open Sans, paleta oficial de servicios-profesionales.md)
4. wellness — "Prana — Centro de Yoga y Bienestar" (Lora + Raleway, paleta
   oficial de wellness-yoga.md, estilo orgánico con esquinas muy redondeadas)
5. retail — "Aurora Store — Moda y Accesorios" (Rubik + Nunito Sans, paleta
   oficial de retail-moderno.md)
6. educacion — "Nexo — Academia Online" (Manrope + Inter — se descartó la
   sugerencia de ui-ux-pro-max de Baloo 2 / Comic Neue / Claymorphism por
   estar orientada a apps infantiles, no a una academia de adultos)
7. salud — "Vitta — Centro de Salud Integral" (Figtree + Noto Sans). Paleta
   NUEVA creada en habilidades/paletas-por-nicho/salud.md con contrastes
   calculados (fórmula de luminancia relativa WCAG). Se descartó el estilo
   Neumorphism que sugería la herramienta por su propia advertencia de bajo
   contraste.
8. inmobiliaria — "Merídian — Propiedades" (Cinzel + Josefin Sans). Paleta
   NUEVA creada en habilidades/paletas-por-nicho/inmobiliaria.md, también con
   contrastes calculados (un primer intento de color de borde no llegaba al
   mínimo 3:1 y se ajustó).

Cada plantilla: build verde, sin errores de consola, sin desborde horizontal en
360×640, contraste WCAG AA verificado, capturas de pantalla revisadas con
Playwright antes de dar por buena la QA.

Error encontrado y corregido: usar la entidad HTML &amp; en texto JSX (React 19 /
Next 16) hace que el compilador se coma el espacio en blanco que la precede al
renderizar ("2026Andrade" en vez de "2026 Andrade"). Se verificó comparando el
HTML generado entre plantillas. Solución: usar el carácter & literal, nunca la
entidad, en todas las plantillas siguientes.

Se agregó una sección "Básicas — una por rubro" a la página /catalogo-plantillas
ya existente (no se duplicó la página), leyendo catalogo/plantillas/basicas/
indice.json vía fs.readFileSync en build time — sin depender de Supabase para
mostrar estas 8, a diferencia de las plantillas "premium" que sí leen de la
tabla `plantillas`.

Deploy verificado en producción: https://websinteligentes.quantumhive.com.ar/
catalogo-plantillas y las 8 rutas individuales responden 200, sin errores de
consola.

Fecha: 2026-08-04. Commits: 22688ca (gastronomia), 872ace5 (barberia), fab4eaa
(servicios-pro), f84b48f (wellness), f4d29a7 (retail), 0974670 (educacion),
72193e1 (salud + paleta), c2be8a0 (inmobiliaria + paleta), 3f2d313 (indice +
página).$$,
  'project',
  'web-factory',
  'claude-catalogo-plantillas-basicas',
  array['catalogo', 'plantillas', 'plantillas-basicas', 'diseno', 'deploy'],
  0.8
);
