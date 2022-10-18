import React, { useState, useEffect } from "react";
import Movielist from "./subComponents/history_movieList.jsx";
import KEY from "../../../config.js"
import axios from 'axios';


const History = (props) => {
  const API_URL = 'https://api.themoviedb.org/3/movie';

  // console.log('History here: ', props.watchedList)

  const [moviesArr, setmoviesArr] = useState([]);

  useEffect(() => {
    getMoviesInfo(props.watchedList);
  }, [])

  const getMoviesInfo = (moviesIDList) => {

    moviesIDList.map(movieID => {
      axios.get(`${API_URL}/${movieID}`, {
        params: {
          api_key: KEY.TMDB,
        }
      })
      .then(movie => {
        // console.log('Movie Info: ', movie.data)
        let data = movie.data;
        let movieObj = {
          "backdrop_path": data.backdrop_path,
          "id": data.id,
          "poster_path": data.poster_path,
          "original_title": data.original_title,
        }
        moviesArr.push(movieObj);
        setmoviesArr(moviesArr)
      })
      .catch(err => {
        console.log('fail to get movies info!!!', err);
      })
    })
  }


  return (
    <div className="history">
      <h2 className='history-title'>History</h2>
      {/* <Movielist movies={props.watchedList}/> */}
      <Movielist movies={moviesArr}/>
    </div>
  );
}

export default History;
