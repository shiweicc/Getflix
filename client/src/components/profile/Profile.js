import React from "react";
import History from "./history/History.js";
import pic from '../../getflixLogo.png';
import './profile.css';

function Profile() {

  return (
    <div className="profile">
     <img className='profile-logo' alt='logo' src={pic} ></img>
      <History />
    </div>
  );
}

export default Profile;