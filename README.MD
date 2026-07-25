# D&D5版用 日本語化モッド

* **製作者**: Brother Sharp (ディスコード：Brother Sharp#6921)
* **翻訳ファイル提供者**: [Brother Sharp, Asami, touge]
* **ベーシックルール整備協力者**: [TAKUMI]
* **SRD整備訳協力者**: [SIM_KAZ, TAKUMI, のらせす, コーラ, うどんみ, くろたる, アイリッシュ, なる, kenken, しきちきん, takagi, SikaZika, Jean.N, 弌鳥トリィ, B03, Corsha, SIM]
* **対応dnd5eバージョン**: 6.0.0+（Foundry VTT 14.359+）
* **V13 / dnd5e 5.3.x向け**: ブランチ `maintenance/5.3`

＊dnd5e 6.0向けにUIキーを同期しています。新規UIの一部は英語プレースホルダーの場合があります（仕様: docs/I18N-TRANSLATION-FORMAT.md）。
＊SRD 2024（`*24` コンペンディアム）の Babele 翻訳を同梱しています。不自然な訳に気づいたら教えてください。

### インストール方法

以下のリンクをモッドとしてインストールしてください。

* リンク： https://raw.githubusercontent.com/BrotherSharper/dnd5eja/master/module.json
* 6.0 作業線（fork）: https://raw.githubusercontent.com/kenken-trpg/dnd5eja/feature/dnd5e-6.0/module.json

必要モジュール: **Babele**、**foundryVTTja**（および Babele 用の **lib-wrapper**）。

### 内容
D&D5版システム用の翻訳ファイルおよび辞典が追加されます。ベーシックルール（整備：TAKUMIさん）およびSRD（整備：オンセ工房サーバのみなさん）の辞典も中に含まれています。
さらに、D&D2024 / SRD 2024 のシステムコンペンディアム（`*24`）も日本語で利用できます。

#### SRD（従来）
* クラス（自動レベルアップ付き）
* サブクラス
* クラス特徴
* 種族特徴
* 呪文
* アイテム＆アイテムリスト
* マジックアイテム（アイテムに含まれる）
* すべてのモンスター

#### ベーシックルール
* すべてのルール
* 種族
* 背景
* クラス
* クラス特徴

#### SRD 2024（dnd5e `*24` / Babele）
* Classes / Origins / Feats / Spells / Equipment
* Actors / Tables / Rules（content24）/ Monster Features
* 翻訳ソースは srd2024 JA パック（参考実装: [translate-dnd5e-sdr2-ja](https://github.com/kenken-trpg/translate-dnd5e-sdr2-ja)）

#### フリールール https://note.com/brothersharp/n/nf606c79c1819
* 装備品など（従来の暫定対応）

このモッドを使用するには先にモッドとしてインストールし、ゲーム内でモッドを有効化する必要があります。

### 注意: 他の SRD 2024 翻訳モジュールとの併用

**`translate-dnd5e-sdr2-ja` と同時に有効にしないでください。**  
同じ `dnd5e.*24` パックを両方とも翻訳するため、Babele のマージ結果で **パック表示名（label）や訳が上書き・混在**します。  
実運用では **dnd5eja のみ**を有効にし、`translate-dnd5e-sdr2-ja` は無効（またはアンインストール）にしてください。

### 何か足りませんか？

SRDに入っているはずなのに載っていないアイテムや、法律上変えざるをえなかなった特徴名のより良い翻訳を提案したい方は以下のいずれかの方法でお願いします。
* http://discord.gg/vM4YM27 に入室しご提案ください。
* PRを送ってください。
* Issueを作ってください。

### 本体の日本語化
オンセ工房FoundryVTT本体の日本語化はこちらからどうぞ

* https://github.com/BrotherSharper/foundryVTTja

### このModへの要望

このModに何かを追加したい場合はプルリクエスト、Issueまたはオンセ工房サーバよりご相談ください。

### このModを自分の作品や動画等で使いたい方（2021/12/01日より適用）

このMod（D&D５版用日本語化モッド）は現在もオンセ工房（Foundry VTT）日本コミュニティによって維持管理されています。ご自由にお使いいただけます。

クレジットを表記する必要はありませんが、FVTTとこのModの活動を広めている方の励みになりますので良ければ以下の内容を記載いただくようお願いします。
* https://twitter.com/FoundryVTT_JP または http://discord.gg/vM4YM27

ただし、ここにはHJ配布の対訳語表の中身が含まれています。これらの訳語に対する権利はHJに帰属します。
http://hobbyjapan.co.jp/dd/support/Dic5eAll.txt
