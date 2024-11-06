import { useGetCommentsByCarQuery } from "@/redux/api/commentAPI";
import CustomError from "../utils/CustomError";
import CustomLoading from "../utils/CustomLoading";
import { useGetCurrentUserQuery } from "@/redux/api/userAPI";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/slices/authSlice";

const CommentSection = ({ carId }: {carId: string}) => {
  const {isLoading, isError, isSuccess, data, error} = useGetCommentsByCarQuery(carId)
  const authState = useSelector(authSelector)

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess )
  
    return (
      <div className="mt-8 space-y-6">
        <h1 className="text-3xl ">Comments</h1>
        {data.data.map((comment) => (
          <div key={comment._id} className="border-b border-gray-200 py-4">
            <div className="flex items-start gap-2">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
                  {authState.fullName?.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-700">{comment.userId.fullName}</p>
                <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toDateString()}</p>
                <p className="text-gray-600 mt-2">{comment.content}</p> 
              </div>
            </div>
            
          </div>
        ))}
        {data.data.length == 0 && <p>No comments yet.</p> }
        
      </div>
    );
  };

  export default CommentSection;
  