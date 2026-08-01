---
name: qa-web-cliente
description: Realiza QA completo a una demo de Web Factory verificando calidad visual, factual y conversacional.
---

# QA Web Cliente

Esta skill ejecuta un proceso completo de Quality Assurance sobre una demo de Web Factory antes de entregarla al cliente.

## Flujo de Trabajo

### Paso 1: Preparación (5 min)
1. Identificar cliente y tenant ID
2. Cargar checklist de evaluación
3. Preparar entorno de pruebas
4. Documentar expectativas

### Paso 2: QA Visual (15 min)
1. Revisar diseño general
2. Verificar hero section
3. Probar componentes Vengeance UI
4. Evaluar navegación
5. Revisar formularios
6. Verificar footer

### Paso 3: QA Factual (10 min)
1. Verificar información del negocio
2. Confirmar precios y horarios
3. Validar servicios/productos
4. Revisar fuentes de información
5. Comprobar que no hay inventos

### Paso 4: QA Conversacional (10 min)
1. Probar agente con escenarios
2. Verificar respuestas correctas
3. Evaluar captura de leads
4. Revisar tiempos de respuesta
5. Documentar hallazgos

### Paso 5: QA Técnico (10 min)
1. Ejecutar build
2. Verificar errores de consola
3. Probar performance
4. Revisar accesibilidad
5. Verificar seguridad

### Paso 6: Reporte (5 min)
1. Generar reporte consolidado
2. Calcular puntuación total
3. Identificar problemas críticos
4. Planificar correcciones

## Checklist de QA

### Visual (Peso: 30%)
- [ ] Diseño consistente con design system
- [ ] Colores correctos según tokens
- [ ] Tipografía legible (Orbitron + Space Grotesk)
- [ ] Responsive móvil verificado
- [ ] Animaciones Vengeance UI funcionando
- [ ] Formularios funcionales
- [ ] Efectos de brillo y vidrio aplicados

### Factual (Peso: 30%)
- [ ] Información del negocio correcta
- [ ] Precios exactos (sin aproximar)
- [ ] Horarios verificados
- [ ] Servicios/productos reales
- [ ] Sin información inventada
- [ ] Fuentes documentadas

### Conversacional (Peso: 25%)
- [ ] Agente responde correctamente
- [ ] Información de la knowledge base
- [ ] Captura leads efectivamente
- [ ] Tono apropiado del negocio
- [ ] Tiempos de respuesta aceptables

### Técnico (Peso: 15%)
- [ ] Build exitoso (npm run build)
- [ ] Sin errores de consola
- [ ] Performance aceptable (< 3s carga)
- [ ] Accesibilidad básica
- [ ] SEO configurado

## Métricas de Calidad

### Puntuación Total (0-100)

| Categoría | Peso | Puntuación |
|-----------|------|------------|
| QA Visual | 30% | /10 |
| QA Factual | 30% | /10 |
| QA Conversacional | 25% | /10 |
| QA Técnico | 15% | /10 |
| **Total** | **100%** | **/10** |

### Estados de Calidad

- **90-100**: ✅ Aprobada - Lista para entregar
- **80-89**: ⚠️ Aprobada con observaciones - Correcciones menores
- **70-79**: 🔶 Requiere mejoras - No entregar hasta corregir
- **60-69**: 🔴 Requiere rework - Trabajo significativo pendiente
- **< 60**: ❌ No aprobada - Rehacer desde el inicio

## Escenarios de Prueba del Agente

### Escenario 1: Bienvenida
```
Input: [Abrir chat]
Output Esperado: Mensaje de bienvenida con opciones
Calidad: [1-10]
```

### Escenario 2: Consulta de Servicios
```
Input: "¿Qué servicios ofrecen?"
Output Esperado: Lista de servicios reales del negocio
Calidad: [1-10]
```

### Escenario 3: Pregunta de Precio
```
Input: "¿Cuánto cuesta [servicio]?"
Output Esperado: Precio exacto del servicio
Calidad: [1-10]
```

### Escenario 4: Horarios
```
Input: "¿Cuáles son sus horarios?"
Output Esperado: Horarios exactos de atención
Calidad: [1-10]
```

### Escenario 5: Contacto
```
Input: "¿Cómo los puedo contactar?"
Output Esperado: Datos de contacto completos
Calidad: [1-10]
```

### Escenario 6: Captura de Lead
```
Input: "Me interesa, ¿cómo procedo?"
Output Esperado: Solicitud de datos de contacto
Calidad: [1-10]
```

### Escenario 7: Pregunta Fuera de Alcance
```
Input: "¿Venden autos?"
Output Esperado: "No sabemos sobre eso, pero podemos ayudarte con..."
Calidad: [1-10]
```

### Escenario 8: Queja
```
Input: "Tuve un problema con el servicio"
Output Esperado: Disculpas + derivación a humano
Calidad: [1-10]
```

## Plantilla de Reporte

```markdown
# Reporte de QA - [Nombre del Cliente]

**Fecha**: [Fecha]
**Evaluador**: [Nombre]
**Tenant ID**: [ID]
**URL de la Demo**: [URL]

## Resumen Ejecutivo
- **Puntuación Total**: [X]/100
- **Estado**: [Aprobada/Aprobada con observaciones/Requiere mejoras/Requiere rework/No aprobada]
- **Decisión**: [Entregar/Corregir/Rehacer]

## Resultados por Categoría

### QA Visual (30%) - [X]/10
- Diseño general: [X]/10
- Hero section: [X]/10
- Componentes Vengeance UI: [X]/10
- Navegación: [X]/10
- Formularios: [X]/10
- Footer: [X]/10

### QA Factual (30%) - [X]/10
- Información del negocio: [X]/10
- Servicios/Productos: [X]/10
- Información pública: [X]/10
- Contenido generado: [X]/10
- Agente conversacional: [X]/10

### QA Conversacional (25%) - [X]/10
- Bienvenida: [X]/10
- Respuestas: [X]/10
- Manejo de consultas: [X]/10
- Captura de leads: [X]/10
- Experiencia de usuario: [X]/10

### QA Técnico (15%) - [X]/10
- Build: [X]/10
- Errores: [X]/10
- Performance: [X]/10
- Seguridad: [X]/10
- SEO: [X]/10

## Problemas Encontrados

### Críticos (Bloquean entrega)
1. [Problema 1]
2. [Problema 2]

### Mayores (Requieren corrección)
1. [Problema 1]
2. [Problema 2]

### Menores (Correcciones opcionales)
1. [Problema 1]
2. [Problema 2]

## Aprobaciones

- [ ] QA Visual aprobado por: [Nombre]
- [ ] QA Factual aprobado por: [Nombre]
- [ ] QA Conversacional aprobado por: [Nombre]
- [ ] QA Técnico aprobado por: [Nombre]
- [ ] Aprobación final para entrega: [Nombre/Fecha]
```

## Errores Comunes

### Visual
- Responsive roto en móvil
- Colores inconsistentes con tokens
- Animaciones Vengeance UI no funcionan
- Formularios no funcionales

### Factual
- Precios incorrectos
- Horarios inventados
- Servicios inexistentes
- Datos de contacto viejos

### Conversacional
- Agente no responde
- Información incorrecta en respuestas
- No captura leads
- Tono inapropiado

### Técnico
- Build fallido
- Errores de consola
- Performance lenta
- Vulnerabilidades de seguridad

## Integración con Pipeline

### Después de QA Aprobado
1. Documentar en README del cliente
2. Notificar al responsable
3. Preparar para entrega
4. Agendar demo con cliente

### Si QA No Aprueba
1. Documentar problemas
2. Asignar correcciones
3. Re-programar QA
4. Notificar retraso