import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../main.css";
import { Pagination } from "swiper";


const Carousel = (props) => {
  console.log(props.movies)
  return (
    <div className='carousel'>
      <Swiper
        slidesPerView={6}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          props.movies.map(movie => {
            return (
            <SwiperSlide>
              <div>
                <div>
                  <img
                    src={"https://image.tmdb.org/t/p/w400" + movie.backdrop_path}
                    alt = {movie.original_title}
                  />
                </div>
                <div>
                  {movie.original_title}
                </div>
                <div>
                  Watchlist
                </div>
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