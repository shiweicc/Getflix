import React from 'react';
//import { useState } from 'react';
//import ReactDOM from 'react-dom';
import fakeData from "../../fakeData/fakeMovies.js";
import logo from './getfilxLogo.png';
import './details.css';
import { useLocation } from 'react-router-dom';



const Details = (props) => {

  const location = useLocation();
  const title = fakeData.movies[0].original_title;
  console.log(title);
  console.log(location.state);

  return (
    <div className='main'>


      <div className='logo'>
        <img alt='logo' src={logo} ></img>
      </div>
      <style>{'body { background-color:black; }'}</style>
      <div className='title'>

      </div>
      <div className='post'>

      </div>
      <div className='trailer'>

      </div>

      <div className='watched'>

      </div>
      <div className='price'>

      </div>
    </div>
  )
}

export default Details;
