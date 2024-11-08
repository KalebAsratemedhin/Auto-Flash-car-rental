'use client'

import { useGetCurrentUserQuery } from "@/redux/api/userAPI";
import Link from "next/link";
import CustomLoading from "../utils/CustomLoading";
import CustomError from "../utils/CustomError";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFullName } from "@/redux/slices/authSlice";


const AuthHeader = () => {
  const {isLoading, isError, isSuccess, data, error} = useGetCurrentUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if(isSuccess){
      dispatch(setFullName(data.data.fullName))
    }

  }, [isSuccess, dispatch, data, setFullName])

  
  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess && data){
    return (
      <div >        
          {
            data &&
            <div className='flex gap-4'>
              <button onClick={() => signOut()} className="px-4 py-2 rounded-full  bg-white border dark:bg-none border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                Signout
              </button>
              <Link className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center" href={`/dashboard/${data.data._id}`}>{data.data.fullName?.slice(0, 2).toUpperCase()}</Link>
            </div>
          }
      </div>
    )
  }
}


export default AuthHeader