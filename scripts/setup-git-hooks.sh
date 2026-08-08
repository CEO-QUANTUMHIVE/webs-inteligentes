#!/usr/bin/env bash
# Activa los hooks versionados de este repo. Configuración LOCAL (no toca --global).
# Idempotente: se puede correr las veces que haga falta.
#
#   ./scripts/setup-git-hooks.sh
#
# Convención existente del repo: hooks en scripts/hooks/ (no en .githooks/).
# Eso evita duplicar y romper el pre-commit que ya维持 el mapa de CLAUDE.md.
set -uo pipefail

RAIZ="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "setup-git-hooks: no es un repo git." >&2
  exit 1
}
cd "$RAIZ"

HOOKS_DIR="scripts/hooks"
[ -d "$HOOKS_DIR" ] || { echo "setup-git-hooks: falta $HOOKS_DIR/ en el repo." >&2; exit 1; }

# Sólo configuración local del repo/worktree.
git config core.hooksPath "$HOOKS_DIR"

# En Git Bash/Windows chmod es irrelevante pero no daña; en *nix asegura ejecución.
chmod +x "$HOOKS_DIR"/* 2>/dev/null || true

echo "Hooks activados (config local): core.hooksPath = $(git config core.hooksPath)"
echo "Hooks disponibles en $HOOKS_DIR/:"
ls -1 "$HOOKS_DIR"
echo
echo "Para saltear un hook puntual:  git commit --no-verify"