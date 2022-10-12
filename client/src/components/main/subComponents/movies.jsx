import React, { useState, useEffect } from "react";
import Carousel from './carousel.jsx';


const movies = (props) => {
  return (
    <div className='main-movie-carousels'>
      <h2>Comedy</h2>
      <Carousel movies = {props.movieList[35]}/>
      <h2>Thriller</h2>
      <Carousel movies = {props.movieList[53]}/>
      <h2>Action</h2>
      <Carousel movies = {props.movieList[28]}/>
      <h2>Fantasy</h2>
      <Carousel movies = {props.movieList[14]}/>
      <h2>Drama</h2>
      <Carousel movies = {props.movieList[18]}/>
      <h2>Family</h2>
      <Carousel movies = {props.movieList[10751]}/>
    </div>
  )
}

export default movies;