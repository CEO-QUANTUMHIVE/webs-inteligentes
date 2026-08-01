"use client";

import React, { useState } from "react";
import { previewsReales } from "./previews-reales";
import type { Efecto } from "@/lib/catalogo";

function Estrellas({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < n ? "text-yellow-400" : "text-gray-700"}>★</span>
      ))}
    </span>
  );
}

function FichaTecnica({ efecto }: { efecto: Efecto }) {
  const filas = [
    { k: "Categoría", v: efecto.categoria },
    { k: "Impacto visual", v: <Estrellas n={efecto.impacto} /> },
    { k: "Ideal para", v: efecto.ideal_para.join(" · ") || "—" },
    { k: "Rendimiento", v: efecto.impacto >= 5 ? "Alto — usar 1 por página" : "Liviano — combinable" },
    { k: "Responsive", v: "Sí, verificado en móvil" },
  ];

  return (
    <div className="p-6 md:p-8">
      <dl className="divide-y divide-white/5">
        {filas.map((f) => (
          <div key={f.k} className="flex items-center justify-between gap-6 py-3.5">
            <dt className="text-sm text-gray-500">{f.k}</dt>
            <dd className="text-right text-sm text-gray-200">{f.v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-xs leading-relaxed text-gray-400">
          <span className="text-cyan-400">Implementación propia.</span>{" "}
          El código de este efecto es desarrollo de Quantum Hive y se entrega
          integrado en tu proyecto. No se publica ni se distribuye por separado.
        </p>
      </div>
    </div>
  );
}

/** Efecto cargado en la base pero todavia sin componente en el bundle. */
function SinPreview({ nombre }: { nombre: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#0a0a0f] px-6 text-center">
      <span className="text-3xl">✦</span>
      <p className="text-sm text-gray-400">
        <span className="text-white">{nombre}</span> está en preparación.
      </p>
      <p className="max-w-xs text-xs text-gray-600">
        Consultanos y te lo mostramos en vivo.
      </p>
    </div>
  );
}

export default function CatalogoCliente({ efectos }: { efectos: Efecto[] }) {
  const [activo, setActivo] = useState<string>(efectos[0]?.id ?? "");
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [tab, setTab] = useState<"preview" | "ficha">("preview");
  const [menuAbierto, setMenuAbierto] = useState(false);

  const q = busqueda.trim().toLowerCase();
  const coincide = (e: Efecto) =>
    !q ||
    e.nombre.toLowerCase().includes(q) ||
    e.descripcion.toLowerCase().includes(q) ||
    e.ideal_para.some((t) => t.toLowerCase().includes(q));

  // Las categorias salen de los datos, no de una lista fija: si se suma una
  // categoria nueva en la base, aparece sola.
  const categorias = [...new Set(efectos.map((e) => e.categoria))];
  const porCategoria = categorias
    .map((cat) => ({ cat, items: efectos.filter((e) => e.categoria === cat && coincide(e)) }))
    .filter((g) => g.items.length > 0);

  const efecto = efectos.find((e) => e.id === activo) ?? efectos[0];
  const Preview = efecto ? previewsReales[efecto.id] : undefined;
  const estaSeleccionado = efecto ? seleccionados.includes(efecto.id) : false;

  const alternar = (id: string) =>
    setSeleccionados((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const abrir = (id: string) => {
    setActivo(id);
    setTab("preview");
    setMenuAbierto(false);
  };

  if (!efecto) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050508] text-gray-400">
        El catálogo está vacío.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                <span className="text-sm font-bold">⚡</span>
              </div>
              <span className="font-['Orbitron'] text-xl font-bold tracking-tight">Webs Inteligentes</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/" className="hidden text-sm text-gray-400 transition-colors hover:text-white md:block">Inicio</a>
              <a href="/webs-inteligentes" className="hidden text-sm text-gray-400 transition-colors hover:text-white md:block">Webs Inteligentes</a>
              <a href="/catalogo-efectos" className="hidden text-sm font-medium text-cyan-400 md:block">Efectos</a>
              <a href="/catalogo-plantillas" className="hidden text-sm text-gray-400 transition-colors hover:text-white md:block">Plantillas</a>
              <a href="#contacto" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-cyan-300">Contactar</a>
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-[73px] z-40 border-b border-white/10 bg-[#050508]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          onClick={() => setMenuAbierto((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm"
        >
          <span className="truncate">
            <span className="text-gray-500">{efecto.categoria} / </span>
            <span className="font-medium">{efecto.nombre}</span>
          </span>
          <span className="ml-3 text-cyan-400">{menuAbierto ? "▲" : "▼"}</span>
        </button>
      </div>

      <div className="mx-auto flex max-w-[1600px] px-4 md:px-8">
        <aside
          className={`${menuAbierto ? "block" : "hidden"} w-full flex-shrink-0 border-white/10 py-6 lg:sticky lg:top-[73px] lg:block lg:h-[calc(100vh-73px)] lg:w-64 lg:overflow-y-auto lg:border-r lg:pr-6`}
        >
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar efecto..."
            className="mb-5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none"
          />

          <nav className="space-y-6">
            {porCategoria.map(({ cat, items }) => (
              <div key={cat}>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{cat}</h3>
                <ul className="space-y-0.5">
                  {items.map((e) => (
                    <li key={e.id}>
                      <button
                        onClick={() => abrir(e.id)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-[13px] transition-colors ${
                          e.id === activo
                            ? "bg-cyan-400/10 font-medium text-cyan-400"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{e.nombre}</span>
                        {seleccionados.includes(e.id) && <span className="ml-2 text-[10px] text-cyan-400">✓</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {porCategoria.length === 0 && (
              <p className="px-3 text-sm text-gray-600">Sin resultados para “{busqueda}”.</p>
            )}
          </nav>

          {seleccionados.length > 0 && (
            <div className="mt-8 rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4">
              <h4 className="mb-3 text-sm font-semibold">Seleccionados ({seleccionados.length})</h4>
              <ul className="space-y-2">
                {seleccionados.map((id) => (
                  <li key={id} className="flex items-center justify-between text-xs">
                    <button onClick={() => abrir(id)} className="truncate text-left text-gray-300 hover:text-white">
                      {efectos.find((e) => e.id === id)?.nombre}
                    </button>
                    <button onClick={() => alternar(id)} aria-label="Quitar" className="ml-2 text-gray-500 transition-colors hover:text-red-400">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="mt-4 block w-full rounded-lg bg-cyan-400 py-2 text-center text-sm font-semibold text-black transition-all hover:bg-cyan-300">
                Cotizar →
              </a>
            </div>
          )}
        </aside>

        <main className={`${menuAbierto ? "hidden lg:block" : "block"} min-w-0 flex-1 py-8 lg:pl-10`}>
          <p className="mb-2 text-xs text-gray-500">
            Efectos <span className="mx-1">/</span> {efecto.categoria}
          </p>

          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h1 className="font-['Orbitron'] text-3xl font-bold md:text-4xl">{efecto.nombre}</h1>
            {efecto.es_nuevo && (
              <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-black">Nuevo</span>
            )}
          </div>
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-gray-400">{efecto.descripcion}</p>

          <div className="mb-4 flex items-center gap-1 border-b border-white/10">
            {([["preview", "Vista previa"], ["ficha", "Ficha técnica"]] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`-mb-px border-b-2 px-4 py-2.5 text-sm transition-colors ${
                  tab === id
                    ? "border-cyan-400 font-medium text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            {tab === "preview" ? (
              <div className="h-[380px] md:h-[460px]">
                {Preview ? <Preview /> : <SinPreview nombre={efecto.nombre} />}
              </div>
            ) : (
              <FichaTecnica efecto={efecto} />
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => alternar(efecto.id)}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                estaSeleccionado ? "bg-cyan-400 text-black" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {estaSeleccionado ? "✓ Seleccionado" : "+ Agregar a mi proyecto"}
            </button>
            <div className="flex flex-wrap gap-1.5">
              {efecto.ideal_para.map((tag) => (
                <span key={tag} className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-400">{tag}</span>
              ))}
            </div>
          </div>
        </main>
      </div>

      <section id="contacto" className="border-t border-white/10 bg-white/[0.02] px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-['Orbitron'] text-4xl font-bold md:text-5xl">
            ¿Listo para construir algo <span className="text-cyan-400">único</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-400">
            {seleccionados.length > 0
              ? `Tenés ${seleccionados.length} ${seleccionados.length === 1 ? "efecto seleccionado" : "efectos seleccionados"}. Cotizamos tu web con ${seleccionados.length === 1 ? "él integrado" : "ellos integrados"}.`
              : "Elegí los efectos que te gusten y cotizamos tu web con ellos integrados."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/webs-inteligentes" className="rounded-lg bg-cyan-400 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-300">
              Webs Inteligentes →
            </a>
            <a href="/" className="rounded-lg bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20">
              Volver al Inicio
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
              <span className="text-sm font-bold">⚡</span>
            </div>
            <span className="font-['Orbitron'] text-lg font-bold">Webs Inteligentes</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 Quantum Hive. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
