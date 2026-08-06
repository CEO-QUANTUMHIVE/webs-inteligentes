"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4-full.css";

const servicios = [
  { title: "Derecho Civil", desc: "Contratos, responsabilidad civil, daños y perjuicios. Protegemos sus intereses en cada acuerdo." },
  { title: "Derecho Penal", desc: "Defensa penal estratégica. Representacion en todas las instancias del sistema judicial." },
  { title: "Derecho Empresarial", desc: "Constitucion, fusiones, adquisiciones y compliance. Asesoramiento integral para su empresa." },
  { title: "Derecho Laboral", desc: "Relaciones de trabajo, despidos, convenios colectivos. Defensa tanto del empleador como del trabajador." },
];

const galeria = [
  { img: "photo-1589829545856-d10d557cf95f", title: "Despacho" },
  { img: "photo-1505664194779-8beaceb93744", title: "Reuniones" },
  { img: "photo-1554224155-6726b3ff858f", title: "Documentos" },
  { img: "photo-1521791136064-7986c2920216", title: "Acuerdo" },
  { img: "photo-1450101499163-c8848c66ca85", title: "Negociacion" },
  { img: "photo-1556761175-5973dc0f32e7", title: "Equipo" },
];

export default function P4ServiciosPro() {
  return (
    <div className="p4r">
      <nav className="p4nav">
        <Link href="/catalogo-plantillas" className="p4nav-brand">MERI<span>DIAN</span></Link>
        <ul className="p4nav-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Consultar</a>
      </nav>

      <header className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Consultora · Legal · Empresarial</span>
          <h1 className="p4hero-title">
            Soluciones<br />
            <em>Legales</em>
          </h1>
          <p className="p4hero-sub">
            Asesoramiento legal y empresarial de alto nivel. Defendemos sus derechos
            con estrategia, precision y anos de experiencia comprobada.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>15</strong>
              <span>anos</span>
            </div>
            <div className="p4hero-stat">
              <strong>500+</strong>
              <span>casos</span>
            </div>
            <div className="p4hero-stat">
              <strong>98%</strong>
              <span>exito</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80&auto=format&fit=crop"
            alt="Meridian Consultora"
            width={900}
            height={800}
          />
        </div>
      </header>

      <section className="p4sec" id="servicios">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Nuestros servicios</p>
            <h2 className="p4sec-title">Experiencia <em>Legal</em></h2>
            {servicios.map((s) => (
              <div key={s.title} style={{ marginBottom: "1.5rem" }}>
                <h3 style={{
                  fontFamily: "var(--t-font-display), monospace",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.3rem",
                  color: "#1a1a1a",
                }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=700&q=80&auto=format&fit=crop"
              alt="Servicios Meridian"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="historia">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Nuestra historia</p>
            <h2 className="p4sec-title">Desde <em>2011</em></h2>
            <p>
              Meridian nacio con la vision de ofrecer asesoramiento legal de excelencia
              para empresas y particulares. Comenzamos como un estudio boutique y hoy
              somos una consultora de referencia en derecho empresarial y civil.
            </p>
            <p>
              Nuestro equipo combina experiencia judicial, conocimiento corporativo y
              un compromiso inquebrantable con los intereses de cada cliente. Cada caso
              es una oportunidad para demostrar que la estrategia legal marca la diferencia.
            </p>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80&auto=format&fit=crop"
              alt="Historia Meridian"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4gallery" id="galeria">
        <div className="p4gallery-header">
          <p className="p4sec-label">Nuestras instalaciones</p>
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

      <section className="p4sec p4sec-dark" id="contacto">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Contacto</p>
            <h2 className="p4sec-title">Consulte su <em>caso</em></h2>
            <div className="p4contact-grid">
              <input placeholder="Nombre" className="p4input" />
              <input placeholder="Telefono" className="p4input" />
              <input placeholder="Email" className="p4input" />
              <select className="p4input">
                <option>Derecho Civil</option>
                <option>Derecho Penal</option>
                <option>Derecho Empresarial</option>
                <option>Derecho Laboral</option>
              </select>
            </div>
            <button className="p4btn">Enviar Consulta →</button>
          </div>
          <div className="p4contact-info">
            <div className="p4contact-row"><span>Direccion</span><span>Av. Libertador 4567, Piso 12</span></div>
            <div className="p4contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p4contact-row"><span>Email</span><span>consultas@meridian.com.ar</span></div>
            <div className="p4contact-row"><span>Lun-Vie</span><span>09:00 – 18:00</span></div>
            <div className="p4contact-row"><span>Sab</span><span>10:00 – 14:00</span></div>
            <div className="p4contact-row"><span>Dom</span><span className="p4closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      <footer className="p4footer">
        <p>© {new Date().getFullYear()} Meridian — Consultora Legal & Empresarial. Contenido de demostracion.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
