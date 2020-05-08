//var CleanSrd=function(){
//console.log("CleanSRD Ready")
let removedPacks = ["dnd5e.monsters", "dnd5e.spells", "dnd5e.classes","dnd5e.classfeatures","dnd5e.heroes","dnd5e.tradegoods","dnd5e.treasure"];

//}

Hooks.on("renderCompendiumDirectory",   function(app, html, other) {
	console.log("CleanSRD Ready")
    html.find('[data-pack]').each(function(li) {
      const pack = game.packs.find(pack => pack.collection === this.dataset.pack);
      if (pack && removedPacks.includes(pack.collection)) {
        $(this).remove();
      }
    });
  });
