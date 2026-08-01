# QuantumHive - Cliente Principal

## Información del Negocio

**Nombre**: QuantumHive  
**Tipo**: Multi-Agent Business Infrastructure  
**Ubicación**: Argentina (operación remota)  
**Sitio Web**: quantumhive.com.ar  
**Estado**: En desarrollo

## Descripción

QuantumHive es una plataforma tecnológica para crear, operar y escalar productos de inteligencia artificial basados en agentes, memoria, automatización, voz, avatares y conocimiento estructurado.

## Stack Tecnológico

- **Framework**: Next.js 16+ con React 19
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui + Vengeance UI
- **Animaciones**: Framer Motion / GSAP
- **Tipografías**: Orbitron (display) + Space Grotesk (body)
- **Colores**: Fondo oscuro, acentos cian/verde neón/dorado

## Componentes Vengeance UI Instalados

- animated-rays (Rayos animados de fondo)
- morph-text (Texto morfológico)
- flip-fade-text (Texto con flip y fade)
- glow-border-card (Tarjeta con borde brillante)
- radial-glow-button (Botón con brillo radial)
- spotlight-navbar (Navbar con spotlight)
- glass-dock (Dock de vidrio para móvil)
- interactive-particles (Partículas interactivas)

## Productos

### 1. Webs Inteligentes
- Páginas web premium con agentes conversacionales integrados
- Atención 24/7
- Conversión automática de visitantes en clientes

### 2. Empleados Virtuales
- Agentes de IA especializados
- Atención personalizada
- Memoria de conversaciones
- Multicanal (web, WhatsApp, voz)

### 3. Mesero Virtual
- Especialización para gastronomía
- Menú interactivo
- Recomendaciones inteligentes
- Toma de pedidos

## Estructura del Proyecto

```
quantum-hive/
├── package.json           # Dependencias
├── components.json        # Configuración shadcn + Vengeance UI
├── tsconfig.json          # Configuración TypeScript
├── next.config.ts         # Configuración Next.js
├── postcss.config.mjs     # Configuración PostCSS
├── eslint.config.mjs      # Configuración ESLint
├── src/
│   ├── app/
│   │   ├── page.tsx       # Página principal
│   │   ├── layout.tsx     # Layout con tipografías
│   │   └── globals.css    # Estilos globales
│   ├── components/
│   │   └── ui/            # Componentes Vengeance UI
│   └── lib/
│       └── utils.ts       # Utilidades
└── public/                # Assets estáticos
```

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build de producción
npm run build
```

## Configuración de Vengeance UI

El registro de Vengeance UI está configurado en `components.json`:

```json
{
  "registries": {
    "@vengeanceui": "https://www.vengenceui.com/r/{name}.json"
  }
}
```

Para agregar nuevos componentes:

```bash
npx shadcn@latest add @vengeanceui/animated-rays
npx shadcn@latest add @vengeanceui/morph-text
npx shadcn@latest add @vengeanceui/glow-border-card
```

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Leads generados/mes | 50 |
| Tasa de conversión | 15% |
| Tiempo de respuesta | < 2h |
| Satisfacción del cliente | > 4.5/5 |

## Próximos Pasos

1. [x] Completar estructura de la web
2. [ ] Integrar agente conversacional
3. [ ] Configurar lead capture
4. [ ] Implementar métricas
5. [ ] Lanzar versión beta

## Notas

- Esta web es la primera demo de Web Factory
- Debe reflejar la calidad premium de los productos
- El agente debe demostrar las capacidades que se venden