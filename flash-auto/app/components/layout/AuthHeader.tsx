'use client'

import { useGetCurrentUserQuery } from "@/redux/api/userAPI";
import Link from "next/link";
import CustomLoading from "../utils/CustomLoading";
import CustomError from "../utils/CustomError";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFullName } from "@/redux/slices/authSlice";
import {IoIosNotifications} from "react-icons/io";


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
            <div className='flex items-center gap-4'>
              
              <IoIosNotifications className="w-8 h-8" />
              <Link className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center" href={`/dashboard/${data.data._id}`}>{data.data.fullName?.slice(0, 2).toUpperCase()}</Link>
            </div>
          }
      </div>
    )
  }
}


export default AuthHeader