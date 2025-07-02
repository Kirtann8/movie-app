// services/movieService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieService = {
  getPopularMovies: async (page = 1) => {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    return response.data;
  },

  searchMovies: async (query) => {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data;
  }
};
