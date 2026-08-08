#!/usr/bin/env python3
"""Validador del catálogo 3D contra ficha-3d.schema.json.

Sin dependencias externas: usa solo stdlib (json, pathlib, re).
Valida: sintaxis JSON, campos required, tipos, enums, patrones,
rutas existentes, sin duplicados en indice.json, coherencia indice<->fichas.

Ejecutar desde la raíz del repo (o cualquier worktree):
    python scripts/validar-3d.py
Salida: 0 si todo OK, 1 si hay errores.
"""
import json
import re
import sys
from pathlib import Path

CAT = Path("catalogo/elementos/3d")
SCHEMA = CAT / "ficha-3d.schema.json"
ELEMENTOS = CAT / "elementos"
INDICE = CAT / "indice.json"


def main() -> int:
    errores: list[str] = []
    if not CAT.is_dir():
        print(f"[FAIL] no existe {CAT}")
        return 1

    # 1) Schema carga
    try:
        schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        print(f"[FAIL] schema inválido: {e}")
        return 1

    props = schema["properties"]
    required = schema["required"]
    enums = {
        k: v["enum"] for k, v in props.items() if isinstance(v, dict) and "enum" in v
    }
    tipo_py = {
        "string": str,
        "integer": int,
        "boolean": bool,
        "array": list,
        "object": dict,
    }

    # 2) indice.json
    try:
        indice = json.loads(INDICE.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        errores.append(f"indice.json inválido: {e}")
        indice = None

    ids_indice: list[str] = []
    if indice:
        ids_indice = [e["id"] for e in indice.get("elementos", [])]
        if len(ids_indice) != len(set(ids_indice)):
            errores.append("indice.json: IDs duplicados")
        if indice.get("total_elementos") != len(ids_indice):
            errores.append(
                f"indice.json: total_elementos={indice.get('total_elementos')} "
                f"!= {len(ids_indice)} reales"
            )

    # 3) cada elemento
    fichas = sorted(ELEMENTOS.glob("*/ficha.json"))
    ids_fichas: list[str] = []
    for ficha_path in fichas:
        eid = ficha_path.parent.name
        ctx = f"{eid}/ficha.json"
        try:
            f = json.loads(ficha_path.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            errores.append(f"{ctx}: JSON inválido: {e}")
            continue

        ids_fichas.append(f.get("id", eid))

        # required
        for r in required:
            if r not in f:
                errores.append(f"{ctx}: falta campo requerido '{r}'")

        # tipos y enums
        for k, v in f.items():
            if k not in props:
                errores.append(f"{ctx}: campo no declarado en schema '{k}'")
                continue
            spec = props[k]
            t = spec.get("type")
            if isinstance(t, list):
                if v is None and "null" in t:
                    continue
                t = [x for x in t if x != "null"]
                py = [tipo_py[x] for x in t]
                # bool es subclass de int: validar primero
                if isinstance(v, bool):
                    if bool not in py:
                        errores.append(f"{ctx}: '{k}' bool no esperado")
                elif not any(isinstance(v, p) for p in py):
                    errores.append(f"{ctx}: '{k}' tipo {type(v).__name__} != {t}")
            elif isinstance(t, str):
                py = tipo_py[t]
                if isinstance(v, bool) and py is int:
                    pass
                elif not isinstance(v, py):
                    errores.append(f"{ctx}: '{k}' tipo {type(v).__name__} != {t}")
            # enums
            if k in enums and v is not None:
                if v not in enums[k]:
                    errores.append(f"{ctx}: '{k}'='{v}' fuera de enum {enums[k]}")

        # patrones
        if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", f.get("id", "")):
            errores.append(f"{ctx}: id '{f.get('id')}' no respeta patron kebab")
        if f.get("hash_sha256") and not re.match(
            r"^[0-9a-f]{64}$", f["hash_sha256"]
        ):
            errores.append(f"{ctx}: hash_sha256 inválido")
        if f.get("fecha_ingreso") and not re.match(
            r"^\d{4}-\d{2}-\d{2}$", f["fecha_ingreso"]
        ):
            errores.append(f"{ctx}: fecha_ingreso inválida")

        # rutas existen
        for campo in ("ruta_asset", "ruta_preview"):
            rel = f.get(campo)
            if rel:
                target = CAT / rel
                if not target.exists():
                    errores.append(f"{ctx}: {campo} '{rel}' no existe en disco")

        # referencia_remota: no debe existir modelo.glb
        if f.get("tipo") == "referencia_remota":
            glb = ficha_path.parent / "modelo.glb"
            if glb.exists():
                errores.append(
                    f"{ctx}: referencia_remota no debe contener modelo.glb"
                )
            esc = ficha_path.parent / "escena.json"
            if not esc.exists():
                errores.append(f"{ctx}: referencia_remota debe tener escena.json")

    # coherencia indice<->fichas
    if sorted(ids_indice) != sorted(ids_fichas):
        errores.append(
            f"indice IDs != fichas IDs: indice={ids_indice} fichas={ids_fichas}"
        )

    # reporte
    if errores:
        print(f"[FAIL] {len(errores)} error(es):")
        for e in errores:
            print(f"  - {e}")
        return 1
    print(f"[OK] {len(fichas)} fichas válidas, indice coherente, 0 errores.")
    return 0


if __name__ == "__main__":
    sys.exit(main())