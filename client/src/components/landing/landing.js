import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './getfilxLogo.png';
import movies from './movies.png';
import './landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const navigateSignup = () => {
    navigate('/signup');
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className='Navigation-Bar'>
        <div className='landing-logo'>
          <img  alt='logo' src={logo} ></img>
        </div>
        <div className="landing-button-container">
          <button className='main-logout-btn' onClick={() => {navigateLogin()}}> Login</button>
        </div>
        {/* <div className="landing-button-container">
          <button className='main-logout-btn' onClick={() => {logout()}}> Logout</button>
        </div> */}
      </div>
      <div className='slogan'>
        Find, track, and watch your movies.
      </div>
      <div className='get-started'>
          <button className='get-started-button' onClick={navigateSignup}>Get Started</button>
      </div>
      <div>
        <img  className='landing-movies' alt='movies' src={movies} ></img>
      </div>
    </div>
  )
}


export default Landing;