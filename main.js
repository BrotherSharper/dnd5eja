
let removedPacks1 = ["dnd5e.tradegoods","dnd5e.monsters", "dnd5e.spells", "dnd5e.classes","dnd5e.classfeatures","dnd5e.heroes","dnd5e.tradegoods","dnd5e.treasure"];

Hooks.on("renderCompendiumDirectory",   function(app, html, other) {
	console.log("CleanSRD Ready")
    html.find('[data-pack]').each(function(li) {
      const pack = game.packs.find(pack => pack.collection === this.dataset.pack);
      if (pack && removedPacks1.includes(pack.collection)) {
        $(this).remove();
      }
    });
  });
  

Hooks.once("init", () => {
	CONFIG.DND5E.sourcePacks = {
  ITEMS: "dnd5eja.items"
}
	
  CONFIG.DND5E.spellScrollIds = {
      0: 'oe1JVrpffMuUYOKd',
      1: 'lGg5DDNMyoP7n9J6',
      2: 'NP5pzu8msOZLhF6X',
      3: 'wnBKok4kvbuF2wBr',
      4: 'ef8UKmJcTG5vfW2o',
      5: 'IKwqm34hh7uaMnSn',
      6: '5xtEE5mfwNoKarOT',
      7: 'ud1RemNUD6Tkc173',
      8: 'NKs9pnKOwLlmccWD',
      9: '7ju738YpbvTHvunH'
    }; // replace the object with your own scroll uuids per level
	
	CONFIG.DND5E.weaponIds = {
    "battleaxe": "MM2ZMXiPMkJLjIVJ",
    "blowgun": "95HaNcc96nVNHSId",
    "club": "ClFHqa1s64rbM65n",
    "dagger": "cv7IzgY4MbkcS6oe",
    "dart": "Tw0QUDqUfzFh0qXy",
    "flail": "13iPopv3oXimEH1g",
    "glaive": "rviqASAON3GKNc5X",
    "greataxe": "DK4QW6wJdyi0uOex",
    "greatclub": "dYlRb7yUC2F5nCsm",
    "greatsword": "BxE9SEHb8iK0QQEx",
    "halberd": "28MrOc1B0tVzCKSN",
    "handaxe": "X46lMf4Z2NfcPaEr",
    "handcrossbow": "cffNfG26xXaZ2vjL",
    "heavycrossbow": "9dfiAl0Pe0FP8zVj",
    "javelin": "5O4BoklqimsxQ4KK",
    "lance": "3e6DxfVjSoaNx18k",
    "lightcrossbow": "r5cfpbVJ3kb1fnjO",
    "lighthammer": "NKxMmAq7eHJ7mybC",
    "longbow": "boDIyLcISTINX7pl",
    "longsword": "EzdJErIcTQRN7VXV",
    "mace": "vqPStWPCbnSXXvWy",
    "maul": "OF2f4F6RB6nOA0qx",
    "morningstar": "Hh4UT4zFcZaHAFK0",
    "net": "3lHa2GKngwazvLmk",
    "pike": "AbgmEdLaobLH5pSl",
    "quarterstaff": "T3xqRdxFqpE6GalS",
    "rapier": "NFtHvScZSNzsNLkl",
    "scimitar": "RbVb2gMb31X1NpYZ",
    "shortsword": "oqnVOoFxbcGnfrUV",
    "sickle": "d7lfFKfPUsEn8PGc",
    "spear": "efq12k6Yes7zskeq",
    "shortbow": "WlxNa0wbEG42BIca",
    "sling": "47rRMEAtREOlVfy8",
    "trident": "rpAvvmu6o3H60Dn1",
    "warpick": "feaTzcZQbcsAnPSb",
    "warhammer":  "Hmh0kb1Prvth80iG",
    "whip": "VuHEWSlaVRwHZFXN"
};

CONFIG.DND5E.toolIds = {
  "alchemist": "w1cWtLla8KB9lDys",
  "bagpipes": "kVW52vaULPIAORG2",
  "brewer": "USLc02zD4eq9l74q",
  "calligrapher": "m8JnBEw3Vhe8n2dU",
  "card": "w7UPeiOCroSdv8Xd",
  "carpenter": "Pq6KyBJpfTawrNFg",
  "cartographer": "3bjtetOgc4QSj5Dy",
  "chess": "FSPPxsVbfJVO9QkD",
  "cobbler": "Jki2dNCClGsL9qJo",
  "cook": "jwSSXdXOnsJqIuyr",
  "dice": "50Tv5lt9ESCDVR8R",
  "disg": "6sms7p3xkBJ5m9J6",
  "drum": "lbhzuKnRd0vEQsWH",
  "dulcimer": "TCWceYYsYTGfjVQD",
  "flute": "0pBJPb73PdFAOodP",
  "forg": "LcWZbgRBPDcDrphA",
  "glassblower": "kIGKKaHn8JvlkDP4",
  "herb": "zazOfhQboraTtD1p",
  "horn": "OpjOIQUqNf7OaX5y",
  "jeweler": "O0lkc0noeN3jYH4w",
  "leatherworker": "TzB3XaUV5cvhwG2m",
  "lute": "EDpzQz4Y22iBXMAY",
  "lyre": "Jm69kerDwPNybz5q",
  "mason": "wmVv4au4jWs0P3Ro",
  "navg": "KlFzw5d2W8grdRfg",
  "painter": "lZIzueXdF5oirpjv",
  "panflute": "A2LzjnkCYLG2up7M",
  "pois": "UqfKzy9EZG6v4xdZ",
  "potter": "w6YN32mOdnBpHl8v",
  "shawm": "Bt6PIV0pNgLw6srO",
  "smith": "SIOtJKfKGlpAQ99N",
  "thief": "EIiImZIKekEfgB61",
  "tinker": "i4iehvtgN5gSPVK6",
  "viol": "9578jqKUIYqcvNok",
  "weaver": "oWXg6eCn9BfOXWKc",
  "woodcarver": "4WQ8dW25AfVLDQU6"
};

CONFIG.DND5E.armorIds = {
  "breastplate": "m9PzNhPwQ1xI6Gvi",
  "chainmail": "OSTZRBd87WNPndPt",
  "chainshirt": "PSAbyzmqyiTHQpFG",
  "halfplate": "RmjzoJQYNJuUO3ti",
  "hide": "gs686W11SI3PR1PX",
  "leather": "TStcxEH10N8P6FEE",
  "padded": "Ebwvyg17YFxrVvq0",
  "plate": "VwX79rryAGhif0YC",
  "ringmail": "AWV5bkyCYump0sGB",
  "scalemail": "ytMPQAGz6pGNpLVR",
  "splint": "4KfLhVTPeFSBG2yA",
  "studded": "vBibFiwt4hUhPRLo"
};
  });