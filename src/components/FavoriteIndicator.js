import React from 'react';
import { FaHeart } from 'react-icons/fa';

const FavoriteIndicator = ({ count, onClick }) => (
  <div
    className="fixed top-5 right-5 bg-red-500 hover:bg-red-600 rounded-full w-12 h-12 flex items-center justify-center z-50 cursor-pointer shadow-lg transition-colors"
    onClick={onClick}
    role="button"
    aria-label={`View favorites (${count} movies)`}
    tabIndex={0}
  >
    <FaHeart
      size={24}
      color="#fff"
    />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-white text-red-500 rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center">
        {count}
      </span>
    )}
  </div>
);

export default FavoriteIndicator;
