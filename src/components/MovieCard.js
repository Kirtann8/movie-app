import React from 'react';

function MovieCard({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) {
  const handleClick = () => {
    if (isFavorite) {
      onRemoveFavorite(movie.id);
    } else {
      onAddFavorite(movie);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center min-w-[220px] max-w-[250px] min-h-[420px] mx-auto transition-transform hover:scale-105 hover:shadow-xl"
      aria-label={`Movie: ${movie.title}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={`${movie.title} poster`}
        loading="lazy"
        className="w-full h-80 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 line-clamp-2 min-h-[3.5rem]">
        {movie.title}
      </h3>
      <p className="mb-3 text-gray-600 text-base font-medium" 
         aria-label={`Rating: ${movie.vote_average} out of 10`}>
        ⭐ {movie.vote_average}/10
      </p>
      <button
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors mt-auto focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isFavorite 
            ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500" 
            : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
        }`}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        aria-label={
          isFavorite 
            ? `Remove ${movie.title} from favorites` 
            : `Add ${movie.title} to favorites`
        }
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </article>
  );
}

export default MovieCard;
