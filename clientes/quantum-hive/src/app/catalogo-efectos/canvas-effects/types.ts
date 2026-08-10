export interface CursorEffectProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  speed?: number;
  intensity?: number;
  className?: string;
}

export const DEFAULTS = {
  color: "#00e5ff",
  secondaryColor: "#b14aed",
  size: 1,
  speed: 1,
  intensity: 1,
} as const;
