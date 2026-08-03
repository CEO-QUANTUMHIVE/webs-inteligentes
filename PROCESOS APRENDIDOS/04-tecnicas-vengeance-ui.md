# 04 — TÉCNICAS VENGEANCE UI

> Cómo usar correctamente los componentes Vengeance UI sin romper el sitio.

---

## REGLA DE ORO

**NO instalar Vengeance UI hasta tener la base funcionando sin él.**

Primero: HTML + Tailwind + CSS puro funcionando.
Después: Agregar componentes Vengeance UI uno por uno.

---

## INSTALACIÓN CORRECTA

```bash
# 1. Inicializar shadcn (si no está)
npx shadcn@latest init

# 2. Agregar componente específico
npx shadcn@latest add https://www.vengenceui.com/r/animated-rays.json

# 3. Verificar que el componente se instaló
ls src/components/ui/
```

---

## COMPONENTES SEGUROS (pocos dependencies)

| Componente | Dependencies | Riesgo |
|------------|-------------|--------|
| `animated-rays` | Ninguna | Bajo |
| `glow-border-card` | Ninguna | Bajo |
| `radial-glow-button` | Ninguna | Bajo |
| `spotlight-navbar` | Ninguna | Bajo |
| `flip-fade-text` | Ninguna | Bajo |

## COMPONENTES CON RIESGO (muchas dependencies)

| Componente | Dependencies | Riesgo |
|------------|-------------|--------|
| `interactive-particles` | three, gsap | Alto |
| `morph-text` | Ninguna | Medio (rendering) |
| `glass-dock` | Ninguna | Medio (superposición) |
| `liquid-metal` | framer-motion | Medio |

---

## PATRÓN SEGURO PARA INTEGRAR

```tsx
// 1. Importar con try/catch lógico
import { AnimatedRays } from "@/components/ui/animated-rays";

// 2. Usar con condición de rendering
export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {/* Componente Vengeance UI solo en cliente */}
      {mounted && <AnimatedRays className="opacity-40" />}

      {/* Contenido principal SIEMPRE visible */}
      <h1>Mi página</h1>
    </div>
  );
}
```

---

## ERRORES COMUNES CON VENGEANCE UI

### 1. Texto Morphed ilegible
**Causa:** MorphText sin configuración de fonts correcta
**Solución:** No usar MorphText, usar CSS animation simple

### 2. Componentes superpuestos
**Causa:** GlassDock o navbar con z-index incorrecto
**Solución:** Usar `position: fixed` con `z-50` y verificar stacking context

### 3. Build exitoso pero sitio roto
**Causa:** Errores de rendering solo visibles en navegador
**Solución:** SIEMPRE abrir en navegador después del build

### 4. Performance lenta
**Causa:** Demasiados componentes animados
**Solución:** Máximo 2-3 componentes Vengeance UI por página

---

## ALTERNATIVA SEGURA: CSS PURO

En vez de usar componentes Vengeance UI, usar CSS puro para efectos similares:

```css
/* Aurora background (sin AnimatedRays) */
.aurora-bg {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.15), transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.1), transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(0, 255, 136, 0.08), transparent 50%);
}

/* Glass effect (sin GlassDock) */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Glow effect (sin GlowBorderCard) */
.glow-card {
  position: relative;
}
.glow-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #00d4ff, #00ff88);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}
.glow-card:hover::before {
  opacity: 1;
}

/* Gradient text (sin MorphText) */
.gradient-text {
  background: linear-gradient(135deg, #00d4ff, #00ff88, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## CHECKLIST ANTES DE AGREGAR VENGEANCE UI

- [ ] El home funciona sin Vengeance UI
- [ ] El build es exitoso
- [ ] El sitio se ve bien en navegador
- [ ] El componente específico está documentado
- [ ] Las dependencies del componente son mínimas
- [ ] Voy a testear el componente en aislamiento primero
