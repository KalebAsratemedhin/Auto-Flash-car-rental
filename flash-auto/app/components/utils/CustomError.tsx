'use client'
import { CustomSerializedError } from '@/types/CustomSerializedError';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

const CustomError = ({ error, duration=1000000}: { error: SerializedError | FetchBaseQueryError | string | undefined, duration?: number}) => {
  const err = error as CustomSerializedError
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration]);

  if (visible){

  return (
    <div className="flex items-center justify-center h-20 rounded-md bg-red-100 fixed left-3 bottom-5">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-red-500">{err.data?.message || err?.message || 'Something went wrong!'}</p>
      </div>
    </div>
  );
}
};

export default CustomError;
