import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen  p-5">
        <h1 className="text-2xl font-bold mb-6">AutoFlash</h1>
        <ul>
        <li className="mb-4">
            <Link href={`/dashboard`} className="hover:text-gray-400">Dashboard</Link>
        </li>
        <li className="mb-4">
            <Link href={`/dashboard/cars`} className="hover:text-gray-400">Manage Cars</Link>
        </li>
        <li className="mb-4">
            <Link href={`/dashboard/bookings`} className="hover:text-gray-400">Manage Bookings</Link>
        </li>
        <li className="mb-4">
            <Link href={`/dashboard/users`} className="hover:text-gray-400">Manage Users</Link>
        </li>
        <li className="mb-4">
            <Link href={`/auth/signout`} className="hover:text-gray-400">Sign Out</Link>
        </li>
        </ul>
    </div>
  )
}

export default Sidebar