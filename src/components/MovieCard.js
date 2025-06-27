
import React from 'react';

function MovieCard({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) {
  const handleClick = () => {
    if (isFavorite) {
      onRemoveFavorite(movie.id);
    } else {
      onAddFavorite(movie);
    }
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}/10</p>
      <button
        className={isFavorite ? "remove-btn" : "add-btn"}
        onClick={handleClick}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default MovieCard;



