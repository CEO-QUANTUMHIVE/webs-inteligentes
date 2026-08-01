# Web Widget - Agent Runtime

## Descripción
Widget de chat para integrar en las demos de Web Factory. Permite a los visitantes interactuar con un agente conversacional directamente desde la web.

## Arquitectura

```
Widget Web → API QuantumHive → Agente → Respuesta
```

## Componentes

### 1. Widget UI
- Botón flotante para abrir chat
- Ventana de chat responsive
- Animaciones de apertura/cierre
- Indicador de "escribiendo..."
- Historial de mensajes

### 2. Motor de Mensajes
- Envío de mensajes en tiempo real
- Recepción de respuestas
- Manejo de errores
- Reintentos automáticos
- Timeout configurable

### 3. Integración con Backend
- Conexión a API QuantumHive
- Autenticación por tenant_id
- Headers de seguridad
- Logging de mensajes

## Configuración

```typescript
interface WidgetConfig {
  tenantId: string;
  apiEndpoint: string;
  position: 'bottom-right' | 'bottom-left';
  theme: 'dark' | 'light';
  primaryColor: string;
  greeting: string;
  placeholder: string;
  showBranding: boolean;
}
```

## Ejemplo de Implementación

```tsx
import { WebWidget } from './components/WebWidget';

function App() {
  return (
    <div>
      {/* Resto de la web */}
      
      <WebWidget
        tenantId="cliente-123"
        apiEndpoint="https://api.quantumhive.com.ar/chat"
        position="bottom-right"
        theme="dark"
        primaryColor="#00d4ff"
        greeting="¡Hola! ¿En qué puedo ayudarte?"
        placeholder="Escribí tu mensaje..."
        showBranding={true}
      />
    </div>
  );
}
```

## API del Widget

### Eventos

```typescript
// Cuando se abre el chat
widget.on('open', () => {});

// Cuando se cierra el chat
widget.on('close', () => {});

// Cuando se envía un mensaje
widget.on('message', (message: Message) => {});

// Cuando se recibe una respuesta
widget.on('response', (response: Response) => {});

// Cuando hay un error
widget.on('error', (error: Error) => {});
```

### Métodos

```typescript
// Abrir el chat
widget.open();

// Cerrar el chat
widget.close();

// Enviar un mensaje programáticamente
widget.sendMessage('Hola');

// Obtener historial
const history = widget.getHistory();

// Limpiar historial
widget.clearHistory();
```

## Estilos

### Posición
- **bottom-right**: Esquina inferior derecha (default)
- **bottom-left**: Esquina inferior izquierda

### Temas
- **dark**: Fondo oscuro, texto claro
- **light**: Fondo claro, texto oscuro

### Personalización
- Color primario personalizable
- Texto de saludo personalizable
- Placeholder personalizable
- Branding visible/oculto

## Métricas a Capturar

1. **Aperturas del chat**: Cuántas veces se abre
2. **Mensajes enviados**: Volumen de conversación
3. **Tiempo de respuesta**: Latencia del agente
4. **Satisfacción**: Rating post-conversación
5. **Conversiones**: Leads capturados

## Roadmap

### Fase 1 (MVP)
- [x] Widget básico de chat
- [ ] Conexión a API
- [ ] Mensajes en tiempo real

### Fase 2
- [ ] Historial persistente
- [ ] Archivos adjuntos
- [ ] Calificación de respuestas

### Fase 3
- [ ] Integración WhatsApp
- [ ] Voz
- [ ] Avatar