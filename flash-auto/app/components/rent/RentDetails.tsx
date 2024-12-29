'use client';
import RentCarForm from '@/app/components/rent/RentForm'
import { RentForm } from '@/types/rent'
import CustomLoading from '../utils/CustomLoading'
import CustomError from '../utils/CustomError'
import { useUpdateRentalMutation } from '@/redux/api/rentalsApi'
import { Rent } from '@/types/rent'

const RentDetails = ({rent}: {rent: Rent}) => {
   
    const [updateRent, {isLoading, isError, isSuccess, error, data}] = useUpdateRentalMutation()
    const defaults = {
      startDate: rent.startDate,
      endDate: rent.endDate,
      insuranceOption: rent.insuranceOption,
      additionalDrivers: rent.additionalDrivers,
    }
    const onSubmit = async (data: RentForm) => {
      await updateRent({rentalData: data, id: rent._id})

    };

    if(isLoading)
      return <CustomLoading />
  
    if(isError)
      return <CustomError error={error} />
  
    if(isSuccess ){
      
  
    return <RentCarForm car={rent.car} defaults={defaults} onSubmit={onSubmit} mode="update" />
}}

export default RentDetails



