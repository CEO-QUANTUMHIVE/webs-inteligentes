import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P7Salud() {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles["nav"]}>
        <Link href="/catalogo-plantillas">Catalogo</Link>
        <span className={styles["marca"]}>SALUD</span>
        <a href="#contacto" className={styles["navCta"]}>Contacto</a>
      </nav>
      <header className={styles["hero"]}>
        <div className={styles["heroContenido"]}>
          <h1 className={styles["heroTitulo"]}>Parrilla<br/><em>Bodegon</em></h1>
          <div className={styles["heroMeta"]}>
            <div><div className={styles["heroDatoValor"]}><Contador to={16} /></div></div>
            <div><div className={styles["heroDatoValor"]}><Contador to={4.9} decimals={1} /></div></div>
            <div><div className={styles["heroDatoValor"]}><Contador to={12} suffix="K+" /></div></div>
          </div>
        </div>
      </header>
      <FirmaQuantumHive />
    </div>
  );
}
