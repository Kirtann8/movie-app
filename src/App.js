import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import FavoriteIndicator from './components/FavoriteIndicator';

import './App.css';

const API_KEY = '7266b360f66abb8bd93a246e8a3302c0';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on app start
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

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    loadPopularMovies(nextPage);
  };

  const addToFavorites = movie => {
    if (favorites.some(fav => fav.id === movie.id)) return;
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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
        <h1>🎬 My Movie App</h1>
      </header>

      {showFavorites && (
  <div className="favorites-modal-overlay">
    <div className="favorites-modal-box">
      <button className="close-btn" onClick={() => setShowFavorites(false)}>X</button>
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
        <h2>Popular Movies</h2>

        {loading && page === 1 ? (
          <p>Loading initial movies...</p>
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

        {favorites.length > 0 && (
          <>
            <h2>My Favorites</h2>
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
          </>
        )}
      </main>
    </div>
  );
}

export default App;
