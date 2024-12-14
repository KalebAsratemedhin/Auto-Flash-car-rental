'use client'
import { useState } from 'react';
import { FiThumbsUp, FiMessageCircle, FiMoreVertical, FiCornerDownRight } from 'react-icons/fi';

interface Reply {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  timestamp: string;
  isLiked?: boolean;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  timestamp: string;
  isLiked?: boolean;
  replies: Reply[];
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    content: 'Great car! The performance is amazing and the autopilot feature works flawlessly.',
    likes: 12,
    timestamp: '2 hours ago',
    replies: [
      {
        id: '1-1',
        user: {
          name: 'Alice Cooper',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
        },
        content: 'I agree! The autopilot is really impressive.',
        likes: 3,
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    content: 'I rented this car last week. The experience was fantastic! Very comfortable for long drives.',
    likes: 8,
    timestamp: '1 day ago',
    replies: []
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    content: 'The owner was very responsive and helpful. The car was in perfect condition.',
    likes: 5,
    timestamp: '3 days ago',
    replies: []
  }
];

interface CommentSectionProps {
  carId: string;
}

const CommentSection = ({ carId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleLike = (commentId: string, replyId?: string) => {
    setComments(comments.map(comment => {
      if (replyId) {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === replyId
                ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
                : reply
            )
          };
        }
      } else if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const handleReply = (commentId: string) => {
    if (replyContent.trim()) {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: `${commentId}-${comment.replies.length + 1}`,
                user: {
                  name: 'Current User',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser'
                },
                content: replyContent,
                likes: 0,
                timestamp: 'Just now'
              }
            ]
          };
        }
        return comment;
      }));
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const CommentActions = ({ commentId, replyId }: { commentId: string, replyId?: string }) => (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleLike(commentId, replyId)}
        className={`flex items-center space-x-1 ${
          comments.find(c => replyId 
            ? c.id === commentId && c.replies.find(r => r.id === replyId)?.isLiked
            : c.id === commentId && c.isLiked
          ) ? 'text-blue-600' : 'text-gray-500'
        } hover:text-blue-600`}
      >
        <FiThumbsUp size={18} />
        <span>
          {replyId 
            ? comments.find(c => c.id === commentId)?.replies.find(r => r.id === replyId)?.likes
            : comments.find(c => c.id === commentId)?.likes}
        </span>
      </button>
      {!replyId && (
        <button 
          onClick={() => setReplyingTo(commentId)}
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
        >
          <FiMessageCircle size={18} />
          <span>Reply</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{comment.user.name}</h3>
                  <p className="text-sm text-gray-500">{comment.timestamp}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FiMoreVertical size={20} />
              </button>
            </div>
            
            <p className="text-gray-700">{comment.content}</p>
            
            <CommentActions commentId={comment.id} />

            {replyingTo === comment.id && (
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyContent.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  Reply
                </button>
              </div>
            )}
          </div>

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="ml-8 space-y-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiCornerDownRight className="text-gray-400" />
                      <img
                        src={reply.user.avatar}
                        alt={reply.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{reply.user.name}</h3>
                        <p className="text-sm text-gray-500">{reply.timestamp}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{reply.content}</p>
                  
                  <CommentActions commentId={comment.id} replyId={reply.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
