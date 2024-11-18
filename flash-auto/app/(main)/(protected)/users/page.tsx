import UserTile from '@/app/components/users/UserTile'
import CustomLoading from '@/app/components/utils/CustomLoading'
import React from 'react'

const page = () => {
    const {isLoading, isSuccess, isError, error, data} = useGetUserList()

    if(isLoading)
      return <CustomLoading />
  
    if(isError)
      return <CustomError error={error} />
    
  
    if(isSuccess)
        return (
            <div>
                <h2>Users</h2>

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

export default page