# Evaluación Conversacional - Sistema de QA

## Descripción
Evaluación de la calidad del agente conversacional integrado en la demo. Verifica que responda correctamente, sea útil y capture leads efectivamente.

## Checklist de Evaluación Conversacional

### 1. Bienvenida
- [ ] Mensaje de bienvenida claro
- [ ] Presentación del negocio
- [ ] Opciones disponibles
- [ ] Tono apropiado

### 2. Respuestas
- [ ] Respuestas relevantes
- [ ] Información correcta
- [ ] Sin invenciones
- [ ] Tono profesional

### 3. Manejo de Consultas
- [ ] Preguntas frecuentes respondidas
- [ ] Derivaciones correctas
- [ ] "No sé" cuando no sabe
- [ ] Seguimiento apropiado

### 4. Captura de Leads
- [ ] Solicita datos de contacto
- [ ] Datos completos
- [ ] Confirmación de recepción
- [ ] Seguimiento programado

### 5. Experiencia de Usuario
- [ ] Tiempos de respuesta aceptables
- [ ] Flujo natural
- [ ] Errores manejados
- [ ] Satisfacción general

## Escenarios de Prueba

### Escenario 1: Consulta Básica
```
Usuario: Hola, ¿qué servicios ofrecen?
Agente: [Respuesta esperada: Lista de servicios del negocio]
```

### Escenario 2: Pregunta de Precio
```
Usuario: ¿Cuánto cuesta el servicio X?
Agente: [Respuesta esperada: Precio exacto del servicio]
```

### Escenario 3: Horarios
```
Usuario: ¿Cuáles son sus horarios?
Agente: [Respuesta esperada: Horarios exactos]
```

### Escenario 4: Contacto
```
Usuario: ¿Cómo los puedo contactar?
Agente: [Respuesta esperada: Datos de contacto]
```

### Escenario 5: Captura de Lead
```
Usuario: Me interesa, ¿cómo procedo?
Agente: [Respuesta esperada: Solicita datos de contacto]
```

### Escenario 6: Pregunta Fuera de Alcance
```
Usuario: ¿Venden autos?
Agente: [Respuesta esperada: "No sabemos sobre eso, pero podemos ayudarte con..."]
```

### Escenario 7: Queja
```
Usuario: Tuve un problema con el servicio
Agente: [Respuesta esperada: Disculpas + derivación a humano]
```

## Métricas de Calidad

### Puntuación (0-100)

| Categoría | Peso | Puntuación |
|-----------|------|------------|
| Bienvenida | 15% | /10 |
| Respuestas | 30% | /10 |
| Manejo de consultas | 25% | /10 |
| Captura de leads | 20% | /10 |
| Experiencia de usuario | 10% | /10 |
| **Total** | **100%** | **/10** |

### Niveles de Calidad

- **90-100**: Excelente - Agente listo para producción
- **80-89**: Bueno - Menores ajustes necesarios
- **70-79**: Aceptable - Requiere mejoras
- **60-69**: Deficiente - Requiere rework significativo
- **< 60**: No aceptable - Rehacer agente

## Proceso de Evaluación

### Paso 1: Configuración (5 min)
1. Identificar tenant ID
2. Configurar entorno de prueba
3. Preparar escenarios
4. Documentar expectativas

### Paso 2: Pruebas (20 min)
1. Ejecutar cada escenario
2. Registrar respuestas
3. Evaluar calidad
4. Identificar problemas

### Paso 3: Análisis (10 min)
1. Calcular puntuación
2. Identificar patrones
3. Priorizar mejoras
4. Documentar hallazgos

### Paso 4: Reporte (5 min)
1. Generar reporte
2. Compartir con equipo
3. Planificar correcciones
4. Agendar re-evaluación

## Plantilla de Reporte

```markdown
# Reporte de Evaluación Conversacional

**Fecha**: [Fecha]
**Demo**: [Nombre del cliente]
**Evaluador**: [Nombre]
**Tenant ID**: [ID]

## Resumen
- Puntuación Total: [X]/100
- Nivel: [Excelente/Bueno/Aceptable/Deficiente/No aceptable]
- Estado: [Listo para producción/Requiere ajustes/Requiere rework]

## Pruebas Realizadas

### Escenario 1: Consulta Básica
- **Input**: "Hola, ¿qué servicios ofrecen?"
- **Output**: [Respuesta del agente]
- **Calidad**: [1-10]
- **Notas**: [Observaciones]

### Escenario 2: Pregunta de Precio
[Repetir formato]

### Escenario 3: Horarios
[Repetir formato]

### Escenario 4: Contacto
[Repetir formato]

### Escenario 5: Captura de Lead
[Repetir formato]

### Escenario 6: Pregunta Fuera de Alcance
[Repetir formato]

### Escenario 7: Queja
[Repetir formato]

## Hallazgos Críticos
1. [Problema 1]
2. [Problema 2]
3. [Problema 3]

## Mejoras Recomendadas
1. [Mejora 1]
2. [Mejora 2]
3. [Mejora 3]

## Métricas Adicionales
- Tiempo promedio de respuesta: [X]ms
- Tasa de respuestas correctas: [X]%
- Tasa de captura de leads: [X]%
- Satisfacción del evaluador: [X]/10
```

## Errores Comunes

### Respuestas
- Información incorrecta
- Invenciones del agente
- Respuestas genéricas
- Tono inapropiado

### Flujo
- No entiende la consulta
- Se pierde en la conversación
- No deriva correctamente
- No captura leads

### Técnico
- Tiempos de respuesta lentos
- Errores de conexión
- Respuestas cortadas
- Memory leaks

## Integración con Knowledge Base

### Verificación
1. Knowledge base completa
2. Información actualizada
3. Fuentes documentadas
4. Respuestas consistente

### Actualización
1. Detectar preguntas sin respuesta
2. Agregar nueva información
3. Re-entrenar agente
4. Re-evaluar

## Optimización del Agente

### Prompt Engineering
1. System prompt claro
2. Reglas de comportamiento
3. Ejemplos de respuestas
4. Manejo de errores

### Fine-tuning
1. Recopilar conversaciones
2. Identificar patrones
3. Ajustar respuestas
4. Medir mejoras