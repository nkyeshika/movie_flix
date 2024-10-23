import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import SearchMovies from './pages/SearchMovies';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} /> {/* Sign In Route */}
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchMovies />} />
      </Routes>
    </div>
  );
};

export default App;
