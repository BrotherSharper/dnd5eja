#!/usr/bin/env python3
"""Shared load/dump helpers for dnd5eja lang JSON (en.json-compatible style)."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def flatten(d: dict, prefix: str = "") -> dict[str, str]:
    out: dict[str, str] = {}
    if not isinstance(d, dict):
        return out
    for key, value in d.items():
        path = f"{prefix}.{key}" if prefix else key
        if isinstance(value, dict):
            out.update(flatten(value, path))
        else:
            if not isinstance(value, str):
                raise TypeError(f"Leaf must be string: {path} ({type(value).__name__})")
            out[path] = value
    return out


def fill_from_flat(en_node: Any, flat: dict[str, str], path: str = "") -> Any:
    if isinstance(en_node, dict):
        return {
            key: fill_from_flat(value, flat, f"{path}.{key}" if path else key)
            for key, value in en_node.items()
        }
    return flat[path]


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def dump_lang_json(obj: dict) -> str:
    """Match branch lang/en.json style: top-level at col 0, 2-space nest, blank lines around sections."""

    def dump_dict(d: dict, indent: int) -> str:
        if not d:
            return "{}"
        sp = "  " * indent
        sp_close = "  " * (indent - 1) if indent > 0 else ""
        lines = ["{"]
        items = list(d.items())
        for i, (k, v) in enumerate(items):
            comma = "," if i < len(items) - 1 else ""
            key = json.dumps(k, ensure_ascii=False)
            if isinstance(v, dict):
                lines.append(f"{sp}{key}: {dump_dict(v, indent + 1)}{comma}")
            else:
                lines.append(f"{sp}{key}: {json.dumps(v, ensure_ascii=False)}{comma}")
        lines.append(f"{sp_close}}}")
        return "\n".join(lines)

    rendered: list[tuple[str, bool]] = []
    items = list(obj.items())
    for i, (k, v) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        key = json.dumps(k, ensure_ascii=False)
        if isinstance(v, dict):
            inner_items = list(v.items())
            lines = [f"{key}: {{"]
            for j, (nk, nv) in enumerate(inner_items):
                nc = "," if j < len(inner_items) - 1 else ""
                nk_s = json.dumps(nk, ensure_ascii=False)
                if isinstance(nv, dict):
                    lines.append(f"  {nk_s}: {dump_dict(nv, 2)}{nc}")
                else:
                    lines.append(f"  {nk_s}: {json.dumps(nv, ensure_ascii=False)}{nc}")
            lines.append(f"}}{comma}")
            rendered.append(("\n".join(lines), True))
        else:
            rendered.append((f"{key}: {json.dumps(v, ensure_ascii=False)}{comma}", False))

    out_parts: list[str] = []
    for i, (text, is_dict) in enumerate(rendered):
        if i > 0 and (is_dict or rendered[i - 1][1]):
            out_parts.append("")
        out_parts.append(text)
    return "{\n" + "\n".join(out_parts) + "\n}\n"


def write_lang_json(path: Path, obj: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(dump_lang_json(obj), encoding="utf-8")
