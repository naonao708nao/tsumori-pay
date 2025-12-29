

## ディレクトリ構成

```
.
├── app/                 # 【メイン】アプリケーションの全画面を管理
│   ├── _layout.tsx      # 全画面共通のレイアウト。Context APIによるデータ管理とタブメニューを定義。
│   ├── index.tsx        # ホーム画面。現在の「つもり貯金総額」を表示するエントリーポイント。
│   ├── input.tsx        # 入力画面。「コーヒー」や「飲み会」などのカテゴリを選択し、貯金を追加。
│   └── history.tsx      # 履歴画面。過去に「つもり貯金」した日付と内容をリスト形式で表示。
├── assets/              # アプリアイコンやスプラッシュ画像などの静的リソース
├── app.json             # Expoの設定ファイル。Expo Routerプラグインの設定などを包含。
├── package.json         # プロジェクトの依存関係管理。エントリーポイントが expo-router/entry に指定。
└── tsconfig.json        # TypeScriptの設定。esModuleInterop 等のフラグでReactの型解決を最適化。

```