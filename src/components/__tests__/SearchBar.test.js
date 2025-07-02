import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

jest.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value) => value 
}));

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByLabelText(/search for movies/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search for movies/i)).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByLabelText(/search for movies/i);
    const form = screen.getByRole('search');
    
    await userEvent.type(input, 'test movie');
    fireEvent.submit(form);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test movie');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByLabelText(/search for movies/i);
    await user.type(input, 'avatar');
    
    expect(input).toHaveValue('avatar');
  });

  it('has proper accessibility attributes', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByLabelText(/search for movies/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(input).toHaveAttribute('aria-label', 'Search for movies');
    expect(button).toHaveAttribute('aria-label', 'Search');
  });
}); 