/**
 * Configuración de slots para efectos de cursor.
 * Cada web puede tener múltiples slots donde se asignan efectos.
 *
 * Slots disponibles:
 * - "global": Se ejecuta en toda la página (el más común)
 * - "hero": Solo en la sección hero
 * - "section:{id}": En una sección específica (ej: "section:servicios")
 * - "click": Solo se activa con click
 * - "scroll": Se activa al hacer scroll
 */

export interface EfectoSlot {
  /** ID del efecto del catálogo (ej: "cursor-trail", "magnetic-cursor") */
  efectoId: string;
  /** Slot donde se renderiza */
  slot: "global" | "hero" | `section:${string}` | "click" | "scroll";
  /** Props personalizadas del efecto */
  props?: {
    color?: string;
    secondaryColor?: string;
    size?: number;
    speed?: number;
    intensity?: number;
  };
  /** Si está activo (el cliente puede activar/desactivar) */
  activo?: boolean;
}

export interface ConfigEfectos {
  /** Nombre del cliente/proyecto */
  cliente: string;
  /** Lista de efectos asignados a slots */
  slots: EfectoSlot[];
  /** Si los efectos están habilitados globalmente */
  habilitado?: boolean;
}

/**
 * Ejemplo de configuración para QuantumHive.
 * El agente modifica esto según el nicho del cliente.
 */
export const EJEMPLO_CONFIG: ConfigEfectos = {
  cliente: "Quantum Hive",
  habilitado: true,
  slots: [
    {
      efectoId: "cursor-trail",
      slot: "global",
      props: { color: "#00d4ff", speed: 1, intensity: 1 },
      activo: true,
    },
    {
      efectoId: "magnetic-cursor",
      slot: "hero",
      props: { color: "#00d4ff", size: 1 },
      activo: true,
    },
    {
      efectoId: "ripple-click",
      slot: "click",
      props: { color: "#00d4ff", size: 1.2 },
      activo: false,
    },
  ],
};
