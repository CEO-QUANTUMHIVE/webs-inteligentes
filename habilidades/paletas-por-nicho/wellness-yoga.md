# Paleta: Wellness / Yoga

## Descripción
Colores serenos y espirituales para centros de yoga, spas, bienestar, meditación y salud holística.

## Paleta de Colores

### Primario: Púrpura Espiritual (#8b5cf6)
- **Uso**: Botones principales, CTAs, acentos
- **Psicología**: Espiritualidad, transformación, sabiduría
- **Contraste**: Perfecto sobre fondos oscuros

### Secundario: Púrpura Claro (#a78bfa)
- **Uso**: Headers, footers, acentos secundarios
- **Psicología**: Calma, suavidad, apertura
- **Complemento**: Complementa el púrpura primario

### Acento: Dorado Cálido (#f59e0b)
- **Uso**: Highlights, badges, elementos premium
- **Psicología**: Calidez, sabiduría, iluminación
- **Uso**: Para elementos importantes

### Fondo: Índigo Profundo (#1e1b4b)
- **Uso**: Background principal
- **Psicología**: Profundidad, meditación, serenidad
- **Alternativa**: #0f0326 (más oscuro)

### Texto: Blanco (#ffffff)
- **Uso**: Texto principal sobre fondos oscuros
- **Alternativa**: #faf5ff (blanco púrpura)

### Texto Secundario: Lila (#c4b5fd)
- **Uso**: Subtítulos, descripciones
- **Alternativa**: #ddd6fe

## Variables CSS

```css
:root {
  /* Wellness / Yoga */
  --primary: #8b5cf6;
  --primary-foreground: #ffffff;
  --secondary: #a78bfa;
  --secondary-foreground: #1e1b4b;
  --accent: #f59e0b;
  --accent-foreground: #1e1b4b;
  --background: #1e1b4b;
  --background-foreground: #ffffff;
  --foreground: #ffffff;
  --muted: #2e1065;
  --muted-foreground: #c4b5fd;
  --border: #2e1065;
  --ring: #8b5cf6;
}
```

## Tailwind Config

```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#a78bfa',
          foreground: '#1e1b4b',
        },
        accent: {
          DEFAULT: '#f59e0b',
          foreground: '#1e1b4b',
        },
        background: {
          DEFAULT: '#1e1b4b',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#2e1065',
          foreground: '#c4b5fd',
        },
      },
    },
  },
}
```

## Ejemplo de Uso

```tsx
// Hero Section
<section className="bg-background text-foreground py-20">
  <h1 className="text-5xl font-bold text-primary">Centro de Yoga Zen</h1>
  <p className="text-xl text-muted-foreground mt-4">
    Encuentra tu paz interior
  </p>
  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg mt-8">
    Reserva tu Clase
  </button>
</section>

// Card de Clase
<div className="bg-muted rounded-xl p-6 border border-border">
  <h3 className="text-xl font-semibold text-foreground">Yoga Vinyasa</h3>
  <p className="text-muted-foreground mt-2">
    Clase dinámica para todos los niveles
  </p>
  <p className="text-accent font-bold mt-2">$15.000/clase</p>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg mt-4">
    Reservar
  </button>
</section>

// Horarios
<div className="grid grid-cols-7 gap-2 mt-8">
  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(dia => (
    <div key={dia} className="text-center p-4 bg-muted rounded-lg">
      <p className="text-primary font-bold">{dia}</p>
      <p className="text-muted-foreground text-sm">7:00 - 21:00</p>
    </div>
  ))}
</div>
```

## Referencias Visuales

- **Fondos**: #1e1b4b, #0f0326, #2e1065
- **Acentos**: #8b5cf6, #a78bfa, #c4b5fd
- **Dorado**: #f59e0b, #fbbf24, #fcd34d
- **Texto**: #ffffff, #faf5ff, #f5f3ff
- **Borders**: #2e1065, #4c1d95

## Nichos Relacionados

- Centros de yoga
- Spas y wellness
- Estudios de meditación
- Retreats
- Masajes
- Acupuntura
- Ayurveda
- Coaching personal

## Imágenes Sugeridas

- **Hero**: Persona en postura de yoga, naturaleza
- **Ambiente**: Espacios zen, plantas
- **Clases**: Grupos practicando
- **Detalle**: Manos en mudra, velas
