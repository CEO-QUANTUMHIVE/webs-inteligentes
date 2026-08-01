"use client";

import { useState, useEffect } from "react";

export default function WebsInteligentes() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      title: "Agentes Conversacionales",
      description: "Asistentes de IA que atienden a tus clientes 24/7, responden preguntas y generan ventas mientras dormís.",
      icon: "🤖",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Diseño Premium",
      description: "Webs con animaciones de última generación que enamoran al primer clic. Sin templates genéricos.",
      icon: "✨",
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "WhatsApp Automatizado",
      description: "Respuestas instantáneas, seguimiento de leads y ventas automáticas por WhatsApp.",
      icon: "💬",
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Analytics Inteligente",
      description: "Datos en tiempo real sobre tus clientes, comportamiento y oportunidades de negocio.",
      icon: "📊",
      color: "from-orange-400 to-red-500",
    },
  ];

  const efectos = [
    { nombre: "Rayos Animados", categoria: "Fondos", impacto: 5 },
    { nombre: "Partículas Interactivas", categoria: "Fondos", impacto: 5 },
    { nombre: "Texto Morfológico", categoria: "Texto", impacto: 4 },
    { nombre: "Tarjeta Borde Brillante", categoria: "Tarjetas", impacto: 5 },
    { nombre: "Navbar Spotlight", categoria: "Navegación", impacto: 4 },
    { nombre: "Grid Bento", categoria: "Secciones", impacto: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-400/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-sm font-bold">⚡</span>
              </div>
              <span className="font-['Orbitron'] text-xl font-bold tracking-tight">
                Webs Inteligentes
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#efectos" className="text-sm text-gray-400 hover:text-white transition-colors">
                Efectos
              </a>
              <a href="#proceso" className="text-sm text-gray-400 hover:text-white transition-colors">
                Proceso
              </a>
              <a href="#precios" className="text-sm text-gray-400 hover:text-white transition-colors">
                Precios
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="#contacto"
                className="px-5 py-2 bg-white/10 text-white text-sm rounded-full hover:bg-white/20 transition-all"
              >
                Contactar
              </a>
              <a
                href="#cotizar"
                className="px-5 py-2 bg-cyan-400 text-black text-sm font-semibold rounded-full hover:bg-cyan-300 transition-all"
              >
                Cotizar Ahora
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm text-gray-400">Potenciado por IA</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Webs que{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Venden
                </span>{" "}
                Mientras Dormís
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-lg">
                Creamos ultra-webs con agentes de IA que atienden a tus clientes 24/7, generan leads y cierran ventas automáticamente.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#cotizar"
                  className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all hover:scale-105"
                >
                  Solicitar Demo Gratis →
                </a>
                <a
                  href="#efectos"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
                >
                  Ver Catálogo de Efectos
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">+200%</div>
                  <div className="text-sm text-gray-500">Más ventas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">24/7</div>
                  <div className="text-sm text-gray-500">Atención IA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">48h</div>
                  <div className="text-sm text-gray-500">Entrega</div>
                </div>
              </div>
            </div>

            {/* Right - Interactive Preview */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                {/* Hexagonal Grid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Central Hexagon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-2xl rotate-45 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                        <div className="-rotate-45 text-center">
                          <div className="text-4xl mb-2">⚡</div>
                          <div className="text-sm font-bold">IA</div>
                        </div>
                      </div>
                    </div>

                    {/* Orbiting Elements */}
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          top: `${50 + 35 * Math.sin((i * Math.PI) / 2)}%`,
                          left: `${50 + 35 * Math.cos((i * Math.PI) / 2)}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 cursor-pointer transition-all hover:scale-110 ${
                            activeFeature === i ? "scale-110 shadow-lg shadow-cyan-400/20" : ""
                          }`}
                          onMouseEnter={() => setActiveFeature(i)}
                        >
                          <div className="w-full h-full rounded-[10px] bg-[#0a0a0f] flex items-center justify-center">
                            <span className="text-2xl">{feature.icon}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                      {[0, 1, 2, 3].map((i) => (
                        <line
                          key={i}
                          x1="50"
                          y1="50"
                          x2={50 + 35 * Math.cos((i * Math.PI) / 2)}
                          y2={50 + 35 * Math.sin((i * Math.PI) / 2)}
                          stroke="rgba(0,212,255,0.2)"
                          strokeWidth="0.5"
                          strokeDasharray="2 2"
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
                    style={{
                      left: `${10 + (i * 12) % 80}%`,
                      top: `${10 + (i * 15) % 80}%`,
                      animationDelay: `${i * 0.5}s`,
                      opacity: 0.4 + (i % 3) * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Feature Info Card */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 p-4 bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{features[activeFeature].icon}</span>
                  <h3 className="font-bold">{features[activeFeature].title}</h3>
                </div>
                <p className="text-sm text-gray-400">{features[activeFeature].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-12 border-y border-white/5">
        <div className="overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {["Restaurante", "Tienda Online", "Barbería", "Gimnasio", "Clínica", "Estudio", "Hotel", "Academia"].map((brand, i) => (
              <span key={i} className="text-gray-600 text-lg whitespace-nowrap font-medium">
                {brand}
              </span>
            ))}
            {["Restaurante", "Tienda Online", "Barbería", "Gimnasio", "Clínica", "Estudio", "Hotel", "Academia"].map((brand, i) => (
              <span key={`dup-${i}`} className="text-gray-600 text-lg whitespace-nowrap font-medium">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Todo lo que Necesitás{" "}
              <span className="text-cyan-400">en un Solo Lugar</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No somos una agencia más. Somos tu equipo de tecnología completo, con IA integrada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-[10px] bg-[#0a0a0f] flex items-center justify-center">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Efectos Preview */}
      <section id="efectos" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Efectos{" "}
              <span className="text-purple-400">Premium</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              +28 efectos de Vengeance UI para que tu web se vea única. Elegí los que quieras.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {efectos.map((efecto, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/10 bg-[#0a0a0f] hover:border-cyan-400/30 transition-all cursor-pointer group"
              >
                <div className="h-24 rounded-lg bg-gradient-to-br from-white/5 to-white/0 mb-3 flex items-center justify-center overflow-hidden">
                  <div className="w-12 h-12 rounded-lg bg-white/10 group-hover:bg-cyan-400/20 transition-colors flex items-center justify-center">
                    <span className="text-2xl">✦</span>
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1">{efecto.nombre}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{efecto.categoria}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={`text-xs ${j < efecto.impacto ? "text-yellow-400" : "text-gray-700"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/catalogo-efectos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            >
              Ver Catálogo Completo →
            </a>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section id="proceso" className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Cómo{" "}
              <span className="text-green-400">Funciona</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              En 3 pasos tenés tu web lista con agente de IA integrado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Contanos tu Negocio",
                description: "Nos cuentas qué hacés, a quién le vendés y qué necesitás. Nosotros nos encargamos del resto.",
                icon: "💬",
              },
              {
                step: "02",
                title: "Construimos tu Web",
                description: "En 48 horas tenés tu web premium con efectos animados, agente de IA y WhatsApp automatizado.",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Empezás a Vender",
                description: "Tu web trabaja 24/7, atiende clientes, genera leads y cierra ventas mientras vos descansás.",
                icon: "🚀",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-white/5 absolute -top-8 -left-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Precios{" "}
              <span className="text-orange-400">Transparentes</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Sin sorpresas. Elegí el plan que mejor se adapte a tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$150",
                period: "/mes",
                features: ["Web responsive", "3 efectos animados", "Agente IA básico", "Formulario contacto", "SEO básico"],
                popular: false,
              },
              {
                name: "Professional",
                price: "$300",
                period: "/mes",
                features: ["Web premium", "6 efectos animados", "Agente IA avanzado", "WhatsApp automatizado", "Analytics", "Soporte 3 meses"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$500",
                period: "/mes",
                features: ["Web custom", "Todos los efectos", "Agente IA premium", "WhatsApp + Instagram", "Métricas avanzadas", "Soporte 6 meses", "Actualizaciones"],
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border transition-all ${
                  plan.popular
                    ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_60px_rgba(0,212,255,0.15)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-400 text-black text-sm font-bold rounded-full">
                    Más Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <span className="text-cyan-400">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.popular
                      ? "bg-cyan-400 text-black hover:bg-cyan-300"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Elegir Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Lo que Dicen{" "}
              <span className="text-pink-400">Nuestros Clientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "María García",
                business: "Restaurante La Cava",
                text: "Desde que tengo la web con el agente de IA, mis reservas aumentaron un 180%. Los clientes pueden hacer pedidos a cualquier hora.",
                rating: 5,
              },
              {
                name: "Carlos López",
                business: "Barbería Style",
                text: "La web quedó increíble. Los efectos visuales enamoran y el agente agenda turnos automáticamente. No puedo creer que era tan fácil.",
                rating: 5,
              },
              {
                name: "Ana Martínez",
                business: "Yoga Studio",
                text: "Mis clases pasaron de tener 5 alumnos a 25. El agente de IA responde preguntas 24/7 y genera ventas mientras duermo.",
                rating: 5,
              },
            ].map((testimonio, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonio.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonio.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-sm font-bold">
                    {testimonio.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{testimonio.name}</div>
                    <div className="text-xs text-gray-500">{testimonio.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cotizar" className="py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="relative p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.3) 0%, transparent 50%)",
              }}
            />
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
                ¿Listo para{" "}
                <span className="text-cyan-400">Vender Más</span>?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Cotizá tu web gratis y en 48 horas tenés tu web lista con agente de IA integrado.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contacto"
                  className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all hover:scale-105"
                >
                  Solicitar Cotización Gratis →
                </a>
                <a
                  href="https://wa.me/5491112345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-all hover:scale-105"
                >
                  WhatsApp Directo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Contactanos
            </h2>
            <p className="text-gray-400">
              Contanos sobre tu negocio y te armamos una propuesta personalizada.
            </p>
          </div>

          <form className="p-8 rounded-2xl border border-white/10 bg-[#0a0a0f]">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm mb-2 text-gray-400">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-white transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-400">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-white transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-400">Tipo de Negocio</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-white transition-colors"
                placeholder="Ej: Restaurante, Tienda Online, Servicios"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-400">Mensaje</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-white min-h-[120px] transition-colors"
                placeholder="Contanos sobre tu negocio, qué vendés y qué necesitás"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all hover:scale-[1.02]"
            >
              Enviar Mensaje →
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-sm font-bold">⚡</span>
                </div>
                <span className="font-['Orbitron'] text-lg font-bold">Webs Inteligentes</span>
              </div>
              <p className="text-sm text-gray-500">
                Creamos ultra-webs con agentes de IA para negocios locales.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#efectos" className="hover:text-white transition-colors">Efectos</a></li>
                <li><a href="#precios" className="hover:text-white transition-colors">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Quantum Hive. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="text-xl">💼</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
