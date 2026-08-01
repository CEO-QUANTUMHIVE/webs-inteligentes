---
name: construir-demo-web
description: Construye una demo premium en Next.js a partir del brief de un cliente.
---

# Construir Demo Web

Esta skill automatiza el proceso de ensamblar una página web premium para un cliente de Web Factory.

## Stack Tecnológico

- **Framework**: Next.js 16+ con React 19
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui + Vengeance UI
- **Animaciones**: Framer Motion / GSAP
- **Tipografías**: Orbitron (display) + Space Grotesk (body)

## Flujo de Trabajo

### Paso 1: Recopilar Información
1. Leer el brief del cliente desde `clientes/[nombre-cliente]/`
2. Verificar que tenga toda la información necesaria
3. Identificar tipo de negocio y necesidades
4. Seleccionar plantilla apropiada

### Paso 2: Preparar Entorno
1. Copiar plantilla base desde `sistema-de-diseno/plantillas/`
2. Crear directorio del cliente en `clientes/`
3. Configurar proyecto Next.js con Tailwind + shadcn
4. Instalar componentes Vengeance UI necesarios

### Paso 3: Aplicar Diseño
1. Cargar tokens de `sistema-de-diseno/tokens/`
2. Seleccionar componentes aprobados del registro
3. Aplicar efectos del design system
4. Personalizar colores según marca del cliente

### Paso 4: Personalizar Contenido
1. Reemplazar texto dummy con información real
2. Cargar imágenes autorizadas
3. Configurar formularios de contacto
4. Integrar agente conversacional

### Paso 5: Configurar Agente
1. Crear knowledge base con información del negocio
2. Configurar prompts del agente
3. Integrar web widget
4. Probar respuestas básicas

### Paso 6: QA Inicial
1. Ejecutar `npm run build`
2. Verificar que no hay errores
3. Probar responsive
4. Revisar performance

### Paso 7: Documentación
1. Crear README del proyecto
2. Documentar decisiones tomadas
3. Listar componentes utilizados
4. Registrar conocimiento del agente

## Instalación de Componentes Vengeance UI

```bash
# Inicializar shadcn (si no está inicializado)
npx shadcn@latest init

# Agregar componente específico
npx shadcn@latest add https://www.vengenceui.com/r/animated-rays.json

# Con alias (si se configuró en components.json)
npx shadcn@latest add @vengeanceui/animated-rays

# Múltiples componentes
npx shadcn@latest add \
  https://www.vengenceui.com/r/animated-rays.json \
  https://www.vengenceui.com/r/morph-text.json \
  https://www.vengenceui.com/r/glow-border-card.json \
  https://www.vengenceui.com/r/spotlight-navbar.json
```

## Estructura del Proyecto

```
clientes/[nombre-cliente]/
├── README.md              # Documentación del proyecto
├── package.json           # Dependencias
├── components.json        # Configuración shadcn
├── src/
│   ├── app/
│   │   ├── page.tsx       # Página principal
│   │   ├── layout.tsx     # Layout
│   │   └── globals.css    # Estilos globales
│   ├── components/        # Componentes específicos
│   │   └── ui/            # Componentes Vengeance UI
│   └── lib/
│       ├── knowledge.ts   # Knowledge base del agente
│       └── utils.ts       # Utilidades
├── public/                # Assets estáticos
└── knowledge/             # Documentos del negocio
```

## Checklist de Implementación

### Información
- [ ] Nombre del negocio correcto
- [ ] Dirección verificada
- [ ] Teléfono y email correctos
- [ ] Horarios de atención
- [ ] Servicios/productos listados
- [ ] Precios exactos

### Diseño
- [ ] Template seleccionado
- [ ] Colores aplicados
- [ ] Tipografía configurada
- [ ] Componentes Vengeance UI integrados
- [ ] Responsive verificado

### Contenido
- [ ] Hero section personalizada
- [ ] Secciones principales
- [ ] Formulario de contacto
- [ ] Footer completo
- [ ] SEO básico

### Agente
- [ ] Knowledge base cargada
- [ ] Prompts configurados
- [ ] Widget integrado
- [ ] Pruebas realizadas
- [ ] Lead capture funcionando

### QA
- [ ] Build exitoso
- [ ] Sin errores de consola
- [ ] Responsive móvil
- [ ] Performance aceptable
- [ ] Accesibilidad básica

## Comandos Útiles

```bash
# Iniciar desarrollo
npm run dev

# Build de producción
npm run build

# Verificar lint
npm run lint

# Analizar bundle
npx @next/bundle-analyzer
```

## Errores Comunes

### Build Fallido
- Verificar dependencias faltantes
- Revisar imports rotos
- Comprobar tipos TypeScript

### Estilos No Aplicados
- Verificar imports de Tailwind
- Comprobar specificity
- Revisar configuración de shadcn

### Vengeance UI No Funciona
- Verificar que Tailwind está instalado
- Comprobar que shadcn está inicializado
- Revisar imports de componentes

### Agente No Funciona
- Verificar tenant ID
- Comprobar API endpoint
- Revisar knowledge base

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Tiempo de construcción | < 2 horas |
| Build exitoso | 100% |
| Responsive | 100% |
| Agente funcional | 100% |
| Sin errores | 100% |