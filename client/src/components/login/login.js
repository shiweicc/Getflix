import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from '/Users/chrisbaharians/RPP36/getflix/client/src/getflixLogo.png'

import './login.css'

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) => {
    name === errorMessages.name && (
      <div classname="error">{errorMessages.message}</div>
    )
  }

  const database = [
    {
      username: 'user1',
      password: 'pass1'
    },
    {
      username: 'user2',
      password: 'pass2'
    }
  ]

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password'
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const userData = database.find((user) => user.username === uname.value)
    console.log('this is the userData', userData)

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({name: 'pass', message: errors.pass});

      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({name: "uname", message: errors.uname});
      alert('Username does not exist')
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
    <div className='app'>
      <div className='top'>
        <img src={logo} alt='getflix-logo' className='logo' />
        <button type='button' className='back-btn'>Back</button>
      </div>
      <div className='login-form'>
        <div className='title'>LOG IN</div>
        {isSubmitted ? <div>User is successfully logged in!</div> : renderForm}
      </div>
    </div>
  )
}

export default Login;