import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movieService';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    loadPopularMovies(1);
  }, []);

  const loadPopularMovies = async (page = 1) => {
    setLoading(true);
    try {
      const data = await movieService.getPopularMovies(page);
      setMovies(data.results);
      setCurrentPage(page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error loading movies:', error);
      setMovies([]);
    }
    setLoading(false);
  };

  const loadSearchResults = async (query, page = 1) => {
    setLoading(true);
    try {
      const data = await movieService.searchMovies(query, page);
      setSearchResults(data.results);
      setSearchCurrentPage(page);
      setSearchTotalPages(data.total_pages);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setCurrentQuery('');
      return;
    }
    
    setCurrentQuery(query);
    setIsSearching(true);
    await loadSearchResults(query, 1);
  }, []);

  const handlePageChange = (page) => {
    if (isSearching) {
      loadSearchResults(currentQuery, page);
    } else {
      loadPopularMovies(page);
    }
  };

  return {
    movies,
    searchResults,
    isSearching,
    loading,
    currentPage: isSearching ? searchCurrentPage : currentPage,
    totalPages: isSearching ? searchTotalPages : totalPages,
    handleSearch,
    handlePageChange
  };
};
