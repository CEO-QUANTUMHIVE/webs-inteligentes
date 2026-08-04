#!/usr/bin/env python
"""
Calcula el ratio de contraste WCAG entre dos colores hex.
Usar SIEMPRE que se cree una paleta nueva (no hay una en
habilidades/paletas-por-nicho/ para el nicho) — no estimar contraste a ojo.

Uso:
    python contraste.py "#ffffff" "#0a1f1c"
    python contraste.py "#ffffff" "#0a1f1c" --minimo 4.5

Salida: el ratio y si cumple el minimo (4.5 texto, 3.0 bordes/UI grande).
"""
import sys


def lum(hex_color: str) -> float:
    hex_color = hex_color.lstrip("#")
    r, g, b = (int(hex_color[i:i + 2], 16) / 255 for i in (0, 2, 4))

    def chan(c: float) -> float:
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = chan(r), chan(g), chan(b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contraste(c1: str, c2: str) -> float:
    l1, l2 = lum(c1), lum(c2)
    l1, l2 = max(l1, l2), min(l1, l2)
    return (l1 + 0.05) / (l2 + 0.05)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    a, b = sys.argv[1], sys.argv[2]
    minimo = 4.5
    if "--minimo" in sys.argv:
        minimo = float(sys.argv[sys.argv.index("--minimo") + 1])
    ratio = contraste(a, b)
    cumple = "OK" if ratio >= minimo else "NO CUMPLE"
    print(f"{a} sobre {b}: {ratio:.2f}:1 (minimo {minimo}) -> {cumple}")
