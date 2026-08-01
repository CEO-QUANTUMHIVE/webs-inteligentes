# Web Factory - Pipeline de Trabajo

## Flujo General

```
Google Maps → Descubrimiento → Calificación → Auditoría → Generación Demo → Configuración Agente → QA → Aprobación → Propuesta → Seguimiento
```

## Fases Detalladas

### 1. Descubrimiento
**Agente**: Lead Finder
**Fuente**: Google Maps
**Acción**: Identificar negocios sin web o con web deficiente
**Datos**: Nombre, categoría, dirección, teléfono, horarios, sitio actual

### 2. Calificación
**Criterios**:
- No tiene sitio web O tiene sitio antiguo/lento/no móvil
- Responde repetidamente las mismas preguntas
- Puede beneficiarse de agente conversacional
- Capacidad de pago identificable
- Facilidad de contacto verificable

### 3. Auditoría
**Agente**: Site Auditor
**Verificaciones**:
- ¿Existe sitio web actual?
- ¿Es responsive/móvil?
- ¿Es rápido?
- ¿Convierte visitas en consultas?
- ¿Tiene información correcta?
- ¿Qué tecnología usa?

### 4. Generación de Demo
**Agente**: Web Builder
**Proceso**:
1. Normalizar brief del cliente
2. Seleccionar plantilla base (ecommerce, servicios, funnel)
3. Aplicar identidad visual (colores, logo, tipografía)
4. Reemplazar contenido dummy con información real
5. Configurar agente conversacional básico
6. Generar URL de revisión

### 5. Configuración del Agente
**Agente**: Conversation Agent Builder
**Componentes**:
- Prompt del agente con personalidad del negocio
- Base de conocimiento (servicios, horarios, precios)
- Preguntas frecuentes con respuestas citadas
- Flujo de captura de leads
- Integración con web widget

### 6. QA (Quality Assurance)
**Agente**: Site Auditor
**Checklist**:
- [ ] Responsive en móvil
- [ ] Responsive en escritorio
- [ ] Sin información inventada
- [ ] Botones y formularios funcionales
- [ ] Velocidad aceptable
- [ ] Accesibilidad básica
- [ ] Agente responde correctamente
- [ ] Captura de leads funciona
- [ ] Sin errores de consola

### 7. Aprobación Humana
**Requiere**: Sergio
**Verifica**:
- Calidad visual
- Exactitud de información
- Propuesta comercial adecuada
- Aprobación para enviar

### 8. Propuesta Comercial
**Agente**: Proposal Composer
**Componentes**:
- Diagnóstico del sitio actual
- Beneficios de la nueva web
- Incluye agente conversacional
- Precio y condiciones
- Próximos pasos

### 9. Seguimiento
**Agente**: CRM Follow-up
**Registro**:
- Estado del prospecto
- Respuesta recibida
- Reunión agendada
- Próximos pasos
- Notas adicionales

## Métricas por Fase

| Fase | Métrica | Objetivo |
|------|---------|----------|
| Descubrimiento | Leads encontrados/día | 10-20 |
| Calificación | Tasa de calificación | 30-40% |
| Auditoría | Auditorías completadas/día | 5-10 |
| Generación | Tiempo por demo | < 2 horas |
| QA | Tasa de aprobación primer intento | > 80% |
| Propuesta | Tasa de respuesta | > 25% |
| Cierre | Tasa de cierre | > 15% |

## Iteraciones del Pipeline

### MVP (Semanas 1-2)
- 10 prospectos manuales
- Demos con plantilla única
- QA manual completo
- Propuestas escritas a mano

### Escala Inicial (Semanas 3-4)
- 20 prospectos por semana
- 2-3 plantillas disponibles
- QA semiautomático
- Propuestas generadas con template

### Escala Avanzada (Mes 2+)
- 50+ prospectos por semana
- Múltiples plantillas
- QA automatizado
- Pipeline completamente documentado