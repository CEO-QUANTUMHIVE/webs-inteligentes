"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./p6.module.css";
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Star, 
  Heart, 
  Scissors, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  Sparkles,
  Calendar
} from "lucide-react";

export default function P6ZealBarber() {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    asunto: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormularioEnviado(true);
    setTimeout(() => {
      setFormularioEnviado(false);
      setFormData({ nombre: "", asunto: "", telefono: "", email: "", mensaje: "" });
    }, 4000);
  };

  return (
    <div className={styles.raiz}>
      
      {/* 1. HEADER / BARRA DE NAVEGACIÓN */}
      <header className={styles.header}>
        <div className={styles.logoWrap}>
          <Scissors className="w-6 h-6 text-[#d4af37]" />
          <span className={styles.logoText}>
            ZEAL <span>BARBER</span>
          </span>
        </div>

        <nav>
          <ul className={styles.navLinks}>
            <li><a href="#servicios" className={styles.navLink}>Servicios</a></li>
            <li><a href="#nosotros" className={styles.navLink}>Nosotros</a></li>
            <li><a href="#testimonios" className={styles.navLink}>Testimonios</a></li>
            <li><a href="#contacto" className={styles.navLink}>Contacto</a></li>
          </ul>
        </nav>

        <a href="#contacto" className={styles.btnPrimary}>
          Reservar Turno
        </a>
      </header>

      {/* 2. HERO SECTION */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: "url('https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1).webp')",
        }}
      >
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Cuidado Experto, <span>Estilo Impecable en Zeal Barber</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Donde la precisión se encuentra con la pasión. Viví una experiencia de barbería premium diseñada especialmente a tu medida.
          </p>
          <div className={styles.heroButtons}>
            <a href="#contacto" className={styles.btnPrimary}>
              Reservar un Turno
            </a>
            <a href="#servicios" className={styles.btnSecondary}>
              Ver Servicios
            </a>
          </div>
        </div>
      </section>

      {/* 3. CONTACT INFO CARDS (Flotando bajo el Hero) */}
      <div className={styles.contactBarWrapper}>
        <div className={styles.contactGrid}>
          
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className={styles.contactCardTitle}>Dirección</h3>
            <p className={styles.contactCardText}>
              Av. Libertador 4520, Piso 1<br />Palermo, Buenos Aires
            </p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <Phone className="w-5 h-5" />
            </div>
            <h3 className={styles.contactCardTitle}>Teléfono</h3>
            <p className={styles.contactCardText}>
              <a href="tel:+541145551234" className="hover:text-[#d4af37] transition-colors">
                +54 (11) 4555-1234
              </a><br />
              <a href="tel:+541145555678" className="hover:text-[#d4af37] transition-colors">
                +54 (11) 4555-5678
              </a>
            </p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <Clock className="w-5 h-5" />
            </div>
            <h3 className={styles.contactCardTitle}>Horarios</h3>
            <p className={styles.contactCardText}>
              Lunes a Sábado: 9:00 a 20:00 hs<br />
              Domingos: 10:00 a 18:00 hs
            </p>
          </div>

        </div>
      </div>

      {/* 4. SECCIÓN SOBRE NOSOTROS */}
      <section id="nosotros" className={styles.section}>
        <div className={styles.aboutGrid}>
          
          <div>
            <span className={styles.sectionTag}>Experiencia Exclusiva</span>
            <h2 className={styles.sectionTitle}>
              Servicios profesionales de barbería con máxima comodidad
            </h2>
            <p className={styles.sectionDesc}>
              Disfrutá de la máxima conveniencia y el lujo del cuidado personal. Desde cortes clásicos hasta los estilos más modernos, nuestros maestros barberos traen lo mejor del arte tradicional con técnicas de vanguardia.
            </p>

            <div className={styles.statsRow}>
              <div>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>Satisfacción de Clientes</div>
              </div>
              <div>
                <div className={styles.statNumber}>12+</div>
                <div className={styles.statLabel}>Años de Trayectoria</div>
              </div>
            </div>
          </div>

          <div className={styles.aboutImageWrap}>
            <img 
              src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e12d0d327f116fa1a13513_about-img.webp" 
              alt="Sobre Zeal Barber" 
              className={styles.aboutImage}
            />
          </div>

        </div>
      </section>

      {/* 5. SECCIÓN DE SERVICIOS */}
      <section id="servicios" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Nuestra Carta</span>
          <h2 className={styles.sectionTitle}>Servicios Excepcionales a tu Medida</h2>
          <p className={styles.sectionDesc}>
            En Zeal Barber ofrecemos una variedad integral de servicios para mantenerte impecable y seguro. Cuidado de barba de primera línea y estilismo personalizado.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          
          {[
            {
              nombre: "Corte de Adulto",
              desc: "Corte profesional a tijera y máquina con lavado premium y peinado incluido.",
              precio: "$15.000 ARS",
              icon: "https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368f745c48b34de24564_1.svg"
            },
            {
              nombre: "Afeitado Clásico",
              desc: "Afeitado al ras con toalla caliente, aceites esenciales y loción refrescante.",
              precio: "$12.000 ARS",
              icon: "https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368ed54a37cc7db6c354_2.svg"
            },
            {
              nombre: "Corte para Niños",
              desc: "Corte dedicado con la mayor paciencia y detalle para los más chicos.",
              precio: "$11.000 ARS",
              icon: "https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368ef1622ce81a1ccf62_3.svg"
            },
            {
              nombre: "Hidratación Capilar",
              desc: "Tratamiento intensivo para nutrir el cuero cabelludo y revitalizar el cabello.",
              precio: "$14.000 ARS",
              icon: "https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368e77419ca122237c96_4.svg"
            },
            {
              nombre: "Perfilado de Barba",
              desc: "Diseño de líneas de contorno con navaja y recorte milimétrico de barba.",
              precio: "$10.500 ARS",
              icon: "https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e13690086f71672a680d85_6.svg"
            },
            {
              nombre: "Cuidado Integral de Barba",
              desc: "Lavado exfoliante, hidratación con bálsamo orgánico y peinado modelador.",
              precio: "$16.500 ARS",
              icon: "https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368e59cc3bb79116a7e0_5.svg"
            },
          ].map((srv, idx) => (
            <div key={idx} className={styles.serviceCard}>
              <div className={styles.serviceIconWrap}>
                <img src={srv.icon} alt={srv.nombre} className="w-8 h-8 filter brightness-150" />
              </div>
              <h3 className={styles.serviceName}>{srv.nombre}</h3>
              <p className={styles.serviceDesc}>{srv.desc}</p>
              <div className={styles.servicePrice}>{srv.precio}</div>
            </div>
          ))}

        </div>
      </section>

      {/* 6. BANNER CTA INTERMEDIO */}
      <section className={styles.ctaBanner}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 className={styles.ctaTitle}>
            Disfrutá de servicios de barbería de primer nivel con el confort que merecés
          </h2>
          <a href="#contacto" className={styles.btnPrimary}>
            Reservar un Turno
          </a>
        </div>
      </section>

      {/* 7. POR QUÉ ELEGIR ZEAL BARBER */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Nuestros Pilares</span>
          <h2 className={styles.sectionTitle}>¿Por qué elegir Zeal Barber?</h2>
          <p className={styles.sectionDesc}>
            Descubrí la diferencia de atendértete con un equipo de profesionales comprometidos con la excelencia y la personalización de cada detalle.
          </p>
        </div>

        <div className={styles.whyGrid}>
          
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className={styles.whyCardTitle}>Profesionales Expertos</h3>
            <p className={styles.whyCardText}>
              Especialistas apasionados dedicados a ofrecer resultados impecables y duraderos.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <Star className="w-8 h-8" />
            </div>
            <h3 className={styles.whyCardTitle}>Productos Premium</h3>
            <p className={styles.whyCardText}>
              Utilizamos solo productos importados y orgánicos de la más alta calidad internacional.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <Heart className="w-8 h-8" />
            </div>
            <h3 className={styles.whyCardTitle}>Máximo Confort</h3>
            <p className={styles.whyCardText}>
              Ambiente relajante, atención puntual y café de especialidad de cortesía en cada visita.
            </p>
          </div>

        </div>
      </section>

      {/* 8. SECCIÓN TESTIMONIOS */}
      <section id="testimonios" className={styles.section}>
        <div className={styles.testimonialBox}>
          <img 
            src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66f4f8796c3e7ab6417c2059_Img.png" 
            alt="Cliente Satisfecho" 
            className={styles.authorImg}
          />
          <div>
            <p className={styles.quoteText}>
              &quot;¡Zeal Barber redefinió por completo mi experiencia de aseo personal! El equipo brinda un servicio impecable y una atención al detalle inigualable. Cada visita se siente como una sesión de cuidado exclusivo. ¡100% recomendado!&quot;
            </p>
            <div className={styles.authorName}>Santiago Méndez</div>
            <div className={styles.authorRole}>Cliente Frecuente · CEO de InnovateTech</div>
          </div>
        </div>
      </section>

      {/* 9. FORMULARIO DE RESERVAS Y CONTACTO */}
      <section id="contacto" className={styles.bookingSection}>
        <div className={styles.bookingGrid}>
          
          <div>
            <span className={styles.sectionTag}>Turnos Online</span>
            <h2 className={styles.sectionTitle} style={{ textAlign: "left" }}>
              Agendá tu Cita Hoy Mismo
            </h2>
            <p className={styles.sectionDesc} style={{ textAlign: "left", marginBottom: "2rem" }}>
              Elegí tu fecha preferida y nuestros barberos te confirmarán el horario de inmediato. Atención personalizada y sin esperas.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className={styles.contactIcon} style={{ margin: 0 }}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase" }}>Llamanos</div>
                  <div style={{ fontWeight: 600, color: "#fff" }}>+54 (11) 4555-1234</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className={styles.contactIcon} style={{ margin: 0 }}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase" }}>Email</div>
                  <div style={{ fontWeight: 600, color: "#fff" }}>contacto@zealbarber.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formWrap}>
            {formularioEnviado ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto mb-3" />
                <h3 className={styles.serviceName}>¡Turno Solicitado con Éxito!</h3>
                <p className={styles.serviceDesc}>
                  Nos pondremos en contacto a la brevedad para confirmar tu horario.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nombre Completo</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Juan Pérez"
                    className={styles.input}
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>

                <div className={styles.row2}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Teléfono</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+54 11 ..."
                      className={styles.input}
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="juan@correo.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Servicio Deseado</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Corte de Adulto + Perfilado de Barba"
                    className={styles.input}
                    value={formData.asunto}
                    onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Mensaje o Preferencia de Horario</label>
                  <textarea 
                    placeholder="Contanos tu disponibilidad horaria o detalles..."
                    className={styles.textarea}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  />
                </div>

                <button type="submit" className={styles.btnPrimary} style={{ width: "100%", marginTop: "0.5rem" }}>
                  Confirmar Reserva de Turno
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 10. MAPA DE UBICACIÓN */}
      <div style={{ width: "100%", height: "380px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.9961685419997!2d-58.420658424260385!3d-34.57895697296338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb577b212f451%3A0x6b1df3df43d463d4!2sPalermo%2C%20CABA!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* 11. FOOTER CON ATRIBUCIÓN MANDATORIA POWERED BY QUANTUM HIVE */}
      <footer className={styles.footerBottom}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            © {new Date().getFullYear()} Zeal Barber. Todos los derechos reservados.
          </div>
          <div>
            Powered by <strong style={{ color: "#d4af37" }}>Quantum Hive</strong> · Web Factory
          </div>
        </div>
      </footer>

    </div>
  );
}
