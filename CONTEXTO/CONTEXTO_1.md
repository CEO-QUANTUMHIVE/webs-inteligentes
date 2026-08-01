# CONTEXTO 1 - Web Factory

## Fecha: 31 de Julio, 2026
## Estado: EN PROCESO
## Última actualización: 22:12 hs

---

## 1. QUÉ ES WEB FACTORY

Web Factory es un pipeline interno de QuantumHive para construir webs ultra-profesionales personalizadas para negocios locales, con agentes conversacionales integrados.

**Objetivo**: Encontrar negocios con presencia web débil, construirles una demo premium y convertir esa mejora en oportunidades comerciales.

**Producto final**: Página web premium + agente conversacional integrado + WhatsApp automatizado.

---

## 2. CONTEXTO DEL PROYECTO QUANTUMHIVE

### Qué es QuantumHive
- Plataforma de infraestructura para crear productos de IA basados en agentes
- Empresa en etapa precomercial
- Busca consolidar técnicamente y preparar primeros productos comerciales

### Pilares
1. **QuantumCore** - Sistema interno de control (memoria, agentes, tareas)
2. **Catálogo de Conocimiento** - Biblioteca inteligente de herramientas y recursos

### Productos
- **Empleados Virtuales** - Agentes de IA para negocios (LÍNEA PRINCIPAL)
- **Mesero Virtual** - Especialización para gastronomía
- **Webs Inteligentes** - Lo que estamos construyendo ahora (WEB FACTORY)

### Web de QuantumHive
- URL: quantumhive.com.ar
- Estado: Creada con Vengeance UI, pero con contenido pobre
- Necesita: Reescritura de copywriting y más impacto visual

---

## 3. LO QUE TENEMOS ARMADO (ESTADO ACTUAL)

### Estructura de Carpetas (EN ESPAÑOL)
```
web-factory/
├── AGENTS.md                     # Instrucciones para agentes
├── CONTEXTO/                     # ← ESTAMOS ACÁ
│   └── CONTEXTO_1.md             # Este archivo
├── clientes/
│   └── quantum-hive/             # Primer piloto
│       ├── src/app/page.tsx      # Página principal (435 líneas)
│       ├── src/app/catalogo-efectos/page.tsx  # Catálogo de efectos
│       └── out/                  # Para deploy en Netlify
├── documentacion/
│   ├── product-brief.md
│   ├── pipeline.md
│   ├── commercial-offer.md
│   └── pilot-program.md
├── sistema-de-diseno/
│   ├── tokens/tokens.ts          # Tokens de diseño (español)
│   ├── componentes/registry.ts   # 14 componentes documentados
│   ├── efectos/effects.ts        # 14 efectos documentados
│   └── plantillas/templates.ts   # 4 plantillas definidas
├── plantillas/
│   ├── catalogo-efectos/         # Catálogo visual de efectos
│   ├── ecommerce/                # Plantilla tienda online
│   ├── servicios-con-turnos/     # Plantilla servicios
│   └── funnel-diagnostico/       # Plantilla funnel
├── motor-agentes/
│   ├── widget-web/               # Widget de chat
│   ├── conocimiento/             # Base de conocimiento
│   ├── captura-leads/            # Captura de leads
│   └── enrutador-proveedores/    # Enrutador IA
├── habilidades/
│   ├── construir-demo-web.md     # Skill de construcción
│   └── qa-web-cliente.md         # Skill de QA
└── evaluaciones/
    ├── visual/                   # QA visual
    ├── factual/                  # QA factual
    └── conversacional/           # QA conversacional
```

### Stack Tecnológico
- **Framework**: Next.js 16+ con React 19
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui + Vengeance UI
- **Animaciones**: CSS animations + Framer Motion
- **Tipografías**: Orbitron (display) + Space Grotesk (body)
- **Colores**: Fondo oscuro (#0a0a0f), acentos cyan (#00d4ff), verde (#00ff88), dorado (#ffd700)
- **Deploy**: Netlify (carpeta `out`)

### Skills (Habilidades)
1. **construir-demo-web.md** - Flujo para crear demos de clientes
2. **qa-web-cliente.md** - Flujo de QA visual, factual, conversacional

### Páginas Creadas
1. **Página Principal** (`/`) - Hero, servicios, proceso, resultados, contacto
2. **Catálogo de Efectos** (`/catalogo-efectos`) - 13 efectos con previews animados, filtros, selección, formulario

### Netlify Deploy
- URL: https://spectacular-youtiao-20ff2e.netlify.app
- Página principal: funciona
- Catálogo: funciona con previews animados

---

## 4. EFECTOS DOCUMENTADOS (14)

### Fondos (2)
1. Rayos Animados - Aurora multicolor giro
2. Partículas Interactivas - Puntos que flotan

### Texto (3)
3. Texto Morfológico - Cambia entre palabras
4. Texto Flip Fade - RotateX con fade
5. Texto Escalonado - Bounce por letras

### Tarjetas (2)
6. Tarjeta Borde Brillante - Brillo cyan al hover
7. Tarjeta con Cursor - Tilt 3D

### Navegación (2)
8. Navbar Spotlight - Luz que sigue cursor
9. Dock de Vidrio - Menú glass móvil

### Botones (2)
10. Botón Brillo Radial - Expansión blanca
11. Botón Animado - Scale + borde

### Secciones (3)
12. Grid Bento - Layout Apple
13. Revelado por Scroll - Barras que aparecen

---

## 5. CLIENTES PILOTO (6 casos)

| # | Cliente | Tipo | Prioridad | Estado |
|---|---------|------|-----------|--------|
| 1 | QuantumHive | Web corporativa | 1 | EN DESARROLLO |
| 2 | Negocio Tiendanube | E-commerce | 2 | Propuesta enviada |
| 3 | Antigua clienta bot | Web + agente | 3 | Pendiente contacto |
| 4 | Indumentaria trabajo | Catálogo | 4 | Contacto identificado |
| 5 | Barbería | Servicios + turnos | 5 | Contacto identificado |
| 6 | Profesora yoga | Marca personal | 6 | Contacto identificado |

**Nota**: Los primeros 6 son conocidos/familiares. No pagan pero sirven para validar.

---

## 6. PIPELINE DE TRABAJO

```
Google Maps → Descubrimiento → Calificación → Auditoría → Demo → Agente → QA → Aprobación → Propuesta → Seguimiento
```

### Agentes del Sistema
- **Lead Finder**: Busca negocios en Google Maps, Instagram, LinkedIn
- **Site Auditor**: Audita sitio actual del prospecto
- **Web Builder**: Genera demo premium
- **Conversation Agent Builder**: Configura agente conversacional
- **Proposal Composer**: Crea propuesta comercial
- **CRM Follow-up**: Seguimiento post-venta

---

## 7. PLAN A LLEVAR A CABO

### FASE 1: COMPLETAR WEB DE QUANTUMHIVE (INMEDIATO)
- [ ] Reescribir copywriting de la página principal
- [ ] Agregar más impacto visual
- [ ] Integrar widget de agente conversacional
- [ ] Agregar sección de casos piloto
- [ ] Deploy en Netlify

### FASE 2: SKILL "COPIAR PÁGINA DE REFERENCIA" (ALTA)
- [ ] Crear skill que tome URLs de referencia
- [ ] Extraer estructura y estilos
- [ ] Cambiar paleta de colores por nicho
- [ ] Cambiar contenido por el del cliente
- [ ] Generar página Next.js

### FASE 3: BIBLIOTECA DE REFERENCIAS (ALTA)
- [ ] Recopilar 10-15 URLs de páginas premium
- [ ] Organizar por tipo (hero, landing, ecommerce, servicios)
- [ ] Documentar qué copiar de cada una
- [ ] Crear paletas de colores por nicho

### FASE 4: MÁS SKILLS (MEDIA)
- [ ] **auditor-web** - Analizar sitio existente del cliente
- [ ] **generar-propuesta** - Crear propuesta comercial automática
- [ ] **configurar-agente** - Setup del chat widget
- [ ] **paletas-por-nicho** - Colores predefinidos por industria

### FASE 5: PLANTILLAS REALES (MEDIA)
- [ ] Convertir definiciones en código Next.js funcional
- [ ] Cada plantilla con página completa
- [ ] Listas para personalizar

### FASE 6: PRIMEROS CLIENTES (MEDIUM)
- [ ] Contactar a Tiendanube
- [ ] Construir demo para barbería
- [ ] Construir demo para yoga
- [ ] Documentar learnings

---

## 8. SKILLS DEL USUARIO (64 disponibles)

### Relevantes para Web Factory
- **frontend-design** - Interfaces production-grade
- **high-end-visual-design** - Tipografía, spacing, shadows premium
- **ui-ux-pro-max** - Patrones UI/UX avanzados
- **impeccable-design-polish** - Auditoría y pulido visual
- **agent-browser** - Testing y QA en navegador
- **gsap-react** - Animaciones cinematográficas
- **design-system** - Arquitectura de tokens

### Otras skills útiles
- image-to-code, shadcn-ui, web-artifacts-builder
- banner-design, faq-page, data-report
- slides, pdf, resume-modern
- imagegen, fal-generate, remotion

---

## 9. DECISIONES TOMADAS

1. **Todo en español** - Carpetas, archivos, documentación
2. **Stack**: Next.js + Tailwind + shadcn + Vengeance UI
3. **Deploy**: Netlify con carpeta `out` (static export)
4. **Colores**: Fondo oscuro + cyan/verde/dorado neón
5. **Primer piloto**: Web de QuantumHive
6. **Clientes iniciales**: Conocidos (no pagan, validan)
7. **Monetización**: WebFactory → Empleados Virtuales → Mesero Virtual

---

## 10. PROBLEMAS RESUELTOS

1. **VM no ejecuta localhost** → Deploy en Netlify
2. **Carpetas en inglés** → Renombradas a español
3. **Catálogo sin previews** → Agregadas animaciones CSS reales
4. **Build fallido** → Configurado `output: "export"` en next.config.ts

---

## 11. PRÓXIMOS PASOS INMEDIATOS

1. **Reescribir copy de QuantumHive** (más impacto, menos abstracto)
2. **Crear skill de copiar páginas de referencia**
3. **Armar biblioteca de 10 URLs de referencia**
4. **Crear paletas de colores por nicho**
5. **Expandir a más skills de agente**

---

## 12. MÉTRICAS DE ÉXITO

| Métrica | Objetivo |
|---------|----------|
| Tiempo por demo | < 2 horas |
| Build exitoso | 100% |
| Tasa de respuesta propuestas | > 25% |
| Reuniones obtenidas | > 5 |
| Tasa de cierre | > 15% |
| Ingreso por proyecto | > USD 150 |

---

**NOTA**: Este contexto es el punto de partida para continuar el trabajo. Cualquier agente que retome el proyecto debe leer este archivo primero.