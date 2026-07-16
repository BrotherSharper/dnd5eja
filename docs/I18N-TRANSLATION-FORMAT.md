# UI 本訳提供フォーマット（JSON）

Phase 2b でプレースホルダー（英語原文）を本番日本語に差し替える際のフォーマット仕様。

対象ファイル: `lang/ja.json`  
基準ファイル: `dnd5e/lang/en.json`（ピンしたコミット）

---

## 1. 正式フォーマット（必須）

### 種別

**Foundry / dnd5e と同じネスト JSON**（`lang/en.json`・`lang/ja.json` と同型）。

- トップレベルキーは **ドットを含む文字列もそのままキー**（例: `"DND5E.ARMORCLASS"`）。
- その下は通常のネストオブジェクト。
- 葉ノードの値は **文字列のみ**（数値・配列・boolean は不可）。
- UTF-8、BOM なし。
- JSON として合法（末尾カンマ禁止）。

### 最小例（差分のみ・推奨）

未訳（プレースホルダー）のキーだけを含む JSON でよい。  
既存の正しい日本語を再送する必要はない。

```json
{
  "DND5E.ARMORCLASS": {
    "Action": {
      "Configure": "アーマーの設定",
      "CreateFormula": "カスタム式を作成",
      "DeleteFormula": "カスタム式を削除"
    },
    "Calculation": {
      "Label": "計算方法"
    }
  },
  "DND5E.CONCENTRATION": {
    "Abbreviation": "集中",
    "Action": {
      "Break": "集中を破る",
      "End": "集中を終了"
    },
    "Description": "君は『{name}』の{type}の効果に集中している。"
  },
  "SETTINGS.DND5E": {
    "PIETY": {
      "Name": "信仰心",
      "Hint": "キャラクターシートに信仰心スコアを表示する。"
    }
  },
  "TYPES.ChatMessage": {
    "timePassed": "時間経過メッセージ"
  }
}
```

### 完全ファイルでも可

`lang/ja.json` 全体と同じ形のフル JSON を渡してもよい。  
マージ時は「提供ファイルに存在する葉キー」だけを上書きする。

---

## 2. キーの書き方

### 2.1 パスの意味

内部的な葉キー（flatten）はドット連結で表現する。

| flatten 表記 | JSON 上の位置 |
|--------------|----------------|
| `DND5E.ARMORCLASS.Action.Configure` | `{ "DND5E.ARMORCLASS": { "Action": { "Configure": "..." } } }` |
| `TYPES.ChatMessage.timePassed` | `{ "TYPES.ChatMessage": { "timePassed": "..." } }` |
| `DND5E.title` | `{ "DND5E.title": "..." }` ※トップが葉の場合 |

**注意:** dnd5e の `en.json` は「トップにドット付きキー + ネスト」のハイブリッド。  
提供 JSON も **この形に合わせる**（`{ "DND5E": { "ARMORCLASS": ... } }` のようにトップを分割しない）。

正:

```json
{ "DND5E.ARMORCLASS": { "Action": { "Configure": "アーマーの設定" } } }
```

誤（マージスクリプトがデフォルトでは解釈しない）:

```json
{ "DND5E": { "ARMORCLASS": { "Action": { "Configure": "アーマーの設定" } } } }
```

### 2.2 どのキーを訳すべきか

MVP 同期後に生成するレポートを使う。

| ファイル | 内容 |
|----------|------|
| `reports/placeholder-keys.json` | 値が英語プレースホルダーのままの葉キー一覧 |

`placeholder-keys.json` の想定形（レポート側・参考）:

```json
{
  "generatedAt": "2026-07-16T00:00:00Z",
  "dnd5ePin": "14dc4d78d0d49c63130ef2a84c37784f24e246c0",
  "count": 312,
  "keys": {
    "DND5E.ARMORCLASS.Action.Configure": "Configure Armor",
    "DND5E.CONCENTRATION.Action.Break": "Break Concentration"
  }
}
```

本訳 JSON は、この `keys` のパスに対応するネストを埋めて返す。

---

## 3. 値のルール

| ルール | 内容 |
|--------|------|
| プレースホルダ | `{name}`, `{type}`, `{duration}` 等は **英語原文と同じトークン**を残す |
| 複数形 | `.one` / `.other`（および Foundry が使う他接尾辞）は **キーごと**訳す |
| HTML | 原文に HTML があれば、タグは壊さずテキストのみ訳す |
| 空文字 | 禁止（未訳ならそのキーを **載せない**） |
| 英語のまま | 意図的に英語残しならキーを載せない（プレースホルダー維持） |
| 改行 | JSON 文字列内は `\n` |

### プレースホルダ例

原文:

```text
You are maintaining concentration on the effects of the '{name}' {type}.
```

訳:

```text
君は『{name}』の{type}の効果に集中している。
```

`{name}` / `{type}` を日本語に置換しない。

---

## 4. マージ仕様（実装側）

### 入力

| 引数 | 説明 |
|------|------|
| `--ja` | 現行 `lang/ja.json` |
| `--patch` | 本訳 JSON（本仕様） |
| `--en` | 基準 `en.json`（存在チェック用） |
| `--mode` | `placeholders-only`（既定） / `all` |
| `--report` | レポート出力先（既定 `reports/`）。`placeholder-keys.json` を再生成する |

### モード

| mode | 挙動 |
|------|------|
| `placeholders-only` | 現行 ja の値が en と同一（プレースホルダー）の葉だけ上書き。既に日本語のキーは触らない |
| `all` | パッチに含まれる葉をすべて上書き（訂正・再訳用） |

### 処理

1. パッチを flatten（ドットパス → 文字列）  
2. en に存在しないパス → **エラー一覧に入れ、そのキーはスキップ**（または `--strict` で失敗）  
3. mode に従い ja を更新  
4. ja を en と同じキー構造で書き戻し  
5. レポート更新: 残り placeholder 件数

### 終了コード（推奨）

| code | 意味 |
|------|------|
| 0 | 成功 |
| 1 | 不明キー・型エラーあり（一部適用した場合も非0にできる） |
| 2 | 入出力・JSON パース失敗 |

---

## 5. ファイル配置の慣例

```
dnd5eja/
├── lang/ja.json                          # マージ先（リポジトリ本体）
├── translations/                         # 提供物の置き場
│   ├── patch-ui-6.0.json                 # 差分本訳
│   └── patch-ui-6.0.meta.json            # 任意: 提供者・対象ピン等
└── reports/                              # 生成物（gitignore）。スクリプト実行時に作成
    └── placeholder-keys.json             # 未訳リスト
```

### メタ情報（任意・別ファイル）

```json
{
  "formatVersion": 1,
  "targetModule": "dnd5eja",
  "targetDnd5ePin": "14dc4d78d0d49c63130ef2a84c37784f24e246c0",
  "targetDnd5eVersion": "6.0.0",
  "language": "ja",
  "description": "UI placeholders for dnd5e 6.0.x",
  "author": "..."
}
```

本訳本体は **メタを混ぜず、純 i18n JSON のみ**とする（マージが単純になる）。

---

## 6. バリデーションチェックリスト（提供前）

- [ ] `JSON.parse` 可能  
- [ ] トップレベルキーが `en.json` に存在する（またはその配下パスが en に存在する）  
- [ ] 葉がすべて string  
- [ ] `{...}` プレースホルダが原文から欠けていない  
- [ ] 対象ピン（`docs/dnd5e-pin.txt`）と食い違うキーを大量に含んでいない  

簡易チェック例:

```bash
python3 -c "import json; json.load(open('translations/patch-ui-6.0.json'))"
```

---

## 7. 非対応（明示的にやらないこと）

| 形式 | 扱い |
|------|------|
| CSV / TSV | 本仕様の対象外（必要なら別途変換） |
| flat のみ `{ "A.B.C": "訳" }` | **非推奨**。必要ならネスト JSON に変換してから提出 |
| Babele `compendium/*.json` | 別フォーマット（compendium 用仕様は別ドキュメント） |
| `module.json` の文字列 | 対象外 |

---

## 8. ワークフロー要約

```text
[MVP] sync_i18n
  en + 旧ja → lang/ja.json（プレースホルダー埋め）
  → reports/placeholder-keys.json

[提供] 翻訳者
  placeholder-keys を参照
  → translations/patch-ui-6.0.json（本仕様のネスト JSON）

[Phase 2b] merge_i18n_patch
  ja + patch → lang/ja.json 更新
  → reports/placeholder-keys.json を再生成
```

---

*formatVersion: 1 — 2026-07-16*
