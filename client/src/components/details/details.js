import React, { useEffect, useState } from 'react';
import Carousel from "../main/subComponents/carousel.jsx";
import WatchProvider from './subComponents/WatchProvider.jsx';
import logo from './getfilxLogo.png';
import './details.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Youtube from 'react-youtube';
import axios from 'axios';


const Details = (props) => {

  const navigate = useNavigate();
  const API_URL = 'https://api.themoviedb.org/3/';
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

  const fetchMovie = async (id) => {

    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: '54880feab2b97d617bc064ae0ae04156',
        append_to_response: 'videos'
      }
    })

    return data;
  }

  const fetchRecommended = async (id) => {
    const options = {
      method: 'GET',
      url: `${API_URL}movie/${id}/recommendations`,
      params: {
        'api_key': '54880feab2b97d617bc064ae0ae04156',
        'language': 'en-US',
        'page': '1'
      }
    }
    const { data } = await axios.request(options);
    return data;
  }

  const fetchWatchProviders = async (id) => {
    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/v2/get/basic',
      params: {country: 'us', tmdb_id: `movie/${id}`},
      headers: {
        'X-RapidAPI-Key': '33bc0f7e6dmsha867c79cccc49e2p162ea5jsnf4e04cd45ab3',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    }
    const { data } = await axios.request(options);
    return data;
  }

  const selectMovie = async () => {
    //console.log("here");
    // console.log(id);
    const movieData = await fetchMovie(id);
    //console.log(movieData);
    //console.log(movieData.videos.results[0].key);
    if (movieData.videos && movieData.videos.results) {
      var trailer = movieData.videos.results.find(vid => vid.name === "Official Trailer");
    }

    setMovie(movieData.videos.results[0].key);
    // console.log(trailer.key, 'and', movieData.videos.results[0]);
  }

  const loadRecommended = async () => {
    const recommendations = await fetchRecommended(id);
    const movies = recommendations.results;
    //console.log('loadRecommended funct', movies);
    setRecommended(movies)
  }

  const loadWatchProviders = async () => {
    const providers = await fetchWatchProviders(id);
    console.log('watch providers call', providers.result.streamingInfo.us);
    setWatchProviders(providers.result.streamingInfo.us);
  }

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/main');
  };

  return (
    <div className='main'>
      <div className='logo'>
        <img alt='logo' src={logo} ></img>
      </div>

      <div className='home'>
        <button onClick={navigateHome}>Home</button>
      </div>

      <style>{'body { background-color:black; }'}</style>
      <div className='title'>
        <h4>{title}</h4>
      </div>
      <div className='post'>
        <img src={"https://image.tmdb.org/t/p/w400" + url}
          onClick={selectMovie}
        ></img>
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
        <Carousel movies ={recommended}/>
      </div>

      {/* <div className='watchNow'>
        <a target="_blank" href="https://www.netflix.com/">
          <button>Watch Now</button>
        </a>
      </div> */}

      <div className='watchProvider'>
        <WatchProvider providers={watchProviders}/>
      </div>

      {/* <div className='price'>
        <h2>Buy:$2.99</h2>
      </div> */}

      <div className='watched'>
        <h2>Watched</h2>
      </div>

    </div>
  )
}

export default Details;
