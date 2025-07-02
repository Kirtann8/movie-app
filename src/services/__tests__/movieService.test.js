import axios from 'axios';
import { movieService } from '../movieService';

jest.mock('axios');

describe('movieService', () => {
  const mockMovieData = {
    page: 1,
    results: [
      { id: 1, title: 'Test Movie' }
    ],
    total_pages: 1,
    total_results: 1
  };

  beforeEach(() => {
    process.env.REACT_APP_API_KEY = 'test-api-key';
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.REACT_APP_API_KEY;
  });

  describe('getPopularMovies', () => {
    it('fetches popular movies with correct URL', async () => {
      axios.get.mockResolvedValue({ data: mockMovieData });
      
      const result = await movieService.getPopularMovies();
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/movie\/popular\?api_key=.*&page=1/)
      );
      expect(result).toEqual(mockMovieData);
    });

    it('includes page parameter in URL', async () => {
      axios.get.mockResolvedValue({ data: mockMovieData });
      
      await movieService.getPopularMovies(2);
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/movie\/popular\?api_key=.*&page=2/)
      );
    });

    it('throws error when API call fails', async () => {
      const error = new Error('API Error');
      axios.get.mockRejectedValue(error);

      await expect(movieService.getPopularMovies()).rejects.toThrow('API Error');
    });
  });

  describe('searchMovies', () => {
    it('searches movies with correct URL', async () => {
      axios.get.mockResolvedValue({ data: mockMovieData });
      
      const result = await movieService.searchMovies('test');
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/search\/movie\?api_key=.*&query=test/)
      );
      expect(result).toEqual(mockMovieData);
    });

    it('encodes search query in URL', async () => {
      axios.get.mockResolvedValue({ data: mockMovieData });
      
      await movieService.searchMovies('test movie');
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/search\/movie\?api_key=.*&query=test%20movie/)
      );
    });

    it('throws error when API call fails', async () => {
      const error = new Error('API Error');
      axios.get.mockRejectedValue(error);

      await expect(movieService.searchMovies('test')).rejects.toThrow('API Error');
    });
  });
});
