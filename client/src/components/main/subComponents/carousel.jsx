import React from "react";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "../main.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar } from "swiper";
import ClickTracker from '../../ClickTracker.jsx';


const Carousel = (props) => {

  const navigate = useNavigate();
  const navigateMovieDetail = (data) => {
    navigate('/details', { state: data });
  }
  const userName = props.userName;
  const userId = props.userId;

  return (
    <ClickTracker webpage={'Main-Carousel'} userName={userName} userId={userId}>
    <div>
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

            const checkHistory = props.history.includes(movie.id)
            let watchedBtn;
            if (checkHistory) {
              watchedBtn =
              <button className="eyeball_btn"
                id={`isMovie_eyeball-btn_${movie.id}_${movie.original_title}`}
                onClick={() => props.updateHistory(props.userId, movie.id)}>👁️
              </button>
            } else {
              watchedBtn =
              <button className="watch_btn"
              id={`isMovie_add-to-watched-btn_${movie.id}_${movie.original_title}`}
                onClick={() => props.updateHistory(props.userId, movie.id)}>Watch</button>
            }

            return (
            <SwiperSlide key={index}  className='main-slide'>
              <div>
                <div>

                  <img
                    src={"https://image.tmdb.org/t/p/w400" + movie.backdrop_path}
                    alt = {movie.original_title}
                    id = {`isMovie_Moviecard_${movie.id}_${movie.original_title}`}
                    onClick={() => { navigateMovieDetail(movie) }}
                  />

                </div>
                <div className="main-card-title">
                  {movie.original_title}
                </div>
                {watchedBtn}
              </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
    </ClickTracker>
  )
}

export default Carousel;