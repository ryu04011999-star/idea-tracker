import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ideasRouter from './routes/ideas.js';
import { initializeDatabase } from './models/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(express.json());

// データベース初期化（非同期で実行し、サーバー起動をブロックしない）
initializeDatabase().catch(err => console.error('DB初期化エラー:', err));

// ルート
app.use('/api/ideas', ideasRouter);

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Idea Tracker API is running' });
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error('サーバーエラー:', err);
  res.status(500).json({ error: 'サーバーエラーが発生しました' });
});

// ローカル開発時のみサーバーを起動（Vercelではエクスポートされたappを使用）
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 サーバーがポート ${PORT} で起動しました`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
  });
}

export default app;
