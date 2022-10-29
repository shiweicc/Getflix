import React, { useEffect, useState } from 'react';
import Carousel from "../main/subComponents/carousel.jsx";
import WatchProvider from './subComponents/WatchProvider.jsx';
import logo from './getfilxLogo.png';
import './details.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Youtube from 'react-youtube';
import axios from 'axios';
import ClickTracker from './../ClickTracker.jsx';


const Details = (props) => {

  const navigate = useNavigate();
  //const API_URL = 'https://api.themoviedb.org/3/';
  const location = useLocation();
  //console.log(location.state);
  const title = location.state.original_title;
  const url = location.state.poster_path;
  const overview = location.state.overview;
  const id = location.state.id;

  const [trailer_key, setMovie] = useState({ title: "Loading Movies" })
  const [recommended, setRecommended] = useState([])
  const [watchProviders, setWatchProviders] = useState([])


  useEffect(() => {
    selectMovie();
    loadRecommended();
    loadWatchProviders();
  }, [id])


  const selectMovie = async () => {
    await axios.get(`/details/${id}`)
      .then((res) => {
        console.log('here', res.data);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log('error from movie details', err)
      })
  }


  const loadRecommended = async () => {
    await axios.get(`/details/recommended/${id}`)
      .then((res) => {
        console.log(res);
        setRecommended(res.data);
      })
      .catch((err) => {
        console.log('details/recommended error', err)
      })
  }

  const loadWatchProviders = async () => {
    await axios.get(`/details/watchProviders/${id}`)
      .then((res) => {
        //console.log('watch providers call', res.data.streamingInfo.us)
        setWatchProviders(res.data.streamingInfo.us)
      })
      .catch((err) => {
        console.log('/details/watchProviders error', err);
      })
  }

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/main');
  };

  const checkHistory = props.history.includes(id)
  let watchedBtn;
  if (checkHistory) {
    watchedBtn =  <button
      className="detail_eyeball_btn"
      id={`isMovie_eyeball-btn_${id}_${title}`}
      onClick={() => props.updateHistory(props.userId, id)}>👁️
    </button>
  } else {
    watchedBtn =  <button
      className="detail_watch_btn"
      id={`isMovie_add-to-watched-btn_${id}_${title}`}
      onClick={() => props.updateHistory(props.userId, id)}>Watch
    </button>
  }

  return (
    <ClickTracker webpage={'Details'} userName={props.userName} userId={props.userId}>
      <div className='main'>
        <div className='logo'>
          <img alt='logo' src={logo} ></img>
        </div>

        <div className='home'>
          <button id='home-btn' onClick={navigateHome}>Home</button>
        </div>

      <style>{'body { background-color:black; }'}</style>
      <div className='detail_title'>
        <h4>{title}</h4>
      </div>
      <div className='post'>
        <img src={"https://image.tmdb.org/t/p/w400" + url} onClick={selectMovie}></img>
      </div>

        <div className='overview'>
          <h1>OVERVIEW</h1>
          <p>{overview}</p>
        </div>

        <div className='trailer'>
          <Youtube
            //videoId='vRunUkdkK8s'
            videoId={trailer_key}
          ></Youtube>
        </div>

        <div className='recommended'>
          <h1>RECOMMENDED</h1>
          <Carousel movies ={recommended} updateHistory={props.updateHistory} history={props.history} userId={props.userId}/>
        </div>

        {/* <div className='watchNow'>
          <a target="_blank" href="https://www.netflix.com/">
            <button>Watch Now</button>
          </a>
        </div> */}

        <div className='watchProvider'>
          <WatchProvider providers={watchProviders} movieid={id} movietitle={title}/>
        </div>

        {/* <div className='price'>
          <h2>Buy:$2.99</h2>
        </div> */}

        <div className='watched'>
          {watchedBtn}
        </div>

      </div>
    </ClickTracker>
  )
}

export default Details;
