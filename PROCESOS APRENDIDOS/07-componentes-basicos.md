# 07 — COMPONENTES BÁSICOS SIEMPRE FUNCIONALES

> Componentes que se pueden usar sin miedo a romper nada. HTML + Tailwind puro.

---

## REGLA

**Estos componentes NO dependen de Vengeance UI ni de ninguna librería externa.**
Son CSS puro con Tailwind. Siempre funcionan.

---

## 1. HEADER SIMPLE

```tsx
<header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
          <span className="text-lg font-bold">⚡</span>
        </div>
        <span className="font-['Orbitron'] text-xl font-bold tracking-tight">
          NOMBRE
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
        <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
        <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
      </nav>
    </div>
  </div>
</header>
```

---

## 2. HERO SECTION

```tsx
<section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
  {/* Background con gradientes CSS */}
  <div className="absolute inset-0">
    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[150px]" />
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
  </div>

  <div className="relative z-10 max-w-5xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6" style={{ fontFamily: "Orbitron" }}>
      Tu Negocio
      <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Conectado
      </span>
    </h1>
    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
      Descripción del negocio aquí.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#contacto" className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all hover:scale-105">
        Contactar
      </a>
      <a href="#servicios" className="px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">
        Ver Más
      </a>
    </div>
  </div>
</section>
```

---

## 3. TARJETA DE SERVICIO

```tsx
<div className="p-8 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 hover:scale-[1.02] transition-all">
  <div className="text-4xl mb-4">🌐</div>
  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Orbitron" }}>
    Nombre del Servicio
  </h3>
  <p className="text-gray-400 mb-6 leading-relaxed">
    Descripción del servicio aquí.
  </p>
  <ul className="space-y-2">
    <li className="flex items-center gap-2 text-sm text-gray-300">
      <span className="text-cyan-400">✓</span> Feature 1
    </li>
    <li className="flex items-center gap-2 text-sm text-gray-300">
      <span className="text-cyan-400">✓</span> Feature 2
    </li>
  </ul>
</div>
```

---

## 4. CTA SECTION

```tsx
<section className="py-24 px-4">
  <div className="max-w-4xl mx-auto">
    <div className="p-12 rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron" }}>
        ¿Listo para <span className="text-cyan-400">Empezar</span>?
      </h2>
      <p className="text-xl text-gray-400 mb-8">
        Descripción del CTA aquí.
      </p>
      <a href="#contacto" className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all hover:scale-105 inline-block">
        Contactar Ahora
      </a>
    </div>
  </div>
</section>
```

---

## 5. FOOTER

```tsx
<footer className="py-12 px-4 border-t border-white/10">
  <div className="max-w-7xl mx-auto text-center">
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
        <span className="text-lg font-bold">⚡</span>
      </div>
      <span className="font-['Orbitron'] text-xl font-bold">NOMBRE</span>
    </div>
    <p className="text-gray-500 text-sm mb-4">Descripción del negocio</p>
    <p className="text-gray-600 text-xs">© 2026 Nombre. Todos los derechos reservados.</p>
  </div>
</footer>
```

---

## 6. GRID DE ESTADÍSTICAS

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
  {[
    { value: "24/7", label: "Atención" },
    { value: "3x", label: "Conversiones" },
    { value: "85%", label: "Ahorro" },
    { value: "<2s", label: "Respuesta" },
  ].map((stat, i) => (
    <div key={i} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "Orbitron" }}>
        {stat.value}
      </div>
      <div className="text-sm text-gray-500">{stat.label}</div>
    </div>
  ))}
</div>
```

---

## 7. PASOS / PROCESO

```tsx
<div className="grid md:grid-cols-4 gap-8">
  {[
    { number: "01", title: "Paso 1", desc: "Descripción." },
    { number: "02", title: "Paso 2", desc: "Descripción." },
    { number: "03", title: "Paso 3", desc: "Descripción." },
    { number: "04", title: "Paso 4", desc: "Descripción." },
  ].map((step, i) => (
    <div key={i} className="text-center">
      <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-cyan-400" style={{ fontFamily: "Orbitron" }}>
          {step.number}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
      <p className="text-gray-400 text-sm">{step.desc}</p>
    </div>
  ))}
</div>
```

---

## UTILIDADES CSS REUTILIZABLES

```css
/* Gradiente de texto */
.gradient-text {
  background: linear-gradient(135deg, #00D4FF, #00FF88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Efecto glass */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Glow */
.glow {
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

/* Border glow on hover */
.glow-border {
  position: relative;
}
.glow-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #00D4FF, #00FF88);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}
.glow-border:hover::before {
  opacity: 1;
}
```
