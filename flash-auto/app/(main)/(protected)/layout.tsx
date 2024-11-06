'use client'
import Sidebar from "@/app/components/layout/Sidebar";
import { closeSidebar, sidebarSelector } from "@/redux/slices/sideBarSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  const router = useRouter()
  const session = useSession()
  const sidebarState = useSelector(sidebarSelector)
  const dispatch = useDispatch()

  if(session.status === "unauthenticated"){
    router.push('/')
  } else{
    return (
        <div className="flex">
            
            <div className="relative ">
              {
              sidebarState.isOpen && 
              <div className="w-64 fixed top-0  h-full  shadow-md">
                  <Sidebar />
              </div>
            }
            </div>
            <div className="flex-grow overflow-y-auto" onClick={() => dispatch(closeSidebar()) }>
                {children}
            </div>
        </div>
        
      )
  }

  
}

export default layout