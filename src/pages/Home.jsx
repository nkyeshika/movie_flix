import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; // Import the CSS file for Home component

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin'); // Redirect to the movie list
  };

  return (
    <div className="homeContainer">
      <h1 className="appName">MovieFlix</h1>
      <p className="appDescription">
        Discover and watch your favorite movies. Browse through a variety of genres and find something you'll love!
      </p>
      <button className="getStartedButton" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default Home;
