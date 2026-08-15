export interface PlantillaReal {
  id: string;
  nombre: string;
  rubroId: string;
  rubroNombre: string;
  variante: string;
  subtitulo: string;
  descripcion: string;
  urlPath: string;
  imagen: string;
  badge: "Básica" | "Pro" | "Premium IX2" | "GSAP Motion";
  colorAcento: string;
  servicios: string[];
  efectosPredeterminados: string[];
}

export interface Rubro {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  count: number;
}

export const RUBROS_DISPONIBLES: Rubro[] = [
  { id: "todos", nombre: "Todos", icono: "✦", descripcion: "Catálogo completo de la Fábrica Web", count: 66 },
  { id: "barberia", nombre: "Barbería", icono: "✂️", descripcion: "Reserva de turnos y estética masculina", count: 7 },
  { id: "gastronomia", nombre: "Gastronomía", icono: "🍽️", descripcion: "Restaurantes, cartas digitales y reservas", count: 8 },
  { id: "inmobiliaria", nombre: "Inmobiliaria", icono: "🏢", descripcion: "Propiedades, catálogo e inversión", count: 7 },
  { id: "retail", nombre: "Retail", icono: "🛍️", descripcion: "E-commerce y tiendas locales", count: 7 },
  { id: "salud", nombre: "Salud", icono: "🩺", descripcion: "Clínicas, médicos y turnos online", count: 7 },
  { id: "servicios-pro", nombre: "Servicios Pro", icono: "💼", descripcion: "Consultoría, abogados y contadores", count: 7 },
  { id: "wellness", nombre: "Wellness & Estética", icono: "🌿", descripcion: "Spas, centros de belleza y relajación", count: 7 },
  { id: "educacion", nombre: "Educación", icono: "🎓", descripcion: "Academias, cursos e institutos", count: 7 },
  { id: "tech", nombre: "Ciberseguridad & Tech", icono: "🛡️", descripcion: "B2B SaaS y empresas tecnológicas", count: 1 },
  { id: "lujo", nombre: "Lujo & Arquitectura", icono: "🏛️", descripcion: "Arquitectura, arte y marcas premium", count: 1 },
];

export const PLANTILLAS_REALES_CATALOGO: PlantillaReal[] = [
  // LUXORA (Lujo)
  {
    id: "lujo-luxora",
    nombre: "Luxora Architecture",
    rubroId: "lujo",
    rubroNombre: "Lujo & Arquitectura",
    variante: "Premium IX2",
    subtitulo: "Experiencias digitales de alta gama y diseño arquitectónico",
    descripcion: "Layout visual oscuro con espacios generosos, tipografía refinada y micro-interacciones de elegancia.",
    urlPath: "/catalogo/plantillas/basicas/inmobiliaria/p7",
    imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "Premium IX2",
    colorAcento: "from-amber-400 to-yellow-600",
    servicios: ["Diseño Arquitectónico", "Desarrollos VIP", "Branding Exclusivo"],
    efectosPredeterminados: ["Glow", "Tilt 3D", "Fade Up"]
  },
  // QUANTRA SECURITY (Tech)
  {
    id: "tech-quantra",
    nombre: "Quantra Security",
    rubroId: "tech",
    rubroNombre: "Ciberseguridad & Tech",
    variante: "High Tech B2B",
    subtitulo: "Plataforma B2B de Ciberdefensa e Inteligencia Artificial",
    descripcion: "Estructura corporativa de alta densidad con visualizaciones de datos y métricas de seguridad en tiempo real.",
    urlPath: "/catalogo/plantillas/basicas/servicios-pro/p8",
    imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    badge: "GSAP Motion",
    colorAcento: "from-cyan-400 to-blue-600",
    servicios: ["Defensa IA Cloud", "Auditoría de Vulnerabilidades", "SOC 24/7"],
    efectosPredeterminados: ["Particles", "Luz Neón", "IX2 Diff"]
  },
  // BARBERÍA
  {
    id: "barberia-p3",
    nombre: "Barbería P3 VIP",
    rubroId: "barberia",
    rubroNombre: "Barbería",
    variante: "P3 Waterfall",
    subtitulo: "Estudio de Barbería con Agendamiento de Turnos 24/7",
    descripcion: "Especialmente optimizada para barberías locales con reserva de citas directa e integración a WhatsApp.",
    urlPath: "/catalogo/plantillas/basicas/barberia/p3",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    badge: "Pro",
    colorAcento: "from-emerald-400 to-teal-600",
    servicios: ["Corte Ejecutivo & Barba", "Tratamiento Facial", "Turnos Online"],
    efectosPredeterminados: ["Glow", "Odómetro", "Tag Reveal"]
  },
  {
    id: "barberia-p2",
    nombre: "Barbería P2 Classic",
    rubroId: "barberia",
    rubroNombre: "Barbería",
    variante: "P2 Grid",
    subtitulo: "Estética clásica y moderna para salones masculinos",
    descripcion: "Showcase de servicios con tarifa plana y botón directo de llamada.",
    urlPath: "/catalogo/plantillas/basicas/barberia/p2",
    imagen: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80",
    badge: "Básica",
    colorAcento: "from-amber-500 to-yellow-600",
    servicios: ["Perfilado de Barba", "Corte Urbano", "Productos Premium"],
    efectosPredeterminados: ["Fade Up"]
  },
  {
    id: "barberia-p5",
    nombre: "Barbería P5 Urban",
    rubroId: "barberia",
    rubroNombre: "Barbería",
    variante: "P5 Dark",
    subtitulo: "Barbería urbana con reservas inmediatas",
    descripcion: "Estilo nocturno oscuro con neón dorado y mapa de ubicación.",
    urlPath: "/catalogo/plantillas/basicas/barberia/p5",
    imagen: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80",
    badge: "Pro",
    colorAcento: "from-amber-400 to-orange-500",
    servicios: ["Corte & Combo", "Ritual de Toalla Caliente", "Agente Turnos"],
    efectosPredeterminados: ["Glow", "Tag Reveal"]
  },
  // GASTRONOMÍA
  {
    id: "gastro-p3",
    nombre: "Gastro Gourmet P3",
    rubroId: "gastronomia",
    rubroNombre: "Gastronomía",
    variante: "P3 Bistro",
    subtitulo: "Restaurante Gourmet con Menú Digital e Reservas",
    descripcion: "Diseño apetitoso con catálogo de platos, cartas interactivas y reservas de mesa instantáneas.",
    urlPath: "/catalogo/plantillas/basicas/gastronomia/p3",
    imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    badge: "Pro",
    colorAcento: "from-orange-400 to-red-600",
    servicios: ["Menú Gourmet", "Reservas VIP", "Eventos Privados"],
    efectosPredeterminados: ["Marquee", "Fade Up"]
  },
  {
    id: "gastro-p2",
    nombre: "RestoBar & Cocktails P2",
    rubroId: "gastronomia",
    rubroNombre: "Gastronomía",
    variante: "P2 Lounge",
    subtitulo: "Experiencia nocturna para bares y coctelerías",
    descripcion: "Layout con fotos full-bleed, carta de tragos y música en vivo.",
    urlPath: "/catalogo/plantillas/basicas/gastronomia/p2",
    imagen: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    badge: "Básica",
    colorAcento: "from-purple-400 to-pink-600",
    servicios: ["Tragos de Autor", "Happy Hour", "Reserva de Mesas"],
    efectosPredeterminados: ["Particles"]
  },
  // INMOBILIARIA
  {
    id: "inmo-p3",
    nombre: "Inmobiliaria Prime P3",
    rubroId: "inmobiliaria",
    rubroNombre: "Inmobiliaria",
    variante: "P3 Realty",
    subtitulo: "Catálogo de Propiedades y Desarrollos Urbanos",
    descripcion: "Ficha de propiedades con buscador por zona, recorrido 3D e interés de compra.",
    urlPath: "/catalogo/plantillas/basicas/inmobiliaria/p3",
    imagen: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    badge: "Pro",
    colorAcento: "from-blue-400 to-indigo-600",
    servicios: ["Venta de Departamentos", "Alquileres VIP", "Tasaciones"],
    efectosPredeterminados: ["Tilt 3D", "Odómetro"]
  },
  // SALUD
  {
    id: "salud-p3",
    nombre: "Clínica & Salud P3",
    rubroId: "salud",
    rubroNombre: "Salud",
    variante: "P3 MediCare",
    subtitulo: "Centro Médico Integral y Turnos de Especialistas",
    descripcion: "Diseño limpio y confiable con agenda de médicos, especialidades y consultas por WhatsApp.",
    urlPath: "/catalogo/plantillas/basicas/salud/p3",
    imagen: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    badge: "Básica",
    colorAcento: "from-cyan-400 to-teal-500",
    servicios: ["Consultas Médicas", "Estudios Laboratorio", "Turnero Digital"],
    efectosPredeterminados: ["Fade Up"]
  },
  // WELLNESS
  {
    id: "wellness-p3",
    nombre: "Aura Spa & Wellness P3",
    rubroId: "wellness",
    rubroNombre: "Wellness & Estética",
    variante: "P3 Sanctuary",
    subtitulo: "Centro de Estética, Masajes y Tratamientos Holísticos",
    descripcion: "Ambiente sereno y elegante con reservación de días de spa y paquetes de belleza.",
    urlPath: "/catalogo/plantillas/basicas/wellness/p3",
    imagen: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    badge: "Pro",
    colorAcento: "from-emerald-400 to-lime-500",
    servicios: ["Masajes Relajantes", "Tratamiento Facial Spa", "Circuito Hidro"],
    efectosPredeterminados: ["Fluid Morph", "Glow"]
  },
  // SERVICIOS PRO
  {
    id: "servicios-p3",
    nombre: "Estudio Contable & Legal P3",
    rubroId: "servicios-pro",
    rubroNombre: "Servicios Pro",
    variante: "P3 Corporate",
    subtitulo: "Asesoría Profesional y Asistente Legal Inteligente",
    descripcion: "Sitio institucional de alta confianza para firmas de abogados, consultores y contadores.",
    urlPath: "/catalogo/plantillas/basicas/servicios-pro/p3",
    imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    badge: "Básica",
    colorAcento: "from-slate-300 to-blue-500",
    servicios: ["Consultoría Impositiva", "Defensa Legal B2B", "Auditorías"],
    efectosPredeterminados: ["Tag Reveal"]
  },
  // RETAIL
  {
    id: "retail-p3",
    nombre: "Boutique & E-Commerce P3",
    rubroId: "retail",
    rubroNombre: "Retail",
    variante: "P3 Store",
    subtitulo: "Tienda de Ropa y Accesorios con Catálogo Directo",
    descripcion: "Showcase de productos con imágenes destacadas y pedidos vía WhatsApp.",
    urlPath: "/catalogo/plantillas/basicas/retail/p3",
    imagen: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    badge: "Pro",
    colorAcento: "from-purple-400 to-pink-500",
    servicios: ["Colección Verano", "Envíos a Domicilio", "Atención WhatsApp"],
    efectosPredeterminados: ["Tilt 3D", "Marquee"]
  },
  // EDUCACIÓN
  {
    id: "edu-p3",
    nombre: "Instituto & Cursos P3",
    rubroId: "educacion",
    rubroNombre: "Educación",
    variante: "P3 Academy",
    subtitulo: "Plataforma de Cursos y Capacitación Profesional",
    descripcion: "Catálogo de carreras y cursos cortos con inscripción asistida por IA.",
    urlPath: "/catalogo/plantillas/basicas/educacion/p3",
    imagen: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    badge: "Básica",
    colorAcento: "from-indigo-400 to-cyan-500",
    servicios: ["Diplomaturas Online", "Clases En Vivo", "Certificación Pro"],
    efectosPredeterminados: ["Fade Up"]
  }
];
