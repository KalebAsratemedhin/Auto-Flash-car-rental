import React from 'react'
import { FiThumbsUp, FiMessageCircle} from 'react-icons/fi';

const CommentActions = ({ commentId, replyId, comments }: { commentId: string, replyId?: string, comments: any }) => {
  return (
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
    
  )
}

export default CommentActions