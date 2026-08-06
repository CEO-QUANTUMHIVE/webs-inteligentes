"use client";

import "./p4-full.css";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P4Wellness() {
  return (
    <div className="p4r">
      {/* NAV */}
      <nav className="p4nav">
        <a href="#" className="p4nav-brand">
          SATTVA<span>.</span>
        </a>
        <ul className="p4nav-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Reservar Clase</a>
      </nav>

      {/* HERO */}
      <section className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Yoga · Meditacion · Buenos Aires</span>
          <h1 className="p4hero-title">
            Balance
            <em>Interior</em>
          </h1>
          <p className="p4hero-sub">
            Descubre la practica del yoga y la meditacion en un espacio
            disenado para tu bienestar integral. Clases personalizadas para
            todos los niveles.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>8</strong>
              <span>Anos de experiencia</span>
            </div>
            <div className="p4hero-stat">
              <strong>4.9</strong>
              <span>Rating promedio</span>
            </div>
            <div className="p4hero-stat">
              <strong>200+</strong>
              <span>Alumnos activos</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop"
            alt="Yoga en estudio"
          />
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="p4sec">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <span className="p4sec-label">Nuestros Servicios</span>
            <h2 className="p4sec-title">
              Practicas
              <em>Integrales</em>
            </h2>
            <p>
              Ofrecemos una variedad de disciplinas para cuidar tu cuerpo y
              mente. Cada clase esta disenada para adaptarse a tus necesidades
              especificas.
            </p>
            <div className="p4hero-stats" style={{ marginTop: "1.5rem" }}>
              <div className="p4hero-stat">
                <strong>Vinyasa</strong>
                <span>Flow dinamico</span>
              </div>
              <div className="p4hero-stat">
                <strong>Hatha</strong>
                <span>Tradicion clasica</span>
              </div>
              <div className="p4hero-stat">
                <strong>Restaurativo</strong>
                <span>Recuperacion profunda</span>
              </div>
            </div>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
              alt="Sesion de yoga grupal"
            />
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="p4sec p4sec-dark">
        <div className="p4sec-inner">
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop"
              alt="Meditacion al amanecer"
            />
          </div>
          <div className="p4sec-text">
            <span className="p4sec-label">Nuestra Historia</span>
            <h2 className="p4sec-title">
              Un Espacio
              <em>Para Ti</em>
            </h2>
            <p>
              Sattva nacio con la vision de crear un refugio urbano donde las
              personas pudieran reconectarse con su esencia. Desde 2018,
              hemos guiado a cientos de personas en su camino hacia el
              bienestar integral.
            </p>
            <p>
              Nuestros instructores certificados combinan la tradicion del
              yoga con tecnicas modernas de meditacion para ofrecerte una
              experiencia unica y transformadora.
            </p>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="p4gallery">
        <div className="p4gallery-header">
          <h2 className="p4sec-title">
            Nuestro <em>Espacio</em>
          </h2>
        </div>
        <div className="p4gallery-grid">
          <figure className="p4gallery-cell">
            <img
              src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop"
              alt="Estudio de yoga"
            />
            <figcaption>Estudio Principal</figcaption>
          </figure>
          <figure className="p4gallery-cell">
            <img
              src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop"
              alt="Sesion de meditacion"
            />
            <figcaption>Sala de Meditacion</figcaption>
          </figure>
          <figure className="p4gallery-cell">
            <img
              src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop"
              alt="Clase de pilates"
            />
            <figcaption>Area de Pilates</figcaption>
          </figure>
          <figure className="p4gallery-cell">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
              alt="Ambiente relajado"
            />
            <figcaption>Zona de Relax</figcaption>
          </figure>
          <figure className="p4gallery-cell">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"
              alt="Clase al aire libre"
            />
            <figcaption>Taller Externo</figcaption>
          </figure>
          <figure className="p4gallery-cell">
            <img
              src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop"
              alt="Meditacion grupal"
            />
            <figcaption>Circulo de Meditacion</figcaption>
          </figure>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="p4sec">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <span className="p4sec-label">Contacto</span>
            <h2 className="p4sec-title">
              Reserva
              <em>Tu Clase</em>
            </h2>
            <p>
              Completa el formulario y te contactaremos para confirmar tu
              lugar. Tambien podes escribirnos por WhatsApp.
            </p>
            <form className="p4contact-grid">
              <input
                type="text"
                className="p4input"
                placeholder="Nombre"
              />
              <input
                type="email"
                className="p4input"
                placeholder="Email"
              />
              <input
                type="tel"
                className="p4input"
                placeholder="Telefono"
              />
              <input
                type="text"
                className="p4input"
                placeholder="Clase de interes"
              />
              <textarea
                className="p4input"
                placeholder="Mensaje"
                rows={3}
                style={{ gridColumn: "1 / -1" }}
              />
              <button type="submit" className="p4btn" style={{ gridColumn: "1 / -1" }}>
                Enviar Mensaje
              </button>
            </form>
          </div>
          <div className="p4sec-text" style={{ borderRight: "none" }}>
            <span className="p4sec-label">Horarios</span>
            <div className="p4contact-info">
              <div className="p4contact-row">
                <span>Lunes a Viernes</span>
                <span>07:00 - 21:00</span>
              </div>
              <div className="p4contact-row">
                <span>Sabados</span>
                <span>08:00 - 18:00</span>
              </div>
              <div className="p4contact-row">
                <span>Domingos</span>
                <span>09:00 - 14:00</span>
              </div>
              <div className="p4contact-row">
                <span>Feriados</span>
                <span className="p4closed">Consultar</span>
              </div>
              <div className="p4contact-row">
                <span>Direccion</span>
                <span>Av. Corrientes 1234, CABA</span>
              </div>
              <div className="p4contact-row">
                <span>Telefono</span>
                <span>+54 11 4567-8901</span>
              </div>
              <div className="p4contact-row">
                <span>Email</span>
                <span>info@sattva.com.ar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p4footer">
        <p>&copy; 2026 Sattva Wellness. Todos los derechos reservados.</p>
      </footer>

      {/* FIRMA */}
      <div className="p4firma">
        <FirmaQuantumHive />
      </div>
    </div>
  );
}