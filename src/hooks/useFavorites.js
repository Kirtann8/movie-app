// hooks/useFavorites.js
import { useState, useEffect } from 'react';
import { getFavorites, addToFavorites, removeFromFavorites } from '../utils/localStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleAddFavorite = (movie) => {
    const updated = addToFavorites(movie, favorites);
    setFavorites(updated);
  };

  const handleRemoveFavorite = (movieId) => {
    const updated = removeFromFavorites(movieId, favorites);
    setFavorites(updated);
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  return {
    favorites,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemoveFavorite,
    isFavorite
  };
};
