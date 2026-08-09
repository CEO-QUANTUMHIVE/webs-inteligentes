import type { CSSProperties } from "react";
import type { Variante } from "./datos";

// Botella vectorial propia y parametrica. Sustituye los renders propietarios
// registrados en SOLICITUD_ASSETS.json. Sin assets externos ni descargas.

type BotellaProps = {
  variante: Variante;
  dorso?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Botella({ variante, dorso = false, className, style }: BotellaProps) {
  const { base, acento, tapa, nombre, indice, picante } = variante;
  const idGrad = `g-${variante.id}${dorso ? "-b" : ""}`;
  const idVidrio = `v-${variante.id}${dorso ? "-b" : ""}`;

  return (
    <svg
      viewBox="0 0 200 420"
      className={className}
      style={style}
      role="img"
      aria-label={`Botella ${nombre.join(" ")}${dorso ? " — dorso" : ""}`}
    >
      <defs>
        <linearGradient id={idGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={base} />
          <stop offset="65%" stopColor={acento} />
          <stop offset="100%" stopColor={tapa} />
        </linearGradient>
        <linearGradient id={idVidrio} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
          <stop offset="26%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="74%" stopColor="rgba(0,0,0,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.28)" />
        </linearGradient>
      </defs>

      {/* sombra de apoyo */}
      <ellipse cx="100" cy="404" rx="52" ry="9" fill="rgba(20,16,12,0.16)" />

      {/* cuerpo */}
      <path
        d="M72 96c0-10 6-14 6-26V50h44v20c0 12 6 16 6 26 14 16 20 36 20 60v168c0 20-10 30-30 30H82c-20 0-30-10-30-30V182c0-24 6-44 20-86z"
        fill={`url(#${idGrad})`}
      />
      <path
        d="M72 96c0-10 6-14 6-26V50h44v20c0 12 6 16 6 26 14 16 20 36 20 60v168c0 20-10 30-30 30H82c-20 0-30-10-30-30V182c0-24 6-44 20-86z"
        fill={`url(#${idVidrio})`}
      />

      {/* cuello y tapa */}
      <rect x="76" y="26" width="48" height="26" rx="6" fill={tapa} />
      <rect x="72" y="20" width="56" height="12" rx="6" fill={tapa} />
      <rect x="78" y="30" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />

      {dorso ? (
        <>
          {/* dorso: tabla nutricional simplificada */}
          <rect x="66" y="150" width="68" height="150" rx="5" fill="#f4ede2" opacity="0.95" />
          <text
            x="100"
            y="170"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#14100c"
            letterSpacing="1.4"
          >
            INGREDIENTES
          </text>
          <line x1="74" y1="177" x2="126" y2="177" stroke="#14100c" strokeWidth="1" opacity="0.3" />
          {["Fruta real", "Vinagre", "Especias", "Oliva virgen", "Sal marina"].map((t, i) => (
            <text key={t} x="76" y={192 + i * 15} fontSize="8" fill="#14100c" opacity="0.72">
              {t}
            </text>
          ))}
          <line x1="74" y1="272" x2="126" y2="272" stroke="#14100c" strokeWidth="1" opacity="0.3" />
          <text x="100" y="287" textAnchor="middle" fontSize="7" fill="#14100c" opacity="0.55" letterSpacing="1">
            SIN GLUTEN · 250 ML
          </text>
        </>
      ) : (
        <>
          {/* frente: etiqueta */}
          <rect x="66" y="164" width="68" height="118" rx="5" fill="#f4ede2" opacity="0.95" />
          <text
            x="100"
            y="186"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill={acento}
            letterSpacing="2"
          >
            N°{indice}
          </text>
          {nombre.map((linea, i) => (
            <text
              key={linea}
              x="100"
              y={208 + i * 17}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#14100c"
              letterSpacing="-0.4"
            >
              {linea.toUpperCase()}
            </text>
          ))}
          <line
            x1="78"
            y1={216 + nombre.length * 17}
            x2="122"
            y2={216 + nombre.length * 17}
            stroke="#14100c"
            strokeWidth="1"
            opacity="0.25"
          />
          <text
            x="100"
            y={233 + nombre.length * 17}
            textAnchor="middle"
            fontSize="6.5"
            fill="#14100c"
            opacity="0.55"
            letterSpacing="1.6"
          >
            ARTISAN FLAME CO.
          </text>
          {/* escala de picante */}
          <g transform={`translate(${100 - (picante * 9) / 2}, ${244 + nombre.length * 17})`}>
            {Array.from({ length: picante }).map((_, i) => (
              <circle key={i} cx={i * 9 + 3} cy="0" r="2.6" fill={acento} />
            ))}
          </g>
        </>
      )}

      {/* brillo vertical */}
      <path
        d="M78 120c-6 24-8 44-8 62v150"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ---------------- Ingredientes flotantes (parallax) ----------------
   Siluetas vectoriales propias, sin fotografia. Sustituyen los recortes
   fotograficos de fruta de la referencia (tomate, aji, cereza, citrico).
   Aceptan cualquier atributo SVG estandar (incluido data-hoja, usado por
   el parallax) via el spread de rest props. */

type IngredienteProps = Omit<React.SVGProps<SVGSVGElement>, "viewBox">;

export function Tomate({ className, style, ...resto }: IngredienteProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" {...resto}>
      <circle cx="50" cy="58" r="34" fill="#c8552c" />
      <circle cx="50" cy="58" r="34" fill="url(#tomate-luz)" opacity="0.5" />
      <path
        d="M50 26c3-7 3-13-1-18M50 26c-3-7-3-13 1-18M50 26c6-4 12-4 17 1M50 26c-6-4-12-4-17 1"
        stroke="#5c7a3a"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="50" cy="24" rx="9" ry="5" fill="#6f8f45" />
      <defs>
        <radialGradient id="tomate-luz" cx="0.34" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Aji({
  tono = "#c6431f",
  className,
  style,
  ...resto
}: IngredienteProps & { tono?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" {...resto}>
      <path
        d="M62 14c6 2 10 8 8 14-10 2-16-2-20-8 3-4 7-6 12-6z"
        fill="#4a5233"
      />
      <path
        d="M58 22c14 6 22 20 20 36-2 18-16 30-30 28-12-2-20-14-18-28 3-20 12-30 28-36z"
        fill={tono}
      />
      <path
        d="M58 22c14 6 22 20 20 36-2 18-16 30-30 28"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RamaCereza({ className, style, ...resto }: IngredienteProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" {...resto}>
      <path d="M40 10c4 14 8 24 10 34M40 10c10 8 18 14 24 26" stroke="#5c7a3a" strokeWidth="2.6" fill="none" />
      <path d="M64 16c6-4 12-4 17 0-3 6-9 8-15 6z" fill="#6f8f45" />
      <circle cx="34" cy="66" r="20" fill="#8f1f2c" />
      <circle cx="34" cy="66" r="20" fill="url(#cereza-luz)" opacity="0.6" />
      <circle cx="62" cy="72" r="20" fill="#a5283a" />
      <circle cx="62" cy="72" r="20" fill="url(#cereza-luz)" opacity="0.6" />
      <defs>
        <radialGradient id="cereza-luz" cx="0.32" cy="0.28" r="0.65">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function GajoCitrico({
  tono = "#e0932f",
  className,
  style,
  ...resto
}: IngredienteProps & { tono?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" {...resto}>
      <path d="M8 62A42 42 0 0 1 92 62z" fill={tono} />
      <path d="M8 62A42 42 0 0 1 92 62z" fill="none" stroke="#f4ede2" strokeWidth="5" />
      {[18, 32, 46, 60, 74, 88].map((x, i) => (
        <path
          key={x}
          d={`M50 62 L${x} 60`}
          stroke="rgba(244,237,226,0.55)"
          strokeWidth="1.4"
          opacity={0.5 + (i % 2) * 0.2}
        />
      ))}
    </svg>
  );
}

/* ---------------- Iconos de insignia (circulo + trazo + tachado) ----------------
   Estilo lineal propio equivalente al de la referencia (icono simple + slash). */

type IconoProps = { className?: string };

function Marco({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="1.3" />
      {children}
      <line x1="14" y1="50" x2="50" y2="14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function IconoTallo({ className }: IconoProps) {
  return (
    <span className={className}>
      <Marco>
        <path
          d="M32 42V24M32 24c-6 0-9-4-9-9 5 0 9 3 9 9zM32 24c6 0 9-4 9-9-5 0-9 3-9 9z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </Marco>
    </span>
  );
}

export function IconoGota({ className }: IconoProps) {
  return (
    <span className={className}>
      <Marco>
        <path
          d="M32 18c6 8 10 14 10 20a10 10 0 0 1-20 0c0-6 4-12 10-20z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </Marco>
    </span>
  );
}

export function IconoHelice({ className }: IconoProps) {
  return (
    <span className={className}>
      <Marco>
        <path
          d="M25 17c0 12 14 18 14 30M39 17c0 12-14 18-14 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M26 24h12M26 32h12M26 40h12" stroke="currentColor" strokeWidth="1.2" />
      </Marco>
    </span>
  );
}

export function IconoEspiga({ className }: IconoProps) {
  return (
    <span className={className}>
      <Marco>
        <path d="M32 46V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        {[22, 27, 32, 37].map((y) => (
          <path
            key={y}
            d={`M32 ${y}c-5-2-8-1-10 2 3 2 7 2 10-1zM32 ${y}c5-2 8-1 10 2-3 2-7 2-10-1z`}
            fill="currentColor"
            opacity="0.9"
          />
        ))}
      </Marco>
    </span>
  );
}

const ICONOS_CALIDAD = {
  tallo: IconoTallo,
  gota: IconoGota,
  helice: IconoHelice,
  espiga: IconoEspiga,
} as const;

export function IconoCalidad({
  tipo,
  className,
}: {
  tipo: keyof typeof ICONOS_CALIDAD;
  className?: string;
}) {
  const Cmp = ICONOS_CALIDAD[tipo];
  return <Cmp className={className} />;
}
