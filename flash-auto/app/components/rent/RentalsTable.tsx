import { useCancelRentMutation, useEvaluateRentMutation } from "@/redux/api/rentAPI"
import { RentPopulated } from "@/types/Rent"
import { useSession } from "next-auth/react"
import CustomSuccess from "../utils/CustomSuccess"
import CustomError from "../utils/CustomError"

const RentalsTable = ({rents}: {rents: RentPopulated[]}) => {
    const auth = useSession()
    const [evaluateRent, { isError, isSuccess, error}] = useEvaluateRentMutation()
    const [cancelRent, {isError: isCancelError, isSuccess: isCancelSuccess, error: cancelError}] = useCancelRentMutation()


    const handleApprove = async (id: string) => {
        await evaluateRent({update: {status: 'active'}, rentId: id})
    }

    const handleCancel = async (id: string) => {
        await cancelRent(id)
    }

    const handleReturn = async (id: string) => {
        await evaluateRent({update: {status: 'returned'}, rentId: id})
    }

    
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
            <tr className="bg-slate-500 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Car Model</th>
            <th className="py-3 px-6 text-left">Rental Date</th>
            <th className="py-3 px-6 text-left">Return Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Total Cost</th>
            <th className="py-3 px-6 text-center">Actions</th>
            </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
            {rents?.map((rental) => (
            <tr key={rental._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{rental.car.model}</td>
                <td className="py-3 px-6 text-left">{new Date(rental.startDate).toDateString()}</td>
                <td className="py-3 px-6 text-left">{new Date(rental.endDate).toDateString()}</td>
                <td className="py-3 px-6 text-left">{rental.status}</td>
                <td className="py-3 px-6 text-left">{rental.totalCost} ETB</td>
                <td className="py-3 px-6 text-center">
                {rental.rentee === auth?.data?.user.id && rental.status === 'pending' && (
                    <button
                    onClick={() => handleCancel(rental._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                    Cancel
                    </button>
                )}
                {rental.renter === auth?.data?.user.id && rental.status === 'pending' && (
                    <button
                    onClick={() => handleApprove(rental._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                    Approve
                    </button>
                )}
                {rental.renter === auth?.data?.user.id && rental.status === 'active' && (
                    <button
                    onClick={() => handleReturn(rental._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                    Returned
                    </button>  
                )}
                </td>
            </tr>
            ))}
        </tbody>
        {isCancelSuccess && <CustomSuccess message='Successfully cacelled' /> }
        {isCancelError && <CustomError error={cancelError} /> }
        {isSuccess && <CustomSuccess message='Successfully evaluated.' /> }
        {isError && <CustomError error={error} /> }

    </table>
  )
}

export default RentalsTable