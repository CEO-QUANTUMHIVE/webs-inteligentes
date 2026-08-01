# Paleta: Educación

## Descripción
Colores confiables y profesionales para academias, cursos, escuelas, plataformas de aprendizaje y educación.

## Paleta de Colores

### Primario: Verde Educación (#059669)
- **Uso**: Botones principales, CTAs, acentos
- **Psicología**: Crecimiento, conocimiento, éxito
- **Contraste**: Perfecto sobre fondos oscuros

### Secundario: Verde Oscuro (#047857)
- **Uso**: Headers, footers, acentos oscuros
- **Psicología**: Estabilidad, confianza, seriedad
- **Complemento**: Complementa el verde primario

### Acento: Azul (#3b82f6)
- **Uso**: Highlights, badges, elementos tech
- **Psicología**: Inteligencia, tecnología, innovación
- **Uso**: Para elementos tech o cursos online

### Fondo: Verde Muy Oscuro (#022c22)
- **Uso**: Background principal
- **Psicología**: Crecimiento, naturaleza, equilibrio
- **Alternativa**: #064e3b (más claro)

### Texto: Blanco (#ffffff)
- **Uso**: Texto principal sobre fondos oscuros
- **Alternativa**: #ecfdf5 (blanco verde)

### Texto Secundario: Verde Claro (#6ee7b7)
- **Uso**: Subtítulos, descripciones
- **Alternativa**: #a7f3d0

## Variables CSS

```css
:root {
  /* Educación */
  --primary: #059669;
  --primary-foreground: #ffffff;
  --secondary: #047857;
  --secondary-foreground: #ffffff;
  --accent: #3b82f6;
  --accent-foreground: #ffffff;
  --background: #022c22;
  --background-foreground: #ffffff;
  --foreground: #ffffff;
  --muted: #064e3b;
  --muted-foreground: #6ee7b7;
  --border: #064e3b;
  --ring: #059669;
}
```

## Tailwind Config

```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#047857',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        background: {
          DEFAULT: '#022c22',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#064e3b',
          foreground: '#6ee7b7',
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
  <h1 className="text-5xl font-bold text-primary">Academia Digital</h1>
  <p className="text-xl text-muted-foreground mt-4">
    Aprende las habilidades del futuro
  </p>
  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg mt-8">
    Comenzar Ahora
  </button>
</section>

// Card de Curso
<div className="bg-muted rounded-xl p-6 border border-border">
  <div className="aspect-video bg-secondary/20 rounded-lg mb-4"></div>
  <h3 className="text-xl font-semibold text-foreground">Desarrollo Web Full Stack</h3>
  <p className="text-muted-foreground mt-2">
    40 horas de contenido práctico
  </p>
  <div className="flex items-center gap-2 mt-4">
    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
      Online
    </span>
    <span className="text-primary font-bold">$199.990</span>
  </div>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg mt-4 w-full">
    Inscribirse
  </button>
</section>

// Métricas
<div className="grid grid-cols-4 gap-8 mt-12">
  <div className="text-center">
    <p className="text-4xl font-bold text-primary">5000+</p>
    <p className="text-muted-foreground">Estudiantes</p>
  </div>
  <div className="text-center">
    <p className="text-4xl font-bold text-accent">100+</p>
    <p className="text-muted-foreground">Cursos</p>
  </div>
  <div className="text-center">
    <p className="text-4xl font-bold text-primary">50+</p>
    <p className="text-muted-foreground">Instructores</p>
  </div>
  <div className="text-center">
    <p className="text-4xl font-bold text-accent">4.9</p>
    <p className="text-muted-foreground">Rating Promedio</p>
  </div>
</div>
```

## Referencias Visuales

- **Fondos**: #022c22, #064e3b, #065f46
- **Acentos**: #059669, #10b981, #34d399
- **Azul**: #3b82f6, #60a5fa, #93c5fd
- **Texto**: #ffffff, #ecfdf5, #d1fae5
- **Borders**: #064e3b, #047857

## Nichos Relacionados

- Academias de programación
- Cursos online
- Escuelas de idiomas
- Plataformas de e-learning
- Coaching educativo
- Talleres y bootcamps
- Universidades privadas
- Centros de capacitación

## Imágenes Sugeridas

- **Hero**: Estudiantes aprendiendo, laptop
- **Cursos**: Screenshots de contenido
- **Instructores**: Profesionales enseñando
- **Ambiente**: Aulas modernas, bibliotecas
