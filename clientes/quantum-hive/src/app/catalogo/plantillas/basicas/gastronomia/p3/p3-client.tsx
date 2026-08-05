"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3InfiniteGallery from "@/components/p3/P3InfiniteGallery";
import "./p3.module.css";

const galleryItems = [
  { id: "fuego", img: "photo-1555939594-58d7cb561ad1", caption: "El fuego" },
  { id: "salon", img: "photo-1559339352-11d035aa65de", caption: "El salon" },
  { id: "plato", img: "photo-1546069901-ba9599a7e63c", caption: "El plato" },
  { id: "vino", img: "photo-1551218808-94e220e084d2", caption: "El vino" },
  { id: "mesa", img: "photo-1414235077428-338989a2e8c0", caption: "La mesa" },
  { id: "detalle", img: "photo-1504674900247-0877df9cc836", caption: "El detalle" },
];

export default function P3GastronomiaV4() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const menuItems = [
    { n: "Parrillada Ceniza x2", d: "Achuras, vacio, chorizo, pollo", p: "$28.000", img: "photo-1555939594-58d7cb561ad1" },
    { n: "Bife de chorizo", d: "350g, guarnicion a eleccion", p: "$14.900", img: "photo-1559339352-11d035aa65de" },
    { n: "Ojo de bife madurado", d: "30 dias, sal de escamas", p: "$18.200", img: "photo-1546069901-ba9599a7e63c" },
    { n: "Provoleta", d: "Oregano, ajil molido, pan casero", p: "$6.500", img: "photo-1551218808-94e220e084d2" },
    { n: "Flan casero", d: "Dulce de leche con crema", p: "$4.200", img: "photo-1414235077428-338989a2e8c0" },
    { n: "Panqueque manzana", d: "Caramelizado, tibio", p: "$4.800", img: "photo-1504674900247-0877df9cc836" },
  ];

  return (
    <div className="p3-r">
      <div ref={glowRef} className="p3-glow" style={{ left: mouse.x, top: mouse.y }} />
      <nav className="p3-n">
        <Link href="/catalogo-plantillas" className="p3-nb">CEN<span>IZA</span></Link>
        <ul className="p3-nl">
          <li><a href="#menu">Menu</a></li>
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
          <a href="#contacto" className="p3-ha">Reservar mesa →</a>
          <div className="p3-st">
            <div><div className="p3-sn">16</div><div className="p3-sl">anos</div></div>
            <div><div className="p3-sn">4.9★</div><div className="p3-sl">promedio</div></div>
            <div><div className="p3-sn">12K</div><div className="p3-sl">platos/ano</div></div>
          </div>
        </header>

        <section className="p3-s" id="menu">
          <p className="p3-sl2">Nuestra carta</p>
          <h2 className="p3-st2">Del fuego <span className="g">a la mesa</span></h2>
          <p className="p3-ss">Pase el cursor sobre cada plato.</p>
          <div className="p3-mg">
            {menuItems.map((item, i) => (
              <div key={i} className="p3-mi">
                <img src={`https://images.unsplash.com/${item.img}?w=500&q=75&auto=format&fit=crop`} alt={item.n} width={500} height={667} loading="lazy" />
                <div className="p3-mc">
                  <div className="p3-mn">{item.n}</div>
                  <div className="p3-md">{item.d}</div>
                  <div className="p3-mp">{item.p}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERIA INFINITA vertical */}
        <section className="p3-s" id="galeria">
          <p className="p3-sl2">El lugar</p>
          <h2 className="p3-st2">Scrollea <span className="g">infinito</span></h2>
          <p className="p3-ss">Hacia arriba o hacia abajo. La galeria nunca termina.</p>
        </section>
        <P3InfiniteGallery items={galleryItems} speed={0.8} />

        <section className="p3-s">
          <p className="p3-sl2">Lo que dicen</p>
          <h2 className="p3-st2">Sobremesas <span className="g">que vuelven</span></h2>
          <div className="p3-tg">
            <div className="p3-ti"><div className="p3-ts">★★★★★</div><p className="p3-tt">El ojo de bife madurado es de otro nivel.</p><div className="p3-ta">Martina Rios</div><div className="p3-tr">Comensal</div></div>
            <div className="p3-ti"><div className="p3-ts">★★★★★</div><p className="p3-tt">La mejor parrilla del barrio.</p><div className="p3-ta">Diego Sandez</div><div className="p3-tr">Google</div></div>
            <div className="p3-ti"><div className="p3-ts">★★★★★</div><p className="p3-tt">Reservamos y fue increible.</p><div className="p3-ta">Lucia Fernandez</div><div className="p3-tr">Critica</div></div>
          </div>
        </section>

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
            <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)",fontSize:"0.7rem"}}>MENU</h4><a href="#menu" style={{display:"block",marginBottom:"0.5rem"}}>Parrilla</a><a href="#menu" style={{display:"block",marginBottom:"0.5rem"}}>Entradas</a><a href="#menu" style={{display:"block"}}>Postres</a></div>
            <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)",fontSize:"0.7rem"}}>RESTAURANTE</h4><a href="#menu" style={{display:"block",marginBottom:"0.5rem"}}>Menu</a><a href="#galeria" style={{display:"block",marginBottom:"0.5rem"}}>Galeria</a><a href="#contacto" style={{display:"block"}}>Reservas</a></div>
            <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)",fontSize:"0.7rem"}}>SEGUINOS</h4><a href="#" style={{display:"block",marginBottom:"0.5rem"}}>Instagram</a><a href="#" style={{display:"block"}}>Facebook</a></div>
          </div>
          <div className="p3-fb">© {new Date().getFullYear()} Ceniza. Demo.</div>
        </footer>
        <FirmaQuantumHive />
      </div>
    </div>
  );
}