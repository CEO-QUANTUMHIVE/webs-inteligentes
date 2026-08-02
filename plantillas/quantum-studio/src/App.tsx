import { FormEvent, useEffect, useState } from "react";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const navItems = [
  ["Enfoque", "#enfoque"],
  ["Servicios", "#identidad"],
  ["Proyectos", "#portfolio"],
  ["Planes", "#planes"],
];

const approach = [
  {
    number: "01",
    title: "Investigación",
    text: "Analizamos el mercado, la audiencia y las referencias para definir una dirección visual estratégica antes de diseñar.",
    progress: 30,
    stage: "BASE",
  },
  {
    number: "02",
    title: "Diseño y ejecución",
    text: "Convertimos la estrategia en interfaces de alta fidelidad y código de alto rendimiento con una experiencia consistente.",
    progress: 70,
    stage: "PRODUCCIÓN",
  },
  {
    number: "03",
    title: "Pruebas y entrega",
    text: "Probamos cada detalle, pulimos las interacciones y entregamos un sistema preparado para crecer con la marca.",
    progress: 100,
    stage: "ENTREGA",
  },
];

const recognition = [
  ["QH SELECTED", "Dirección de marca"],
  ["UI COLLECTION", "Interfaz destacada"],
  ["MOTION INDEX", "Experiencia inmersiva"],
  ["DIGITAL CRAFT", "Desarrollo preciso"],
  ["FUTURE VISION", "Sistema escalable"],
  ["STUDIO PICK", "Selección editorial"],
];

const marketingRows = [
  ["01.", "Auditoría estratégica", "Arquitectura de contenido, posicionamiento y oportunidad digital."],
  ["02.", "Campañas de rendimiento", "Sistemas medibles para transformar atención en crecimiento sostenido."],
  ["03.", "Optimización continua", "Iteraciones guiadas por datos, comportamiento y objetivos comerciales."],
];

const interactionCards = [
  ["UI/UX Strategy", "Investigación de usuarios", "Mapas de conversión", "150+ pantallas", "ESTRATÉGICO"],
  ["Producto digital", "Prototipos de alta fidelidad", "Arquitectura SaaS", "Escala global", "NATIVO"],
  ["No-code & Automation", "Flujos automatizados", "CRM a medida", "Entrega puntual", "CONFIABLE"],
];

const projects = [
  {
    name: "Núcleo",
    tags: "IDENTIDAD · WEB",
    text: "Un sistema digital creado para amplificar una marca tecnológica de nueva generación.",
    image: "project-chip.jpg",
  },
  {
    name: "Synapse",
    tags: "PRODUCTO · MOTION",
    text: "Narrativa visual y movimiento para una plataforma de inteligencia conectada.",
    image: "project-neural.jpg",
  },
  {
    name: "Orbit",
    tags: "APP · EXPERIENCIA",
    text: "Arquitectura modular para operar sistemas complejos desde una interfaz clara.",
    image: "project-orchestration.jpg",
  },
  {
    name: "Pulse",
    tags: "ESTRATEGIA · INTERACCIÓN",
    text: "Una presencia editorial que convierte datos y conexiones en una historia tangible.",
    image: "project-chat.jpg",
  },
];

const pricing = [
  {
    name: "Esencial",
    monthly: "3.500",
    yearly: "33.600",
    text: "Calidad exclusiva para marcas en crecimiento.",
    items: ["Dirección visual", "Sitio responsive", "Animación esencial", "SEO técnico"],
  },
  {
    name: "Estudio",
    monthly: "5.000",
    yearly: "48.000",
    text: "Transformación digital integral para equipos ambiciosos.",
    items: ["Todo Esencial", "Motion avanzado", "CMS a medida", "Auditoría de conversión"],
    featured: true,
  },
  {
    name: "Socio creativo",
    monthly: "8.000",
    yearly: "76.800",
    text: "Un equipo senior integrado a la evolución de tu negocio.",
    items: ["Estrategia de marca", "Sistema digital completo", "Liderazgo dedicado", "Soporte continuo"],
  },
];

const faqs = [
  ["¿Cómo solicito un proyecto?", "Completá el formulario con el contexto disponible. Respondemos con próximos pasos, alcance inicial y una reunión de descubrimiento."],
  ["¿Cuánto demora la primera entrega?", "La dirección inicial se presenta en pocos días. El calendario final depende del alcance y queda definido antes de comenzar."],
  ["¿Con qué herramientas trabajan?", "Diseñamos en Figma y desarrollamos con herramientas modernas según las necesidades de cada proyecto."],
  ["¿Por qué un estudio y no un equipo interno?", "Sumás experiencia multidisciplinaria sin la estructura, contratación y costos fijos de ampliar un equipo permanente."],
  ["¿Qué pasa si una propuesta no convence?", "Trabajamos por etapas y validamos la dirección temprano. El proceso incluye rondas claras de ajuste y refinamiento."],
];

const partners = ["LVA", "FIN", "AWS", "UPS", "SAP", "GG", "LG"];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function SectionIndex({ value }: { value: string }) {
  return <span className="section-index" aria-hidden="true">{value}</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", `${max > 0 ? scrollY / max : 0}`);
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", updateProgress);
    };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <div className="scroll-progress" />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Quantum Studio, inicio">QUANTUM STUDIO</a>
        <div className="header-location">/ Buenos Aires, AR <span>•</span> 10:24 AM</div>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegación principal">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#contacto">Iniciar proyecto <Arrow diagonal /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? "Cerrar" : "Menú"}
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-media">
          <img src={asset("hero.jpg")} alt="Arquitectura tecnológica hexagonal en negro y oro" />
          <div className="hero-streak streak-one" />
          <div className="hero-streak streak-two" />
        </div>
        <div className="hero-copy reveal">
          <p className="eyebrow">Estudio creativo galardonado</p>
          <h1>Quantum<br />Studio</h1>
        </div>
        <div className="hero-summary reveal">
          <strong>63k+</strong>
          <span>Impactos<br />digitales</span>
          <p>Agencia global que crea productos digitales, identidades y experiencias de alto nivel.</p>
        </div>
        <a className="hero-card reveal" href="#contacto">
          <span>¿Tenés un proyecto?</span>
          <strong>HAGAMOS ALGO<br />EXTRAORDINARIO</strong>
          <Arrow diagonal />
        </a>
        <div className="hero-footer">
          <span>ESTRATEGIA, DISEÑO, TECNOLOGÍA</span>
          <a href="#enfoque">Conocé el estudio <Arrow /></a>
        </div>
      </section>

      <section className="statement section-shell">
        <div className="statement-visual reveal">
          <img src={asset("presentation.jpg")} alt="Laboratorio digital con estructuras hexagonales" />
          <span>DESDE 2020</span>
        </div>
        <h2 className="reveal">Definimos el futuro de las marcas con estrategia audaz, oficio digital y una narrativa profundamente humana.</h2>
        <div className="entity-line reveal">
          {['BEHANCE', 'DRIBBBLE', 'FWA INDEX', 'DESIGN AWARDS'].map(item => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="metrics section-shell">
        {[["35+", "Proyectos destacados"], ["65", "Marcas y aliados"], ["98+", "Experiencias lanzadas"]].map(([value, label]) => (
          <article className="metric reveal" key={label}><strong>{value}</strong><span>{label}</span></article>
        ))}
        <div className="metrics-copy reveal">
          <p>Diseñamos estándares digitales para marcas que buscan una presencia clara, memorable y preparada para crecer.</p>
          <a href="#identidad">Sobre Quantum Studio <Arrow diagonal /></a>
        </div>
      </section>

      <section className="approach section-shell" id="enfoque">
        <div className="section-heading reveal">
          <p className="eyebrow">Proceso</p>
          <h2>Nuestro enfoque</h2>
          <p>Servicios creados a medida para acelerar el crecimiento de cada modelo de negocio.</p>
        </div>
        <div className="approach-grid">
          {approach.map(item => (
            <article className="approach-card reveal" key={item.title}>
              <div className="approach-icon">⌁</div>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="progress"><i style={{ width: `${item.progress}%` }} /></div>
              <footer><span>{item.progress}% completo</span><b>{item.stage}</b></footer>
            </article>
          ))}
        </div>
      </section>

      <section className="recognitions section-shell">
        <div className="recognition-copy reveal">
          <p className="eyebrow">Selección del estudio</p>
          <h2>Reconocimientos</h2>
          <p>Una colección demostrativa de capacidades, disciplinas y estándares que definen nuestro trabajo.</p>
        </div>
        <div className="recognition-rail">
          {recognition.map(([name, role], index) => (
            <article className="recognition-card reveal" key={name}>
              <span>0{index + 1}</span><div className="recognition-mark">{name.slice(0, 2)}</div><h3>{name}</h3><p>{role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="numbered-section identity section-shell" id="identidad">
        <SectionIndex value="01" />
        <div className="numbered-heading reveal">
          <p className="eyebrow">Sistema de marca</p>
          <h2>Identidad<br />de marca</h2>
          <p>Elevamos la presencia de cada marca con sistemas visuales coherentes y una narrativa capaz de viajar por todos los puntos de contacto.</p>
        </div>
        <div className="identity-deck reveal">
          <article className="identity-main">
            <img src={asset("marketing.jpg")} alt="Mapa tecnológico de sistemas conectados" />
            <div><span>01</span><h3>Estrategia de marca</h3><p>Identidades duraderas, claras y diseñadas con intención.</p></div>
          </article>
          {["Herencia visual", "Identidad digital", "Movimiento", "Dirección"].map((item, index) => (
            <article className="identity-slice" key={item}><span>0{index + 2}</span><h3>{item}</h3></article>
          ))}
        </div>
      </section>

      <section className="numbered-section marketing section-shell" id="marketing">
        <SectionIndex value="02" />
        <div className="numbered-heading reveal">
          <p className="eyebrow">Crecimiento</p>
          <h2>Marketing</h2>
          <p>Combinamos diseño, estrategia y medición para convertir una presencia atractiva en un sistema de crecimiento.</p>
        </div>
        <div className="marketing-layout">
          <figure className="marketing-media reveal"><img src={asset("marketing.jpg")} alt="Red tecnológica de flujos conectados" /></figure>
          <div className="marketing-list">
            {marketingRows.map(([number, title, text]) => (
              <article className="marketing-row reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><Arrow diagonal /></article>
            ))}
          </div>
        </div>
      </section>

      <section className="numbered-section interaction section-shell" id="interaccion">
        <SectionIndex value="03" />
        <div className="numbered-heading reveal">
          <p className="eyebrow">Producto digital</p>
          <h2>Interacción</h2>
          <p>Interfaces de alta calidad que combinan funcionalidad, precisión técnica y una estética contemporánea.</p>
        </div>
        <div className="interaction-grid">
          {interactionCards.map(([title, a, b, c, tag], index) => (
            <article className="interaction-card reveal" key={title}>
              <span className="interaction-number">0{index + 1}</span><div className="interaction-orb" />
              <h3>{title}</h3><ul><li>{a}</li><li>{b}</li><li>{c}</li></ul><b>{tag}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio section-shell" id="portfolio">
        <div className="section-heading reveal"><p className="eyebrow">Últimos trabajos</p><h2>Portfolio</h2></div>
        <div className="portfolio-grid">
          {projects.map(project => (
            <a href="#contacto" className="project-card reveal" key={project.name}>
              <div className="project-image"><img src={asset(project.image)} alt={`Proyecto ${project.name}`} /><span><Arrow diagonal /></span></div>
              <p>{project.tags}</p><h3>{project.name}</h3><small>{project.text}</small>
            </a>
          ))}
        </div>
        <a className="pill-button reveal" href="#contacto">Ver todos los proyectos <Arrow diagonal /></a>
      </section>

      <section className="prize section-shell" id="premios">
        <div className="prize-heading reveal"><p className="eyebrow">Selección editorial</p><h2>Premio</h2><p>Diseño estratégico e innovación aplicados a experiencias para audiencias de distintos mercados.</p></div>
        <div className="award-stage reveal">
          <div className="award-word">Award</div>
          <article className="award-card"><img src={asset("manifesto.jpg")} alt="Estructura orgánica digital en negro y oro" /><span>QH INDEX</span><strong>INTERFAZ DEL AÑO</strong><small>SELECCIÓN 2026</small></article>
        </div>
      </section>

      <div className="marquee-band"><div>{Array.from({ length: 8 }, (_, index) => <span key={index}>DISEÑO DE PRODUCTO · IDENTIDAD · EXPERIENCIA · QUANTUM STUDIO · </span>)}</div></div>

      <section className="reviews section-shell" id="opiniones">
        <figure className="review-image reveal"><img src={asset("manifesto.jpg")} alt="Textura digital orgánica en tonos dorados" /></figure>
        <div className="review-copy reveal">
          <p className="eyebrow">Opinión · contenido demostrativo</p>
          <h2>Reviews</h2>
          <blockquote>“El sistema transformó una idea dispersa en una experiencia clara, sólida y preparada para crecer con nuestra marca.”</blockquote>
          <p>Directora de producto · Marca de ejemplo</p>
          <div className="review-dots"><i /><i /><i /></div>
        </div>
      </section>

      <section className="pricing section-shell" id="planes">
        <div className="section-heading reveal"><p className="eyebrow">Paquetes del estudio</p><h2>Planes</h2></div>
        <div className="billing-toggle reveal">
          <button className={annual ? "" : "active"} onClick={() => setAnnual(false)}>Mensual</button>
          <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Anual <span>20% menos</span></button>
        </div>
        <div className="pricing-grid">
          {pricing.map(plan => (
            <article className={`pricing-card reveal ${plan.featured ? "featured" : ""}`} key={plan.name}>
              {plan.featured && <span className="recommended">RECOMENDADO</span>}
              <p>{plan.name}</p><h3>USD {annual ? plan.yearly : plan.monthly}</h3><small>/{annual ? "año" : "mes"}</small><p>{plan.text}</p>
              <a href="#contacto">Empezar <Arrow /></a>
              <ul>{plan.items.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section-shell" id="preguntas">
        <div className="faq-intro reveal"><p className="eyebrow">Preguntas frecuentes</p><h2>FAQS</h2><p>¿No encontrás lo que buscás? Contanos tu visión y te respondemos con una propuesta concreta.</p><span>RESPUESTA EN MENOS DE 24 H</span></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={`faq-item reveal ${openFaq === index ? "open" : ""}`} key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>
              <div><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="partners section-shell" id="socios">
        <div className="section-heading reveal"><p className="eyebrow">Red global</p><h2>Socios</h2></div>
        <div className="partner-grid">
          {partners.map((partner, index) => <article className="partner-card reveal" key={partner}><span>[20{20 + index}]</span><h3>{partner}</h3><p>Colaboración de muestra para proyectos digitales de escala internacional.</p></article>)}
        </div>
      </section>

      <section className="contact section-shell" id="contacto">
        <div className="contact-copy reveal"><p className="eyebrow">Contacto</p><h2>¡Trabajemos!</h2><p>Construyamos una identidad y una experiencia digital que tu audiencia recuerde.</p><a href="mailto:hola@quantumstudio.agency">hola@quantumstudio.agency <Arrow diagonal /></a></div>
        <figure className="contact-map reveal"><img src={asset("contact.jpg")} alt="Textura tecnológica oscura para contacto" /><span>BUENOS AIRES<br />34.6037° S · 58.3816° W</span></figure>
        <form className="contact-form reveal" onSubmit={submit}>
          <label>Nombre<input required name="nombre" placeholder="Tu nombre" /></label>
          <label>Email<input required type="email" name="email" placeholder="hola@empresa.com" /></label>
          <label>Empresa<input name="empresa" placeholder="Nombre de la marca" /></label>
          <label>Presupuesto<select name="presupuesto" defaultValue=""><option value="" disabled>Seleccionar rango</option><option>USD 3k — 5k</option><option>USD 5k — 10k</option><option>USD 10k+</option></select></label>
          <label className="full">Proyecto<textarea required name="mensaje" placeholder="Contanos qué querés crear" rows={4} /></label>
          <button type="submit">{sent ? "Mensaje preparado" : "Enviar consulta"} <Arrow /></button>
        </form>
      </section>

      <footer className="footer section-shell">
        <div><p>UBICACIÓN</p><span>Buenos Aires, Argentina</span></div>
        <div><p>ENLACES</p><a href="#enfoque">Estudio</a><a href="#portfolio">Trabajos</a><a href="#contacto">Contacto</a></div>
        <div><p>SEGUINOS</p><a href="#inicio">Instagram</a><a href="#inicio">Behance</a><a href="#inicio">LinkedIn</a></div>
        <div className="footer-brand"><strong>QUANTUM<br />STUDIO</strong><span>© 2026 · TODOS LOS DERECHOS RESERVADOS</span></div>
      </footer>

      <a className="qh-badge" href="https://quantumhive.com.ar" target="_blank" rel="noopener noreferrer" title="Web creada por Quantum Hive"><span>⬢</span> Powered by Quantum Hive</a>
    </main>
  );
}

export default App;
