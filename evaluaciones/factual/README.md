# Evaluación Factual - Sistema de QA

## Descripción
Verificación de que toda la información presentada en la demo sea correcta, verificable y no inventada.

## Checklist de Evaluación Factual

### 1. Información del Negocio
- [ ] Nombre correcto y completo
- [ ] Dirección verificada
- [ ] Teléfono correcto
- [ ] Email correcto
- [ ] Horarios de atención correctos

### 2. Servicios/Productos
- [ ] Servicios listados correctamente
- [ ] Precios exactos (sin aproximar)
- [ ] Descripciones fieles
- [ ] Disponibilidad verificada

### 3. Información Pública
- [ ] Datos de Google Maps correctos
- [ ] Redes sociales verificadas
- [ ] Sitio web actual (si existe) referenciado correctamente
- [ ] Testimonios reales (no inventados)

### 4. Contenido Generado
- [ ] Textos basados en información real
- [ ] Imágenes autorizadas
- [ ] Sin contenido copiado sin permiso
- [ ] Fuentes citadas cuando aplica

### 5. Agente Conversacional
- [ ] Respuestas basadas en knowledge base
- [ ] No inventa información
- [ ] Deriva correctamente
- [ ] Captura datos reales

## Reglas Críticas

### NUNCA Inventar
1. **Precios**: Solo usar precios proporcionados por el cliente
2. **Horarios**: Solo usar horarios verificados
3. **Servicios**: Solo listar servicios reales
4. **Testimonios**: Solo usar testimonios aprobados
5. **Imágenes**: Solo usar imágenes autorizadas

### SIEMPRE Verificar
1. **Fuentes**: Cada dato debe tener una fuente
2. **Actualización**: Información reciente
3. **Consistencia**: Datos coherentes en toda la web
4. **Legal**: Cumplir normativas de publicidad

## Proceso de Verificación

### Paso 1: Recopilación (15 min)
1. Revisar brief del cliente
2. Verificar información en Google Maps
3. Revisar redes sociales
4. Consultar sitio web actual

### Paso 2: Validación (10 min)
1. Cruzar información de múltiples fuentes
2. Confirmar con el cliente (si es necesario)
3. Marcar información no verificada
4. Documentar fuentes

### Paso 3: Implementación (20 min)
1. Cargar solo información verificada
2. Revisar cada sección
3. Probar agente conversacional
4. Verificar consistencia

### Paso 4: Auditoría Final (10 min)
1. Revisar toda la web
2. Probar formularios
3. Verificar agente
4. Documentar hallazgos

## Métricas de Calidad

### Puntuación (0-100)

| Categoría | Peso | Puntuación |
|-----------|------|------------|
| Información del negocio | 30% | /10 |
| Servicios/Productos | 25% | /10 |
| Información pública | 20% | /10 |
| Contenido generado | 15% | /10 |
| Agente conversacional | 10% | /10 |
| **Total** | **100%** | **/10** |

### Niveles de Calidad

- **95-100**: Perfecta - Toda la información verificada
- **90-94**: Excelente - Menores inconsistencias
- **80-89**: Buena - Algunos datos por verificar
- **70-79**: Aceptable - Información parcial
- **< 70**: No aceptable - Mucha información inventada

## Plantilla de Verificación

```markdown
# Verificación Factual

**Fecha**: [Fecha]
**Demo**: [Nombre del cliente]
**Verificador**: [Nombre]

## Fuentes Utilizadas
1. Google Maps: [URL]
2. Instagram: [URL]
3. Facebook: [URL]
4. Sitio web: [URL]
5. Información del cliente: [Documento]

## Información Verificada

### Datos del Negocio
- Nombre: [Verificado ✓]
- Dirección: [Verificado ✓]
- Teléfono: [Verificado ✓]
- Email: [Verificado ✓]
- Horarios: [Verificado ✓]

### Servicios
- Servicio 1: [Verificado ✓] - Precio: $[X]
- Servicio 2: [Verificado ✓] - Precio: $[X]
- Servicio 3: [Verificado ✓] - Precio: $[X]

### Información No Verificada
- [Dato 1]: [Razón]
- [Dato 2]: [Razón]

## Hallazgos
1. [Problema 1]
2. [Problema 2]

## Recomendaciones
1. [Recomendación 1]
2. [Recomendación 2]
```

## Errores Comunes

### Información Inventada
- Precios aproximados sin confirmar
- Horarios "generales" sin especificar
- Servicios que no existen
- Testimonios ficticios

### Información Desactualizada
- Números de teléfono viejos
- Direcciones incorrectas
- Precios que ya no aplican
- Servicios discontinuados

### Información Inconsistente
- Datos diferentes en distintas secciones
- Contradicciones en horarios
- Precios que no coinciden
- Descripciones conflictivas

## Integración con Agente

### Knowledge Base
- Solo cargar información verificada
- Marcar fuentes
- Actualizar regularmente
- Revisar respuestas del agente

### Prompts del Agente
- Instrucción de no inventar
- Referencia a fuentes
- Manejo de "no sé"
- Derivación a humano