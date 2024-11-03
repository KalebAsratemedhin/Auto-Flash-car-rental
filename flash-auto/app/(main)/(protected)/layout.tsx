'use client'
import Sidebar from "@/app/components/layout/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  const router = useRouter()
  const session = useSession()

  if(session.status === "unauthenticated"){
    router.push('/')
  } else{
    return (
        <div className="flex">
            <div className="w-64 sticky top-0 h-full overflow-y-auto shadow-md">
                <Sidebar />
            </div>
            <div className="flex-grow overflow-y-auto">
                {children}
            </div>
        </div>
        
      )
  }

  
}

export default layout