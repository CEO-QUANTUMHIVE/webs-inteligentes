import styles from "./firma-quantumhive.module.css";

// FirmaQuantumHive — firma de marca al pie de cada sitio hecho por Quantum Hive.
// Publicidad de la empresa: se incluye en TODAS las plantillas/paginas.
// Quantum Hive es la empresa; "Webs Inteligentes" (Web Factory) es un modulo.
// Isotipo en /public/marca/quantumhive-isotipo.webp. Server component (sin JS).

export default function FirmaQuantumHive(): React.JSX.Element {
  const anio = new Date().getFullYear();
  return (
    <footer className={styles.firma}>
      <a
        href="https://www.quantumhive.com.ar"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.marca}
        aria-label="Sitio desarrollado por Quantum Hive"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marca/quantumhive-isotipo.webp"
          alt="Quantum Hive"
          className={styles.iso}
          width={46}
          height={46}
          loading="lazy"
        />
        <span className={styles.texto}>
          <span className={styles.eyebrow}>Sitio desarrollado por</span>
          <span className={styles.nombre}>QUANTUM HIVE</span>
          <span className={styles.tagline}>
            Multi-Agent Business Infrastructure
          </span>
        </span>
      </a>
      <span className={styles.copy}>
        © {anio} Quantum Hive. Todos los derechos reservados · Módulo{" "}
        <a
          href="https://websinteligentes.quantumhive.com.ar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Webs Inteligentes
        </a>
      </span>
    </footer>
  );
}
