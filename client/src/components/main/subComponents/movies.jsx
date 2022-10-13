import React, { useState, useEffect } from "react";
import Carousel from './carousel.jsx';


const movies = (props) => {
  return (
    <div className='main-movie-carousels'>
      <div className='main-genre'> Thriller </div>
      <Carousel />
      <br></br>
      <div className='main-genre'> Comedy </div>
      <Carousel />
      <br></br>
      <div className='main-genre'> Action </div>
      <Carousel />
      <br></br>
      <div className='main-genre'> Animation </div>
      <Carousel />
      <br></br>
      <div className='main-genre'> Romance </div>
      <Carousel />
    </div>
  )
}

export default movies;