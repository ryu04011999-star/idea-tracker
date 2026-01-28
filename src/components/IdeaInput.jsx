import React, { useState } from 'react';
import './IdeaInput.css';

const IdeaInput = ({ onAddIdea, onDeleteAll }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      
      if (!response.ok) {
        throw new Error('追加に失敗しました');
      }

      const newIdea = await response.json();
      onAddIdea(newIdea);
      setTitle('');
    } catch (error) {
      console.error('Failed to add idea:', error);
      setError('追加できませんでした。再接続を確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAllClick = () => {
    if (window.confirm('本当にすべてのアイデアを削除しますか？この操作は取り消せません。')) {
      onDeleteAll();
    }
  };

  return (
    <div className="input-container">
      <div className="input-header">
        <button 
          type="button" 
          className="delete-all-btn" 
          onClick={handleDeleteAllClick}
        >
          🗑️ 全て削除
        </button>
      </div>
      
      <form className="idea-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="新しいアイデアを入力..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !title.trim()}>
          {isLoading ? '...' : '＋ 追加'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default IdeaInput;
