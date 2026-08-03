# 08 — DEPLOY A NETLIFY

> Proceso paso a paso para deployar sin errores.

---

## REQUISITOS PREVIOS

- [ ] `next.config.ts` tiene `output: "export"`
- [ ] `npm run build` completa sin errores
- [ ] La carpeta `out/` se genera correctamente
- [ ] Todas las rutas aparecen en el output del build
- [ ] QA visual completado (sitio se ve bien en navegador)

---

## PASO 1: BUILD

```bash
# Asegurarse de estar en el directorio correcto
cd web-factory/clientes/[nombre-cliente]

# Ejecutar build
npm run build

# Verificar output
# Debería mostrar todas las rutas:
# ○ /
# ○ /_not-found
# ○ /[pagina-1]
# ○ /[pagina-2]
```

---

## PASO 2: VERIFICAR CARPETA OUT

```bash
# Verificar que out/ existe y tiene contenido
ls out/

# Debería mostrar:
# index.html
# [pagina-1].html
# [pagina-2].html
# _next/
# favicon.ico
# etc.
```

---

## PASO 3: DEPLOY EN NETLIFY

### Opción A: Drag & Drop (más rápido)
1. Ir a [app.netlify.com](https://app.netlify.com)
2. Click en "Add new site" → "Deploy manually"
3. Arrastrar la carpeta `out/` al área de drop
4. Esperar a que complete el deploy
5. Copiar la URL generada

### Opción B: Git (para deploys automáticos)
1. Conectar repositorio de GitHub
2. Configurar build command: `npm run build`
3. Configurar publish directory: `out`
4. Cada push hará deploy automático

---

## PASO 4: VERIFICAR EN PRODUCCIÓN

```
1. Abrir la URL de Netlify
2. Verificar home page:
   → ¿Se ve igual que en localhost?
   → ¿Los colores son correctos?
   → ¿Las animaciones funcionan?

3. Verificar páginas secundarias:
   → Navegar a cada página
   → ¿El contenido carga?
   → ¿Los links funcionan?

4. Verificar mobile:
   → Abrir DevTools → toggle device toolbar
   → ¿Responsive design funciona?

5. Verificar performance:
   → Lighthouse audit (optional)
   → ¿Carga rápido?
```

---

## PASO 5: CONFIGURACIÓN ADICIONAL

### Dominio personalizado
1. En Netlify → Domain settings
2. Agregar dominio personalizado
3. Configurar DNS

### Headers de seguridad
Crear archivo `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### Redirects (si es necesario)
Crear archivo `public/_redirects`:
```
# Redirecciones aquí
# /antigua-url  /nueva-url  301
```

---

## ERRORES COMUNES EN NETLIFY

### 1. "Page not found" en todas las rutas
**Causa:** `next.config.ts` no tiene `output: "export"`
**Solución:** Agregar `output: "export"` y rebuild

### 2. Estilos no se aplican
**Causa:** CSS no se incluyó en el build
**Solución:** Verificar que Tailwind está configurado correctamente

### 3. Imágenes no cargan
**Causa:** Rutas de imágenes incorrectas
**Solución:** Usar `next/image` o rutas relativas correctas

### 4. Build falla en Netlify
**Causa:** Dependencia faltante o versión incompatible
**Solución:** Verificar `package.json` y `package-lock.json`

---

## POST-DEPLOY CHECKLIST

- [ ] URL de Netlify funciona
- [ ] Home page se ve correcta
- [ ] Todas las páginas cargan
- [ ] Links internos funcionan
- [ ] Mobile responsive
- [ ] Favicon visible
- [ ] Título de pestaña correcto
- [ ] Console sin errores
- [ ] Screenshots tomados como referencia
