"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { Post } from '@/types/car'
import { useCreateCarMutation } from '@/redux/api/carsApi';
import CustomError from '../utils/CustomError';

const PostCarForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>({
    defaultValues: {
      make: '',
      model: '',
      year: undefined,
      transmission: 'automatic',
      fuelType: 'petrol',
      seats: undefined,
      price: undefined,
      description: '',
      photo: null,
    },
  });
  const [postCar, {isLoading, isSuccess, isError, error}] = useCreateCarMutation()

  const onSubmit = async (data: Post) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('make', data.make);
    formData.append('model', data.model);
    formData.append('year', String(data.year));
    formData.append('transmission', data.transmission);
    formData.append('fuelType', data.fuelType);
    formData.append('seats', String(data.seats));
    formData.append('price', String(data.price));
    formData.append('description', data.description);

    // Append photo file if available
    if (data.photo && data.photo[0]) {
      formData.append('photo', data.photo[0]);
      data.photo = {data: formData}
    }

    for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
    await postCar(formData);  // Assuming the mutation accepts FormData
  };

  const previewImage = watch('photo');

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Post a New Car</h2>
      {isError && <CustomError error={error} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
              <input
                {...register('make', { required: 'Brand is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.make && <span className="text-red-500 text-sm">{errors.make.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                {...register('model', { required: 'Model is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.model && <span className="text-red-500 text-sm">{errors.model.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="number"
                {...register('year', {
                  required: 'Year is required',
                  valueAsNumber: true,
                  min: { value: 1900, message: 'Year must be at least 1900' },
                  max: { value: new Date().getFullYear(), message: 'Invalid year' },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Price ($)</label>
              <input
                type="number"
                {...register('price', {
                  required: 'Price is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Price must be positive' },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                {...register('transmission')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select
                {...register('fuelType')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats</label>
              <input
                type="number"
                {...register('seats', {
                  required: 'Seats are required',
                  valueAsNumber: true,
                  min: { value: 1, message: 'At least 1 seat required' },
                  max: { value: 10, message: 'Maximum 10 seats allowed' },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.seats && <span className="text-red-500 text-sm">{errors.seats.message}</span>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Images</h3>
          <div className="space-y-4">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-indigo-500">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span className="mt-2 text-sm text-gray-500">Click to upload images</span>
              <input
                type="file"
                accept="image/*"
                {...register('photo')}
                className="hidden"
              />
            </label>
            {previewImage && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="relative aspect-w-3 aspect-h-2">
                  <img
                    src={URL.createObjectURL(previewImage[0])}
                    alt="Preview"
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe the car's condition, special features, and any other relevant information..."
          ></textarea>
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        <div className="flex justify-end">
          <button
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
