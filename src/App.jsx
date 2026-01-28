import React, { useState, useEffect } from 'react';
import IdeaInput from './components/IdeaInput';
import IdeaList from './components/IdeaList';

const App = () => {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/ideas');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'データ取得エラー');
      }
      
      if (Array.isArray(data)) {
        setIdeas(data);
      } else {
        throw new Error('データの形式が正しくありません');
      }
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleAddIdea = (newIdea) => {
    setIdeas([newIdea, ...ideas]);
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`/api/ideas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      if (response.ok) {
        setIdeas(ideas.map(idea => 
          idea.id === id ? { ...idea, completed: !completed } : idea
        ));
      }
    } catch (error) {
      console.error('Failed to update idea:', error);
    }
  };

  const handleDeleteIdea = async (id) => {
    try {
      const response = await fetch(`/api/ideas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIdeas(ideas.filter(idea => idea.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete idea:', error);
    }
  };

  // すべてのアイデアを削除
  const handleDeleteAll = async () => {
    try {
      const response = await fetch('/api/ideas', {
        method: 'DELETE',
      });
      if (response.ok) {
        setIdeas([]);
      }
    } catch (error) {
      console.error('Failed to delete all ideas:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>💡 アイデア記録アプリ</h1>
        <p className="subtitle">ひらめきを逃さず、カタチにする。</p>
      </header>

      <main>
        <IdeaInput onAddIdea={handleAddIdea} onDeleteAll={handleDeleteAll} />
        {error && (
          <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>
            <p><strong>エラーが発生しました:</strong></p>
            <p>{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="loader">読み込み中...</div>
        ) : (
          <IdeaList 
            ideas={ideas} 
            onToggleComplete={handleToggleComplete} 
            onDeleteIdea={handleDeleteIdea} 
          />
        )}
      </main>

      <footer>
        <p>&copy; 2026 Idea Tracker - Created by Antigravity</p>
      </footer>
    </div>
  );
};

export default App;
