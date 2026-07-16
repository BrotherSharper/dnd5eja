#!/usr/bin/env node
/**
 * Open each LevelDB pack declared in module.json (via temp copy) and list document names.
 *
 * Usage:
 *   npm install --prefix /tmp/dnd5eja-smoke classic-level
 *   NODE_PATH=/tmp/dnd5eja-smoke/node_modules node scripts/smoke_packs.mjs [--root .]
 *
 * classic-level opens databases read-write and may compact; this script always copies
 * each pack to a temporary directory first so repository packs stay untouched.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const SMOKE_PREFIX = "/tmp/dnd5eja-smoke";

function parseArgs(argv) {
  const args = { root: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root" && argv[i + 1]) {
      args.root = path.resolve(argv[++i]);
    }
  }
  return args;
}

function loadClassicLevel(root) {
  const candidates = [
    () => require("classic-level"),
    () => require(path.join(root, "node_modules", "classic-level")),
    () => require(path.join(SMOKE_PREFIX, "node_modules", "classic-level")),
  ];
  for (const load of candidates) {
    try {
      return load();
    } catch {
      // continue
    }
  }
  throw new Error(
    `classic-level not found. Install with: npm install --prefix ${SMOKE_PREFIX} classic-level && NODE_PATH=${SMOKE_PREFIX}/node_modules node scripts/smoke_packs.mjs`
  );
}

function copyDir(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

function decodeValue(value) {
  if (Buffer.isBuffer(value)) {
    try {
      return JSON.parse(value.toString("utf8"));
    } catch {
      return null;
    }
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  if (value && typeof value === "object") return value;
  return null;
}

function isTopLevelDocKey(key) {
  const keyText = Buffer.isBuffer(key) ? key.toString("utf8") : String(key ?? "");
  // Foundry LevelDB: "!actors!<id>", "!items!<id>", "!journal!<id>", ...
  // Embedded rows look like "!actors!<id>.items!<itemId>" — skip those.
  if (keyText.includes("!folders") || keyText.includes("!compendium")) return false;
  // Allow digits/hyphen/underscore in collection segment for forward compatibility.
  return /^![A-Za-z0-9_-]+![^!.]+$/.test(keyText);
}

function isCountableDoc(key, doc) {
  if (!doc || typeof doc !== "object") return false;
  if (!isTopLevelDocKey(key)) return false;
  const name = doc.name || doc.label || null;
  return !!name;
}

async function smokePackCopy(ClassicLevel, packPath, label, tmpRoot, root) {
  const result = {
    name: path.basename(packPath),
    label,
    path: path.relative(root, packPath) || packPath,
    ok: false,
    count: 0,
    samples: [],
    error: null,
  };

  if (!fs.existsSync(packPath)) {
    result.error = "path missing";
    return result;
  }

  const copyPath = path.join(tmpRoot, result.name);
  let db;
  try {
    copyDir(packPath, copyPath);
    // Drop stale LOCK from the original copy so open succeeds.
    const lockPath = path.join(copyPath, "LOCK");
    if (fs.existsSync(lockPath)) fs.unlinkSync(lockPath);

    db = new ClassicLevel(copyPath, { createIfMissing: false });
    await db.open();
    const seen = new Set();
    for await (const [key, value] of db.iterator()) {
      const doc = decodeValue(value);
      if (!isCountableDoc(key, doc)) continue;
      const id = doc._id || doc.id || `${doc.name}|${doc.type || ""}`;
      if (seen.has(id)) continue;
      seen.add(id);
      const name = doc.name || doc.label;
      result.count += 1;
      if (result.samples.length < 5) result.samples.push(name);
    }
    if (result.count === 0) {
      result.ok = false;
      result.error = "no top-level documents";
    } else {
      result.ok = true;
    }
  } catch (err) {
    result.error = err?.message || String(err);
  } finally {
    if (db) {
      try {
        await db.close();
      } catch {
        // ignore
      }
    }
  }
  return result;
}

async function main() {
  const { root } = parseArgs(process.argv.slice(2));
  const moduleJson = JSON.parse(fs.readFileSync(path.join(root, "module.json"), "utf8"));
  const { ClassicLevel } = loadClassicLevel(root);
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "dnd5eja-pack-smoke-"));

  try {
    const results = [];
    for (const pack of moduleJson.packs || []) {
      const packPath = path.join(root, pack.path);
      results.push(
        await smokePackCopy(ClassicLevel, packPath, pack.label || pack.name, tmpRoot, root)
      );
    }

    const failed = results.filter((r) => !r.ok);
    for (const r of results) {
      const status = r.ok ? "OK" : "FAIL";
      const detail = r.ok
        ? `docs=${r.count} samples=${JSON.stringify(r.samples)}`
        : `error=${r.error}`;
      console.log(`[${status}] ${r.name} (${r.label}) ${detail}`);
    }

    console.log(`\nsummary: ${results.length - failed.length}/${results.length} OK`);
    if (failed.length) process.exitCode = 1;

    const reportPath = path.join(root, "reports", "pack-smoke.json");
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          ok: failed.length === 0,
          note: "Opened via temp copies; repository packs were not modified; paths are repo-relative",
          results,
        },
        null,
        2
      ) + "\n"
    );
    console.log(`Wrote ${reportPath}`);
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
