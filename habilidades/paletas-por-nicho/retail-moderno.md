# Paleta: Retail Moderno

## Descripción
Colores vibrantes y modernos para tiendas de ropa, accesorios, gadgets y productos de consumo.

## Paleta de Colores

### Primario: Rosa Moderno (#ec4899)
- **Uso**: Botones principales, CTAs, acentos
- **Psicología**: Modernidad, diversión, juvenil
- **Contraste**: Perfecto sobre fondos oscuros

### Secundario: Púrpura (#8b5cf6)
- **Uso**: Headers, footers, acentos secundarios
- **Psicología**: Creatividad, lujo accesible
- **Complemento**: Complementa el rosa

### Acento: Cyan (#06b6d4)
- **Uso**: Highlights, badges, elementos especiales
- **Psicología**: Frescura, innovación, tech
- **Uso**: Para elementos tech o fresh

### Fondo: Zinc Oscuro (#18181b)
- **Uso**: Background principal
- **Psicología**: Modernidad, elegancia, minimalismo
- **Alternativa**: #09090b (más oscuro)

### Texto: Blanco (#ffffff)
- **Uso**: Texto principal sobre fondos oscuros
- **Alternativa**: #fafafa (blanco puro)

### Texto Secundario: Gris (#a1a1aa)
- **Uso**: Subtítulos, descripciones
- **Alternativa**: #71717a

## Variables CSS

```css
:root {
  /* Retail Moderno */
  --primary: #ec4899;
  --primary-foreground: #ffffff;
  --secondary: #8b5cf6;
  --secondary-foreground: #ffffff;
  --accent: #06b6d4;
  --accent-foreground: #ffffff;
  --background: #18181b;
  --background-foreground: #ffffff;
  --foreground: #ffffff;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --border: #27272a;
  --ring: #ec4899;
}
```

## Tailwind Config

```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ec4899',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#06b6d4',
          foreground: '#ffffff',
        },
        background: {
          DEFAULT: '#18181b',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
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
  <h1 className="text-5xl font-bold text-primary">Style Store</h1>
  <p className="text-xl text-muted-foreground mt-4">
    Nueva colección primavera 2026
  </p>
  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg mt-8">
    Comprar Ahora
  </button>
</section>

// Card de Producto
<div className="bg-muted rounded-xl p-6 border border-border">
  <div className="aspect-square bg-secondary/20 rounded-lg mb-4"></div>
  <h3 className="text-xl font-semibold text-foreground">Camiseta Básica</h3>
  <p className="text-accent font-bold mt-2">$29.990</p>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg mt-4 w-full">
    Agregar al Carrito
  </button>
</section>

// Badge de Descuento
<span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
  -30% OFF
</span>
```

## Referencias Visuales

- **Fondos**: #18181b, #09090b, #27272a
- **Acentos**: #ec4899, #f472b6, #fb7185
- **Púrpura**: #8b5cf6, #a78bfa, #c4b5fd
- **Cyan**: #06b6d4, #22d3ee, #67e8f9
- **Texto**: #ffffff, #fafafa, #f4f4f5
- **Borders**: #27272a, #3f3f46

## Nichos Relacionados

- Tiendas de ropa
- Boutiques
- Tiendas de accesorios
- Gadgets y tech
- Calzado
- Joyería
- Cosméticos
- Decoración del hogar

## Imágenes Sugeridas

- **Hero**: Producto estrella, lifestyle
- **Productos**: Fotos de estudio limpias
- **Modelos**: Personas usando productos
- **Ambientación**: Minimalista, moderna
