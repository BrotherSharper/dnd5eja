
let removedPacks1 = ["dnd5e.heroes","dnd5e.tradegoods","dnd5e.treasure"];

Hooks.on("renderCompendiumDirectory",   function(app, html, other) {
	console.log("CleanSRD Ready")
    html.find('[data-pack]').each(function(li) {
      const pack = game.packs.find(pack => pack.collection === this.dataset.pack);
      if (pack && removedPacks1.includes(pack.collection)) {
        $(this).remove();
      }
    });
  });

  Hooks.on("renderJournalSheet", (app, html, data) => {
    if (game.settings.get("dnd5eja", "PhbStyle") === true  ) {
      html[0].classList.add("phbs");
    }
  });
  

Hooks.once("init", () => {
	CONFIG.DND5E.sourcePacks = {
  ITEMS: "dnd5eja.items"
}

if(game.modules.get("automated-evocations")?.active){
console.log("found automated evocations")
const data = game.settings.get(AECONSTS.MN, "customautospells")

    data["スピリチュアル・ウェポン"]=[
      {
        creature: "スピリチュアル・ウェポン",
        number: 1,
        animation: "wind"
      }
    ];
    data["アーケイン・アイ"]=[
      {
        creature: "アーケイン・アイ",
        number: 1,
        animation: "magic"
      }
    ];
    data["アーケイン・ゲート"]=[
      {
        creature: "アーケイン・ゲート",
        number: 1,
        animation: "magic"
      }
    ];
    data["アニメイト・デッド"]=[
      {
        creature: "ゾンビ",
        number: 1,
        animation: "darkness"
      },
      {
        creature: "スケルトン",
        number: 1,
        animation: "darkness"
      }
    ];
    data["アンシーン・サーヴァント"]=[
      {
        creature: "アンシーン・サーヴァント",
        number: 1,
        animation: "magic"
      }
    ];
    data["ガーディアン・オヴ・フェイス"]=[
      {
        creature: "ガーディアン・オヴ・フェイス",
        number: 1,
        animation: "magic"
      }
    ];
    data["クリエイト・アンデッド"]=[
      {
        creature: "グール",
        number: 1,
        animation: "darkness"
      }
    ];
    data["ゲート"]=[
      {
        creature: "ポータル",
        number: 1,
        animation: "magic"
      }
    ];
    data["ディレイド・ブラスト・ファイアーボール"]=[
      {
        creature: "ディレイド・ブラスト・ファイアーボール",
        number: 1,
        animation: "fire"
      }
    ];
    data["フローティング・ディスク"]=[
      {
        creature: "フローティング・ディスク",
        number: 1,
        animation: "magic"
      }
    ];
    data["アーケイン・ハンド"]=[
      {
        creature: "アーケイン・ハンド",
        number: 1,
        animation: "magic"
      }
    ];
    data["ビグビーズ・ハンド"]=[
      {
        creature: "ビグビーズ・ハンド",
        number: 1,
        animation: "magic"
      }
    ];
    data["ファインド・スティード"]=[
      {
        creature: "スティード",
        number: 1,
        animation: "wind"
      }
    ];
    data["ファントム・スティード"]=[
      {
        creature: "ファントム・スティード",
        number: 1,
        animation: "magic"
      }
    ];
    data["フレイミング・スフィアー"]=[
      {
        creature: "フレイミング・スフィアー",
        number: 1,
        animation: "fire"
      }
    ];
    data["モルデンカイネンズ・ソード"]=[
      {
        creature: "モルデンカイネンズ・ソード",
        number: 1,
        animation: "magic"
      }
    ];
    data["モルデンカイネンズ・フェイスフル・ハウンド"]=[
      {
        creature: "モルデンカイネンズ・フェイスフル・ハウンド",
        number: 1,
        animation: "magic"
      }
    ];
    data["フェイスフル・ハウンド"]=[
      {
        creature: "フェイスフル・ハウンド",
        number: 1,
        animation: "magic"
      }
    ];
    data["イリューソリィ・ドラゴン"]=[
      {
        creature: "イリューソリィ・ドラゴン",
        number: 1,
        animation: "magic"
      }
    ];
    data["ウォータリー・スフィアー"]=[
      {
        creature: "ウォータリー・スフィアー",
        number: 1,
        animation: "water"
      }
    ];
    data["タイニー・サーヴァント"]=[
      {
        creature: "超小型の召使",
        number: 1,
        animation: "magic"
      }
    ];
    data["ヒーリング・スピリット"]=[
      {
        creature: "ヒーリング・スピリット",
        number: 1,
        animation: "magic"
      }
    ];
    data["ファインド・グレーター・スティード"]=[
      {
        creature: "グレーター・スティード",
        number: 1,
        animation: "magic"
      }
    ];
    data["ワールウィンド"]=[
      {
        creature: "竜巻",
        number: 1,
        animation: "wind"
      }
    ];
    data["魔導砲"]=[
      {
        creature: "火炎投射器",
        number: 1,
        animation: "magic"
      },
      {
        creature: "防護機",
        number: 1,
        animation: "magic"
      },
      {
        creature: "力場の大弩",
        number: 1,
        animation: "magic"
      }
    ];
game.settings.set(AECONSTS.MN, "customautospells", data)
  }

game.settings.register("dnd5eja", "PhbStyle", {
  name: "PHB風の資料スタイルを使う",
  hint: "資料やハンドアウトのスタイルがPHB風のものになります。",
  scope: "world",
  config: true,
  type: Boolean,
  default: false       // デフォでは使わない
});

game.settings.register("dnd5eja", "PhbStyle", {
  name: "PHB風の資料スタイルを使う",
  hint: "資料やハンドアウトのスタイルがPHB風のものになります。",
  scope: "world",
  config: true,
  type: Boolean,
  default: false       // デフォでは使わない
});
	
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

CONFIG.DND5E.classFeatures = {
  "バーバリアン": CONFIG.DND5E.classFeatures["barbarian"],
  "バード": CONFIG.DND5E.classFeatures["bard"],
  "クレリック": CONFIG.DND5E.classFeatures["cleric"],
  "ドルイド": CONFIG.DND5E.classFeatures["druid"],
  "ファイター": CONFIG.DND5E.classFeatures["fighter"],
  "モンク": CONFIG.DND5E.classFeatures["monk"],
  "パラディン": CONFIG.DND5E.classFeatures["paladin"],
  "レンジャー": CONFIG.DND5E.classFeatures["ranger"],
  "ローグ": CONFIG.DND5E.classFeatures["rogue"],
  "ソーサラー": CONFIG.DND5E.classFeatures["sorcerer"],
  "ウォーロック": CONFIG.DND5E.classFeatures["warlock"],
  "ウィザード": CONFIG.DND5E.classFeatures["wizard"]
};
  });

  Hooks.on("init", () => {
    CONFIG.TinyMCE.style_formats[0].items.push(
      {title : 'Fancy Table', selector : 'table', classes : 'class-table'}
    );
    CONFIG.TinyMCE.style_formats[0].items.push(
      {title : 'Stat Block', selector : 'blockquote', classes : 'class-statblock'}
    );
    CONFIG.TinyMCE.style_formats[0].items.push(
      {title : 'Descriptive Text', selector : 'blockquote', classes : 'class-descriptive'}
    );
  });