import React, { useState, useEffect } from "react";
import History from './history/History.js';
import UserInfo from './userInfo/UserInfo.js'
import pic from '../../getflixLogo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import './profile.css';
import ClickTracker from './../ClickTracker.jsx';

const Profile = (props) => {

  const navigate = useNavigate();

  const navigateToUpdateUsername = () => {
    navigate('/updateUserName');
  }

  const navigateToUpdatePwd = () => {
    navigate('/updateUserPwd');
  }

  const navigateMainPage = () => {
    navigate('/main');
  }

  const historyList = props.history.length;
  let history;
  if (historyList) {
    history = <History history={props.history} removeEachMovie={props.removeEachMovie} removeAllMovies={props.removeAllMovies} userId={props.userId}/>
  } else {
    history = <h2 className='no-history-title'>No Watch History</h2>
  }

  return (
    <ClickTracker webpage={'Profile'} userName={props.userName} userId={props.userId}>
      <div className="profile">
      <img className='profile-logo' alt='logo' src={pic} ></img>
      <button className='profile-backBtn' id='home-btn' onClick={() => {navigateMainPage()}}> Home </button>
      <button className='profile-updatePWBtn' id='update-pwd-btn' onClick={() => {navigateToUpdatePwd()}}> Update password </button>
      <button className='profile-updateUsernameBtn' id='update-usr-btn' onClick={() => {navigateToUpdateUsername()}}> Update user </button>
      <UserInfo userName={props.userName} userEmail={props.userEmail}/>
      {history}
      </div>
    </ClickTracker>
  );
}

export default Profile;