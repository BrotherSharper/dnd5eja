export function mergeEffects(source, translation) {
  if (!Array.isArray(source) || !translation) return source;

  const byId = {};
  const byName = {};

  if (Array.isArray(translation)) {
    for (const t of translation) {
      if (!t) continue;
      if (t._id) byId[t._id] = t;
      if (t.name && !t._id) byName[t.name] = t;
    }
  } else if (typeof translation === "object") {
    for (const [k, v] of Object.entries(translation)) {
      if (!v || typeof v !== "object") continue;
      const id = v._id || k;
      if (typeof id === "string" && id.length >= 6 && (id === v._id || /^[a-zA-Z0-9]{6,}$/.test(id))) {
        byId[id] = v;
      }
      if (typeof k === "string") byName[k] = v;
    }
  }

  const deepClone =
    globalThis.foundry?.utils?.deepClone
      ? foundry.utils.deepClone
      : (obj) => structuredClone(obj);

  return source.map((eff) => {
    const id = eff?._id;
    const name = eff?.name;

    const patch = (id && byId[id]) ? byId[id] : (name && byName[name]) ? byName[name] : null;
    if (!patch) return eff;

    const cloned = deepClone(eff);

    if (patch.name !== undefined) cloned.name = patch.name;
    if (patch.description !== undefined) cloned.description = patch.description;

    return cloned;
  });
}
