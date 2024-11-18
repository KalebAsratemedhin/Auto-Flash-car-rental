import React from 'react'
import CustomLoading from '../utils/CustomLoading'
import CustomError from '../utils/CustomError'
const AdminStats = ({id}: {id: string}) => {
  const {isLoading, isError, isSuccess, data, error} = useGetAdminSummaryQuery(id)
  

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />
  

  if(isSuccess){
    
    return (
        
        <div className='flex gap-4 flex-wrap'>
            
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Posted Cars</p>
                <p>{data.data?.rentCount}</p>

            </div>
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Income</p>
                <p>{data.data?.totalCost} ETB</p>

            </div>
        </div>
    )}
}

export default AdminStats;

