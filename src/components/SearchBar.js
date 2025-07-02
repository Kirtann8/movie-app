import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      role="search"
      className="flex gap-2 max-w-md mx-auto"
    >
      <label htmlFor="movie-search" className="sr-only">
        Search for movies
      </label>
      <input
        id="movie-search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies..."
        aria-label="Search for movies"
        className="flex-1 px-4 py-2 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
      />
      <button 
        type="submit" 
        aria-label="Search"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
