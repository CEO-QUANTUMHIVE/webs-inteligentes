"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import styles from "./p6.module.css";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Star, 
  Heart, 
  Scissors, 
  CheckCircle2, 
  Mail
} from "lucide-react";

// Contador numérico animado al hacer scroll
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1800;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = value / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className={styles.statNumber}>
      {count}{suffix}
    </span>
  );
}

export default function P6ZealBarber() {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    asunto: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  // Parallax del Hero
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormularioEnviado(true);
    setTimeout(() => {
      setFormularioEnviado(false);
      setFormData({ nombre: "", asunto: "", telefono: "", email: "", mensaje: "" });
    }, 4000);
  };

  // Variantes de animación para scroll reveal
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: custom * 0.12,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <div className={styles.raiz}>
      
      {/* 1. HEADER / BARRA DE NAVEGACIÓN */}
      <motion.header 
        className={styles.header}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
      </motion.header>

      {/* 2. HERO SECTION CON ENTRADA ESCALONADA Y PARALLAX */}
      <section ref={heroRef} className={styles.heroSection}>
        <motion.div 
          className={styles.heroBgImage}
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1).webp')",
            y: heroBgY,
          }}
        />
        <div className={styles.heroOverlay} />
        
        <motion.div 
          className={styles.heroContent}
          style={{ opacity: heroOpacity }}
        >
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Cuidado Experto, <span>Estilo Impecable en Zeal Barber</span>
          </motion.h1>
          
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Donde la precisión se encuentra con la pasión. Viví una experiencia de barbería premium diseñada especialmente a tu medida.
          </motion.p>
          
          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <a href="#contacto" className={styles.btnPrimary}>
              Reservar un Turno
            </a>
            <a href="#servicios" className={styles.btnSecondary}>
              Ver Servicios
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CONTACT INFO CARDS (Flotando bajo el Hero con Stagger Scroll Reveal) */}
      <div className={styles.contactBarWrapper}>
        <div className={styles.contactGrid}>
          {[
            {
              icon: <MapPin className="w-5 h-5" />,
              title: "Dirección",
              content: <>Av. Libertador 4520, Piso 1<br />Palermo, Buenos Aires</>
            },
            {
              icon: <Phone className="w-5 h-5" />,
              title: "Teléfono",
              content: (
                <>
                  <a href="tel:+541145551234" className="hover:text-[#d4af37] transition-colors block">+54 (11) 4555-1234</a>
                  <a href="tel:+541145555678" className="hover:text-[#d4af37] transition-colors block">+54 (11) 4555-5678</a>
                </>
              )
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "Horarios",
              content: <>Lunes a Sábado: 9:00 a 20:00 hs<br />Domingos: 10:00 a 18:00 hs</>
            },
          ].map((card, idx) => (
            <motion.div 
              key={idx}
              className={styles.contactCard}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={styles.contactIcon}>
                {card.icon}
              </div>
              <h3 className={styles.contactCardTitle}>{card.title}</h3>
              <p className={styles.contactCardText}>{card.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. SECCIÓN SOBRE NOSOTROS CON ANIMACIÓN DE ENTRADA Y CONTADORES */}
      <section id="nosotros" className={styles.section}>
        <div className={styles.aboutGrid}>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className={styles.sectionTag}>Experiencia Exclusiva</span>
            <h2 className={styles.sectionTitle}>
              Servicios profesionales de barbería con máxima comodidad
            </h2>
            <p className={styles.sectionDesc}>
              Disfrutá de la máxima conveniencia y el lujo del cuidado personal. Desde cortes clásicos hasta los estilos más modernos, nuestros maestros barberos traen lo mejor del arte tradicional con técnicas de vanguardia.
            </p>

            <div className={styles.statsRow}>
              <div>
                <AnimatedCounter value={98} suffix="%" />
                <div className={styles.statLabel}>Satisfacción de Clientes</div>
              </div>
              <div>
                <AnimatedCounter value={12} suffix="+" />
                <div className={styles.statLabel}>Años de Trayectoria</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.aboutImageWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
          >
            <img 
              src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e12d0d327f116fa1a13513_about-img.webp" 
              alt="Sobre Zeal Barber" 
              className={styles.aboutImage}
            />
          </motion.div>

        </div>
      </section>

      {/* 5. SECCIÓN DE SERVICIOS (STAGGERED SCROLL REVEAL EN LAS 6 TARJETAS) */}
      <section id="servicios" className={styles.section}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <span className={styles.sectionTag}>Nuestra Carta</span>
          <h2 className={styles.sectionTitle}>Servicios Excepcionales a tu Medida</h2>
          <p className={styles.sectionDesc}>
            En Zeal Barber ofrecemos una variedad integral de servicios para mantenerte impecable y seguro. Cuidado de barba de primera línea y estilismo personalizado.
          </p>
        </motion.div>

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
            <motion.div 
              key={idx} 
              className={styles.serviceCard}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 35px rgba(0, 0, 0, 0.5)",
                borderColor: "rgba(212, 175, 55, 0.6)",
                transition: { duration: 0.3 } 
              }}
            >
              <motion.div 
                className={styles.serviceIconWrap}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={srv.icon} alt={srv.nombre} className="w-8 h-8 filter brightness-150" />
              </motion.div>
              <h3 className={styles.serviceName}>{srv.nombre}</h3>
              <p className={styles.serviceDesc}>{srv.desc}</p>
              <div className={styles.servicePrice}>{srv.precio}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. BANNER CTA INTERMEDIO */}
      <section className={styles.ctaBanner}>
        <motion.div 
          style={{ position: "relative", zIndex: 2 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeInUp}
        >
          <h2 className={styles.ctaTitle}>
            Disfrutá de servicios de barbería de primer nivel con el confort que merecés
          </h2>
          <motion.a 
            href="#contacto" 
            className={styles.btnPrimary}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Reservar un Turno
          </motion.a>
        </motion.div>
      </section>

      {/* 7. POR QUÉ ELEGIR ZEAL BARBER (STAGGER SCROLL) */}
      <section className={styles.section}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <span className={styles.sectionTag}>Nuestros Pilares</span>
          <h2 className={styles.sectionTitle}>¿Por qué elegir Zeal Barber?</h2>
          <p className={styles.sectionDesc}>
            Descubrí la diferencia de atendértete con un equipo de profesionales comprometidos con la excelencia y la personalización de cada detalle.
          </p>
        </motion.div>

        <div className={styles.whyGrid}>
          {[
            {
              icon: <ShieldCheck className="w-8 h-8" />,
              title: "Profesionales Expertos",
              desc: "Especialistas apasionados dedicados a ofrecer resultados impecables y duraderos."
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Productos Premium",
              desc: "Utilizamos solo productos importados y orgánicos de la más alta calidad internacional."
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Máximo Confort",
              desc: "Ambiente relajante, atención puntual y café de especialidad de cortesía en cada visita."
            },
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              className={styles.whyCard}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={styles.whyIcon}>
                {item.icon}
              </div>
              <h3 className={styles.whyCardTitle}>{item.title}</h3>
              <p className={styles.whyCardText}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. SECCIÓN TESTIMONIOS (SLIDE-IN ON SCROLL) */}
      <section id="testimonios" className={styles.section}>
        <motion.div 
          className={styles.testimonialBox}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <motion.img 
            src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66f4f8796c3e7ab6417c2059_Img.png" 
            alt="Cliente Satisfecho" 
            className={styles.authorImg}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <div>
            <p className={styles.quoteText}>
              &quot;¡Zeal Barber redefinió por completo mi experiencia de aseo personal! El equipo brinda un servicio impecable y una atención al detalle inigualable. Cada visita se siente como una sesión de cuidado exclusivo. ¡100% recomendado!&quot;
            </p>
            <div className={styles.authorName}>Santiago Méndez</div>
            <div className={styles.authorRole}>Cliente Frecuente · CEO de InnovateTech</div>
          </div>
        </motion.div>
      </section>

      {/* 9. FORMULARIO DE RESERVAS Y CONTACTO */}
      <section id="contacto" className={styles.bookingSection}>
        <div className={styles.bookingGrid}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
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
          </motion.div>

          <motion.div 
            className={styles.formWrap}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {formularioEnviado ? (
              <motion.div 
                style={{ textAlign: "center", padding: "3rem 1rem" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto mb-3" />
                <h3 className={styles.serviceName}>¡Turno Solicitado con Éxito!</h3>
                <p className={styles.serviceDesc}>
                  Nos pondremos en contacto a la brevedad para confirmar tu horario.
                </p>
              </motion.div>
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

                <motion.button 
                  type="submit" 
                  className={styles.btnPrimary} 
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirmar Reserva de Turno
                </motion.button>
              </form>
            )}
          </motion.div>

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

      {/* 11. FIRMA INSTITUCIONAL STANDARDIZADA DE QUANTUM HIVE */}
      <FirmaQuantumHive />

    </div>
  );
}
