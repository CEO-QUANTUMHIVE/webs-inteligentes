# Knowledge Base - Agent Runtime

## Descripción
Sistema de gestión de conocimiento para los agentes conversacionales. Almacena y organiza la información del negocio para que el agente pueda responder preguntas.

## Estructura de Datos

```typescript
interface KnowledgeBase {
  tenantId: string;
  business: BusinessInfo;
  services: Service[];
  products: Product[];
  faq: FAQ[];
  hours: BusinessHours[];
  contact: ContactInfo;
  social: SocialMedia[];
  custom: CustomKnowledge[];
}

interface BusinessInfo {
  name: string;
  description: string;
  category: string;
  location: string;
  founded?: number;
  mission?: string;
  vision?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  duration?: string;
  category: string;
  available: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
  available: boolean;
  stock?: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sources?: string[];
}

interface BusinessHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  open: string;
  close: string;
  closed: boolean;
}

interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  mapUrl?: string;
}

interface SocialMedia {
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
  url: string;
  handle?: string;
}

interface CustomKnowledge {
  key: string;
  value: string;
  category: string;
}
```

## Fuentes de Información

### 1. Información Pública Verificable
- Google Maps
- Redes sociales del negocio
- Sitio web actual (si existe)
- Directorios de negocios

### 2. Información del Cliente
- Formulario de diagnóstico
- Reuniones de kickoff
- Documentos proporcionados

### 3. Investigación del Agente
- Análisis de competidores
- Tendencias del sector
- Mejores prácticas

## Flujo de Captura

```
1. Descubrimiento del negocio
2. Recopilación de información pública
3. Verificación de datos
4. Estructuración en Knowledge Base
5. Revisión humana
6. Carga al sistema
7. Pruebas del agente
8. Ajustes según feedback
```

## Plantillas de Conocimiento

### Para Restaurantes
```typescript
const restaurantKnowledge = {
  categories: ['menú', 'bebidas', 'servicios', 'reservas'],
  requiredFields: ['menú', 'horarios', 'ubicación', 'contacto'],
  optionalFields: ['chef', 'historia', 'eventos', 'catering'],
};
```

### Para Servicios
```typescript
const serviceKnowledge = {
  categories: ['servicios', 'precios', 'profesionales', 'turnos'],
  requiredFields: ['servicios', 'horarios', 'ubicación', 'contacto'],
  optionalFields: ['equipo', 'certificaciones', 'garantías'],
};
```

### Para E-commerce
```typescript
const ecommerceKnowledge = {
  categories: ['productos', 'categorías', 'envíos', 'pagos'],
  requiredFields: ['productos', 'precios', 'envíos', 'contacto'],
  optionalFields: ['ofertas', 'programa de puntos', 'mayoristas'],
};
```

## Prompts del Agente

### System Prompt Base
```
Sos el asistente virtual de {business.name}, un {business.category} ubicado en {business.location}.

Tu función es:
- Responder preguntas sobre el negocio
- Informar sobre servicios y precios
- Ayudar a los clientes a encontrar lo que necesitan
- Capturar contactos de clientes potenciales

Reglas:
- Solo usá información verificada de la knowledge base
- No inventes precios, horarios ni servicios
- Si no sabés algo, decí que vas a consultar
- Sé amable y profesional
- Orientá al cliente hacia una acción concreta
```

### Prompt de Bienvenida
```
¡Hola! Soy el asistente virtual de {business.name}. 
¿En qué puedo ayudarte hoy?

Podés preguntarme sobre:
- Nuestros servicios y precios
- Horarios de atención
- Cómo llegar
- Disponibilidad de turnos
```

## Gestión de Actualizaciones

### Frecuencia
- **Horarios**: Actualizar cuando cambien
- **Precios**: Actualizar cuando cambien
- **Servicios**: Actualizar al agregar/quitar
- **FAQ**: Actualizar según preguntas frecuentes

### Proceso
1. Detectar cambio necesario
2. Recopilar nueva información
3. Verificar fuente
4. Actualizar knowledge base
5. Probar agente
6. Documentar cambio

## Métricas

- **Preguntas respondidas**: Cuántas preguntas resuelve el agente
- **Preguntas sin respuesta**: Cuántas no puede responder
- **Satisfacción**: Rating de los usuarios
- **Conversiones**: Leads capturados vía chat
- **Tiempo promedio**: Duración de conversaciones