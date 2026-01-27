import React from 'react';
import './IdeaList.css';

const IdeaList = ({ ideas, onToggleComplete, onDeleteIdea }) => {
  if (ideas.length === 0) {
    return <div className="no-ideas">まだ録されたアイデアはありません。</div>;
  }

  return (
    <div className="idea-list">
      {ideas.map((idea) => (
        <div key={idea.id} className={`idea-item ${idea.completed ? 'completed' : ''}`}>
          <div className="idea-content" onClick={() => onToggleComplete(idea.id, idea.completed)}>
            <div className={`checkbox ${idea.completed ? 'checked' : ''}`}>
              {idea.completed && <span>✓</span>}
            </div>
            <span className="idea-title">{idea.title}</span>
          </div>
          <button className="delete-btn" onClick={() => onDeleteIdea(idea.id)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
