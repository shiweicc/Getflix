import React, { useState, useEffect } from "react";
import pic from './getflixLogo.png';

const NavigationBar = (props) => {
  return (
    <div className='Navigation-Bar'>
      <img className='main-logo' alt='logo' src={pic} ></img>
      <button className='main-profile-btn'> Profile</button>
      <button className='main-logout-btn'>Logout</button>
    </div>
  )
}

export default NavigationBar;