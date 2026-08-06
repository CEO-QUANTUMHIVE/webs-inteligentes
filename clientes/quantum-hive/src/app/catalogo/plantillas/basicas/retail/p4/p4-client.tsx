"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4-full.css";

const galeria = [
  { img: "photo-1441986300917-64674bd600d8", title: "Indumentaria" },
  { img: "photo-1549298916-b41d501d3772", title: "Calzado" },
  { img: "photo-1584917865442-de89df76afd3", title: "Accesorios" },
  { img: "photo-1483985988355-763728e1935b", title: "Novedades" },
  { img: "photo-1490481651871-ab68de25d43d", title: "Estilo" },
  { img: "photo-1556905055-8f358a7a47b2", title: "Detalles" },
];

export default function P4Retail() {
  return (
    <div className="p4r">
      <nav className="p4nav">
        <Link href="/catalogo-plantillas" className="p4nav-brand">UMA<span>MI</span></Link>
        <ul className="p4nav-links">
          <li><a href="#categorias">Categorias</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Comprar</a>
      </nav>

      <header className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Moda · Accesorios · Buenos Aires</span>
          <h1 className="p4hero-title">
            Estilo<br />
            <em>Propio</em>
          </h1>
          <p className="p4hero-sub">
            Seleccion curada de indumentaria, calzado y accesorios.
            Piezas que definen tu identidad sin seguir tendencias pasajeras.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>5</strong>
              <span>anos</span>
            </div>
            <div className="p4hero-stat">
              <strong>10K+</strong>
              <span>ventas</span>
            </div>
            <div className="p4hero-stat">
              <strong>4.8★</strong>
              <span>rating</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format&fit=crop"
            alt="Umami Store"
            width={900}
            height={800}
          />
        </div>
      </header>

      <section className="p4sec" id="categorias">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Nuestras categorias</p>
            <h2 className="p4sec-title">Para cada <em>momento</em></h2>
            <p>
              Indumentaria casual y formal. Calzado que acompaña cada paso.
              Accesorios que completan tu look con personalidad.
            </p>
            <p>
              Seleccionamos marcas que priorizan calidad y diseno propio.
              Cada pieza pasa por nuestro filtro antes de llegar a la tienda.
            </p>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80&auto=format&fit=crop"
              alt="Categorias Umami"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="contacto">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Contacto</p>
            <h2 className="p4sec-title">Escribi <em>nos</em></h2>
            <div className="p4contact-grid">
              <input placeholder="Nombre" className="p4input" />
              <input placeholder="Email" className="p4input" />
              <input placeholder="Telefono" className="p4input" />
              <select className="p4input">
                <option>Consulta general</option>
                <option>Pedido</option>
                <option>Cambio/Devolucion</option>
              </select>
            </div>
            <button className="p4btn">Enviar →</button>
          </div>
          <div className="p4contact-info">
            <div className="p4contact-row"><span>Direccion</span><span>Av. Corrientes 1842</span></div>
            <div className="p4contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p4contact-row"><span>Lun-Vie</span><span>10:00 – 20:00</span></div>
            <div className="p4contact-row"><span>Sabado</span><span>10:00 – 18:00</span></div>
            <div className="p4contact-row"><span>Domingo</span><span className="p4closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      <section className="p4gallery" id="galeria">
        <div className="p4gallery-header">
          <p className="p4sec-label">Nuestras prendas</p>
          <h2 className="p4sec-title">Galeria</h2>
        </div>
        <div className="p4gallery-grid">
          {galeria.map((g) => (
            <figure key={g.title} className="p4gallery-cell">
              <img
                src={`https://images.unsplash.com/${g.img}?w=600&q=80&auto=format&fit=crop`}
                alt={g.title}
                width={600}
                height={250}
                loading="lazy"
              />
              <figcaption>{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="p4footer">
        <p>© {new Date().getFullYear()} Umami Store — Moda & Accesorios. Contenido de demostracion.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
