#!/usr/bin/env bash
# Regenera el bloque "MAPA AUTO" dentro de CLAUDE.md a partir de los archivos
# versionados. Lo llama el hook pre-commit; tambien se puede correr a mano.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

DESTINO="CLAUDE.md"
INICIO="<!-- INICIO MAPA AUTO -->"
FIN="<!-- FIN MAPA AUTO -->"

[ -f "$DESTINO" ] || { echo "No existe $DESTINO"; exit 0; }

BLOQUE="$(mktemp)"
trap 'rm -f "$BLOQUE" "$BLOQUE.nuevo"' EXIT

# Los archivos staged aun no salen en git ls-files, asi que unimos ambas listas.
listar_archivos() {
  { git ls-files; git diff --cached --name-only --diff-filter=ACMR; } | sort -u
}

{
  echo "$INICIO"
  echo "## Mapa del repo"
  echo
  echo "_Generado por \`scripts/actualizar-mapa.sh\` en cada commit. No editar a mano._"
  echo
  echo "Actualizado: $(date +%Y-%m-%d) · $(listar_archivos | wc -l | tr -d ' ') archivos versionados"
  echo

  echo "| Área | Archivos | Qué contiene |"
  echo "|------|----------|--------------|"
  listar_archivos | awk -F/ 'NF>1 {print $1}' | sort | uniq -c | sort -rn |
  while read -r cantidad area; do
    case "$area" in
      clientes)          desc="Proyectos Next.js de cada cliente" ;;
      habilidades)       desc="Skills del pipeline y material de apoyo" ;;
      sistema-de-diseno) desc="Tokens, registro de componentes y efectos" ;;
      plantillas)        desc="Plantillas por tipo de negocio" ;;
      motor-agentes)     desc="Andamiaje del agente conversacional (sin implementar)" ;;
      documentacion)     desc="Documentos de producto y comerciales" ;;
      evaluaciones)      desc="Criterios de QA visual, factual y conversacional" ;;
      scripts)           desc="Automatización del repo" ;;
      CONTEXTO)          desc="Contexto del proyecto" ;;
      *)                 desc="—" ;;
    esac
    printf '| `%s/` | %s | %s |\n' "$area" "$cantidad" "$desc"
  done
  echo

  # Rutas reales del sitio, leidas del arbol de archivos
  echo "### Rutas del sitio"
  echo
  RUTAS="$(listar_archivos | grep -E '^clientes/quantum-hive/src/app/.*page\.tsx$' || true)"
  if [ -n "$RUTAS" ]; then
    echo "$RUTAS" | while read -r archivo; do
      ruta="${archivo#clientes/quantum-hive/src/app/}"
      ruta="${ruta%/page.tsx}"
      [ "$ruta" = "page.tsx" ] && ruta="(home)"
      printf -- '- `/%s` → `%s`\n' "${ruta#\(home\)}" "$archivo"
    done
  else
    echo "_Sin rutas detectadas._"
  fi
  echo

  echo "$FIN"
} > "$BLOQUE"

# Reemplaza todo lo que haya entre los marcadores por el bloque nuevo.
awk -v inicio="$INICIO" -v fin="$FIN" -v bloque="$BLOQUE" '
  $0 == inicio { dentro = 1; while ((getline linea < bloque) > 0) print linea; next }
  $0 == fin    { dentro = 0; next }
  !dentro      { print }
' "$DESTINO" > "$BLOQUE.nuevo"

if cmp -s "$DESTINO" "$BLOQUE.nuevo"; then
  exit 0   # sin cambios
fi

mv "$BLOQUE.nuevo" "$DESTINO"
echo "CLAUDE.md: mapa actualizado"
