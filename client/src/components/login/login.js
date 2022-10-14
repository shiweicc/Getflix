import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from '../../logo.svg';

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

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({name: 'pass', message: errors.pass});
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({name: "uname", message: errors.uname});
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
          <input type='submit' />
        </div>
      </form>
    </div>
  )

  return (
    <div className='app'>
      <div className='top'>
        <img src='https://lynnliu0429.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F27f894d3-3b7e-4a6f-8648-585a802320f0%2FScreen_Shot_2022-10-05_at_7.10.18_PM.png?table=block&id=ee5194fc-b065-40fa-ab0e-484f664e7647&spaceId=06601d8e-4fb7-4a87-9521-6c0a0765f4e7&width=960&userId=&cache=v2' className='logo' alt='logo'></img>
        <button type='button' className='back-btn'>Back</button>
      </div>
      <div className='login-form'>
        <div className='title'>LOG IN</div>
        {renderForm}
      </div>
    </div>
  )
}

export default Login;