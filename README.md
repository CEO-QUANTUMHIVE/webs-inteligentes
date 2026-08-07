QuantumHive — Web Factory / Webs Inteligentes

Visión objetivo del módulo

La Web Factory de QuantumHive es una fábrica inteligente de sitios web premium para negocios reales. Su objetivo no es “hacer páginas”, sino convertir la presencia digital de un negocio en una experiencia viva, rápida, comercial y conectada al resto del ecosistema QuantumHive.

1. Visión

Webs Inteligentes es el frente de QuantumHive encargado de crear sitios web de alto impacto visual, construidos sobre una arquitectura sólida, liviana y escalable.

Cada sitio debe poder evolucionar desde una simple presencia digital hasta convertirse en la puerta de entrada completa al ecosistema del negocio:

sitio web;

catálogo vivo;

agente conversacional;

avatar;

voz;

memoria;

automatizaciones;

captación de leads;

atención al cliente;

panel de control;

conexión con Quantum Core.

La web es la cara pública y visual del negocio. No contiene todo el cerebro de QuantumHive. Consume capacidades del ecosistema mediante servicios y APIs bien separadas.

2. Principio central

Impacto visual alto, costo técnico controlado.

Una Web Inteligente puede tener scroll narrativo, GSAP, 3D, WebGL, microinteracciones, transiciones, profundidad, efectos de cursor, animaciones de texto y experiencias inmersivas, pero nunca a costa de convertir la página en una aplicación pesada, inestable o dependiente de hardware potente.

Una web QuantumHive debe sentirse premium sin sentirse pesada.

Debe funcionar de forma fluida en notebooks comunes, PCs sin GPU dedicada, celulares de gama media y conexiones móviles normales.

Si un efecto visual compromete rendimiento:

se optimiza;

se simplifica;

se reemplaza;

o se elimina.

Nunca se sacrifica la experiencia del usuario para conservar un efecto.

3. Objetivos de rendimiento

LCP: ≤ 2.5 s

CLS: < 0.1

INP: < 200 ms

Lighthouse Performance: ≥ 85

sin errores de consola;

sin scroll trabado;

sin bloqueos perceptibles;

sin render loops innecesarios;

sin componentes que mantengan CPU/GPU activas fuera de viewport.

Reglas técnicas de animación

Preferir transform y opacity.

Usar timelines controladas.

Pausar animaciones fuera del viewport.

Lazy-load para 3D, Canvas, video y recursos pesados.

Limitar DPR en Canvas/WebGL según dispositivo.

Cargar escenas pesadas de forma dinámica.

Utilizar IntersectionObserver cuando corresponda.

Evitar layout thrashing.

Evitar cálculos DOM continuos.

Respetar prefers-reduced-motion.

Implementar fallbacks.

Mobile puede recibir una versión simplificada del efecto.

Un efecto roto nunca debe romper la página completa.

4. Qué vende Webs Inteligentes

QuantumHive no vende únicamente “una web”. Vende una presencia digital capaz de evolucionar.

Entrada inicial

web premium;

información del negocio;

servicios/productos;

contacto;

WhatsApp;

formulario;

mapa;

llamadas a la acción.

Evolución

catálogo vivo;

captación de leads;

agente conversacional;

conocimiento del negocio;

reservas;

consultas;

automatizaciones;

memoria;

avatar;

voz;

panel del dueño.

La entrada puede ser una web. El destino es un negocio digital vivo.

5. Estrategia comercial inicial

Mercado local
    ↓
Prospección de negocios
    ↓
Detección de oportunidad
    ↓
Extracción de información pública
    ↓
Clasificación del negocio
    ↓
Generación automática de demo
    ↓
QA
    ↓
Contacto personalizado
    ↓
Cliente visualiza SU negocio funcionando
    ↓
Landing QuantumHive
    ↓
Conversión
    ↓
Onboarding
    ↓
Expediente Maestro del Negocio
    ↓
Web definitiva + servicios adicionales

Perfil inicial de prospecto

Negocios que:

no tienen web;

tienen una web vieja;

tienen mala experiencia móvil;

dependen únicamente de Instagram;

tienen información dispersa;

presentan una identidad visual débil;

tienen un sitio claramente inferior a la calidad de su negocio.

Lógica comercial

No:

“Hacemos páginas web.”

Sí:

“Creamos una demo funcional de cómo podría verse y funcionar tu negocio online.”

El prospecto recibe primero evidencia visual. Después recibe la oferta.

Oferta inicial

Programa Fundadores — primeros 50 negocios

Objetivos:

generar portfolio;

validar verticales;

probar pricing;

medir conversión;

construir casos reales;

obtener testimonios;

entrenar el pipeline.

6. Arquitectura de agentes de Web Factory

Todos los agentes deberán compartir contexto a través de Quantum Core y del Expediente Maestro del Negocio. No deben crear memorias aisladas ni duplicar información.

6.1 WebFactory Orchestrator

recibe una oportunidad;

determina estado;

decide qué agentes ejecutar;

controla dependencias;

valida artefactos;

evita duplicación;

solicita checkpoints humanos.

6.2 Lead Finder

busca negocios por rubro y ubicación;

detecta candidatos;

registra fuente;

normaliza datos;

evita duplicados.

No envía mensajes automáticamente.

6.3 Lead Qualifier

Evalúa:

presencia web;

calidad visible;

móvil;

branding;

claridad comercial;

actividad;

datos disponibles;

posibilidad de mejora.

Estados:

DESCARTAR
BAJA_PRIORIDAD
CANDIDATO
ALTA_OPORTUNIDAD

6.4 Business Explorer

Construye la primera versión pública del negocio:

nombre;

rubro;

descripción;

servicios;

productos;

horarios;

teléfono;

WhatsApp;

ubicación;

redes;

fotografías públicas permitidas;

identidad;

reseñas relevantes;

diferenciales.

Nunca inventar información. Todo dato debe registrar fuente, confianza y verificación.

6.5 Site Auditor

Si existe una web previa:

analiza estructura;

responsive;

SEO básico;

accesibilidad;

velocidad;

UX;

jerarquía;

tecnología;

contenido;

problemas;

oportunidades.

6.6 Web Architect

Convierte información + objetivo comercial en arquitectura:

estructura;

secciones;

narrativa;

componentes;

interacción;

categoría técnica;

catálogo necesario;

efectos;

GSAP;

3D;

estrategia responsive;

presupuesto de rendimiento.

6.7 Design Curator

Consulta catálogos internos:

paletas;

tipografías;

layouts;

heroes;

navegación;

cards;

botones;

animaciones;

efectos;

componentes;

assets 3D;

plantillas.

6.8 Demo Builder

Genera una demo personalizada usando:

información real;

catálogo;

plantillas;

componentes;

skills;

reglas de performance;

referencias permitidas.

La demo debe parecer diseñada para el negocio, no un template con logo cambiado.

6.9 Reference Reconstruction Agent

Responsable de recrear experiencias avanzadas a partir de referencias.

referencia
→ captura
→ inspección
→ tecnologías
→ estructura
→ scroll
→ mouse
→ assets
→ equivalentes internos
→ planificación
→ reconstrucción
→ QA

Skill principal:

recrear-web-premium

Nunca copia marcas, logos, textos, testimonios ni activos propietarios.

6.10 Web 3D Agent

selecciona assets 3D;

optimiza;

clasifica;

integra;

aplica comportamientos;

valida performance;

crea fallback móvil.

Comportamientos iniciales:

seguir_cursor
mirar_mouse
arrastrar_rotar
transformar_scroll
orbita_zoom
estatico

6.11 Motion Designer Agent

Implementa movimiento cinematográfico sin comprometer rendimiento.

Capacidades objetivo:

ScrollTrigger;

ScrollSmoother;

Flip;

Draggable;

Inertia;

MotionPath;

MorphSVG;

Observer;

SplitText;

Physics2D;

Pixi cuando sea necesario.

6.12 Web Performance Agent

Audita:

peso inicial;

scripts;

imágenes;

GLB;

WebGL;

video;

fuentes;

hydration;

CPU;

GPU;

FPS;

loading;

lazy loading;

mobile.

Puede bloquear un efecto aunque visualmente sea atractivo.

6.13 Visual QA Agent

Valida:

desktop;

tablet;

mobile;

overflow;

tipografía;

spacing;

contraste;

animaciones;

scroll;

errores de consola;

fallbacks;

coherencia visual.

6.14 Business Assistant

Agente público de la web:

responde preguntas;

explica productos;

recomienda;

capta leads;

guía al usuario;

escala a humano;

consulta el Expediente Maestro.

Su cerebro vive fuera de la web.

6.15 Sales Guide

Cuando el dueño llega desde una demo:

explica qué está viendo;

responde preguntas;

presenta opciones;

ayuda a elegir;

recoge intención comercial;

deriva a contratación.

6.16 Client Intake Agent

Una vez convertido:

completa información;

verifica datos;

define objetivos;

registra preferencias;

recoge branding;

organiza assets;

crea el Expediente Maestro.

7. Quantum Core

Web Factory no debe convertirse en otro cerebro aislado.

Quantum Core será responsable de:

identidad;

memoria;

contexto;

permisos;

modelos;

herramientas;

eventos;

agentes;

costos;

proyectos;

historial;

estado.

Web Factory
      │
      ▼
Quantum Core
      │
      ├── Expediente Maestro
      ├── memoria
      ├── agentes
      ├── modelos
      ├── eventos
      └── permisos

8. Expediente Maestro del Negocio

Fuente central de verdad.

Datos estructurados

identidad;

contactos;

horarios;

productos;

servicios;

ubicaciones;

redes;

URLs;

pricing;

branding.

Archivos

logos;

fotografías;

documentos;

catálogos;

PDFs;

videos.

Conocimiento semántico

historia;

filosofía;

diferenciadores;

FAQs;

políticas;

tono;

instrucciones.

Cada dato debe registrar:

fuente
fecha
confianza
versión
verificado
pendiente

9. Catálogo interno

catalogo/
├── plantillas/
├── componentes/
├── heroes/
├── botones/
├── navegación/
├── cards/
├── animaciones/
├── efectos/
├── layouts/
├── textos/
├── 3d/
└── motion/

10. Clasificación de componentes

Ejemplo:

{
  "impacto_visual": "alto",
  "costo_render": "bajo",
  "mobile": "completo",
  "fallback": true,
  "usa_webgl": false,
  "usa_gpu": false,
  "fps_objetivo": 60
}

Clasificación:

LIVIANO
MEDIO
PESADO

11. Catálogo 3D

catalogo/elementos/3d/
├── README.md
├── indice.json
├── ficha-3d.schema.json
└── elementos/
    └── <id>/
        ├── ficha.json
        ├── README.md
        ├── preview.webp
        └── modelo.glb | escena.json

Principio:

Modelo y comportamiento son cosas distintas.

Fuentes iniciales permitidas:

pmndrs/assets;

Poly Haven;

Kenney;

Quaternius;

Spline mediante referencias públicas permitidas.

Todo asset debe registrar licencia y condiciones de redistribución.

12. Motion / GSAP

Skill objetivo:

.claude/skills/gsap-motion/
├── SKILL.md
└── references/
    ├── scrolltrigger.md
    ├── scrollsmoother.md
    ├── draggable-inertia.md
    ├── flip.md
    ├── motionpath.md
    ├── morphsvg.md
    ├── observer.md
    ├── splittext.md
    └── pixi.md

El objetivo no es usar todos los plugins. El objetivo es elegir correctamente.

13. Categorías de complejidad

No existen planes “básico” y “premium” en calidad. La calidad base siempre debe ser alta.

Diseño de Autor

Interacción Avanzada

Experiencia Inmersiva

Experiencia Canvas

Experiencia Tridimensional

Fusión Total

Fusión Total no significa usar todo. Significa usar exactamente lo necesario.

14. Recreación de referencias premium

Artefactos principales:

CAPTURA_BASE
MAPA_TECNOLOGIAS
MAPA_ESTRUCTURA
MAPA_SCROLL
MAPA_MOUSE
MAPA_ASSETS
MAPA_COBERTURA_VERTICAL
PLAN_COMPONENTES
PLAN_RECONSTRUCCION
SOLICITUD_ASSETS
INFORME_QA

Flujo:

analizar
→ generar artefactos
→ validar
→ autocorregir
→ checkpoint
→ implementar
→ QA

Estados:

APROBABLE
REQUIERE_CORRECCIONES
BLOQUEADO

La aprobación final es humana.

15. Componentes y referencias externas

Bibliotecas como Vengeance UI pueden usarse como fuente técnica, inspiración y referencia.

La fábrica debe poder:

descubrir
→ analizar
→ adaptar
→ recrear
→ internalizar

Producción no debe depender ciegamente de un componente externo si introduce bugs, penaliza rendimiento o rompe la arquitectura.

16. Stack técnico objetivo

Next.js 16+
React 19
Tailwind CSS 4
shadcn/ui
GSAP
Three.js / React Three Fiber cuando corresponda
Spline cuando corresponda

Arquitectura:

componentes desacoplados;

carga progresiva;

assets optimizados;

APIs externas para inteligencia;

observabilidad;

QA automatizado;

fallbacks.

17. Arquitectura Git para agentes

1 agente activo = 1 worktree o entorno aislado.

main
│
├── worktree-web-builder
├── worktree-3d
├── worktree-motion
├── worktree-catalog
├── worktree-qa
└── worktree-experiments

Cada agente:

trabaja en su rama;

no cambia ramas ajenas;

no usa git add .;

no hace force;

no toca carpetas fuera de su scope;

entrega diff y estado;

usa checkpoint humano antes de integrar cambios importantes.

18. Pipeline de fabricación

Demo comercial

lead
→ business explorer
→ qualifier
→ site auditor
→ web architect
→ design curator
→ demo builder
→ performance
→ visual QA
→ aprobación humana
→ contacto

Cliente convertido

cliente
→ client intake
→ expediente maestro
→ web architect
→ configuración definitiva
→ build
→ agente conversacional
→ QA
→ aprobación
→ deploy
→ mantenimiento

19. QA obligatorio

Build

build verde;

rutas válidas;

sin errores de consola.

Responsive

desktop
tablet
360×640

Visual

jerarquía;

spacing;

tipografía;

contraste;

contenido;

coherencia.

Performance

carga;

scroll;

FPS;

CPU;

GPU;

imágenes;

3D;

scripts.

Factual

no inventar información;

comprobar datos críticos.

20. Seguridad comercial y factual

Los agentes nunca deben:

inventar horarios;

inventar precios;

inventar testimonios;

inventar direcciones;

inventar productos;

publicar sin autorización;

enviar campañas automáticamente sin control;

copiar marcas o contenido protegido;

utilizar assets sin licencia;

exponer endpoints internos de Quantum Core.

21. Roadmap objetivo

Fase 1 — Núcleo de construcción

consolidar skills;

terminar catálogo;

catálogo 3D;

catálogo GSAP;

heroes;

botones;

navegación;

componentes;

plantillas.

Fase 2 — Arquitectura multiagente

Crear:

WebFactory Orchestrator;

Lead Finder;

Lead Qualifier;

Business Explorer;

Site Auditor;

Web Architect;

Design Curator;

Demo Builder;

Reference Reconstruction Agent;

Web 3D Agent;

Motion Designer;

Performance Agent;

Visual QA.

Fase 3 — Máquina comercial

prospección;

scoring;

generación de demos;

registro de leads;

workflow comercial;

landing de conversión;

campaña primeros 50 clientes.

Fase 4 — Cliente vivo

onboarding;

Expediente Maestro;

agente público;

catálogo vivo;

voz;

avatar;

memoria;

automatizaciones;

panel.

Fase 5 — Escala

múltiples verticales;

bibliotecas por nicho;

componentes versionados;

evaluación automática;

deployment automatizado;

métricas;

optimización por conversión;

aprendizaje entre proyectos.

22. Estado

Este README describe la visión final objetivo.

Ya existen o están en desarrollo algunas piezas del stack, pero la arquitectura completa multiagente y comercial todavía debe implementarse.

La función de este documento es mantener la dirección común para que cada nueva pieza se construya dentro del mismo sistema.

23. Resultado esperado

“Encontré un negocio interesante”
        ↓
“Ya tengo una demo personalizada,
auditada,
optimizada,
lista para mostrarle al dueño.”

La intervención humana debe concentrarse en:

criterio;

aprobación;

decisiones comerciales;

excepciones.

La tecnología absorbe el trabajo repetitivo.

24. Principio final

La web debe sorprender al usuario por lo que siente, no por cuánto hardware consume.

Web Factory debe producir experiencias que parezcan técnicamente complejas pero que estén construidas con una arquitectura limpia, modular, optimizada y mantenible.

Ese es el estándar de Webs Inteligentes.
