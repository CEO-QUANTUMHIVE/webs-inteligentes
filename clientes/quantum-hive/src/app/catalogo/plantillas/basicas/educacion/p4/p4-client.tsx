"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4-full.css";

const galeria = [
  { img: "photo-1522202176988-66273c2fd55f", title: "Programacion" },
  { img: "photo-1531482615713-2afd69097998", title: "Diseno" },
  { img: "photo-1460925895917-afdab827c52f", title: "Marketing" },
  { img: "photo-1551288049-bebda4e38f71", title: "Data" },
  { img: "photo-1516321318423-f06f85e504b3", title: "Innovacion" },
  { img: "photo-1517245386807-bb43f82c33c4", title: "Trabajo en Equipo" },
];

export default function P4Educacion() {
  return (
    <div className="p4r">
      <nav className="p4nav">
        <Link href="/catalogo-plantillas" className="p4nav-brand">NEX<span>O</span></Link>
        <ul className="p4nav-links">
          <li><a href="#cursos">Cursos</a></li>
          <li><a href="#metodologia">Metodologia</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Inscribirme</a>
      </nav>

      <header className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Academy · Cursos · Online</span>
          <h1 className="p4hero-title">
            Aprende<br />
            <em>Sin Limites</em>
          </h1>
          <p className="p4hero-sub">
            Plataforma de cursos online con instructores expertos.
            Programacion, diseno, marketing y ciencia de datos.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>3</strong>
              <span>anos</span>
            </div>
            <div className="p4hero-stat">
              <strong>5K+</strong>
              <span>alumnos</span>
            </div>
            <div className="p4hero-stat">
              <strong>4.9★</strong>
              <span>rating</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop"
            alt="Nexo Academy"
            width={900}
            height={800}
          />
        </div>
      </header>

      <section className="p4sec" id="cursos">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Nuestros cursos</p>
            <h2 className="p4sec-title">Domina las <em>habilidades</em> del futuro</h2>
            <p>
              Programacion fullstack, diseno UX/UI, marketing digital y ciencia
              de datos. Cursos practicos con proyectos reales y mentores
              experimentados del industria.
            </p>
            <p>
              Clases en vivo, comunidad activa y certificado al completar.
              Aprende a tu ritmo con acceso ilimitado a todo el contenido.
            </p>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80&auto=format&fit=crop"
              alt="Cursos Nexo"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="metodologia">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Metodologia</p>
            <h2 className="p4sec-title">Aprende <em>haciendo</em></h2>
            <p>
              Cada curso esta disenado con proyectos practicos que simulan
              situaciones reales del trabajo. No solo teoria, sino aplicacion
              directa con feedback de expertos.
            </p>
            <p>
              Comunidad de alumnos, sesiones de mentorias en vivo y acceso a
              oportunidades laborales con empresas partner.
            </p>
          </div>
          <div className="p4contact-info">
            <div className="p4contact-row"><span>Modalidad</span><span>100% Online</span></div>
            <div className="p4contact-row"><span>Clases</span><span>En vivo + Grabadas</span></div>
            <div className="p4contact-row"><span>Duracion</span><span>8-12 semanas</span></div>
            <div className="p4contact-row"><span>Certificado</span><span>Si, avalado</span></div>
            <div className="p4contact-row"><span>Mentoria</span><span>Semanal</span></div>
            <div className="p4contact-row"><span>Empleabilidad</span><span className="p4closed">92%</span></div>
          </div>
        </div>
      </section>

      <section className="p4sec" id="contacto">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Contacto</p>
            <h2 className="p4sec-title">Inicia tu <em>camino</em></h2>
            <div className="p4contact-grid">
              <input placeholder="Nombre" className="p4input" />
              <input placeholder="Email" className="p4input" />
              <input type="tel" placeholder="Telefono" className="p4input" />
              <select className="p4input">
                <option>Programacion</option>
                <option>Diseno</option>
                <option>Marketing</option>
                <option>Data</option>
              </select>
            </div>
            <button className="p4btn">Quiero Inscribirme →</button>
          </div>
          <div className="p4contact-info">
            <div className="p4contact-row"><span>Sede</span><span>Online Global</span></div>
            <div className="p4contact-row"><span>Email</span><span>info@nexoacademy.com</span></div>
            <div className="p4contact-row"><span>Horario</span><span>Lun-Vie 9:00–18:00</span></div>
            <div className="p4contact-row"><span>Soporte</span><span>24/7 disponible</span></div>
          </div>
        </div>
      </section>

      <section className="p4gallery" id="galeria">
        <div className="p4gallery-header">
          <p className="p4sec-label">Nuestros cursos</p>
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
        <p>© {new Date().getFullYear()} Nexo Academy — Plataforma de Cursos Online. Contenido de demostracion.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
