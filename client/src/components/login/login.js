import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from '../../getflixLogo.png'
import Main from '../main/main.js'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import './login.css'

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClicked, setClicked] = useState(false)
  const LOGIN_URL = 'http://localhost:3001/login'

  const renderErrorMessage = (name) => {
    name === errorMessages.name && (
      <div classname="error">{errorMessages.message}</div>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    var username = uname.value;
    var password = pass.value;

    try {
      const response = await axios.post(LOGIN_URL,
          JSON.stringify({ username, password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: false
          }
      );
      if(response.status === 200) {
        setIsSubmitted(true);
      } else {
        console.log('incorrect credentials');
      }
  }
  catch(err) {
    console.log(err);
  }
  };

  const renderForm = (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <input className='user-inp' type='text' name='uname' placeholder='Username' required />
          {renderErrorMessage('uname')}
        </div>
        <div className='input-container'>
          <input className='user-inp' type='password' name='pass' placeholder='Password' required />
          {renderErrorMessage('pass')}
        </div>
        <div className='button-container'>
          <input type='submit' onSubmit={handleSubmit}/>
        </div>
      </form>
    </div>
  )

  return (
    <>
    {isSubmitted ? <Navigate to='/main' /> :  <div className='app'>
    <div className='top'>
      <img src={logo} alt='getflix-logo' className='logo' />
      {isClicked ? <Navigate to='main' /> : <button type='button' className='back-btn'>Back</button>}
    </div>
    <div className='login-form'>
      <div className='title'>LOG IN</div>
      {isSubmitted ? <div>User is successfully logged in!</div> : renderForm}
    </div>
  </div>
    }
    </>
)

}

export default Login;