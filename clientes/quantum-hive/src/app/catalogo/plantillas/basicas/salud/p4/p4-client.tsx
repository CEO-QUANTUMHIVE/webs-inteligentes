"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4-full.css";

const galeria = [
  { img: "photo-1631217868264-e5b90bb7e133", title: "Recepcion" },
  { img: "photo-1519494026892-80bbd2d6fd0d", title: "Laboratorio" },
  { img: "photo-1576091160550-2173dba999ef", title: "Consultorio" },
  { img: "photo-1579684385127-1ef15d508118", title: "Equipamiento" },
  { img: "photo-1582719478250-c89cae4dc85b", title: "Sala de Espera" },
  { img: "photo-1551190822-a9ce113a0734", title: "Quirofano" },
];

const servicios = [
  {
    icono: "🩺",
    titulo: "Clinica General",
    desc: "Medicina interna, chequeos preventivos y seguimiento de pacientes cronicos con protocolos actualizados.",
  },
  {
    icono: "🦷",
    titulo: "Odontologia",
    desc: "Odontologia preventiva, estetica, implantes y ortodoncia. Tecnologia de ultima generacion.",
  },
  {
    icono: "🥗",
    titulo: "Nutricion",
    desc: "Planes alimentarios personalizados, control de peso y nutricion clinica para todas las edades.",
  },
  {
    icono: "🧠",
    titulo: "Psicologia",
    desc: "Atencion individual, familiar y de pareja. Terapia cognitivo-conductual y manejo del estres.",
  },
];

export default function P4Salud() {
  return (
    <div className="p4r">
      <nav className="p4nav">
        <Link href="/catalogo-plantillas" className="p4nav-brand">VIT<span>TA</span></Link>
        <ul className="p4nav-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#instalaciones">Instalaciones</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Agendar</a>
      </nav>

      <header className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Centro de Salud · Integral · Buenos Aires</span>
          <h1 className="p4hero-title">
            Tu Salud<br />
            <em>Primero</em>
          </h1>
          <p className="p4hero-sub">
            Centro de salud integral con profesionales de cada especialidad bajo un mismo techo.
            Atencion humana, rapida y con los mas altos estandares de calidad.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>10</strong>
              <span>anos</span>
            </div>
            <div className="p4hero-stat">
              <strong>15K+</strong>
              <span>pacientes</span>
            </div>
            <div className="p4hero-stat">
              <strong>4.9★</strong>
              <span>rating</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=80&auto=format&fit=crop"
            alt="Vitta Centro de Salud"
            width={900}
            height={800}
          />
        </div>
      </header>

      <section className="p4sec" id="servicios">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Especialidades</p>
            <h2 className="p4sec-title">Nuestros <em>Servicios</em></h2>
            {servicios.map((s) => (
              <div key={s.titulo} style={{ marginBottom: "1.2rem" }}>
                <h3 style={{ fontFamily: "var(--t-font-display), monospace", fontSize: "0.9rem", marginBottom: "0.3rem", letterSpacing: "0.05em" }}>
                  {s.icono} {s.titulo}
                </h3>
                <p style={{ margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80&auto=format&fit=crop"
              alt="Servicios Vitta"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="instalaciones">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Infraestructura</p>
            <h2 className="p4sec-title">Instalaciones de <em>Ultima Generacion</em></h2>
            <p>
              Contamos con consultorios equipados, laboratorio clinico propio, sala de ecografia
              y areas de rehabilitacion. Todo pensado para brindar un diagnostico preciso
              y un tratamiento integral.
            </p>
            <p>
              Tecnologia de vanguardia al servicio de tu salud. Equipos importados,
              esterilizacion certificada y protocolos internacionales de seguridad.
            </p>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80&auto=format&fit=crop"
              alt="Instalaciones Vitta"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4gallery" id="galeria">
        <div className="p4gallery-header">
          <p className="p4sec-label">Nuestro espacio</p>
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
            <h2 className="p4sec-title">Agende su <em>Turno</em></h2>
            <div className="p4contact-grid">
              <input placeholder="Nombre" className="p4input" />
              <input placeholder="Telefono" className="p4input" />
              <input placeholder="Especialidad" className="p4input" />
              <input type="date" className="p4input" />
            </div>
            <button className="p4btn">Agendar Turno →</button>
          </div>
          <div className="p4contact-info">
            <div className="p4contact-row"><span>Direccion</span><span>Av. Libertador 4567</span></div>
            <div className="p4contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p4contact-row"><span>Lun-Vie</span><span>08:00 – 20:00</span></div>
            <div className="p4contact-row"><span>Sabado</span><span>08:00 – 14:00</span></div>
            <div className="p4contact-row"><span>Domingo</span><span className="p4closed">Cerrado</span></div>
            <div className="p4contact-row"><span>Emergencias</span><span>+54 11 0000-0001</span></div>
          </div>
        </div>
      </section>

      <footer className="p4footer">
        <p>© {new Date().getFullYear()} Vitta — Centro de Salud Integral. Contenido de demostracion.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
