import React, { useState, useEffect } from "react";
import Carousel from "./history_carousel.jsx";
import fakeHistoryData from "../../../../fakeData/fakeHistory.js";


const Movielist = (props) => {
  return (
    <div className='main-movie-carousels'>
      {/* <Carousel movies = {fakeHistoryData.movies}/> */}
      <Carousel movies={props.movies} removeEachMovie={props.removeEachMovie}/>
    </div>
  )
}

export default Movielist;