# Provider Router - Agent Runtime

## Descripción
Sistema de enrutamiento que gestiona conexiones con múltiples proveedores de modelos de IA. Permite usar diferentes modelos según el caso de uso, costo y disponibilidad.

## Arquitectura

```
Widget Web → Provider Router → Azure OpenAI / Otros → Respuesta
```

## Proveedores Soportados

### 1. Azure OpenAI (Principal)
- **Modelos**: GPT-4.1-mini, GPT-4.1, GPT-4o
- **Uso**: Conversaciones principales
- **Costo**: Por tokens
- **Cuota**: Según suscripción

### 2. Azure OpenAI (Backup)
- **Modelos**: GPT-4.1-mini
- **Uso**: Fallback cuando el principal falla
- **Costo**: Por tokens
- **Cuota**: Reserva

### 3. ElevenLabs (Futuro)
- **Modelos**: Voces sintéticas
- **Uso**: Agentes con voz
- **Costo**: Por caracteres
- **Cuota**: Según plan

## Configuración

```typescript
interface ProviderConfig {
  providers: Provider[];
  routing: RoutingRules;
  fallback: FallbackConfig;
  rateLimit: RateLimitConfig;
}

interface Provider {
  id: string;
  type: 'azure-openai' | 'elevenlabs' | 'custom';
  apiKey: string;
  endpoint: string;
  models: Model[];
  priority: number;
  enabled: boolean;
}

interface Model {
  id: string;
  name: string;
  maxTokens: number;
  costPer1kTokens: {
    input: number;
    output: number;
  };
  capabilities: string[];
}

interface RoutingRules {
  defaultProvider: string;
  rules: RoutingRule[];
}

interface RoutingRule {
  condition: {
    type: 'model' | 'capability' | 'cost' | 'load';
    value: string;
  };
  provider: string;
}

interface FallbackConfig {
  enabled: boolean;
  maxRetries: number;
  retryDelay: number;
}

interface RateLimitConfig {
  requestsPerMinute: number;
  tokensPerMinute: number;
  tokensPerDay: number;
}
```

## Estrategias de Enrutamiento

### 1. Por Defecto
```
Conversación normal → Azure OpenAI (GPT-4.1-mini)
```

### 2. Por Capacidad
```
Necesita voz → ElevenLabs
Necesita código → GPT-4.1
Conversación simple → GPT-4.1-mini
```

### 3. Por Costo
```
Presupuesto bajo → GPT-4.1-mini
Presupuesto medio → GPT-4.1-mini
Presupuesto alto → GPT-4.1
```

### 4. Por Carga
```
Alta demanda → Distribuir entre providers
Baja demanda → Usar provider principal
```

## Flujo de una Petición

```
1. Widget envía mensaje
2. Router verifica rate limits
3. Router selecciona provider según reglas
4. Router envía petición al provider
5. Provider responde
6. Router procesa respuesta
7. Router actualiza métricas
8. Router retorna respuesta al widget
```

## Gestión de Errores

### Errores Comunes

| Error | Causa | Acción |
|-------|-------|--------|
| 429 | Rate limit | Reintentar con delay |
| 500 | Error del servidor | Fallback a otro provider |
| 503 | Servicio no disponible | Fallback a otro provider |
| 401 | API key inválida | Notificar admin |
| 400 | Request inválido | Log y retornar error |

### Estrategia de Reintentos

```typescript
const retryStrategy = {
  maxRetries: 3,
  delays: [1000, 2000, 4000], // ms
  backoffMultiplier: 2,
  retryOn: [429, 500, 503],
};
```

## Monitoreo y Métricas

### Métricas por Provider
- Requests totales
- Tokens consumidos
- Tiempo promedio de respuesta
- Tasa de errores
- Costo acumulado

### Métricas por Modelo
- Uso por modelo
- Calidad de respuestas
- Satisfacción del usuario

### Dashboard
```typescript
interface Metrics {
  requests: {
    total: number;
    successful: number;
    failed: number;
  };
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  cost: {
    total: number;
    byProvider: Record<string, number>;
  };
  latency: {
    average: number;
    p95: number;
    p99: number;
  };
}
```

## Seguridad

### API Keys
- Almacenar en variables de entorno
- Nunca exponer en frontend
- Rotar periódicamente
- Usar diferentes keys por entorno

### Rate Limiting
- Limitar requests por IP
- Limitar tokens por usuario
- Detectar abusos
- Bloquear usuarios problemáticos

### Logging
- Log de todas las peticiones
- Sin datos sensibles
- Retención configurable
- Análisis de patrones

## Roadmap

### Fase 1 (MVP)
- [x] Azure OpenAI integration
- [x] Rate limiting básico
- [x] Métricas básicas

### Fase 2
- [ ] Múltiples providers
- [ ] Routing inteligente
- [ ] Cache de respuestas

### Fase 3
- [ ] ElevenLabs integration
- [ ] Voz en tiempo real
- [ ] Avatar hablante