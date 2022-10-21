import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "../main.css";
import { Navigation, Scrollbar } from "swiper";


const Carousel = (props) => {

  // console.log(props.movies);

  const navigate = useNavigate();
  const navigateMovieDetail = (data) => {
    //console.log(data);
    navigate('/details', { state: data });
  }

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
          props.movies.map((movie, index) => {
            return (
            <SwiperSlide key={index}  className='main-slide'>
              <div>
                <div>

                  <img
                    src={"https://image.tmdb.org/t/p/w400" + movie.backdrop_path}
                    alt = {movie.original_title}
                      onClick={() => { navigateMovieDetail(movie) }}
                  />

                </div>
                <div className="main-card-title">
                  {movie.original_title}
                </div>
                <button className="watched_btn" onClick={() => props.updateHistory(1, movie.id)}>👁️</button>
                {/* <div className="main-card-watch">
                  Watchlist Button
                </div> */}
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