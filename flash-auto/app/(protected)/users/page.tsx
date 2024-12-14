'use client'
import UserList from '@/app/components/users/UserList';
import AdminList from '@/app/components/users/AdminList';

const Page = () => {

    return (
        <div className='lg:flex lg:gap-2 lg:p-8'>

            <div className='w-1/2 p-6'>
                <AdminList />
            </div>
            <div className='p-6'>
                <UserList />
            </div>
        </div>
    )
}

export default Page