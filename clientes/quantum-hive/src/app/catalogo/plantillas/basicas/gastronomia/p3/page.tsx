import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p3.module.css";

export const metadata = {
  title: "Ceniza — Parrilla & Bodegon | Premium 3 Neon",
  description: "Plantilla premium neon/tech minimalista.",
};

export default function P3GastronomiaV2() {
  return (
    <div className="p3-r">
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
        {/* HERO compacto con grid texto + imagen */}
        <header className="p3-h">
          <div>
            <p className="p3-hl">● Parrilla · Bodegon · Buenos Aires</p>
            <h1 className="p3-ht">
              <span className="g">Fuego lento,</span><br />
              <span className="a">sabor de siempre</span>
            </h1>
            <p className="p3-hs">Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p>
            <a href="#contacto" className="p3-ha">Reservar mesa →</a>
            <div className="p3-st">
              <div><div className="p3-sn">16</div><div className="p3-sl">anos</div></div>
              <div><div className="p3-sn">4.9★</div><div className="p3-sl">promedio</div></div>
              <div><div className="p3-sn">12K</div><div className="p3-sl">platos/ano</div></div>
            </div>
          </div>
          <div className="p3-hi">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80&auto=format&fit=crop" alt="Parrilla" width={800} height={600} />
          </div>
        </header>

        {/* MENU — lista horizontal elegante */}
        <section className="p3-s" id="menu">
          <p className="p3-sl2">Nuestra carta</p>
          <h2 className="p3-st2">Del fuego <span className="g">a la mesa</span></h2>
          <p className="p3-ss">Precios de referencia. Pueden variar segun temporada y corte.</p>
          <div className="p3-lg">
            <div className="p3-li"><div><div className="p3-ln">Parrillada Ceniza para 2</div><div className="p3-ld">Achuras, vacio, chorizo, morcilla, pollo, guarnicion</div></div><div className="p3-lp">$28.000</div></div>
            <div className="p3-li"><div><div className="p3-ln">Provoleta a la parrilla</div><div className="p3-ld">Oregano, ajil molido, pan casero</div></div><div className="p3-lp">$6.500</div></div>
            <div className="p3-li"><div><div className="p3-ln">Bife de chorizo 350g</div><div className="p3-ld">Guarnicion a eleccion</div></div><div className="p3-lp">$14.900</div></div>
            <div className="p3-li"><div><div className="p3-ln">Ojo de bife madurado</div><div className="p3-ld">Maduracion 30 dias, sal de escamas</div></div><div className="p3-lp">$18.200</div></div>
            <div className="p3-li"><div><div className="p3-ln">Flan casero</div><div className="p3-ld">Dulce de leche con crema chantilly</div></div><div className="p3-lp">$4.200</div></div>
            <div className="p3-li"><div><div className="p3-ln">Panqueque de manzana</div><div className="p3-ld">Caramelizado, servido tibio</div></div><div className="p3-lp">$4.800</div></div>
          </div>
        </section>

        <figure className="p3-fw"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=70&auto=format&fit=crop" alt="Salon" width={1920} height={500} /></figure>

        {/* GALERIA compacta */}
        <section className="p3-s" id="galeria">
          <p className="p3-sl2">El lugar</p>
          <h2 className="p3-st2">Un vistazo <span className="g">a Ceniza</span></h2>
          <div className="p3-gg">
            <div className="p3-gi"><img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80&auto=format&fit=crop" alt="Fuego" width={500} height={500} loading="lazy" /></div>
            <div className="p3-gi"><img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80&auto=format&fit=crop" alt="Plato" width={500} height={500} loading="lazy" /></div>
            <div className="p3-gi"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80&auto=format&fit=crop" alt="Mesa" width={500} height={500} loading="lazy" /></div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="p3-s">
          <p className="p3-sl2">Lo que dicen</p>
          <h2 className="p3-st2">Sobremesas <span className="g">que vuelven</span></h2>
          <div className="p3-tg">
            <div className="p3-ti"><div className="p3-ts">★★★★★</div><p className="p3-tt">El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes.</p><div className="p3-ta">Martina Rios</div><div className="p3-tr">Comensal frecuente</div></div>
            <div className="p3-ti"><div className="p3-ts">★★★★★</div><p className="p3-tt">La mejor parrilla del barrio. Carne de primera, vinos bien elegidos.</p><div className="p3-ta">Diego Sandez</div><div className="p3-tr">Resena Google</div></div>
            <div className="p3-ti"><div className="p3-ts">★★★★★</div><p className="p3-tt">Reservamos para un cumpleaños y la pasamos increible. El patio es un lujo.</p><div className="p3-ta">Lucia Fernandez</div><div className="p3-tr">Critica</div></div>
          </div>
        </section>

        {/* CONTACTO */}
        <section className="p3-s" id="contacto">
          <p className="p3-sl2">Reservas</p>
          <h2 className="p3-st2">Reserve su <span className="g">mesa</span></h2>
          <div className="p3-ci">
            <form className="p3-cf">
              <input placeholder="Nombre" />
              <input placeholder="Telefono" />
              <input type="datetime-local" placeholder="Fecha" />
              <select><option>2 personas</option><option>4 personas</option><option>6+ personas</option></select>
              <button type="submit" className="p3-cb">Reservar →</button>
            </form>
            <div>
              <div className="p3-hl2"><span>Direccion</span><span>Av. Platanos 1842</span></div>
              <div className="p3-hl2"><span>Telefono</span><span>+54 11 0000-0000</span></div>
              <div className="p3-hl2"><span>Redes</span><span>@cenizaparrilla</span></div>
              <div className="p3-hl2"><span>Lun a jue</span><span>19:00 – 00:00</span></div>
              <div className="p3-hl2"><span>Vir y sab</span><span>12:00 – 01:30</span></div>
              <div className="p3-hl2"><span>Domingo</span><span>12:00 – 16:00</span></div>
              <div className="p3-hl2"><span>Martes</span><span className="p3-cl">Cerrado</span></div>
            </div>
          </div>
        </section>

        <footer className="p3-f">
          <div className="p3-fg">
            <div><Link href="/catalogo-plantillas" className="p3-nb">CEN<span>IZA</span></Link><p style={{color:"var(--p3-muted)",marginTop:"1rem",fontSize:"0.9rem"}}>Parrilla y bodegon en Buenos Aires. Fuego lento, producto de verdad.</p></div>
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