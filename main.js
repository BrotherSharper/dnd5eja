
let removedPacks = ["dnd5e.tradegoods","dnd5e.monsters", "dnd5e.spells", "dnd5e.classes","dnd5e.classfeatures","dnd5e.heroes","dnd5e.tradegoods","dnd5e.treasure"];

Hooks.on("renderCompendiumDirectory",   function(app, html, other) {
	console.log("CleanSRD Ready")
    html.find('[data-pack]').each(function(li) {
      const pack = game.packs.find(pack => pack.collection === this.dataset.pack);
      if (pack && removedPacks.includes(pack.collection)) {
        $(this).remove();
      }
    });
  });

Hooks.once("init", () => {
  CONFIG.DND5E.spellScrollIds = {
      0: 'Compendium.dnd5eja.items.rQ6sO7HDWzqMhSI3',
      1: 'Compendium.dnd5eja.items.9GSfMg0VOA2b4uFN',
      2: 'Compendium.dnd5eja.items.XdDp6CKh9qEvPTuS',
      3: 'Compendium.dnd5eja.items.hqVKZie7x9w3Kqds',
      4: 'Compendium.dnd5eja.items.DM7hzgL836ZyUFB1',
      5: 'Compendium.dnd5eja.items.wa1VF8TXHmkrrR35',
      6: 'Compendium.dnd5eja.items.tI3rWx4bxefNCexS',
      7: 'Compendium.dnd5eja.items.mtyw4NS1s7j2EJaD',
      8: 'Compendium.dnd5eja.items.aOrinPg7yuDZEuWr',
      9: 'Compendium.dnd5eja.items.O4YbkJkLlnsgUszZ'
    }; // replace the object with your own scroll uuids per level
  });