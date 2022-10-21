import React from "react";
import History from "./history/History.js";
import pic from '../../getflixLogo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = (props) => {

  const navigate = useNavigate();
  const navigateMainPage = () => {
    navigate('/main');
  }

  const historyList = props.history.length;
  let history;
  if (historyList) {
    history = <History history={props.history} removeEachMovie={props.removeEachMovie} removeAllMovies={props.removeAllMovies}/>
  } else {
    history = <h2 className='no-history-title'>No Watch History</h2>
  }

  return (
    <div className="profile">
      <img className='profile-logo' alt='logo' src={pic} ></img>
    <button className='profile-backBtn' onClick={() => {navigateMainPage()}}> Home </button>
    {history}
    </div>
  );
}

export default Profile;