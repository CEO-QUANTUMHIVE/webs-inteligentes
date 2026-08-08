#!/usr/bin/env bash
# Regenera el grafo Graphify del repo. Lo llaman los hooks y se puede correr a mano.
#
#   ./scripts/graphify-update.sh            # actualiza el grafo (raíz git)
#   ./scripts/graphify-update.sh --force    # tras refactors que borran código
#
# No usa LLM. graphify-out/ está gitignorado: se reconstruye por máquina/worktree.
set -uo pipefail

RAIZ="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "graphify-update: no se pudo resolver la raíz del repo git." >&2
  exit 1
}

command -v graphify >/dev/null 2>&1 || {
  echo "graphify-update: 'graphify' no está en el PATH." >&2
  echo "  Instalar:  pip install graphifyy        # .sql -> pip install \"graphifyy[sql]\"" >&2
  echo "  Skill:     /graphify  (ver .claude/skills/graphify/SKILL.md)" >&2
  exit 127
}

cd "$RAIZ"
graphify update . "$@"
rc=$?
if [ "$rc" -ne 0 ]; then
  echo "graphify-update: 'graphify update .' falló (exit $rc)." >&2
  echo "  Regenerar a mano:  ./scripts/graphify-update.sh --force" >&2
fi
exit "$rc"