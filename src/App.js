import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import MovieCard from './components/MovieCard';
import FavoriteIndicator from './components/FavoriteIndicator';
import SearchBar from './components/SearchBar';

import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;


function App() {
  const [movies, setMovies] = useState([]); // List of popular movies
  const [favorites, setFavorites] = useState([]); // List of favorite movies
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page for pagination
  const [hasMore, setHasMore] = useState(true); // For infinite scroll
  const [showFavorites, setShowFavorites] = useState(false); // Show favorites modal
  const [searchResults, setSearchResults] = useState([]); // Movies from search
  const [isSearching, setIsSearching] = useState(false); // Search mode

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    loadPopularMovies(1);
  }, []);

  const loadPopularMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNum}`
      );
      if (pageNum === 1) {
        setMovies(response.data.results);
      } else {
        setMovies(prev => [...prev, ...response.data.results]);
      }
      setHasMore(pageNum < response.data.total_pages);
      setPage(pageNum);
    } catch (error) {
      console.log('Error:', error);
      setHasMore(false);
    }
    setLoading(false);
  };

  //infinite scroll
  const loadMoreMovies = () => {
    const nextPage = page + 1;
    loadPopularMovies(nextPage);
  };

  // Search
  const handleSearch = async query => {
    if (!query) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      setSearchResults([]);
    }
    setLoading(false);
  };

  // add to favorites
  const addToFavorites = movie => {
    if (favorites.some(fav => fav.id === movie.id)) return;
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Remove from favorites
  const removeFromFavorites = movieId => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="App">
      <FavoriteIndicator
        count={favorites.length}
        onClick={() => setShowFavorites(true)}
      />

      <header>
        <h1>My Movie App</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {showFavorites && (
        <div className="favorites-modal-overlay">
          <div className="favorites-modal-box">
            <button
              className="close-btn"
              onClick={() => setShowFavorites(false)}
            >
              X
            </button>
            <h3>Favorite Movies</h3>
            {favorites.length === 0 ? (
              <p>No favorite movies yet!</p>
            ) : (
              <div className="movies-grid">
                {favorites.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAddFavorite={addToFavorites}
                    onRemoveFavorite={removeFromFavorites}
                    isFavorite={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <main>
        <h2>{isSearching ? 'Search Results' : 'Popular Movies'}</h2>

        {loading && page === 1 ? (
          <p>Loading initial movies...</p>
        ) : isSearching ? (
          <div className="movies-grid">
            {searchResults.length === 0 && !loading ? (
              <p>No movies found.</p>
            ) : (
              searchResults.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddFavorite={addToFavorites}
                  onRemoveFavorite={removeFromFavorites}
                  isFavorite={favorites.some(fav => fav.id === movie.id)}
                />
              ))
            )}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMoreMovies}
            hasMore={hasMore}
            loader={<h4>Loading more movies...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>You've seen all popular movies!</b>
              </p>
            }
          >
            <div className="movies-grid">
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddFavorite={addToFavorites}
                  onRemoveFavorite={removeFromFavorites}
                  isFavorite={favorites.some(fav => fav.id === movie.id)}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </main>
    </div>
  );
}

export default App;
