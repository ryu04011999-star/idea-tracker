import express from 'express';
import pool from '../models/db.js';

const router = express.Router();

// すべてのアイデアを取得
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM ideas ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('アイデア取得エラー:', error);
    res.status(500).json({ 
      error: 'アイデアの取得に失敗しました',
      details: error.message 
    });
  }
});

// 新しいアイデアを作成
router.post('/', async (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'タイトルは必須です' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO ideas (title) VALUES ($1) RETURNING *',
      [title.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('アイデア作成エラー:', error);
    res.status(500).json({ error: 'アイデアの作成に失敗しました' });
  }
});

// アイデアを更新（完了状態の切り替え）
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const result = await pool.query(
      'UPDATE ideas SET completed = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [completed, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'アイデアが見つかりません' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('アイデア更新エラー:', error);
    res.status(500).json({ error: 'アイデアの更新に失敗しました' });
  }
});

// アイデアを削除
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM ideas WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'アイデアが見つかりません' });
    }
    
    res.json({ message: 'アイデアを削除しました' });
  } catch (error) {
    console.error('アイデア削除エラー:', error);
    res.status(500).json({ error: 'アイデアの削除に失敗しました' });
  }
});

// すべてのアイデアを削除
router.delete('/', async (req, res) => {
  try {
    await pool.query('DELETE FROM ideas');
    res.json({ message: 'すべてのアイデアを削除しました' });
  } catch (error) {
    console.error('全削除エラー:', error);
    res.status(500).json({ error: '全削除に失敗しました' });
  }
});

export default router;
