import React, { useState } from 'react';
import { Comment as CommentType, User } from '../types';
import { Comment } from './Comment';
import { mockComments } from '../mockDiscussions';

type DiscussionSectionProps = {
  actProposalId: string; // To associate discussions with a specific act proposal
};

// Helper function to find a comment and update it (e.g., add reply, update vote)
const updateCommentTree = (
  comments: CommentType[],
  commentId: string,
  updateFn: (comment: CommentType) => CommentType
): CommentType[] => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      return updateFn(comment);
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentTree(comment.replies, commentId, updateFn),
      };
    }
    return comment;
  });
};

export const DiscussionSection: React.FC<DiscussionSectionProps> = ({ actProposalId }) => {
  const [comments, setComments] = useState<CommentType[]>(mockComments); // Using mock data for now
  const [newCommentContent, setNewCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Mock current user
  const currentUser: User = { id: 'currentUser', name: 'You' };

  const handleAddComment = (parentId: string | null = null) => {
    if (!newCommentContent.trim()) return;

    const newComment: CommentType = {
      id: Date.now().toString(), // Simple unique ID
      author: currentUser,
      timestamp: new Date().toISOString(),
      content: newCommentContent,
      upvotes: 0,
      downvotes: 0,
    };

    if (parentId) {
      setComments((prevComments) =>
        updateCommentTree(prevComments, parentId, (comment) => ({
          ...comment,
          replies: [...(comment.replies || []), newComment],
        }))
      );
    } else {
      setComments((prevComments) => [...prevComments, newComment]);
    }

    setNewCommentContent('');
    setReplyingTo(null);
  };

  const handleVote = (commentId: string, type: 'up' | 'down') => {
    setComments((prevComments) =>
      updateCommentTree(prevComments, commentId, (comment) => ({
        ...comment,
        upvotes: type === 'up' ? comment.upvotes + 1 : comment.upvotes,
        downvotes: type === 'down' ? comment.downvotes + 1 : comment.downvotes,
      }))
    );
  };

  return (
    <section className="discussion-section-container" aria-labelledby="discussion-heading">
      <h3 id="discussion-heading">Dyskusja Publiczna</h3>
      <div className="comment-input-area">
        <textarea
          placeholder={replyingTo ? 'Odpowiedz na komentarz...' : 'Napisz nowy komentarz...'}
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
        ></textarea>
        <div>
        <button onClick={() => handleAddComment(replyingTo)}>
          {replyingTo ? 'Dodaj odpowiedź' : 'Dodaj komentarz'}
        </button>
        {replyingTo && (
          <button className="cancel-reply-button" onClick={() => setReplyingTo(null)}>Anuluj odpowiedź</button>
        )}
        </div>
      </div>
      <ul className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={setReplyingTo} onVote={handleVote} />
        ))}
      </ul>
    </section>
  );
};
