export function advancementById(source, translation) {
  if (!Array.isArray(source) || !translation || typeof translation !== "object") return source;

  const out = source.map(a => foundry.utils.deepClone(a));

  for (const adv of out) {
    const id = adv?._id ?? adv?.id;
    if (!id) continue;
    const patch = translation[id];
    if (patch && typeof patch === "object") {
      foundry.utils.mergeObject(adv, patch, { insertKeys: true, overwrite: true, inplace: true });
    }
  }
  return out;
}
