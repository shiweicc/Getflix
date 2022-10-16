import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './getfilxLogo.png';
import './landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const logout = () => {
    console.log('logout')
  }
  const navigateSignup = () => {
    navigate('/signup');
  };
  return (
    <div>
      <div className='Navigation-Bar'>
        <div className='landing-logo'>
          <img  alt='logo' src={logo} ></img>
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
    </div>
  )
}

export default Landing;