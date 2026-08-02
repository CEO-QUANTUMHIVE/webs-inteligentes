import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  ChevronDown,
  Gauge,
  Menu,
  Rocket,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const portrait =
  "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68d13451c404d0ec3a46daf4_Rectangle%20579.webp";

const serviceImages = [
  "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68f758f85f19a6e5847b4026_Mask%20group-2.avif",
  "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68f758f885e0a132883e0218_Rectangle%20186.avif",
  "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68f758f925f9b4a4340505c0_Mask%20group.avif",
  "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68f758f82c42caaf8e32d313_Mask%20group-3.avif",
  "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68f758f88ddf989488d83875_Mask%20group-1.avif",
  "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68f758f9e76202856897b612_Group%20836.avif",
];

const tools = [
  { name: "Figma", mark: "Fi", color: "#f24e1e" },
  { name: "Builder", mark: "B", color: "#18b4f4" },
  { name: "Webflow", mark: "W", color: "#4353ff" },
  { name: "C++", mark: "C++", color: "#659ad2" },
  { name: "JavaScript", mark: "JS", color: "#f7df1e" },
  { name: "React", mark: "⚛", color: "#61dafb" },
];

const benefits = [
  {
    icon: Rocket,
    title: "Lanzamiento más rápido",
    text: "Publicá webs, apps y funcionalidades rápidamente sin sacrificar calidad.",
  },
  {
    icon: Gauge,
    title: "Enfoque en el crecimiento",
    text: "Con la tecnología resuelta, podés centrarte en estrategia, clientes e ingresos.",
  },
  {
    icon: Sparkles,
    title: "Ventaja competitiva",
    text: "Soluciones digitales modernas y optimizadas para destacar en tu mercado.",
  },
];

const services = [
  { name: "Front-End", detail: "Interfaces rápidas y expresivas", image: serviceImages[0] },
  { name: "Back-End", detail: "Sistemas sólidos y escalables", image: serviceImages[3] },
  { name: "Apps e integraciones", detail: "Productos conectados de punta a punta", image: serviceImages[2] },
  { name: "Soporte", detail: "Mantenimiento y evolución continua", image: serviceImages[5] },
];

const projects = [
  { name: "Dean & Morgan", type: "Sitio para agencia digital", category: "Webs", image: serviceImages[0] },
  { name: "Ostomi", type: "Marketplace de coleccionables", category: "Webs", image: serviceImages[1] },
  { name: "Tracify", type: "Aplicación de seguimiento", category: "Apps", image: serviceImages[2] },
  { name: "SportiLab", type: "Ecommerce deportivo", category: "Apps", image: serviceImages[3] },
  { name: "Everyday Yoga", type: "App de entrenamiento", category: "Apps", image: serviceImages[4] },
  { name: "Focus", type: "Portfolio fotográfico", category: "Webs", image: serviceImages[5] },
];

const testimonials = [
  {
    name: "Diana Ross",
    handle: "@dRossConsulting",
    text: "Codix convirtió nuestras ideas en un producto que superó todas las expectativas. El proceso fue claro, rápido y sin estrés.",
    image: "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68e783f748919456ec451989_Rectangle%20606.webp",
  },
  {
    name: "Alex Scott",
    handle: "@AlexScottWhittman",
    text: "Nuestro sitio funciona mejor que nunca. Optimizó el rendimiento, mejoró la experiencia y lo hizo realmente útil para el equipo.",
    image: "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68e786b879f88772b20b90d3_Rectangle%20607.webp",
  },
  {
    name: "Fiona Johnes",
    handle: "@FionaJohnes107",
    text: "El proyecto fue fluido de principio a fin. La comunicación fue directa y cada recomendación aportó valor.",
    image: "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68e7878f8a050511258d4059_Rectangle%20608.webp",
  },
  {
    name: "Katherine Kiton",
    handle: "@KatherineKLaw",
    text: "Entendió nuestros objetivos y transformó la visión en un producto pulido que impresionó a todo el equipo.",
    image: "https://cdn.prod.website-files.com/68d1258e69778415d835fd59/68e7878f8ae2d34ebf8e2577_Rectangle%20609.webp",
  },
];

const faqs = [
  ["¿Cuánto tarda un proyecto?", "El plazo depende de la complejidad. Antes de empezar vas a recibir una estimación clara, etapas concretas y fechas de entrega realistas."],
  ["¿Qué soporte ofrecés después del lanzamiento?", "Ofrezco mantenimiento continuo para que tu web o aplicación permanezca segura, optimizada y actualizada."],
  ["¿Cómo asegurás que el proyecto cumpla mis objetivos?", "Comenzamos con una etapa de descubrimiento, validamos el alcance y mantenemos comunicación abierta durante todo el proceso."],
  ["¿Podés trabajar con mis sistemas actuales?", "Sí. Integro nuevas soluciones con herramientas existentes sin interrumpir el flujo de trabajo de tu negocio."],
  ["¿Cómo calculás el presupuesto?", "Vas a recibir un precio transparente y un desglose claro antes de comenzar, sin costos ocultos."],
  ["¿Qué influye en el precio?", "La complejidad, las funcionalidades, integraciones, diseño, tiempo de desarrollo y nivel de soporte requerido."],
];

const navItems = [
  ["Sobre mí", "#sobre-mi"],
  ["Servicios", "#servicios"],
  ["Proceso", "#proceso"],
  ["Precios", "#precios"],
  ["Opiniones", "#opiniones"],
  ["Preguntas", "#preguntas"],
];

function SectionRail({ label, number }: { label: string; number: string }) {
  return (
    <div className="section-rail reveal">
      <span><i />{label}</span>
      <span>({number})</span>
    </div>
  );
}

function SectionIntro({ title, text, cta }: { title: string; text: string; cta?: string }) {
  return (
    <div className="section-intro">
      <h2 className="reveal">{title}</h2>
      <div className="intro-copy reveal">
        <p>{text}</p>
        {cta && <a className="text-link" href="#contacto">{cta}<ArrowUpRight size={17} /></a>}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("Todos");
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const filteredProjects = projectFilter === "Todos"
    ? projects
    : projects.filter((project) => project.category === projectFilter);

  return (
    <main>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Navegación principal">
          <a className="logo" href="#inicio" aria-label="Codix, inicio">
            <Braces size={23} strokeWidth={2.5} />
            <strong>codix</strong>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="nav-contact" href="#contacto" onClick={() => setMenuOpen(false)}><i />Contacto</a>
          </div>
        </nav>
      </header>

      <section className="hero section" id="inicio">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-grid" />
        <div className="availability">
          <div>
            <span>Disponible para trabajar</span><i />
            <span>Disponible para trabajar</span><i />
            <span>Disponible para trabajar</span><i />
          </div>
        </div>
        <div className="hero-content">
          <h1>Experto en <span className="hero-face" style={{ backgroundImage: `url(${portrait})` }} /> <br />desarrollo web</h1>
          <a className="outline-button" href="#contacto">Hablemos de tu proyecto<ArrowUpRight size={18} /></a>
        </div>
        <div className="rating-card"><span>★★★★★</span><strong>4,82</strong><small>(123 reseñas)</small></div>
        <div className="cursor-note"><ArrowUpRight /><span>hola@codix.io</span></div>
      </section>

      <section className="section" id="sobre-mi">
        <div className="container">
          <SectionRail label="Sobre mí" number="01" />
          <div className="about-grid">
            <div className="about-heading reveal">
              <h2>Desarrollador dedicado</h2>
              <img src={portrait} alt="Retrato en blanco y negro del desarrollador" />
            </div>
            <div className="about-copy reveal">
              <h3>Hola, soy Max Haxton.<br />Desarrollador con experiencia.</h3>
              <p>Con formación en informática y especialización en desarrollo web moderno, trabajé con startups y empresas en crecimiento. Mi objetivo es crear webs, aplicaciones y herramientas que produzcan resultados reales: lanzamientos más rápidos, procesos más fluidos y usuarios más felices.</p>
              <h4>Mi trayectoria</h4>
              <ul className="career-list">
                <li><span>2017—2019</span> Desarrollador web junior · Web Story</li>
                <li><span>2019—2021</span> Desarrollador front-end · Key Dev 94</li>
                <li><span>2021—2024</span> Lead Developer · Honey App</li>
                <li><span>2024—Hoy</span> Desarrollador independiente</li>
              </ul>
            </div>
          </div>

          <div className="expertise">
            <p className="eyebrow reveal">Mi experiencia</p>
            <div className="tools-grid">
              {tools.map((tool) => (
                <article className="tool-card reveal" key={tool.name} style={{ "--tool-color": tool.color } as React.CSSProperties}>
                  <b>{tool.mark}</b><span>{tool.name}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="ventajas">
        <div className="container">
          <SectionRail label="Ventajas" number="02" />
          <SectionIntro title="Por qué trabajar conmigo" text="Elegir al desarrollador correcto puede definir el éxito de tu proyecto. Mi trabajo no termina en el código: está orientado a resultados." cta="Consulta gratuita" />
          <div className="benefits-grid">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article className="benefit-card reveal" key={title}>
                <span className="icon-box"><Icon size={22} /></span>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="container">
          <SectionRail label="Servicios" number="03" />
          <SectionIntro title="Soluciones a medida" text="Desde la idea hasta el lanzamiento, te acompaño de punta a punta. Hagamos que tu próxima solución realmente funcione." cta="Planificar un proyecto" />
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <a href="#contacto" className="service-row" key={service.name}>
              <span className="service-index">0{index + 1}</span>
              <h3>{service.name}</h3>
              <img src={service.image} alt="" />
              <span className="service-detail">{service.detail}</span>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>

      <section className="section" id="proceso">
        <div className="container">
          <SectionRail label="Proceso" number="04" />
          <SectionIntro title="Cómo trabajaremos juntos" text="Un proceso simple y transparente transforma tus ideas en resultados con menos vueltas y mejores decisiones." cta="Agendar una reunión" />
          <div className="process-grid">
            {[
              ["01", "Análisis", "Entendemos tus objetivos, usuarios y desafíos antes de tomar decisiones."],
              ["02", "Desarrollo", "Convertimos la idea en una experiencia rápida, clara y fácil de usar."],
              ["03", "Integración", "Conectamos sistemas, herramientas y aplicaciones para que todo fluya."],
              ["04", "Optimización", "Mejoramos rendimiento, estabilidad y escalabilidad antes del lanzamiento."],
            ].map(([number, title, text]) => (
              <article className="process-card reveal" key={number}>
                <span>Paso {number}</span><h3>{title}</h3><p>{text}</p><i>{number}</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section portfolio-section" id="portfolio">
        <div className="container">
          <SectionRail label="Portfolio" number="04" />
          <SectionIntro title="Proyectos destacados" text="Productos digitales diseñados para verse bien, funcionar mejor y acompañar el crecimiento de cada negocio." />
          <div className="portfolio-tabs" role="tablist">
            {["Todos", "Apps", "Webs"].map((filter) => (
              <button className={projectFilter === filter ? "active" : ""} onClick={() => setProjectFilter(filter)} key={filter}>{filter}</button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card reveal" key={project.name}>
                <div className="project-image">
                  <img src={project.image} alt={`Proyecto ${project.name}`} />
                  <a href="#contacto">Ver proyecto<ArrowUpRight size={18} /></a>
                </div>
                <div><h3>{project.name}</h3><p>{project.type}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="precios">
        <div className="container">
          <SectionRail label="Precios" number="06" />
          <SectionIntro title="Opciones flexibles" text="Elegí la modalidad que mejor se adapte a tus objetivos y obtené el acompañamiento que tu proyecto necesita." cta="Consultar disponibilidad" />
          <div className="pricing-grid">
            <article className="price-card reveal">
              <span className="plan-label">Por proyecto</span><h3>Colaboración puntual</h3>
              <p>Un precio claro para una solución completa y diseñada alrededor de tus objetivos.</p>
              <small>Desde</small><strong>USD 5.000 <em>/ proyecto</em></strong>
              <a href="#contacto">Reservar proyecto<ArrowRight size={17} /></a>
              <ul><li>Planificación y alcance detallado</li><li>Desarrollo a medida</li><li>Pruebas de calidad</li><li>Publicación y soporte inicial</li></ul>
            </article>
            <article className="price-card featured reveal">
              <span className="plan-label">Mensual</span><h3>Soporte a largo plazo</h3>
              <p>Una modalidad continua para mantener tus productos seguros, optimizados y en evolución.</p>
              <small>Desde</small><strong>USD 2.000 <em>/ mes</em></strong>
              <a href="#contacto">Empezar ahora<ArrowRight size={17} /></a>
              <ul><li>Mejoras y funcionalidades frecuentes</li><li>Monitoreo de rendimiento</li><li>Resolución rápida de errores</li><li>Soporte flexible</li></ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section testimonial-section" id="opiniones">
        <div className="container">
          <SectionRail label="Testimonios" number="07" />
          <SectionIntro title="Lo que dicen mis clientes" text="Historias de equipos que consiguieron mejores productos, procesos más simples y resultados que se sostienen en el tiempo." />
          <div className="ratings reveal"><span>UPWORK <b>★ 4,86</b></span><span>FIVERR <b>★ 4,8</b></span></div>
        </div>
        <div className="testimonial-marquee">
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article className="testimonial-card" key={`${item.name}-${index}`}>
                <div><img src={item.image} alt={`Retrato de ${item.name}`} /><span><strong>{item.name}</strong><small>{item.handle}</small></span></div>
                <p>“{item.text}”</p><span className="stars">★★★★★</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="preguntas">
        <div className="container">
          <SectionRail label="Preguntas" number="08" />
          <div className="faq-grid">
            <div className="faq-heading reveal"><h2>Antes de empezar</h2><p>Respuestas claras sobre el proceso, los tiempos y la forma de trabajo.</p><a className="text-link" href="#contacto">Reservar una llamada<ArrowUpRight size={17} /></a></div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <article className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown /></button>
                  <div><p>{answer}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contacto">
        <div className="container contact-grid">
          <div className="contact-copy reveal">
            <span className="eyebrow">Contacto</span><h2>¿Todavía tenés preguntas?</h2>
            <p>Contame sobre tu proyecto y te respondo con próximos pasos concretos.</p>
            <div className="contact-facts"><span><small>Teléfono</small>+1 800 600 523 170</span><span><small>Email</small>hola@codix.io</span></div>
          </div>
          <form className="contact-form reveal" onSubmit={submitForm}>
            <div className="form-row"><label>Nombre completo<input required placeholder="Tu nombre" /></label><label>Teléfono<input placeholder="+54 11 0000 0000" /></label></div>
            <label>Email<input type="email" required placeholder="vos@empresa.com" /></label>
            <label>Detalles del proyecto<textarea required placeholder="¿Qué querés construir?" rows={5} /></label>
            <button type="submit">{sent ? "Mensaje recibido" : "Enviar consulta"}<ArrowUpRight size={18} /></button>
          </form>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-hero"><p>Hagamos algo que funcione</p><a href="#contacto">Hablemos de<br />tu proyecto <ArrowUpRight /></a></div>
          <div className="footer-row">
            <div className="logo footer-logo"><Braces size={21} /><strong>codix</strong></div>
            <div className="social-links"><a href="#contacto">LinkedIn</a><a href="#contacto">Fiverr</a><a href="#contacto">Upwork</a></div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Codix. Todos los derechos reservados.</span>
            <a className="powered-by" href="https://quantumhive.com.ar" target="_blank" rel="noreferrer"><Zap size={14} fill="currentColor" />Powered by Quantum Hive</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
