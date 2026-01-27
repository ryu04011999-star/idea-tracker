import React, { useState } from 'react';
import './IdeaInput.css';

const IdeaInput = ({ onAddIdea }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        const newIdea = await response.json();
        onAddIdea(newIdea);
        setTitle('');
      }
    } catch (error) {
      console.error('Failed to add idea:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="idea-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="新しいアイデアを入力..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !title.trim()}>
        {isLoading ? '追加中...' : '追加'}
      </button>
    </form>
  );
};

export default IdeaInput;
