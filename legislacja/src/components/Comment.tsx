import React from 'react';
import { Comment as CommentType } from '../types';

type CommentProps = {
  comment: CommentType;
  onReply: (parentId: string) => void;
  onVote: (commentId: string, type: 'up' | 'down') => void;
};

export const Comment: React.FC<CommentProps> = ({ comment, onReply, onVote }) => {
  return (
    <article className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.author.name}</span>
        <span className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <button onClick={() => onVote(comment.id, 'up')}>
          👍 {comment.upvotes}
        </button>
        <button onClick={() => onVote(comment.id, 'down')}>
          👎 {comment.downvotes}
        </button>
        <button onClick={() => onReply(comment.id)}>Odpowiedz</button>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <ul className="comment-replies">
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment key={reply.id} comment={reply} onReply={onReply} onVote={onVote} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
