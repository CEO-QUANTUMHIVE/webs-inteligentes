# Paleta: Gastronomía

## Descripción
Colores cálidos y acogedores para restaurantes, cafeterías, pizzerías, bares y negocios de comida.

## Paleta de Colores

### Primario: Naranja Cálido (#ff6b35)
- **Uso**: Botones principales, CTAs, acentos
- **Psicología**: Estimula el apetito, crea urgencia, energía
- **Contraste**: Perfecto sobre fondos oscuros

### Secundario: Azul Profundo (#004e89)
- **Uso**: Headers, footers, textos secundarios
- **Psicología**: Confianza, profesionalismo, estabilidad
- **Combinación**: Complementa el naranja

### Acento: Dorado (#ffd166)
- **Uso**: Highlights, badges, elementos premium
- **Psicología**: Calidez, calidad, lujo accesible
- **Uso**: Solo para elementos importantes

### Fondo: Oscuro Elegante (#1a1a2e)
- **Uso**: Background principal
- **Psicología**: Elegancia, modernidad, sofisticación
- **Alternativa**: #0f0f23 (más oscuro)

### Texto: Blanco (#ffffff)
- **Uso**: Texto principal sobre fondos oscuros
- **Alternativa**: #f8f9fa (blanco suave)

### Texto Secundario: Gris Claro (#a0aec0)
- **Uso**: Subtítulos, descripciones
- **Alternativa**: #cbd5e0

## Variables CSS

```css
:root {
  /* Gastronomía */
  --primary: #ff6b35;
  --primary-foreground: #ffffff;
  --secondary: #004e89;
  --secondary-foreground: #ffffff;
  --accent: #ffd166;
  --accent-foreground: #1a1a2e;
  --background: #1a1a2e;
  --background-foreground: #ffffff;
  --foreground: #ffffff;
  --muted: #2d2d44;
  --muted-foreground: #a0aec0;
  --border: #2d2d44;
  --ring: #ff6b35;
}
```

## Tailwind Config

```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6b35',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#004e89',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#ffd166',
          foreground: '#1a1a2e',
        },
        background: {
          DEFAULT: '#1a1a2e',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#2d2d44',
          foreground: '#a0aec0',
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
  <h1 className="text-5xl font-bold text-primary">Café Aroma</h1>
  <p className="text-xl text-muted-foreground mt-4">
    El mejor café de la ciudad
  </p>
  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg mt-8">
    Ver Menú
  </button>
</section>

// Card de Plato
<div className="bg-muted rounded-xl p-6 border border-border">
  <h3 className="text-xl font-semibold text-foreground">Pizza Margherita</h3>
  <p className="text-accent font-bold mt-2">$12.000</p>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg mt-4">
    Agregar
  </button>
</div>
```

## Referencias Visuales

- **Fondos**: #1a1a2e, #0f0f23, #16213e
- **Acentos**: #ff6b35, #ff9f43, #ffd166
- **Texto**: #ffffff, #f8f9fa, #e2e8f0
- **Borders**: #2d2d44, #4a5568

## Nichos Relacionados

- Restaurantes
- Cafeterías
- Pizzerías
- Bares y pubs
- Food trucks
- Catering
- Repostería
- Heladerías

## Imágenes Sugeridas

- **Hero**: Plato principal, ambiente del restaurante
- **About**: Chef, equipo, cocina
- **Menú**: Platos con buena iluminación
- **Interior**: Ambiente acogedor
