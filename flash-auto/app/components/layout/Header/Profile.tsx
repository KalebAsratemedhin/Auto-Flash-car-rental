import Link from 'next/link'

const Profile = () => {
  return (
    <div className="">
        <Link href='/dashboard/1' className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
            <img
            className="h-8 w-8 rounded-full border-2 border-indigo-600"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            />
            <span className="hidden md:inline-block font-medium">John Doe</span>
        </Link>
    </div>
  )
}

export default Profile