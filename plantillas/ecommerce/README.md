# E-commerce Template

## Descripción
Template para tiendas online con catálogo de productos. Ideal para negocios que venden productos físicos o digitales.

## Estructura

```
1. Hero Section
   - Título principal
   - Subtítulo
   - CTA principal
   - Imagen/fondo destacado

2. Productos Destacados
   - Grid de productos (3-6)
   - Imagen, nombre, precio
   - Botón "Ver más"

3. Categorías (opcional)
   - Grid de categorías
   - Icono + nombre
   - Conteo de productos

4. Testimonios (opcional)
   - Carrusel de testimonios
   - Foto, nombre, texto
   - Estrellas de calificación

5. Call to Action
   - Mensaje de urgencia
   - Beneficios clave
   - Botón de acción

6. Contacto
   - Formulario de contacto
   - Información del negocio
   - Mapa (opcional)
```

## Personalización

### Colores
- **Primario**: Color principal de la marca
- **Secundario**: Color de acento
- **Fondo**: Oscuro (default) o claro

### Contenido Requerido
- Nombre del negocio
- Logo (opcional pero recomendado)
- Descripción breve
- Lista de productos/categorías
- Información de contacto
- Horarios de atención

### Contenido Opcional
- Testimonios de clientes
- Galería de fotos
- Preguntas frecuentes
- Redes sociales

## Componentes Necesarios

```typescript
const requiredComponents = [
  'hero-animated-rays',
  'card-product-grid',
  'section-cta',
  'section-contact-form',
];

const optionalComponents = [
  'section-categories',
  'section-testimonials',
  'section-faq',
];
```

## Tiempo Estimado de Construcción

- **Configuración inicial**: 15 minutos
- **Personalización de contenido**: 30 minutos
- **Ajustes de diseño**: 20 minutos
- **QA y pruebas**: 15 minutos
- **Total**: ~80 minutos

## Ejemplo de Uso

```typescript
import { Template } from '../design-system/templates/templates';

const ecommerceTemplate: Template = {
  id: 'ecommerce-basic',
  name: 'E-commerce Básico',
  // ... configuración
};
```

## Notas para el Agente

1. **Siempre verificar** que el cliente tenga productos claros
2. **Solicitar** al menos 3 productos destacados
3. **Incluir** información de contacto real
4. **No inventar** precios ni descripciones
5. **Validar** que el formulario funcione