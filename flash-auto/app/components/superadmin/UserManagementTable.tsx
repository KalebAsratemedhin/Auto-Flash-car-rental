import {User} from '@/types/user';

const UserManagementTable = ({users}: {users: User[]}) => {

    const handleMakeAdmin = (userId: string) => {

      };
    
    const handleToggleStatus = (userId: string) => {

    };

      
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="text-left border-b border-gray-200">
                    <th className="pb-3 font-semibold text-gray-600">Name</th>
                    <th className="pb-3 font-semibold text-gray-600">Email</th>
                    <th className="pb-3 font-semibold text-gray-600">Role</th>
                    <th className="pb-3 font-semibold text-gray-600">Status</th>
                    <th className="pb-3 font-semibold text-gray-600">Join Date</th>
                    <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-100">
                    <td className="py-4">{user.name}</td>
                    <td className="py-4">{user.email}</td>
                    <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                        {user.role}
                        </span>
                    </td>
                    <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {user.status}
                        </span>
                    </td>
                    <td className="py-4">{user.joinDate}</td>
                    <td className="py-4 space-x-2">
                        {user.role !== 'Admin' && (
                        <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Make Admin
                        </button>
                        )}
                        <button
                        onClick={() => handleToggleStatus(user._id)}
                        className={`px-3 py-1.5 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            user.status === 'Active'
                            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                        }`}
                        >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default UserManagementTable