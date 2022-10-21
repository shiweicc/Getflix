import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import History from "./history/History.js";
import pic from '../../getflixLogo.png';
import axios from 'axios';
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

// class Profile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {history: this.props.history};
//     // this.getHistory = this.getHistory.bind(this)
//   }

//   componentDidMount() {
//     // this.getHistory(1);
//     console.log('props in Profile: ', this.props.history);
//   }

//   render() {
//     const historyList = this.state.history.length;
//     let history;
//     if (historyList) {
//       history = <History watchedList={this.state.history}/>
//     } else {
//       history = <h2 className='no-history-title'>No Watch History</h2>
//     }

//     return (
//       <div className="profile">
//        <img className='profile-logo' alt='logo' src={pic} ></img>
//       <button className='profile-backBtn' onClick={() => {this.props.logout()}}> Home </button>
//       {history}
//       </div>
//     );
//   }
// }

export default Profile;