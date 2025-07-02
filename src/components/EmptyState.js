import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
