import React from 'react';

const CustomError = ({ message = 'Something went wrong!' }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default CustomError;
