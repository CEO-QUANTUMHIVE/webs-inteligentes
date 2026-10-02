import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import styles from "./landing-webs.module.css";

export default function LandingWebs(): React.JSX.Element {
  return (
    <main className={styles.cloneShell}>
      <iframe
        className={styles.cloneFrame}
        src="/templates/desyres-quantum/site/index.html"
        title="Webs Inteligentes de Quantum Hive"
        allow="autoplay; fullscreen"
      />
      <FirmaQuantumHive />
    </main>
  );
}
