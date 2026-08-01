# Web Factory - Instrucciones para Agentes

## Pipeline de Trabajo

Web Factory es el sistema de QuantumHive para construir webs ultra-profesionales personalizadas para negocios locales, con agentes conversacionales integrados.

### Stack Tecnológico

- **Framework**: Next.js 16+ con React 19
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui
- **UI Premium**: Vengeance UI (componentes animados)
- **Animaciones**: Framer Motion / GSAP
- **Tipografías**: Orbitron (display) + Space Grotesk (body)
- **Colores**: Fondo oscuro, acentos cian/verde neón/dorado

### Flujo Principal

1. **Descubrimiento**: Identificar negocios con presencia web débil
2. **Calificación**: Verificar oportunidad y capacidad de pago
3. **Auditoría**: Analizar sitio actual del prospecto
4. **Generación de Demo**: Construir web premium personalizada
5. **Configuración del Agente**: Preparar asistente conversacional
6. **QA Humana**: Verificar calidad antes de entregar
7. **Aprobación**: Confirmar con cliente
8. **Propuesta Comercial**: Enviar oferta concreta
9. **Seguimiento**: Organizar próximos pasos

### Agentes del Sistema

- **Lead Finder**: Encuentra y normaliza candidatos desde Google Maps, Instagram, LinkedIn
- **Site Auditor**: Verifica presencia web, tecnología y problemas visibles
- **Web Builder**: Genera demos premium bajo sistema de diseño controlado
- **Conversation Agent Builder**: Prepara conocimiento y respuestas del negocio
- **Proposal Composer**: Redacta propuestas basadas en evidencia real
- **CRM Follow-up**: Organiza respuestas y siguientes pasos

### Componentes Vengeance UI Disponibles

| Categoría | Componentes |
|-----------|-------------|
| Backgrounds | animated-rays, interactive-particles |
| Texto | morph-text, flip-fade-text, ascii-glitch-ripple, stagger-text |
| Layout | agent-bento-grid, expandable-bento-grid, glow-border-card, highlight-grid |
| Navegación | spotlight-navbar, glass-dock, awwwards-nav |
| Interactivo | magnetic-spotlight-marquee, cursor-card, scroll-dissolve-reveal |
| Botones | radial-glow-button, liquid-metal, animated-button |

### Instalación de Componentes Vengeance UI

```bash
# Inicializar shadcn (si no está inicializado)
npx shadcn@latest init

# Agregar componente específico
npx shadcn@latest add https://www.vengenceui.com/r/animated-rays.json

# O con alias (si se configuró en components.json)
npx shadcn@latest add @vengeanceui/animated-rays
```

### Reglas Críticas

1. **Nunca inventar información del negocio**
2. **Siempre requerir aprobación humana antes de enviar propuestas**
3. **Usar solo información pública verificable**
4. **No publicar sitios sin autorización explícita**
5. **Respetar los límites del MVP inicial**
6. **Priorizar impacto visual sobre complejidad técnica**

### Estructura de Directorio

```
web-factory/
├── AGENTS.md                    # Este archivo
├── documentacion/               # Documentación del producto
├── sistema-de-diseno/           # Tokens, componentes, efectos
├── plantillas/                  # Plantillas predefinidas
├── motor-agentes/               # Runtime del agente conversacional
├── clientes/                    # Proyectos de clientes
├── evaluaciones/                # Sistema de evaluaciones
└── habilidades/                 # Habilidades de agentes
```

### Métricas de Éxito

- Leads calificados por semana
- Demos generadas y aprobadas
- Tiempo promedio por demo (< 2 horas)
- Tasa de respuesta a propuestas (> 25%)
- Reuniones obtenidas
- Tasa de cierre de ventas (> 15%)
- Ingreso marginal por proyecto

### Herramientas Permitidas

- Google Maps para descubrimiento de leads
- Instagram/LinkedIn para búsqueda activa
- Navegador web para auditorías (agent-browser)
- Next.js + Tailwind + shadcn para desarrollo
- Vengeance UI para componentes premium
- Azure OpenAI para agentes conversacionales
- GitHub para control de versiones

### Skills Relevantes del Usuario

- **frontend-design**: Interfaces production-grade
- **high-end-visual-design**: Tipografía, spacing, shadows premium
- **ui-ux-pro-max**: Patrones UI/UX avanzados
- **impeccable-design-polish**: Auditoría y pulido visual
- **agent-browser**: Testing y QA en navegador
- **gsap-react**: Animaciones cinematográficas
- **design-system**: Arquitectura de tokens

### Prohibiciones

- Scraping masivo sin revisión humana
- Envío autónomo de mensajes
- Generación ilimitada de estilos sin aprobación
- Compra automática de dominios
- Facturación de autoservicio
- Soporte multiagencia sin validación
- Copiar contenido sin permiso

### Próximos Pasos

1. Completar web de QuantumHive como primer piloto
2. Integrar widget de agente conversacional
3. Probar con primeros clientes conocidos
4. Documentar learnings para escalar
5. Crear skills automatizadas de construcción