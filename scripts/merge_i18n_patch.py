#!/usr/bin/env python3
"""
Merge a nested Japanese translation patch JSON into lang/ja.json.

See docs/I18N-TRANSLATION-FORMAT.md
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from i18n_json_io import fill_from_flat, flatten, load_json, write_lang_json


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ja", type=Path, required=True)
    parser.add_argument("--patch", type=Path, required=True)
    parser.add_argument("--en", type=Path, required=True, help="dnd5e en.json for structure + validation")
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument(
        "--mode",
        choices=("placeholders-only", "all"),
        default="placeholders-only",
    )
    parser.add_argument("--strict", action="store_true", help="Fail on unknown patch keys")
    parser.add_argument(
        "--report",
        type=Path,
        default=Path("reports"),
        help="Directory for placeholder-keys.json (default: reports/)",
    )
    parser.add_argument("--pin", type=str, default="", help="dnd5e pin recorded in report")
    args = parser.parse_args()

    en_tree = load_json(args.en)
    ja_tree = load_json(args.ja)
    patch_tree = load_json(args.patch)

    en_flat = flatten(en_tree)
    ja_flat = flatten(ja_tree)
    try:
        patch_flat = flatten(patch_tree)
    except TypeError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 2

    unknown = sorted(set(patch_flat) - set(en_flat))
    if unknown:
        print(f"Unknown keys in patch: {len(unknown)}", file=sys.stderr)
        for key in unknown[:20]:
            print(f"  {key}", file=sys.stderr)
        if args.strict:
            return 1

    applied = 0
    skipped_existing = 0
    for key, value in patch_flat.items():
        if key not in en_flat:
            continue
        if args.mode == "placeholders-only":
            current = ja_flat.get(key)
            if current is not None and current != en_flat[key]:
                skipped_existing += 1
                continue
        ja_flat[key] = value
        applied += 1

    for key, en_value in en_flat.items():
        ja_flat.setdefault(key, en_value)

    out_tree = fill_from_flat(en_tree, ja_flat)
    write_lang_json(args.out, out_tree)

    out_flat = flatten(out_tree)
    placeholders = {k: v for k, v in out_flat.items() if v == en_flat[k]}

    args.report.mkdir(parents=True, exist_ok=True)
    pin = args.pin
    if not pin:
        pin_file = Path("docs/dnd5e-pin.txt")
        if pin_file.exists():
            pin = pin_file.read_text(encoding="utf-8").splitlines()[0].strip()

    placeholder_report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "dnd5ePin": pin,
        "count": len(placeholders),
        "keys": dict(sorted(placeholders.items())),
    }
    report_path = args.report / "placeholder-keys.json"
    with report_path.open("w", encoding="utf-8") as f:
        json.dump(placeholder_report, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(
        f"OK applied={applied} skipped_existing={skipped_existing} "
        f"unknown={len(unknown)} remaining_placeholders={len(placeholders)}"
    )
    print(f"Wrote {args.out}")
    print(f"Wrote {report_path}")
    return 1 if (unknown and args.strict) else 0


if __name__ == "__main__":
    raise SystemExit(main())
