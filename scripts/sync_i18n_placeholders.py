#!/usr/bin/env python3
"""
Sync dnd5eja lang/ja.json to match dnd5e lang/en.json key structure.

- Keep existing Japanese translations when keys still exist
- Port translations across renames when English source text matches (optional 5.3 en)
- Optional explicit rename map
- Fill remaining missing keys with English placeholders
- Drop obsolete keys not present in en.json

Writes reports/placeholder-keys.json and reports/renamed-applied.json (generated; gitignored)
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

from i18n_json_io import fill_from_flat, flatten, load_json, write_lang_json

# Explicit renames when English wording changed but meaning is the same.
# new_key -> old_key
EXPLICIT_RENAMES: dict[str, str] = {
    "DND5E.ARMORCLASS.Calculation.Custom": "DND5E.ArmorClassCustom",
    "DND5E.ARMORCLASS.FIELDS.attributes.ac.override.hint": "DND5E.ArmorConfigHint",
}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--en", type=Path, required=True, help="dnd5e lang/en.json")
    parser.add_argument("--ja", type=Path, required=True, help="dnd5eja lang/ja.json")
    parser.add_argument(
        "--en-legacy",
        type=Path,
        default=None,
        help="Optional previous dnd5e en.json (e.g. 5.3.3) for rename matching",
    )
    parser.add_argument("--out", type=Path, required=True, help="Output ja.json path")
    parser.add_argument("--report", type=Path, required=True, help="Reports directory")
    parser.add_argument(
        "--pin",
        type=str,
        default="",
        help="dnd5e git pin recorded in reports",
    )
    args = parser.parse_args()

    en_tree = load_json(args.en)
    ja_tree = load_json(args.ja)
    en_flat = flatten(en_tree)
    ja_flat = flatten(ja_tree)

    en_legacy_flat: dict[str, str] = {}
    if args.en_legacy and args.en_legacy.exists():
        en_legacy_flat = flatten(load_json(args.en_legacy))

    # English text of removed keys -> list of old keys (prefer ja-translated ones later)
    removed_by_en: dict[str, list[str]] = defaultdict(list)
    if en_legacy_flat:
        for old_key in set(en_legacy_flat) - set(en_flat):
            removed_by_en[en_legacy_flat[old_key]].append(old_key)

    new_flat: dict[str, str] = {}
    renamed_applied: list[dict] = []
    placeholders: dict[str, str] = {}
    kept = 0
    used_old_keys: set[str] = set()

    def claim_old(old_key: str) -> None:
        used_old_keys.add(old_key)
        for eng, keys in list(removed_by_en.items()):
            filtered = [k for k in keys if k != old_key]
            if filtered:
                removed_by_en[eng] = filtered
            else:
                del removed_by_en[eng]

    for key, en_value in en_flat.items():
        if key in ja_flat:
            new_flat[key] = ja_flat[key]
            kept += 1
            if ja_flat[key] == en_value:
                placeholders[key] = en_value
            continue

        # 1) explicit rename map (each old key at most once)
        old_key = EXPLICIT_RENAMES.get(key)
        if old_key and old_key in ja_flat and old_key not in used_old_keys:
            new_flat[key] = ja_flat[old_key]
            renamed_applied.append(
                {"new": key, "old": old_key, "method": "explicit", "value": ja_flat[old_key]}
            )
            if ja_flat[old_key] == en_value:
                placeholders[key] = en_value
            claim_old(old_key)
            continue

        # 2) match by identical English string from removed keys (unused only)
        candidates = [c for c in removed_by_en.get(en_value, []) if c not in used_old_keys]
        chosen = None
        for cand in candidates:
            if cand in ja_flat and ja_flat[cand] != en_legacy_flat.get(cand, en_value):
                chosen = cand
                break
        if chosen is None:
            for cand in candidates:
                if cand in ja_flat:
                    chosen = cand
                    break
        if chosen is not None:
            new_flat[key] = ja_flat[chosen]
            renamed_applied.append(
                {
                    "new": key,
                    "old": chosen,
                    "method": "en-text-match",
                    "value": ja_flat[chosen],
                }
            )
            if ja_flat[chosen] == en_value:
                placeholders[key] = en_value
            claim_old(chosen)
            continue

        # 3) English placeholder
        new_flat[key] = en_value
        placeholders[key] = en_value

    obsolete = sorted(set(ja_flat) - set(en_flat))
    out_tree = fill_from_flat(en_tree, new_flat)
    write_lang_json(args.out, out_tree)

    args.report.mkdir(parents=True, exist_ok=True)
    pin = args.pin
    if not pin:
        pin_file = args.report.parent / "docs" / "dnd5e-pin.txt"
        if pin_file.exists():
            pin = pin_file.read_text(encoding="utf-8").splitlines()[0].strip()

    placeholder_report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "dnd5ePin": pin,
        "count": len(placeholders),
        "keys": dict(sorted(placeholders.items())),
    }
    with (args.report / "placeholder-keys.json").open("w", encoding="utf-8") as f:
        json.dump(placeholder_report, f, ensure_ascii=False, indent=2)
        f.write("\n")

    renamed_report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "dnd5ePin": pin,
        "count": len(renamed_applied),
        "entries": renamed_applied,
        "obsoleteDropped": obsolete,
        "stats": {
            "enKeys": len(en_flat),
            "keptExisting": kept,
            "renamed": len(renamed_applied),
            "placeholders": len(placeholders),
            "obsoleteDropped": len(obsolete),
        },
    }
    with (args.report / "renamed-applied.json").open("w", encoding="utf-8") as f:
        json.dump(renamed_report, f, ensure_ascii=False, indent=2)
        f.write("\n")

    out_flat = flatten(out_tree)
    if set(out_flat) != set(en_flat):
        missing = sorted(set(en_flat) - set(out_flat))
        extra = sorted(set(out_flat) - set(en_flat))
        print("ERROR: key parity failed", file=sys.stderr)
        print(" missing", len(missing), "extra", len(extra), file=sys.stderr)
        return 2

    print(
        f"OK en={len(en_flat)} kept={kept} renamed={len(renamed_applied)} "
        f"placeholders={len(placeholders)} obsolete_dropped={len(obsolete)}"
    )
    print(f"Wrote {args.out}")
    print(f"Reports in {args.report}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
