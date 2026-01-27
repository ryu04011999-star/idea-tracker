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

// データベース初期化
await initializeDatabase();

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

app.listen(PORT, () => {
  console.log(`🚀 サーバーがポート ${PORT} で起動しました`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
});

export default app;
