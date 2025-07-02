import React from 'react';
import MovieCard from './MovieCard';

const FavoritesModal = ({ 
  isOpen, 
  onClose, 
  favorites, 
  onAddFavorite, 
  onRemoveFavorite 
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close favorites"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Favorite Movies</h3>
        {favorites.length === 0 ? (
          <p className="empty-state">No favorite movies yet!</p>
        ) : (
          <div className="space-y-4">
            {favorites.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddFavorite={onAddFavorite}
                onRemoveFavorite={onRemoveFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
