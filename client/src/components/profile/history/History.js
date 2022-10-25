import React, { useState, useEffect } from "react";
import Movielist from "./subComponents/history_movieList.jsx";
import KEY from "../../../config.js"
import axios from 'axios';

const History = (props) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesInfo(props.history);
  }, [])

  useEffect(() => {
    getMoviesInfo(props.history);
  }, [props.history, movies])

  const getEachMovie = (movieId) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {params: {api_key: KEY.TMDB,}})
  }

  const getMoviesInfo = (moviesIdList) => {
    let promises = moviesIdList.map(movieId => getEachMovie(movieId))
    Promise.all(promises)
    .then(data => {
      let storage = [];
      data.forEach(movie => {
        let data = movie.data;
        let movieObj = {
          "backdrop_path": data.backdrop_path,
          "id": data.id,
          "poster_path": data.poster_path,
          "original_title": data.original_title,
        }
        storage.push(movieObj);
      })
      setMovies(storage)
    })
    .catch(err => {
      console.log('fail to get all movies info: ', err)
    })
  }

  return (
    <div className="history">
      <h2 className='history-title'>History</h2>
      <button className="clear_history_btn" onClick={() => props.removeAllMovies(props.userId)}>Clear History</button>
      <Movielist movies={movies} removeEachMovie={props.removeEachMovie} userId={props.userId}/>
    </div>
  );
}

export default History;