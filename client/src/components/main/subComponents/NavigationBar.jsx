import React, { useState, useEffect } from "react";
import pic from './getfilxLogo.png';
import SearchBar from './Searchbar.jsx';

const NavigationBar = (props) => {
  return (
    <div className='Navigation-Bar'>
      <div className='main-logo'>
        <img  alt='logo' src={pic} ></img>
      </div>
      <SearchBar search={props.search}/>
      <div className='main-buttons'>
        <button className='main-logout-btn' onClick={() => {props.logout()}}> Logout</button>
        <button className='main-profile-btn' onClick={() => {props.profile()}}>Profile</button>
      </div>
    </div>
  )
}

export default NavigationBar;