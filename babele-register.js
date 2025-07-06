var alignments = {
	"chaotic evil": "混沌にして悪",
	"chaotic neutral":"混沌にして中立",
	"chaotic good":"混沌にして善",
	"neutral evil":"中立にして悪",
	"true neutral":"真なる中立",
	"neutral":"中立",
	"neutral good":"中立にして善",
	"lawful evil":"秩序にして悪",
	"lawful neutral":"秩序にして中立",
	"lawful good":"秩序にして善",
	"chaotic good evil":"混沌善・悪",
	"lawful chaotic evil":"秩序・混沌悪",
	"unaligned":"無属性",
	"any non-lawful": "秩序以外",
	"any": "任意の属性",
};

var races = {
	"Copper Dragonborn": "カッパードラゴンボーン",
	"Green Dragonborn": "グリーンドラゴンボーン",
	"Gold Dragonborn": "ゴールドドラゴンボーン",
	"Silver Dragonborn": "シルヴァードラゴンボーン",
	"Brass Dragonborn": "ブラスドラゴンボーン",
	"Black Dragonborn": "ブラックドラゴンボーン",
	"Blue Dragonborn": "ブルードラゴンボーン",
	"Bronze Dragonborn": "ブロンズドラゴンボーン",
	"White Dragonborn": "ホワイトドラゴンボーン",
	"Red Dragonborn": "レッドドラゴンボーン",
	"Dragonborn": "ドラゴンボーン",
	"Hill Dwarf": "ヒル・ドワーフ",
	"Dwarf": "ドワーフ",
	"High Elf": "ハイ・エルフ",
	"Rock Gnome": "ロック・ノーム",
	"Gnome": "ノーム",
	"Half Elf": "ハーフエルフ",
	"Half-Elf": "ハーフエルフ",
	"Half-elf": "ハーフエルフ",
	"Elf": "エルフ",
	"Lightfoot Halfling": "ライトフット・ハーフリング",
	"Halfling": "ハーフリング",
	"Half Orc": "ハーフオーク",
	"Half-Orc": "ハーフオーク",
	"HUMAN": "ヒューマン",
	"Human": "ヒューマン",
	"Variant Human": "ヒューマン選択ルール",
	"Tiefling": "ティーフリング"
};

var habitats = {
    "Any": "任意",
    "Arctic": "極地",
    "Coastal": "沿岸",
    "Desert": "砂漠",
    "Forest": "森林",
    "Grassland": "草原",
    "Hill": "丘陵",
    "Mountain": "山岳",
    "Planar": "次元界",
    "Swamp": "湿地",
    "Underdark": "アンダーダーク",
    "Underwater": "水中",
    "Urban": "都市"
};

var classes = {
	"Barbarian": "バーバリアン",
	"Bard": "バード",
	"Cleric": "クレリック",
	"Druid": "ドルイド",
	"Fighter": "ファイター",
	"Monk": "モンク",
	"Paladin": "パラディン",
	"Ranger": "レンジャー",
	"Rogue": "ローグ",
	"Sorcerer": "ソーサラー",
	"Warlock": "ウォーロック",
	"Wizard": "ウィザード",
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


function parseSenses(sensesText) {
	const senses = sensesText.split('. ');
	let parsed = '';
	senses.forEach(sense => { parsed = parseSense(sense) + ' ' + parsed; });
	return parsed;
}

Hooks.once('babele.init', (babele) => {

	if(typeof Babele !== 'undefined') {

		babele.register({
			module: 'dnd5eja',
			lang: 'ja',
			dir: 'compendium'
		});

		babele.registerConverters({
			dndpages(pages, translations) {
				return pages.map((data) => {
					if (!translations) {
						return data;
					}

					let translation;

					if (Array.isArray(translations)) {
						translation = translations.find((t) => t.id === data._id || t.id === data.name);
					} else {
						translation = translations[data.name];
					}

					if (!translation) {
						return data;
					}
					return mergeObject(data, {
						name: translation.name,
						image: { caption: translation.caption ?? data.image?.caption },
						src: translation.src ?? data.src,
						text: { content: translation.text ?? data.text?.content },
						video: {
							width: translation.width ?? data.video?.width,
							height: translation.height ?? data.video?.height
						},
						system: translation.system ?? data.system,
						translated: true
					});
				});
			},
			"alignment": (alignment) => {
				return alignments[alignment.toLowerCase()] ? alignments[alignment.toLowerCase()] : alignment;
			},
			"race": (race) => {
				return races[race] ? races[race] : race;
			},
			"habitat": (habitat) => {
				return habitats[habitat] ? habitats[habitat] : habitat
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
