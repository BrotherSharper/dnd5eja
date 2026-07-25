/**
 * Babele converters for dnd5e *24 (SRD 2024) packs.
 *
 * Babele 2.9 ignores pack-level `converter` on babele.register({compendium}).
 * Wire translations through JSON `mapping` instead:
 * - actors24: biography → system.details.biography.value; nested Item activities
 * - Item packs: activities / mergeEffects / advancementById
 * - content24: default JournalEntry.pages mapping (text → text.content)
 *
 * Register these named converters so mapping.converter references resolve.
 */
import { activities } from "./converters/activities.js";
import { mergeEffects } from "./converters/merge-effects.js";
import { advancementById } from "./converters/advancement-by-id.js";
import { journalPagesById } from "./converters/journalPagesById.js";
import { journalEntryFullById } from "./converters/journalEntryFullById.js";
import { actorFullById } from "./converters/actorFullById.js";

Hooks.on("init", () => {
  const babele = game?.babele;
  if (!babele?.registerConverters) return;

  babele.registerConverters({
    activities,
    mergeEffects,
    advancementById,
    // Kept for optional JSON mapping / future use; not required when defaults + actors24 mapping cover the packs.
    journalPagesById,
    journalEntryFullById,
    actorFullById
  });

  console.log("[Babele - dnd5eja] converters registered:", Object.keys(babele.converters ?? {}));
});
