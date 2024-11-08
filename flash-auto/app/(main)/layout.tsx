'use client'
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, setSession } from "@/redux/slices/authSlice";


const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  const session = useSession()
  const dispatch = useDispatch()
  const token = useSelector(authSelector)

  useEffect(() => {


    if(session.status === "authenticated"){
      console.log(session.data.user,'token')
      dispatch(setSession(session.data.user.accessToken))
    }

  }, [session.status, dispatch, setSession, session.data])


  if (token.accessToken || session.status === "unauthenticated"){
    return (
      <div className="">
              
          <Header />
  
          <div className="bg-lavender dark:bg-black dark:text-white">
              {children}
  
          </div>
          <Footer />
      </div>
    )
  }


}

export default layout


