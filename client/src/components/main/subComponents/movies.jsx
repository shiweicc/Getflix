import React, { useState, useEffect } from "react";
import Carousel from './carousel.jsx';


const movies = (props) => {
  return (
    <div className='main-movie-carousels'>
      <Carousel />
      <Carousel />
      <Carousel />
      <Carousel />
      <Carousel />
    </div>
  )
}

export default movies;