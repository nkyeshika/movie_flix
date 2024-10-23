import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=186c388d184209645092e97e5d2b890b&query=${query}&with_genres=10751,16`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <h1>Search Kids Movies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="movieList">
        {movies.map((movie) => (
          <div key={movie.id} className="movieCard" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="poster"
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
