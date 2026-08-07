# Vision

> Web Factory es un framework de adquisición, análisis, reconstrucción y producción de experiencias web.

## Propósito
Este sistema no se limita a copiar HTML. Analiza estructura, diseño, comportamiento, animaciones y experiencia de usuario para transformar referencias externas en conocimiento estructurado. A partir de este conocimiento, produce proyectos editables y activos reutilizables.

El framework está diseñado para:
* Ser utilizado por distintos orquestadores.
* No depender de OpenCode, Antigravity, Claude Code, Codex, Gemini, Cursor ni de un modelo específico.
* Admitir ejecución manual sobre una URL y ejecución masiva mediante proveedores de catálogos.
* Mantener aprobación humana en los puntos sensibles.
* Respetar términos de servicio, permisos, propiedad intelectual, límites de velocidad y restricciones de cada proveedor.

## Principios Centrales

1. **Model agnostic**
   El conocimiento pertenece al framework y a sus artefactos, no al modelo utilizado.

2. **Artifact-driven**
   Los agentes intercambian artefactos persistentes y versionados. No dependen de conversaciones directas entre agentes.

3. **Resumable by default**
   Una ejecución fallida puede continuar desde el último artefacto válido sin repetir todo el pipeline.

4. **Single responsibility**
   Cada agente, skill y herramienta tiene una responsabilidad acotada.

5. **Observable and auditable**
   Cada etapa registra entradas, salidas, estado, errores y evidencias.

6. **Human-governed**
   Acciones comerciales, publicación, contacto con terceros y adquisición masiva requieren reglas y controles explícitos.

7. **Provider-independent**
   Los catálogos externos se integran mediante adaptadores que implementarán un contrato común.

8. **Reconstruction, not blind copying**
   El resultado debe ser un proyecto limpio, mantenible y editable, no una descarga desordenada del código de terceros.
