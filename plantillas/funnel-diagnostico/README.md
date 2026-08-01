# Diagnostic Funnel Template

## Descripción
Template para captar leads con un diagnóstico gratuito de presencia web. Ideal para agencias, consultores y profesionales de marketing digital.

## Estructura

```
1. Hero Section
   - Título: "Diagnóstico Gratuito"
   - Subtítulo: "Descubrí cómo mejorar tu presencia online"
   - CTA: "Obtener Diagnóstico"
   - Elementos visuales impactantes

2. Problema
   - Identificación del problema común
   - Estadísticas impactantes
   - Consecuencias de no actuar
   - Empatía con el visitante

3. Solución
   - Cómo se resuelve el problema
   - Beneficios de actuar
   - Metodología simple
   - Resultados esperados

4. Formulario Diagnóstico
   - Nombre del negocio
   - Tipo de negocio
   - Sitio web actual (opcional)
   - Problemas principales (checkbox)
   - Datos de contacto

5. Beneficios
   - Lista de beneficios clave
   - Iconos descriptivos
   - Comparativa antes/después
   - Garantías

6. Preguntas Frecuentes (opcional)
   - Acordeón de FAQs
   - Resolución de objeciones
   - Información adicional
```

## Personalización

### Colores
- **Primario**: Color de confianza (azul, verde)
- **Secundario**: Color de acción (naranja, amarillo)
- **Fondo**: Oscuro para impacto visual

### Contenido Requerido
- Título del diagnóstico
- Problema que se resuelve
- Beneficios claros
- Formulario funcional
- Call to action fuerte

### Contenido Opcional
- Testimonios de clientes anteriores
- Casos de éxito
- Estadísticas de resultados
- Video explicativo

## Componentes Necesarios

```typescript
const requiredComponents = [
  'hero-particles',
  'section-problem',
  'section-solution',
  'section-diagnostic-form',
  'section-benefits',
];

const optionalComponents = [
  'section-faq',
  'section-testimonials',
];
```

## Tiempo Estimado de Construcción

- **Configuración inicial**: 10 minutos
- **Redacción de contenido**: 20 minutos
- **Configuración del formulario**: 15 minutos
- **Ajustes de diseño**: 10 minutos
- **QA y pruebas**: 10 minutos
- **Total**: ~65 minutos

## Flujo del Lead

```
1. Visitante llega a la página
2. Lee el problema identificado
3. Comprende la solución
4. Completa el formulario
5. Recibe diagnóstico por email/WhatsApp
6. Se convierte en cliente potencial
```

## Formulario de Diagnóstico

### Campos Requeridos
- Nombre del negocio (text)
- Tipo de negocio (select)
- Sitio web actual (url, opcional)
- Principales problemas (checkboxes):
  - No tengo web
  - Mi web es lenta
  - No aparece en Google
  - No convierte visitantes
  - No está adaptada a móvil
  - Otro
- Nombre completo (text)
- Email (email)
- Teléfono (tel)
- Mejor hora para contactar (select)

### Validación
- Email válido
- Teléfono válido
- Al menos un problema seleccionado
- Nombre del negocio no vacío

## Ejemplo de Uso

```typescript
import { Template } from '../design-system/templates/templates';

const diagnosticTemplate: Template = {
  id: 'diagnostic-funnel',
  name: 'Funnel Diagnóstico',
  // ... configuración
};
```

## Notas para el Agente

1. **Enfocarse** en el problema del visitante
2. **Usar** estadísticas reales cuando sea posible
3. **Mantener** el formulario corto (máximo 7 campos)
4. **Incluir** prueba social
5. **Crear** urgencia para que actúe ahora