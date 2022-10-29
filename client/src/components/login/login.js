import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
//import logo from '/Users/chrisbaharians/RPP36/getflix/client/src/getflixLogo.png'
import logo from '../../getflixLogo.png'
import Main from '../main/main.js'
import { Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

import './login.css'

const Login = ({ setUser }) => {
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClicked, setClicked] = useState(false)
  const LOGIN_URL = 'http://3.88.34.236:3001/login'

  const navigate = useNavigate();
  const navigateSignup = () => {
    navigate('/signup');
  };
  const renderErrorMessage = (name) => {
    name === errorMessages.name && (
      <div classname="error">{errorMessages.message}</div>
    )
  }

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password'
  }

  // const handleClick = (event) => {
  //   event.preventDefault();

  //   if(isClicked)
  // }


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
        let temp = {
          username: username,
          id: response.data.id,
          email: response.data.email
        }
        setUser(temp)
        setIsSubmitted(true);
        setIsSubmitted(true);
        localStorage.setItem('logged in id', temp.id);
        localStorage.setItem('logged in name', temp.username);
        localStorage.setItem('useremail', temp.email);
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
      {isClicked ? <Navigate to='main' /> : <button type='button' className='back-btn' onClick={() => {navigateSignup()}}>Sign Up</button>}
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