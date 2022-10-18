import React, { useState, useEffect } from "react";
import Carousel from './carousel.jsx';


const movies = (props) => {
  return (
    <div className='main-movie-carousels'>
      <h2 className='main-genre'>Comedy</h2>
      <Carousel movies = {props.movieList[35]} updateWatchedList={props.updateWatchedList}/>
      <h2 className='main-genre' >Thriller</h2>
      <Carousel movies = {props.movieList[53]} updateWatchedList={props.updateWatchedList}/>
      <h2 className='main-genre'>Action</h2>
      <Carousel movies = {props.movieList[28]} updateWatchedList={props.updateWatchedList}/>
      <h2 className='main-genre'>Fantasy</h2>
      <Carousel movies = {props.movieList[14]} updateWatchedList={props.updateWatchedList}/>
      <h2 className='main-genre'>Drama</h2>
      <Carousel movies = {props.movieList[18]} updateWatchedList={props.updateWatchedList}/>
      <h2 className='main-genre'>Family</h2>
      <Carousel movies = {props.movieList[10751]} updateWatchedList={props.updateWatchedList}/>
    </div>
  )
}

export default movies;