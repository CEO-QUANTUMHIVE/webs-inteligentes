# Prompt: Solicitar fotos al cliente

## Contexto

Se usa cuando un producto no tiene modelo 3D existente, no es genérico
equivalente, y las imágenes disponibles son insuficientes para generar un
modelo de calidad aceptable.

## Template

```
Hola [nombre del cliente],

Para generar el modelo 3D de tu producto "[nombre del producto]" necesitamos
entre 4 y 8 fotos.

Idealmente:
- Fondo limpio (blanco o neutro);
- Buena iluminación (sin sombras duras ni reflejos excesivos);
- Producto completo en cada foto (sin recortes);
- Distintos ángulos: frente, atrás, izquierda, derecha, arriba, y detalles
  importantes;
- Misma versión/color del producto en todas las fotos.

Formato: JPG o PNG, resolución mínima 1080px en el lado más largo.

Si no es posible tomar todas las fotos, envía las que tengas. Podemos
intentar trabajar con menos, aunque la calidad del modelo 3D será menor.

¿Podrías enviarnos estas fotos?
```

## Notas

- El sistema debe poder intentar trabajar con una sola foto cuando no haya más,
  pero marcar `calidad_estimada: baja` y advertir al cliente.
- Si el cliente envía fotos de mala calidad, solicitar nuevamente con
  indicaciones más específicas (iluminación, fondo, ángulos).
- Adaptar el tono al cliente (formal, casual, técnico).
