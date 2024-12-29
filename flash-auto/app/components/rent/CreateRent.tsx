'use client';
import RentCarForm from '@/app/components/rent/RentForm'
import { Car } from "@/types/car";
import { RentForm } from '@/types/rent'
import { useCreateRentalMutation } from '@/redux/api/rentalsApi';


const CreateRent = ({ car }: { car: Car }) => {
  const [createRent, { isLoading, isError, isSuccess, error, data}] = useCreateRentalMutation()

  const defaults = {
      startDate: "",
      endDate: "",
      insuranceOption: "basic",
      additionalDrivers: 0,
    }
  const onSubmit = async (data: RentForm) => {
    await createRent({rentalData: data, carId: car._id})

  };

  return <RentCarForm car={car} defaults={defaults} onSubmit={onSubmit} mode="create" />
};

export default CreateRent;
