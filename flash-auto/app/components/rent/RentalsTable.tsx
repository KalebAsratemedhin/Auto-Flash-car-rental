import React from 'react'

const RentalsTable = () => {
    const rent = [
        {status: 'active',
            _id: '124',
            rentedAt: '12-2-2024',
            car: {
                model: 'sv'
            }
        }
    ]

  return (
    <div>
        <h1 className='text-3xl font-bold  my-4'>Rent History</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr className="bg-slate-500 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Car Model</th>
                <th className="py-3 px-6 text-left">Rental Date</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
                {rent.map((rental) => (
                <tr key={rental._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{rental.car.model}</td>
                    <td className="py-3 px-6 text-left">{new Date(rental.rentedAt).toDateString()}</td>
                    <td className="py-3 px-6 text-left">Renter</td>
                    <td className="py-3 px-6 text-left">{rental.status}</td>
                    <td className="py-3 px-6 text-center">
                    {/* {rental.renter === username && rental.status === 'pending' && (
                        <button
                        onClick={() => handleApprove(rental._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                        Approve
                        </button>
                    )}
                    {rental.renter === username && rental.status === 'active' && (
                        <button
                        onClick={() => handleConfirmReturn(rental._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                        Confirm Return
                        </button>   59236
                    )} */}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default RentalsTable