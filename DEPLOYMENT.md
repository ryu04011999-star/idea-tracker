# アイデア記録アプリ - デプロイガイド

このガイドでは、Vercel（フロントエンド）とSupabase（バックエンド + DB）を使ってアプリをデプロイする手順を説明します。

## 前提条件

- GitHubアカウント
- Vercelアカウント（無料）
- Supabaseアカウント（無料）

## Step 1: GitHubリポジトリの準備

1. GitHubで新しいリポジトリを作成
2. ローカルのコードをプッシュ：

```bash
cd C:\Users\nestribe\.gemini\antigravity\scratch\idea-tracker
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Supabaseでデータベースをセットアップ

1. https://supabase.com にアクセスしてログイン
2. **New Project** をクリック
3. プロジェクト名、データベースパスワードを設定
4. リージョンを選択（日本の場合は "Northeast Asia (Tokyo)" を推奨）
5. **Create new project** をクリック

6. プロジェクトが作成されたら、以下のSQL文を実行してテーブルを作成：
   - 左サイドバーから **SQL Editor** を選択
   - 以下のSQLを実行：

```sql
CREATE TABLE ideas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

7. **Project Settings** > **Database** から接続文字列をコピー：
   - **Connection string** の **URI** タブを選択
   - `postgres://postgres:[YOUR-PASSWORD]@...` の形式の文字列をコピー

## Step 3: Vercelでバックエンドをデプロイ

1. https://vercel.com にアクセスしてログイン
2. **Add New** > **Project** をクリック
3. GitHubリポジトリをインポート
4. **Root Directory** を `backend` に設定
5. **Environment Variables** を追加：
   - `DATABASE_URL`: Supabaseの接続文字列
   - `NODE_ENV`: `production`
6. **Deploy** をクリック

7. デプロイが完了したら、URLをコピー（例：`https://your-backend.vercel.app`）

## Step 4: Vercelでフロントエンドをデプロイ

1. Vercelで **Add New** > **Project** をクリック
2. 同じGitHubリポジトリを選択
3. **Root Directory** を `frontend` に設定
4. **Framework Preset** は `Vite` を選択
5. **Build and Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Environment Variables** を追加：
   - `VITE_API_URL`: バックエンドのURL（例：`https://your-backend.vercel.app`）
7. **Deploy** をクリック

## Step 5: フロントエンドのAPI URLを更新

デプロイ後、フロントエンドがバックエンドに接続できるように設定を更新します：

1. `frontend/src/App.jsx` を編集：

```javascript
// ローカル開発用
// const API_URL = '/api/ideas';

// 本番環境用（デプロイ後）
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/ideas`
  : '/api/ideas';
```

2. 変更をコミットしてプッシュ：

```bash
git add .
git commit -m "Update API URL for production"
git push
```

Vercelが自動的に再デプロイします。

## Step 6: 動作確認

1. フロントエンドのURLにアクセス（例：`https://your-app.vercel.app`）
2. アイデアを追加してみる
3. ページをリロードしてデータが保持されているか確認
4. スマートフォンからもアクセスして動作確認

## トラブルシューティング

### データベース接続エラー

- Supabaseの接続文字列が正しいか確認
- パスワードに特殊文字が含まれている場合、URLエンコードが必要

### API接続エラー

- バックエンドのURLが正しく設定されているか確認
- ブラウザのコンソールでエラーを確認

### CORSエラー

- バックエンドの `server.js` で CORS 設定を確認
- 必要に応じて特定のオリジンのみ許可：

```javascript
app.use(cors({
  origin: 'https://your-app.vercel.app'
}));
```

## カスタムドメインの設定（オプション）

1. Vercelのプロジェクト設定から **Domains** を選択
2. カスタムドメインを追加
3. DNSレコードを設定

## 監視とログ

- Vercelダッシュボードでログとパフォーマンスを確認
- Supabaseダッシュボードでデータベースの使用状況を確認

## 更新方法

コードを更新する場合：

```bash
git add .
git commit -m "Update message"
git push
```

Vercelが自動的にビルドして再デプロイします。

---

デプロイが完了したら、URLを友人と共有してアプリを使ってもらいましょう！
