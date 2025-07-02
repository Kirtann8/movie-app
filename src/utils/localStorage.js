export const getFavorites = () => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error saving favorites:', error);
    return false;
  }
};

export const addToFavorites = (movie, currentFavorites) => {
  if (currentFavorites.some(fav => fav.id === movie.id)) {
    return currentFavorites;
  }
  const updatedFavorites = [...currentFavorites, movie];
  saveFavorites(updatedFavorites);
  return updatedFavorites;
};

export const removeFromFavorites = (movieId, currentFavorites) => {
  const updatedFavorites = currentFavorites.filter(movie => movie.id !== movieId);
  saveFavorites(updatedFavorites);
  return updatedFavorites;
};
