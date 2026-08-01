---
name: mejorar-skills
description: Revisa las skills de Web Factory contra los errores reales que fuimos encontrando, las corrige y crea las que falten. Se corre después de cada tanda de trabajo para que no volvamos a tropezar con lo mismo.
---

# Mejorar Skills

> La skill que mantiene a las demás. Su insumo son los **aprendizajes** reales,
> no las buenas intenciones.

## Por qué existe

`copiar-pagina` estuvo dos versiones mandando a analizar sitios con WebFetch
y scripts de `getComputedStyle`. WebFetch no ejecuta JavaScript: ese análisis
**nunca pudo correr**. Nadie lo detectó porque nadie lo midió.

Esta skill existe para que ese tipo de error se detecte y se corrija solo.

## Regla central

**Una skill solo se modifica con evidencia.** No se "mejora" por intuición ni
se reescribe porque suena mejor. Cada cambio sale de un aprendizaje verificado:
algo que se vio fallar y se comprobó cómo se arregla.

---

## Cuándo correrla

- Después de terminar una web de cliente.
- Cuando un build, un deploy o un preview falló y se resolvió.
- Cuando una skill mandó a hacer algo que resultó imposible o incorrecto.
- Antes de arrancar un frente nuevo, para no arrastrar deuda.

---

## FASE 1 — Recolectar aprendizajes

### 1.1 De la sesión que acaba de terminar

Por cada cosa que falló, registrar en la tabla `aprendizajes`:

| Campo | Qué va |
|-------|--------|
| `titulo` | Una línea que lo identifique |
| `sintoma` | Qué se vio, con la salida real |
| `causa` | Por qué pasaba |
| `solucion` | Qué lo arregló, comprobado |
| `skill_afectada` | Qué skill debería haberlo evitado |
| `severidad` | baja · media · alta · critica |
| `verificado` | `true` solo si se comprobó que la solución funciona |

```sql
insert into aprendizajes
  (titulo, sintoma, causa, solucion, skill_afectada, severidad, verificado)
values (...);
```

### 1.2 Los que quedaron pendientes

```sql
select * from aprendizajes
where verificado and not aplicado
order by
  case severidad
    when 'critica' then 1 when 'alta' then 2
    when 'media' then 3 else 4
  end,
  creado_en;
```

**Solo se procesan los `verificado = true`.** Un aprendizaje sin verificar es
una hipótesis, y meter hipótesis en una skill es cómo empezó el problema.

---

## FASE 2 — Diagnosticar cada skill

Para cada skill en `habilidades/`, revisar estas cuatro cosas. Son las que
fallaron de verdad, no una lista genérica:

### 2.1 ¿Los pasos se pueden ejecutar?

El error más caro. Por cada instrucción, preguntarse **con qué herramienta
concreta se hace**.

| Señal de alarma | Por qué |
|-----------------|---------|
| "Analizar con WebFetch" + scripts de DOM | WebFetch devuelve markdown, no ejecuta JS |
| "Verificar visualmente" sin decir cómo | No es un paso, es un deseo |
| Comandos de un CLI que no está instalado | Falla al primer intento |
| Rutas de archivos que no existen | Ver 2.2 |

### 2.2 ¿Las rutas existen?

```bash
grep -oE '`[a-z0-9./-]+/[a-z0-9.-]+`' habilidades/*.md | sort -u
```

Verificar que cada ruta citada exista. `construir-demo-web` mandaba a copiar
una plantilla desde `sistema-de-diseno/plantillas/`, donde solo hay un
`templates.ts`.

### 2.3 ¿Hay una sola fuente de verdad?

Si un dato aparece en dos lugares, uno va a quedar viejo. `copiar-pagina`
tenía las 6 paletas hardcodeadas **y** mandaba a leerlas de
`paletas-por-nicho/`.

Regla: el dato vive en un solo archivo; las skills lo referencian.

### 2.4 ¿Promete algo que no existe?

`copiar-pagina` listaba `agente-conversacional` en su pipeline. Esa skill no
existe, y el motor tampoco. Una skill que promete humo produce demos que
prometen humo.

---

## FASE 3 — Corregir

Un cambio por aprendizaje. Al modificar una skill:

1. Subir la versión en el encabezado.
2. Agregar una sección **"Qué cambió"** explicando el error concreto que se
   corrige. No "mejoras varias".
3. Actualizar `skills` en la base:

```sql
update skills set version = '3.0', actualizado_en = now()
where nombre = 'copiar-pagina';
```

4. Marcar el aprendizaje:

```sql
update aprendizajes set aplicado = true where id = '...';
```

### Cuándo crear una skill nueva

Solo si hay **tres o más aprendizajes** sobre un tema que ninguna skill cubre.
Menos que eso es una sección dentro de una skill existente.

Crear skills "para después" es el anti-patrón: si existe en el repo, tiene que
correr.

---

## FASE 4 — Verificar que la corrección sirve

Una skill corregida sin probar es una skill rota con fecha nueva.

1. Tomar el caso real que originó el aprendizaje.
2. Seguir la skill corregida **al pie de la letra**, sin completar huecos con
   criterio propio.
3. Si en algún punto hay que improvisar, ese punto todavía está mal escrito.

---

## FASE 5 — Registrar

```sql
insert into memorias (contenido, tipo, ambito, agente_id, etiquetas, importancia)
values (
  'copiar-pagina v3: el análisis visual ahora corre en navegador real. WebFetch no ejecuta JS.',
  'rule', 'web-factory', 'mejorar-skills',
  array['skills','copiar-pagina','analisis-visual'], 0.9
);
```

Así queda disponible para QuantumCore y para cualquier agente del ecosistema,
no solo para esta sesión.

---

## Formato de una skill sana

```markdown
---
name: nombre-en-kebab
description: Qué hace y cuándo usarla. Es lo que decide si se dispara.
---

# Nombre

> Versión X.Y — qué cambió respecto de la anterior.

## Objetivo
## Inputs (tabla: nombre, requerido, ejemplo)
## Fases numeradas, cada una con la herramienta concreta
## Errores conocidos (tabla: síntoma, causa, solución)
## Verificación (cómo se comprueba que salió bien)
```

Cada fase tiene que decir **con qué se hace**, no solo qué se hace.

---

## Estado actual de las skills

| Skill | Versión | Deuda conocida |
|-------|---------|----------------|
| `copiar-pagina` | 3.0 | — |
| `qa-web-cliente` | 1.0 | Sin revisar contra el flujo de Cloud Run |
| `construir-demo-web` | 1.0 | Apunta a una plantilla base que no está en el repo |
| `crear-plantilla` | 2.0 | Sin revisar |
| `mejorar-skills` | 1.0 | — |
