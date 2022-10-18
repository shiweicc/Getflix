import React, { useState, useEffect } from "react";
import History from "./history/History.js";
import pic from '../../getflixLogo.png';
import './profile.css';

const Profile = (props) => {
  // console.log('Profile here: ', props)

  return (
    <div className="profile">
     <img className='profile-logo' alt='logo' src={pic} ></img>
    <button className='profile-backBtn' onClick={() => {props.logout()}}> Home </button>

      <History watchedList={props.watchedList}/>
    </div>
  );
}

export default Profile;