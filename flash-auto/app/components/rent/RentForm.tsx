'use client';
import { useForm } from 'react-hook-form';
import TextField from '../utils/TextField';
import { useCreatePostMutation } from '@/redux/api/postAPI'; // Adjust the import path as necessary
import CustomLoading from '../utils/CustomLoading';
import { error } from 'console';
import CustomError from '../utils/CustomError';
import CustomSuccess from '../utils/CustomSuccess';
import { useCreateRentMutation } from '@/redux/api/rentAPI';
import { RentFormInput } from '@/types/Rent';



const RentForm = ({carId}: {carId: string}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RentFormInput>();

  const [createRent, { isLoading, isError, isSuccess, error }] = useCreateRentMutation(); 
  const onSubmit = async (data: RentFormInput) => {
    try {
      await createRent({rent: data, carId}).unwrap();
    } catch (error) {
      alert('An error occurred while posting the rental request.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Rent a Car</h2>


      <TextField
        label="Start Date"
        id="startDate"
        type="datetime-local"
        register={register}
        validation={{ required: "Start date is required"}}
        error={errors.startDate?.message}
      />

      <TextField
        label="End Date"
        id="endDate"
        type="datetime-local"
        register={register}
        validation={{ required: "Start date is required"}}
        error={errors.endDate?.message}
      />


      {isLoading && <CustomLoading />}
      {isError && <CustomError error={error} />}
      {isSuccess && <CustomSuccess message={'Successfully posted your rental request.'} />}

      <button
        type="submit"
        className={`w-full bg-red-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Posting...' : 'Rent Car'}
      </button>
    </form>
  );
};

export default RentForm;

