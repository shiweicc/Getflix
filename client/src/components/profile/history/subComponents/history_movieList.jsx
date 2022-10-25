import React from "react";
import Carousel from "./history_carousel.jsx";



const Movielist = (props) => {
  return (
    <div className='main-movie-carousels'>
      <Carousel movies={props.movies} removeEachMovie={props.removeEachMovie} userId={props.userId}/>
    </div>
  )
}

export default Movielist;