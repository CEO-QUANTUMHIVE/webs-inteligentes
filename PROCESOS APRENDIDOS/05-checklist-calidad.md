# 05 — CHECKLIST DE CALIDAD

> Checklist obligatorio antes de cada deploy a producción.

---

## ANTES DE CADA BUILD

- [ ] Estoy en el directorio correcto (`web-factory/clientes/[nombre]/`)
- [ ] `package.json` existe
- [ ] `node_modules/` existe (si no, ejecutar `npm install`)
- [ ] `next.config.ts` tiene `output: "export"`
- [ ] No hay errores de TypeScript visibles

---

## DESPUÉS DEL BUILD

- [ ] `npm run build` completa sin errores
- [ ] La carpeta `out/` se genera
- [ ] TODAS las rutas aparecen en el output:
  - [ ] `/` (home)
  - [ ] `/[pagina-1]`
  - [ ] `/[pagina-2]`
  - [ ] `/_not-found`
- [ ] No hay warnings críticos

---

## QA VISUAL (OBLIGATORIO)

### Home page (`/`)
- [ ] Header se ve correcto (logo, navegación)
- [ ] Hero: título visible, subtítulo claro, CTAs funcionales
- [ ] Servicios: tarjetas se ven bien, textos legibles
- [ ] CTA: botón visible y clickeable
- [ ] Footer: links funcionan, copyright correcto
- [ ] Colores correctos (no se ven apagados o rotos)
- [ ] Tipografía correcta (Orbitron en headings)
- [ ] Sin elementos superpuestos
- [ ] Sin texto ilegible

### Páginas secundarias
- [ ] Navegación desde home funciona
- [ ] Contenido se ve completo
- [ ] Botón de regreso funciona
- [ ] Diseño consistente con home
- [ ] Sin errores visuales

### Mobile
- [ ] Header responsive (hamburger menu o simplificado)
- [ ] Hero se ve bien en mobile
- [ ] Tarjetas se apilan correctamente
- [ ] Texto legible (no muy pequeño)
- [ ] Botones clickeables (tamaño suficiente)

---

## ANTES DE DEPLOY

- [ ] Tomé screenshot de cada página
- [ ] Verifiqué que los links internos funcionan
- [ ] Verifiqué que no hay contenido placeholder ( lorem ipsum)
- [ ] Verifiqué que los textos están en español
- [ ] Verifiqué que los colores son consistentes
- [ ] Verifiqué que no hay console errors en navegador

---

## DESPUÉS DEL DEPLOY

- [ ] Abrí la URL de Netlify
- [ ] Verifiqué cada página en producción
- [ ] Verifiqué que las animaciones funcionan
- [ ] Verifiqué que los links externos funcionan
- [ ] Verifiqué que el favicon se ve
- [ ] Verifiqué que el título de la pestaña es correcto
- [ ] Tomé screenshot final como referencia

---

## AL COMPARTIR CON CLIENTE

- [ ] El sitio está 100% funcional
- [ ] No hay errores visibles
- [ ] Los textos son correctos (sin errores de ortografía)
- [ ] Los contactos/CTAs están configurados
- [ ] Estoy listo para recibir feedback

---

## ERRORES COMUNES QUE ESTE CHECKLIST PREVIENE

| Error | Prevención |
|-------|------------|
| Build roto | Verificar directorio + package.json |
| Páginas faltantes | Verificar rutas en output del build |
| Texto ilegible | QA visual obligatorio |
| Deploy roto | Verificar en navegador ANTES de deploy |
| Links rotos | Verificar cada link manualmente |
| Mobile roto | Verificar responsive design |
| Colores incorrectos | Verificar tokens en globals.css |
