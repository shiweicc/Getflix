import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar } from "swiper";


const Carousel = (props) => {
  console.log('history carousel: ', props.movies)
  return (
    <div className='carousel'>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        slidesPerView={6}
        spaceBetween={50}
        navigation={true}
        modules={[Navigation, Scrollbar]}
        className="mySwiper"
      >
        {
          props.movies.map(movie => {
            return (
            <SwiperSlide  className='main-slide'>
              <div>
                <div>
                  <img
                    src={"https://image.tmdb.org/t/p/w400" + movie.backdrop_path}
                    alt = {movie.original_title}
                  />
                </div>
                <div className="main-card-title">
                  {movie.original_title}
                </div>
                <button className="watched_btn">Watched</button>
              </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default Carousel;






// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper";


// const Carousel = (props) => {
//   return (
//     <div className='carousel'>
//       <Swiper
//         slidesPerView={6}
//         spaceBetween={30}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         <SwiperSlide>Slide 1</SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//         <SwiperSlide>Slide 4</SwiperSlide>
//         <SwiperSlide>Slide 5</SwiperSlide>
//         <SwiperSlide>Slide 6</SwiperSlide>
//         <SwiperSlide>Slide 7</SwiperSlide>
//         <SwiperSlide>Slide 8</SwiperSlide>
//         <SwiperSlide>Slide 9</SwiperSlide>
//       </Swiper>
//     </div>
//   )
// }

// export default Carousel;


// import React, { useState, useEffect } from "react";
// import Carousel from "./history_carousel.jsx";


// const Movielist = (props) => {
//   console.log('Movielist here: ', props);
//   return (
//     <div className='main-movie-carousels'>
//       <h2 className='main-genre'>Comedy</h2>
//       <Carousel movies = {props.movies}/>
//     </div>
//   )
// }

// export default Movielist;