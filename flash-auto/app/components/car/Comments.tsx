'use client'
import CommentSection from '../comment/CommentList';
import CreateComment from '../comment/CreateComment';

interface CommentsProps {
  carId: string;
}

const Comments = ({ carId }: CommentsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
        <div className="h-[400px] overflow-y-auto">
          <CommentSection carId={carId} />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a Comment</h2>
        <CreateComment carId={carId} />
      </div>
    </div>
  );
};

export default Comments;
