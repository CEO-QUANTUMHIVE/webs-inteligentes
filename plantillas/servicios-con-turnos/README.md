# Services Booking Template

## Descripción
Template para negocios de servicios con sistema de reservas/turnos. Ideal para barberías, peluquerías, consultorios, studios de yoga, etc.

## Estructura

```
1. Hero Section
   - Título principal
   - Subtítulo
   - CTA para reservar turno
   - Imagen/fondo relacionada

2. Servicios
   - Grid de servicios
   - Nombre, descripción, precio
   - Duración estimada
   - Botón "Reservar"

3. Sistema de Turnos
   - Calendario disponible
   - Selección de fecha
   - Selección de hora
   - Selección de profesional (opcional)
   - Formulario de contacto

4. Nuestro Equipo (opcional)
   - Cards de profesionales
   - Foto, nombre, especialidad
   - Disponibilidad

5. Galería (opcional)
   - Grid de fotos
   - Antes/después
   - Trabajos realizados

6. Testimonios (opcional)
   - Carrusel de testimonios
   - Foto, nombre, texto

7. Contacto
   - Información del negocio
   - Mapa
   - Horarios
```

## Personalización

### Colores
- **Primario**: Color principal de la marca
- **Secundario**: Color de acento
- **Fondo**: Oscuro (default) o claro

### Contenido Requerido
- Nombre del negocio
- Lista de servicios con precios
- Horarios de atención
- Información de contacto
- Profesionales disponibles

### Contenido Opcional
- Galería de fotos
- Testimonios
- Preguntas frecuentes
- Redes sociales

## Componentes Necesarios

```typescript
const requiredComponents = [
  'hero-glassmorphism',
  'card-services-grid',
  'section-booking',
  'section-contact-form',
];

const optionalComponents = [
  'section-team',
  'section-gallery',
  'section-testimonials',
  'section-faq',
];
```

## Tiempo Estimado de Construcción

- **Configuración inicial**: 20 minutos
- **Personalización de servicios**: 25 minutos
- **Configuración de turnos**: 30 minutos
- **Ajustes de diseño**: 20 minutos
- **QA y pruebas**: 25 minutos
- **Total**: ~120 minutos

## Sistema de Reservas

### Opción 1: Formulario Simple
- Cliente selecciona servicio
- Elige fecha y hora preferida
- Deja datos de contacto
- Negocio confirma por WhatsApp/email

### Opción 2: Calendario Integrado
- Calendario interactivo
- Slots disponibles en tiempo real
- Reserva instantánea
- Confirmación automática

## Ejemplo de Uso

```typescript
import { Template } from '../design-system/templates/templates';

const servicesTemplate: Template = {
  id: 'services-booking',
  name: 'Servicios con Turnos',
  // ... configuración
};
```

## Notas para el Agente

1. **Verificar** que los servicios estén claramente definidos
2. **Solicitar** precios y duraciones reales
3. **Confirmar** horarios de atención exactos
4. **No inventar** disponibilidad
5. **Incluir** instrucciones claras para reservar