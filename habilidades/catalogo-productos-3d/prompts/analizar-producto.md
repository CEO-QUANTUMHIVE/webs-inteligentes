# Prompt: Analizar producto

## Contexto

Se usa para clasificar un producto del catálogo y determinar la mejor
estrategia de obtención del modelo 3D (paso 02 del pipeline).

## Template

```
Analiza el siguiente producto del catálogo de un cliente:

- Nombre: [nombre]
- Descripción: [descripción]
- Categoría: [categoría]
- Imágenes disponibles: [cantidad]
- URLs de imágenes: [urls]

Responde con:

1. ¿Es un producto genérico? (sí/no)
   Si sí, ¿qué tipo de objeto es? (zapatilla, silla, botella, etc.)
   ¿Existen modelos 3D equivalentes reutilizables?

2. ¿Las imágenes disponibles son suficientes para reconstrucción 3D?
   (sí: ≥4 ángulos / no: <4 ángulos)

3. ¿Las imágenes son de buena calidad?
   (sí: fondo limpio, buena iluminación / no: fondo desordenado, mala luz)

4. Estrategia recomendada (en orden de preferencia):
   - modelo_existente
   - modelo_equivalente
   - multiimagen
   - imagen_unica
   - solicitar_fotos

5. Justificación breve de la estrategia elegida.
```

## Output esperado

```json
{
  "es_generico": true,
  "tipo_generico": "silla",
  "equivalente_disponible": true,
  "imagenes_suficientes": false,
  "imagenes_calidad": "mala",
  "estrategia": "modelo_equivalente",
  "justificacion": "Es una silla de oficina estándar. Existen modelos CC0 equivalentes."
}
```
