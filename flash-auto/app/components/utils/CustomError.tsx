'use client'
import { ApiError } from '@/types/ApiResponse';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

const CustomError = ({ error, duration=1000000}: { error: FetchBaseQueryError | SerializedError, duration?: number}) => {
  const [visible, setVisible] = useState(true);
  const err = error as FetchBaseQueryError
  const apiError = err.data as ApiError


  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration]);

  if (visible){

  return (
    <div className="flex items-center justify-center h-20 rounded-md bg-red-100 fixed left-3 bottom-5 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-red-500">{ apiError?.errors && apiError.errors[0] || apiError?.message || 'Something went wrong!'}</p>
      </div>
    </div>
  );
}
};

export default CustomError;
