import React, { useState, useEffect } from "react";
import Carousel from './carousel.jsx';


const movies = (props) => {
  return (
    <div className='main-movie-carousels'>
      <div> Genre </div>
      <Carousel />
      <br></br>
      <div> Genre </div>
      <Carousel />
      <br></br>
      <div> Genre </div>
      <Carousel />
      <br></br>
      <div> Genre </div>
      <Carousel />
      <br></br>
      <div> Genre </div>
      <Carousel />
    </div>
  )
}

export default movies;