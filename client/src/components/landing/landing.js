import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './getfilxLogo.png';
import movies from './movies.png';

import './landing.css';

const Landing = () => {
  const login = () => {
    console.log('logout')
  }

  return (
    <div>
      <div className='Navigation-Bar'>
        <div className='landing-logo'>
          <img  alt='logo' src={logo} ></img>
        </div>
        <div className="landing-button-container">
          <button className='main-logout-btn' onClick={() => {login()}}> Login</button>
        </div>
      </div>
      <div className='slogan'>
        Find, track, and watch your movies.
      </div>
      <div className='get-started'>
        <button>Get Started</button>
      </div>
      <div>
        <img  className='landing-movies' alt='movies' src={movies} ></img>
      </div>
    </div>
  )
}

export default Landing;