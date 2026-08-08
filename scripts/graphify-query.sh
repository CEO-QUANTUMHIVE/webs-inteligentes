#!/usr/bin/env bash
# Consulta el grafo Graphify (primera herramienta de navegación arquitectónica).
# Pensado para localizar archivos mínimos ANTES de explorar el repo a mano.
#
#   ./scripts/graphify-query.sh query "donde se registra el catalogo 3d"
#   ./scripts/graphify-query.sh explain "efectos_publicos"
#   ./scripts/graphify-query.sh path "catalogo-cliente" "Supabase"
#   ./scripts/graphify-query.sh "como se protege el codigo privado"   # => query
#
# Sale con el código de graphify. Si no hay grafo, correr ./scripts/graphify-update.sh.
set -uo pipefail

RAIZ="$(git rev-parse --show-toplevel 2>/dev/null)" || RAIZ="$PWD"

command -v graphify >/dev/null 2>&1 || {
  echo "graphify-query: 'graphify' no está en el PATH. Instalar: pip install graphifyy" >&2
  exit 127
}

GRAFO="$RAIZ/graphify-out/graph.json"
if [ ! -f "$GRAFO" ]; then
  echo "graphify-query: no existe $GRAFO. Generar con:  ./scripts/graphify-update.sh" >&2
  exit 1
fi

cd "$RAIZ"

SUB="query"
if [ "$#" -gt 0 ]; then
  case "$1" in
    query|explain|path|diagnose|cluster-only)
      SUB="$1"; shift ;;
    *)
      # el primer argumento es la pregunta; dejamos SUB=query
      ;;
  esac
fi

exec graphify "$SUB" "$@"