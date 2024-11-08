import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemeToggler from "../utils/ThemeToggler"

const Sidebar = () => {
    const path = usePathname()

    const paths = ['dashboard', 'settings', 'rents', 'users']
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
        
        {/* <li className="mb-4 border-l-red-400 border-l pl-4">
            <Link href={`/settings`} className="hover:text-gray-400">Settings</Link>
        </li>
        <li className="mb-4 border-l-red-400 border-l pl-4">
            <Link href={`/rents`} className="hover:text-gray-400">Rents</Link>
        </li>
        <li className="mb-4 border-l-red-400 border-l pl-4">
            <Link href={`/users`} className="hover:text-gray-400">Users</Link>
        </li> */}
        <ThemeToggler />
        </ul>
    </div>
  )
}

export default Sidebar