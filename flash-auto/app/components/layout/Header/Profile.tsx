import Link from 'next/link'
import {User} from '@/types/user';
const Profile = ({user}: {user: User}) => {
  const initials = user.firstName[0] + user.lastName[0];
  return (
    <div className="">
        <Link href={`/dashboard/${user._id}`} className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
            {
              user.profilePic ? 
              <img
                className="h-8 w-8 rounded-full border-2 border-indigo-600"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                />
                :
                <div className='bg-gray-200 text-gray-600 w-12 h-12 rounded-full flex items-center justify-center'>
                  {initials}
                </div>
            }

            <span className="hidden md:inline-block font-medium">{user.firstName + ' ' + user.lastName}</span>
        </Link>
    </div>
  )
}

export default Profile