/* Paste/eval in Foundry console (GM, lang=ja, modules on). Returns smoke 7.2 results.
 *
 * i18n policy (MVP):
 * - requiredJp: existing 5.3→6.0 translated keys must stay Japanese
 * - mustResolve: keys must not show as raw DND5E.XXX (English placeholder OK)
 * - #4: Babele must yield Japanese Goblin name (English-only import is FAIL by design)
 */
(async () => {
  const results = {};
  const created = { actors: [] };
  const hasJa = (s) => /[\u3040-\u30ff\u4e00-\u9fff]/.test(String(s ?? ""));
  const ok = (id, pass, note) => {
    results[id] = { pass: !!pass, note: String(note ?? "") };
  };
  // Only ignore Foundry's known Electron-client upgrade warning (JP/EN), not any "Electron" string.
  const isEnvNoise = (text) =>
    /older version of the Foundry Virtual Tabletop Electron client/i.test(text) ||
    (/Electron/.test(text) && /インストーラーで新規に更新/.test(text)) ||
    (/Electron/.test(text) && /アプリ内のアップデートでは更新されない/.test(text));

  const localizeAll = (keys) => Object.fromEntries(keys.map((k) => [k, game.i18n.localize(k)]));

  try {
    // Required modules match module.json / README (lib-wrapper is optional).
    const requiredMods = ["dnd5eja", "babele", "foundryVTTja"];
    const mods = [...requiredMods, "lib-wrapper"].map((id) => {
      const m = game.modules.get(id);
      return { id, present: !!m, active: !!m?.active, incompatible: !!m?.incompatible };
    });
    const compatWarn = [...document.querySelectorAll(".notification")]
      .map((n) => n.innerText)
      .filter((t) => /incompatible|互換性/i.test(t) && !isEnvNoise(t));
    ok(
      1,
      requiredMods.every((id) => game.modules.get(id)?.active) && compatWarn.length === 0,
      JSON.stringify({ mods, compatWarn })
    );

    // requiredJp: known maintained Japanese strings (must not regress to English).
    const requiredJp = [
      "DND5E.ARMORCLASS.Action.Configure",
      "DND5E.CONCENTRATION.Action.Break",
      "DND5E.REST.Long.Label",
      "DND5E.REST.Short.Label",
      "DND5E.AbilityStr",
    ];
    // mustResolve: no raw key display; English placeholder is acceptable for MVP new UI.
    const mustResolve = [
      "DND5E.ARMORCLASS.Action.CreateFormula", // typically still placeholder English
      "DND5E.CONCENTRATION.Lost",
    ];
    const locJp = localizeAll(requiredJp);
    const locResolve = localizeAll(mustResolve);
    const rawRequired = requiredJp.filter((k) => locJp[k] === k);
    const rawResolve = mustResolve.filter((k) => locResolve[k] === k);
    const missingJp = requiredJp.filter((k) => !hasJa(locJp[k]));
    ok(
      2,
      game.i18n.lang === "ja" && rawRequired.length === 0 && missingJp.length === 0 && rawResolve.length === 0,
      JSON.stringify({
        lang: game.i18n.lang,
        requiredJp: locJp,
        mustResolve: locResolve,
        rawRequired,
        missingJp,
        rawResolve,
      })
    );

    let actor;
    try {
      actor = await Actor.implementation.create({ name: "Smoke PC", type: "character" });
      created.actors.push(actor.id);
      const pack = game.packs.get("dnd5e.classes");
      let fighterFound = false;
      let classCount = 0;
      if (pack) {
        const idx = await pack.getIndex();
        const entry = [...idx].find((e) => /fighter|ファイター/i.test(e.name));
        if (entry) {
          fighterFound = true;
          const fighter = await pack.getDocument(entry._id);
          const createdItems = await actor.createEmbeddedDocuments("Item", [fighter.toObject()]);
          classCount = createdItems.length;
        }
      }
      ok(
        3,
        !!actor && fighterFound && classCount > 0,
        `actor=${actor?.id} classItems=${classCount} fighterFound=${fighterFound}`
      );
    } catch (e) {
      ok(3, false, e?.message || String(e));
    }

    try {
      const pack = game.packs.get("dnd5e.monsters");
      const idx = await pack.getIndex();
      const list = [...idx];
      // Prefer JP; English lookup exists only to surface Babele-miss as japanese=false FAIL.
      const entry =
        list.find((e) => e.name === "ゴブリン") ||
        list.find((e) => e.name === "Goblin") ||
        list.find((e) => /^goblin$/i.test(e.name));
      if (!entry) throw new Error("Goblin / ゴブリン not found in dnd5e.monsters index");
      const npc = await pack.getDocument(entry._id);
      const imported = await Actor.implementation.create(npc.toObject());
      created.actors.push(imported.id);
      const japanese = hasJa(imported.name);
      ok(
        4,
        !!imported && japanese,
        `name=${imported.name} japanese=${japanese} source=${entry.name}`
      );
    } catch (e) {
      ok(4, false, e?.message || String(e));
    }

    try {
      if (!actor) throw new Error("actor missing from #3");
      const pack = game.packs.get("dnd5e.spells");
      const idx = await pack.getIndex();
      const list = [...idx];
      const entry =
        list.find((e) => /ファイア.?ボルト|fire\s*bolt/i.test(e.name)) ||
        list.find((e) => /fire bolt/i.test(e.name));
      if (!entry) throw new Error("Fire Bolt not found in dnd5e.spells index");
      const spell = await pack.getDocument(entry._id);
      const [embedded] = await actor.createEmbeddedDocuments("Item", [spell.toObject()]);
      const hasUse = typeof embedded?.use === "function";
      let used = false;
      let err = null;
      if (!hasUse) {
        err = "embedded.use is not a function";
      } else {
        try {
          const maybe = embedded.use({
            configure: false,
            createMeasuredTemplate: false,
            skipDialog: true,
          });
          if (maybe?.then) await maybe;
          used = true;
        } catch (e2) {
          err = e2?.message || String(e2);
        }
      }
      ok(
        5,
        !!embedded && hasUse && used && !err,
        `spell=${embedded?.name} hasUse=${hasUse} usedAttempt=${used} err=${err}`
      );
    } catch (e) {
      ok(5, false, e?.message || String(e));
    }

    try {
      // Rest labels are requiredJp (maintained translations), not placeholder-tolerant.
      const shortL = game.i18n.localize("DND5E.REST.Short.Label");
      const longL = game.i18n.localize("DND5E.REST.Long.Label");
      const methods = typeof actor?.shortRest === "function" && typeof actor?.longRest === "function";
      ok(
        6,
        shortL !== "DND5E.REST.Short.Label" &&
          longL !== "DND5E.REST.Long.Label" &&
          methods &&
          hasJa(shortL) &&
          hasJa(longL),
        `short=${shortL} long=${longL} methods=${methods}`
      );
    } catch (e) {
      ok(6, false, e?.message || String(e));
    }

    try {
      // AC labels below are requiredJp. Placeholder-tolerant AC keys are covered in #2 mustResolve.
      const requiredAcJp = [
        "DND5E.ARMORCLASS.Action.Configure",
        "DND5E.ARMORCLASS.Configuration",
        "DND5E.ARMORCLASS.Calculation.Label",
      ];
      const acLoc = localizeAll(requiredAcJp);
      const raw = requiredAcJp.filter((k) => acLoc[k] === k);
      const missingJp = requiredAcJp.filter((k) => !hasJa(acLoc[k]));
      ok(7, raw.length === 0 && missingJp.length === 0, JSON.stringify({ acLoc, raw, missingJp }));
    } catch (e) {
      ok(7, false, e?.message || String(e));
    }

    try {
      if (!actor) throw new Error("actor missing from #3");
      const [ae] = await actor.createEmbeddedDocuments("ActiveEffect", [
        { name: "Smoke Effect", img: "icons/svg/aura.svg", changes: [] },
      ]);
      await ae.sheet.render(true);
      const open = !!ae.sheet?.rendered;
      await ae.sheet?.close?.();
      ok(8, open, `effect=${ae.id}`);
    } catch (e) {
      ok(8, false, e?.message || String(e));
    }

    try {
      const errNotes = [...document.querySelectorAll("#notifications .notification.error, .notification.error")]
        .map((n) => n.innerText.slice(0, 200))
        .filter((t) => !isEnvNoise(t));
      ok(9, errNotes.length === 0, JSON.stringify(errNotes));
    } catch (e) {
      ok(9, false, e?.message || String(e));
    }

    const packResults = [];
    try {
      const modulePacks = [...game.packs].filter(
        (p) => p.metadata.packageName === "dnd5eja" || String(p.collection).startsWith("dnd5eja.")
      );
      for (const pack of modulePacks) {
        try {
          const idx = await pack.getIndex();
          const docs = [...idx].slice(0, 2);
          if (docs.length === 0) {
            packResults.push({ id: pack.collection, ok: false, error: "empty pack index" });
            continue;
          }
          const opened = [];
          for (const d of docs) {
            const doc = await pack.getDocument(d._id);
            await doc.sheet?.render(true);
            opened.push(doc.name);
            await doc.sheet?.close?.();
          }
          packResults.push({ id: pack.collection, ok: true, opened });
        } catch (e) {
          packResults.push({ id: pack.collection, ok: false, error: e?.message || String(e) });
        }
      }
      ok(10, packResults.length > 0 && packResults.every((p) => p.ok), JSON.stringify(packResults));
    } catch (e) {
      ok(10, false, e?.message || String(e));
    }
  } finally {
    const ids = [...new Set(created.actors.filter(Boolean))];
    if (ids.length) {
      try {
        await Actor.deleteDocuments(ids);
      } catch {
        // ignore cleanup failures
      }
    }
  }

  return {
    lang: game.i18n.lang,
    sys: game.system.version,
    foundry: game.release,
    results,
  };
})();
