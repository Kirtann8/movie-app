# 🎬 Movie Search App

A modern React application for discovering and managing your favorite movies using The Movie Database (TMDb) API.

##  Features

- **Movie Discovery**: Browse popular movies with infinite scroll
- **Smart Search**: Real-time movie search with debounced input
- **Favorites Management**: Add/remove movies from your personal favorites list
- **Responsive Design**: Optimized for all device sizes using Tailwind CSS
- **Accessibility**: Full keyboard navigation and screen reader support
- **Persistent Storage**: Favorites saved in localStorage

## Technologies Used

- **Frontend**: React 18, Tailwind CSS
- **State Management**: Custom hooks (useFavorites, useMovies, useDebounce)
- **API**: The Movie Database (TMDb) API
- **Testing**: Jest, React Testing Library
- **Icons**: React Icons

##  Installation

1. Clone the repository:
https://github.com/Kirtann8/movie-app.git


2. Install dependencies:
npm install


3. Create a `.env` file and add your TMDb API key:
REACT_APP_API_KEY=your_tmdb_api_key


4. Start the development server:
npm start


## Testing
Run tests: 
npm test


Run tests with coverage:
npm run test:coverage


##  Project Structure

src/
├── components/
│ ├── MovieCard.js
│ ├── SearchBar.js
│ ├── FavoriteIndicator.js
│ ├── FavoritesModal.js
│ ├── Header.js
│ └── MovieList.js
├── hooks/
│ ├── useFavorites.js
│ ├── useMovies.js
│ └── useDebounce.js
├── services/
│ └── movieService.js
├── utils/
│ └── localStorage.js
└── App.js



## Key Features Implementation

### Debounced Search
- Implements custom `useDebounce` hook for optimized API calls
- 500ms delay to prevent excessive requests

### Favorites Management
- Persistent storage using localStorage
- Custom `useFavorites` hook for state management
- Add/remove functionality with visual feedback

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

##  Available Scripts

- `npm start` - Development server
- `npm test` - Run tests
- `npm run build` - Production build
- `npm run test:coverage` - Test coverage report

##  Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request