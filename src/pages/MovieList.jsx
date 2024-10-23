import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file
import '../styles/movielist.css'; // Import MovieList specific CSS

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 16, name: "Animation" },
    { id: 27, name: "Horror" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 878, name: "Science Fiction" },
  ];

  useEffect(() => {
    const fetchKidsMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=186c388d184209645092e97e5d2b890b&with_genres=10751,16`
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching kids movies:', error);
      }
    };
    fetchKidsMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredMovies(filtered.filter(movie => 
      !selectedGenre || movie.genre_ids.includes(parseInt(selectedGenre))
    ));
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    
    const fetchMoviesByGenre = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=186c388d184209645092e97e5d2b890b&with_genres=${genre}`
        );
        const filtered = response.data.results.filter(movie => 
          movie.adult === false
        );
        setFilteredMovies(filtered.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    };

    if (genre) {
      fetchMoviesByGenre();
    } else {
      setFilteredMovies(movies);
    }
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="movieListContainer">
      <div className="navbar">
        <h1 className="navbar-title">MooviFlix</h1>
        <input
          type="text"
          className="search-inputbar"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleGenreChange} value={selectedGenre} className="genre-select">
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="movieList">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movieCard" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || '/path/to/dummy/image.jpg'}`}
              alt={movie.title}
              className="poster"
            />
            <div className="movieInfo">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
