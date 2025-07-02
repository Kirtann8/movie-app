import React from 'react';
import MovieCard from './MovieCard';
import LoadingIndicator from './LoadingIndicator';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

const MovieList = ({
  movies,
  searchResults,
  isSearching,
  loading,
  currentPage,
  totalPages,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
  onPageChange
}) => {
  const displayMovies = isSearching ? searchResults : movies;

  if (loading) {
    return <LoadingIndicator message="Loading movies..." />;
  }

  if (displayMovies.length === 0) {
    return (
      <EmptyState 
        message={isSearching ? "No movies found." : "No movies available."} 
      />
    );
  }

  return (
    <div>
      <div className="movies-grid">
        {displayMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            isFavorite={isFavorite(movie.id)}
          />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        loading={loading}
      />
    </div>
  );
};

export default MovieList;
