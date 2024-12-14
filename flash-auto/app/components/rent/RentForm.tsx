// 'use client';
// import { useForm } from 'react-hook-form';
// import TextField from '../utils/TextField';
// import { useCreatePostMutation } from '@/redux/api/postAPI'; // Adjust the import path as necessary
// import CustomLoading from '../utils/CustomLoading';
// import { error } from 'console';
// import CustomError from '../utils/CustomError';
// import CustomSuccess from '../utils/CustomSuccess';
// import { useCreateRentMutation } from '@/redux/api/rentAPI';
// import { RentFormInput } from '@/types/Rent';



// const RentForm = ({carId}: {carId: string}) => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<RentFormInput>();

//   const [createRent, { isLoading, isError, isSuccess, error }] = useCreateRentMutation(); 
//   const onSubmit = async (data: RentFormInput) => {
//     try {
//       await createRent({rent: data, carId}).unwrap();
//     } catch (error) {
//       alert('An error occurred while posting the rental request.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Rent a Car</h2>


//       <TextField
//         label="Start Date"
//         id="startDate"
//         type="datetime-local"
//         register={register}
//         validation={{ required: "Start date is required"}}
//         error={errors.startDate?.message}
//       />

//       <TextField
//         label="End Date"
//         id="endDate"
//         type="datetime-local"
//         register={register}
//         validation={{ required: "Start date is required"}}
//         error={errors.endDate?.message}
//       />


//       {isLoading && <CustomLoading />}
//       {isError && <CustomError error={error} />}
//       {isSuccess && <CustomSuccess message={'Successfully posted your rental request.'} />}

//       <button
//         type="submit"
//         className={`w-full bg-red-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={isLoading} // Disable button while loading
//       >
//         {isLoading ? 'Posting...' : 'Rent Car'}
//       </button>
//     </form>
//   );
// };

// export default RentForm;
'use client'


// import React, { useState } from 'react';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { differenceInDays } from 'date-fns';

// const RentCarForm = ({ car }) => {
//   const [rentalData, setRentalData] = useState({
//     startDate: null,
//     endDate: null,
//     pickupLocation: '',
//     dropoffLocation: '',
//     insuranceOption: 'basic',
//     additionalDrivers: 0,
//     specialRequests: '',
//   });

//   const [totalPrice, setTotalPrice] = useState(0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRentalData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleDateChange = (name, date) => {
//     setRentalData(prev => ({
//       ...prev,
//       [name]: date
//     }));

//     // Calculate total price when dates change
//     if (name === 'endDate' && rentalData.startDate) {
//       calculateTotalPrice(rentalData.startDate, date);
//     } else if (name === 'startDate' && rentalData.endDate) {
//       calculateTotalPrice(date, rentalData.endDate);
//     }
//   };

//   const calculateTotalPrice = (start, end) => {
//     if (!start || !end) return;

//     const days = differenceInDays(end, start);
//     let price = days * (car?.dailyPrice || 0);

//     // Add insurance cost
//     switch (rentalData.insuranceOption) {
//       case 'premium':
//         price += days * 30;
//         break;
//       case 'standard':
//         price += days * 20;
//         break;
//       case 'basic':
//         price += days * 10;
//         break;
//       default:
//         break;
//     }

//     // Add additional drivers cost
//     price += rentalData.additionalDrivers * (days * 10);

//     setTotalPrice(price);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Implement API call to save rental data
//     console.log('Submitting rental data:', rentalData);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div
//         // initial={{ opacity: 0, y: 20 }}
//         // animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto p-6"
//       >
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">Rent a Car</h2>

//         {car && (
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
//             <div className="flex items-center space-x-6">
//               <img
//                 src={car.image}
//                 alt={car.name}
//                 className="w-32 h-32 object-cover rounded-lg"
//               />
//               <div>
//                 <h3 className="text-2xl font-semibold text-gray-900">{car.name}</h3>
//                 <p className="text-gray-600">{car.description}</p>
//                 <p className="text-lg font-semibold text-indigo-600 mt-2">${car.dailyPrice}/day</p>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Dates Selection */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Rental Period</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <DatePicker
//                   value={rentalData.startDate}
//                   onChange={(date) => handleDateChange('startDate', date)}
//                   minDate={new Date()}
//                   className="w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <DatePicker
//                   value={rentalData.endDate}
//                   onChange={(date) => handleDateChange('endDate', date)}
//                   minDate={rentalData.startDate || new Date()}
//                   className="w-full"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Location Details */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Location Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pickup Location
//                 </label>
//                 <input
//                   type="text"
//                   name="pickupLocation"
//                   value={rentalData.pickupLocation}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Drop-off Location
//                 </label>
//                 <input
//                   type="text"
//                   name="dropoffLocation"
//                   value={rentalData.dropoffLocation}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Additional Options */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Options</h3>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Insurance Option
//                 </label>
//                 <select
//                   name="insuranceOption"
//                   value={rentalData.insuranceOption}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="basic">Basic Coverage ($10/day)</option>
//                   <option value="standard">Standard Coverage ($20/day)</option>
//                   <option value="premium">Premium Coverage ($30/day)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Additional Drivers ($10/day per driver)
//                 </label>
//                 <input
//                   type="number"
//                   name="additionalDrivers"
//                   value={rentalData.additionalDrivers}
//                   onChange={handleInputChange}
//                   min="0"
//                   max="3"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Special Requests
//                 </label>
//                 <textarea
//                   name="specialRequests"
//                   value={rentalData.specialRequests}
//                   onChange={handleInputChange}
                
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Any special requests or requirements..."
//                 ></textarea>
//               </div>
//             </div>
//           </div>

//           {/* Price Summary */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Price Summary</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between text-gray-600">
//                 <span>Base Rate</span>
//                 <span>${car?.dailyPrice || 0}/day</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Insurance</span>
//                 <span>
//                   ${rentalData.insuranceOption === 'premium' ? '30' : 
//                      rentalData.insuranceOption === 'standard' ? '20' : '10'}/day
//                 </span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Additional Drivers</span>
//                 <span>${rentalData.additionalDrivers * 10}/day</span>
//               </div>
//               <div className="border-t border-gray-200 mt-4 pt-4">
//                 <div className="flex justify-between text-lg font-semibold">
//                   <span>Total</span>
//                   <span>${totalPrice}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               // whileHover={{ scale: 1.02 }}
//               // whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Confirm Rental
//             </button>
//           </div>
//         </form>
//       </div>
//     </LocalizationProvider>
//   );
// };

// export default RentCarForm;



import React, { useState } from "react";
import { differenceInDays } from "date-fns";
import InputField from "../common/Forms/InputField";
import ErrorAlert from "../common/Forms/ErrorAlert";

const RentCarForm = ({ car }) => {
  const [rentalData, setRentalData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    insuranceOption: "basic",
    additionalDrivers: 0,
    specialRequests: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "endDate" || name === "startDate") {
      calculateTotalPrice(
        name === "startDate" ? value : rentalData.startDate,
        name === "endDate" ? value : rentalData.endDate
      );
    }
  };

  const calculateTotalPrice = (start, end) => {
    if (!start || !end) return;

    const days = differenceInDays(new Date(end), new Date(start));
    let price = days * (car?.dailyPrice || 0);

    switch (rentalData.insuranceOption) {
      case "premium":
        price += days * 30;
        break;
      case "standard":
        price += days * 20;
        break;
      case "basic":
        price += days * 10;
        break;
      default:
        break;
    }

    price += rentalData.additionalDrivers * (days * 10);
    setTotalPrice(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rentalData.startDate || !rentalData.endDate) {
      setFormError("Start Date and End Date are required.");
      return;
    }
    setFormError("");
    console.log("Submitting rental data:", rentalData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Rent a Car</h2>

      <ErrorAlert message={formError} />

      {car && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={car.image}
              alt={car.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">{car.name}</h3>
              <p className="text-gray-600">{car.description}</p>
              <p className="text-lg font-semibold text-indigo-600 mt-2">
                ${car.dailyPrice}/day
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Rental Period</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="startDate"
              label="Start Date"
              type="date"
              value={rentalData.startDate}
              onChange={handleInputChange}
              required
            />
            <InputField
              id="endDate"
              label="End Date"
              type="date"
              value={rentalData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Location Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="pickupLocation"
              label="Pickup Location"
              type="text"
              placeholder="Enter pickup location"
              value={rentalData.pickupLocation}
              onChange={handleInputChange}
              required
            />
            <InputField
              id="dropoffLocation"
              label="Drop-off Location"
              type="text"
              placeholder="Enter drop-off location"
              value={rentalData.dropoffLocation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Insurance & Additional Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Option
              </label>
              <select
                name="insuranceOption"
                value={rentalData.insuranceOption}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <InputField
              id="additionalDrivers"
              label="Additional Drivers"
              type="number"
              min="0"
              value={rentalData.additionalDrivers}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <p className="text-xl font-bold text-gray-900">
            Total Price: ${totalPrice}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RentCarForm;
