# D&D5版用 日本語化モッド

* **製作者**: Brother Sharp (ディスコード：Brother Sharp#6921)
* **翻訳ファイル提供者**: [Brother Sharp, Asami, touge]
* **ベーシックルール整備協力者**: [TAKUMI]
* **SRD整備訳協力者**: [SIM_KAZ, TAKUMI, のらせす, コーラ, うどんみ, くろたる, アイリッシュ, なる, kenken, しきちきん, takagi, SikaZika, Jean.N, 弌鳥トリィ, B03, Corsha, SIM]
* **対応 dnd5e バージョン**: **5.3.0〜5.3.3**（Stable `release-5.3.3` 追従）
* **対応 Foundry VTT**: **13〜14**（minimum 13 / verified 14）

> このブランチ（`maintenance/5.3`）は **dnd5e 5.3.x / Foundry V13–14** 向けのメンテ線です。  
> **いまの `master` は当面 5.3 相当のまま**です。**dnd5e 6.0 / Foundry 14.359+** 向けは作業ブランチ `feature/dnd5e-6.0` を利用してください（将来 `master` へマージ予定）。  
> 検証ピン: [`docs/dnd5e-pin-5.3.txt`](docs/dnd5e-pin-5.3.txt)

＊現在は2024年版の対応を暫定的に行っています。下の説明が完成するまで時間がかかります。
使用はできますが、不自然な翻訳に気づきましたら教えて下さい。

### SRD 2024（`*24` packs）の日本語化

本モジュールは **UI 翻訳** と **旧 SRD / ベーシックルール辞典** が中心です。  
公式 dnd5e に含まれる **SRD 2024 コンペンディアム**（`classes24` / `spells24` / `equipment24` / `actors24` / `content24` など）の本文翻訳は、別モジュールで提供しています。

* リポジトリ: https://github.com/kenken-trpg/translate-dnd5e-sdr2-ja  
* マニフェスト: https://raw.githubusercontent.com/kenken-trpg/translate-dnd5e-sdr2-ja/main/module.json  

**併用手順（推奨）**

1. 本モジュール（`dnd5eja`）・`foundryVTTja`・`babele`・`lib-wrapper` を有効化  
2. `translate-dnd5e-sdr2-ja` をインストールして有効化（Foundry が推奨モジュールとして案内する場合あり）  
3. 言語を **日本語 (ja)** にする  
4. Compendium の `*24` パック（クラス・呪文・アクター等）が日本語になることを確認  

`translate-dnd5e-sdr2-ja` は本モジュールの置き換えではなく **補完** です。旧 SRD 辞典・UI 訳はこれまでどおり本モジュール側を使います。

### インストール方法

以下のリンクをモッドとしてインストールしてください。

* 本線（master・当面 5.3 相当）: https://raw.githubusercontent.com/BrotherSharper/dnd5eja/master/module.json
* 5.3 メンテ線（upstream）: https://raw.githubusercontent.com/BrotherSharper/dnd5eja/maintenance/5.3/module.json
* 5.3 メンテ線（fork・upstream 反映前の開発用）: https://raw.githubusercontent.com/kenken-trpg/dnd5eja/maintenance/5.3/module.json
* 6.0 作業線（fork）: https://raw.githubusercontent.com/kenken-trpg/dnd5eja/feature/dnd5e-6.0/module.json

### 内容
D&D5版システム用の翻訳ファイルおよび辞典が追加されます。ベーシックルール（整備：TAKUMIさん）およびSRD（整備：オンセ工房サーバのみなさん）の辞典も中に含まれています。
さらに、D&D2024をFVTTで購入した方はフリールールのデータも日本語で利用できるようになります。

#### SRD
* クラス（自動レベルアップ付き）
* サブクラス
* クラス特徴
* 種族特徴
* 呪文
* アイテム＆アイテムリスト
* マジックアイテム（アイテムに含まれる）
* NEW すべてのモンスター

#### ベーシックルール
* すべてのルール
* 種族
* 背景
* クラス
* クラス特徴

#### フリールール https://note.com/brothersharp/n/nf606c79c1819
* 装備品
* 今後ほかも追加予定

このモッドを使用するには先にモッドとしてインストールし、ゲーム内でモッドを有効化する必要があります。

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
