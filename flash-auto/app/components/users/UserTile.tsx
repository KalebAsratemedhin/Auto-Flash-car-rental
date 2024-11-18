import Link from 'next/link';
import React from 'react'

type UserProps = {
    fullName: string;
    email: string;
    profilePic?: string;
    _id: string;

}

const UserTile = ({user}: {user: UserProps}) => {
  return (
    <div className='flex gap-4'>
        <div className='rounded-full'>
            <img src={user.profilePic} alt="profile" />

        </div>
        <div>
            <p>{user.fullName}</p>
            <p>{user.email}</p>

            <Link className='mt-auto text-blue-500' href={`/dashboard/${user._id}`}>see more</Link>

        </div>



    </div>
  )
}

export default UserTile