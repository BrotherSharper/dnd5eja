Hooks.once('babele.init', (babele) => {

	if(typeof Babele !== 'undefined') {
		babele.register({
			module: 'dnd5eja',
			lang: 'ja',
			dir: 'compendium'
		});

		const alignments = {
			"chaotic evil": "混沌にして悪",
			"chaotic neutral":"混沌にして中立",
			"chaotic good":"混沌にして善",
			"neutral evil":"中立にして悪",
			"true neutral":"真なる中立",
			"neutral":"真なる中立",
			"neutral good":"中立にして善",
			"lawful evil":"秩序にして悪",
			"lawful neutral":"秩序にして中立",
			"lawful good":"秩序にして善",
			"unaligned":"無属性",
			"any": "任意の属性",
			"any alignment": "任意の属性",
			"any evil": "任意の悪属性",
			"any chaotic": "任意の混沌属性",
			"any non-good": "善でない任意の属性",
			"any non-good alignment": "善でない任意の属性",
			"any non-lawful": "秩序でない任意の属性",
			"any non-lawful alignment": "秩序でない任意の属性",
		};

		const races = {
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

		const habitats = {
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

		const classes = {
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
			"Thief": "シーフ",
			"School of Evocation": "力術の学派",
			"Path of the Berserker": "狂戦士の道",
			"Eldritch Blast": "エルドリッチ・ブラスト",
			"Pact of the Tome": "書の契約",
			"Pact of the Blade": "剣の契約",
			"Pact of the Chain": "鎖の契約",
			"Way of the Open Hand": "開手の門",
			"Draconic Bloodline": "竜の血脈"
		};

		const subtypes = {
			"shapechanger":"変身生物",
			"titan":"タイタン",
			"demon":"デーモン",
			"demon, orc":"デーモン、オーク",
			"demon, shapechanger":"デーモン、変身生物",
			"devil":"デヴィル",
			"devil, shapechanger":"デヴィル、変身生物",
			"gnoll":"ノール",
			"yugoloth":"ユゴロス",
			"any race":"任意の種族",
			"bullywug":"ブリーワグ",
			"dwarf":"ドワーフ",
			"elf":"エルフ",
			"gnome":"ノーム",
			"goblinoid":"ゴブリン",
			"grimlock":"グリムロック",
			"grung":"グラング",
			"human":"ヒューマン",
			"human, shapechanger":"ヒューマン、変身生物",
			"kenku":"ケンク",
			"kobold":"コボルド",
			"kuo-toa":"クオ・トア",
			"lizardfolk":"リザードフォーク",
			"merfolk":"マーフォーク",
			"orc":"オーク",
			"quaggoth":"クアゴス",
			"sahuagin":"サフアグン",
			"thri-kreen":"スリ・クリーン",
			"troglodyte":"トログロダイト",
			"xvart":"ヴァート",
			"halfling": "ハーフリング",
			"dragonborn": "ドラゴンボーン",
			"tiefling": "ティーフリング"
		};

		const languages = {
			"any one language (usually common)": "1種類 (普通は共通語)",
			"any one language": "任意の言語1種類",
			"any two languages": "任意の言語2種類",
			"any three languages": "任意の言語3種類",
			"any four languages": "任意の言語4種類",
			"any one": "任意の言語1種類",
			"any two": "任意の言語2種類",
			"any three": "任意の言語3種類",
			"any four": "任意の言語4種類",
			"understands the languages of its creator but cannot speak": "作成者が知っていたすべての言語を解するが話すことはできない",
			"understands the languages of its creator but can't speak": "作成者が知っていたすべての言語を解するが話すことはできない",
			"the languages it knew in life": "生前に知っていた言語すべて",
			"languages it knew in life": "生前に知っていた言語すべて",
			"any languages it knew in life": "生前に知っていた言語すべて",
		};

		const advancements = {
			"hit points": "ヒット・ポイント",
			"features": "特徴",
			"ability score improvement": "能力値上昇",
			"cantrips known": "初級呪文習得数",
			"spells known": "呪文習得数",
			"expertise": "習熟強化",
			"arcane tradition": "秘術の学派",
			"signature spells": "愛用呪文",
			"otherworldly patron": "この世ならぬ契約相手",
			"eldritch invocations": "妖術",
			"pact boon": "契約の恩恵",
			"mystic arcanum (6th level)": "秘奥義 (6レベル)",
			"mystic arcanum (7th level)": "秘奥義 (7レベル)",
			"mystic arcanum (8th level)": "秘奥義 (8レベル)",
			"mystic arcanum (9th level)": "秘奥義 (9レベル)",
			"divine domain": "信仰の領域",
			"channel divinity uses": "神性伝導 回数",
			"destroy undead cr": "アンデッド破壊 脅威度",
			"sorcerous origin": "魔力の起源",
			"metamagic": "呪文修正",
			"wild shape cr": "自然の化身 脅威度上限",
			"wild shape uses": "自然の化身 回数",
			"druid circle": "ドルイドの円環",
			"bardic inspiration die": "バードの声援ダイス",
			"song of rest die": "休息の歌ダイス",
			"bard college": "バードの学派",
			"magical secrets": "魔法の秘密",
			"rage damage": "激怒時ダメージ",
			"rages": "激怒回数",
			"primal path": "原始の道",
			"brutal critical dice": "荒々しきクリティカル ダイス",
			"fighting style": "戦闘スタイル",
			"divine health": "健全なる肉体",
			"sacred oath": "聖なる誓い",
			"aura radius": "オーラ距離",
			"action surge uses": "怒涛のアクション 回数",
			"martial archetype": "戦士の類型",
			"indomitable uses": "不屈 回数",
			"martial arts die": "武術ダイス",
			"unarmored movement": "運足法",
			"purity of body": "無病身",
			"ranger archetype": "レンジャーの類型",
			"sneak attack": "急所攻撃",
			"roguish archetype": "ローグの類型",
		};

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
					return foundry.utils.mergeObject(data, {
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

			"advancement": (advancement) => {
				return advancement.forEach(item => {
					if (!item.title) return;

					const key = item.title.toLowerCase();
					if (advancements[key]) {
						item.title = advancements[key];
					}
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
			"subtype": (subtype) => {
				return subtypes[subtype.toLowerCase()] ? subtypes[subtype.toLowerCase()] : subtype;
			},
			"language": (language) => {
				return languages[language.toLowerCase()] ? languages[language.toLowerCase()] : language;
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
		});
	}
});
