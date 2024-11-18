import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemeToggler from "../utils/ThemeToggler"
import { signOut } from "next-auth/react"

const Sidebar = () => {
    const path = usePathname()

    const paths = ['dashboard', 'settings', 'rents', 'users', 'discover', 'rent']
  return (
    <div className="w-64 h-screen bg-gray-800 text-white  p-5 ">
        
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-6">AutoFlash</h1>
            


        </div>
        <ul>
            {
                paths.map((curr, index) => {
                    return (
                        <li className={ `mb-4 ${path.split('/')[1] === curr && 'border-l-red-400  border-l-2'}  pl-4`}>
                            <Link href={`/${curr}`} className="hover:text-gray-400">{curr[0].toUpperCase() + curr.slice(1)}</Link>
                        </li>

                    )
                })
            }
        
        
        <ThemeToggler />
        </ul>
        <button onClick={() => signOut()} className="px-4 py-2 rounded-full  bg-white border dark:bg-none border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
            Signout
        </button>
    </div>
  )
}

export default Sidebar