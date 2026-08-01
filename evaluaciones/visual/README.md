# Evaluación Visual - Sistema de QA

## Descripción
Checklist y procedimiento para evaluar la calidad visual de las demos generadas por Web Factory.

## Checklist de Evaluación Visual

### 1. Diseño General
- [ ] Estilo consistente con el design system
- [ ] Paleta de colores coherente
- [ ] Tipografía legible y consistente
- [ ] Espaciados uniformes
- [ ] Jerarquía visual clara

### 2. Hero Section
- [ ] Título visible y impactante
- [ ] Subtítulo claro
- [ ] CTA prominente
- [ ] Imagen/fondo de calidad
- [ ] Animaciones suaves (si aplica)

### 3. Tarjetas y Componentes
- [ ] Bordes consistentes
- [ ] Sombras apropiadas
- [ ] Hover states funcionales
- [ ] Iconos claros
- [ ] Texto legible

### 4. Navegación
- [ ] Menú accesible
- [ ] Links funcionales
- [ ] Responsive en móvil
- [ ] Sticky navbar (si aplica)
- [ ] Buscador (si aplica)

### 5. Formularios
- [ ] Campos claramente etiquetados
- [ ] Validación visible
- [ ] Mensajes de error claros
- [ ] Botón de envío prominente
- [ ] Éxito/fracaso manejado

### 6. Footer
- [ ] Información de contacto
- [ ] Links importantes
- [ ] Redes sociales
- [ ] Copyright actualizado

## Métricas Visuales

### Puntuación (0-100)

| Categoría | Peso | Puntuación |
|-----------|------|------------|
| Diseño General | 25% | /10 |
| Hero Section | 20% | /10 |
| Componentes | 20% | /10 |
| Navegación | 15% | /10 |
| Formularios | 10% | /10 |
| Footer | 10% | /10 |
| **Total** | **100%** | **/10** |

### Niveles de Calidad

- **90-100**: Excelente - Lista para entregar
- **80-89**: Buena - Menores ajustes necesarios
- **70-79**: Aceptable - Requiere mejoras
- **60-69**: Deficiente - Requiere rework
- **< 60**: No aceptable - Rehacer

## Herramientas de Evaluación

### 1. Inspección Visual
- Chrome DevTools
- Firefox Developer Tools
- Responsively App

### 2. Métricas de Rendimiento
- Google PageSpeed Insights
- Lighthouse
- Web Vitals

### 3. Accesibilidad
- axe DevTools
- WAVE
- NVDA Screen Reader

## Proceso de Evaluación

### Paso 1: Revisión Inicial (5 min)
1. Abrir la demo en navegador
2. Verificar carga inicial
3. Revisar hero section
4. Navegar por secciones principales

### Paso 2: Revisión Detallada (15 min)
1. Completar checklist visual
2. Probar en móvil (responsive)
3. Probar formularios
4. Verificar animaciones
5. Revisar rendimiento

### Paso 3: Documentación (5 min)
1. Registrar puntuación
2. Capturar problemas encontrados
3. Priorizar correcciones
4. Generar reporte

## Plantilla de Reporte

```markdown
# Reporte de Evaluación Visual

**Fecha**: [Fecha]
**Demo**: [Nombre del cliente]
**Evaluador**: [Nombre]

## Resumen
- Puntuación Total: [X]/100
- Nivel: [Excelente/Buena/Aceptable/Deficiente/No aceptable]
- Estado: [Lista para entregar/Requiere ajustes/Requiere rework]

## Hallazgos Críticos
1. [Problema 1]
2. [Problema 2]
3. [Problema 3]

## Mejoras Recomendadas
1. [Mejora 1]
2. [Mejora 2]
3. [Mejora 3]

## Capturas de Pantalla
[Adjuntar capturas de problemas encontrados]

## Próximos Pasos
1. [Acción 1]
2. [Acción 2]
3. [Acción 3]
```

## Errores Comunes

### Diseño
- Colores inconsistentes
- Tipografía variada
- Espaciados irregulares
- Jerarquía confusa

### Responsive
- Texto cortado en móvil
- Imágenes desproporcionadas
- Botones inaccesibles
- Menú no funciona

### Rendimiento
- Imágenes sin optimizar
- Animaciones pesadas
-太多 requests
- Tiempo de carga lento

## Benchmark de Referencia

### Ejemplos de Sitios Premium
- Stripe.com
- Vercel.com
- Linear.app
- Raycast.com

### Estándares de Calidad
- Google Material Design
- Apple Human Interface Guidelines
- Carbon Design System