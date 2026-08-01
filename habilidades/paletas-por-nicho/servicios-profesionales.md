# Paleta: Servicios Profesionales

## Descripción
Colores profesionales y confiables para abogados, contadores, consultores, agencias y empresas de servicios.

## Paleta de Colores

### Primario: Azul Profesional (#2563eb)
- **Uso**: Botones principales, CTAs, links
- **Psicología**: Confianza, profesionalismo, estabilidad
- **Contraste**: Perfecto sobre fondos oscuros

### Secundario: Azul Oscuro (#1e40af)
- **Uso**: Headers, footers, acentos oscuros
- **Psicología**: Autoridad, seriedad, expertise
- **Complemento**: Complementa el azul primario

### Acento: Verde Éxito (#10b981)
- **Uso**: Badges de éxito, métricas, elementos positivos
- **Psicología**: Crecimiento, logro, positividad
- **Uso**: Sparingly para elementos clave

### Fondo: Slate Oscuro (#0f172a)
- **Uso**: Background principal
- **Psicología**: Profesionalismo, seriedad, elegancia
- **Alternativa**: #1e293b (más claro)

### Texto: Blanco (#ffffff)
- **Uso**: Texto principal sobre fondos oscuros
- **Alternativa**: #f1f5f9 (blanco suave)

### Texto Secundario: Gris (#94a3b8)
- **Uso**: Subtítulos, descripciones
- **Alternativa**: #64748b

## Variables CSS

```css
:root {
  /* Servicios Profesionales */
  --primary: #2563eb;
  --primary-foreground: #ffffff;
  --secondary: #1e40af;
  --secondary-foreground: #ffffff;
  --accent: #10b981;
  --accent-foreground: #ffffff;
  --background: #0f172a;
  --background-foreground: #ffffff;
  --foreground: #ffffff;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --border: #1e293b;
  --ring: #2563eb;
}
```

## Tailwind Config

```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#1e40af',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        background: {
          DEFAULT: '#0f172a',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1e293b',
          foreground: '#94a3b8',
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
  <h1 className="text-5xl font-bold text-primary">Bufé & Asociados</h1>
  <p className="text-xl text-muted-foreground mt-4">
    Soluciones legales para tu negocio
  </p>
  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg mt-8">
    Consulta Gratis
  </button>
</section>

// Card de Servicio
<div className="bg-muted rounded-xl p-6 border border-border">
  <h3 className="text-xl font-semibold text-foreground">Derecho Corporativo</h3>
  <p className="text-muted-foreground mt-2">
    Asesoría legal completa para empresas
  </p>
  <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg mt-4">
    Más Información
  </button>
</section>

// Métricas
<div className="grid grid-cols-3 gap-8 mt-12">
  <div className="text-center">
    <p className="text-4xl font-bold text-primary">500+</p>
    <p className="text-muted-foreground">Casos Ganados</p>
  </div>
  <div className="text-center">
    <p className="text-4xl font-bold text-accent">15</p>
    <p className="text-muted-foreground">Años de Experiencia</p>
  </div>
  <div className="text-center">
    <p className="text-4xl font-bold text-primary">98%</p>
    <p className="text-muted-foreground">Clientes Satisfechos</p>
  </div>
</div>
```

## Referencias Visuales

- **Fondos**: #0f172a, #1e293b, #334155
- **Acentos**: #2563eb, #3b82f6, #60a5fa
- **Éxito**: #10b981, #34d399, #6ee7b7
- **Texto**: #ffffff, #f1f5f9, #e2e8f0
- **Borders**: #1e293b, #334155

## Nichos Relacionados

- Bufetes de abogados
- Empresas contables
- Consultoras de negocios
- Agencias de marketing
- Empresas de TI
- Auditorías
- Firmas de arquitectura
- Estudios de diseño

## Imágenes Sugeridas

- **Hero**: Oficina moderna, equipo profesional
- **About**: Equipo trabajando, reuniones
- **Servicios**: Iconos de servicios
- **Testimonios**: Clientes satisfechos
- **Contact**: Oficina, recepción
