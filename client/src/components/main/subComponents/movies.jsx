import React, { useState, useEffect } from "react";
import Carousel from './carousel.jsx';


const movies = (props) => {
  return (
    <div className='main-movie-carousels'>
      <h2 className='main-genre'>Comedy</h2>
      <Carousel movies = {props.movieList[35]} updateHistory={props.updateHistory}/>
      <h2 className='main-genre' >Thriller</h2>
      <Carousel movies = {props.movieList[53]} updateHistory={props.updateHistory}/>
      <h2 className='main-genre'>Action</h2>
      <Carousel movies = {props.movieList[28]} updateHistory={props.updateHistory}/>
      <h2 className='main-genre'>Fantasy</h2>
      <Carousel movies = {props.movieList[14]} updateHistory={props.updateHistory}/>
      <h2 className='main-genre'>Drama</h2>
      <Carousel movies = {props.movieList[18]} updateHistory={props.updateHistory}/>
      <h2 className='main-genre'>Family</h2>
      <Carousel movies = {props.movieList[10751]} updateHistory={props.updateHistory}/>
    </div>
  )
}

export default movies;