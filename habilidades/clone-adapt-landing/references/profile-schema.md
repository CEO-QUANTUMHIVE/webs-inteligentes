# Perfil del cliente

El perfil contiene solo hechos aportados o aprobados. Los campos desconocidos se omiten.

```json
{
  "business": {
    "name": "Nombre del negocio",
    "rubro": "Rubro",
    "headline": "Propuesta principal",
    "shortHeadline": "Version corta para titulos de gran escala",
    "description": "Descripcion comprobada",
    "services": [{ "name": "Servicio", "description": "Descripcion" }],
    "benefits": ["Beneficio comprobable"],
    "process": ["Paso real del proceso"]
  },
  "brand": {
    "assetDir": "C:/ruta/absoluta/a/assets",
    "logo": "logo.png",
    "hero": "portada.jpg",
    "gallery": ["servicio-1.jpg", "servicio-2.jpg"],
    "overrideSourceColors": false,
    "colors": {
      "background": "#050505",
      "surface": "#111111",
      "primary": "#d7b85b",
      "accent": "#f3e6b4",
      "text": "#f7f2e7"
    }
  },
  "contact": {
    "ctaLabel": "Solicitar informacion",
    "ctaUrl": "https://wa.me/...",
    "email": "correo@negocio.com",
    "phone": "+54...",
    "address": "Direccion comprobada"
  },
  "site": {
    "language": "es-AR",
    "domain": "dominio.com",
    "catalogUrl": "/catalogo-plantillas"
  }
}
```

La paleta original se conserva por defecto. `colors` solo se aplica cuando `overrideSourceColors` es `true` y el usuario pidio expresamente cambiar colores o fondos. Si no lo pidio, omite ambos campos.

`ADAPTATION.json` usa IDs de `INVENTORY.json`:

```json
{
  "texts": { "t0001": "Texto adaptado" },
  "images": { "i0001": { "file": "portada.jpg", "alt": "Descripcion" } },
  "links": { "l0001": "https://destino-aprobado.example" }
}
```

No es necesario mapear iconos decorativos. Los archivos se resuelven dentro de `brand.assetDir`.
