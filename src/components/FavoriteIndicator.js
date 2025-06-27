import React from 'react';
import { FaHeart } from 'react-icons/fa';

const FavoriteIndicator = ({ count, onClick }) => (
  <div
    className="favorite-indicator"
    onClick={onClick}
  >
    <FaHeart
      size={28}
      color="#fff"
    />
    {count > 0 && <span className="favorite-count">{count}</span>}
  </div>
);

export default FavoriteIndicator;
