import React, { useState } from 'react';

import FavoriteIndicator from './components/FavoriteIndicator';
import FavoritesModal from './components/FavoritesModal';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';

import { useFavorites } from './hooks/useFavorites';
import { useMovies } from './hooks/useMovies';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const {
    movies,
    searchResults,
    isSearching,
    loading,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange
  } = useMovies();

  return (
    <div className="App">
      <FavoriteIndicator
        count={favorites.length}
        onClick={() => setShowFavorites(true)}
      />

      <header className="sticky top-0 bg-white z-40 shadow-sm border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            🎬 My Movie App
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
      />

      <main className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isSearching ? 'Search Results' : 'Popular Movies'}
        </h2>
        <MovieList
          movies={movies}
          searchResults={searchResults}
          isSearching={isSearching}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
          isFavorite={isFavorite}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}

export default App;