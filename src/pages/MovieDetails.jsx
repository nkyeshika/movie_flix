import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import the CSS file
import '../styles//moviedetails.css'; // Import the specific CSS file

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=186c388d184209645092e97e5d2b890b`
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleHomeButtonClick = () => {
    navigate('/movies'); // Navigate to the home page
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movieDetails" style={{ backgroundColor: '#141414' }}>
          <div className="posterContainer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="postercont"
        />
      </div>
      <div className="detailsContent">
        <h1>{movie.title}</h1>
        <p className="genre-year">
          {movie.genres.map(genre => genre.name).join(', ')} | {new Date(movie.release_date).getFullYear()}
        </p>
        <p>{movie.overview}</p>
        <div className="buttonContainer">
          <button className="playButton">▶ Play</button>
          <button className="homeButton" onClick={handleHomeButtonClick}>
          🏠Back to Home
        </button>
          <button className="watchlistButton">📝 Save to Watch</button>
        
        </div>
      </div>
    
    </div>
  );
};

export default MovieDetails;
