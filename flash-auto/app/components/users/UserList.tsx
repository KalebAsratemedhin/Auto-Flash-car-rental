import Link from 'next/link';
import React from 'react';
import CustomError from '../utils/CustomError';
import CustomLoading from '../utils/CustomLoading';
import UserTile from './UserTile';

const UserList = () => {
  const {isLoading, isSuccess, isError, error, data} = useGetUserList()

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />
  

  if(isSuccess)
    return (
        <div>
            <div className=''>
                <h2>Users</h2>
                <Link className='ml-auto' href='/users'>see all</Link>
            </div>

            <div>
                {
                    data.data.map((user) => {
                        return <UserTile user={user} />
                    })
                }
            </div>
        </div>
    )
}

export default UserList