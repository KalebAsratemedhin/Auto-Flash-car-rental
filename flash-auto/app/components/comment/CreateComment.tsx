'use client'
import { MdOutlineDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import StarRating from "../rating/Rating"
import { FaRegCommentDots } from "react-icons/fa6";
import CustomError from "../utils/CustomError";
import CustomLoading from "../utils/CustomLoading";
import { useGetCurrentUserQuery } from "@/redux/api/userAPI";
import { useCreateCommentMutation, useDeleteCommentMutation, useGetUserCommentQuery, useUpdateCommentMutation } from "@/redux/api/commentAPI";
import { useEffect, useState } from "react";
import CustomSuccess from "../utils/CustomSuccess";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/slices/authSlice";


const CreateComment = ({carId}: {carId: string}) => {
  const [content, setContent] = useState('')
  const authState = useSelector(authSelector)
  const {isSuccess: isCommentSuccess, isError: isCommentError, data: commentData, error: commentError} = useGetUserCommentQuery(carId)

  const [createComment, {isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError, error: createError}] = useCreateCommentMutation()
  const [editComment, {isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError, error: editError}] = useUpdateCommentMutation()
  const [deleteComment, {isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError}] = useDeleteCommentMutation()

  useEffect(() => {
    if(isCommentSuccess)
      setContent(commentData?.data?.content)


  }, [isCommentSuccess, commentData])

  const handleCreate = () => {
    createComment({content, carId})

  }

  const handleDelete = () => {
    deleteComment(commentData?.data._id!)

    
  }

  const handleEdit = () => {
    editComment({content, commentId: commentData?.data._id!})

    
  }
  
   
    
  return (
    <div className="flex flex-col gap-4">
        <h1>Leave your review and comment</h1>
        <div className="flex gap-2" >
            <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
                {authState.fullName?.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-grow">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="rounded-md border focus:outline-none focus:ring-1 focus:ring-gray-400 p-4 border-gray-300 w-full  bg-white" />
                <div className="flex justify-end gap-3 mt-4">
                    <FaRegCommentDots onClick={handleCreate} className="w-8 h-8 hover:text-gray-500 hover:cursor-pointer" />
                    <MdOutlineDeleteOutline onClick={handleDelete} className="w-8 h-8 hover:text-gray-500 hover:cursor-pointer" />
                    <MdOutlineModeEditOutline onClick={handleEdit} className="w-8 h-8 hover:text-gray-500 hover:cursor-pointer" />
                </div>

                {isCreateSuccess && <CustomSuccess message="Created Successfully" /> }
                {isEditSuccess && <CustomSuccess message="Edited Successfully" /> }
                {isCreateError && <CustomError error={createError} /> }
                {isEditError && <CustomError error={editError} /> }

                <StarRating carId={carId} />
            </div>
        </div>
    </div>
  )
}

export default CreateComment