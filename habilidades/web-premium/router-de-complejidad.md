# Router de Complejidad

`recrear-web-premium` elige automáticamente la ruta según el caso.

## Web simple

Para presencias profesionales sin animaciones complejas.

- `frontend-design`
- `ui-ux-pro-max`
- `21st-cli-use`
- `web-animation-design` (motion ligero)

## Web premium

Para diseño de autor con identidad visual fuerte.

- Todo lo anterior
- `gsap-react`
- `gsap-core`

## Web premium con storytelling

Para landings donde el scroll cuenta una historia.

- Todo lo anterior
- `gsap-scrolltrigger`
- `gsap-timeline`

## Web inmersiva

Para experiencias con 3D o interacción profunda.

- Todo lo anterior
- `web-3d`

## Web basada en referencia

Para aprender de una URL y remixar sus patrones.

- `clone-website` para estudiar
- `habilidades/web-premium/` para patrones ya aprendidos
- Remix con dirección visual, motion y componentes

## Regla de decisión

1. ¿Hay URL de referencia? → convocar `clone-website`.
2. ¿Hay producto físico o escena 3D? → convocar `web-3d` si aplica.
3. ¿El scroll cuenta una historia? → convocar `gsap-scrolltrigger` + `gsap-timeline`.
4. ¿Hay animaciones UI complejas? → convocar `gsap-react` + `gsap-core`.
5. ¿Solo motion general? → `web-animation-design` es suficiente.
6. Siempre: `frontend-design`, `ui-ux-pro-max`, performance QuantumHive.
