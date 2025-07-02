import React from 'react';

const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
