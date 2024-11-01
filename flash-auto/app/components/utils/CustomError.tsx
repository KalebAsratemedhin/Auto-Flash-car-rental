'use client'
import { CustomSerializedError } from '@/types/CustomSerializedError';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

const CustomError = ({ error, duration=100}: { error: SerializedError | FetchBaseQueryError | string | undefined, duration?: number}) => {
  const err = error as CustomSerializedError
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration]);

  return (
    <div className="flex items-center justify-center h-40 bg-red-100">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-red-500">{err.data.message || err.message || 'Something went wrong!'}</p>
      </div>
    </div>
  );
};

export default CustomError;
