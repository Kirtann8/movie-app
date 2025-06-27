export const getFavorites = () => {
  const data = localStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
