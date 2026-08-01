/* Punto de partida de la home. Es un server component a proposito: asi la
   ruta puede exportar su propia metadata. Si una seccion necesita estado,
   sacala a su propio componente con "use client" e importala aca. */

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm uppercase tracking-widest text-[var(--marca-texto-suave)]">
            [Rubro · Localidad]
          </p>
          <h1 className="mb-6 font-[family-name:var(--font-titulo)] text-4xl font-bold leading-tight md:text-6xl">
            [Propuesta de valor en una linea]
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--marca-texto-suave)]">
            [Que problema le resolves al cliente, sin tecnicismos]
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contacto"
              className="rounded-lg bg-[var(--marca-primario)] px-8 py-4 font-semibold text-white transition-transform hover:scale-105"
            >
              [CTA principal]
            </a>
            <a
              href="#servicios"
              className="vidrio rounded-lg px-8 py-4 font-semibold transition-colors hover:bg-white/10"
            >
              [CTA secundario]
            </a>
          </div>
        </div>
      </section>

      <section id="servicios" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-[family-name:var(--font-titulo)] text-3xl font-bold md:text-4xl">
            [Titulo de servicios]
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article key={i} className="vidrio rounded-2xl p-6">
                <h3 className="mb-2 text-lg font-semibold">[Servicio {i}]</h3>
                <p className="text-sm leading-relaxed text-[var(--marca-texto-suave)]">
                  [Descripcion. Precio real del negocio, nunca inventado.]
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-[family-name:var(--font-titulo)] text-3xl font-bold md:text-4xl">
            [Cierre]
          </h2>
          <p className="mb-8 text-[var(--marca-texto-suave)]">
            [Horarios y direccion verificados del negocio]
          </p>
          <a
            href="[tel: o wa.me del negocio]"
            className="inline-block rounded-lg bg-[var(--marca-acento)] px-8 py-4 font-semibold text-white"
          >
            [Accion de contacto]
          </a>
        </div>
      </section>
    </main>
  );
}
