# GAMER — Global design agency

Demo Vite independiente para el catalogo de Webs Inteligentes.

## Stack

- React 19
- TypeScript 5.8
- Vite 6
- Tailwind CSS 4 con `@tailwindcss/vite`
- Motion 12 desde `motion/react`
- Lucide React

## Desarrollo

```bash
npm install
npm run dev
```

## Verificacion

```bash
npx tsc --noEmit
npm run build
```

El build escribe directamente en:

```text
clientes/quantum-hive/public/plantillas/gamer/
```

Luego se debe reconstruir `clientes/quantum-hive` para copiar la demo al export
estatico final de Cloud Run.

## Interacciones

- El video permanece pausado: el eje X del mouse controla `currentTime`.
- Los seeks se serializan con una unica posicion pendiente para no saturar el decoder.
- El sonido ambiente se sintetiza con Web Audio; no usa archivos de audio.
- El estudio de luz modifica color, escala e intensidad de los blobs.
- El configurador y el chat son prototipos locales; no transmiten datos.
