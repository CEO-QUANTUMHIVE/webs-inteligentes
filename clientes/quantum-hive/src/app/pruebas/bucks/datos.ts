// Contenido neutro de demostracion — marca ficticia "Artisan Flame Co."
// No reproduce textos, testimonios ni identidad comercial de la referencia.

export type Variante = {
  id: string;
  indice: string;
  nombre: string[];
  nota: string;
  precio: string;
  picante: number;
  base: string;
  acento: string;
  tapa: string;
  bloque: string;
  bloqueTexto: string;
  bloqueTextoSuave: string;
};

export const VARIANTES: Variante[] = [
  {
    id: "anana-brasa",
    indice: "01",
    nombre: ["Ananá", "Brasa"],
    nota: "Dulzor tropical al principio, brasa lenta al final.",
    precio: "$12,00",
    picante: 2,
    base: "#e0a53f",
    acento: "#c6431f",
    tapa: "#14100c",
    bloque: "#d1a13f",
    bloqueTexto: "#1b130c",
    bloqueTextoSuave: "rgba(27,19,12,0.62)",
  },
  {
    id: "habanero-ajo",
    indice: "02",
    nombre: ["Habanero", "Ajo"],
    nota: "Ajo asado y habanero franco. Calor que se queda.",
    precio: "$12,00",
    picante: 4,
    base: "#e07a35",
    acento: "#a13a17",
    tapa: "#14100c",
    bloque: "#d1652b",
    bloqueTexto: "#1b130c",
    bloqueTextoSuave: "rgba(27,19,12,0.62)",
  },
  {
    id: "cereza-roble",
    indice: "03",
    nombre: ["Cereza", "Roble"],
    nota: "Cereza ahumada sobre roble. Redonda y oscura.",
    precio: "$12,00",
    picante: 1,
    base: "#a5384a",
    acento: "#6e1f2c",
    tapa: "#14100c",
    bloque: "#ab3030",
    bloqueTexto: "#f3e6c8",
    bloqueTextoSuave: "rgba(243,230,200,0.66)",
  },
];

export type Calidad = {
  num: string;
  titulo: string;
  desc: string;
  icono: "tallo" | "gota" | "helice" | "espiga";
};

// Orden fiel a las 4 insignias reales: azucar/jarabe, aceites, aditivos, gluten.
export const CALIDAD: Calidad[] = [
  {
    num: "01",
    titulo: "Sin jarabe de maíz",
    desc: "Endulzado con fruta real y un toque de azúcar mascabo. El dulce de laboratorio se queda afuera.",
    icono: "tallo",
  },
  {
    num: "02",
    titulo: "Sin aceites de semilla",
    desc: "Solo aceite de oliva virgen. Si parece un proyecto de química, no entra en la botella.",
    icono: "gota",
  },
  {
    num: "03",
    titulo: "Sin aditivos",
    desc: "Sin conservantes ni ingredientes raros escondidos detrás de un nombre impronunciable.",
    icono: "helice",
  },
  {
    num: "04",
    titulo: "Sin gluten",
    desc: "Formulado y envasado sin trazas. Certificado en cada lote, sin excepción.",
    icono: "espiga",
  },
];

export const PASOS_NARRATIVA = [
  {
    indice: "01",
    titulo: "Lotes chicos",
    copy: "Cocinamos de a doscientas botellas porque a esa escala todavía se puede probar cada tanda y tirarla si no da. Producir más sería más fácil y peor.",
  },
  {
    indice: "02",
    titulo: "Ingredientes reales",
    copy: "Fruta fresca, especias enteras, vinagre de verdad. La lista de ingredientes entra en una línea y se entiende sin buscar nada en internet.",
  },
  {
    indice: "03",
    titulo: "¿Y esto?",
    copy: "Seis horas sobre roble antes de embotellar. El humo no se agrega al final: se construye desde el principio y por eso no se siente pegado.",
  },
];

export const PACKS = {
  tres: {
    id: "tres",
    etiqueta: "Pack x3",
    precio: "$32,00",
    tachado: "$36,00",
    ahorro: "Ahorrás 11%",
    incluye: [
      "Una botella de cada variante: Ananá Brasa, Habanero Ajo y Cereza Roble.",
      "Envío estándar sin cargo a todo el país.",
      "Ficha de maridaje impresa en papel de algodón.",
    ],
    unidades: 3,
  },
  seis: {
    id: "seis",
    etiqueta: "Pack x6",
    precio: "$58,00",
    tachado: "$72,00",
    ahorro: "Ahorrás 19%",
    incluye: [
      "Dos botellas de cada variante para la temporada completa.",
      "Envío express sin cargo con seguimiento.",
      "Ficha de maridaje y delantal de lona de regalo.",
      "Acceso anticipado a ediciones limitadas.",
    ],
    unidades: 6,
  },
} as const;

export const RESENAS = [
  {
    cita: "Reemplazó a todo lo demás en la parrilla",
    cuerpo:
      "La compré por curiosidad y terminé pidiendo el pack de seis a la semana siguiente. El ahumado es real, no es humo líquido.",
    autor: "Cocina de prueba",
    handle: "@prueba_demo",
  },
  {
    cita: "El equilibrio es lo que sorprende",
    cuerpo:
      "Dulce al principio y picante al final, pero nunca tapa la carne. Se nota que está pensada para acompañar y no para dominar.",
    autor: "Panel de cata",
    handle: "@panel_demo",
  },
  {
    cita: "La etiqueta no miente",
    cuerpo:
      "Cinco ingredientes, todos reconocibles. Es raro encontrar algo así en góndola sin pagar el triple.",
    autor: "Cliente frecuente",
    handle: "@cliente_demo",
  },
  {
    cita: "Funciona mucho más allá del asado",
    cuerpo:
      "La uso en sándwiches, en huevos y hasta en verduras al horno. Rinde muchísimo más de lo que esperaba.",
    autor: "Cocina doméstica",
    handle: "@casa_demo",
  },
  {
    cita: "El habanero pica con criterio",
    cuerpo:
      "Tiene calor de verdad pero te deja seguir comiendo. No es picante por deporte, está calibrado.",
    autor: "Club de picantes",
    handle: "@picante_demo",
  },
  {
    cita: "Buena hasta la última cucharada",
    cuerpo:
      "No se separa ni se pone rara con los días. La textura se mantiene igual desde que la abrís.",
    autor: "Reseña verificada",
    handle: "@verificada_demo",
  },
];

// IA de navegación fiel a la referencia: 5 links + acción de carrito separada.
export const NAV = [
  { id: "catalogo", texto: "Tienda" },
  { id: "packs", texto: "Mayorista" },
  { id: "historia", texto: "Nosotros" },
  { id: "resenas", texto: "Preguntas" },
  { id: "club", texto: "Contacto" },
];
