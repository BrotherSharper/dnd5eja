
var types = {
	"aberration (shapechanger)":"異形（変身生物）",
	"aberration":"異形",
	"beast":"野獣",
	"celestial (titan)":"セレスチャル（タイタン）",
	"celestial":"セレスチャル",
	"construct":"人造",
	"dragon":"ドラゴン",
	"elemental":"エレメンタル",
	"fey":"フェイ",
	"fiend (demon)":"フィーンド（デーモン）",
	"fiend (demon, orc)":"フィーンド（デーモン、オーク）",
	"fiend (demon, shapechanger)":"フィーンド（デーモン、変身生物）",
	"fiend (devil)":"フィーンド（デヴィル）",
	"fiend (devil, shapechanger)":"フィーンド（デヴィル、変身生物）",
	"fiend (gnoll)":"フィーンド（ノール）",
	"fiend (shapechanger)":"フィーンド（変身生物）",
	"fiend (yugoloth)":"フィーンド（ユゴロス）",
	"fiend":"フィーンド",
	"giant (cloud giant)":"巨人（クラウド・ジャイアント）",
	"giant (fire giant)":"巨人（ファイア・ジャイアント）",
	"giant (frost giant)":"巨人（フロスト・ジャイアント）",
	"giant (hill giant)":"巨人（ヒル・ジャイアント）",
	"giant (stone giant)":"巨人（ストーン・ジャイアント）",
	"giant (storm giant)":"巨人（ストーム・ジャイアント）",
	"giant":"巨人",
	"humanoid (aarakocra)":"人型生物（）",
	"humanoid (any race)":"人型生物（任意の種族）",
	"humanoid (bullywug)":"人型生物（ブリーワグ）",
	"humanoid (dwarf)":"人型生物（ドワーフ）",
	"humanoid (elf)":"人型生物（エルフ）",
	"humanoid (firenewt)":"人型生物（火蜥蜴）",
	"humanoid (gith)":"人型生物（ギス）",
	"humanoid (gnoll)":"人型生物（ノール）",
	"humanoid (gnome)":"人型生物（ノーム）",
	"humanoid (goblinoid)":"人型生物（ゴブリン）",
	"humanoid (grimlock)":"人型生物（グリムロック）",
	"humanoid (grung)":"人型生物（グラング）",
	"humanoid (human)":"人型生物（ヒューマン）",
	"humanoid (human, shapechanger)":"人型生物（ヒューマン、変身生物）",
	"humanoid (kenku)":"人型生物（ケンク）",
	"humanoid (kobold)":"人型生物（コボルド）",
	"humanoid (kuo-toa)":"人型生物（クオ・トア）",
	"humanoid (lizardfolk)":"人型生物（リザードフォーク）",
	"humanoid (merfolk)":"人型生物（マーフォーク）",
	"humanoid (orc)":"人型生物（オーク）",
	"humanoid (quaggoth)":"人型生物（クアゴス）",
	"humanoid (sahuagin)":"人型生物（サフアグン）",
	"humanoid (shapechanger)":"人型生物（変身生物）",
	"humanoid (thri-kreen)":"人型生物（スリ・クリーン）",
	"humanoid (troglodyte)":"人型生物（トログロダイト）",
	"humanoid (xvart)":"人型生物（ヴァート）",
	"humanoid (yuan-ti)":"人型生物（ユアンティ）",
	"humanoid":"人型生物",
	"monstrosity (shapechanger)":"怪異（変身生物）",
	"monstrosity (shapechanger, yuan-ti)":"怪異（ユアンティ、変身生物）",
	"monstrosity (titan)":"怪異（タイタン）",
	"monstrosity":"怪異",
	"ooze":"ウーズ",
	"plant":"植物",
	"swarm of Tiny beasts":"小型野獣の群れ",
	"undead (shapechanger)":"アンデッド（変身生物）",
	"undead":"アンデッド"
};

var alignments = {
	"chaotic evil": "混沌悪",
	"chaotic neutral":"混沌中立",
	"chaotic good":"混沌善",
	"neutral evil":"中立悪",
	"true neutral":"真なる中立",
	"neutral":"中立",
	"neutral good":"中立善",
	"lawful evil":"秩序悪",
	"lawful neutral":"秩序中立",
	"lawful good":"秩序善",
	"chaotic good evil":"混沌善・悪",
	"lawful chaotic evil":"秩序・混沌悪",
	"unaligned":"任意の属性",
	"any non-lawful": "秩序以外",
	"any": "任意",
};

var races = {
	"Dragonborn": "ドラゴンボーン",
	"Dwarf": "ドワーフ",
	"Hill Dwarf": "ヒル・ドワーフ",
	"Elf": "エルフ",
	"High Elf": "ハイ・エルフ",
	"Gnome": "ノーム",
	"Rock Gnome": "ロック・ノーム",
	"Half Elf": "ハーフエルフ",
	"Half-Elf": "ハーフエルフ",
	"Half-elf": "ハーフエルフ",
	"Halfling": "ハーフリング",
	"Lightfoot Halfling": "ライトフット・ハーフリング",
	"Half Orc": "ハーフオーク",
	"Half-Orc": "ハーフオーク",
	"HUMAN": "ヒューマン",
	"Human": "ヒューマン",
	"Variant Human": "ヒューマン選択ルール",
	"Tiefling": "ティーフリング"
};

var classes = {
	"Champion": "チャンピオン",
	"College of Lore": "知の楽派",
	"Oath of Devotion": "献身の誓い",
	"Life Domain": "生命の領域",
	"Circle of the Land": "土地の円環",
	"The Fiend": "フィーンド",
	"Hunter": "ハンター",
	"School of Evocation": "力術の学派",
	"Path of the Berserker": "狂戦士の道",
	"Eldritch Blast": "エルドリッチ・ブラスト",
	"Pact of the Tome": "書の契約",
	"Pact of the Blade": "剣の契約",
	"Pact of the Chain": "鎖の契約",
	"Way of the Open Hand": "開手の門"
};

// to be added in 1.6.0
// var classes = {
// 	"Barbarian": "バーバリアン",
// 	"Bard": "バード",
// 	"Cleric": "クレリック",
// 	"Druid": "ドルイド",
// 	"Fighter": "ファイター",
// 	"Monk": "モンク",
// 	"Paladin": "パラディン",
// 	"Ranger": "レンジャー",
// 	"Rogue": "ローグ",
// 	"Sorcerer": "ソーサラー",
// 	"Warlock": "ウォーロック",
// 	"Wizard": "ウィザード",
// 	"Champion": "チャンピオン",
// 	"College of Lore": "知の楽派",
// 	"Oath of Devotion": "献身の誓い",
// 	"Life Domain": "生命の領域",
// 	"Circle of the Land": "土地の円環",
// 	"The Fiend": "フィーンド",
// 	"Hunter": "ハンター",
// 	"School of Evocation": "力術の学派",
// 	"Path of the Berserker": "狂戦士の道",
// 	"Eldritch Blast": "エルドリッチ・ブラスト",
// 	"Pact of the Tome": "書の契約",
// 	"Pact of the Blade": "剣の契約",
// 	"Pact of the Chain": "鎖の契約",
// 	"Way of the Open Hand": "開手の門"
// };

var rarity = {
	"Common": "コモン",
	"Uncommon": "アンコモン",
	"Rare": "レア",
	"Very rare": "ヴェリーレア",
	"Legendary": "レジェンダリー"
};


function parseSenses(sensesText) {
	const senses = sensesText.split('. ');
	let parsed = '';
	senses.forEach(sense => { parsed = parseSense(sense) + ' ' + parsed; });
	return parsed;
}

// to be added in 1.6.0
// function parseDamage(damage) {
// 	damage = damage.replace(/bludgeoning/gi, '殴打');
// 	damage = damage.replace(/piercing/gi, '刺突');
// 	damage = damage.replace(/and/gi, '及び');
// 	damage = damage.replace(/slashing/gi, '斬撃');
// 	damage = damage.replace(/from/gi, 'からの');
// 	damage = damage.replace(/nonmagical attacks/gi, '非魔法的な攻撃');
// 	damage = damage.replace(/that aren't silvered/gi, '銀でできていない');
// 	damage = damage.replace(/not made with silvered weapons/gi, '');
// 	return damage;
// }

Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'dnd5eja',
			lang: 'ja',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			"alignement": (alignment) => {
				return alignments[alignment.toLowerCase()];
			},

			"race": (race) => {
				return races[race] ? races[race] : race;
			},
			"rarity": (r) => {
				return rarity[r] ? rarity[r] : r
			},
			"raceRequirements": (requirements) => {
				let translated = requirements;
				const names = Object.keys(races);
				names.forEach(name => {
					translated = translated.replaceAll(name, races[name])
				});
				return translated;
			},
			"classRequirements": (requirements) => {
				let translated = requirements;
				const names = Object.keys(classes);
				names.forEach(name => {
					translated = translated.replaceAll(name, classes[name])
				});
				return translated;
			},
			"classNameFormula": (formula) => {
				if(formula && typeof formula === 'string') {
					let translated = formula;
					const names = Object.keys(classes);
					names.forEach(name => {
						translated = translated.replaceAll(name.toLowerCase(), classes[name].toLowerCase())
					});
					return translated;
				}
			},
			"damagePartClassName": (array1) => {
				for (let i=0; i< array1.length; i++) {
					let array2 = array1[i];
					for (let j=0; j< array2.length; j++) {
						let translated = array2[j];
						if (translated && typeof translated === 'string') {
							const names = Object.keys(classes);
							names.forEach(name => {
								translated = translated.replaceAll(name.toLowerCase(), classes[name].toLowerCase())
							});
							array2[j] = translated;
						}
					}
					array1[i] = array2;
				}
				return array1;
			}
		});
	}
});