# Efectos reutilizables — Desyres Quantum

- `works-3d-deck`: scroll; `.section-works`; Webflow IX + GSAP; sección sticky.
- `testimonial-marquee`: tiempo; `.reviewer-wrapper`; Webflow; dos tracks duplicados.
- `logo-marquee`: tiempo; `.logo-wrapper`; Webflow; dos tracks duplicados.
- `split-heading-reveal`: scroll; `.gsap_split_letter`; GSAP SplitText/ScrollTrigger.
- `theme-curtain`: scroll; `.transitions-background`; GSAP; escala Y dentro de wrapper largo.
- `services-stack`: scroll; `.section-services` y cards; CSS sticky + Webflow.
- `about-image-reveal`: hover; `.about-image`; Webflow IX.
- `mobile-menu-cross`: clic; navegación mobile; Webflow IX; breakpoint 991 px.

Restricción común: no usar `overflow: hidden` ni `overflow-x: hidden` en los
ancestros de Works o Services. Usar `overflow-x: clip`.
