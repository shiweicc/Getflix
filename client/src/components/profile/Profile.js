import React from "react";
import { useNavigate } from 'react-router-dom';
import History from "./history/History.js";
import pic from '../../getflixLogo.png';
import './profile.css';

const Profile = (props) => {
  const navigate = useNavigate();
  const navigateToUpdateUsername = () => {
    navigate('/updateUserName');
  }
  const navigateToUpdatePwd = () => {
    navigate('/updateUserPwd');
  }
  return (
    <div className="profile">
     <img className='profile-logo' alt='logo' src={pic} ></img>
    <button className='profile-backBtn' onClick={() => {props.logout()}}> Home </button>
    <button className='profile-backBtn' onClick={() => {navigateToUpdateUsername()}}> Update user </button>
    <button className='profile-backBtn' onClick={() => {navigateToUpdatePwd()}}> Update password </button>

      <History watchedList={props.watchedList}/>
    </div>
  );
}

export default Profile;