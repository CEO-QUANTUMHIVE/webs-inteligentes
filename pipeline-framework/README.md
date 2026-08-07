# Pipeline Framework

**Estado actual:** Arquitectura inicial, sin implementación.

## Propósito
Proveer una base arquitectónica modular, escalable y mantenible para el pipeline de adquisición, análisis, reconstrucción y producción de experiencias web.

## Alcance
Este framework abarca la definición de contratos lógicos, esquemas de validación, herramientas deterministas, flujos de trabajo declarativos, y los motores centrales de ejecución para Web Factory. 

## Principios Arquitectónicos
1. **Model agnostic:** El conocimiento pertenece al framework y a sus artefactos, no al modelo utilizado.
2. **Artifact-driven:** Los agentes intercambian artefactos persistentes y versionados. No dependen de conversaciones directas.
3. **Resumable by default:** Una ejecución fallida puede continuar desde el último artefacto válido sin repetir todo.
4. **Single responsibility:** Cada agente, skill y herramienta tiene una responsabilidad acotada.
5. **Observable and auditable:** Cada etapa registra entradas, salidas, estado, errores y evidencias.
6. **Human-governed:** Acciones sensibles (publicación, contacto con terceros, adquisición masiva) requieren reglas y controles explícitos.
7. **Provider-independent:** Catálogos externos se integran mediante adaptadores que implementarán un contrato común.
8. **Reconstruction, not blind copying:** El resultado debe ser un proyecto limpio, mantenible y editable, no una descarga desordenada.

## Motores Centrales
* **Discovery Engine:** Encargado de identificar oportunidades, fuentes y referencias web útiles para análisis.
* **Acquisition Engine:** Captura, parsea y transforma la información cruda desde fuentes externas usando adaptadores de proveedores.
* **Reconstruction Engine:** Analiza y reconstruye el contenido estructurado en base a las reglas de negocio (layout, diseño, UX, animaciones).
* **Factory Engine:** Genera el código final (Next.js, Tailwind) asegurando la limpieza y escalabilidad del proyecto resultante.

## Índice de Documentación
* [Vision](docs/VISION.md)
* [Architecture](docs/ARCHITECTURE.md)
* [Pipeline](docs/PIPELINE.md)
* [Agents](docs/AGENTS.md)
* [Skills](docs/SKILLS.md)
* [Workflows](docs/WORKFLOWS.md)
* [Contracts](docs/CONTRACTS.md)
* [Artifacts](docs/ARTIFACTS.md)
* [Orchestrators](docs/ORCHESTRATORS.md)
* [Providers](docs/PROVIDERS.md)
* [Conventions](docs/CONVENTIONS.md)
* [Roadmap](docs/ROADMAP.md)
* [Glossary](docs/GLOSSARY.md)

## Estructura de Directorios
* `docs/`: Documentación arquitectónica e instrucciones de diseño.
* `contracts/`: Contratos lógicos entre las etapas del pipeline.
* `schemas/`: Validación formal para asegurar los contratos.
* `workflows/`: Definición declarativa de secuencias y dependencias.
* `orchestrators/`: Adaptadores para los distintos entornos de ejecución.
* `agents/`: Implementación de roles especializados.
* `skills/`: Capacidades atómicas reutilizables.
* `tools/`: Herramientas deterministas sin lógica de negocio propia.
* `providers/`: Integración con fuentes y catálogos externos.
* `artifacts/`: Especificaciones y gestión de resultados persistentes.
* `examples/`: Ejemplos de implementaciones y flujos.
* `tests/`: Framework de pruebas unitarias y de integración.
* `templates/`: Plantillas base para la generación de artefactos o código final.

## Fuera de Alcance (Épica Actual)
* Implementación de scraping o lógica de adquisición.
* Creación de agentes funcionales o integraciones con LLMs.
* Creación de workflows ejecutables, herramientas o código Python/TypeScript.
* Esquemas JSON formales (JSON Schema).

## Próxima Épica Prevista
Definición completa de arquitectura y contratos lógicos formales.
