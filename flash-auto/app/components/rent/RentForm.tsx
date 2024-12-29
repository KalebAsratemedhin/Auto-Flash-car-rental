'use client';

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";
import TextField from "../utils/TextField";
import { Car } from "@/types/car";
import Link from "next/link";
import { RentForm } from '@/types/rent';

interface RentCarFormProps {
  car: Car;
  defaults?: RentForm;
  onSubmit: (data: RentForm) => Promise<void>;
  mode: "create" | "update";
}

const RentCarForm = ({ car, defaults, onSubmit, mode }: RentCarFormProps) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<RentForm>({
    defaultValues: defaults,
  });

  const watchFields = watch(["startDate", "endDate", "insuranceOption", "additionalDrivers"]);

  const calculateTotalPrice = () => {
    const [startDate, endDate, insuranceOption, additionalDrivers] = watchFields;

    if (!startDate || !endDate) return;

    const days = differenceInDays(new Date(endDate), new Date(startDate));
    if (days < 0) {
      setError("endDate", { message: "End date must be after start date." });
      return;
    }

    let price = days * (car?.price || 0);

    switch (insuranceOption) {
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

    price += additionalDrivers * (days * 10);
    setTotalPrice(price);
  };

  useEffect(() => {
    calculateTotalPrice();  
  }, [watchFields]);


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {mode === "create" ? "Rent a Car" : "Update Rental"}
      </h2>
      <Link href={`/post/${car._id}`}>Go to car post</Link>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Rental Period</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              placeholder="Select start date"
              register={register}
              validation={{ required: "Start Date is required" }}
              error={errors.startDate?.message}
            />
            <TextField
              id="endDate"
              label="End Date"
              type="date"
              placeholder="Select end date"
              register={register}
              validation={{ required: "End Date is required" }}
              error={errors.endDate?.message}
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
                {...register("insuranceOption")}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <TextField
              id="additionalDrivers"
              label="Additional Drivers"
              type="number"
              placeholder="0"
              register={register}
              validation={{
                min: { value: 0, message: "Additional drivers cannot be negative" },
              }}
              error={errors.additionalDrivers?.message}
            />
          </div>
        </div>

        <div>
          <p className="text-xl font-bold text-gray-900">Total Price: ${totalPrice}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          {mode === "create" ? "Create Rental" : "Update Rental"}
        </button>
      </form>
    </div>
  );
};

export default RentCarForm;
