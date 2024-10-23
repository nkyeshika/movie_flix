// SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css'; // Import your CSS file

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent page reload
    // Normally, you'd verify credentials here, but for now, just navigate
    navigate('/movies'); // Redirect to Movie List page on sign in
  };

  const handleBackToHome = () => {
    navigate('/'); // Navigate to Home page
  };

  return (
    <div className="signInContainer">
      <div className="formBlock">
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <input
            className='forminput'
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            className='forminput'
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="buttonContainer">
            <button type="submit">Sign In</button>
            <button type="button" onClick={handleBackToHome}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
