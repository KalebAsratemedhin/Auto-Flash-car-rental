import Link from 'next/link';
import React from 'react';
import CustomError from '../utils/CustomError';
import CustomLoading from '../utils/CustomLoading';
import UserTile from './UserTile';

const UserList = () => {
  const {isLoading, isSuccess, isError, error, data} = useGetAdminList()

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />
  

  if(isSuccess)
    return (
        <div>
            <div className=''>
                <h2>Admins</h2>
                <Link className='ml-auto' href='/admins'>see all</Link>
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