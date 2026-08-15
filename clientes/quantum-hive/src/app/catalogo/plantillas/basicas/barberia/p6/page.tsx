"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P6ZealBarber() {
  const [formEnviado, setFormEnviado] = useState(false);

  useEffect(() => {
    // Agregar atributos de Webflow al elemento html/body para activar el runtime IX2
    document.documentElement.setAttribute("data-wf-page", "66d807582304dbf9e17edfc7");
    document.documentElement.setAttribute("data-wf-site", "66d807572304dbf9e17edf64");
    document.documentElement.classList.add("w-mod-js");

    const initWebflow = () => {
      // @ts-expect-error - Webflow runtime global
      if (typeof window !== "undefined" && window.Webflow) {
        try {
          // @ts-expect-error - Webflow runtime global
          window.Webflow.destroy();
          // @ts-expect-error - Webflow runtime global
          window.Webflow.ready();
          // @ts-expect-error - Webflow runtime global
          window.Webflow.require("ix2")?.init();
        } catch {
          // fallback silencioso
        }
      }
    };

    const timer = setTimeout(initWebflow, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormEnviado(true);
  };

  return (
    <>
      {/* Fuentes y CSS de Webflow Original */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=Oswald:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      <link rel="stylesheet" href="/templates/zeal-barber/zeal-barber.css" />

      <style jsx global>{`
        /* Desbloquear position:sticky eliminando cualquier overflow-hidden en ancestros */
        html, body {
          background-color: #0d131a;
          color: #e0e6ed;
          font-family: 'Lato', sans-serif;
          margin: 0;
          overflow-x: clip !important;
          overflow-y: visible !important;
        }
        .page-wrapper, .main-wrapper {
          overflow: visible !important;
        }
        .header {
          position: sticky;
          top: 0;
          z-index: 999;
          background: rgba(13, 19, 26, 0.9);
          backdrop-filter: blur(12px);
        }
        .primary-logo {
          max-height: 48px;
        }
        .button {
          font-family: 'Oswald', sans-serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .heading-style-h1, .heading-style-h2, .heading-style-h3, .heading-style-h5 {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
        }
        
        /* === EFECTO STACKING CARDS EN SERVICIOS (SUPERPOSICIÓN EN SCROLL) === */
        .section-services {
          background-color: #080d12 !important;
          position: relative !important;
          overflow: visible !important;
          padding: 6rem 0 10rem 0 !important;
        }
        .section-services .container-medium,
        .section-services .common-services-wrap {
          overflow: visible !important;
        }
        .common-services-wrap {
          display: grid !important;
          grid-template-columns: 1fr 1.35fr !important;
          gap: 4rem !important;
          align-items: start !important;
          position: relative !important;
        }
        .services-heading-wrap {
          position: sticky !important;
          top: 6.5rem !important;
          background-color: #121d27 !important;
          border: 1px solid rgba(212, 175, 55, 0.25) !important;
          border-radius: 1.875rem !important;
          padding: 2.75rem 2.25rem !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5) !important;
          z-index: 10 !important;
        }
        .common-grid-two-col.services-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 3.5rem !important;
          position: relative !important;
          padding-bottom: 12rem !important;
          overflow: visible !important;
        }
        
        /* Tarjetas de Servicio Apilables */
        .flex.is-services,
        .flex.is-services-two,
        .flex.is-services-three,
        .flex.is-services-four,
        .flex.is-services-five,
        .flex.is-services-six {
          background-color: #0f1720 !important;
          border: 1px solid rgba(212, 175, 55, 0.35) !important;
          border-radius: 1.875rem !important;
          padding: 3rem 2.5rem !important;
          position: sticky !important;
          box-shadow: 0 -20px 35px rgba(0, 0, 0, 0.7), 0 25px 50px rgba(0, 0, 0, 0.85) !important;
          transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
          min-height: 220px !important;
        }
        
        /* Altura de frenado progresiva (Stacking Stagger) */
        .flex.is-services {
          top: 6.5rem !important;
          z-index: 1 !important;
        }
        .flex.is-services-two {
          top: 8rem !important;
          z-index: 2 !important;
        }
        .flex.is-services-three {
          top: 9.5rem !important;
          z-index: 3 !important;
        }
        .flex.is-services-four {
          top: 11rem !important;
          z-index: 4 !important;
        }
        .flex.is-services-five {
          top: 12.5rem !important;
          z-index: 5 !important;
        }
        .flex.is-services-six {
          top: 14rem !important;
          z-index: 6 !important;
        }
        
        .flex.is-services:hover,
        .flex.is-services-two:hover,
        .flex.is-services-three:hover,
        .flex.is-services-four:hover,
        .flex.is-services-five:hover,
        .flex.is-services-six:hover {
          border-color: #d4af37 !important;
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.35), 0 30px 60px rgba(0, 0, 0, 0.9) !important;
        }
        
        .services-price .text-blue {
          color: #d4af37 !important;
          font-family: 'Oswald', sans-serif !important;
          font-size: 1.4rem !important;
          font-weight: 700 !important;
        }
        .icon-wrap {
          background: rgba(212, 175, 55, 0.12) !important;
          border: 1px solid rgba(212, 175, 55, 0.3) !important;
          border-radius: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 8px !important;
        }

        @media (max-width: 991px) {
          .common-services-wrap {
            grid-template-columns: 1fr !important;
          }
          .services-heading-wrap {
            position: static !important;
          }
          .flex.is-services,
          .flex.is-services-two,
          .flex.is-services-three,
          .flex.is-services-four,
          .flex.is-services-five,
          .flex.is-services-six {
            position: static !important;
          }
        }
      `}</style>

      <div className="page-wrapper">
        
        {/* 1. HEADER / LOGO */}
        <section data-w-id="fa68c949-49ee-fb97-eef1-d6776a07ddd3" className="header">
          <a href="/" aria-current="page" className="nav-logo w-inline-block w--current">
            <img 
              src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1216506baa38b0143da26_primary-logo.svg" 
              loading="lazy" 
              alt="Zeal Barber Logo" 
              className="primary-logo"
            />
          </a>
        </section>

        <main className="main-wrapper">
          
          {/* 2. HERO SECTION CON WEBFLOW IX2 */}
          <section data-w-id="54aebeb4-4130-8682-f6e7-6a8913e9f440" className="section-hero">
            <div className="hero-main-wrapper">
              
              <div data-w-id="33054662-c150-aee8-e5e6-a01e0fa2064b" className="hero-image-block">
                <img 
                  sizes="100vw" 
                  srcSet="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1)-p-500.webp 500w, https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1)-p-800.webp 800w, https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1)-p-1080.webp 1080w, https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1)-p-1600.webp 1600w, https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1).webp 2880w" 
                  alt="Hero Image" 
                  loading="lazy" 
                  src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e038f36550184c0e6c4874_hero%20img%20(1).webp" 
                  className="hero-image"
                />
                <div className="hero-image-overlay"></div>
              </div>

              <div className="hero-content">
                <h1 
                  id="w-node-_33054662-c150-aee8-e5e6-a01e0fa2064f-e17edfc7" 
                  data-w-id="33054662-c150-aee8-e5e6-a01e0fa2064f" 
                  className="heading-style-h1"
                >
                  Cuidado Experto, <span className="heading-text-span">Estilo Impecable en Zeal Barber</span>
                </h1>
                
                <div className="padding-bottom padding-small"></div>
                
                <div 
                  data-w-id="33054662-c150-aee8-e5e6-a01e0fa20651" 
                  className="max-width-medium is-home"
                >
                  <p className="text-size-regular text-color-secondary">
                    Donde la precisión se encuentra con la pasión. Viví una experiencia de barbería premium diseñada especialmente a tu medida.
                  </p>
                </div>
                
                <div className="button-group">
                  <a href="#appointment" className="button w-button">Reservar Turno</a>
                  <a href="#services" className="button is-secondary w-button">Ver Servicios</a>
                </div>
              </div>

            </div>

            {/* 3 TARJETAS DE CONTACTO FLOTANTES CON DATA-W-ID ORIGINAL */}
            <div className="w-layout-blockcontainer container-medium w-container">
              <div className="hero-contact-wrapper">
                <div className="common-grid-three-col">
                  
                  <div data-w-id="76d251db-28d1-09c6-02d7-42978ed0c643" className="hero-contact-card is-hero">
                    <div className="services-icon-wrap">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e0489ae36cc1c76984ae30_Location.svg" loading="lazy" alt="Ubicación" className="icon-40x40"/>
                    </div>
                    <div className="services-heading-wrapper">
                      <h3 className="heading-style-h3">Dirección</h3>
                      <div className="max-width-xsmall align-center">
                        <div className="text-size-regular text-color-alternate">
                          Av. Libertador 4520, Palermo, CABA
                        </div>
                      </div>
                    </div>
                  </div>

                  <div data-w-id="76d251db-28d1-09c6-02d7-42978ed0c64c" className="hero-contact-card is-hero">
                    <div className="services-icon-wrap">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e048fa9d08b49350e7d36e_Calling.svg" loading="lazy" alt="Teléfono" className="icon-40x40"/>
                    </div>
                    <div className="services-heading-wrapper">
                      <h3 className="heading-style-h3">Teléfono</h3>
                      <div className="flex vertical">
                        <a href="tel:+541145551234" className="link-style is-services">+54 (11) 4555-1234</a>
                        <a href="tel:+541145555678" className="link-style is-services">+54 (11) 4555-5678</a>
                      </div>
                    </div>
                  </div>

                  <div id="w-node-_76d251db-28d1-09c6-02d7-42978ed0c657-8ed0c642" data-w-id="76d251db-28d1-09c6-02d7-42978ed0c657" className="hero-contact-card is-hero">
                    <div className="services-icon-wrap">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e04899f45a3b89dfd6b823_Time%20Circle.svg" loading="lazy" alt="Horarios" className="icon-40x40"/>
                    </div>
                    <div className="services-heading-wrapper">
                      <h3 className="heading-style-h3">Horarios</h3>
                      <div className="max-width-custom is-contact">
                        <div className="text-size-regular text-color-alternate">
                          Lun – Sáb: 9:00 – 20:00 hs <br/>Dom: 10:00 – 18:00 hs
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* 3. SECCIÓN SOBRE NOSOTROS & CONTADORES */}
          <section className="section-about">
            <div className="padding-vertical padding-huge">
              <div className="w-layout-blockcontainer container-medium w-container">
                <div className="common-grid-two-col">
                  
                  <div id="w-node-b326c2b9-52aa-6c67-aec5-35cd2a86f744-e17edfc7" className="common-content-wrap">
                    <h2 data-w-id="b9eaa09a-ff64-5fe2-f78c-ba6078606eb8" className="heading-style-h2">
                      Servicios profesionales de barbería con el máximo confort
                    </h2>
                    <div className="padding-bottom padding-small"></div>
                    <p data-w-id="d97c55b2-c264-0fdb-53dc-34a7cc144075" className="text-size-regular text-color-alternate">
                      Disfrutá de la máxima conveniencia y el lujo del cuidado personal. Desde cortes clásicos hasta estilos de vanguardia, nuestros maestros barberos garantizan resultados impecables.
                    </p>
                    <div className="padding-bottom padding-large"></div>
                    
                    <div className="common-counter-wrap">
                      <div data-w-id="a264d72f-0402-47a7-bc18-373e3c0186ae" className="counter-block">
                        <div data-w-id="5aba6b3b-5ba7-8ce0-f3b7-deb93debc92e" className="flex">
                          <div className="heading-style-h2 one">9</div>
                          <div className="heading-style-h2 two">8</div>
                          <div className="heading-style-h2 three">%</div>
                        </div>
                        <div className="padding-bottom padding-small"></div>
                        <div data-w-id="2be53823-0811-8810-95c5-d618059ada2c" className="text-size-alternate">Satisfacción de Clientes</div>
                      </div>

                      <div data-w-id="74e5fdc7-5833-9bd8-70a8-cb4009a03606" className="counter-block">
                        <div data-w-id="d78e904d-5be5-9b41-3f58-33f7115bc1f6" className="flex">
                          <div className="heading-style-h2 one">1</div>
                          <div className="heading-style-h2 two">2</div>
                          <div className="heading-style-h2 three">+</div>
                        </div>
                        <div className="padding-bottom padding-small"></div>
                        <div data-w-id="b5dc2324-4487-4aa4-fbfa-d451994f1577" className="text-size-alternate">Años de Trayectoria</div>
                      </div>
                    </div>
                  </div>

                  <div data-w-id="8f06a3d0-5f18-f20e-aaf0-c7b24dd77dc9" className="common-image-block">
                    <img 
                      src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e12d0d327f116fa1a13513_about-img.webp" 
                      loading="lazy" 
                      sizes="(max-width: 767px) 92vw, (max-width: 991px) 46vw, (max-width: 1279px) 47vw, 564px" 
                      srcSet="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e12d0d327f116fa1a13513_about-img-p-500.webp 500w, https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e12d0d327f116fa1a13513_about-img-p-800.webp 800w, https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e12d0d327f116fa1a13513_about-img-p-1080.webp 1080w, https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e12d0d327f116fa1a13513_about-img.webp 1204w" 
                      alt="About Zeal Barber" 
                      className="aspect-ratio-image"
                    />
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* 4. SECCIÓN SERVICIOS (6 TARJETAS CON DATA-W-ID Y STAGGER) */}
          <section id="services" className="section-services">
            <div className="padding-vertical padding-xxlarge">
              <div className="w-layout-blockcontainer container-medium w-container">
                <div className="common-services-wrap">
                  
                  <div className="services-heading-wrap">
                    <div data-w-id="0dea7d99-0d73-c7ca-00c1-243035c65918" className="common-heading-wrap is-services">
                      <h2 className="heading-style-h2 text-blue">Servicios de Grooming a tu Medida</h2>
                      <div className="padding-bottom padding-medium"></div>
                      <div className="max-width-medium">
                        <p className="text-size-regular text-blue">
                          En Zeal Barber ofrecemos una experiencia integral para mantenerte impecable y seguro. Desde cortes clásicos hasta cuidado avanzado de barba.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-layout-grid common-grid-two-col services-grid">
                    
                    <div id="w-node-f975df92-ff82-7f2b-5044-e386c2f26e68-e17edfc7" data-w-id="f975df92-ff82-7f2b-5044-e386c2f26e68" className="flex is-services">
                      <div className="icon-wrap">
                        <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368f745c48b34de24564_1.svg" loading="lazy" alt="Icon 01" className="icon-64x64"/>
                      </div>
                      <div className="padding-bottom padding-medium"></div>
                      <div className="services-content-wrap">
                        <h3 className="heading-style-h3">Corte de Adulto</h3>
                        <div className="text-size-small text-color-alternate">Corte profesional a tijera y máquina con lavado premium y peinado incluido.</div>
                        <div className="padding-bottom padding-small"></div>
                        <div className="services-price"><div className="text-size-medium text-blue">$15.000 ARS</div></div>
                      </div>
                    </div>

                    <div className="flex is-services-two">
                      <div className="icon-wrap">
                        <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368ed54a37cc7db6c354_2.svg" loading="lazy" alt="Icon 02" className="icon-64x64"/>
                      </div>
                      <div className="padding-bottom padding-medium"></div>
                      <div className="services-content-wrap">
                        <h3 className="heading-style-h3">Afeitado Clásico</h3>
                        <div className="text-size-small text-color-alternate">Afeitado al ras con toalla caliente, aceites esenciales y loción refrescante.</div>
                        <div className="padding-bottom padding-small"></div>
                        <div className="services-price"><div className="text-size-medium text-blue">$12.000 ARS</div></div>
                      </div>
                    </div>

                    <div className="flex is-services-three">
                      <div className="icon-wrap">
                        <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368ef1622ce81a1ccf62_3.svg" loading="lazy" alt="Icon 03" className="icon-64x64"/>
                      </div>
                      <div className="padding-bottom padding-medium"></div>
                      <div className="services-content-wrap">
                        <h3 className="heading-style-h3">Corte para Niños</h3>
                        <div className="text-size-small text-color-alternate">Corte dedicado con la mayor paciencia y detalle para los más chicos.</div>
                        <div className="padding-bottom padding-small"></div>
                        <div className="services-price"><div className="text-size-medium text-blue">$11.000 ARS</div></div>
                      </div>
                    </div>

                    <div className="flex is-services-four">
                      <div className="icon-wrap">
                        <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368e77419ca122237c96_4.svg" loading="lazy" alt="Icon 04" className="icon-64x64"/>
                      </div>
                      <div className="padding-bottom padding-medium"></div>
                      <div className="services-content-wrap">
                        <h3 className="heading-style-h3">Hidratación Capilar</h3>
                        <div className="text-size-small text-color-alternate">Tratamiento intensivo para nutrir el cuero cabelludo y revitalizar el cabello.</div>
                        <div className="padding-bottom padding-small"></div>
                        <div className="services-price"><div className="text-size-medium text-blue">$14.000 ARS</div></div>
                      </div>
                    </div>

                    <div className="flex is-services-five">
                      <div className="icon-wrap">
                        <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e13690086f71672a680d85_6.svg" loading="lazy" alt="Icon 05" className="icon-64x64"/>
                      </div>
                      <div className="padding-bottom padding-medium"></div>
                      <div className="services-content-wrap">
                        <h3 className="heading-style-h3">Perfilado de Barba</h3>
                        <div className="text-size-small text-color-alternate">Diseño de líneas de contorno con navaja y recorte milimétrico de barba.</div>
                        <div className="padding-bottom padding-small"></div>
                        <div className="services-price"><div className="text-size-medium text-blue">$10.500 ARS</div></div>
                      </div>
                    </div>

                    <div className="flex is-services-six">
                      <div className="icon-wrap">
                        <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e1368e59cc3bb79116a7e0_5.svg" loading="lazy" alt="Icon 06" className="icon-64x64"/>
                      </div>
                      <div className="padding-bottom padding-medium"></div>
                      <div className="services-content-wrap">
                        <h3 className="heading-style-h3">Cuidado Integral de Barba</h3>
                        <div className="text-size-small text-color-alternate">Lavado exfoliante, hidratación con bálsamo orgánico y peinado modelador.</div>
                        <div className="padding-bottom padding-small"></div>
                        <div className="services-price"><div className="text-size-medium text-blue">$16.500 ARS</div></div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. SECCIÓN CTA CON BANNER */}
          <section className="section-cta">
            <div className="position-relative">
              <div className="common-aspect-ratio-block">
                <div className="common-bg-overlay"></div>
              </div>
            </div>
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="global-absolute-content-wrap">
                <div className="max-width-huge text-align-center">
                  <div data-w-id="45159b71-6852-6ec1-1f87-ac8ca1b6e103" className="heading-style-h1 booking">
                    Disfrutá de servicios de barbería de primer nivel con el confort que merecés
                  </div>
                  <div className="padding-bottom padding-40"></div>
                  <a href="#appointment" className="button w-button">Reservar Turno</a>
                </div>
              </div>
            </div>
          </section>

          {/* 6. SECCIÓN ¿POR QUÉ ZEAL BARBER? */}
          <section id="review" className="section-review">
            <div className="padding-global">
              <div className="w-layout-blockcontainer container-medium w-container">
                <div data-w-id="573cdebc-203a-5329-5946-c65ef297ce36" className="common-heading-wrap">
                  <h2 className="heading-style-h2">¿Por qué Zeal Barber?</h2>
                  <div className="padding-bottom padding-medium"></div>
                  <div className="max-width-medium">
                    <p className="text-size-regular text-color-alternate">
                      Experimentá el cuidado de primera calidad con nuestro equipo experto, productos importados y máxima puntualidad.
                    </p>
                  </div>
                </div>
                
                <div className="padding-bottom padding-xxlarge"></div>
                
                <div className="common-grid-three-col">
                  
                  <div data-w-id="e8cbc694-2ab3-12b6-b4a4-39d1ab537baf" className="hero-contact-why-card">
                    <div className="services-icon-why-wrap">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e40a03967edb2809fa99b8_Shield%20Done.svg" loading="lazy" alt="Experto" className="icon-64x64"/>
                      <h3 className="heading-style-h3">Expertos</h3>
                      <div className="headline-bottom"></div>
                    </div>
                    <div className="headline-bottom is-why"></div>
                    <div className="max-width-small">
                      <p data-w-id="e8cbc694-2ab3-12b6-b4a4-39d1ab537bb8" className="text-size-regular text-color-alternate">
                        Profesionales apasionados dedicados a lograr cortes y afeitados perfectos.
                      </p>
                    </div>
                  </div>

                  <div data-w-id="e8cbc694-2ab3-12b6-b4a4-39d1ab537bba" className="hero-contact-why-card">
                    <div className="services-icon-why-wrap">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e409fd91b1c3d67a8ed5b9_Star.svg" loading="lazy" alt="Premium" className="icon-64x64"/>
                      <h3 className="heading-style-h3">Premium</h3>
                      <div className="headline-bottom"></div>
                    </div>
                    <div className="headline-bottom is-why"></div>
                    <div className="max-width-small">
                      <p data-w-id="e8cbc694-2ab3-12b6-b4a4-39d1ab537bc0" className="text-size-regular text-color-alternate">
                        Solo los mejores productos cosméticos para un cuidado superior de piel y cabello.
                      </p>
                    </div>
                  </div>

                  <div id="w-node-e8cbc694-2ab3-12b6-b4a4-39d1ab537bc2-e17edfc7" data-w-id="e8cbc694-2ab3-12b6-b4a4-39d1ab537bc2" className="hero-contact-why-card">
                    <div className="services-icon-why-wrap">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e409fd63e121da9c7f204d_Heart2.svg" loading="lazy" alt="Confort" className="icon-64x64"/>
                      <h3 className="heading-style-h3">Confort</h3>
                      <div className="headline-bottom"></div>
                    </div>
                    <div className="headline-bottom is-why"></div>
                    <div className="max-width-small">
                      <p data-w-id="e8cbc694-2ab3-12b6-b4a4-39d1ab537bc8" className="text-size-regular text-color-alternate">
                        Relajate en un entorno exclusivo con bebidas de cortesía y atención dedicada.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* 7. SECCIÓN TESTIMONIOS CON EFECTO SLIDE-IN */}
          <section id="testimonials" className="section-testimonials">
            <div className="padding-bottom padding-global">
              <div className="w-layout-blockcontainer container-medium w-container">
                
                <div data-w-id="c9cbed57-78d4-e090-7506-ff17abbdfe4b" className="testimonials-wrap">
                  
                  <div data-w-id="ee8d521b-9752-228c-4d90-80c4f425a2ac" className="testimonials-thumb-wrap">
                    <img 
                      src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66f4f8796c3e7ab6417c2059_Img.png" 
                      loading="lazy" 
                      alt="Cliente" 
                      className="testimonials-thumb"
                    />
                  </div>

                  <div className="testimonials-content-wrap">
                    <div className="max-width-medium is-home">
                      <h2 data-w-id="2f24f232-1db1-d0ac-1188-ccd488b40a89" className="heading-style-h2">
                        ¡Un cambio total en mi imagen!
                      </h2>
                    </div>
                    <div className="padding-xxsmall"></div>
                    <div className="padding-bottom padding-small"></div>
                    
                    <p data-w-id="900f3e99-8e9e-8b59-9ac4-44d157b171e6" className="text-size-regular testimonials">
                      &quot;Zeal Barber redefinió por completo mi experiencia de aseo personal. El equipo brinda un servicio impecable y una atención al detalle inigualable. Cada visita se siente como una sesión de cuidado exclusivo. ¡100% recomendado!&quot;
                    </p>
                    
                    <div className="padding-xxsmall"></div>
                    <div className="padding-bottom padding-small"></div>
                    
                    <h3 data-w-id="6e9f26e2-e3b5-1672-cbcf-f5839ca0533a" className="heading-style-h3 testimonials">
                      Santiago Méndez
                    </h3>
                    <div className="padding-xxsmall"></div>
                    <div data-w-id="6c26fa5c-e71f-fdc3-7660-c76b565f2910" className="text-size-regular text-color-alternate">
                      Cliente Frecuente · CEO de InnovateTech
                    </div>

                    <div className="testimonials-icon-wrap">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66f4fad276ad61485c4d2f11_Quotes.svg" loading="lazy" alt="Citas" className="testimonials-icon"/>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* 8. FORMULARIO DE RESERVAS Y FOOTER SECTION */}
          <section className="footer">
            <footer id="appointment" className="section-footer">
              <div className="position-relative">
                <div className="common-aspect-ratio-block is-footer">
                  <div className="common-bg-overlay is-footer"></div>
                </div>
              </div>

              <div className="global-absolute-content-wrap is-footer">
                <div className="container-large why">
                  <div className="w-layout-grid common-grid-two-col is-footer">
                    
                    <div className="max-width-medium">
                      <h2 data-w-id="12039fdd-5153-f015-6be3-658075f6d71a" className="heading-style-h2 text-color-secondary">
                        Por Qué Nos Destacamos
                      </h2>
                      <div className="padding-bottom padding-medium"></div>
                      <p data-w-id="12039fdd-5153-f015-6be3-658075f6d71f" className="text-size-large text-color-secondary">
                        Descubrí la diferencia de atendértete con un equipo de profesionales comprometidos con la excelencia y la personalización de cada detalle.
                      </p>
                      <div className="padding-bottom padding-medium"></div>
                      
                      <div className="cta-wrapper-block">
                        <div className="flex gap-40">
                          <div data-w-id="12039fdd-5153-f015-6be3-658075f6d724" className="icon-large-wrap">
                            <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e14b77adaebb2f2635c49e_phone-svg.svg" loading="lazy" alt="Tel" className="icon-36x36"/>
                          </div>
                          <div className="flex vertical">
                            <h5 data-w-id="12039fdd-5153-f015-6be3-658075f6d727" className="heading-style-h5 text-color-secondary">Llamanos</h5>
                            <a data-w-id="12039fdd-5153-f015-6be3-658075f6d729" href="tel:+541145551234" className="text-size-regular text-color-secondary">+54 (11) 4555-1234</a>
                          </div>
                        </div>

                        <div className="flex gap-40">
                          <div data-w-id="12039fdd-5153-f015-6be3-658075f6d72c" className="icon-large-wrap">
                            <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e956a64d433ab0e9983c83_mail-address.svg" loading="lazy" alt="Email" className="icon-36x36"/>
                          </div>
                          <div className="flex vertical">
                            <h5 data-w-id="12039fdd-5153-f015-6be3-658075f6d72f" className="heading-style-h5 text-color-secondary">Envianos un email</h5>
                            <a data-w-id="12039fdd-5153-f015-6be3-658075f6d731" href="mailto:contacto@zealbarber.com" className="text-size-regular text-color-secondary">contacto@zealbarber.com</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div data-w-id="12039fdd-5153-f015-6be3-658075f6d733" className="form-wrap">
                      <div className="form-block w-form">
                        {formEnviado ? (
                          <div className="form-message-success w-form-done" style={{ display: "block" }}>
                            <div className="text-size-regular">¡Muchas gracias! Tu solicitud de turno ha sido recibida con éxito.</div>
                          </div>
                        ) : (
                          <form onSubmit={handleFormSubmit} id="wf-form-Appointment-Form">
                            <div className="filed-wrap">
                              <div className="text-size-regular">Nombre Completo</div>
                              <input className="form-input w-input" required maxLength={256} name="Full-Name" placeholder="Ej. Juan Pérez" type="text" id="Full-Name"/>
                            </div>
                            <div className="filed-wrap">
                              <div className="text-size-regular">Servicio Deseado</div>
                              <input className="form-input w-input" maxLength={256} name="Subject" placeholder="Ej. Corte y Barba" type="text" id="Subject"/>
                            </div>
                            <div className="column-wrap">
                              <div className="column-50 is-from">
                                <div className="filed-wrap">
                                  <div className="text-size-regular">Teléfono</div>
                                  <input className="form-input w-input" required maxLength={256} name="Phone" placeholder="+54 11 ..." type="tel" id="Phone"/>
                                </div>
                              </div>
                              <div className="column-50 is-from">
                                <div className="filed-wrap">
                                  <div className="text-size-regular">Email</div>
                                  <input className="form-input w-input" required maxLength={256} name="Email-Address" placeholder="juan@correo.com" type="email" id="Email-Address"/>
                                </div>
                              </div>
                            </div>
                            <div className="filed-wrap">
                              <div className="text-size-regular">Mensaje o Detalle del Turno</div>
                              <textarea id="Message" name="Message" maxLength={5000} placeholder="Contanos tu disponibilidad..." className="form-input is-text-area w-input"></textarea>
                            </div>
                            <input type="submit" data-wait="Procesando..." className="button is-form-submit w-button" value="Confirmar Reserva de Turno"/>
                          </form>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="footer-bg-overlay"></div>
            </footer>

            {/* MAPA GOOGLE EMBED */}
            <div className="section-map">
              <div className="is-map w-embed w-iframe">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.9961685419997!2d-58.420658424260385!3d-34.57895697296338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb577b212f451%3A0x6b1df3df43d463d4!2sPalermo%2C%20CABA!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* COPYRIGHT & REDES */}
            <div className="section-copyright">
              <div className="w-layout-blockcontainer container-large w-container">
                <div className="flex is-copyright">
                  <div className="column-50">
                    <div className="text-size-regular is-legal">© {new Date().getFullYear()} Zeal Barber. Todos los derechos reservados.</div>
                  </div>
                  <div className="column-50 is-copyright">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-block w-inline-block">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66daabcdca258aa5b1bb8671_facebook.svg" loading="lazy" alt="Facebook" className="icon-24x24"/>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-block w-inline-block">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66e997451e42f228c617178b_x%20(2).svg" loading="lazy" alt="X / Twitter" className="icon-24x24"/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-block w-inline-block">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66daabcdacc773bb15203803_Instagram.svg" loading="lazy" alt="Instagram" className="icon-24x24"/>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-block w-inline-block">
                      <img src="https://cdn.prod.website-files.com/66d807572304dbf9e17edf64/66daabcdb99728e6cc2927af_linkedin.svg" loading="lazy" alt="LinkedIn" className="icon-24x24"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </section>

        </main>

        {/* 9. FIRMA DIGITAL OFICIAL DE QUANTUM HIVE */}
        <FirmaQuantumHive />

      </div>

      {/* SCRIPTS DE WEBFLOW RUNTIME E IX2 INTERACTIONS */}
      <Script 
        src="/templates/zeal-barber/jquery.min.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="/templates/zeal-barber/webflow.js" 
        strategy="afterInteractive" 
      />
    </>
  );
}
