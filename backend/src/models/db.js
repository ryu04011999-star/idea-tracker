import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// 環境変数からデータベース接続情報を取得
// ローカル開発用とSupabase用の両方に対応
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// データベース接続テスト
pool.on('connect', () => {
  console.log('✅ データベースに接続しました');
});

pool.on('error', (err) => {
  console.error('❌ データベース接続エラー:', err);
});

// テーブル作成関数（初回起動時に実行）
export async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ideas (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ データベーステーブルを初期化しました');
  } catch (error) {
    console.error('❌ テーブル作成エラー:', error);
    throw error;
  }
}

export default pool;
