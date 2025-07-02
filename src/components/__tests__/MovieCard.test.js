import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from '../MovieCard';

describe('MovieCard', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    vote_average: 8.5
  };

  const mockOnAddFavorite = jest.fn();
  const mockOnRemoveFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie information correctly', () => {
    render(
      <MovieCard
        movie={mockMovie}
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('⭐ 8.5/10')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Movie poster' })).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300/test-poster.jpg'
    );
  });

  it('shows "Add to Favorites" button when not favorite', () => {
    render(
      <MovieCard
        movie={mockMovie}
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    );

    const button = screen.getByRole('button', { name: /add .* to favorites/i });
    expect(button).toHaveTextContent('Add to Favorites');
    expect(button).toHaveAttribute('aria-label', 'Add Test Movie to favorites');
  });

  it('shows "Remove from Favorites" button when favorite', () => {
    render(
      <MovieCard
        movie={mockMovie}
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={true}
      />
    );

    const button = screen.getByRole('button', { name: /remove .* from favorites/i });
    expect(button).toHaveTextContent('Remove from Favorites');
    expect(button).toHaveAttribute('aria-label', 'Remove Test Movie from favorites');
  });

  it('calls onAddFavorite when Add to Favorites is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MovieCard
        movie={mockMovie}
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    );

    await user.click(screen.getByRole('button', { name: /add .* to favorites/i }));
    expect(mockOnAddFavorite).toHaveBeenCalledWith(mockMovie);
    expect(mockOnRemoveFavorite).not.toHaveBeenCalled();
  });

  it('calls onRemoveFavorite when Remove from Favorites is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MovieCard
        movie={mockMovie}
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={true}
      />
    );

    await user.click(screen.getByRole('button', { name: /remove .* from favorites/i }));
    expect(mockOnRemoveFavorite).toHaveBeenCalledWith(mockMovie.id);
    expect(mockOnAddFavorite).not.toHaveBeenCalled();
  });

  it('handles keyboard interactions correctly', async () => {
    const user = userEvent.setup();
    render(
      <MovieCard
        movie={mockMovie}
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    );

    const button = screen.getByRole('button', { name: /add .* to favorites/i });
    await user.keyboard('{Enter}');
    expect(mockOnAddFavorite).not.toHaveBeenCalled(); // Button needs focus first
    
    button.focus();
    await user.keyboard('{Enter}');
    expect(mockOnAddFavorite).toHaveBeenCalledWith(mockMovie);
    
    button.focus();
    await user.keyboard(' ');
    expect(mockOnAddFavorite).toHaveBeenCalledTimes(2);
  });

  it('has proper accessibility attributes', () => {
    render(
      <MovieCard
        movie={mockMovie}
        onAddFavorite={mockOnAddFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
        isFavorite={false}
      />
    );

    expect(screen.getByRole('article')).toHaveAttribute(
      'aria-label',
      'Movie: Test Movie'
    );
    const rating = screen.getByText('⭐ 8.5/10').parentElement;
    expect(rating).toHaveAttribute('aria-label', 'Rating: 8.5 out of 10');
  });
}); 