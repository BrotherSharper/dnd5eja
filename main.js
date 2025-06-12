
let removedPacks1 = ["dnd5e.heroes"];

Hooks.on("renderCompendiumDirectory", function(app, html, other) {
	console.log("CleanSRD Ready")
    $(html).find('[data-pack]').each(function(li) {
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

if(game.modules.get("automated-evocations")?.active){
console.log("automated animations用のデータを読み込みました")
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
	
  // CONFIG.DND5E.spellScrollIds = {
  //     0: 'oe1JVrpffMuUYOKd',
  //     1: 'lGg5DDNMyoP7n9J6',
  //     2: 'NP5pzu8msOZLhF6X',
  //     3: 'wnBKok4kvbuF2wBr',
  //     4: 'ef8UKmJcTG5vfW2o',
  //     5: 'IKwqm34hh7uaMnSn',
  //     6: '5xtEE5mfwNoKarOT',
  //     7: 'ud1RemNUD6Tkc173',
  //     8: 'NKs9pnKOwLlmccWD',
  //     9: '7ju738YpbvTHvunH'
  //   }; // replace the object with your own scroll uuids per level

// CONFIG.DND5E.classFeatures = {
//   "バーバリアン": CONFIG.DND5E.classFeatures["barbarian"],
//   "バード": CONFIG.DND5E.classFeatures["bard"],
//   "クレリック": CONFIG.DND5E.classFeatures["cleric"],
//   "ドルイド": CONFIG.DND5E.classFeatures["druid"],
//   "ファイター": CONFIG.DND5E.classFeatures["fighter"],
//   "モンク": CONFIG.DND5E.classFeatures["monk"],
//   "パラディン": CONFIG.DND5E.classFeatures["paladin"],
//   "レンジャー": CONFIG.DND5E.classFeatures["ranger"],
//   "ローグ": CONFIG.DND5E.classFeatures["rogue"],
//   "ソーサラー": CONFIG.DND5E.classFeatures["sorcerer"],
//   "ウォーロック": CONFIG.DND5E.classFeatures["warlock"],
//   "ウィザード": CONFIG.DND5E.classFeatures["wizard"]
// };
  });
