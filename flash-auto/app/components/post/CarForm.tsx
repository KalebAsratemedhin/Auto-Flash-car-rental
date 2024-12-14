// 'use client';
// import { useForm } from 'react-hook-form';
// import TextField from '../utils/TextField';
// import { useCreatePostMutation } from '@/redux/api/postAPI'; 
// import CustomLoading from '../utils/CustomLoading';
// import CustomError from '../utils/CustomError';
// import CustomSuccess from '../utils/CustomSuccess';

// interface CarFormInputs {
//   make: string;
//   model: string;
//   age: number;
//   count: number;
//   price: number;
//   description: string;
//   photo: FileList;
// }

// const CarForm: React.FC = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<CarFormInputs>();

//   // const [createPost, { isLoading, isError, isSuccess, error }] = useCreatePostMutation(); // Hook to call createPost API

//   const onSubmit = async (data: CarFormInputs) => {
//     const formData = new FormData();
//     formData.append("make", data.make);
//     formData.append("model", data.model);
//     formData.append("age", data.age.toString());
//     formData.append("count", data.count.toString());
//     formData.append("price", data.price.toString());
//     formData.append("description", data.description);
//     formData.append("photo", data.photo[0]);


//     for (var [key, value] of formData.entries()) { 
//       console.log(key, value);
//     }
//     try {
//       // await createPost(formData).unwrap();
//     } catch (error) {
//       alert('An error occurred while posting the car.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Post a Car</h2>

//       <TextField
//         label="Make"
//         id="make"
//         type="text"
//         register={register}
//         validation={{ required: "Make is required" }}
//         error={errors.make?.message}
//       />
//       <TextField
//         label="Model"
//         id="model"
//         type="text"
//         register={register}
//         validation={{ required: "Model is required" }}
//         error={errors.model?.message}
//       />
//       <TextField
//         label="Age"
//         id="age"
//         type="number"
//         register={register}
//         validation={{ required: "Age is required", valueAsNumber: true }}
//         error={errors.age?.message}
//       />
//       <TextField
//         label="Count"
//         id="count"
//         type="number"
//         register={register}
//         validation={{ required: "Count is required", valueAsNumber: true }}
//         error={errors.count?.message}
//       />
//       <TextField
//         label="Price"
//         id="price"
//         type="number"
//         register={register}
//         validation={{ required: "Price is required", valueAsNumber: true }}
//         error={errors.price?.message}
//       />

//       <div className="w-full my-4">
//         <label className="text-gray-500" htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           className="w-full block border rounded-xl px-2 py-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300"
//           {...register("description", { required: "Description is required" })}
//         />
//         {errors.description && <p className="text-red-500 text-base mt-1">{errors.description.message}</p>}
//       </div>

//       <div className="w-full my-4">
//         <label className="text-gray-500" htmlFor="photo">Upload Photo</label>
//         <input
//           type="file"
//           id="photo"
//           className="w-full block"
//           {...register("photo", { required: "Photo is required" })}
//         />
//         {
//         errors.photo && <p className="text-red-500 text-base mt-1">{errors.photo.message}</p>
//         }
//       </div> 
//       {isLoading && <CustomLoading /> }
//       {isError && <CustomError error={error} /> }
//       {isSuccess && <CustomSuccess message={'Successfully posted your car.'} /> }
      

//       <button
//         type="submit"
//         className={`w-full bg-red-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={isLoading} // Disable button while loading
//       >
//         {isLoading ? 'Posting...' : 'Post Car'}
//       </button>
//     </form>
//   );
// };

// export default CarForm;
'use client'

import React, { useState } from 'react';

const PostCarForm = () => {
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: '',
    price: '',
    description: '',
    images: [],
    features: {
      airConditioning: false,
      navigation: false,
      bluetooth: false,
      parkingSensors: false,
      usbPort: false,
    }
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleInputChange = () => {
    // const { name, value } = e.target;
    // setCarData(prev => ({
    //   ...prev,
    //   [name]: value
    // }));
  };

  const handleFeatureToggle = () => {
  };

  const handleImageChange = () => {
  };

  const handleSubmit = () => {
  };

  return (
    <div
      className="max-w-4xl "
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Post a New Car</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={carData.brand}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={carData.model}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={carData.year}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={carData.price}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={carData.transmission}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={carData.fuelType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Seats
              </label>
              <input
                type="number"
                name="seats"
                value={carData.seats}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(carData.features).map(([feature, isChecked]) => (
              <label
                key={feature}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleFeatureToggle()}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Images</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-indigo-500">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="mt-2 text-sm text-gray-500">Click to upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative aspect-w-3 aspect-h-2">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleInputChange}
            
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe the car's condition, special features, and any other relevant information..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            // whileHover={{ scale: 1.02 }}
            // whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCarForm;
