# Paleta: Barberías

## Descripción
Colores cálidos y clásicos para barberías, peluquerías masculinas y negocios de grooming.

## Paleta de Colores

### Primario: Ámbar Clásico (#d97706)
- **Uso**: Botones principales, CTAs, acentos
- **Psicología**: Tradición, calidez, confianza
- **Contraste**: Perfecto sobre fondos oscuros

### Secundario: Marrón (#92400e)
- **Uso**: Headers, footers, acentos oscuros
- **Psicología**: Solidez, tradición, masculinidad
- **Complemento**: Complementa el ámbar

### Acento: Dorado (#fbbf24)
- **Uso**: Highlights, badges, elementos premium
- **Psicología**: Calidad, servicio premium
- **Uso**: Para servicios premium

### Fondo: Stone Oscuro (#1c1917)
- **Uso**: Background principal
- **Psicología**: Clásico, atemporal, elegante
- **Alternativa**: #0c0a09 (más oscuro)

### Texto: Blanco (#ffffff)
- **Uso**: Texto principal sobre fondos oscuros
- **Alternativa**: #fafaf9 (blanco cálido)

### Texto Secundario: Gris Cálido (#d6d3d1)
- **Uso**: Subtítulos, descripciones
- **Alternativa**: #a8a29e

## Variables CSS

```css
:root {
  /* Barberías */
  --primary: #d97706;
  --primary-foreground: #ffffff;
  --secondary: #92400e;
  --secondary-foreground: #ffffff;
  --accent: #fbbf24;
  --accent-foreground: #1c1917;
  --background: #1c1917;
  --background-foreground: #ffffff;
  --foreground: #ffffff;
  --muted: #292524;
  --muted-foreground: #d6d3d1;
  --border: #292524;
  --ring: #d97706;
}
```

## Tailwind Config

```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d97706',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#92400e',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#fbbf24',
          foreground: '#1c1917',
        },
        background: {
          DEFAULT: '#1c1917',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#292524',
          foreground: '#d6d3d1',
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
  <h1 className="text-5xl font-bold text-primary">Barber Shop Premium</h1>
  <p className="text-xl text-muted-foreground mt-4">
    El corte que mereces
  </p>
  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg mt-8">
    Reservar Turno
  </button>
</section>

// Card de Servicio
<div className="bg-muted rounded-xl p-6 border border-border">
  <h3 className="text-xl font-semibold text-foreground">Corte + Barba</h3>
  <p className="text-muted-foreground mt-2">
    Servicio completo de grooming
  </p>
  <p className="text-accent font-bold mt-2">$25.000</p>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg mt-4">
    Reservar
  </button>
</section>

// Horarios
<div className="mt-8">
  <h3 className="text-xl font-semibold text-foreground mb-4">Horarios</h3>
  <div className="space-y-2">
    <div className="flex justify-between text-muted-foreground">
      <span>Lunes - Viernes</span>
      <span className="text-primary">9:00 - 20:00</span>
    </div>
    <div className="flex justify-between text-muted-foreground">
      <span>Sábados</span>
      <span className="text-primary">9:00 - 18:00</span>
    </div>
    <div className="flex justify-between text-muted-foreground">
      <span>Domingos</span>
      <span className="text-accent">Cerrado</span>
    </div>
  </div>
</div>
```

## Referencias Visuales

- **Fondos**: #1c1917, #0c0a09, #292524
- **Acentos**: #d97706, #f59e0b, #fbbf24
- **Marrón**: #92400e, #b45309, #d97706
- **Texto**: #ffffff, #fafaf9, #f5f5f4
- **Borders**: #292524, #44403c

## Nichos Relacionados

- Barberías
- Peluquerías masculinas
- Tiendas de grooming
- Productos de afeitado
- Clubs de caballeros
- Estilos clásicos

## Imágenes Sugeridas

- **Hero**: Barbero trabajando, interior clásico
- **Servicios**: Cortes, barba, afeitado
- **Ambiente**: Sillas clásicas, espejos
- **Detalle**: Tijeras, máquinas, productos
