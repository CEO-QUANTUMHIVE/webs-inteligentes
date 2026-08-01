# Catálogo de Efectos - Webs Inteligentes

## Descripción
Página catálogo visual donde los clientes pueden ver y elegir los efectos disponibles para su web. Herramienta de ventas interactiva sin código visible.

## URL
`/catalogo-efectos`

## Estructura de la Página

### 1. Hero Section
- Título: "Catálogo de Efectos"
- Subtítulo con texto animado
- CTA: "Solicitar Presupuesto"
- Fondo: Rayos Animados

### 2. Filtros
- Botones de categoría: Todos, Fondos, Texto, Tarjetas, Navegación, Botones, Secciones
- Contador de efectos filtrados
- Animación de transición

### 3. Grid de Efectos (14 efectos)
Cada tarjeta incluye:
- Preview visual en vivo
- Nombre del efecto
- Descripción
- Categoría
- Nivel de impacto (1-5 estrellas)
- Tags de "Ideal para"
- Botón "Seleccionar"

### 4. Carrito Flotante
- Botón flotante con contador
- Panel lateral con efectos seleccionados
- Botón de eliminar
- Link a formulario

### 5. Cómo Funciona
- 3 pasos: Elegir → Construir → Lista
- Iconos y descripciones

### 6. Paquetes de Precios
- Básico: $150/mes (3 efectos)
- Premium: $300/mes (6 efectos) - Popular
- Elite: $500/mes (todos los efectos)

### 7. Formulario de Contacto
- Nombre, email, tipo de negocio
- Lista de efectos seleccionados (auto-llenado)
- Mensaje
- Botón de envío

## Efectos Disponibles

### Fondos (2)
1. **Rayos Animados** - Aurora multicolor futurista
2. **Partículas Interactivas** - Reaccionan al cursor

### Texto (3)
3. **Texto Morfológico** - Cambia entre palabras
4. **Texto Flip Fade** - Flip y desvanecimiento
5. **Texto Escalonado** - Aparición por caracteres

### Tarjetas (2)
6. **Tarjeta Borde Brillante** - Brillo al hover
7. **Tarjeta con Cursor** - Efecto 3D interactivo

### Navegación (2)
8. **Navbar Spotlight** - Luz que sigue al cursor
9. **Dock de Vidrio** - Menú glass para móvil

### Botones (2)
10. **Botón Brillo Radial** - Brillo expansivo
11. **Botón Animado** - Entrada fluida

### Secciones (3)
12. **Grid Bento** - Layout tipo Apple
13. **Revelado por Scroll** - Aparece al scroll

## Componentes Utilizados

- `AnimatedRays` - Fondo de rayos
- `InteractiveParticles` - Partículas
- `MorphText` - Texto morfológico
- `GlowBorderCard` - Tarjetas con brillo
- `RadialGlowButton` - Botones
- `SpotlightNavbar` - Navegación

## Funcionalidades

### Filtros
```tsx
const [filtro, setFiltro] = useState("Todos");
const efectosFiltrados = filtro === "Todos" ? efectos : efectos.filter(e => e.categoria === filtro);
```

### Selección
```tsx
const [seleccionados, setSeleccionados] = useState<string[]>([]);
const toggleSeleccion = (id: string) => {
  setSeleccionados(prev => 
    prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
  );
};
```

### Carrito
- Se muestra solo si hay efectos seleccionados
- Panel flotante en esquina inferior derecha
- Contador de efectos

## Próximos Pasos

1. [x] Crear estructura de la página
2. [x] Implementar previews de efectos
3. [x] Agregar filtros interactivos
4. [x] Crear sistema de selección
5. [x] Integrar formulario de contacto
6. [ ] Agregar animaciones de transición
7. [ ] Conectar con API de envío
8. [ ] Agregar analytics de selección