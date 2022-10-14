import React, { useState, useEffect } from "react";
import Carousel from "./history_carousel.jsx";
import fakeHistoryData from "../../../../fakeData/fakeHistory.js";


const Movielist = (props) => {
  console.log('Movielist here: ', props);
  return (
    <div className='main-movie-carousels'>
      <Carousel movies = {fakeHistoryData.movies}/>
    </div>
  )
}

export default Movielist;