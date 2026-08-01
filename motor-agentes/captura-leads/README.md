# Lead Capture - Agent Runtime

## Descripción
Sistema para capturar y gestionar leads generados a través del agente conversacional. Registra contactos, califica leads y facilita el seguimiento.

## Estructura de Datos

```typescript
interface Lead {
  id: string;
  tenantId: string;
  timestamp: Date;
  source: 'web-chat' | 'whatsapp' | 'form' | 'phone';
  contact: ContactInfo;
  qualification: LeadQualification;
  conversation: ConversationSummary;
  status: LeadStatus;
  assignedTo?: string;
  notes: Note[];
  tags: string[];
}

interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  company?: string;
  position?: string;
}

interface LeadQualification {
  score: number; // 0-100
  level: 'hot' | 'warm' | 'cold';
  intent: 'buying' | 'info' | 'comparison' | 'just-looking';
  budget?: 'low' | 'medium' | 'high' | 'unknown';
  timeline?: 'immediate' | '1-3months' | '3-6months' | 'unknown';
}

interface ConversationSummary {
  duration: number; // minutos
  messages: number;
  topics: string[];
  questions: string[];
  objections: string[];
  nextStep?: string;
}

type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal-sent'
  | 'negotiating'
  | 'closed-won'
  | 'closed-lost'
  | 'follow-up';

interface Note {
  id: string;
  timestamp: Date;
  content: string;
  author: string;
}
```

## Flujo de Captura

```
1. Visitante inicia conversación
2. Agente identifica intención
3. Agente solicita datos de contacto
4. Lead se registra en sistema
5. Lead se califica automáticamente
6. Lead se asigna a responsable
7. Se inicia seguimiento
```

## Estrategias de Captura

### 1. Captura Directa
El agente solicita datos explícitamente:
```
"¿Me podés dejar tu nombre y teléfono para que te contactemos?"
```

### 2. Captura Indirecta
Se infiere información de la conversación:
- Nombre mencionado
- Tipo de negocio
- Necesidades expresadas

### 3. Captura por Formulario
Formulario embebido en la web:
- Nombre
- Email
- Teléfono
- Mensaje
- Servicio de interés

## Calificación Automática

### Score de Calificación (0-100)

| Factor | Puntos | Descripción |
|--------|--------|-------------|
| Intención de compra | 0-30 | Qué tan claro está que quiere comprar |
| Presupuesto | 0-25 | Si tiene definido su presupuesto |
| Timeline | 0-20 | Cuándo quiere implementar |
| Datos completos | 0-15 | Si proporcionó toda la información |
| Interacción | 0-10 | Calidad de la conversación |

### Niveles

- **Hot (80-100)**: Listo para comprar, contactar inmediatamente
- **Warm (50-79)**: Interesado, requiere seguimiento
- < 50**: Solo explorando, nutrir con contenido

## Integraciones

### Email
- Confirmación automática de recepción
- Nutrición con contenido relevante
- Seguimiento programado

### WhatsApp
- Mensaje de bienvenida
- Recordatorios
- Follow-up

### CRM
- Sincronización bidireccional
- Actualización de estado
- Historial completo

## Dashboard de Leads

### Métricas Principales
- Leads totales por período
- Leads por fuente
- Tasa de conversión por etapa
- Tiempo promedio de cierre
- Valor promedio por lead

### Filtros
- Por fecha
- Por fuente
- Por estado
- Por calificación
- Por responsable

## Automatizaciones

### 1. Lead Nuevo
```
Si lead.score > 50:
  → Notificar a responsable por WhatsApp
  → Enviar email de bienvenida
  → Agregar a cola de seguimiento
```

### 2. Lead Sin Respuesta
```
Si lead.status == 'contacted' Y daysSince > 3:
  → Enviar recordatorio
  → Actualizar estado a 'follow-up'
```

### 3. Lead Caliente
```
Si lead.score > 80:
  → Notificación urgente
  → Asignar a vendedor senior
  → Priorizar respuesta
```

## Plantillas de Mensajes

### Bienvenida
```
¡Hola {name}! Gracias por contactarnos. 
Recibimos tu consulta sobre {topic}.
Te vamos a responder a la brevedad.
```

### Seguimiento
```
Hola {name}, ¿todo bien?
Quería saber si tuviste oportunidad de revisar 
la propuesta que te enviamos.
¿Tenés alguna consulta?
```

### Confirmación
```
¡Perfecto {name}! 
Tu consulta ha sido registrada.
Nuestro equipo te contactará en las próximas 24 horas.
```