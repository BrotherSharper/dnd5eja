/**
 * Translate dnd5e activities keyed by activity _id.
 * Mapping: { path: "system.activities", converter: "activities" }
 * Translation shape: { [activityId]: { name?: string } }
 */
export function activities(source, translation) {
  if (!source || !translation || typeof translation !== "object") return source;

  const deepClone =
    globalThis.foundry?.utils?.deepClone
      ? foundry.utils.deepClone
      : (obj) => structuredClone(obj);

  const out = deepClone(source);
  for (const [actId, act] of Object.entries(out)) {
    const patch = translation[actId];
    if (!patch || typeof patch !== "object") continue;
    if (typeof patch.name === "string") act.name = patch.name;
  }
  return out;
}
