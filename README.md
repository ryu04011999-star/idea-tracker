# アイデア記録アプリ

モダンでおしゃれなアイデア記録Webアプリケーションです。PC、スマートフォンの両方で使えるレスポンシブデザインで、データはPostgreSQLに永続化されます。

## 特徴

✨ **モダンなUI/UX**
- ダークモード、グラスモーフィズム、グラデーション効果
- スムーズなアニメーションとマイクロインタラクション
- レスポンシブデザイン（PC、タブレット、スマートフォン対応）

💾 **データ永続化**
- PostgreSQLデータベースでデータを保存
- ページをリロードしてもデータが保持されます

⚡ **高速パフォーマンス**
- Viteによる高速ビルド
- 最適化されたReactコンポーネント

## 技術スタック

- **フロントエンド**: React + Vite
- **バックエンド**: Node.js + Express
- **データベース**: PostgreSQL
- **デプロイ**: Vercel (フロントエンド) + Supabase (バックエンド + DB)

## プロジェクト構造

```
idea-tracker/
├── frontend/           # Reactフロントエンド
│   ├── src/
│   │   ├── components/ # Reactコンポーネント
│   │   ├── styles/     # CSS スタイル
│   │   ├── App.jsx     # メインアプリ
│   │   └── main.jsx    # エントリーポイント
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/            # Node.js + Expressバックエンド
│   ├── src/
│   │   ├── routes/     # APIルート
│   │   ├── models/     # データベースモデル
│   │   └── server.js   # サーバーエントリーポイント
│   ├── .env.example    # 環境変数テンプレート
│   └── package.json
└── README.md
```

## セットアップ手順

### 前提条件

- Node.js 18以上
- PostgreSQL 14以上（ローカル開発の場合）
- npm または yarn

### 1. リポジトリのクローン

```bash
cd C:\Users\nestribe\.gemini\antigravity\scratch\idea-tracker
```

### 2. バックエンドのセットアップ

```bash
cd backend
npm install
```

環境変数を設定します：
```bash
# .env.example を .env にコピー
copy .env.example .env
```

`.env`ファイルを編集して、データベース接続情報を設定：
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/idea_tracker
NODE_ENV=development
PORT=3001
```

### 3. フロントエンドのセットアップ

```bash
cd ../frontend
npm install
```

### 4. データベースのセットアップ

PostgreSQLでデータベースを作成：
```sql
CREATE DATABASE idea_tracker;
```

アプリケーション起動時に自動的にテーブルが作成されます。

## ローカルでの実行

### バックエンドの起動

```bash
cd backend
npm run dev
```

サーバーは `http://localhost:3001` で起動します。

### フロントエンドの起動

別のターミナルで：
```bash
cd frontend
npm run dev
```

アプリケーションは `http://localhost:5173` で起動します。

## デプロイ

### Supabaseでのデプロイ（推奨）

1. **Supabaseプロジェクトを作成**
   - https://supabase.com にアクセス
   - 新しいプロジェクトを作成
   - データベースURLをコピー

2. **環境変数を設定**
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres
   NODE_ENV=production
   ```

3. **Vercelでフロントエンドをデプロイ**
   - https://vercel.com にアクセス
   - GitHubリポジトリを連携
   - `frontend`ディレクトリを選択してデプロイ

4. **Vercelでバックエンドをデプロイ**
   - 新しいプロジェクトを作成
   - `backend`ディレクトリを選択
   - 環境変数を設定
   - デプロイ

5. **フロントエンドのAPI URLを更新**
   - `frontend/src/App.jsx`の`API_URL`をバックエンドのURLに変更

## 使い方

1. テキストフィールドにアイデアを入力
2. **+** ボタンをクリックして追加
3. チェックボックスをクリックして完了/未完了を切り替え
4. ✕ボタンをクリックしてアイデアを削除

## 機能

- ✅ アイデアの追加
- ✅ アイデアの完了/未完了の切り替え
- ✅ 完了したアイデアに打ち消し線を表示
- ✅ アイデアの削除
- ✅ データの永続化
- ✅ レスポンシブデザイン
- ✅ ダークモード

## ライセンス

MIT

## 作者

© 2026 アイデア記録アプリ
