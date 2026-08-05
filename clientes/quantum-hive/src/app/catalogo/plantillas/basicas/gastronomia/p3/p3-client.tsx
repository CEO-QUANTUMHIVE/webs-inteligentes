"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3InfiniteGallery from "@/components/p3/P3InfiniteGallery";
import "./p3.module.css";

const gallerySlides = [
  { img: "photo-1555939594-58d7cb561ad1", title: "El Fuego", desc: "La parrilla encendida desde las 6 de la manana. El corazon de Ceniza late en carbon y brasas seleccionadas." },
  { img: "photo-1559339352-11d035aa65de", title: "El Salon", desc: "Un bodegon que se niega a cambiar. Suelo de baldosas antiguas, sillas de madera gastadas y una barra que vio tres generaciones." },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Plato", desc: "Cada plato que sale de la cocina lleva la firma del fuego. Maduracion propia, cortes seleccionados y la mano de quien sabe." },
  { img: "photo-1551218808-94e220e084d2", title: "La Bodega", desc: "Vinos de bodegas familiares que visitamos una por anon. Cada etiqueta tiene una historia que vale la pena contar." },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Mesa", desc: "Mesas para compartir sin apuro. Para charlar, para celebrar, para estar. El unico requisito es querer estar ahi." },
  { img: "photo-1504674900247-0877df9cc836", title: "El Detalle", desc: "Lo que hace diferente a Ceniza no son las grandes decisiones, son las pequenas. La temperatura exacta, el corte preciso, el tiempo justo." },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Noche", desc: "Cuando baja el sol, Ceniza se transforma. Luces tenues, copas que se llenan y la parrilla que no descansa." },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Regreso", desc: "Lo que mas nos gusta no es que vengan, es que vuelvan. Ceniza es ese lugar al que se vuelve." },
];

export default function P3GastronomiaV4() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="p3-r">
      <div ref={glowRef} className="p3-glow" style={{ left: mouse.x, top: mouse.y }} />
      <nav className="p3-n">
        <Link href="/catalogo-plantillas" className="p3-nb">CEN<span>IZA</span></Link>
        <ul className="p3-nl">
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3-nt">Reservar</a>
      </nav>
      <div className="p3-c">
        <header className="p3-h">
          <p className="p3-hl">● Parrilla · Bodegon · Buenos Aires</p>
          <h1 className="p3-ht"><span className="g">Fuego lento,</span><br /><span className="a">sabor de siempre</span></h1>
          <p className="p3-hs">Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p>
          <a href="#galeria" className="p3-ha">Explorar ↓</a>
          <div className="p3-st">
            <div><div className="p3-sn">16</div><div className="p3-sl">anos</div></div>
            <div><div className="p3-sn">4.9★</div><div className="p3-sl">promedio</div></div>
            <div><div className="p3-sn">12K</div><div className="p3-sl">platos/ano</div></div>
          </div>
        </header>

        <section id="galeria" style={{padding:"0 0 2rem"}}>
          <p className="p3-sl2" style={{textAlign:"center"}}>El lugar</p>
          <h2 className="p3-st2" style={{textAlign:"center"}}>Scrollea <span className="g">infinito</span></h2>
          <p className="p3-ss" style={{textAlign:"center",margin:"0 auto 3rem"}}>Cada foto tiene su historia. Haz click para expandir.</p>
        </section>
        <P3InfiniteGallery items={gallerySlides} />

        <section className="p3-s" id="contacto">
          <p className="p3-sl2">Reservas</p>
          <h2 className="p3-st2">Reserve su <span className="g">mesa</span></h2>
          <div className="p3-ci">
            <form className="p3-cf">
              <input placeholder="Nombre" />
              <input placeholder="Telefono" />
              <input type="datetime-local" placeholder="Fecha" />
              <select><option>2 personas</option><option>4 personas</option><option>6+</option></select>
              <button type="submit" className="p3-cb">Reservar →</button>
            </form>
            <div>
              <div className="p3-hl"><span>Direccion</span><span>Av. Platanos 1842</span></div>
              <div className="p3-hl"><span>Telefono</span><span>+54 11 0000-0000</span></div>
              <div className="p3-hl"><span>Lun-Jue</span><span>19:00 – 00:00</span></div>
              <div className="p3-hl"><span>Vir-Sab</span><span>12:00 – 01:30</span></div>
              <div className="p3-hl"><span>Dom</span><span>12:00 – 16:00</span></div>
              <div className="p3-hl"><span>Martes</span><span className="p3-cl">Cerrado</span></div>
            </div>
          </div>
        </section>

        <footer className="p3-f">
          <div className="p3-fg">
            <div><Link href="/catalogo-plantillas" className="p3-nb">CEN<span>IZA</span></Link><p style={{color:"var(--p3-muted)",marginTop:"1rem",fontSize:"0.9rem"}}>Parrilla y bodegon en Buenos Aires.</p></div>
            <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)",fontSize:"0.7rem"}}>MENU</h4><a href="#galeria" style={{display:"block",marginBottom:"0.5rem"}}>Parrilla</a><a href="#galeria" style={{display:"block",marginBottom:"0.5rem"}}>Vinos</a><a href="#galeria" style={{display:"block"}}>Postres</a></div>
            <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)",fontSize:"0.7rem"}}>RESTAURANTE</h4><a href="#galeria" style={{display:"block",marginBottom:"0.5rem"}}>Galeria</a><a href="#contacto" style={{display:"block",marginBottom:"0.5rem"}}>Reservas</a><a href="#contacto" style={{display:"block"}}>Contacto</a></div>
            <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)",fontSize:"0.7rem"}}>SEGUINOS</h4><a href="#" style={{display:"block",marginBottom:"0.5rem"}}>Instagram</a><a href="#" style={{display:"block"}}>Facebook</a></div>
          </div>
          <div className="p3-fb">© {new Date().getFullYear()} Ceniza. Demo.</div>
        </footer>
        <FirmaQuantumHive />
      </div>
    </div>
  );
}