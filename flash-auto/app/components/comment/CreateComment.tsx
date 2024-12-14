'use client'
import { useState } from 'react';
import { FiSend, FiImage } from 'react-icons/fi';

interface CreateCommentProps {
  carId: string;
}

const CreateComment = ({ carId }: CreateCommentProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Here you would typically send the comment to your backend
      console.log('New comment:', { carId, content: comment });
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full min-h-[120px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <FiImage size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!comment.trim()}
          className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium ${
            comment.trim()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <FiSend size={18} />
          <span>Send</span>
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
